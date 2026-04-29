const TESTIMONIALS = [
  {
    quote:
      'A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.',
    author: 'Marko Stojković',
    rotation: '-6.85deg',
    desktop: { left: '7.1%', top: '142px' },
  },
  {
    quote:
      'Professional, precise, and incredibly fast at handling complex product visualizations and templates.',
    author: 'Lukas Weber',
    rotation: '2.9deg',
    desktop: { left: '46.9%', top: '272px' },
  },
  {
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: 'Sarah Jenkins',
    rotation: '2.23deg',
    desktop: { left: '21.2%', top: '553px' },
  },
  {
    quote:
      'An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.',
    author: 'Sofía Martínez',
    rotation: '-4.15deg',
    desktop: { left: '68.5%', top: '546px' },
  },
]

function Stars() {
  return (
    <div className="flex gap-[3px]" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#1f1f1f" aria-hidden="true">
          <path d="M7 1l1.545 3.13L12 4.854l-2.5 2.437.59 3.437L7 9.077 4.91 10.728l.59-3.437L3 4.854l3.455-.724L7 1z" />
        </svg>
      ))}
    </div>
  )
}

function Card({ quote, author, rotation }: { quote: string; author: string; rotation: string }) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px] shrink-0"
      style={{ transform: `rotate(${rotation})` }}
    >
      <Stars />
      <p className="text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.04em]">
        {quote}
      </p>
      <p className="font-black text-[16px] text-black tracking-[-0.04em] uppercase leading-[1.1]">
        {author}
      </p>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white overflow-hidden">

      {/* ── Desktop: scattered cards floating around giant title ── */}
      <div className="hidden md:block relative min-h-[960px] px-8 py-[120px]">
        <p
          className="font-medium text-black text-center capitalize leading-[1.1] select-none relative z-10"
          style={{ fontSize: 'clamp(80px, 13.75vw, 198px)', letterSpacing: '-0.07em' }}
        >
          Testimonials
        </p>

        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            className="absolute z-20"
            style={{ left: t.desktop.left, top: t.desktop.top }}
          >
            <Card quote={t.quote} author={t.author} rotation={t.rotation} />
          </div>
        ))}
      </div>

      {/* ── Mobile: title above, horizontal scroll of cards ── */}
      <div className="md:hidden flex flex-col gap-8 px-4 py-16">
        <p
          className="font-medium text-black capitalize leading-[0.8]"
          style={{ fontSize: '64px', letterSpacing: '-0.07em' }}
        >
          Testimonials
        </p>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="snap-start">
              <Card quote={t.quote} author={t.author} rotation={t.rotation} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
