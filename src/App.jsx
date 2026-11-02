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
    <div className="min-h-svh overflow-x-clip bg-surface">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-3 pt-6 pb-28 sm:px-8 sm:pb-16">
        <Header />
        <main className="flex flex-col gap-4 pt-4 sm:gap-10">
          <Hero />
          <FeaturedProject />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
      <BottomNav />
    </div>
  )
}
