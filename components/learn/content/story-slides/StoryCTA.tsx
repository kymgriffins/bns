"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Share2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StoryCTAProps {
  slide: {
    title: string;
    subtitle: string;
    emoji?: string;
    buttons: {
      icon: string;
      title: string;
      type: 'primary' | 'ghost';
      action: 'share' | 'explore' | 'next' | 'complete';
    }[];
  };
  onAction?: (action: string) => void;
}

const StoryCTA: React.FC<StoryCTAProps> = ({ slide, onAction }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center pt-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 p-10 rounded-none bg-white/5 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="text-7xl">{slide.emoji || '🎉'}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6 mb-16"
      >
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-kenya-gold">
          <Sparkles className="h-3.5 w-3.5" />
          Story Complete
        </div>
        <h2 className="text-4xl md:text-5xl font-black leading-none text-white tracking-tighter uppercase" dangerouslySetInnerHTML={{ __html: slide.title }} />
        <p className="text-lg text-white/30 font-bold max-w-[280px] mx-auto leading-tight uppercase tracking-tight">
          {slide.subtitle}
        </p>
      </motion.div>

      <div className="w-full space-y-4 px-6">
        {slide.buttons.map((btn, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            onClick={() => onAction?.(btn.action)}
            className={cn(
              "w-full py-8 rounded-none flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all",
              btn.type === 'primary' 
                ? "bg-kenya-green text-white hover:bg-kenya-green/90" 
                : "bg-white/[0.03] text-white/40 border border-white/10 hover:bg-white/[0.08]"
            )}
          >
            <span className="text-xl">{btn.icon}</span>
            {btn.title}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StoryCTA;