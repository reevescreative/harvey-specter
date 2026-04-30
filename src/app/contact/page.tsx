import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Contact — Harvey Specter',
  description: 'Get in touch with H.Studio.',
}

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M14 2L2 2L2 14" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const inputClass = `
  w-full bg-transparent border-b border-[#1f1f1f]/20 py-3 text-[14px] text-[#1f1f1f]
  tracking-[-0.04em] leading-[1.3] placeholder:text-[#1f1f1f]/30
  focus:outline-none focus:border-[#1f1f1f] transition-colors
`

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">

        {/* Page header */}
        <section data-nav="dark" className="bg-black w-full min-h-[50vh] flex flex-col justify-end px-4 md:px-8 pb-12 md:pb-20 pt-32">
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
              [ Contact ]
            </p>
            <h1
              className="font-medium text-white uppercase tracking-[-0.07em] leading-[0.85] whitespace-nowrap"
              style={{ fontSize: 'clamp(56px, 13.75vw, 198px)' }}
            >
              Let&apos;s<br />Talk
            </h1>
          </div>
        </section>

        {/* Contact body */}
        <section className="bg-white px-4 md:px-8 py-16 md:py-24 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-16 md:gap-8 w-full">

            {/* Left — info */}
            <div className="flex flex-col gap-8 md:w-[340px] shrink-0">
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
                  Email
                </p>
                <a
                  href="mailto:hello@hstudio.com"
                  className="font-medium text-[18px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.2] hover:opacity-60 transition-opacity"
                >
                  hello@hstudio.com
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
                  Based in
                </p>
                <p className="font-medium text-[18px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.2]">
                  Chicago, IL
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
                  Availability
                </p>
                <p className="font-medium text-[18px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.2]">
                  Open to new projects
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="flex-1 max-w-[600px]">
              <div className="flex gap-3 items-stretch">
                {/* Left brackets */}
                <div className="flex flex-col justify-between shrink-0 py-1">
                  <CornerBracket />
                  <CornerBracket className="-rotate-90" />
                </div>

                <form className="flex-1 flex flex-col gap-8 py-3">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 flex flex-col gap-1">
                      <label className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <label className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
                      Project type
                    </label>
                    <input
                      type="text"
                      name="projectType"
                      placeholder="Branding, web design, photography…"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[12px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project…"
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
                  >
                    Send message
                  </button>
                </form>

                {/* Right brackets */}
                <div className="flex flex-col justify-between shrink-0 py-1">
                  <CornerBracket className="rotate-90" />
                  <CornerBracket className="rotate-180" />
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
