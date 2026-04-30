'use client'

import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'

// ── Context ─────────────────────────────────────────────────────────────────

interface ContactModalCtx {
  openModal:  () => void
  closeModal: () => void
}

const ContactModalContext = createContext<ContactModalCtx>({
  openModal:  () => {},
  closeModal: () => {},
})

export function useContactModal() {
  return useContext(ContactModalContext)
}

// ── Styles ───────────────────────────────────────────────────────────────────

const inputClass = `
  w-full bg-transparent border-b border-white/20 py-3 text-[14px] text-white
  tracking-[-0.04em] leading-[1.3] placeholder:text-white/30
  focus:outline-none focus:border-white transition-colors
`

// ── Provider + Modal ─────────────────────────────────────────────────────────

export default function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen]   = useState(false)
  const overlayRef            = useRef<HTMLDivElement>(null)
  const panelRef              = useRef<HTMLDivElement>(null)
  const animatingRef          = useRef(false)

  const openModal = useCallback(() => {
    if (animatingRef.current || isOpen) return
    setIsOpen(true)
  }, [isOpen])

  const closeModal = useCallback(() => {
    if (animatingRef.current || !isOpen) return
    animatingRef.current = true

    gsap.to(panelRef.current, {
      y: '100%', duration: 0.45, ease: 'power3.in',
    })
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.35, delay: 0.1,
      onComplete: () => {
        setIsOpen(false)
        animatingRef.current = false
      },
    })
  }, [isOpen])

  // Animate in when isOpen becomes true
  useEffect(() => {
    if (!isOpen) return
    animatingRef.current = true
    document.body.style.overflow = 'hidden'

    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 }
    )
    gsap.fromTo(panelRef.current,
      { y: '100%' },
      { y: 0, duration: 0.55, ease: 'power3.out', onComplete: () => { animatingRef.current = false } }
    )

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/70 z-[80]"
            style={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Slide-up panel */}
          <div
            ref={panelRef}
            className="fixed bottom-0 left-0 right-0 z-[90] bg-black rounded-t-2xl max-h-[90vh] overflow-y-auto"
            style={{ transform: 'translateY(100%)' }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-10 h-[3px] rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-10 pt-4 pb-6 md:pb-8">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[12px] text-white/40 uppercase leading-[1.1]">
                  [ Let&apos;s Talk ]
                </p>
                <p
                  className="font-medium text-white uppercase tracking-[-0.07em] leading-[0.85]"
                  style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
                >
                  Get in touch
                </p>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="shrink-0 size-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 px-6 md:px-10 pb-16">

              {/* Info column */}
              <div className="flex flex-row md:flex-col gap-8 md:gap-10 md:w-[220px] shrink-0 flex-wrap">
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-[11px] text-white/30 uppercase leading-[1.1]">Email</p>
                  <a href="mailto:hello@hstudio.com" className="text-[15px] text-white tracking-[-0.04em] hover:opacity-60 transition-opacity">
                    hello@hstudio.com
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-[11px] text-white/30 uppercase leading-[1.1]">Based in</p>
                  <p className="text-[15px] text-white tracking-[-0.04em]">Chicago, IL</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-[11px] text-white/30 uppercase leading-[1.1]">Availability</p>
                  <p className="text-[15px] text-white tracking-[-0.04em]">Open to projects</p>
                </div>
              </div>

              {/* Form */}
              <form className="flex-1 flex flex-col gap-8 max-w-[560px]">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="font-mono text-[11px] text-white/30 uppercase leading-[1.1]">Name</label>
                    <input type="text" name="name" placeholder="Your name" className={inputClass} required />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="font-mono text-[11px] text-white/30 uppercase leading-[1.1]">Email</label>
                    <input type="email" name="email" placeholder="your@email.com" className={inputClass} required />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[11px] text-white/30 uppercase leading-[1.1]">Project type</label>
                  <input type="text" name="projectType" placeholder="Branding, web design, photography…" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[11px] text-white/30 uppercase leading-[1.1]">Message</label>
                  <textarea name="message" rows={4} placeholder="Tell me about your project…" className={`${inputClass} resize-none`} required />
                </div>
                <button
                  type="submit"
                  className="self-start bg-white text-black text-[14px] font-medium tracking-[-0.04em] px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
                >
                  Send message
                </button>
              </form>

            </div>
          </div>
        </>
      )}
    </ContactModalContext.Provider>
  )
}
