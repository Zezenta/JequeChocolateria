const Hero = () => {
    // Hero introduces the retail positioning and hosts the start point for the 3D bar.
    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-gradient-to-b from-[#2B1207]/70 via-[#1A0804]/80 to-transparent pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24 lg:pt-16 lg:pb-16 xl:pt-12 xl:pb-12 2xl:pt-0 2xl:pb-0"
        >
            <div className="-z-10 pointer-events-none absolute -top-44 right-[-25%] h-[520px] w-[520px] rounded-full bg-[#D4AF37]/15 blur-3xl" />
            <div className="-z-10 pointer-events-none absolute -bottom-[35%] left-[-15%] h-[620px] w-[620px] rounded-full bg-[#4CAF50]/12 blur-[180px]" />
            <div className="-z-10 pointer-events-none absolute left-1/2 top-5 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#f4e3b2]/6 blur-[140px]" />

            {/* Layout stretches taller on large screens so the bar has room to float. */}
            <div className="z-20 relative mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col gap-16 px-6 sm:px-8 lg:min-h-[80vh] lg:flex-row lg:items-center lg:gap-24 xl:min-h-[92vh]">
                <div className="relative max-w-2xl space-y-10">
                    {/* Pill detail emphasises the retail launch angle. */}
                    <div className="inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/25 bg-[#1F0C05]/70 px-6 py-2 text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">
                        <span>Jeque Chocolatería</span>
                        <span className="h-1 w-8 bg-gradient-to-r from-[#D4AF37] to-[#f3d479]" />
                        <span>Chocolate Dubái</span>
                    </div>
                    <h1 className="font-serif text-5xl leading-tight text-[#D4AF37] sm:text-6xl xl:text-7xl">
                        Chocolate artesanal para supermercados premium
                    </h1>
                    <p className="text-base leading-relaxed text-gray-200 sm:text-lg tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                        Barras de chocolate ecuatoriano 60% rellenas de pistacho
                        y kunafa inspiradas en Dubái, pensadas para
                        supermercados premium, cadenas concept y pedidos
                        personalizados.
                    </p>
                    {/* Retail proof-points to support mass distribution use-case. */}
                    <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-[#f6e7c8]/70">
                        <span className="rounded-full border border-white/20 px-4 py-2 text-[#D4AF37]">
                            Empaque listo para retail
                        </span>
                        <span className="rounded-full border border-white/10 px-4 py-2 text-[#f3d479]">
                            Pedidos mínimos escalables
                        </span>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <a
                            href="#distribuidores"
                            className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-9 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#3B1E0F] transition hover:bg-[#f3d479]"
                        >
                            Cotiza pedidos
                        </a>
                        <span className="text-sm font-medium text-[#4CAF50]">
                            Distribución en todo Ecuador
                        </span>
                    </div>
                </div>

                {/* Anchor where the floating bar canvas can overlap the section. */}
                <div
                    id="bar-stage-hero"
                    className="relative w-full max-w-lg flex-1 min-h-[260px] pb-4 sm:pb-8"
                    aria-hidden="true"
                ></div>
            </div>
        </section>
    )
}

export default Hero
