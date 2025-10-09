// Each product card keeps a placeholder block where future imagery can go.
const products = [
    {
        name: 'Dubái Royal',
        description:
            'Dátiles Medjool caramelizados, pistacho tostado y cardamomo sobre cacao fino 72%.',
        badge: 'Formato 90 g',
    },
    {
        name: 'Oasis Pistacho',
        description:
            'Praliné de pistacho con crocante de caramelo y cacao andino para un final cremoso.',
        badge: 'Caja x12',
    },
    {
        name: 'Sultán Noir',
        description:
            'Infusión de café árabe, naranja confitada y delicadas notas de cacao Zamora 70%.',
        badge: 'Lote continuo',
    },
    {
        name: 'Perla Rosa',
        description:
            'Chocolate ruby con agua de rosas, frambuesas liofilizadas y pétalos cristalizados.',
        badge: 'Novedad temporada',
    },
]

// Product grid highlights retail-ready variants along with logistics notes.
const Products = () => (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-transparent via-[#0b0402]/85 to-[#0a0302] py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="pointer-events-none absolute -left-32 top-24 h-[520px] w-[520px] rounded-full bg-[#f3d479]/10 blur-[160px]" />
        <div className="pointer-events-none absolute right-[-15%] bottom-[-25%] h-[640px] w-[640px] rounded-full bg-[#4CAF50]/10 blur-[220px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 sm:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl space-y-5">
                    <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
                        Colección retail premium
                    </p>
                    <h2 className="font-serif text-4xl text-[#F6EACC] sm:text-5xl">
                        Barras listas para góndola, pedidos corporativos y
                        e-commerce especializado.
                    </h2>
                    <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
                        Empaques con sellado hermético, información nutricional
                        y códigos para inventario. Mantén el look artesanal
                        mientras escalas a supermercados gourmet, tiendas duty
                        free y dark stores.
                    </p>
                </div>
                <div className="flex flex-col items-start gap-3 text-xs uppercase tracking-[0.35em] text-[#f3d479]/70">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[#D4AF37]">
                        Cadena de frío incluida
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[#4CAF50]">
                        Pedido mínimo: 6 cajas
                    </span>
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-4">
                {products.map((product) => (
                    <article
                        key={product.name}
                        className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/[0.04] p-8 transition duration-500 ease-out hover:-translate-y-3 hover:bg-white/[0.08] hover:shadow-[0_60px_120px_-60px_rgba(212,175,55,0.45)]"
                    >
                        <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] bg-white/[0.06]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" />
                            <div className="absolute inset-4 rounded-[1.7rem] border border-white/12" />
                            <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs uppercase tracking-[0.35em] text-[#E7DCC0]/80">
                                Imagen del producto
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-serif text-2xl text-[#D4AF37]">
                                    {product.name}
                                </h3>
                                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-[#f3d479]/80">
                                    {product.badge}
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-300">
                                {product.description}
                            </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[#f6e7c8]/70">
                            <span>Lista en 72h</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
)

export default Products
