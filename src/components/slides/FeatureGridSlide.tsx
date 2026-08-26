"use client";

import React from "react";
import { motion } from "framer-motion";
import { FeatureGridSlideData } from "@/types/presentation";
import { Layers, Menu, Smartphone, Bot, Sparkles, Code2 } from "lucide-react";

interface FeatureGridSlideProps {
  data: FeatureGridSlideData;
}

export const FeatureGridSlide: React.FC<FeatureGridSlideProps> = ({
  data,
}) => {
  // Icon mapper helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Menu":
        return <Menu className="w-5 h-5 text-noaa-blue" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-coral" />;
      case "Bot":
        return <Bot className="w-5 h-5 text-seagrass" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-skygold" />;
      default:
        return <Layers className="w-5 h-5 text-noaa-blue" />;
    }
  };

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

      {/* Feature Grid (1-column on mobile, 3-column on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
        {data.features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * idx, duration: 0.5 }}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                  {getIcon(feature.iconName)}
                </div>

                {feature.badge && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-noaa-blue-light text-noaa-blue border border-noaa-blue/20">
                    {feature.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-medium text-noaa-blue">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span>Reusable Component</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
