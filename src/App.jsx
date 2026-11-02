import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'

export default function App() {
  return (
    <div className="min-h-svh overflow-x-clip bg-ground">
      <Header />
      <main>
        <Hero />
        <div className="mx-auto max-w-[1240px] px-4 pt-24 wide:px-12 wide:pt-40">
          <FeaturedProject />
        </div>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-3 pt-24 sm:gap-10 sm:px-8 wide:pt-40">
          <Experience />
          <Skills />
          <Contact />
        </div>
      </main>
      <div className="mx-auto max-w-[1440px] px-3 pb-28 sm:px-8 wide:pb-16">
        <Footer />
      </div>
      <BottomNav />
    </div>
  )
}
