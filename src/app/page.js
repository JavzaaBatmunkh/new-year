"use client";
import { useState } from "react";
import NewYearCountdown from "@/components/countdown";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[radial-gradient(50%_50%_at_50%_50%,#434343_0%,#000000_100%)]">
      {/* Loader overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <div className="animate-spin text-5xl select-none">❄️</div>
        </div>
      )}

      <div className="relative w-full lg:w-[80%] mx-auto aspect-[16/10] overflow-hidden ">
        <video src="/videos/name-reveal.mp4" autoPlay muted playsInline className="absolute inset-0 h-full w-full object-cover" onLoadedData={() => setLoading(false)} onWaiting={() => setLoading(true)} onPlaying={() => setLoading(false)} />
      </div>

      <NewYearCountdown />
    </div>
  );
}
