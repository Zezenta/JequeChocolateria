const outlets = ['Telerama', 'UNSIÓN TV', 'Revista Andina Gourmet', 'Cuenca Luxury Fair']

const Media = () => (
  <section className="bg-[#0F0503] py-16">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center sm:px-8">
      <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
        Como visto en...
      </p>
      <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <div className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-6 text-xs uppercase tracking-[0.4em] text-[#D4AF37]/70">
        {outlets.map((media) => (
          <span key={media} className="transition hover:text-[#D4AF37]">
            {media}
          </span>
        ))}
      </div>
    </div>
  </section>
)

export default Media
