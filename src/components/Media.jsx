// Outlet list renders twice to create a continuous marquee loop.
const outlets = [
    { label: 'Telerama', accent: '#D4AF37' },
    { label: 'UNSIÓN TV', accent: '#4CAF50' },
    { label: 'Revista Andina Gourmet', accent: '#F4E3B2' },
    { label: 'Cuenca Luxury Fair', accent: '#B68D40' },
    { label: 'Gulf Taste Awards', accent: '#C2B280' },
]

const marqueeItems = [...outlets, ...outlets]

// Media section stretches full-width so the ribbon feels seamless on mobile and desktop.
const Media = () => (
    <section className="relative isolate overflow-hidden py-20">
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
                        className="flex items-center gap-4 text-left text-[0.65rem] uppercase tracking-[0.35em] text-[#D4AF37]/80"
                    >
                        <svg
                            width="72"
                            height="72"
                            viewBox="0 0 72 72"
                            className="flex-shrink-0 drop-shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                        >
                            <defs>
                                <linearGradient
                                    id={`badge-${index}`}
                                    x1="0"
                                    x2="1"
                                    y1="1"
                                    y2="0"
                                >
                                    <stop offset="0%" stopColor="#1F0C05" />
                                    <stop
                                        offset="50%"
                                        stopColor={media.accent}
                                        stopOpacity="0.7"
                                    />
                                    <stop offset="100%" stopColor="#140702" />
                                </linearGradient>
                            </defs>
                            <rect
                                x="6"
                                y="6"
                                width="60"
                                height="60"
                                rx="18"
                                fill={`url(#badge-${index})`}
                                stroke={media.accent}
                                strokeOpacity="0.65"
                            />
                            <path
                                d="M24 42c6-10 18-10 24 0"
                                stroke={media.accent}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                opacity="0.8"
                            />
                            <path
                                d="M36 26l4 8h-8l4-8Z"
                                fill={media.accent}
                                opacity="0.75"
                            />
                        </svg>
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
