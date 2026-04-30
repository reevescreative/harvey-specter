import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

const projectsQuery = defineQuery(`
  *[_type == "portfolioItem"] | order(displayOrder asc) {
    _id,
    title,
    tags,
    coverImage { ..., asset-> },
    projectUrl,
    displayOrder,
    description
  }
`)

type PortfolioItem = {
  _id: string
  title: string
  tags: string[] | null
  coverImage: { asset: object; alt?: string } | null
  projectUrl: string | null
  displayOrder: number | null
  description: string | null
}

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

function ProjectCard({ item, tall }: { item: PortfolioItem; tall: boolean }) {
  const imageUrl = item.coverImage?.asset
    ? urlFor(item.coverImage).width(800).url()
    : null
  const heightClass = tall ? 'h-[390px] md:h-[744px]' : 'h-[390px] md:h-[699px]'

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
          <div className="absolute bottom-4 left-4 flex gap-3 flex-wrap">
            {item.tags.map((tag) => <Tag key={tag} label={tag} />)}
          </div>
        )}
      </div>
      <div className="flex items-start justify-between w-full gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <p className="font-black text-[24px] md:text-[36px] text-black tracking-[-0.04em] leading-[1.1] uppercase">
            {item.title}
          </p>
          {item.description && (
            <p className="text-[13px] text-[#1f1f1f]/60 leading-[1.3] tracking-[-0.03em] line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
        {item.projectUrl ? (
          <a
            href={item.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 size-8 flex items-center justify-center mt-1"
            aria-label={`View ${item.title}`}
          >
            <ArrowNE />
          </a>
        ) : (
          <div className="shrink-0 size-8 flex items-center justify-center mt-1 opacity-20">
            <ArrowNE />
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <p className="font-mono text-[14px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
        [ No projects yet ]
      </p>
      <p className="text-[14px] text-[#1f1f1f]/30 leading-[1.3] tracking-[-0.04em] text-center max-w-[280px]">
        Add portfolio items in the Sanity Studio to populate this page.
      </p>
    </div>
  )
}

export default async function ProjectsPageList() {
  const { data: items } = await sanityFetch({ query: projectsQuery }) as { data: PortfolioItem[] }

  const leftItems  = items.filter((_, i) => i % 2 === 0)
  const rightItems = items.filter((_, i) => i % 2 === 1)

  return (
    <section className="px-4 md:px-8 py-12 md:py-20 w-full bg-white">

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Mobile: single column */}
          <div className="flex flex-col gap-6 md:hidden">
            {items.map((item) => (
              <ProjectCard key={item._id} item={item} tall={false} />
            ))}
          </div>

          {/* Desktop: two staggered columns */}
          <div className="hidden md:flex md:items-start gap-6 w-full">
            <div className="flex flex-col gap-6 flex-1 min-w-0">
              {leftItems.map((item, i) => (
                <ProjectCard key={item._id} item={item} tall={i % 2 === 0} />
              ))}
            </div>
            <div className="flex flex-col gap-6 flex-1 min-w-0 md:pt-[240px]">
              {rightItems.map((item, i) => (
                <ProjectCard key={item._id} item={item} tall={i % 2 === 1} />
              ))}
            </div>
          </div>
        </>
      )}

    </section>
  )
}
