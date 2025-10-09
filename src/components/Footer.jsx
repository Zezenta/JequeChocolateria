const Footer = () => (
    <footer className="border-t border-[#D4AF37]/10 bg-[#070302] py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
                <p className="font-serif text-lg text-[#D4AF37]">
                    Jeque Chocolatería
                </p>
                <p className="mt-1 text-gray-500">
                    Sabores de Dubái, hechos en Cuenca.
                </p>
            </div>
            <div className="space-y-2 text-xs uppercase tracking-[0.35em] text-gray-500">
                <p>ventas@jequechocolateria.com</p>
                <p>Cuenca, Ecuador</p>
                <p>Distribución: Ecuador · Colombia · Perú</p>
            </div>
        </div>
    </footer>
)

export default Footer
