"use client";

import React from "react";
import { motion } from "framer-motion";
import { QuoteSlideData } from "@/types/presentation";
import { Quote, Anchor } from "lucide-react";

interface QuoteSlideProps {
  data: QuoteSlideData;
}

export const QuoteSlide: React.FC<QuoteSlideProps> = ({ data }) => {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-8 py-8 max-w-5xl mx-auto text-center">
      {/* Category Header */}
      {data.category && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-semibold text-noaa-blue uppercase tracking-wider mb-4 block"
        >
          {data.category}
        </motion.span>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 sm:p-12 md:p-16 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden"
      >
        {/* Subtle Watermark Quote Icon */}
        <Quote className="absolute top-6 left-6 w-16 h-16 sm:w-24 sm:h-24 text-slate-100/80 -scale-x-100 pointer-events-none" />

        {/* Quote Body */}
        <blockquote className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-slate-800 tracking-tight leading-relaxed mb-8">
          &ldquo;{data.quote}&rdquo;
        </blockquote>

        {/* Coral Divider Accent Line */}
        <div className="w-16 h-1 bg-coral rounded-full mx-auto mb-6" />

        {/* Author Details */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-1">
            <Anchor className="w-4 h-4 text-noaa-blue" />
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              {data.author}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            {data.authorTitle}
          </p>

          {data.organization && (
            <p className="text-xs text-noaa-blue font-medium mt-1">
              {data.organization}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
