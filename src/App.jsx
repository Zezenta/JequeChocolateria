import Hero from './components/Hero'
import Story from './components/Story'
import Products from './components/Products'
import Media from './components/Media'
import Distributors from './components/Distributors'
import Footer from './components/Footer'
import ChocolateBarExperience from './components/ChocolateBarExperience'

function App() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070302] font-sans text-gray-100 antialiased">
            {/* Soft gradients sit behind every section to avoid hard edges between modules. */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.22),_rgba(7,3,2,0.45)_40%,_rgba(7,3,2,0.92)_78%,_rgba(7,3,2,1)_100%)]" />
            <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[38rem] w-[38rem] rounded-full bg-[#4CAF50]/12 blur-3xl" />
            <div className="pointer-events-none absolute -right-64 top-0 -z-10 h-[44rem] w-[44rem] rounded-full bg-[#D4AF37]/18 blur-[180px]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-[-28rem] -z-10 h-[56rem] rounded-full bg-[#39160b] opacity-40 blur-[220px]" />
            {/* The chocolate bar floats globally so it can travel between Hero and Story. */}
            <ChocolateBarExperience />
            <main className="relative">
                <Hero />
                <Story />
                <Products />
                <Media />
                <Distributors />
            </main>
            <Footer />
        </div>
    )
}

export default App
