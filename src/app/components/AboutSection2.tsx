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
  return (
    <section id="about" className="px-8 py-20 w-full bg-white">
      <div className="flex items-start justify-between w-full gap-8">

        {/* Top-left label */}
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0 whitespace-nowrap">
          [ About ]
        </p>

        {/* Right: text block + photo */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 flex-1 min-w-0">

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

          {/* Photo + counter */}
          <div className="flex gap-6 items-start shrink-0">
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">002</span>
            <img
              src={ABOUT_PHOTO}
              alt="Portrait photograph"
              className="w-full md:w-[436px] md:h-[614px] object-cover block"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
