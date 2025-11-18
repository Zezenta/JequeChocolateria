// Distributor form balances retail-friendly copy with lead capture.
const Distributors = () => (
    <section
        id="distribuidores"
        className="relative isolate overflow-hidden bg-gradient-to-b from-[#0a0302] via-[#150802]/82 to-[#0a0302] py-10 z-20"
    >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,175,80,0.1),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4CAF50]/40 to-transparent" />
        <div className="pointer-events-none absolute -right-20 bottom-[-35%] h-[580px] w-[580px] rounded-full bg-[#D4AF37]/12 blur-[200px]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:items-stretch">
            <div className="space-y-10 flex flex-col lg:h-full">
                <div className="space-y-4">
                    <p className="font-serif text-sm uppercase tracking-widest text-[#D4AF37]/80 lg:tracking-[0.35em]">
                        Distribuidores
                    </p>
                    <h2 className="font-serif text-3xl text-[#F6EACC] sm:text-4xl lg:text-5xl">
                        Endulza tu góndola con chocolates premium
                    </h2>
                </div>
                <p className="text-base leading-relaxed text-gray-200 sm:text-lg break-words tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    Proveemos fichas técnicas, empaques listos para retail y
                    planogramas sugeridos. Gestionamos cadena de frío,
                    merchandising modular y despachos programados para
                    supermercados gourmet y concept stores.
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:mt-auto">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:p-8 backdrop-blur-sm flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-[#4CAF50]/80 lg:tracking-[0.35em]">
                            Cobertura
                        </span>
                        <p className="mt-3 font-serif text-2xl lg:text-3xl text-[#D4AF37] leading-tight">
                            Distribución nacional
                        </p>
                        <p className="mt-3 lg:mt-4 text-sm lg:text-base text-gray-400 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                            Llegamos a todas las provincias del Ecuador con
                            logística especializada y tiempos de entrega garantizados.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:p-8 backdrop-blur-sm flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-[#4CAF50]/80 lg:tracking-[0.35em]">
                            Servicios
                        </span>
                        <p className="mt-3 font-serif text-2xl lg:text-3xl text-[#D4AF37] leading-tight">
                            Material<span className="lg:hidden"> </span><br className="hidden lg:block" />POP
                        </p>
                        <p className="mt-3 lg:mt-4 text-sm lg:text-base text-gray-400 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                            Degustaciones, exhibidores refrigerados y kits
                            corporativos personalizados. Incluimos diseño
                            gráfico, impresión y montaje de displays.
                        </p>
                    </div>
                </div>
            </div>

            <form
                className="flex flex-col gap-8 rounded-[2.5rem] border border-white/10 bg-[#0b0402]/70 p-8 backdrop-blur-sm lg:h-full lg:min-h-0"
                onSubmit={(event) => event.preventDefault()}
            >
                <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col text-xs uppercase tracking-wider text-[#D4AF37]/70 lg:tracking-[0.3em]">
                        Nombre
                        <input
                            type="text"
                            className="mt-3 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-gray-100 placeholder-gray-500 placeholder:tracking-normal outline-none transition focus:border-[#D4AF37]"
                            placeholder="Ingresa tu nombre"
                        />
                    </label>
                    <label className="flex flex-col text-xs uppercase tracking-wider text-[#D4AF37]/70 lg:tracking-[0.3em]">
                        Correo
                        <input
                            type="email"
                            className="mt-3 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-gray-100 placeholder-gray-500 placeholder:tracking-normal outline-none transition focus:border-[#D4AF37]"
                            placeholder="empresa@correo.com"
                        />
                    </label>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col text-xs uppercase tracking-wider text-[#D4AF37]/70 lg:tracking-[0.3em]">
                        Provincia
                        <select
                            className="mt-3 rounded-full border border-white/20 bg-[#1A1A1A] px-5 py-3 text-sm text-gray-100 tracking-normal outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none"
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
                    <label className="flex flex-col text-xs uppercase tracking-wider text-[#D4AF37]/70 lg:tracking-[0.3em]">
                        Teléfono
                        <input
                            type="tel"
                            className="mt-3 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-gray-100 placeholder-gray-500 placeholder:tracking-normal outline-none transition focus:border-[#D4AF37]"
                            placeholder="+593..."
                        />
                    </label>
                </div>
                <label className="flex flex-col text-xs uppercase tracking-wider text-[#D4AF37]/70 lg:tracking-[0.3em] lg:flex-grow lg:min-h-0">
                    Mensaje
                    <textarea
                        rows="4"
                        maxLength={500}
                        className="mt-3 flex-1 rounded-3xl border border-white/20 bg-transparent px-5 py-4 text-sm text-gray-100 placeholder-gray-500 tracking-normal placeholder:tracking-normal outline-none transition focus:border-[#D4AF37] resize-none overflow-y-auto lg:min-h-[6rem]"
                        placeholder="Cuéntanos qué necesitas"
                    />
                </label>
                <div className="flex flex-col gap-4 mt-auto">
                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-full bg-[#D4AF37] px-10 py-3 text-sm font-semibold uppercase tracking-widest text-[#3B1E0F] transition hover:bg-[#f3d479] lg:tracking-[0.35em]"
                    >
                        Enviar solicitud
                    </button>
                    <a
                        href="https://wa.me/c/593939969312"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#20BA5A] hover:shadow-lg hover:shadow-[#25D366]/30 hover:scale-[1.02] lg:tracking-[0.35em]"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Cotizar por WhatsApp
                    </a>
                </div>
            </form>
        </div>
    </section>
)

export default Distributors
