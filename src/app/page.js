import SnowParticles from "@/components/snow-particles";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-100">
      <SnowParticles />

      <div className="relative z-10 flex flex-col items-center text-center pt-24 px-6">
        <h1 className="text-4xl font-bold text-blue-700">Sparkly & Snowy Night</h1>

        <p className="mt-2 text-gray-600">New Year Party — 2025.12.16</p>
      </div>
    </div>
  );
}
