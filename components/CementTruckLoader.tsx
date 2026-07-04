"use client";
import { useState, useEffect } from "react";

interface LoaderProps {
  visible: boolean;
  message?: string;
}

export default function CementTruckLoader({ visible, message = "Loading…" }: LoaderProps) {
  const [tilted, setTilted] = useState(false);
  const [pouring, setPouring] = useState(false);
  const [driving, setDriving] = useState(false);

  useEffect(() => {
    if (visible) {
      setTilted(false); setPouring(false); setDriving(false);
      const t1 = setTimeout(() => { setTilted(true); setPouring(true); }, 500);
      const t2 = setTimeout(() => setDriving(true), 1200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setTilted(false); setPouring(false); setDriving(false);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
      {/* Scene */}
      <div className="relative w-[400px] h-[160px]">
        {/* Road */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-cement-200 rounded-md">
          <div className="absolute top-[6px] left-2 right-2 h-[3px] rounded-full"
            style={{ background: "repeating-linear-gradient(90deg,#fff 0,#fff 18px,transparent 18px,transparent 28px)" }} />
        </div>

        {/* Cement trail on the ground */}
        <div
          className="absolute bottom-[14px] left-[32px] h-[14px] bg-[#cdc0ac] rounded-full transition-all duration-[2000ms] ease-linear"
          style={{ 
            opacity: pouring ? 1 : 0, 
            width: driving ? "150px" : "12px",
            borderBottom: "3px solid #b8a898"
          }}
        />

        {/* Truck container (translates horizontally) */}
        <div
          className="absolute bottom-4 left-3 w-[220px] h-[90px] transition-transform duration-[2000ms] ease-linear"
          style={{ transform: driving ? "translateX(140px)" : "translateX(0)" }}
        >
          {/* Truck inner wrapper (bounces vertically) */}
          <div className="truck-bounce w-full h-full relative">
            {/* Carrier */}
            <div
              className={`absolute left-0 bottom-[22px] w-[140px] h-[58px] bg-cement-500 rounded-sm transition-transform duration-700`}
              style={{
                transformOrigin: "100% 100%",
                transform: tilted ? "rotate(-32deg)" : "rotate(0deg)",
                borderRadius: "4px 2px 2px 4px",
              }}
            >
              <div className="absolute top-[-6px] left-1.5 right-0 h-2 bg-cement-400 rounded-t" />
              <div className="absolute bottom-1 left-1 right-1 h-8 rounded-sm"
                style={{ background: "linear-gradient(180deg,#d4c5ae,#bfad99)" }} />
            </div>

            {/* Cab */}
            <div className="absolute right-0 bottom-[22px] w-[74px] h-[62px] bg-cement-700 rounded-tl-lg rounded-tr-2xl rounded-b-sm shadow-inner">
              <div className="absolute top-2 left-2 right-2 h-6 rounded bg-gradient-to-br from-sky-200 to-sky-300" />
              <div className="absolute bottom-0 left-0 right-0 h-5 bg-cement-800 rounded-b-sm" />
            </div>
            {/* Headlight */}
            <div className="absolute right-[-5px] bottom-[28px] w-2 h-3.5 bg-accent rounded-sm shadow-[0_0_6px_#f59e0b]" />

            {/* Exhaust smoke   */}
            <div className="absolute right-1 bottom-[76px] w-4 h-4">
              <div className="smoke-puff" style={{ top: 0, left: 0 }} />
              <div className="smoke-puff" style={{ top: -4, left: -2 }} />
              <div className="smoke-puff" style={{ top: -2, left: 2 }} />
            </div>

            {/* Wheels */}
            {[14, 58, 190].map((left, i) => (
              <div key={i} className="wheel-spin absolute bottom-0 w-[26px] h-[26px] rounded-full bg-cement-900 border-[5px] border-cement-600"
                style={{ left }}>
                <div className="absolute inset-[2px] rounded-full border border-cement-500" />
              </div>
            ))}

            {/* Cement stream (attached to truck so it travels with it) */}
            <div
              className="absolute overflow-visible transition-opacity duration-300"
              style={{ left: "12px", bottom: "-2px", width: "28px", height: "60px", opacity: pouring ? 1 : 0 }}
            >
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="cement-particle" style={{ top: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-[400px] h-1.5 bg-cement-200 rounded-full overflow-hidden mt-2">
        <div className="loader-bar-fill h-full rounded-full bg-cement-700" />
      </div>

      {/* Label */}
      <p className="text-[13px] font-bold text-cement-500 tracking-wide animate-pulse">{message}</p>
    </div>
  );
}
