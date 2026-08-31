"use client";

import React, { useState } from "react";
import {
  FileDown,
  Layers,
  Grid3X3,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { SlideData } from "@/types/presentation";
import { useDevTools } from "@/context/DevToolsContext";
import {
  exportCurrentSlidePdf,
  exportAllDeckSlidesPdf,
} from "@/utils/pdfExport";

interface DevToolbarProps {
  slides: SlideData[];
  currentIndex: number;
  onGoToSlide: (index: number) => void;
  getSlideElement: () => HTMLElement | null;
}

export const DevToolbar: React.FC<DevToolbarProps> = ({
  slides,
  currentIndex,
  onGoToSlide,
  getSlideElement,
}) => {
  const {
    isDevMode,
    showGridOverlay,
    toggleGridOverlay,
    isExporting,
    setIsExporting,
    exportProgress,
    setExportProgress,
    exportError,
    setExportError,
  } = useDevTools();

  const [notification, setNotification] = useState<string | null>(null);

  if (!isDevMode) return null;

  const currentSlide = slides[currentIndex];

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleExportCurrentSlide = async () => {
    if (isExporting) return;
    const element = getSlideElement();
    if (!element) {
      setExportError("Slide container element could not be found");
      return;
    }

    try {
      setIsExporting(true);
      setExportError(null);
      await exportCurrentSlidePdf(element, currentSlide, currentIndex);
      triggerNotification(`Slide ${currentIndex + 1} PDF downloaded successfully!`);
    } catch (err) {
      console.error("PDF export error:", err);
      setExportError(
        err instanceof Error ? err.message : "Failed to generate slide PDF"
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAllSlides = async () => {
    if (isExporting) return;

    try {
      setIsExporting(true);
      setExportError(null);
      await exportAllDeckSlidesPdf({
        slides,
        currentIndex,
        onGoToSlide,
        getSlideElement,
        onProgress: (current, total, stage) => {
          setExportProgress({ current, total, stage });
        },
      });
      triggerNotification(`All ${slides.length} slides exported to PDF!`);
    } catch (err) {
      console.error("Full deck PDF export error:", err);
      setExportError(
        err instanceof Error ? err.message : "Failed to generate deck PDF"
      );
    } finally {
      setIsExporting(false);
      setExportProgress(null);
    }
  };

  return (
    <div
      data-dev-ignore="true"
      className="w-full bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md transition-all duration-200 z-30"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 text-xs font-sans">
        {/* Left: Mode Badge & Slide Meta */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-noaa-blue text-white font-semibold text-[11px] tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-coral" />
            <span>DEV TOOLS</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span className="text-slate-200 font-semibold">
              Slide {currentIndex + 1}/{slides.length}
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-noaa-blue-light border border-slate-700">
              {currentSlide?.type}
            </span>
          </div>
        </div>

        {/* Center/Right: Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Layout Grid Guidelines Toggle */}
          <button
            onClick={toggleGridOverlay}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showGridOverlay
                ? "bg-coral text-white shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }`}
            title="Toggle Visual Layout Grid"
          >
            <Grid3X3 className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline">Grid Guidelines</span>
          </button>

          {/* Download Active Slide PDF */}
          <button
            onClick={handleExportCurrentSlide}
            disabled={isExporting}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              isExporting
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                : "bg-seagrass hover:bg-seagrass-hover text-white active:scale-95 shadow-seagrass/20"
            }`}
            title="Export and download the currently active slide as a PDF"
          >
            {isExporting && !exportProgress ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileDown className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>Download Slide (PDF)</span>
          </button>

          {/* Download All Slides PDF */}
          <button
            onClick={handleExportAllSlides}
            disabled={isExporting}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isExporting
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                : "bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700"
            }`}
            title="Export the entire presentation deck into a single multi-page PDF"
          >
            {exportProgress ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-noaa-blue-light" />
                <span>
                  {exportProgress.current}/{exportProgress.total} Exporting...
                </span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-noaa-blue-light shrink-0" />
                <span className="hidden sm:inline">Download All Slides</span>
                <span className="sm:hidden">All (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress or Status Toast Bar */}
      {(notification || exportError) && (
        <div
          className={`px-4 py-1.5 text-center text-xs font-medium flex items-center justify-center gap-2 border-t ${
            exportError
              ? "bg-coral/20 text-coral border-coral/30"
              : "bg-seagrass/20 text-emerald-300 border-seagrass/30"
          }`}
        >
          {exportError ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{exportError}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span>{notification}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
