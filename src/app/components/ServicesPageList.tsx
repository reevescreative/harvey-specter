import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

const servicesQuery = defineQuery(`
  *[_type == "serviceItem"] | order(displayOrder asc) {
    _id,
    title,
    number,
    description,
    image { ..., asset->, alt, objectPosition },
    displayOrder
  }
`)

type ServiceItem = {
  _id: string
  title: string
  number: string | null
  description: string | null
  image: {
    asset: object
    alt?: string | null
    objectPosition?: string | null
  } | null
  displayOrder: number | null
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1]">
        [ No services yet ]
      </p>
      <p className="text-[14px] text-white/30 leading-[1.3] tracking-[-0.04em] text-center max-w-[280px]">
        Add services in the Sanity Studio to populate this page.
      </p>
    </div>
  )
}

export default async function ServicesPageList() {
  const { data: services } = await sanityFetch({ query: servicesQuery }) as { data: ServiceItem[] }

  return (
    <section data-nav="dark" className="bg-black px-4 md:px-8 py-12 md:py-20 flex flex-col gap-8 md:gap-12 w-full">

      {/* Label + count */}
      <div className="flex items-center justify-between w-full">
        <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
          [ services ]
        </p>
        <p className="font-mono text-[14px] text-white/40 uppercase leading-[1.1]">
          {services.length > 0 ? `[${services.length}]` : ''}
        </p>
      </div>

      {services.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-12 w-full">
          {services.map((service) => {
            const imageUrl = service.image?.asset
              ? urlFor(service.image).width(302).height(302).url()
              : null
            const objectPosition = service.image?.objectPosition ?? 'center'

            return (
              <div key={service._id} className="flex flex-col gap-[9px] w-full">

                {/* Number + divider */}
                <div className="flex flex-col gap-[9px] w-full">
                  <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
                    {service.number ?? '[ — ]'}
                  </p>
                  <div className="w-full border-t border-white/30" />
                </div>

                {/* Title + description + thumbnail */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pt-1">
                  <p className="font-bold italic text-[36px] text-white tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap shrink-0">
                    {service.title}
                  </p>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <p className="text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                      {service.description ?? (
                        <span className="text-white/40 italic">No description yet.</span>
                      )}
                    </p>
                    <div className="relative size-[151px] shrink-0 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={service.image?.alt ?? service.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ objectPosition }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-white/10" />
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}

    </section>
  )
}
