"use client";

import React from "react";
import { motion } from "framer-motion";
import { SplitSlideData } from "@/types/presentation";
import { CheckCircle2, ShieldCheck, Activity } from "lucide-react";

interface SplitSlideProps {
  data: SplitSlideData;
}

export const SplitSlide: React.FC<SplitSlideProps> = ({ data }) => {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-8 py-8 max-w-7xl mx-auto">
      {/* Category Header */}
      {data.category && (
        <span className="text-xs font-semibold text-noaa-blue uppercase tracking-wider mb-2 block">
          {data.category}
        </span>
      )}

      {/* Main Slide Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-3">
        {data.title}
      </h2>

      {/* Subtitle */}
      {data.subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mb-8 font-normal leading-relaxed">
          {data.subtitle}
        </p>
      )}

      {/* 2-Column Responsive Layout (Auto-stacks on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-stretch">
        {/* Left Column: Bullet Points & Content */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs"
        >
          <div className="flex items-center gap-2 mb-6 text-seagrass font-medium text-sm">
            <Activity className="w-4 h-4" />
            <span>Key Functional Highlights</span>
          </div>

          <ul className="space-y-4">
            {data.bullets?.map((bullet, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.2, duration: 0.4 }}
                className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-normal leading-normal"
              >
                <CheckCircle2 className="w-5 h-5 text-seagrass shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column: Visual Card or Diagram */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-between bg-gradient-to-br from-noaa-blue via-noaa-dark to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden"
        >
          {/* Accent Coral Overlay Circle */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-coral/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono font-medium text-seagrass-light">
                SYSTEM SPECIFICATIONS
              </span>
              <ShieldCheck className="w-5 h-5 text-coral" />
            </div>

            {data.mediaCardTitle && (
              <h3 className="text-lg sm:text-xl font-semibold mb-6 text-white">
                {data.mediaCardTitle}
              </h3>
            )}

            {/* Media Card Key-Value Items */}
            {data.mediaCardItems && (
              <div className="space-y-3.5 mb-6">
                {data.mediaCardItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm"
                  >
                    <span className="text-slate-300 font-normal">
                      {item.label}
                    </span>
                    <span className="font-semibold text-white font-mono">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {data.mediaCaption && (
            <p className="text-xs text-slate-300 italic border-t border-white/10 pt-4 mt-4">
              {data.mediaCaption}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
