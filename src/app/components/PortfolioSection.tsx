// Figma MCP assets — expire 7 days from 2026-04-28; replace with permanent hosted images
const IMAGES = {
  surfers:   'https://www.figma.com/api/mcp/asset/f8ae6307-2336-4c59-a9a8-c8f493212955',
  cyberpunk: 'https://www.figma.com/api/mcp/asset/3ed450d6-02d5-48b1-bcf4-d14caeb0e544',
  agency:    'https://www.figma.com/api/mcp/asset/398826c0-141f-440d-b868-7d14a61bf920',
  minimal:   'https://www.figma.com/api/mcp/asset/3a69a430-4212-42a4-884c-2f5e876b9734',
}

const PROJECTS = [
  // Left column (desktop)
  {
    title: 'Surfers Paradise',
    tags: ['Social Media', 'Photography'],
    image: IMAGES.surfers,
    heightClass: 'h-[390px] md:h-[744px]',
    col: 'left' as const,
  },
  {
    title: 'Cyberpunk Caffe',
    tags: ['Social Media', 'Photography'],
    image: IMAGES.cyberpunk,
    heightClass: 'h-[390px] md:h-[699px]',
    col: 'left' as const,
  },
  // Right column (desktop)
  {
    title: 'Agency 976',
    tags: ['Social Media', 'Photography'],
    image: IMAGES.agency,
    heightClass: 'h-[390px] md:h-[699px]',
    col: 'right' as const,
  },
  {
    title: 'Minimal Playground',
    tags: ['Social Media', 'Photography'],
    image: IMAGES.minimal,
    heightClass: 'h-[390px] md:h-[744px]',
    col: 'right' as const,
  },
]

function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 text-[#111] text-[14px] font-medium tracking-[-0.04em] px-2 py-1 rounded-full whitespace-nowrap">
      {label}
    </span>
  )
}

function ArrowNE() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M10 22L22 10M22 10H13M22 10V19" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CornerBracket({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M14 2L2 2L2 14" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProjectCard({ title, tags, image, heightClass }: typeof PROJECTS[number]) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className={`relative ${heightClass} w-full overflow-hidden`}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="font-black text-[24px] md:text-[36px] text-black tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap">
          {title}
        </p>
        <button className="shrink-0 size-8 flex items-center justify-center" aria-label={`View ${title}`}>
          <ArrowNE />
        </button>
      </div>
    </div>
  )
}

function CtaBox() {
  return (
    <div className="flex gap-3 items-stretch w-full">
      <div className="flex flex-col justify-between shrink-0 py-1">
        <CornerBracket />
        <CornerBracket className="-rotate-90" />
      </div>
      <div className="flex-1 flex flex-col gap-[10px] items-start py-3">
        <p className="text-[14px] text-[#1f1f1f] italic leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
        </p>
        <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full hover:opacity-80 transition-opacity">
          Let&apos;s talk
        </button>
      </div>
      <div className="flex flex-col justify-between shrink-0 py-1">
        <CornerBracket className="rotate-90" />
        <CornerBracket className="rotate-180" />
      </div>
    </div>
  )
}

export default function PortfolioSection() {
  const leftProjects = PROJECTS.filter((p) => p.col === 'left')
  const rightProjects = PROJECTS.filter((p) => p.col === 'right')

  return (
    <section id="projects" className="px-4 md:px-8 py-12 md:py-20 w-full bg-white">

      {/* Header */}
      <div className="flex items-start justify-between w-full mb-8 md:mb-[61px]">

        {/* Left: label (mobile only) + title + counter */}
        <div className="flex flex-col gap-4 md:gap-0 w-full md:w-auto">
          {/* [ portfolio ] — mobile only, horizontal above title */}
          <p className="md:hidden font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ portfolio ]
          </p>
          {/* Title + 004 */}
          <div className="flex items-start gap-[10px]">
            <div className="font-light text-[32px] md:text-[6.5vw] text-black tracking-[-0.08em] leading-[0.86] uppercase">
              <p>Selected</p>
              <p>Work</p>
            </div>
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] mt-1">
              004
            </p>
          </div>
        </div>

        {/* [ portfolio ] — desktop only, vertical on far right */}
        <div className="hidden md:flex h-[110px] w-4 items-center justify-center shrink-0 overflow-visible">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap -rotate-90">
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* Cards — mobile: single column, desktop: two staggered columns */}
      <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">

        {/* Left column */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          {leftProjects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
          {/* CTA box — desktop position: bottom of left col */}
          <div className="hidden md:block">
            <CtaBox />
          </div>
        </div>

        {/* Right column — offset 240px down on desktop */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 md:pt-[240px]">
          {rightProjects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

      </div>

      {/* CTA box — mobile: below all cards */}
      <div className="md:hidden mt-8">
        <CtaBox />
      </div>

    </section>
  )
}
