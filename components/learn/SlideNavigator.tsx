"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface NavigationButton {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

interface SlideNavigatorProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide?: (slideIndex: number) => void;
  slideTitle?: string;
  showProgress?: boolean;
  orientation?: "horizontal" | "vertical";
  responsive?: boolean;
}

export function SlideNavigator({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoToSlide,
  slideTitle,
  showProgress = true,
  orientation = "horizontal",
  responsive = true,
}: SlideNavigatorProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!responsive) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [responsive]);

  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
  const isHorizontal = orientation === "horizontal";

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Progress Bar */}
      {showProgress && (
        <motion.div
          className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}

      {/* Slide Counter & Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Slide {currentSlide + 1} of {totalSlides}
        </div>
        {slideTitle && (
          <div className="text-base font-semibold text-slate-900 dark:text-white truncate">
            {slideTitle}
          </div>
        )}
      </div>

      {/* Navigator Controls */}
      <nav
        className={`flex items-center justify-between gap-2 ${
          isMobile ? "gap-2" : "gap-4"
        }`}
        aria-label="Slide navigation"
      >
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous slide"
        >
          <span className="text-sm md:text-base">←</span>
          {!isMobile && <span className="text-sm font-medium">Back</span>}
        </motion.button>

        {/* Slide Indicators (only on larger screens) */}
        {!isMobile && totalSlides <= 12 && onGoToSlide && (
          <div className="flex items-center gap-1 flex-wrap justify-center flex-1">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2 }}
                onClick={() => onGoToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? "bg-blue-600 w-6"
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors font-medium"
          aria-label="Next slide"
        >
          {!isMobile && <span className="text-sm">Next</span>}
          <span className="text-sm md:text-base">→</span>
        </motion.button>
      </nav>

      {/* Mobile Jump To Slide */}
      {isMobile && totalSlides > 12 && onGoToSlide && (
        <div className="flex items-center gap-2">
          <select
            value={currentSlide}
            onChange={(e) => onGoToSlide(parseInt(e.target.value))}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            aria-label="Jump to slide"
          >
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <option key={idx} value={idx}>
                Slide {idx + 1}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
