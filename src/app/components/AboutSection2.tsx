'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Figma MCP asset — expires 7 days from 2026-04-28; replace with a permanent hosted image
const ABOUT_PHOTO = 'https://www.figma.com/api/mcp/asset/99c36f4e-ea50-40a2-9959-fd4975db891d'

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M14 2L2 2L2 14" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AboutSection2() {
  const sectionRef  = useRef<HTMLElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const revealRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Text block slides out to the left as section scrolls away
      gsap.to(textRef.current, {
        x: '-20%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Black overlay slides right to reveal the photo as section enters
      gsap.to(revealRef.current, {
        x: '101%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.8,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="px-4 md:px-8 py-20 w-full bg-white">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-8">

        {/* Left column: label + text block — slides out left on scroll */}
        <div ref={textRef} className="will-change-transform flex flex-col gap-8 md:gap-0 flex-1 min-w-0">

          {/* Top-left label */}
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0 whitespace-nowrap">
            [ About ]
          </p>

          {/* Text block with corner brackets */}
          <div className="flex-1 flex gap-3 items-stretch">
            {/* Left brackets */}
            <div className="flex flex-col justify-between shrink-0 py-1">
              <CornerBracket />
              <CornerBracket className="-rotate-90" />
            </div>

            {/* Body text */}
            <p className="flex-1 text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-3">
              Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
            </p>

            {/* Right brackets */}
            <div className="flex flex-col justify-between shrink-0 py-1">
              <CornerBracket className="rotate-90" />
              <CornerBracket className="rotate-180" />
            </div>
          </div>

        </div>

        {/* Photo + counter — black overlay wipes right to reveal */}
        <div className="flex gap-4 items-start md:shrink-0">
          <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0">002</span>
          <div className="relative flex-1 md:flex-none md:w-[436px] md:h-[614px] overflow-hidden">
            <img
              src={ABOUT_PHOTO}
              alt="Portrait photograph"
              className="w-full h-full object-cover block"
            />
            {/* Black overlay — animates right to reveal photo */}
            <div
              ref={revealRef}
              className="absolute inset-0 bg-black"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
