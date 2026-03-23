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
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-8 p-6 rounded-[32px] bg-gradient-to-br from-[#F5C842]/20 to-[#F5C842]/5 border border-[#F5C842]/20 shadow-[0_20px_50px_rgba(245,200,66,0.1)]"
      >
        <div className="text-6xl">{slide.emoji || '🎉'}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 mb-12"
      >
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#F5C842]">
          <Sparkles className="h-3.5 w-3.5" />
          Story Complete
        </div>
        <h2 className="text-3xl font-serif font-light leading-tight text-white" dangerouslySetInnerHTML={{ __html: slide.title }} />
        <p className="text-sm text-white/50 max-w-[280px] mx-auto leading-relaxed">
          {slide.subtitle}
        </p>
      </motion.div>

      <div className="w-full space-y-3 px-4">
        {slide.buttons.map((btn, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            onClick={() => onAction?.(btn.action)}
            className={cn(
              "w-full py-4 rounded-[20px] flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest transition-all",
              btn.type === 'primary' 
                ? "bg-[#F5C842] text-[#1A1200] shadow-[0_10px_30px_rgba(245,200,66,0.2)] hover:scale-[1.02]" 
                : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
            )}
          >
            <span className="text-lg">{btn.icon}</span>
            {btn.title}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StoryCTA;