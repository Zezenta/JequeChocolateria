const Distributors = () => (
    <section
        id="distribuidores"
        className="bg-gradient-to-b from-transparent via-[#150802]/80 to-transparent py-24"
    >
        <div className="mx-auto grid max-w-6xl gap-20 px-6 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-8">
                <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80">
                    Distribuidores
                </p>
                <h2 className="font-serif text-4xl text-[#D4AF37] sm:text-5xl">
                    Exclusividad Jeque para tu portafolio.
                </h2>
                <p className="text-base leading-relaxed text-gray-200">
                    Completa el formulario para acceder a nuestro catálogo
                    profesional, fichas técnicas, condiciones de volumen y
                    acompañamiento de marketing. Respondemos en menos de 24
                    horas hábiles con propuestas adaptadas a tu canal de venta.
                </p>
                <ul className="space-y-5 text-sm text-gray-300">
                    <li className="flex items-start gap-3">
                        <span className="mt-1 h-1 w-8 bg-[#4CAF50]" />
                        Activaciones premium con material POP, catas guiadas y
                        storytelling de origen.
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="mt-1 h-1 w-8 bg-[#4CAF50]" />
                        Empaques listos para góndola gourmet y duty free, con
                        trazabilidad certificada.
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="mt-1 h-1 w-8 bg-[#4CAF50]" />
                        Posibilidad de exclusividad territorial negociable y
                        planes de reposición recurrente.
                    </li>
                </ul>
            </div>
            <form
                className="space-y-8"
                onSubmit={(event) => event.preventDefault()}
            >
                <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                        Nombre
                        <input
                            type="text"
                            className="mt-3 border-b border-white/30 bg-transparent py-2 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
                            placeholder="Ingresa tu nombre"
                        />
                    </label>
                    <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                        Correo
                        <input
                            type="email"
                            className="mt-3 border-b border-white/30 bg-transparent py-2 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
                            placeholder="empresa@correo.com"
                        />
                    </label>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                        País
                        <input
                            type="text"
                            className="mt-3 border-b border-white/30 bg-transparent py-2 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
                            placeholder="Ecuador, Colombia..."
                        />
                    </label>
                    <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                        Teléfono
                        <input
                            type="tel"
                            className="mt-3 border-b border-white/30 bg-transparent py-2 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
                            placeholder="+593..."
                        />
                    </label>
                </div>
                <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70">
                    Mensaje
                    <textarea
                        rows="4"
                        className="mt-3 border-b border-white/30 bg-transparent py-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition focus:border-[#D4AF37]"
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
