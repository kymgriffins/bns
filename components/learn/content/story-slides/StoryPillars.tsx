"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StoryPillarsProps {
  slide: {
    title: string;
    pillars: {
      icon: string;
      title: string;
      desc: string;
    }[];
  };
}

const StoryPillars: React.FC<StoryPillarsProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col pt-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-black leading-[0.9] text-white mb-16 text-center tracking-tighter uppercase"
      >
        {slide.title}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4">
        {slide.pillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + idx * 0.1, type: 'spring' }}
            className="p-8 rounded-[2.5rem] bg-white/[0.04] border border-white/10 flex flex-col items-center text-center group overflow-hidden relative shadow-xl"
          >
            <div className="text-5xl mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 z-10 drop-shadow-lg">
              {pillar.icon}
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-3 z-10">
              {pillar.title}
            </h3>
            <p className="text-[10px] font-bold text-white/40 leading-tight uppercase tracking-tight z-10 italic">
              {pillar.desc}
            </p>
            
            {/* Hover Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-kenya-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryPillars;