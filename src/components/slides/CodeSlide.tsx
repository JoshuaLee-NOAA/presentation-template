"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CodeSlideData } from "@/types/presentation";
import { Code2, Copy, Check, Terminal, CheckCircle2 } from "lucide-react";

interface CodeSlideProps {
  data: CodeSlideData;
}

export const CodeSlide: React.FC<CodeSlideProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (data.snippet.code) {
      navigator.clipboard.writeText(data.snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

      {/* Grid: Left Code Container, Right Explanation List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code Snippet Box (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden text-slate-100"
        >
          {/* Code Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-coral/80" />
                <div className="w-3 h-3 rounded-full bg-skygold/80" />
                <div className="w-3 h-3 rounded-full bg-seagrass/80" />
              </div>
              <span className="text-slate-400 font-medium ml-2">
                {data.snippet.filename || "snippet.ts"}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-[11px]"
              aria-label="Copy code snippet"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-seagrass" />
                  <span className="text-seagrass font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
            <pre>
              <code>{data.snippet.code}</code>
            </pre>
          </div>
        </motion.div>

        {/* Right Bullet List (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-6 text-noaa-blue font-semibold text-sm">
              <Terminal className="w-4 h-4 text-seagrass" />
              <span>Implementation Highlights</span>
            </div>

            <ul className="space-y-4">
              {data.explanationBullets?.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-seagrass shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono text-seagrass">Type Safe</span>
            <span className="font-mono text-coral">Extensible Props</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
