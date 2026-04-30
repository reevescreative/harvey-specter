import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import ServicesHero from '../components/ServicesHero'
import ServicesPageList from '../components/ServicesPageList'
import TestimonialsSection from '../components/TestimonialsSection'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Services — Harvey Specter',
  description: 'Brand discovery, web design & dev, marketing, and photography.',
}

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <ServicesHero />
        <ServicesPageList />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
