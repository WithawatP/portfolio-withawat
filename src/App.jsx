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
    <div className="min-h-svh overflow-x-clip bg-surface">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-4 pt-6 pb-16 sm:px-8">
        <Header />
        <main className="flex flex-col gap-10 pt-4">
          <Hero />
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
    </div>
  )
}
