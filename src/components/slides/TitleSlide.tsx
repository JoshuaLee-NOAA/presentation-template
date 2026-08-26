"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { TitleSlideData } from "@/types/presentation";
import { Calendar, User, Tag } from "lucide-react";
import { FISHERIES_LOGO_DATA_URI } from "@/constants/logos";

interface TitleSlideProps {
  data: TitleSlideData;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ data }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Automatic failover to embedded base64 data URI if network fetch ever drops
    if (e.currentTarget.src !== FISHERIES_LOGO_DATA_URI) {
      e.currentTarget.src = FISHERIES_LOGO_DATA_URI;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 sm:py-12 bg-gradient-to-b from-white via-slate-50 to-noaa-blue-light/30">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl w-full text-center flex flex-col items-center"
      >
        {/* Category Badge */}
        {data.category && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-noaa-blue-light border border-noaa-blue/20 text-noaa-blue text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span>{data.category}</span>
          </motion.div>
        )}

        {/* Main Fisheries Brand Logo (fisheries.png) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex items-center justify-center shrink-0 h-16 sm:h-20 md:h-24 min-h-[64px] w-auto relative mb-3 sm:mb-4"
        >
          {/* Embedded base64 data URI: 100% immune to network disconnection, throttling, and remount race conditions */}
          <img
            ref={imgRef}
            src={data.logoPath || FISHERIES_LOGO_DATA_URI}
            alt="NOAA Fisheries Logo"
            width={380}
            height={162}
            className="h-16 sm:h-20 md:h-24 w-auto max-w-full object-contain shrink-0"
            loading="eager"
            decoding="sync"
            onError={handleError}
          />
        </motion.div>

        {/* Coral Animated Accent Line - matches exact width of the logo */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
          className="w-[150px] sm:w-[188px] md:w-[224px] h-1.5 bg-gradient-to-r from-coral via-coral-hover to-skygold rounded-full mb-8 origin-center"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight sm:leading-tight mb-4"
        >
          {data.title}
        </motion.h1>

        {/* Subtitle */}
        {data.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            className="text-sm sm:text-lg md:text-xl text-slate-600 font-normal max-w-2xl mb-10 leading-relaxed"
          >
            {data.subtitle}
          </motion.p>
        )}

        {/* Presenter Metadata & Tags Footer Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 pt-6 border-t border-slate-200/80 w-full max-w-2xl text-xs sm:text-sm text-slate-600"
        >
          {data.author && (
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              <User className="w-4 h-4 text-noaa-blue" />
              <span>{data.author}</span>
              {data.authorRole && (
                <span className="text-slate-400 font-normal">
                  ({data.authorRole})
                </span>
              )}
            </div>
          )}

          {data.date && (
            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-4 h-4 text-seagrass" />
              <span>{data.date}</span>
            </div>
          )}

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap justify-center w-full mt-2">
              <Tag className="w-3.5 h-3.5 text-coral shrink-0" />
              {data.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
