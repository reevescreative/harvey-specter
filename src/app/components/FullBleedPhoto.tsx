// Figma MCP asset — expires 7 days from 2026-04-28; replace with a permanent hosted image
const PHOTO = 'https://www.figma.com/api/mcp/asset/00e66769-c007-447a-8ff0-3f3cb9bea57f'

export default function FullBleedPhoto() {
  return (
    <section data-nav="dark" className="w-full h-[90vw] md:h-[56vw] md:max-h-[800px] relative overflow-hidden">
      <img
        src={PHOTO}
        alt="Photographer holding a Nikon camera at golden hour"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </section>
  )
}
