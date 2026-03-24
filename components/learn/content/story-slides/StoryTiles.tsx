"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StoryTilesProps {
  slide: {
    title: string;
    tiles: {
      num: string;
      label: string;
      desc: string;
    }[];
  };
}

const StoryTiles: React.FC<StoryTilesProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col pt-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-black leading-[0.9] text-white mb-16 tracking-tighter uppercase border-l-8 border-kenya-gold pl-6"
      >
        {slide.title}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4">
        {slide.tiles.map((tile, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white/[0.04] border border-white/10 flex flex-col group overflow-hidden relative shadow-2xl"
          >
            <div className="text-5xl font-black text-kenya-gold mb-3 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 z-10 tracking-tighter drop-shadow-[0_0_10px_rgba(245,200,66,0.3)]">
              {tile.num}
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-3 z-10 leading-tight">
              {tile.label}
            </h3>
            <p className="text-[10px] font-bold text-white/50 leading-tight uppercase tracking-tight z-10 italic">
              {tile.desc}
            </p>
            <div className="absolute top-0 right-0 w-24 h-24 bg-kenya-gold/5 blur-3xl rounded-full translate-x-12 -translate-y-12" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryTiles;