import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

const newsQuery = defineQuery(`
  *[_type == "newsPost"] | order(displayOrder asc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image { ..., asset->, alt },
    publishedAt,
    displayOrder
  }
`)

type NewsPost = {
  _id: string
  title: string
  slug: { current: string } | null
  excerpt: string | null
  image: { asset: object; alt?: string | null } | null
  publishedAt: string | null
  displayOrder: number | null
}

function ArrowNE() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 13L13 5M13 5H7M13 5V11" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NewsCard({ post }: { post: NewsPost }) {
  const imageUrl = post.image?.asset
    ? urlFor(post.image).width(900).height(940).url()
    : null
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative h-[398px] md:h-[469px] w-full overflow-hidden shrink-0 bg-neutral-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.image?.alt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-400" />
        )}
      </div>
      {date && (
        <p className="font-mono text-[12px] text-[#1f1f1f]/50 uppercase leading-[1.1] tracking-[-0.02em]">
          {date}
        </p>
      )}
      <p className="font-bold text-[#1f1f1f] text-[18px] leading-[1.2] tracking-[-0.04em]">
        {post.title}
      </p>
      {post.excerpt && (
        <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">
          {post.excerpt}
        </p>
      )}
      <a
        href="#"
        className="self-start flex items-center gap-[10px] border-b border-black pb-1 font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap hover:opacity-60 transition-opacity"
      >
        Read more
        <ArrowNE />
      </a>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <p className="font-mono text-[14px] text-[#1f1f1f]/40 uppercase leading-[1.1]">
        [ No posts yet ]
      </p>
      <p className="text-[14px] text-[#1f1f1f]/30 leading-[1.3] tracking-[-0.04em] text-center max-w-[280px]">
        Add news posts in the Sanity Studio to populate this page.
      </p>
    </div>
  )
}

export default async function NewsPageList() {
  const { data: posts } = await sanityFetch({ query: newsQuery }) as { data: NewsPost[] }

  return (
    <section className="bg-[#f3f3f3] w-full px-4 md:px-8 py-12 md:py-20">

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
            {posts.map((post, i) => (
              <div
                key={post._id}
                className={`snap-start shrink-0 w-[300px] ${i === posts.length - 1 ? 'mr-12' : ''}`}
              >
                <NewsCard post={post} />
              </div>
            ))}
          </div>

          {/* Desktop: staggered columns */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8">
            {posts.map((post, i) => (
              <div key={post._id} className={i % 2 === 1 ? 'pt-[120px]' : ''}>
                <NewsCard post={post} />
              </div>
            ))}
          </div>
        </>
      )}

    </section>
  )
}
