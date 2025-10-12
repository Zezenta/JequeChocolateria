import React, { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// --- UTILIDADES ---
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const lerp = (start, end, t) => start + (end - start) * t;

// --- RIG QUE MUEVE LA BARRA EN FUNCIÓN DEL SCROLL ---
function BarRig({ screen, progress, zPlane = 0 }) {
    const groupRef = useRef()
    const { size, camera, clock } = useThree()

    // Convierte coordenadas de pantalla (px) a mundo (zPlane)
    const screenToWorld = (xPx, yPx, z = 0) => {
        const ndc = new THREE.Vector3(
            (xPx / size.width) * 2 - 1,
            -(yPx / size.height) * 2 + 1,
            0.5
        )
        ndc.unproject(camera)
        const dir = ndc.sub(camera.position).normalize()
        const distance = (z - camera.position.z) / dir.z
        return camera.position.clone().add(dir.multiplyScalar(distance))
    }

    useFrame(() => {
        if (!groupRef.current) return

        // Calcula la posición de destino en el mundo 3D
        const target = screenToWorld(screen.x, screen.y, zPlane)

        // Interpolación suave hacia el destino
        groupRef.current.position.lerp(target, 0.2)

        // Rotación dependiente del progreso
        const wobble = Math.sin(clock.elapsedTime * 1.6) * 0.05
        groupRef.current.rotation.x = progress * Math.PI + wobble
        groupRef.current.rotation.y = Math.sin(progress * Math.PI) * 0.15
    })

    return (
        <group ref={groupRef}>
            <mesh castShadow>
                <boxGeometry args={[4, 0.2, 2]} />
                <meshStandardMaterial
                    color="#8B5C2A"
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

        const update = () => {
            frame = null
            const heroEl = document.getElementById('bar-stage-hero')
            const storyEl = document.getElementById('bar-stage-story')
            if (!heroEl || !storyEl) return

            const heroRect = heroEl.getBoundingClientRect()
            const storyRect = storyEl.getBoundingClientRect()

            const heroCenterPage =
                heroRect.top + window.scrollY + heroRect.height / 2
            const storyCenterPage =
                storyRect.top + window.scrollY + storyRect.height / 2

            const heroCenterX = heroRect.left + heroRect.width / 2
            const storyCenterX = storyRect.left + storyRect.width / 2

            const heroAnchor =
                heroRect.top + window.scrollY + heroRect.height * 0.1
            const storyAnchor =
                storyRect.top + window.scrollY - window.innerHeight * 0.4
            const focus = window.scrollY + window.innerHeight * 0.35

            const denom = storyAnchor - heroAnchor
            const raw = denom === 0 ? 0 : (focus - heroAnchor) / denom
            const progress = clamp(raw, 0, 1)

            const currentX = lerp(heroCenterX, storyCenterX, progress)
            const currentYPage = lerp(heroCenterPage, storyCenterPage, progress)
            const currentYViewport = currentYPage - window.scrollY

            const screenX = clamp(currentX, 12, window.innerWidth - 12)
            const screenY = currentYViewport

            setState({
                ready: true,
                progress,
                screen: { x: screenX, y: screenY },
            })
        }

        const requestUpdate = () => {
            if (frame) return
            frame = requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', requestUpdate, { passive: true })
        window.addEventListener('resize', requestUpdate)

        return () => {
            if (frame) cancelAnimationFrame(frame)
            window.removeEventListener('scroll', requestUpdate)
            window.removeEventListener('resize', requestUpdate)
        }
    }, [])

    if (!state.ready) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-10">
            {/* Scene ocupa todo el viewport y no se mueve */}
            <div className="absolute inset-0">
                <Scene progress={state.progress} screen={state.screen} />
            </div>
        </div>
    )
}
