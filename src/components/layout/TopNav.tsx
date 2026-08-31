"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Check, Layers, Presentation, Wrench } from "lucide-react";
import { SlideData } from "@/types/presentation";
import { useDevTools } from "@/context/DevToolsContext";

import { NOAA_BLUE_SVG_DATA_URI } from "@/constants/logos";

interface TopNavProps {
  title: string;
  slides: SlideData[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  title,
  slides,
  currentIndex,
  onSelectSlide,
}) => {
  const { isDevMode, toggleDevMode } = useDevTools();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSlide = slides[currentIndex];
  const progressPercent = ((currentIndex + 1) / slides.length) * 100;

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 transition-all">
      {/* Progress Bar Indicator */}
      <div className="w-full h-1 bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-noaa-blue via-seagrass to-coral transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Left: Logo & Presentation Short Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 max-w-[36px] max-h-[36px] shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={NOAA_BLUE_SVG_DATA_URI}
              alt="NOAA Fisheries Blue Logo"
              width={36}
              height={36}
              className="w-8 h-8 sm:w-9 sm:h-9 max-w-[36px] max-h-[36px] object-contain shrink-0"
              loading="eager"
              decoding="sync"
            />
          </div>
          <div className="hidden min-[400px]:block text-left min-w-0">
            <span className="text-xs font-medium uppercase tracking-wider text-noaa-blue block">
              NOAA Fisheries
            </span>
            <h1 className="text-xs sm:text-sm font-semibold text-slate-800 truncate max-w-[140px] sm:max-w-[220px] md:max-w-[320px]">
              {title}
            </h1>
          </div>
        </div>

        {/* Center/Right: Dropdown Selector & Dev Tools Toggle Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Global Navigation Dropdown Selector */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-noaa-blue/30 min-h-[40px] sm:min-h-[44px]"
              aria-label="Select slide menu"
              aria-expanded={dropdownOpen}
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-noaa-blue shrink-0" />
              <span className="hidden xs:inline text-slate-500 font-normal">
                Slide {currentIndex + 1}:
              </span>
              <span className="font-medium text-slate-800 truncate max-w-[90px] xs:max-w-[130px] sm:max-w-[180px]">
                {currentSlide?.title || `Slide ${currentIndex + 1}`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu Modal */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 md:w-96 max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in divide-y divide-slate-100">
                <div className="px-3 py-2 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500 font-medium border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Presentation className="w-3.5 h-3.5 text-noaa-blue" />
                    Select Slide Jump
                  </span>
                  <span>{slides.length} Total Slides</span>
                </div>

                <div className="py-1">
                  {slides.map((slide, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => {
                          onSelectSlide(idx);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 sm:px-4 py-2.5 flex items-start justify-between gap-3 text-xs sm:text-sm transition-colors ${
                          isActive
                            ? "bg-noaa-blue-light/70 text-noaa-blue font-medium"
                            : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span
                            className={`inline-flex items-center justify-center w-5 h-5 rounded text-[11px] font-semibold shrink-0 mt-0.5 ${
                              isActive
                                ? "bg-noaa-blue text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <div className="min-w-0 text-left">
                            <p className="truncate font-medium leading-tight">
                              {slide.title}
                            </p>
                            {slide.category && (
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                                {slide.category}
                              </p>
                            )}
                          </div>
                        </div>

                        {isActive && (
                          <Check className="w-4 h-4 text-noaa-blue shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Developer Tools Toggle Switch */}
          <div className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2 border-l border-slate-200">
            <button
              type="button"
              role="switch"
              aria-checked={isDevMode}
              onClick={toggleDevMode}
              className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none"
              title={isDevMode ? "Turn off Developer Tools" : "Turn on Developer Tools"}
              aria-label="Toggle Developer Tools"
            >
              <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                <Wrench
                  className={`w-3.5 h-3.5 transition-colors ${
                    isDevMode ? "text-coral" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span className="select-none">Dev Tools</span>
              </div>

              {/* Toggle Switch Track & Thumb */}
              <div
                className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-noaa-blue focus:ring-offset-2 ${
                  isDevMode ? "bg-noaa-blue" : "bg-slate-200 group-hover:bg-slate-300"
                }`}
              >
                <span className="sr-only">Toggle Developer Tools</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isDevMode
                      ? "translate-x-4 sm:translate-x-5"
                      : "translate-x-0"
                  }`}
                >
                  {isDevMode ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  )}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
