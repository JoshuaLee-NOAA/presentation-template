"use client";

import React, { useState, useEffect } from "react";
import { Bug, X, Play, RefreshCw, CheckCircle2, AlertTriangle, Copy, Check } from "lucide-react";

export interface ImageDebugInfo {
  mountCount: number;
  lastEvent: string;
  isComplete: boolean;
  naturalWidth: number;
  naturalHeight: number;
  renderedWidth: number;
  renderedHeight: number;
  currentSrc: string;
  timestamp: string;
  errorLog: string[];
}

interface DebugOverlayProps {
  currentSlideIndex: number;
  totalSlides: number;
  onGoToSlide: (index: number) => void;
  imageDebugInfo?: ImageDebugInfo;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  currentSlideIndex,
  totalSlides,
  onGoToSlide,
  imageDebugInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Keyboard shortcut: press 'd' to toggle debug
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "d" &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Log telemetry updates to the console
  useEffect(() => {
    if (imageDebugInfo) {
      console.log(
        `%c[TITLE_SLIDE_TELEMETRY] #${imageDebugInfo.mountCount} event=${imageDebugInfo.lastEvent}`,
        "color: #00A88F; font-weight: bold;",
        imageDebugInfo
      );
    }
  }, [imageDebugInfo]);

  // Automated 5x Remount Cycle Test with Rich Console Logs
  const runRemountTest = async () => {
    if (testRunning) return;
    setTestRunning(true);
    const logs: string[] = [];

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    console.group("%c🧪 [5X REMOUNT CYCLE TEST STARTED]", "color: #FF6B4A; font-weight: bold; font-size: 13px;");
    console.log(`Viewport: ${window.innerWidth}px x ${window.innerHeight}px | UserAgent: ${navigator.userAgent}`);

    logs.push(`Test Started on ${window.innerWidth}x${window.innerHeight} viewport`);
    setTestResults([...logs]);

    for (let cycle = 1; cycle <= 5; cycle++) {
      console.log(`\n--- CYCLE ${cycle}/5 ---`);
      
      // Navigate to Slide 2 (index 1)
      console.log(`[Cycle ${cycle}] Navigating to Slide 2...`);
      onGoToSlide(1);
      await delay(500);

      // Navigate back to Slide 1 (index 0 - Title Slide)
      console.log(`[Cycle ${cycle}] Navigating back to Slide 1 (Title Slide)...`);
      onGoToSlide(0);
      await delay(600); // Allow Framer Motion transition (350ms) to finish completely

      const imgEl = document.querySelector<HTMLImageElement>(
        'img[alt="NOAA Fisheries Logo"]'
      );

      if (imgEl) {
        const details = {
          complete: imgEl.complete,
          naturalWidth: imgEl.naturalWidth,
          naturalHeight: imgEl.naturalHeight,
          clientWidth: imgEl.clientWidth,
          clientHeight: imgEl.clientHeight,
          src: imgEl.currentSrc || imgEl.src,
          offsetParent: imgEl.offsetParent !== null,
        };

        const isRendered =
          imgEl.complete && imgEl.naturalWidth > 0 && imgEl.clientHeight > 0;

        if (isRendered) {
          const passMsg = `Cycle ${cycle}/5: PASS (w: ${imgEl.naturalWidth}px, clientH: ${imgEl.clientHeight}px)`;
          console.log(`%c✔ ${passMsg}`, "color: #00A88F; font-weight: bold;", details);
          logs.push(passMsg);
        } else {
          const failMsg = `Cycle ${cycle}/5: FAIL (complete: ${imgEl.complete}, naturalW: ${imgEl.naturalWidth}, clientH: ${imgEl.clientHeight}px)`;
          console.error(`%c✖ ${failMsg}`, "color: #FF6B4A; font-weight: bold;", details);
          logs.push(failMsg);
        }
      } else {
        const failMsg = `Cycle ${cycle}/5: FAIL (Image element not found in DOM)`;
        console.error(`%c✖ ${failMsg}`, "color: #FF6B4A; font-weight: bold;");
        logs.push(failMsg);
      }
      setTestResults([...logs]);
    }

    const summaryMsg = "=== 5X REMOUNT TEST COMPLETED ===";
    console.log(`\n%c${summaryMsg}`, "color: #003087; font-weight: bold; font-size: 13px;");
    console.table(logs);
    console.groupEnd();

    logs.push("Test Complete. Check Console for full details.");
    setTestResults([...logs]);
    setTestRunning(false);
  };

  const copyLogsToClipboard = () => {
    const textToCopy = [
      `=== NOAA FISHERIES MOBILE REMOUNT DEBUG REPORT ===`,
      `Viewport: ${viewportSize.width}px x ${viewportSize.height}px`,
      `Active Slide: ${currentSlideIndex + 1} / ${totalSlides}`,
      `Image Telemetry: ${JSON.stringify(imageDebugInfo || {}, null, 2)}`,
      `--- Test Results ---`,
      ...testResults,
    ].join("\n");

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-16 left-3 z-50 p-2 rounded-full bg-slate-900/80 text-white shadow-lg hover:bg-slate-900 backdrop-blur-md transition-transform active:scale-95 border border-slate-700/50"
        title="Toggle Debug Telemetry (Press 'D')"
        aria-label="Toggle Debug Telemetry"
      >
        <Bug className="w-4 h-4 text-coral" />
      </button>

      {/* Debug Panel Modal */}
      {isOpen && (
        <div className="fixed bottom-28 left-3 z-50 w-80 sm:w-96 max-h-[75vh] bg-slate-950/95 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 p-4 font-mono text-xs overflow-y-auto backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <Bug className="w-4 h-4 text-coral" />
              <span>Mobile Debug Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={copyLogsToClipboard}
                className="p-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-[10px] transition-colors"
                title="Copy report to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-seagrass" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* System & Viewport Metrics */}
          <div className="mt-3 space-y-1.5 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Viewport:</span>
              <span className="text-slate-200 font-medium">
                {viewportSize.width}px × {viewportSize.height}px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Network:</span>
              <span className={isOnline ? "text-seagrass font-semibold" : "text-coral font-semibold"}>
                {isOnline ? "🟢 Online" : "🔴 Disconnected (Offline)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Active Slide:</span>
              <span className="text-noaa-blue-light font-semibold">
                {currentSlideIndex + 1} / {totalSlides}
              </span>
            </div>
          </div>

          {/* Title Slide Fisheries Logo Telemetry */}
          <div className="mt-4 p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
            <div className="flex items-center justify-between font-semibold text-slate-300 mb-2">
              <span>Fisheries Logo State:</span>
              {imageDebugInfo?.isComplete && imageDebugInfo?.naturalWidth > 0 ? (
                <span className="flex items-center gap-1 text-seagrass text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> OK
                </span>
              ) : (
                <span className="flex items-center gap-1 text-coral text-[10px]">
                  <AlertTriangle className="w-3.5 h-3.5" /> CHECK
                </span>
              )}
            </div>

            {imageDebugInfo ? (
              <div className="space-y-1 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Mount Count:</span>
                  <span className="text-slate-200">{imageDebugInfo.mountCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Event:</span>
                  <span className="text-slate-200">{imageDebugInfo.lastEvent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Natural Dim:</span>
                  <span className="text-slate-200">
                    {imageDebugInfo.naturalWidth} × {imageDebugInfo.naturalHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>DOM Box:</span>
                  <span className="text-slate-200">
                    {imageDebugInfo.renderedWidth}px × {imageDebugInfo.renderedHeight}px
                  </span>
                </div>
                <div className="flex justify-between truncate">
                  <span>Src:</span>
                  <span className="text-slate-300 truncate max-w-[160px]" title={imageDebugInfo.currentSrc}>
                    {imageDebugInfo.currentSrc.split("/").pop()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-[10px] text-slate-500 italic">
                (Navigate to Title Slide to inspect logo)
              </p>
            )}
          </div>

          {/* Automated Remount Test Runner */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={runRemountTest}
              disabled={testRunning}
              className={`w-full py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                testRunning
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-noaa-blue hover:bg-noaa-blue-hover active:scale-95 text-white shadow-md shadow-noaa-blue/30"
              }`}
            >
              {testRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Running Remount Test...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Run 5x Remount Cycle Test</span>
                </>
              )}
            </button>

            {/* Test Results Output */}
            {testResults.length > 0 && (
              <div className="mt-2.5 p-2 rounded-lg bg-black/60 border border-slate-800/80 text-[10px] space-y-1 font-mono max-h-32 overflow-y-auto">
                {testResults.map((r, i) => (
                  <div
                    key={i}
                    className={
                      r.includes("FAIL")
                        ? "text-coral"
                        : r.includes("PASS")
                        ? "text-seagrass"
                        : "text-slate-400"
                    }
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
