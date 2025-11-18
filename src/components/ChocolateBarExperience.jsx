import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGLTF, Environment, Lightformer, ContactShadows } from '@react-three/drei';

// Ajusta el tamaño del modelo según el ancho disponible
const getDeviceScale = (width) => {
    if (width <= 480) return 0.15
    if (width <= 768) return 0.24
    return 0.3
}

// Detecta si es un dispositivo móvil
const isMobile = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Limita un número a un máximo o un mínimo
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

// Interpolación lineal
const lerp = (start, end, t) => start + (end - start) * t;

// --- RIG QUE MUEVE LA BARRA EN FUNCIÓN DEL SCROLL ---
// progress < 1: Muestra barra completa que rota y se mueve siguiendo el scroll
// progress >= 1: Muestra dos mitades separadas que se alejan progresivamente
function BarRig({ screen, progress, modelScale = 0.3, zPlane = 0 }) {
    const groupRef = useRef() // Grupo padre que contiene toda la barra (controla posición global)
    const leftHalfRef = useRef() // Ref de la mitad izquierda
    const rightHalfRef = useRef() // Ref de la mitad derecha
    const fillingRef = useRef() // Ref del relleno
    const { size, camera } = useThree() // Contexto de Three.js

    // Objetos reutilizables para evitar crear nuevos en cada frame (reduce GC)
    const ndcVec = useMemo(() => new THREE.Vector3(), []) // Proyección del punto en el espacio 3D
    const dirVec = useMemo(() => new THREE.Vector3(), []) // Dirección desde la cámara hacia el punto proyectado
    const targetVec = useMemo(() => new THREE.Vector3(), []) // Posición objetivo en el espacio 3D

    const baseQx = useMemo(() => new THREE.Quaternion(), []) // Rotación base en el eje X
    const baseQy = useMemo(() => new THREE.Quaternion(), []) // Rotación base en el eje Y
    const baseQz = useMemo(() => new THREE.Quaternion(), []) // Rotación base en el eje Z   
    const baseRotation = useMemo(() => new THREE.Quaternion(), []) // Rotación base completa

    const localSeparationVec = useMemo(() => new THREE.Vector3(), []) // Separación entre las mitades
    const localAxisZVec = useMemo(() => new THREE.Vector3(0, 0, 1), []) // Eje Z en el espacio local

    const zRotationQLeft = useMemo(() => new THREE.Quaternion(), []) // Rotación en el eje Z para la mitad izquierda
    const zRotationQRight = useMemo(() => new THREE.Quaternion(), []) // Rotación en el eje Z para la mitad derecha
    const leftRotation = useMemo(() => new THREE.Quaternion(), []) // Rotación completa en la mitad izquierda
    const rightRotation = useMemo(() => new THREE.Quaternion(), []) // Rotación completa en la mitad derecha

    /**
     * Convierte coordenadas de pantalla (píxeles) a coordenadas del mundo 3D.
     * Three.js y el DOM usan sistemas de coordenadas distintos:
     * - DOM: (0,0) arriba-izquierda, Y hacia abajo.
     * - Three.js: (0,0,0) centro, Y hacia arriba.
     * - Pasa los píxeles de pantalla a coordenadas normalizadas [-1, 1] (NDC).
     * - Usa unproject() para llevar el punto al espacio 3D según la cámara.
     * - Calcula dónde ese punto corta un plano Z específico.
     * @returns {THREE.Vector3} Coordenada en el mundo 3D (reutiliza targetVec)
     */
    const screenToWorld = (xPx, yPx, z = 0) => {
        // Reutilizar ndcVec en lugar de crear uno nuevo
        ndcVec.set(
            (xPx / size.width) * 2 - 1,      // X: normaliza y mapea a [-1, 1]
            -(yPx / size.height) * 2 + 1,    // Y: normaliza, invierte y mapea a [1, -1]
            0.5                              // Z: profundidad intermedia en NDC
        )

        // Proyecta el vector NDC hacia el espacio del mundo
        ndcVec.unproject(camera)

        // Calcula la dirección desde la cámara hacia el punto proyectado
        // Reutilizar dirVec
        dirVec.copy(ndcVec).sub(camera.position).normalize()

        // Calcula la distancia a lo largo de la dirección hasta el plano zPlane
        const distance = (z - camera.position.z) / dirVec.z

        // Reutilizar targetVec en lugar de crear uno nuevo
        targetVec.copy(camera.position).add(dirVec.multiplyScalar(distance))
        return targetVec
    }

    // Quaternions para rotaciones individuales en cada eje
    // Estos se mutan en cada frame con setFromAxisAngle()
    const qx = useMemo(() => new THREE.Quaternion(), [])
    const qy = useMemo(() => new THREE.Quaternion(), [])
    const qz = useMemo(() => new THREE.Quaternion(), [])
    const finalQ = useMemo(() => new THREE.Quaternion(), [])
    
    // Vectores que definen los ejes de rotación (en coordenadas del mundo)
    // Estos son constantes y se usan para crear rotaciones alrededor de cada eje
    const axisX = useMemo(() => new THREE.Vector3(1, 0, 0), [])
    const axisY = useMemo(() => new THREE.Vector3(0, 1, 0), [])
    const axisZ = useMemo(() => new THREE.Vector3(0, 0, 1), [])

    // Determina si debemos mostrar las mitades separadas (progress >= 1)
    // Cuando progress < 1, mostramos la barra completa rotando
    const showHalves = progress >= 1
    // Progreso de separación: 0 cuando progress = 1, aumenta después
    const splitProgress = Math.max(0, progress - 1)
    
    // La distancia de separación aumenta con el scroll
    const separationDistance = (splitProgress * 1.25) - 0.25

    // Factor LERP adaptativo: más alto en móvil para compensar frames perdidos
    const lerpFactor = isMobile() ? 0.45 : 0.25

    // useFrame es un hook de react-three-fiber que se ejecuta en cada frame de renderizado.
    useFrame(() => {
        if (!groupRef.current) return

        // Calcula la posición objetivo en el mundo 3D a partir de las coordenadas de pantalla
        const target = screenToWorld(screen.x, screen.y, zPlane)

        // LERP (Linear Interpolation) para movimiento suave
        // Factor más alto en móvil (0.45) para compensar frames perdidos y hacer la animación más responsiva
        groupRef.current.position.lerp(target, lerpFactor)
        
        // Puede ser entre 0 y máximo 1 (progress >= 1)
        const rotationProgress = showHalves ? 1 : progress
        
        // Crear quaternions de rotación para cada eje usando setFromAxisAngle()
        // setFromAxisAngle(eje, ángulo) crea una rotación alrededor de un eje específico. setFromAxisAngle() recibe el eje que es un vector y el ángulo en radianes.
        qx.setFromAxisAngle(axisX, rotationProgress * Math.PI / 6)
        qy.setFromAxisAngle(axisY, ((Math.PI/2 - 0.5) - (rotationProgress * (Math.PI/2 - 0.5))) - rotationProgress * Math.PI)
        qz.setFromAxisAngle(axisZ, (Math.PI/2) - (rotationProgress * (Math.PI/2)))
        
        /**
         * Para combinar múltiples rotaciones, multiplicamos quaternions.
         * IMPORTANTE: La multiplicación de quaternions NO es conmutativa (A * B ≠ B * A)
         */
        
        // Calculamos la rotación base COMPLETA reutilizando quaternions en lugar de crear nuevos
        // Esto es necesario porque las mitades necesitan esta rotación base
        // y no podemos mutar finalQ antes de calcularla
        baseQx.setFromAxisAngle(axisX, rotationProgress * Math.PI / 6)
        baseQy.setFromAxisAngle(axisY, ((Math.PI/2 - 0.5) - (rotationProgress * (Math.PI/2 - 0.5))) - rotationProgress * Math.PI)
        baseQz.setFromAxisAngle(axisZ, (Math.PI/2) - (rotationProgress * (Math.PI/2)))
        baseRotation.multiplyQuaternions(baseQx, baseQy).multiply(baseQz)
        
        // Ahora sí mutamos finalQ para el grupo principal
        // Este será usado solo cuando NO estamos mostrando las mitades
        finalQ.multiplyQuaternions(qx, qy).multiply(qz)
        
        // En Three.js, Object3D.quaternion controla la rotación del objeto.
        // copy() copia los valores del quaternion sin crear una nueva referencia.
        if (!showHalves) {
            // Barra completa: aplicamos la rotación compuesta al grupo padre
            groupRef.current.quaternion.copy(finalQ)
        } else {
            // Mitades separadas: el grupo padre no tiene rotación
            // identity() establece el quaternion a "sin rotación" (1, 0, 0, 0)
            // Las mitades individuales tendrán su propia rotación completa
            groupRef.current.quaternion.identity()
        }

        if (showHalves && leftHalfRef.current && rightHalfRef.current) {
            // Vector de separación - reutilizar localSeparationVec
            localSeparationVec.set(separationDistance, 0, 0)

            // Aplicar separación simétrica
            // Las mitades se mueven en direcciones opuestas desde el centro
            // Usar copy() para evitar mutar el vector original
            leftHalfRef.current.position.copy(localSeparationVec).multiplyScalar(-0.5)
            rightHalfRef.current.position.copy(localSeparationVec).multiplyScalar(0.5)
            
            // Vector de rotación en el espacio local
            // Transformar el eje Z al espacio local de la barra usando applyQuaternion()
            // Pasa que el eje Z después de las rotaciones queda invertido y un poco inclinado, por lo que hay que compensar
            // Reutilizar localAxisZVec
            localAxisZVec.set(0, 0, 1).applyQuaternion(baseRotation)
            // Ángulo de rotación que aumenta con el progreso de separación
            const zRotation = splitProgress * 0.15
            // Crear quaternions de rotación para cada mitad. Nótese que las rotaciones son opuestas a como deberían ser, ya que el eje Z se invierte y se inclina
            // Reutilizar quaternions en lugar de crear nuevos
            zRotationQLeft.setFromAxisAngle(localAxisZVec, -zRotation)
            zRotationQRight.setFromAxisAngle(localAxisZVec, zRotation)
            
            // Componer rotaciones: primero baseRotation, luego rotación en Z
            // multiplyQuaternions(a, b) = a * b (aplica primero b, luego a)
            // Entonces: zRotationQ * baseRotation aplica primero baseRotation, luego zRotationQ
            // Reutilizar leftRotation y rightRotation
            leftRotation.multiplyQuaternions(zRotationQLeft, baseRotation)
            rightRotation.multiplyQuaternions(zRotationQRight, baseRotation)
            
            // Aplicar rotación completa a cada mitad
            leftHalfRef.current.quaternion.copy(leftRotation)
            rightHalfRef.current.quaternion.copy(rightRotation)
            
            // El relleno mantiene solo la rotación base (sin rotación adicional en Z)
            // Esto hace que se mantenga "plano" entre las mitades
            if (fillingRef.current) {
                fillingRef.current.quaternion.copy(baseRotation)
            }
        }
    })

    // Cargar los modelos
    const fullBarGltf = useGLTF('barra-prueba.glb')
    const halfGltf = useGLTF('mitad-chocolate.glb')
    const fillingGltf = useGLTF('relleno-chocolate.glb')

    // Clonar las escenas una sola vez usando useMemo para evitar recrearlas en cada render
    const fullBarScene = useMemo(() => fullBarGltf.scene.clone(), [fullBarGltf.scene])
    const leftHalfScene = useMemo(() => halfGltf.scene.clone(), [halfGltf.scene])
    const rightHalfScene = useMemo(() => halfGltf.scene.clone(), [halfGltf.scene])
    const fillingScene = useMemo(() => {
        const cloned = fillingGltf.scene.clone()
        const greenMaterial = new THREE.MeshStandardMaterial({ 
            color: '#dffa34',
            metalness: 0.7,
            roughness: 0.25
        })
        cloned.traverse((child) => {
            if (child.isMesh) child.material = greenMaterial
        })
        return cloned
    }, [fillingGltf.scene])

    return (
        <group ref={groupRef}>
            {!showHalves ? (
                // Mostrar la barra completa cuando progress < 1
                <primitive 
                    object={fullBarScene} 
                    scale={modelScale} 
                />
            ) : (
                // Mostrar dos mitades cuando progress >= 1
                <>
                    <group ref={leftHalfRef}>
                        <group position={[0, 0.1, 0]}>
                            <primitive 
                                object={leftHalfScene} 
                                scale={modelScale}
                            />
                        </group>
                    </group>
                    <group ref={rightHalfRef}>
                        {/* Rotamos 180 grados en Y para que sea la otra mitad (simétrica) */}
                        <group rotation={[0, Math.PI, 0]} position={[0, 0.1, 0]}>
                            <primitive 
                                object={rightHalfScene} 
                                scale={modelScale}
                            />
                        </group>
                    </group>
                    <group ref={fillingRef}>
                        <group rotation={[0, Math.PI/2, 0]} position={[0, 0, 0]}>
                            <primitive object={fillingScene} scale={modelScale * 1.3} />
                        </group>
                    </group>
                </>
            )}
        </group>
    )
}

useGLTF.preload('barra-prueba.glb');
useGLTF.preload('relleno-chocolate.glb');
useGLTF.preload('mitad-chocolate.glb');


// --- ESCENA 3D ESTÁTICA ---
function Scene({ progress, screen, scale }) {
    const mobile = isMobile()
    
    return (
        <Canvas
            // RENDIMIENTO: `dpr` (Device Pixel Ratio) renderiza a una resolución mayor en pantallas de alta densidad.
            // En móvil limitamos a 1 para mejor rendimiento, en desktop permitimos hasta 1.5
            dpr={mobile ? 1 : [1, 1.5]}
            camera={{ fov: 38, position: [0, 0, 8] }}
            // RENDIMIENTO: El cálculo de sombras dinámicas es una de las operaciones más costosas.
            // Desactivado en móvil para mejorar rendimiento
            shadows={!mobile}
        >
            <ambientLight intensity={0.2} color="#ffffff" />

            {/* Luz principal cálida orientada ligeramente desde la derecha */}
            <directionalLight
                position={[1.5, 2.8, 4]}
                intensity={1.3}
                color="#ffdcc3"
                castShadow={!mobile}
                shadow-mapSize-width={mobile ? 1024 : 2048}
                shadow-mapSize-height={mobile ? 1024 : 2048}
                shadow-bias={-0.001}
            />

            {/* Luz de relleno fría desde la izquierda para recuperar volumen */}
            <directionalLight
                position={[-3.5, 1.2, 2]}
                intensity={0.4}
                color="#c7d5ff"
            />

            {/* Luz de contraluz para separar la silueta del fondo */}
            <directionalLight
                position={[-2.5, 3, -4]}
                intensity={0.6}
                color="#e7f2ff"
            />

            <Environment resolution={mobile ? 128 : 256}>
                <Lightformer
                    form="rect"
                    intensity={2}
                    rotation={[0, Math.PI / 2, 0]}
                    position={[0, 5, -10]}
                    scale={[12, 12, 1]}
                />
                <Lightformer
                    form="ring"
                    intensity={1.2}
                    color="#ffb38a"
                    position={[-6, 2, 2]}
                    scale={8}
                />
            </Environment>

            <BarRig progress={progress} screen={screen} modelScale={scale} />
        </Canvas>
    )
}

// --- EXPERIENCIA PRINCIPAL ---
export default function ChocolateBarExperience() {
    const [state, setState] = useState({
        ready: false,
        progress: 0,
        screen: { x: 0, y: 0 },
        scale: 0.3,
    })

    useEffect(() => {
        if (typeof window === 'undefined') return

        let frame = null
        let lastUpdateTime = 0
        const mobile = isMobile()
        // Throttle más agresivo en móvil: mínimo 16ms entre updates (60fps), en desktop permitimos más frecuencia
        const throttleMs = mobile ? 16 : 8

        // update: calcula la posición objetivo y el progreso según el scroll
        // - Obtiene dos elementos en la página: 'bar-stage-hero' y 'bar-stage-story'
        // - Calcula centros y anclas para interpolar la posición (progreso) entre ambos
        // - Convierte la posición interpolada a coordenadas de pantalla (x,y)
        const update = () => {
            // marca que no hay frame pendiente (vamos a consumirlo ahora)
            frame = null

            // Throttle: evita ejecutar demasiado frecuentemente, especialmente en móvil
            const now = performance.now()
            if (now - lastUpdateTime < throttleMs) {
                // Si pasó muy poco tiempo, reprogramar para el siguiente frame
                frame = requestAnimationFrame(update)
                return
            }
            lastUpdateTime = now

            // Elementos en el DOM que actúan como puntos de referencia
            const heroEl = document.getElementById('bar-stage-hero')
            const storyEl = document.getElementById('bar-stage-story')
            if (!heroEl || !storyEl) return
            
            // RENDIMIENTO: `getBoundingClientRect()` fuerza al navegador a recalcular el layout de la página.
            // Aunque se usa con `requestAnimationFrame`, en CPUs lentas y con scroll rápido, puede contribuir a la ralentización.
            // Throttle ayuda a reducir la frecuencia de estas llamadas costosas
            const heroRect = heroEl.getBoundingClientRect()
            const storyRect = storyEl.getBoundingClientRect()

            // focus: punto de scroll donde se considera el centro visual activo. Se define como el scroll + el 35% de la altura del viewport
            const focus = window.scrollY + window.innerHeight * 0.35

            // Coordenadas del centro de ambos elementos
            // Con esto es que la barra sabe a dónde ir
            // Coordenadas del centro del cuadro de Hero tomando en cuenta el scroll
            const heroCenterX = heroRect.left + heroRect.width / 2
            const heroCenterPage =
                heroRect.top + window.scrollY + heroRect.height / 2 // top + scroll para mantener constante en página desde que aparece
            // Coordenadas del centro del cuadro de Story tomando en cuenta el scroll
            const storyCenterX = storyRect.left + storyRect.width / 2
            const storyCenterPage =
                storyRect.top + window.scrollY + storyRect.height / 2 // top + scroll para mantener constante en página desde que aparece

            // Anchors usados SOLAMENTE para definir el rango donde la barra se mueve/interpola
            // ancla del hero: inicio del movimiento. Se pone un poco más abajo del top para que no empiece a moverse justo al entrar el hero
            const heroAnchor =
                heroRect.top + window.scrollY + heroRect.height * 0.1
            // ancla del story: punto que al pasar el focus hace que la barra esté posicionada en el story (progress = 1)
            const storyAnchor =
                storyRect.top + window.scrollY - window.innerHeight * 0.3

            // Calcula el progreso normalizado: 0 en heroAnchor, 1 en storyAnchor
            // Pero permitimos que continúe más allá de 1 para trackear la separación
            // Progress = 0 en heroAnchor, progress = 1 en storyAnchor, y puede continuar más allá
            // Esto permite trackear el scroll después de que la barra esté horizontal para controlar la separación
            const progressDenom = storyAnchor - heroAnchor
            const progressNormalized = progressDenom === 0 ? 0 : (focus - heroAnchor) / progressDenom
            // Progress puede ir más allá de 1, pero limitamos el mínimo a 0
            const progress = Math.max(0, progressNormalized)

            // Interpola posiciones X e Y entre hero y story usando el progreso
            // Cuando progress > 1, la posición se mantiene en el story (no sigue moviéndose)
            // Solo usamos progress hasta 1 para la interpolación de posición
            const positionProgress = Math.min(progress, 1)
            const currentX = lerp(heroCenterX, storyCenterX, positionProgress)
            const currentYPage = lerp(heroCenterPage, storyCenterPage, positionProgress)
            // Convierte la Y del espacio de página a Y en el viewport restando scrollY. Esto compensa para que la barra siga mostrándose en el viewport
            // Si esto no estuviera, la barra se fuera a las coordenadas originales del centro del story, las cuales están fuera de pantalla
            const currentYViewport = currentYPage - window.scrollY

            // Evita que la X se salga de la pantalla (márgenes 12px)
            const screenX = clamp(currentX, 12, window.innerWidth - 12)
            const screenY = currentYViewport

            const scale = getDeviceScale(window.innerWidth)

            // Actualiza el estado con ready=true (lista) y la posición calculada
            setState({
                ready: true,
                progress,
                screen: { x: screenX, y: screenY },
                scale,
            })
        }

        // requestUpdate: solicita una ejecución de `update` en el siguiente frame
        // (evita múltiples requestAnimationFrame simultáneos)
        const requestUpdate = () => {
            if (frame) return
            frame = requestAnimationFrame(update)
        }

        // Ejecuta una vez para inicializar el estado
        update()

        // Escucha eventos de scroll y resize para recalcular la posición
        window.addEventListener('scroll', requestUpdate, { passive: true })
        window.addEventListener('resize', requestUpdate)

        // Limpieza de listeners y cancelación de frame pendiente
        return () => {
            if (frame) cancelAnimationFrame(frame)
            window.removeEventListener('scroll', requestUpdate)
            window.removeEventListener('resize', requestUpdate)
        }
    }, [])

    // Si no estamos listos (no encontramos elementos en el DOM) no renderizamos nada
    if (!state.ready) return null

    // Render principal: un contenedor fijo que ocupa todo el viewport
    // La propiedad pointer-events-none evita que capture eventos del ratón
    return (
        <div className="pointer-events-none fixed inset-0 z-10">
            {/* Scene ocupa todo el viewport y no se mueve */}
            <div className="absolute inset-0">
                <Scene progress={state.progress} screen={state.screen} scale={state.scale} />
            </div>
        </div>
    )
}
