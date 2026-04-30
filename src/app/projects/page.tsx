import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import ProjectsPageList from '../components/ProjectsPageList'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Projects — Harvey Specter',
  description: 'Selected work from H.Studio — branding, web design and photography.',
}

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">

        {/* Page header */}
        <section data-nav="dark" className="bg-black w-full min-h-[50vh] flex flex-col justify-end px-4 md:px-8 pb-12 md:pb-20 pt-32">
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
              [ Projects ]
            </p>
            <h1
              className="font-medium text-white uppercase tracking-[-0.07em] leading-[0.85] whitespace-nowrap"
              style={{ fontSize: 'clamp(56px, 13.75vw, 198px)' }}
            >
              Selected<br />Work
            </h1>
          </div>
        </section>

        <ProjectsPageList />

      </main>
      <Footer />
    </>
  )
}
