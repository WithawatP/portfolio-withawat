import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import RevealOnScroll from './components/ui/RevealOnScroll'

export default function App() {
  return (
    <div className="min-h-svh overflow-x-clip bg-[#E7E7E7]">
      <Header />
      <main className="mx-auto w-full max-w-[1440px] px-6 pb-4 pt-4">
        <RevealOnScroll>
          <Hero />
        </RevealOnScroll>
        <RevealOnScroll>
          <FeaturedProject />
        </RevealOnScroll>
        <RevealOnScroll>
          <Experience />
        </RevealOnScroll>
        <RevealOnScroll>
          <Skills />
        </RevealOnScroll>
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
      </main>
      <Footer />
    </div>
  )
}
