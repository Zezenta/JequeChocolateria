import Hero from './components/Hero'
import ThreeDSection from './components/ThreeDSection'
import Story from './components/Story'
import Products from './components/Products'
import Media from './components/Media'
import Distributors from './components/Distributors'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen scroll-smooth bg-[#0A0402] font-sans text-gray-100 antialiased">
      <main>
        <Hero />
        <ThreeDSection />
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
