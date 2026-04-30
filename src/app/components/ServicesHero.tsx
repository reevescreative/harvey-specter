'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function ServicesHero() {
  const labelRef    = useRef<HTMLParagraphElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [labelRef.current, titleRef.current, subtitleRef.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section data-nav="dark" className="bg-black w-full min-h-[70vh] flex flex-col justify-end px-4 md:px-8 pb-12 md:pb-20 pt-32">

      <div className="flex flex-col gap-6 md:gap-8">
        <p ref={labelRef} className="font-mono text-[14px] text-white uppercase leading-[1.1]">
          [ Services ]
        </p>

        <div ref={titleRef}>
          <h1
            className="font-medium text-white uppercase tracking-[-0.07em] leading-[0.85] whitespace-nowrap"
            style={{ fontSize: 'clamp(56px, 13.75vw, 198px)' }}
          >
            What We<br />Deliver
          </h1>
        </div>

        <p ref={subtitleRef} className="font-bold italic text-[14px] text-white/70 tracking-[-0.035em] uppercase leading-[1.1] max-w-[360px]">
          Four core disciplines —{' '}
          <span className="font-normal not-italic">
            brand discovery, web design &amp; dev, marketing, and photography.
          </span>
        </p>
      </div>

    </section>
  )
}
