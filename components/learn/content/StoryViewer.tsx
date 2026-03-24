"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Share2, Info } from 'lucide-react';
import { StorySlide } from '@/types/learn';
import StoryCover from './story-slides/StoryCover';
import StoryBullets from './story-slides/StoryBullets';
import StoryPillars from './story-slides/StoryPillars';
import StoryTiles from './story-slides/StoryTiles';
import StoryRisks from './story-slides/StoryRisks';
import StoryQuiz from './story-slides/StoryQuiz';
import StoryCTA from './story-slides/StoryCTA';
import { cn } from '@/lib/utils';
import { useHigReducedMotion, useMotionTier } from '@/components/animations/hig-motion';

interface StoryViewerProps {
  slides: StorySlide[];
  currentSlideIdx: number;
  onSlideChange: (idx: number) => void;
  onQuizAnswer?: (slideIdx: number, answer: number) => void;
  onComplete?: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  slides,
  currentSlideIdx,
  onSlideChange,
  onQuizAnswer,
  onComplete,
}) => {
  const [direction, setDirection] = useState(0);
  const motionTier = useMotionTier();
  const reducedMotion = useHigReducedMotion();
  const useMobileMotion = motionTier === "mobile" || reducedMotion;

  if (slides.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[#F0EDE6]/30 font-mono text-xs uppercase tracking-widest">
        No story slides available.
      </div>
    );
  }

  const currentSlide = slides[currentSlideIdx];

  const handleNext = () => {
    if (currentSlideIdx < slides.length - 1) {
      setDirection(1);
      onSlideChange(currentSlideIdx + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlideIdx > 0) {
      setDirection(-1);
      onSlideChange(currentSlideIdx - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: useMobileMotion ? 0 : (direction > 0 ? '100%' : '-100%'),
      opacity: 0.25,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: (useMobileMotion ? { duration: 0.2, ease: "easeOut" } : { type: "spring", stiffness: 260, damping: 32 }) as any,
        opacity: { duration: useMobileMotion ? 0.18 : 0.24 },
      }
    },
    exit: (direction: number) => ({
      x: useMobileMotion ? 0 : (direction < 0 ? '100%' : '-100%'),
      opacity: 0,
      transition: (useMobileMotion ? { duration: 0.15, ease: "easeOut" } : { type: "spring", stiffness: 260, damping: 32 }) as any,
    }),
  };

  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col md:items-center md:justify-center md:p-8">
      {/* Background Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={useMobileMotion ? { opacity: 0.22 } : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={useMobileMotion ? { duration: 0.2 } : { duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[160px]"
          style={{ backgroundColor: currentSlide.orb1 || '#BB0631' }}
        />
        <motion.div 
          animate={useMobileMotion ? { opacity: 0.12 } : {
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={useMobileMotion ? { duration: 0.2 } : { duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[140px]"
          style={{ backgroundColor: currentSlide.orb2 || '#006400' }}
        />
      </div>

      <div className="relative h-full w-full md:max-w-[450px] md:aspect-[9/19] md:max-h-[92vh] bg-kenya-black md:rounded-[3.5rem] md:shadow-[0_80px_160px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col border-none md:border md:border-white/10">
        
        {/* Progress Bars - Premium Style */}
        <div className="absolute top-8 left-4 right-4 z-50 flex gap-1.5 px-2">
          {slides.map((_, idx) => (
            <div key={idx} className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
              <motion.div 
                initial={false}
                animate={{ 
                  width: idx < currentSlideIdx ? '100%' : idx === currentSlideIdx ? '100%' : '0%',
                }}
                transition={{ duration: idx === currentSlideIdx ? 7 : 0.4, ease: "linear" }}
                className={cn(
                  "h-full rounded-full transition-colors shadow-[0_0_8px_rgba(187,6,49,0.5)]",
                  idx <= currentSlideIdx ? "bg-gradient-to-r from-kenya-red to-kenya-gold" : "bg-transparent"
                )}
              />
            </div>
          ))}
        </div>

        {/* Slide Content */}
        <div className="flex-1 relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlideIdx}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col p-6 sm:p-8 pt-24 overflow-hidden"
            >
              {currentSlide.type === 'cover' && <StoryCover slide={currentSlide as any} />}
              {currentSlide.type === 'bullets' && <StoryBullets slide={currentSlide as any} />}
              {currentSlide.type === 'pillars' && <StoryPillars slide={currentSlide as any} />}
              {currentSlide.type === 'tiles' && <StoryTiles slide={currentSlide as any} />}
              {currentSlide.type === 'risks' && <StoryRisks slide={currentSlide as any} />}
              {currentSlide.type === 'quiz' && (
                <StoryQuiz
                  slide={currentSlide as any}
                  onAnswer={(answer) => onQuizAnswer?.(currentSlideIdx, answer)}
                />
              )}
              {currentSlide.type === 'cta' && (
                <StoryCTA
                  slide={currentSlide as any}
                  onAction={(action) => {
                    if (action === 'next') handleNext();
                    if (action === 'complete') onComplete?.();
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Invisible Nav areas */}
          {(currentSlide.type !== "cta" && currentSlide.type !== "quiz") && (
            <div className="absolute inset-0 z-40 flex">
            <div 
              className="w-1/3 h-full cursor-west-resize" 
              onClick={handlePrev} 
              aria-label="Previous slide"
            />
            <div 
              className="w-2/3 h-full cursor-east-resize" 
              onClick={handleNext} 
              aria-label="Next slide"
            />
            </div>
          )}
        </div>

        {/* Footer info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
           <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
              <span>{currentSlideIdx + 1} / {slides.length}</span>
              <div className="flex gap-4">
                <Share2 className="h-3.5 w-3.5" />
                <Info className="h-3.5 w-3.5" />
              </div>
           </div>
        </div>
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-24 pointer-events-none">
        <button 
          onClick={handlePrev}
          disabled={currentSlideIdx === 0}
          className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 text-white/20 hover:text-white hover:bg-white/5 transition-all pointer-events-auto disabled:opacity-0"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>
        <button 
          onClick={handleNext}
          className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-white/20 hover:text-white hover:bg-white/5 backdrop-blur-md transition-all pointer-events-auto shadow-2xl"
        >
          <ChevronRight className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;