'use client'

import { useState } from 'react'

// Figma MCP asset — expires 7 days from 2026-04-28; replace with a permanent hosted image
const HERO_PHOTO = 'https://www.figma.com/api/mcp/asset/8a4f54a5-138d-4a60-b094-477b5eb1863d'

const NAV_LINKS = ['About', 'Services', 'Projects', 'News', 'Contact']

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="relative h-screen overflow-hidden bg-neutral-300">
      {/* Background photo */}
      <img
        src={HERO_PHOTO}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_15%] scale-[1.15] origin-top pointer-events-none select-none"
      />

      {/* Bottom blur overlay — fades in upward via mask gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] [mask-image:linear-gradient(to_bottom,transparent,black_50%)]" />

      {/* Page layout */}
      <div className="relative h-full flex flex-col px-6 md:px-8 pb-8 md:pb-0 justify-between md:justify-start md:gap-[240px]">

        {/* ── Navbar ── */}
        <nav className="flex items-center justify-between py-6 shrink-0">
          <span className="font-semibold text-base tracking-[-0.04em] capitalize text-black select-none">
            H.Studio
          </span>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-14 font-semibold text-base tracking-[-0.04em] capitalize text-black">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button className="hidden md:flex items-center justify-center bg-black text-white text-sm font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
            Let&apos;s talk
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-6 h-6 cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="1" x2="24" y2="1" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="9" x2="24" y2="9" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="17" x2="24" y2="17" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white/90 backdrop-blur-md flex flex-col px-4 py-6 gap-5 z-50">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="pl-2 font-semibold text-base tracking-[-0.04em] capitalize text-black hover:opacity-60 transition-opacity"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              className="mt-2 self-start bg-black text-white text-sm font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s talk
            </button>
          </div>
        )}

        {/* ── Hero text ── */}
        {/* Mobile: fixed 341px block, justify-between pushes label+name up, desc+cta down */}
        {/* Desktop: auto height, stacks name then desc, desc is right-aligned */}
        <div className="flex flex-col items-center justify-between md:justify-start h-[341px] md:h-auto w-full shrink-0">

          {/* Name block */}
          <div className="flex flex-col w-full">
            {/* "[ Hello i'm ]" label — overlaps into the name via negative margin */}
            <div className="flex items-center px-[18px] w-full justify-center md:justify-start">
              <p className="font-mono text-[14px] text-white uppercase mix-blend-overlay leading-[1.1] mb-[-15px]">
                [ Hello i&apos;m ]
              </p>
            </div>

            {/* Name */}
            <h1
              className="
                font-medium text-white mix-blend-overlay capitalize text-center w-full
                whitespace-pre-wrap md:whitespace-nowrap
                text-[96px] md:text-[13.75vw]
                tracking-[-0.07em]
                leading-[0.8] md:leading-[1.1]
                mb-[-15px]
              "
            >
              {'Harvey   Specter'}
            </h1>
          </div>

          {/* Description + CTA */}
          <div className="flex w-full justify-start md:justify-end">
            <div className="flex flex-col gap-[17px] items-start w-full md:w-[294px]">
              <p className="font-bold italic text-[14px] text-[#1f1f1f] tracking-[-0.035em] uppercase leading-[1.1]">
                <span>H.Studio is a </span>
                <span className="font-normal not-italic">full-service</span>
                <span> creative studio creating beautiful digital experiences and products. We are an </span>
                <span className="font-normal not-italic">award winning</span>
                <span> desing and art group specializing in branding, web design and engineering.</span>
              </p>
              <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
