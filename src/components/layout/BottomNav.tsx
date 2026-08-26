"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

interface BottomNavProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen mode:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 sm:px-6 py-2.5 sm:py-3 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Keyboard & Swipe Touch Instructions */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
          <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono font-medium text-slate-600">
            ← / →
          </span>
          <span>Arrow Keys or Swipe to navigate</span>
        </div>

        {/* Center: Mobile-First Nav Control Cluster */}
        <div className="flex items-center justify-between sm:justify-center w-full md:w-auto gap-3">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center justify-center gap-1 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all min-h-[44px] min-w-[44px] ${
              hasPrev
                ? "bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 shadow-sm"
                : "bg-slate-50 text-slate-300 cursor-not-allowed"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Slide Counter Badge */}
          <div className="px-3 sm:px-4 py-1.5 bg-noaa-blue-light/60 border border-noaa-blue/20 rounded-full text-noaa-blue font-semibold text-xs sm:text-sm tracking-wide shrink-0">
            <span>{currentIndex + 1}</span>
            <span className="text-slate-400 font-normal mx-1">/</span>
            <span className="text-slate-500 font-medium">{totalSlides}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center justify-center gap-1 px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all min-h-[44px] min-w-[44px] ${
              hasNext
                ? "bg-noaa-blue hover:bg-noaa-blue-hover active:scale-95 text-white shadow-md shadow-noaa-blue/20"
                : "bg-slate-100 text-slate-300 cursor-not-allowed"
            }`}
            aria-label="Next slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          </button>
        </div>

        {/* Right: Fullscreen Toggle */}
        <div className="hidden sm:flex items-center justify-end">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors min-h-[44px]"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4 text-slate-600" />
                <span className="hidden lg:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-slate-600" />
                <span className="hidden lg:inline">Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
