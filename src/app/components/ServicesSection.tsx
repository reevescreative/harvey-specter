// Figma MCP assets — expire 7 days from 2026-04-28; replace with permanent hosted images
const IMAGES = {
  brandDiscovery: 'https://www.figma.com/api/mcp/asset/03e5cd86-c6ed-4a16-b903-cf6ec15155ad',
  webDesign:      'https://www.figma.com/api/mcp/asset/ec70dc7d-868d-48b3-96d0-72a95e80787d',
  marketing:      'https://www.figma.com/api/mcp/asset/f357f9de-2481-4dcd-83a5-304abd6bc0ea',
  photography:    'https://www.figma.com/api/mcp/asset/39390246-7796-4058-b994-5a14017283b5',
}

const SERVICES = [
  {
    number: '[ 1 ]',
    title: 'Brand Discovery',
    description:
      'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    image: IMAGES.brandDiscovery,
    imageAlt: 'Brand discovery work sample',
  },
  {
    number: '[ 2 ]',
    title: 'Web Design & Dev',
    description:
      'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    image: IMAGES.webDesign,
    imageAlt: 'Web design and development sample',
  },
  {
    number: '[ 3 ]',
    title: 'Marketing',
    description:
      'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    image: IMAGES.marketing,
    imageAlt: 'Marketing analytics sample',
  },
  {
    number: '[ 4 ]',
    title: 'Photography',
    description:
      'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    image: IMAGES.photography,
    imageAlt: 'Photography work sample',
    imageFit: 'object-[center_30%]' as const,
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-black px-4 md:px-8 py-12 md:py-20 flex flex-col gap-8 md:gap-12 w-full">

      {/* Label */}
      <p className="font-mono text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap">
        [ services ]
      </p>

      {/* [4] Deliverables heading */}
      <div className="flex items-center justify-between w-full font-light text-white uppercase tracking-[-0.08em] leading-none text-[32px] md:text-[6.5vw] whitespace-nowrap">
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-12 w-full">
        {SERVICES.map((service) => (
          <div key={service.number} className="flex flex-col gap-[9px] w-full">

            {/* Number + divider */}
            <div className="flex flex-col gap-[9px] w-full">
              <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
                {service.number}
              </p>
              <div className="w-full border-t border-white/30" />
            </div>

            {/* Title + description + thumbnail */}
            {/* Mobile: stacked. Desktop: title left, desc+image right */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pt-1">
              <p className="font-bold italic text-[36px] text-white tracking-[-0.04em] leading-[1.1] uppercase whitespace-nowrap shrink-0">
                {service.title}
              </p>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <p className="text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                  {service.description}
                </p>
                <div className="relative size-[151px] shrink-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className={`absolute inset-0 w-full h-full object-cover ${service.imageFit ?? ''}`}
                  />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}
