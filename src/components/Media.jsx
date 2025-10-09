const outlets = [
    { label: 'Telerama', accent: '#D4AF37' },
    { label: 'UNSIÓN TV', accent: '#4CAF50' },
    { label: 'Revista Andina Gourmet', accent: '#F4E3B2' },
    { label: 'Cuenca Luxury Fair', accent: '#B68D40' },
    { label: 'Gulf Taste Awards', accent: '#C2B280' },
]

const marqueeItems = [...outlets, ...outlets]

const Media = () => (
    <section className="bg-gradient-to-b from-transparent via-[#0F0503]/75 to-transparent py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center sm:px-8">
            <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
                Como visto en...
            </p>
            <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <div className="relative w-full overflow-hidden py-4">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#070302] via-[#070302]/80 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#070302] via-[#070302]/80 to-transparent" />
                <div className="flex min-w-max animate-marquee items-center gap-14 pr-14">
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
                                        <stop
                                            offset="100%"
                                            stopColor="#140702"
                                        />
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
        </div>
    </section>
)

export default Media
