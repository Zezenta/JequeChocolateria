import ChocolateBarVisual from './ChocolateBarVisual'

const Story = () => (
  <section className="relative isolate overflow-hidden bg-[#1D0904] py-24">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-96 w-96 rounded-full bg-[#4CAF50]/10 blur-3xl" />
    </div>
    <div className="relative mx-auto grid max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-[3fr_2fr] lg:items-center">
      <div className="space-y-8">
        <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
          Historia Jeque
        </p>
        <h2 className="font-serif text-4xl text-[#D4AF37] sm:text-5xl">
          Del cacao ecuatoriano al lujo árabe.
        </h2>
        <p className="text-base leading-relaxed text-gray-200">
          Nuestro maestro chocolatero, Martín Álvarez, viajó a Dubái en 2016 para perfeccionar
          técnicas de templado con maestros árabes. Entre zocos descubrió combinaciones con
          dátiles, especias y frutos secos que reinterpretó con cacao de la Amazonía ecuatoriana.
        </p>
        <p className="text-base leading-relaxed text-gray-200">
          Cada barra Jeque Chocolatería encapsula ese viaje: cardamomo, pistacho, agua de azahar y
          tostados precisos que resaltan el origen fino de nuestro cacao. Pensadas para hoteles,
          duty free y cadenas gourmet que buscan diferenciación sin comprometer la artesanía.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-3 border-l border-[#D4AF37]/40 pl-5">
            <span className="font-serif text-xl text-[#D4AF37]">Presencia regional</span>
            <p className="text-sm text-gray-300">
              Logística y soporte comercial en Ecuador, Colombia y Perú con entregas controladas.
            </p>
          </div>
          <div className="flex flex-col gap-3 border-l border-[#4CAF50]/40 pl-5">
            <span className="font-serif text-xl text-[#4CAF50]">Cacao 72%</span>
            <p className="text-sm text-gray-300">
              Seleccionamos fincas APROCAFA y fusionamos infusiones de inspiración árabe.
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <div className="flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden rounded-[2.5rem] bg-gray-200 text-sm uppercase tracking-[0.3em] text-gray-500">
          {/* imagen del chef en Dubái con cacao */}
        </div>
        <div className="absolute -bottom-16 -left-24 hidden lg:block">
          <ChocolateBarVisual variant="story" />
        </div>
      </div>
    </div>
  </section>
)

export default Story
