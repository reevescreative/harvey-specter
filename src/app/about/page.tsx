import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import AboutHero from '../components/AboutHero'
import AboutSection from '../components/AboutSection'
import AboutSection2 from '../components/AboutSection2'
import FullBleedPhoto from '../components/FullBleedPhoto'
import TestimonialsSection from '../components/TestimonialsSection'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'About — Harvey Specter',
  description: 'Creative Director & Photographer based in Chicago.',
}

export default function About() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <AboutHero />
        <AboutSection />
        <AboutSection2 />
        <FullBleedPhoto />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
