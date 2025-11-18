import telerama from '../assets/telerama.webp'
import unsiontv from '../assets/unsiontv.jpg'
import lanuevefm from '../assets/lanuevefm.jpg'
import exposanjose from '../assets/exposanjose.png'

// Outlet list renders twice to create a continuous marquee loop.
const outlets = [
    { label: 'Telerama', accent: '#D4AF37', image: telerama },
    { label: 'UNSIÓN TV', accent: '#4CAF50', image: unsiontv },
    { label: 'Radio La Nueve', accent: '#F4E3B2', image: lanuevefm },
    { label: 'Expo San José', accent: '#B68D40', image: exposanjose },
]

const marqueeItems = [...outlets, ...outlets]

// Media section stretches full-width so the ribbon feels seamless on mobile and desktop.
const Media = () => (
    <section className="relative isolate overflow-hidden py-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#110704]/80 to-[#090302]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center sm:px-8">
            <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
                Como visto en...
            </p>
            <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </div>
        <div className="relative left-1/2 mt-10 w-[100vw] -translate-x-1/2 overflow-hidden border-y border-white/10 bg-[#080302]/90 py-5 backdrop-blur">
            <div className="flex min-w-max animate-marquee items-center gap-16 pr-16">
                {marqueeItems.map((media, index) => (
                    <div
                        key={`${media.label}-${index}`}
                        className="flex items-center gap-4 text-left text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80"
                    >
                        <img
                            src={media.image}
                            alt={media.label}
                            className="h-18 w-18 flex-shrink-0 rounded-lg object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                            style={{ height: '72px', width: '72px' }}
                        />
                        <span className="whitespace-nowrap text-[#E7DCC0]">
                            {media.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </section>
)

export default Media
