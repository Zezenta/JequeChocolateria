const products = [
  {
    name: 'Dubái Royal',
    description:
      'Dátiles Medjool caramelizados, pistacho tostado y cardamomo sobre cacao fino 72%.',
  },
  {
    name: 'Oasis Pistacho',
    description:
      'Praliné de pistacho con crocante de caramelo y cacao andino para un final cremoso.',
  },
  {
    name: 'Sultán Noir',
    description:
      'Infusión de café árabe, naranja confitada y delicadas notas de cacao Zamora 70%.',
  },
  {
    name: 'Perla Rosa',
    description:
      'Chocolate ruby con agua de rosas, frambuesas liofilizadas y pétalos cristalizados.',
  },
]

const Products = () => (
  <section className="bg-[#120604] py-24">
    <div className="mx-auto max-w-6xl space-y-14 px-6 sm:px-8">
      <div className="max-w-2xl space-y-4">
        <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
          Portafolio premium
        </p>
        <h2 className="font-serif text-4xl text-[#D4AF37] sm:text-5xl">
          Colecciones para vitrinas exclusivas.
        </h2>
        <p className="text-base leading-relaxed text-gray-200">
          Diseñamos lotes limitados con procesos de templado lento y empaques listos para retail
          gourmet, duty free y amenities de lujo. Ingredientes nobles, trazabilidad y consistencia.
        </p>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.name}
            className="group relative flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-white/[0.04] p-8 backdrop-blur-sm transition duration-500 ease-out hover:bg-white/[0.08] hover:shadow-[0_45px_70px_-30px_rgba(212,175,55,0.55)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 text-xs uppercase tracking-[0.3em] text-gray-500 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-80">
              {/* imagen de {product.name} */}
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-2xl text-[#D4AF37]">{product.name}</h3>
              <p className="text-sm leading-relaxed text-gray-300">{product.description}</p>
            </div>
            <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[#4CAF50]/80">
              <span>Lote limitado</span>
              <span>Entrega 72h</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Products
