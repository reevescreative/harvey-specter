'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContactModal } from './ContactModal'

const NAV_LINKS = [
  { label: 'About',    href: '/about'    },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'News',     href: '/news'     },
  { label: 'Contact',  href: null        },
]

function NavLink({ href, label, onClick }: { href?: string | null; label: string; onClick?: () => void }) {
  const lineRef = useRef<HTMLSpanElement>(null)
  const line = (
    <span ref={lineRef} className="absolute bottom-0 left-0 right-0 h-px bg-current" style={{ transform: 'scaleX(0)' }} />
  )
  const hoverIn  = () => gsap.fromTo(lineRef.current, { scaleX: 0, transformOrigin: 'left'  }, { scaleX: 1, duration: 0.35, ease: 'power3.out' })
  const hoverOut = () => gsap.to(lineRef.current,     { scaleX: 0, transformOrigin: 'right' , duration: 0.25, ease: 'power3.in' })

  if (onClick) {
    return (
      <button className="relative pb-px cursor-pointer" onClick={onClick} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
        {label}{line}
      </button>
    )
  }
  return (
    <a href={href ?? '#'} className="relative pb-px" onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
      {label}{line}
    </a>
  )
}

function PillButton({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <button
      ref={ref}
      className={`cursor-pointer ${className}`}
      onMouseEnter={() => gsap.to(ref.current, { y: -3, scale: 1.05, duration: 0.2, ease: 'power2.out' })}
      onMouseLeave={() => gsap.to(ref.current, { y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { openModal } = useContactModal()

  const white = isDark || menuOpen

  // Mobile menu animation
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const items = menu.querySelectorAll('[data-item]')

    if (menuOpen) {
      gsap.set(menu, { pointerEvents: 'auto' })
      gsap.to(menu, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out', delay: 0.1 })
    } else {
      gsap.to(items, { opacity: 0, y: -16, duration: 0.18, stagger: 0.04, ease: 'power2.in' })
      gsap.to(menu, {
        opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.15,
        onComplete: () => gsap.set(menu, { pointerEvents: 'none' }),
      })
    }
  }, [menuOpen])

  // Watch dark sections and flip nav colour
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const triggers: ScrollTrigger[] = []
    document.querySelectorAll('[data-nav="dark"]').forEach(section => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          onEnter:     () => setIsDark(true),
          onLeave:     () => setIsDark(false),
          onEnterBack: () => setIsDark(true),
          onLeaveBack: () => setIsDark(false),
        })
      )
    })
    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between py-6 px-6 md:px-8 transition-colors duration-300 ${white ? 'text-white' : 'text-black'}`}>
        <a href="/" className="font-semibold text-base tracking-[-0.04em] capitalize select-none hover:opacity-70 transition-opacity">
          H.Studio
        </a>

        <div className="hidden md:flex items-center gap-14 font-semibold text-base tracking-[-0.04em] capitalize">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              onClick={link.href === null ? openModal : undefined}
            />
          ))}
        </div>

        <PillButton
          className={`hidden md:flex items-center justify-center text-sm font-medium tracking-[-0.04em] px-4 py-3 rounded-full border transition-colors duration-300 ${
            white ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
          }`}
          onClick={openModal}
        >
          Let&apos;s talk
        </PillButton>

        <button
          className="md:hidden flex items-center justify-center w-6 h-6 cursor-pointer"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
              <line x1="0" y1="1" x2="24" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="17" x2="24" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 z-50"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        {NAV_LINKS.map(link => (
          link.href === null ? (
            <button
              key={link.label}
              data-item
              className="font-semibold text-2xl tracking-[-0.04em] capitalize text-white text-center cursor-pointer"
              onClick={() => { setMenuOpen(false); openModal() }}
            >
              {link.label}
            </button>
          ) : (
            <a
              key={link.label}
              data-item
              href={link.href}
              className="font-semibold text-2xl tracking-[-0.04em] capitalize text-white text-center"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          )
        ))}
        <div data-item className="mt-4">
          <PillButton
            className="bg-white text-black text-sm font-medium tracking-[-0.04em] px-6 py-3 rounded-full"
            onClick={() => { setMenuOpen(false); openModal() }}
          >
            Let&apos;s talk
          </PillButton>
        </div>
      </div>
    </>
  )
}
