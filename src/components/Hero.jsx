import ChocolateBarVisual from './ChocolateBarVisual'

const Hero = () => (
  <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#2B1207] via-[#1A0804] to-[#090201] py-24">
    <div className="pointer-events-none absolute -top-40 right-[-15%] h-[480px] w-[480px] rounded-full bg-[#D4AF37]/15 blur-3xl" />
    <div className="pointer-events-none absolute bottom-[-45%] left-[-10%] h-[520px] w-[520px] rounded-full bg-[#4CAF50]/10 blur-3xl" />
    <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-16 px-6 sm:px-8 lg:flex-row lg:items-center lg:gap-24">
      <div className="max-w-xl space-y-8">
        <p className="font-serif text-sm uppercase tracking-[0.4em] text-[#D4AF37]/80">
          Chocolatería de Autor
        </p>
        <h1 className="font-serif text-5xl leading-tight text-[#D4AF37] sm:text-6xl">
          Sabores de Dubái, hechos en Cuenca.
        </h1>
        <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
          Conoce Jeque Chocolatería — fusión artesanal de cacao ecuatoriano y recetas árabes.
          Elaboramos barras premium con rellenos exuberantes inspirados en los zocos de Dubái,
          pensadas para deleitar paladares exigentes en Ecuador, Colombia y Perú.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#distribuidores"
            className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-9 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#3B1E0F] transition hover:bg-[#f3d479]"
          >
            Cotiza pedidos
          </a>
          <span className="text-sm font-medium text-[#4CAF50]">
            Distribución: Ecuador · Colombia · Perú
          </span>
        </div>
      </div>
      <div className="flex w-full max-w-sm flex-col items-center gap-6 lg:items-end">
        <ChocolateBarVisual variant="hero" />
        <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/70">
          Próxima escena: barra 3D interactiva
        </p>
      </div>
    </div>
  </section>
)

export default Hero
