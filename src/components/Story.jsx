// Story acts as the second anchor point where the bar settles below the headline.
const Story = () => (
    <section id="story" className="relative py-28">
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-transparent via-[#110704]/85 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.14),_transparent_45%)]" />
        <div className="pointer-events-none absolute -top-24 left-[10%] h-[480px] w-[480px] rounded-full bg-[#f3d479]/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-28%] right-[12%] h-[560px] w-[560px] rounded-full bg-[#4CAF50]/12 blur-[180px]" />

        {/* Centered content keeps space open for the floating bar to dock. */}
        <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center gap-12 px-6 text-center sm:px-8">
            <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
                Rellenos emblemáticos
            </p>
            <h2 className="font-serif text-5xl leading-tight text-[#F6EACC] sm:text-6xl">
                Con relleno de pistacho y kunafa.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg">
                Texturas crujientes y cremosas en un solo bocado: capas de
                pistacho, hebras de kunafa caramelizada y cacao ecuatoriano con
                templado espejo para destacar en góndola.
            </p>
        </div>

        {/* Scroll target: the chocolate bar canvas aligns itself here on scroll. */}
        <div
            id="bar-stage-story"
            className="relative z-0 mx-auto h-[260px] w-full max-w-2xl"
            aria-hidden="true"
        >
            
        <div className="pointer-events-none absolute inset-x-16 bottom-0 h-32 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl" />
        </div>
    </section>
)

export default Story
