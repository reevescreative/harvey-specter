// Figma MCP assets — expire 7 days from 2026-04-29; replace with permanent hosted images
const POSTS = [
  {
    image: 'https://www.figma.com/api/mcp/asset/6e61d340-f069-4619-aaca-0b016ea9fb29',
    alt: 'Maker Space event',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    offsetDesktop: false,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/0927def9-e512-49d1-a151-258a29f45b77',
    alt: 'Eames book on table',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    offsetDesktop: true,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/d6388aaf-db32-4cc6-a9f4-bf7324875c30',
    alt: 'Books on shelf',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    offsetDesktop: false,
  },
]

function ArrowNE() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 13L13 5M13 5H7M13 5V11" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NewsCard({ image, alt, excerpt }: { image: string; alt: string; excerpt: string }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative h-[398px] md:h-[469px] w-full overflow-hidden shrink-0">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">
        {excerpt}
      </p>
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

export default function NewsSection() {
  return (
    <section id="news" className="bg-[#f3f3f3] w-full px-4 md:px-8 py-16 md:py-[120px]">

      {/* ── Mobile layout ── */}
      <div className="md:hidden flex flex-col gap-8">
        <p className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[32px]">
          Keep up with my latest news &amp; achievements
        </p>
        <div className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-none">
          {POSTS.map((post, i) => (
            <div key={i} className="snap-start shrink-0 w-[300px]">
              <NewsCard {...post} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex items-end justify-between gap-8">

        {/* Vertical title */}
        <div className="shrink-0 w-[110px] self-stretch flex items-center justify-center overflow-visible">
          <div className="-rotate-90 whitespace-nowrap origin-center">
            <p className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[64px]">
              Keep up with my latest
            </p>
            <p className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[64px]">
              news &amp; achievements
            </p>
          </div>
        </div>

        {/* 3 cards with vertical dividers between them */}
        <div className="flex flex-1 items-start min-w-0">

          {/* Card 1 */}
          <div className="flex-1 min-w-0">
            <NewsCard {...POSTS[0]} />
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-black/20 mx-8 shrink-0" />

          {/* Card 2 — offset 120px down */}
          <div className="flex-1 min-w-0 pt-[120px]">
            <NewsCard {...POSTS[1]} />
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-black/20 mx-8 shrink-0" />

          {/* Card 3 */}
          <div className="flex-1 min-w-0">
            <NewsCard {...POSTS[2]} />
          </div>

        </div>
      </div>

    </section>
  )
}
