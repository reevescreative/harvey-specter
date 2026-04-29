export default function AboutSection() {
  return (
    <section className="px-8 py-[120px] w-full bg-white overflow-hidden">
      <div className="flex flex-col gap-6 w-full">

        {/* Label + divider */}
        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-mono text-[14px] text-[#1f1f1f] text-right uppercase leading-[1.1]">
            [ 8+ years in industry ]
          </p>
          <div className="w-full h-px bg-[#1f1f1f]" />
        </div>

        {/* Staggered headline */}
        <div className="flex flex-col gap-2 w-full">

          {/* "A creative director   /" */}
          <div className="flex gap-3 items-start">
            <span className="font-light text-[clamp(32px,6.5vw,96px)] text-black tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              {`A creative director   /`}
            </span>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] pt-[0.5em]">
              001
            </span>
          </div>

          {/* "Photographer" — ~15.6% indent */}
          <div className="md:pl-[15.6%]">
            <span className="font-light text-[clamp(32px,6.5vw,96px)] text-black tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              Photographer
            </span>
          </div>

          {/* "Born & raised" — ~44% indent */}
          <div className="md:pl-[44%]">
            <span className="font-light text-[clamp(32px,6.5vw,96px)] text-black tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              {'Born '}
              <span className="italic font-normal" style={{ fontFamily: 'var(--font-playfair)' }}>&amp;</span>
              {' raised'}
            </span>
          </div>

          {/* "On the south side" — no indent */}
          <div>
            <span className="font-light text-[clamp(32px,6.5vw,96px)] text-black tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              on the south side
            </span>
          </div>

          {/* "Of chicago." — ~44% indent, with floating label */}
          <div className="md:pl-[44%] flex items-start gap-4">
            <span className="font-light text-[clamp(32px,6.5vw,96px)] text-black tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              of chicago.
            </span>
            <span className="hidden md:block font-mono text-[14px] text-[#1f1f1f] leading-[1.1] whitespace-nowrap self-center">
              [ creative freelancer ]
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}
