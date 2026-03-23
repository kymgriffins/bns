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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-black leading-tight text-white mb-12 tracking-tighter uppercase"
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
            className="p-6 rounded-none bg-white/[0.03] border border-white/5 flex flex-col group overflow-hidden relative"
          >
            <div className="text-4xl font-black text-kenya-gold mb-2 group-hover:scale-110 transition-transform duration-500 z-10 tracking-tighter">
              {tile.num}
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-2 z-10 leading-tight">
              {tile.label}
            </h3>
            <p className="text-[10px] font-bold text-white/30 leading-tight uppercase tracking-tight z-10">
              {tile.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryTiles;