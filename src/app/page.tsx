import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import AboutSection2 from './components/AboutSection2'
import FullBleedPhoto from './components/FullBleedPhoto'
import ServicesSection from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import TestimonialsSection from './components/TestimonialsSection'
import NewsSection from './components/NewsSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <AboutSection2 />
        <FullBleedPhoto />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <NewsSection />
      </main>
      <Footer />
    </>
  )
}
