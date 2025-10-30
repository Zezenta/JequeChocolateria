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

// Limita un número a un máximo o un mínimo
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

// Interpolación lineal
const lerp = (start, end, t) => start + (end - start) * t;

// --- RIG QUE MUEVE LA BARRA EN FUNCIÓN DEL SCROLL ---
function BarRig({ screen, progress, modelScale = 0.3, zPlane = 0 }) {
    // referencia al grupo de objetos 3D que contiene la barra
    const groupRef = useRef()

    // get canvas size, camera and clock from useThree
    const { size, camera, clock } = useThree()

    // Convierte coordenadas de pantalla (en píxeles) a coordenadas en el mundo 3D
    // tomando como referencia un plano z = zPlane.
    // - xPx, yPx: posición en píxeles en el viewport
    // - z: coordenada z en mundo donde queremos proyectar el punto
    const screenToWorld = (xPx, yPx, z = 0) => {
        // ndc: Normalized Device Coordinates, rango [-1, 1] en x,y
        const ndc = new THREE.Vector3(
            (xPx / size.width) * 2 - 1,
            -(yPx / size.height) * 2 + 1,
            0.5
        )

        // Proyecta el vector NDC hacia el espacio del mundo
        ndc.unproject(camera)

        // Calcula la dirección desde la cámara hacia el punto proyectado
        const dir = ndc.sub(camera.position).normalize()

        // Calcula la distancia a lo largo de la dirección hasta el plano zPlane
        const distance = (z - camera.position.z) / dir.z

        // Devuelve la posición en coordenadas del mundo 3D
        return camera.position.clone().add(dir.multiplyScalar(distance))
    }

    // Crear referencias de los objetos THREEJS una sola vez
    // Se crean para cada eje, un Quaternion y un Vector3 (eje)
    const qx = useMemo(() => new THREE.Quaternion(), [])
    const axisX = useMemo(() => new THREE.Vector3(1, 0, 0), [])
    const qy = useMemo(() => new THREE.Quaternion(), [])
    const axisY = useMemo(() => new THREE.Vector3(0, 1, 0), [])
    const qz = useMemo(() => new THREE.Quaternion(), [])
    const axisZ = useMemo(() => new THREE.Vector3(0, 0, 1), [])
    const finalQ = useMemo(() => new THREE.Quaternion(), [])

    // useFrame se llama en cada frame de render por react-three-fiber
    useFrame(() => {
        if (!groupRef.current) return

        // Calcula la posición objetivo en el mundo 3D a partir de la posición en pantalla
        const target = screenToWorld(screen.x, screen.y, zPlane)

        // Interpola suavemente la posición actual hacia la target (movimiento suave)
        groupRef.current.position.lerp(target, 0.2)
        
        //aplicando las instrucciones de optimización:
        qx.setFromAxisAngle(axisX, -0.1 + (progress * 0.2))
        qy.setFromAxisAngle(axisY, ((Math.PI/2 - 0.5) - (progress * (Math.PI/2 - 0.5))) - progress * Math.PI)
        qz.setFromAxisAngle(axisZ, (Math.PI/2) - (progress * (Math.PI/2)))
        finalQ.multiplyQuaternions(qx, qy).multiply(qz)

        groupRef.current.quaternion.copy(finalQ)  
    })

    // Renderiza una caja simple que representa la barra de chocolate
    return (
        <group ref={groupRef}>
            <primitive 
                object={useGLTF('barra-prueba.glb').scene} 
                scale={modelScale} 
                castShadow
            />
        </group>
    )
}

useGLTF.preload("/barra-prueba.glb");

// --- ESCENA 3D ESTÁTICA ---
function Scene({ progress, screen, scale }) {
    return (
        <Canvas
            // RENDIMIENTO: `dpr` (Device Pixel Ratio) renderiza a una resolución mayor en pantallas de alta densidad.
            // Bajarlo a `1` puede mejorar mucho el rendimiento en GPUs de gama baja.
            dpr={[1, 1.5]}
            // RENDIMIENTO: `antialias` suaviza los bordes, pero consume recursos de la GPU.
            // Desactivarlo (`false`) puede aumentar los FPS.
            gl={{ antialias: true }}
            camera={{ fov: 38, position: [0, 0, 8] }}
            // RENDIMIENTO: El cálculo de sombras dinámicas es una de las operaciones más costosas.
            // Desactivarlo (`shadows={false}`) es una prueba clave para medir el impacto en el rendimiento.
            shadows
        >
            <ambientLight intensity={0.2} color="#ffffff" />

            {/* Luz principal cálida orientada ligeramente desde la derecha */}
            <directionalLight
                position={[1.5, 2.8, 4]}
                intensity={1.3}
                color="#ffdcc3"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
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

            <Environment resolution={256}>
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

        // update: calcula la posición objetivo y el progreso según el scroll
        // - Obtiene dos elementos en la página: 'bar-stage-hero' y 'bar-stage-story'
        // - Calcula centros y anclas para interpolar la posición (progreso) entre ambos
        // - Convierte la posición interpolada a coordenadas de pantalla (x,y)
        const update = () => {
            // marca que no hay frame pendiente (vamos a consumirlo ahora)
            frame = null

            // Elementos en el DOM que actúan como puntos de referencia
            const heroEl = document.getElementById('bar-stage-hero')
            const storyEl = document.getElementById('bar-stage-story')
            if (!heroEl || !storyEl) return
            
            // RENDIMIENTO: `getBoundingClientRect()` fuerza al navegador a recalcular el layout de la página.
            // Aunque se usa con `requestAnimationFrame`, en CPUs lentas y con scroll rápido, puede contribuir a la ralentización.
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
            // ancla del story: punto que al pasar el focus hace que la barra esté posicionada en el story
            const storyAnchor =
                storyRect.top + window.scrollY - window.innerHeight * 0.3

            // Calcula el progreso [0, 1] entre heroAnchor y storyAnchor según el focus
            // Solo puede ser entre 0 y 1 usando clamp
            // Esto es para que la barra no se mueva si el focus está antes del hero o después del story, y permanezca en su lugar inicial o final después de eso
            const denom = storyAnchor - heroAnchor
            const raw = denom === 0 ? 0 : (focus - heroAnchor) / denom
            const progress = clamp(raw, 0, 1) // evita que salga de [0, 1]

            // Interpola posiciones X e Y entre hero y story usando el progreso
            // Como el clamp hace que sea de 0 o de 1, la barra de chocolate o está en su punto inicial, o está en el trayecto (cuando el focus está entre ambas anclas), o está en su punto final
            const currentX = lerp(heroCenterX, storyCenterX, progress)
            const currentYPage = lerp(heroCenterPage, storyCenterPage, progress)
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
