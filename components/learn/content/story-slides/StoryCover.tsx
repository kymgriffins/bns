"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface StoryCoverProps {
  slide: {
    title: string;
    subtitle?: string;
    emoji?: string;
  };
}

const StoryCover: React.FC<StoryCoverProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12 p-10 rounded-none bg-white/5 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="text-7xl">{slide.emoji || '📖'}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-kenya-gold">
          <Sparkles className="h-3 w-3" />
          Module Intro
        </div>
        <h2 className="text-4xl md:text-5xl font-black leading-none text-white mb-4 tracking-tighter uppercase">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-lg text-white/40 font-bold max-w-[280px] mx-auto leading-tight uppercase tracking-tight">
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-16 flex flex-col items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/10"
      >
        <span>Swipe to reveal</span>
        <motion.div 
           animate={{ x: [0, 8, 0] }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StoryCover;