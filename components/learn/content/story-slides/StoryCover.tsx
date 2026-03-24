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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-14 h-32 w-32 flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-kenya-red/10 animate-pulse" />
        <div className="text-6xl relative z-10">{slide.emoji || '📖'}</div>
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
        <h2 className="text-5xl md:text-7xl font-black leading-[0.9] text-white tracking-tighter uppercase mb-6 drop-shadow-2xl">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xl text-white/50 font-bold max-w-[320px] mx-auto leading-tight uppercase tracking-tight italic">
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