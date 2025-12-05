"use client";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function NewYearCountdown() {
  const [mounted, setMounted] = useState(false);
  const newYear = new Date("2025-12-16T19:00:00+08:00");
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center p-4 bg-black/10">
      <div
        className="
          backdrop-blur-xl
          rounded-2xl shadow-2xl 
          border border-[#E7D393]/60
          p-4 sm:p-6 md:p-8
        "
      >
        <Countdown
          date={newYear}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              return <div className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E7D393] animate-pulse">🎉 Happy New Year! 🎉</div>;
            }

            const box = "flex flex-col items-center justify-center px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-[#E7D393]/20 border border-[#E7D393]/50 shadow-lg animate-pulseBox";

            const numClass = "text-lg sm:text-4xl md:text-5xl font-extrabold text-[#E7D393] drop-shadow-lg animate-shimmer";

            const labelClass = "text-[6px] sm:text-xs uppercase tracking-wide text-[#E7D393]/80";

            return (
              <div className="flex flex-wrap gap-4 sm:gap-6 text-center justify-center">
                <div className={box}>
                  <div className={numClass}>{days}</div>
                  <div className={labelClass}>Days</div>
                </div>

                <div className={box}>
                  <div className={numClass}>{hours}</div>
                  <div className={labelClass}>Hours</div>
                </div>

                <div className={box}>
                  <div className={numClass}>{minutes}</div>
                  <div className={labelClass}>Minutes</div>
                </div>

                <div className={box}>
                  <div className={numClass}>{seconds}</div>
                  <div className={labelClass}>Seconds</div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
