import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

// --- FUNCIONES DE UTILIDAD MATEMÁTICA ---

// `clamp` asegura que un valor permanezca dentro de un rango (mínimo y máximo).
// Es útil para que el progreso del scroll no sea menor que 0 o mayor que 1.
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

// `lerp` (Linear Interpolation) calcula un valor intermedio entre un punto inicial y final,
// basado en un factor de progreso `t`. Se usa para mover suavemente la barra de chocolate.
const lerp = (start, end, t) => start + (end - start) * t

// --- COMPONENTE DE LA BARRA DE CHOCOLATE (MODELO 3D) ---

// Renderiza la forma del chocolate y anima un suave giro y flotación.
const ChocolateBar = ({ progress }) => {
    // `useRef` para obtener una referencia directa al grupo de mallas (el objeto 3D).
    const groupRef = useRef(null)
    // `useRef` para mantener el valor de `progress` actualizado dentro del bucle de animación `useFrame`.
    const progressRef = useRef(progress)

    // Actualiza la referencia del progreso en cada renderizado.
    progressRef.current = progress

    // `useFrame` es un hook de React Three Fiber que ejecuta una función en cada fotograma de la animación.
    useFrame(() => {
        if (!groupRef.current) return // Si la referencia no existe, no hacer nada.

        // Cambia la inclinación de la barra dependiendo de si está en la mitad superior o inferior del recorrido.
        const tilt = progressRef.current;

        // Animación continua:
        // 1. Rotación constante sobre el eje Y. `delta` es el tiempo desde el último fotograma.
        // groupRef.current.rotation.y += delta * 0.6
        // 2. Inclinación sobre el eje X + un suave bamboleo usando `Math.sin`. `clock.elapsedTime` es el tiempo total.
        groupRef.current.rotation.x = tilt + Math.sin(0.4) * 0.05
        // 3. Movimiento de flotación vertical (arriba y abajo) sobre el eje Y.
        // groupRef.current.position.y = tilt + Math.sin(0.6) * 0.08
    })

    // El componente retorna un grupo de mallas que forman la barra de chocolate.
    // `castShadow` hace que este objeto proyecte sombras.
    return (
        <group ref={groupRef}>
            
            {/* Cubículo de chocolate */}
            <mesh>
                <boxGeometry args={[4, 0.2, 2]} />
                <meshStandardMaterial
                    color="#ffffffff"
                    metalness={0.25}
                    roughness={0.42}
                />
            </mesh>

        </group>
    )
}

// --- COMPONENTE DE LA ESCENA 3D ---

// Configura la escena 3D: luces, cámara y un plano para recibir sombras.
const Scene = ({ progress }) => (
    <Canvas
        gl={{ antialias: true }} // Habilita el antialiasing para bordes más suaves.
        camera={{ fov: 38, position: [4, 2.2, 4] }} // Configuración de la cámara (campo de visión y posición).
    >
        {/* Luces para iluminar la barra de chocolate */}
        <ambientLight intensity={1} /> {/* Luz ambiental general */}
        <spotLight
            position={[6, 6, 2]}
            intensity={1.3}
            angle={0.6}
            penumbra={0.6}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.4} />

        {/* Renderiza el componente de la barra de chocolate y le pasa el progreso del scroll. */}
        <ChocolateBar progress={progress} />

    </Canvas>
)

// --- COMPONENTE PRINCIPAL DE LA EXPERIENCIA ---

// Coordina la posición de la barra de chocolate para que se deslice desde la sección "hero"
// hasta la sección "story" a medida que el usuario hace scroll.
const ChocolateBarExperience = () => {
    // `useState` para almacenar el estado de la animación: posición, tamaño y progreso.
    const [state, setState] = useState({
        ready: false, // `false` hasta que se calculen las posiciones iniciales.
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        progress: 0, // Progreso del scroll (0 = inicio, 1 = final).
    })

    // `useEffect` se ejecuta una vez al montar el componente para configurar los listeners de eventos.
    useEffect(() => {
        // No hacer nada si el código se ejecuta en el servidor (SSR).
        if (typeof window === 'undefined') return

        let frame = null // Variable para controlar `requestAnimationFrame`.

        // La función `update` se encarga de calcular la posición y el tamaño del canvas 3D.
        const update = () => {
            frame = null
            // Obtiene los elementos DOM que marcan el inicio y el final del recorrido.
            const heroEl = document.getElementById('bar-stage-hero')
            const storyEl = document.getElementById('bar-stage-story')
            if (!heroEl || !storyEl) return // Si no existen, no continuar.

            const heroRect = heroEl.getBoundingClientRect()
            const storyRect = storyEl.getBoundingClientRect()

            // Mide las posiciones de los "anclajes" (puntos de inicio y fin) en la página.
            const heroCenterPage = heroRect.top + window.scrollY + heroRect.height / 2
            const storyCenterPage = storyRect.top + window.scrollY + storyRect.height / 2
            const heroCenterX = heroRect.left + heroRect.width / 2
            const storyCenterX = storyRect.left + storyRect.width / 2

            // Calcula un valor de progreso (de 0 a 1) basado en la posición del scroll.
            const heroAnchor = heroRect.top + window.scrollY + heroRect.height * 0.1
            const storyAnchor = storyRect.top + window.scrollY - window.innerHeight * 0.4
            const focus = window.scrollY + window.innerHeight * 0.35
            const denominator = storyAnchor - heroAnchor
            const raw = denominator === 0 ? 0 : (focus - heroAnchor) / denominator
            const progress = clamp(raw, 0, 1) // Asegura que el progreso esté entre 0 y 1.

            // Ajusta el tamaño del canvas según el ancho de la ventana (responsive).
            const width =
                window.innerWidth < 640
                    ? 220
                    : window.innerWidth < 1024
                      ? 270
                      : 330
            const height = width * 0.4

            // Interpola las posiciones X e Y entre los anclajes usando `lerp`.
            const currentX = lerp(heroCenterX, storyCenterX, progress)
            const currentYPage = lerp(heroCenterPage, storyCenterPage, progress)
            const currentYViewport = currentYPage - window.scrollY // Convierte a coordenadas de la ventana.

            // Calcula las posiciones finales `left` y `top`, asegurando que no se salga de la pantalla.
            const left = clamp(
                currentX - width / 2,
                12,
                window.innerWidth - width - 12
            )
            const top = currentYViewport - height / 2

            // Actualiza el estado del componente con los nuevos valores calculados.
            setState({ ready: true, left, top, width, height, progress })
        }

        // `requestUpdate` optimiza las llamadas a `update` usando `requestAnimationFrame`.
        // Esto evita que `update` se ejecute demasiadas veces durante el scroll, mejorando el rendimiento.
        const requestUpdate = () => {
            if (frame) return
            frame = requestAnimationFrame(update)
        }

        // Llama a `update` una vez al inicio para la posición inicial.
        update()
        // Agrega los listeners para los eventos de scroll y cambio de tamaño de la ventana.
        window.addEventListener('scroll', requestUpdate, { passive: true })
        window.addEventListener('resize', requestUpdate)

        // Función de limpieza: se ejecuta cuando el componente se desmonta.
        return () => {
            if (frame) cancelAnimationFrame(frame)
            window.removeEventListener('scroll', requestUpdate)
            window.removeEventListener('resize', requestUpdate)
        }
    }, []) // El array vacío `[]` asegura que el `useEffect` se ejecute solo una vez.

    // No renderiza nada hasta que el estado esté "listo".
    if (!state.ready) return null

    // Renderiza el contenedor del canvas 3D.
    return (
        // Contenedor fijo que ocupa toda la pantalla y no intercepta clics del ratón.
        <div className="pointer-events-none fixed inset-0 z-30">
            <div
                // El div que contiene el canvas. Su posición se actualiza dinámicamente.
                className="absolute transition-[left,top] duration-200 ease-out"
                style={{
                    width: state.width,
                    height: state.height,
                    left: state.left,
                    top: state.top,
                    opacity: 1,
                    transform: 'translateZ(0)', // Promueve a una capa de composición para mejor rendimiento.
                }}
            >
                {/* Renderiza la escena 3D y le pasa el progreso para cambiar la inclinación de la barra. */}
                <Scene progress={state.progress} />
            </div>
        </div>
    )
}

export default ChocolateBarExperience
