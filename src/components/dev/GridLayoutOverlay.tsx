"use client";

import React, { useState, useEffect } from "react";
import { useDevTools } from "@/context/DevToolsContext";

export const GridLayoutOverlay: React.FC = () => {
  const { showGridOverlay } = useDevTools();
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!showGridOverlay) return null;

  const getBreakpoint = (width: number) => {
    if (width < 640) return "xs (<640px)";
    if (width < 768) return "sm (≥640px)";
    if (width < 1024) return "md (≥768px)";
    if (width < 1280) return "lg (≥1024px)";
    if (width < 1536) return "xl (≥1280px)";
    return "2xl (≥1536px)";
  };

  return (
    <div
      data-dev-ignore="true"
      className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between overflow-hidden"
      aria-hidden="true"
    >
      {/* 12-Column Responsive Grid Guides */}
      <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-6 sm:grid-cols-12 gap-3 sm:gap-6 opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-full border-x border-dashed ${
              i % 2 === 0
                ? "bg-noaa-blue/10 border-noaa-blue/40"
                : "bg-coral/10 border-coral/40"
            }`}
          >
            <span className="block text-[9px] font-mono text-slate-500 text-center pt-16">
              C{i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Center Screen Crosshairs */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-seagrass/50 flex justify-between px-4 text-[9px] font-mono text-seagrass">
        <span>Y: 50%</span>
        <span>Y: Center</span>
      </div>
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-dashed border-seagrass/50 flex flex-col justify-between py-16 text-[9px] font-mono text-seagrass">
        <span className="pl-1">X: Center</span>
      </div>

      {/* Viewport Dimensions Pill */}
      <div className="fixed top-20 right-4 z-40 bg-slate-900/90 text-white font-mono text-[11px] px-3 py-1.5 rounded-full shadow-lg border border-slate-700 backdrop-blur-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-seagrass animate-pulse" />
        <span>{viewport.width}px × {viewport.height}px</span>
        <span className="text-slate-400">|</span>
        <span className="text-noaa-blue-light font-semibold">
          {getBreakpoint(viewport.width)}
        </span>
      </div>
    </div>
  );
};
