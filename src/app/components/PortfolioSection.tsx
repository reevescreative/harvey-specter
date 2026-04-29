import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

const portfolioQuery = defineQuery(`
  *[_type == "portfolioItem" && featured == true] | order(displayOrder asc) [0...4] {
    _id,
    title,
    tags,
    coverImage { ..., asset-> },
    projectUrl,
    displayOrder
  }
`)

type PortfolioItem = {
  _id: string
  title: string
  tags: string[] | null
  coverImage: { asset: object; alt?: string } | null
  projectUrl: string | null
  displayOrder: number | null
}

// Heights alternate per column position to match the original staggered design
const HEIGHT_CLASSES = [
  'h-[390px] md:h-[744px]', // left col, top
  'h-[390px] md:h-[699px]', // left col, bottom
  'h-[390px] md:h-[699px]', // right col, top
  'h-[390px] md:h-[744px]', // right col, bottom
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

function ProjectCard({ item, index }: { item: PortfolioItem; index: number }) {
  const heightClass = HEIGHT_CLASSES[index] ?? 'h-[390px] md:h-[699px]'
  const imageUrl = item.coverImage?.asset
    ? urlFor(item.coverImage).width(800).url()
    : null

  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className={`relative ${heightClass} w-full overflow-hidden bg-neutral-200`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.coverImage?.alt ?? item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-400" />
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex gap-3">
            {item.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="font-black text-[24px] md:text-[36px] text-black tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap">
          {item.title}
        </p>
        {item.projectUrl ? (
          <a
            href={item.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 size-8 flex items-center justify-center"
            aria-label={`View ${item.title}`}
          >
            <ArrowNE />
          </a>
        ) : (
          <button className="shrink-0 size-8 flex items-center justify-center" aria-label={`View ${item.title}`}>
            <ArrowNE />
          </button>
        )}
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

export default async function PortfolioSection() {
  const { data: items } = await sanityFetch({ query: portfolioQuery }) as { data: PortfolioItem[] }

  const leftItems = items.slice(0, 2)
  const rightItems = items.slice(2, 4)

  return (
    <section id="projects" className="px-4 md:px-8 py-12 md:py-20 w-full bg-white">

      {/* Header */}
      <div className="flex items-start justify-between w-full mb-8 md:mb-[61px]">
        <div className="flex flex-col gap-4 md:gap-0 w-full md:w-auto">
          <p className="md:hidden font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ portfolio ]
          </p>
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
          {leftItems.map((item, i) => (
            <ProjectCard key={item._id} item={item} index={i} />
          ))}
          <div className="hidden md:block">
            <CtaBox />
          </div>
        </div>

        {/* Right column — offset 240px down on desktop */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 md:pt-[240px]">
          {rightItems.map((item, i) => (
            <ProjectCard key={item._id} item={item} index={i + 2} />
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
