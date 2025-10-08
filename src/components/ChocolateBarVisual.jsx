const ChocolateBarVisual = ({ variant = 'hero' }) => {
  if (variant === 'story') {
    return (
      <div className="relative isolate flex h-40 w-full max-w-xl items-center overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#351508] via-[#2A0E05] to-[#120502] shadow-[0_30px_70px_rgba(0,0,0,0.6)] ring-1 ring-[#D4AF37]/25 transition-transform duration-700 ease-out hover:-translate-y-1">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/40 opacity-80" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#4CAF50]/20 blur-3xl" />
        <div className="relative flex w-full items-center gap-8 px-10">
          <div className="grid flex-1 grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-16 rounded-xl bg-gradient-to-br from-[#4B2513] to-[#2A1006] ring-1 ring-black/40"
              />
            ))}
          </div>
          <div className="hidden flex-col items-center gap-3 text-right text-xs uppercase tracking-[0.4em] text-[#D4AF37]/70 sm:flex">
            <span>Relleno</span>
            <div className="h-12 w-12 rounded-full bg-[#4CAF50]/50 blur-xl" />
            <span>Revelado</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative isolate h-80 w-28 overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#4B2715] via-[#33160B] to-[#1A0703] shadow-[0_45px_90px_rgba(0,0,0,0.65)] ring-1 ring-[#D4AF37]/30 transition-transform duration-700 ease-out hover:-translate-y-1">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/50 opacity-70" />
      <div className="pointer-events-none absolute -left-6 top-12 h-36 w-16 rotate-12 rounded-full bg-[#D4AF37]/40 blur-2xl" />
      <div className="relative flex h-full w-full flex-col justify-between p-6">
        <div className="h-2 rounded-full bg-[#D4AF37]/70" />
        <div className="grid gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-10 rounded-2xl bg-gradient-to-br from-[#4F2614] to-[#2B0E05] ring-1 ring-black/30"
            />
          ))}
        </div>
        <div className="h-3 rounded-full bg-[#4CAF50]/70" />
      </div>
    </div>
  )
}

export default ChocolateBarVisual
