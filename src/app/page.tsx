"use client";

import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { presentationConfig } from "@/content/slides";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { useSwipe } from "@/hooks/useSwipe";

import { DevToolsProvider } from "@/context/DevToolsContext";
import { DevToolbar } from "@/components/dev/DevToolbar";
import { GridLayoutOverlay } from "@/components/dev/GridLayoutOverlay";

import { TopNav } from "@/components/layout/TopNav";
import { BottomNav } from "@/components/layout/BottomNav";

import { TitleSlide } from "@/components/slides/TitleSlide";
import { SplitSlide } from "@/components/slides/SplitSlide";
import { MetricsSlide } from "@/components/slides/MetricsSlide";
import { FeatureGridSlide } from "@/components/slides/FeatureGridSlide";
import { QuoteSlide } from "@/components/slides/QuoteSlide";
import { CodeSlide } from "@/components/slides/CodeSlide";

import {
  TitleSlideData,
  SplitSlideData,
  MetricsSlideData,
  FeatureGridSlideData,
  QuoteSlideData,
  CodeSlideData,
} from "@/types/presentation";

function PresentationView() {
  const {
    currentIndex,
    currentSlide,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    hasNext,
    hasPrev,
  } = useSlideNavigation({ slides: presentationConfig.slides });

  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Mobile swipe gesture handlers
  const swipeHandlers = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  });

  // Render correct slide component based on type
  const renderSlideComponent = () => {
    if (!currentSlide) return null;

    switch (currentSlide.type) {
      case "title":
        return <TitleSlide data={currentSlide as TitleSlideData} />;
      case "split":
        return <SplitSlide data={currentSlide as SplitSlideData} />;
      case "metrics":
        return <MetricsSlide data={currentSlide as MetricsSlideData} />;
      case "featureGrid":
        return <FeatureGridSlide data={currentSlide as FeatureGridSlideData} />;
      case "quote":
        return <QuoteSlide data={currentSlide as QuoteSlideData} />;
      case "code":
        return <CodeSlide data={currentSlide as CodeSlideData} />;
      default:
        return null;
    }
  };

  return (
    <div
      {...swipeHandlers}
      className="min-h-[100dvh] h-[100dvh] flex flex-col justify-between bg-slate-50 text-slate-900 overflow-hidden relative"
    >
      {/* Visual Alignment Guidelines (Excluded from PDF capture) */}
      <GridLayoutOverlay />

      {/* Top Header Navigation with Slide Selector & Dev Tools Toggle */}
      <TopNav
        title={presentationConfig.shortTitle || presentationConfig.title}
        slides={presentationConfig.slides}
        currentIndex={currentIndex}
        onSelectSlide={goToSlide}
      />

      {/* Collapsible Developer Toolbar (Sub-Header Bar) */}
      <DevToolbar
        slides={presentationConfig.slides}
        currentIndex={currentIndex}
        onGoToSlide={goToSlide}
        getSlideElement={() => slideContainerRef.current}
      />

      {/* Main Slide Canvas Container (Target for PDF Capture) */}
      <main className="flex-1 w-full min-h-0 overflow-y-auto pb-20 pt-2 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentSlide && (
            <motion.div
              key={currentSlide.id}
              ref={slideContainerRef}
              id="active-slide-canvas"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full flex justify-center items-center"
            >
              {renderSlideComponent()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Touch-Friendly Navigation */}
      <BottomNav
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        onPrev={prevSlide}
        onNext={nextSlide}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
}

export default function PresentationPage() {
  return (
    <DevToolsProvider>
      <PresentationView />
    </DevToolsProvider>
  );
}
