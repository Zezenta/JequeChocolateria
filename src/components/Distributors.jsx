// Distributor form balances retail-friendly copy with lead capture.
const Distributors = () => (
    <section
        id="distribuidores"
        className="relative isolate overflow-hidden bg-gradient-to-b from-[#0a0302] via-[#150802]/82 to-[#0a0302] py-10 z-20"
    >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,175,80,0.1),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4CAF50]/40 to-transparent" />
        <div className="pointer-events-none absolute -right-20 bottom-[-35%] h-[580px] w-[580px] rounded-full bg-[#D4AF37]/12 blur-[200px]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-20 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-10">
                <div className="space-y-4">
                    <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
                        Distribuidores
                    </p>
                    <h2 className="font-serif text-4xl text-[#F6EACC] sm:text-5xl">
                        Endulza tu góndola con chocolates premium
                    </h2>
                </div>
                <p className="text-base leading-relaxed text-gray-200 sm:text-lg">
                    Proveemos fichas técnicas, empaques listos para retail y
                    planogramas sugeridos. Gestionamos cadena de frío,
                    merchandising modular y despachos programados para
                    supermercados gourmet y concept stores.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-[0.35em] text-[#4CAF50]/80">
                            Aliados
                        </span>
                        <p className="mt-3 font-serif text-2xl text-[#D4AF37]">
                            Retail selecto
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                            Megamaxi Gourmet, La Favorita Concept, marketplaces
                            especializados.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-[0.35em] text-[#4CAF50]/80">
                            Servicios
                        </span>
                        <p className="mt-3 font-serif text-2xl text-[#D4AF37]">
                            Material POP
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                            Degustaciones, exhibidores refrigerados y kits
                            corporativos personalizados.
                        </p>
                    </div>
                </div>
            </div>

            <form
                className="space-y-8 rounded-[2.5rem] border border-white/10 bg-[#0b0402]/70 p-8 backdrop-blur-sm"
                onSubmit={(event) => event.preventDefault()}
            >
                <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                        Nombre
                        <input
                            type="text"
                            className="mt-3 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
                            placeholder="Ingresa tu nombre"
                        />
                    </label>
                    <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                        Correo
                        <input
                            type="email"
                            className="mt-3 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
                            placeholder="empresa@correo.com"
                        />
                    </label>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                        Provincia
                        <select
                            className="mt-3 rounded-full border border-white/20 bg-[#1A1A1A] px-5 py-3 text-sm text-gray-100 outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none"
                            defaultValue=""
                        >
                            <option value="" disabled hidden>
                                Selecciona una provincia
                            </option>
                            <option
                                value="azuay"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Azuay
                            </option>
                            <option
                                value="bolivar"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Bolívar
                            </option>
                            <option
                                value="canar"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Cañar
                            </option>
                            <option
                                value="carchi"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Carchi
                            </option>
                            <option
                                value="chimborazo"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Chimborazo
                            </option>
                            <option
                                value="cotopaxi"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Cotopaxi
                            </option>
                            <option
                                value="el-oro"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                El Oro
                            </option>
                            <option
                                value="esmeraldas"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Esmeraldas
                            </option>
                            <option
                                value="galapagos"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Galápagos
                            </option>
                            <option
                                value="guayas"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Guayas
                            </option>
                            <option
                                value="imbabura"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Imbabura
                            </option>
                            <option
                                value="loja"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Loja
                            </option>
                            <option
                                value="los-rios"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Los Ríos
                            </option>
                            <option
                                value="manabi"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Manabí
                            </option>
                            <option
                                value="morona-santiago"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Morona Santiago
                            </option>
                            <option
                                value="napo"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Napo
                            </option>
                            <option
                                value="orellana"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Orellana
                            </option>
                            <option
                                value="pastaza"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Pastaza
                            </option>
                            <option
                                value="pichincha"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Pichincha
                            </option>
                            <option
                                value="santa-elena"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Santa Elena
                            </option>
                            <option
                                value="santo-domingo"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Santo Domingo de los Tsáchilas
                            </option>
                            <option
                                value="sucumbios"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Sucumbíos
                            </option>
                            <option
                                value="tungurahua"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Tungurahua
                            </option>
                            <option
                                value="zamora-chinchipe"
                                className="bg-[#1A1A1A] text-gray-100"
                            >
                                Zamora Chinchipe
                            </option>
                        </select>
                    </label>
                    <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                        Teléfono
                        <input
                            type="tel"
                            className="mt-3 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
                            placeholder="+593..."
                        />
                    </label>
                </div>
                <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                    Mensaje
                    <textarea
                        rows="4"
                        className="mt-3 rounded-3xl border border-white/20 bg-transparent px-5 py-4 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
                        placeholder="Cuéntanos qué necesitas"
                    />
                </label>
                <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#D4AF37] px-10 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#3B1E0F] transition hover:bg-[#f3d479]"
                >
                    Enviar solicitud
                </button>
            </form>
        </div>
    </section>
)

export default Distributors
