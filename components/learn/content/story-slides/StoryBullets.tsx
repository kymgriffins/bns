"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface StoryBulletsProps {
  slide: {
    title: string;
    bullets: string[];
    bg?: string;
  };
}

const StoryBullets: React.FC<StoryBulletsProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col pt-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-serif font-light leading-snug text-white mb-10"
      >
        {slide.title}
      </motion.h2>

      <div className="space-y-6">
        {slide.bullets.map((bullet, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-[20px] bg-white/5 border border-white/5 shadow-inner"
          >
            <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[#F5C842]/20 flex items-center justify-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#F5C842]" />
            </div>
            <p className="text-sm font-sans text-white/80 leading-relaxed font-normal">
              {bullet}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryBullets;