'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContactModal } from './ContactModal'

const HERO_PHOTO = 'https://www.figma.com/api/mcp/asset/8a4f54a5-138d-4a60-b094-477b5eb1863d'

const nameClass = `
  font-medium text-white capitalize block
  text-[96px] md:text-[13.75vw]
  tracking-[-0.07em]
  leading-[0.8] md:leading-[1.1]
  whitespace-nowrap mix-blend-overlay
`

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLImageElement>(null)
  const harveyRef  = useRef<HTMLDivElement>(null)
  const specterRef = useRef<HTMLDivElement>(null)
  const { openModal } = useContactModal()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      tl.to(harveyRef.current,  { x: '-45vw', ease: 'none', force3D: false }, 0)
      tl.to(specterRef.current, { x:  '45vw', ease: 'none', force3D: false }, 0)
      tl.to(bgRef.current,      { scale: 1.45, ease: 'none' }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-nav="dark" className="relative h-screen overflow-hidden bg-neutral-300">

      <img
        ref={bgRef}
        src={HERO_PHOTO}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_15%] scale-[1.15] origin-center pointer-events-none select-none"
      />

      <div className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] [mask-image:linear-gradient(to_bottom,transparent,black_50%)]" />

      <div className="relative h-full flex flex-col px-6 md:px-8 pb-8 md:pb-[80px] justify-end">
        <div className="flex flex-col items-center justify-between md:justify-start h-[341px] md:h-auto w-full shrink-0">

          {/* Name — mobile: stacked vertically. Desktop: side by side */}
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-center w-full">

            {/* Harvey — first = top on mobile, left on desktop */}
            <div ref={harveyRef} className="flex flex-col w-full md:w-auto">
              <div className="flex items-center px-[18px] md:px-0 w-full justify-center md:justify-start">
                <p className="font-mono text-[14px] text-white uppercase leading-[1.1] mb-[-15px] mix-blend-overlay">
                  [ Hello i&apos;m ]
                </p>
              </div>
              <span className={nameClass}>Harvey&nbsp;</span>
            </div>

            {/* Specter — second = below Harvey on mobile, right on desktop */}
            <div ref={specterRef} className="w-full md:w-auto text-center md:text-left">
              <span className={nameClass}>Specter</span>
            </div>

          </div>

          {/* Description + CTA */}
          <div className="flex w-full justify-center md:justify-end">
            <div className="flex flex-col gap-[17px] items-center md:items-start w-full md:w-[294px]">
              <p className="font-bold italic text-[14px] text-[#1f1f1f] tracking-[-0.035em] uppercase leading-[1.1] text-center md:text-left">
                <span>H.Studio is a </span>
                <span className="font-normal not-italic">full-service</span>
                <span> creative studio creating beautiful digital experiences and products. We are an </span>
                <span className="font-normal not-italic">award winning</span>
                <span> design and art group specializing in branding, web design and engineering.</span>
              </p>
              <button onClick={openModal} className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                Let&apos;s talk
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
