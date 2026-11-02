import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import DesktopNav from './components/DesktopNav'
import ContourFooter from './components/ui/ContourFooter'
import { useMediaQuery } from './lib/useMediaQuery'

export default function App() {
  const isWide = useMediaQuery('(min-width: 900px)')

  return (
    <div className="min-h-svh overflow-x-clip bg-ground">
      <Header />
      {isWide ? <DesktopNav /> : <BottomNav />}
      <main>
        <Hero />
        <div className="mx-auto max-w-[1240px] px-4 pt-24 wide:px-12 wide:pt-40">
          <FeaturedProject />
        </div>
        <div className="mx-auto max-w-[1240px] px-4 pt-24 wide:px-12 wide:pt-40">
          <Experience />
        </div>
        <div className="mx-auto max-w-[1240px] px-4 pt-24 wide:px-12 wide:pt-40">
          <Skills />
        </div>
        <div className="mx-auto max-w-[1240px] px-4 pt-24 wide:px-12 wide:pt-40">
          <Contact />
        </div>
      </main>
      {/* >= 900px: the end band follows the keys directly, with the footer over it. Below that: a plain footer, with room for the floating nav under it. */}
      <div className="relative pb-[calc(112px+env(safe-area-inset-bottom))] pt-[72px] wide:h-[340px] wide:p-0">
        {isWide && <ContourFooter />}
        <div className="wide:absolute wide:inset-x-0 wide:bottom-8">
          <div className="mx-auto max-w-[1240px] px-4 wide:px-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
