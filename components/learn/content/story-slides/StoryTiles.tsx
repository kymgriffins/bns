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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-serif font-light leading-snug text-white mb-8"
      >
        {slide.title}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4">
        {slide.tiles.map((tile, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="p-5 rounded-[24px] bg-white/5 border border-white/5 flex flex-col shadow-inner group overflow-hidden relative"
          >
            <div className="text-3xl font-serif font-bold text-[#F5C842] mb-1 group-hover:scale-110 transition-transform duration-300 z-10">
              {tile.num}
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-2 z-10">
              {tile.label}
            </h3>
            <p className="text-[10px] text-white/40 leading-relaxed z-10">
              {tile.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryTiles;