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
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-8 p-6 rounded-full bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="text-6xl">{slide.emoji || '📖'}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#F5C842]">
          <Sparkles className="h-3 w-3" />
          Module Intro
        </div>
        <h2 className="text-3xl font-serif font-light leading-tight text-white mb-2">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-sm text-white/50 max-w-[280px] mx-auto leading-relaxed">
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-16 flex flex-col items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-white/20"
      >
        <span>Tap right to start</span>
        <motion.div 
           animate={{ x: [0, 5, 0] }}
           transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StoryCover;