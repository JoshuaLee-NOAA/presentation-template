"use client";

import { useState, useEffect, useCallback } from "react";
import { SlideData } from "@/types/presentation";

interface UseSlideNavigationProps {
  slides: SlideData[];
}

export function useSlideNavigation({ slides }: UseSlideNavigationProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalSlides = slides.length;

  // Sync index from URL hash on initial mount or hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const slideIndex = slides.findIndex((s) => s.id === hash);
        if (slideIndex !== -1) {
          setCurrentIndex(slideIndex);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [slides]);

  // Update URL hash when index changes
  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentIndex(index);
        const targetSlide = slides[index];
        if (targetSlide) {
          window.history.replaceState(null, "", `#${targetSlide.id}`);
        }
      }
    },
    [slides, totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    }
  }, [currentIndex, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, goToSlide]);

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept keypresses if user is inside an input/textarea
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement)?.tagName
        )
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "Space":
        case "PageDown":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          prevSlide();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  return {
    currentIndex,
    currentSlide: slides[currentIndex],
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    hasNext: currentIndex < totalSlides - 1,
    hasPrev: currentIndex > 0,
  };
}
