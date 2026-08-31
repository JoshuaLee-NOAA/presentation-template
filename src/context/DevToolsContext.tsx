"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ExportProgress {
  current: number;
  total: number;
  stage: string;
}

interface DevToolsContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  setDevMode: (val: boolean) => void;
  showGridOverlay: boolean;
  toggleGridOverlay: () => void;
  isExporting: boolean;
  setIsExporting: (val: boolean) => void;
  exportProgress: ExportProgress | null;
  setExportProgress: (progress: ExportProgress | null) => void;
  exportError: string | null;
  setExportError: (error: string | null) => void;
}

const DevToolsContext = createContext<DevToolsContextType | undefined>(undefined);

const DEV_MODE_STORAGE_KEY = "noaa_presentation_dev_mode";

export const DevToolsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDevMode, setIsDevMode] = useState(false);
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  // Restore dev mode setting from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DEV_MODE_STORAGE_KEY);
      if (saved !== null) {
        setIsDevMode(saved === "true");
      }
    } catch {
      // Ignore localStorage read errors in SSR/sandboxed environments
    }
  }, []);

  const toggleDevMode = () => {
    setIsDevMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(DEV_MODE_STORAGE_KEY, String(next));
      } catch {
        // Ignore write errors
      }
      return next;
    });
  };

  const setDevMode = (val: boolean) => {
    setIsDevMode(val);
    try {
      localStorage.setItem(DEV_MODE_STORAGE_KEY, String(val));
    } catch {
      // Ignore write errors
    }
  };

  const toggleGridOverlay = () => {
    setShowGridOverlay((prev) => !prev);
  };

  return (
    <DevToolsContext.Provider
      value={{
        isDevMode,
        toggleDevMode,
        setDevMode,
        showGridOverlay,
        toggleGridOverlay,
        isExporting,
        setIsExporting,
        exportProgress,
        setExportProgress,
        exportError,
        setExportError,
      }}
    >
      {children}
    </DevToolsContext.Provider>
  );
};

export const useDevTools = (): DevToolsContextType => {
  const context = useContext(DevToolsContext);
  if (!context) {
    throw new Error("useDevTools must be used within a DevToolsProvider");
  }
  return context;
};
