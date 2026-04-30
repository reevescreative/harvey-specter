'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const HERO_PHOTO = 'https://www.figma.com/api/mcp/asset/8a4f54a5-138d-4a60-b094-477b5eb1863d'

export default function AboutHero() {
  const labelRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
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
    <section data-nav="dark" className="relative w-full min-h-screen flex flex-col justify-end px-4 md:px-8 pb-12 md:pb-20 pt-32 overflow-hidden bg-black">

      {/* Background photo with dark overlay */}
      <img
        src={HERO_PHOTO}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_15%] pointer-events-none select-none opacity-40"
      />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative flex flex-col gap-6 md:gap-8">

        <p
          ref={labelRef}
          className="font-mono text-[14px] text-white uppercase leading-[1.1]"
        >
          [ About ]
        </p>

        <div ref={titleRef}>
          <h1
            className="font-medium text-white uppercase tracking-[-0.07em] leading-[0.85] whitespace-nowrap"
            style={{ fontSize: 'clamp(56px, 13.75vw, 198px)' }}
          >
            Harvey<br />Specter
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="font-bold italic text-[14px] text-white/70 tracking-[-0.035em] uppercase leading-[1.1] max-w-[320px]"
        >
          Creative Director &amp; Photographer —{' '}
          <span className="font-normal not-italic">8+ years crafting brands, digital experiences &amp; photography.</span>
        </p>

      </div>
    </section>
  )
}
