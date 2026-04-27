import GeometricBackground from "./components/GeometricBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      <GeometricBackground />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-widest text-white uppercase">
          Harvey Specter
        </h1>
        <p className="mt-6 text-lg md:text-xl tracking-[0.3em] text-zinc-400 uppercase">
          Coming Soon
        </p>
      </div>
    </main>
  );
}
