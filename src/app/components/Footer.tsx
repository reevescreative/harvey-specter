const SOCIAL_LINKS = [
  { label: 'Facebook',  href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'X.com',     href: '#' },
  { label: 'Linkedin',  href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-black w-full pt-12 px-4 md:px-8">

      {/* ── Top: CTA + social links ── */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-0 pb-10 md:pb-12">

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <p className="text-white text-[24px] font-light italic tracking-[-0.04em] uppercase leading-[1.1]">
            Have a{' '}
            <strong className="font-black not-italic">project</strong>
            {' '}in mind?
          </p>
          <button className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
            Let&apos;s talk
          </button>
        </div>

        {/* Social links — two columns on desktop, stacked on mobile */}
        <div className="flex flex-col gap-1 md:text-center text-white text-[18px] tracking-[-0.04em] uppercase leading-[1.1]">
          {/* Mobile: all four stacked */}
          <div className="md:hidden flex flex-col gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} className="hover:opacity-60 transition-opacity">
                {s.label}
              </a>
            ))}
          </div>
          {/* Desktop: first two centered */}
          <div className="hidden md:block">
            {SOCIAL_LINKS.slice(0, 2).map((s) => (
              <a key={s.label} href={s.href} className="block hover:opacity-60 transition-opacity">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop only: last two right-aligned */}
        <div className="hidden md:block text-right text-white text-[18px] tracking-[-0.04em] uppercase leading-[1.1]">
          {SOCIAL_LINKS.slice(2).map((s) => (
            <a key={s.label} href={s.href} className="block hover:opacity-60 transition-opacity">
              {s.label}
            </a>
          ))}
        </div>

      </div>

      {/* Divider */}
      <div className="w-full border-t border-white/20" />

      {/* ── Bottom: wordmark + legal links ── */}

      {/* Desktop bottom */}
      <div className="hidden md:flex items-end justify-between mt-[120px]">

        {/* H.Studio — giant wordmark, vertically cropped */}
        <div className="relative flex-1 overflow-hidden flex items-end" style={{ height: '219px' }}>
          {/* [ CODED BY CLAUDE ] — vertical label on far left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-40 overflow-visible z-10">
            <p className="font-mono text-white text-[14px] uppercase leading-[1.1] whitespace-nowrap -rotate-90">
              [ Coded By Claude ]
            </p>
          </div>
          <p
            className="font-semibold text-white capitalize leading-[0.8] whitespace-nowrap"
            style={{ fontSize: '20.14vw', letterSpacing: '-0.06em' }}
          >
            H.Studio
          </p>
        </div>

        {/* Legal links — bottom-right */}
        <div className="flex gap-[34px] items-center pb-8 shrink-0 text-white text-[12px] tracking-[-0.03em] uppercase">
          <a href="#" className="underline hover:opacity-60 transition-opacity">Licences</a>
          <a href="#" className="underline hover:opacity-60 transition-opacity">Privacy policy</a>
        </div>

      </div>

      {/* Mobile bottom */}
      <div className="md:hidden flex flex-col items-start gap-3 mt-12 overflow-hidden">
        {/* Legal links */}
        <div className="flex gap-[34px] text-white text-[12px] tracking-[-0.03em] uppercase self-center">
          <a href="#" className="underline hover:opacity-60 transition-opacity">Licences</a>
          <a href="#" className="underline hover:opacity-60 transition-opacity">Privacy policy</a>
        </div>
        {/* [ CODED BY CLAUDE ] */}
        <p className="font-mono text-white text-[10px] uppercase leading-[1.1] mt-1">
          [ Coded By Claude ]
        </p>
        {/* H.Studio wordmark — overflows to the right */}
        <p
          className="font-semibold text-white capitalize leading-[0.8] whitespace-nowrap"
          style={{ fontSize: '24.4vw', letterSpacing: '-0.06em' }}
        >
          H.Studio
        </p>
      </div>

    </footer>
  )
}
