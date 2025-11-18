const Footer = () => (
    <footer className="border-t border-[#D4AF37]/10 bg-[#070302] py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
                <p className="font-serif text-lg text-[#D4AF37]">
                    Jeque Chocolatería
                </p>
                <p className="mt-1 text-gray-500 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                    Sabores de Dubái, hechos en Cuenca.
                </p>
            </div>
            <div className="space-y-2 text-xs uppercase tracking-[0.35em] text-gray-500">
                <p className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">ventas@jequechocolateria.com</p>
                <p className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">Cuenca, Ecuador</p>
                <p className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">Distribución en todo Ecuador</p>
            </div>
        </div>
    </footer>
)

export default Footer
