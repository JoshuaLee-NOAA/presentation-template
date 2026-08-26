"use client";

import React from "react";
import { motion } from "framer-motion";
import { MetricsSlideData } from "@/types/presentation";
import { TrendingUp, BarChart3, Info } from "lucide-react";

interface MetricsSlideProps {
  data: MetricsSlideData;
}

export const MetricsSlide: React.FC<MetricsSlideProps> = ({ data }) => {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-8 py-8 max-w-7xl mx-auto">
      {/* Category Header */}
      {data.category && (
        <span className="text-xs font-semibold text-noaa-blue uppercase tracking-wider mb-2 block">
          {data.category}
        </span>
      )}

      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-3">
        {data.title}
      </h2>

      {/* Subtitle */}
      {data.subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mb-8 font-normal leading-relaxed">
          {data.subtitle}
        </p>
      )}

      {/* Metrics Cards Grid (1-column on mobile, 3-column on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
        {data.metrics.map((metric, idx) => {
          // Determine badge color class
          let badgeClass = "bg-seagrass-light text-seagrass border-seagrass/30";
          if (metric.badgeColor === "coral") {
            badgeClass = "bg-coral-light text-coral-hover border-coral/30";
          } else if (metric.badgeColor === "skygold") {
            badgeClass = "bg-skygold-light text-skygold-hover border-skygold/30";
          } else if (metric.badgeColor === "noaa") {
            badgeClass = "bg-noaa-blue-light text-noaa-blue border-noaa-blue/30";
          }

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * idx, duration: 0.5 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-5 h-5 text-noaa-blue" />
                  {metric.trend && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {metric.trend}
                    </span>
                  )}
                </div>

                {/* KPI Big Figure */}
                <h3 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight mb-2 font-mono">
                  {metric.value}
                </h3>

                {/* KPI Label */}
                <h4 className="text-base font-semibold text-slate-800 mb-2">
                  {metric.label}
                </h4>

                {/* Description */}
                {metric.description && (
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                    {metric.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Footnote */}
      {data.summaryNote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-600"
        >
          <Info className="w-4 h-4 text-noaa-blue shrink-0 mt-0.5" />
          <span>{data.summaryNote}</span>
        </motion.div>
      )}
    </div>
  );
};
