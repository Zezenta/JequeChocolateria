import React, { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Limita un número a un máximo o un mínimo
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

// Interpolación lineal
const lerp = (start, end, t) => start + (end - start) * t;

// --- RIG QUE MUEVE LA BARRA EN FUNCIÓN DEL SCROLL ---
function BarRig({ screen, progress, zPlane = 0 }) {
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

    // useFrame se llama en cada frame de render por react-three-fiber
    useFrame(() => {
        if (!groupRef.current) return

        // Calcula la posición objetivo en el mundo 3D a partir de la posición en pantalla
        const target = screenToWorld(screen.x, screen.y, zPlane)

        // Interpola suavemente la posición actual hacia la target (movimiento suave)
        groupRef.current.position.lerp(target, 0.2)

        // Aplica una oscilación (wobble) dependiente del tiempo para dar vida a la barra
        const wobble = Math.sin(clock.elapsedTime * 1.6) * 0.05

        // Rotación en X depende del progreso y añade el wobble
        //groupRef.current.rotation.x = progress * Math.PI + wobble

        // Rotación en Y ligeramente dependiente del progreso (efecto de balanceo)
        //groupRef.current.rotation.y = Math.sin(progress * Math.PI) * 0.15
    })

    // Renderiza una caja simple que representa la barra de chocolate
    return (
        <group ref={groupRef}>
            <mesh castShadow>
                {/* boxGeometry: ancho 4, alto 0.2, profundidad 2 */}
                <boxGeometry args={[4, 0.2, 2]} />
                {/* Material marrón con algo de metalizado y rugosidad */}
                <meshStandardMaterial
                    color="#8B5C2A" //#8B5C2A es un marrón chocolate
                    metalness={0.5}
                    roughness={0.42}
                />
            </mesh>
        </group>
    )
}

// --- ESCENA 3D ESTÁTICA ---
function Scene({ progress, screen }) {
    return (
        <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
            camera={{ fov: 38, position: [0, 0, 8] }}
            shadows
        >
            <ambientLight intensity={1} />
            <spotLight
                position={[6, 6, 2]}
                intensity={1.3}
                angle={0.6}
                penumbra={0.6}
            />
            <directionalLight position={[-4, 3, -2]} intensity={0.4} />
            <BarRig progress={progress} screen={screen} />
        </Canvas>
    )
}

// --- EXPERIENCIA PRINCIPAL ---
export default function ChocolateBarExperience() {
    const [state, setState] = useState({
        ready: false,
        progress: 0,
        screen: { x: 0, y: 0 },
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
            // BoundingClientRect relativo al viewport
            const heroRect = heroEl.getBoundingClientRect()
            const storyRect = storyEl.getBoundingClientRect()


            // focus: punto de scroll donde se considera el centro visual activo. Se define como el scroll + el 35% de la altura del viewport
            const focus = window.scrollY + window.innerHeight * 0.35


            // Coordenadas del centro de ambos elementos
            // Con esto es que la barra sabe a dónde ir
            // Coordenadas del centro del cuadro de Hero tomando en cuenta el scroll
            const heroCenterX = heroRect.left + heroRect.width / 2;
            const heroCenterPage =
                heroRect.top + window.scrollY + heroRect.height / 2; // top + scroll para mantener constante en página desde que aparece
            // Coordenadas del centro del cuadro de Story tomando en cuenta el scroll
            const storyCenterX = storyRect.left + storyRect.width / 2;
            const storyCenterPage =
                storyRect.top + window.scrollY + storyRect.height / 2; // top + scroll para mantener constante en página desde que aparece

                
            // Anchors usados SOLAMENTE para definir el rango donde la barra se mueve/interpola
            // ancla del hero: inicio del movimiento. Se pone un poco más abajo del top para que no empiece a moverse justo al entrar el hero
            const heroAnchor =
                heroRect.top + window.scrollY + heroRect.height * 0.1;
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

            // Actualiza el estado con ready=true (lista) y la posición calculada
            setState({
                ready: true,
                progress,
                screen: { x: screenX, y: screenY },
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
                <Scene progress={state.progress} screen={state.screen} />
            </div>
        </div>
    )
}
