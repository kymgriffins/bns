"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Quote, 
  Image as ImageIcon, 
  Code as CodeIcon,
  CheckCircle2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LessonSection, LessonContent } from '@/types/learn';
import { cn } from '@/lib/utils';
import { useHigReducedMotion, useMotionTier } from '@/components/animations/hig-motion';

interface LessonPaneProps {
  sections: LessonSection[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export const LessonPane: React.FC<LessonPaneProps> = ({
  sections,
  activeSection,
  onSectionChange,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.length > 0 ? [sections[0].id] : [])
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const motionTier = useMotionTier();
  const reducedMotion = useHigReducedMotion();
  const useMobileMotion = motionTier === "mobile" || reducedMotion;

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
    onSectionChange?.(sectionId);
    
    // Update active index based on sectionId
    const idx = sections.findIndex(s => s.id === sectionId);
    if (idx !== -1) setActiveIdx(idx);
  };

  const scrollToSection = (idx: number) => {
    if (idx < 0 || idx >= sections.length) return;
    
    const sectionId = sections[idx].id;
    
    // Auto-expand the target section
    const newExpanded = new Set(expandedSections);
    newExpanded.add(sectionId);
    setExpandedSections(newExpanded);
    setActiveIdx(idx);
    onSectionChange?.(sectionId);

    // Scroll with a slight delay to allow accordion to start opening
    setTimeout(() => {
      const element = document.getElementById(`section-${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const renderContent = (content: LessonContent) => {
    switch (content.type) {
      case 'title':
        return (
          <h4 className="text-xl font-bold text-white mt-12 mb-6 border-l-4 border-kenya-red pl-6 tracking-tight">
            {content.content}
          </h4>
        );
      case 'text':
        return (
          <p className="text-lg md:text-xl text-[#F0EDE6]/60 leading-relaxed font-medium mb-10">
            {content.content}
          </p>
        );
      case 'bullets':
        return (
          <ul className="grid grid-cols-1 gap-4 mb-10">
            {content.content.split('\n').filter(Boolean).map((bullet, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-kenya-gold/30 transition-colors shadow-sm"
              >
                <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-kenya-green/20 flex items-center justify-center text-kenya-green border border-kenya-green/30">
                   <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-[#F0EDE6]/80 leading-relaxed">
                  {bullet.replace(/^[•*-]\s*/, '')}
                </span>
              </motion.li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <div className="relative my-14 md:my-20 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-white/[0.04] to-transparent border-l-8 border-kenya-gold overflow-hidden group shadow-2xl">
            <Quote className="absolute top-4 left-4 h-20 w-20 text-kenya-gold/10 group-hover:text-kenya-gold/20 transition-all group-hover:scale-110" />
            <blockquote className="relative z-10 text-2xl md:text-4xl font-black italic text-white/90 leading-tight tracking-tight">
              &ldquo;{content.content}&rdquo;
            </blockquote>
          </div>
        );
      case 'code':
        return (
          <div className="my-8 rounded-2xl bg-black/40 border border-white/5 p-6 overflow-x-auto no-scrollbar shadow-inner">
            <div className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
               <CodeIcon className="h-3 w-3" /> 
               Reference / Source
            </div>
            <pre className="text-sm font-mono text-[#F0EDE6]/60 leading-relaxed">
              <code>{content.content}</code>
            </pre>
          </div>
        );
      case 'image':
        return (
          <div className="my-10 group overflow-hidden rounded-[32px] border border-white/5 relative">
            <img 
              src={content.content} 
              alt="Lesson content" 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
               <div className="flex items-center gap-2 text-xs text-white/60 font-mono tracking-widest uppercase">
                  <ImageIcon className="h-4 w-4" /> 
                  Reference Image
               </div>
            </div>
          </div>
        );
      default:
        return <p className="text-base text-white/60 leading-relaxed mb-6">{content.content}</p>;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-full w-full bg-kenya-black p-4 sm:p-6 lg:p-16 overflow-y-auto no-scrollbar max-w-4xl mx-auto font-sans pb-[max(1.5rem,env(safe-area-inset-bottom))] relative"
    >
      {/* Floating Vertical Scroller */}
      {sections.length > 1 && (
        <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-2 p-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
            <button
              onClick={() => scrollToSection(activeIdx - 1)}
              disabled={activeIdx === 0}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-[#F0EDE6]/60 hover:text-kenya-red hover:bg-kenya-red/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              aria-label="Previous section"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col items-center py-2 px-1">
              <span className="text-[10px] font-bold font-mono text-kenya-gold">
                {activeIdx + 1 < 10 ? `0${activeIdx + 1}` : activeIdx + 1}
              </span>
              <div className="w-px h-6 bg-white/10 my-1" />
              <span className="text-[10px] font-bold font-mono text-[#F0EDE6]/20">
                {sections.length < 10 ? `0${sections.length}` : sections.length}
              </span>
            </div>

            <button
              onClick={() => scrollToSection(activeIdx + 1)}
              disabled={activeIdx === sections.length - 1}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-[#F0EDE6]/60 hover:text-kenya-gold hover:bg-kenya-gold/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              aria-label="Next section"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3 mb-16 text-[10px] font-bold uppercase tracking-[0.4em] text-kenya-gold">
        <BookOpen className="h-4 w-4" />
        Lesson Document
      </div>

      <div className="space-y-6">
        {sections.map((section, sIdx) => {
          const isExpanded = expandedSections.has(section.id);
          
          return (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className={cn(
                "rounded-2xl border transition-all duration-350 overflow-hidden",
                isExpanded 
                  ? "bg-white/[0.03] border-white/10 shadow-2xl shadow-black/40" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/10"
              )}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full min-h-14 flex items-center justify-between p-5 md:p-8"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className={cn(
                    "h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border-t-2 border-r-2 flex items-center justify-center text-sm font-bold transition-all duration-500 shadow-lg",
                    isExpanded 
                      ? "bg-kenya-red text-white border-kenya-red scale-110 rotate-3" 
                      : "bg-white/5 text-[#F0EDE6]/20 border-white/10"
                  )}>
                    {sIdx + 1 < 10 ? `0${sIdx + 1}` : sIdx + 1}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-kenya-red/60 mb-1">{section.label}</p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight truncate sm:whitespace-normal">{section.title}</h3>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-6 w-6 text-kenya-red" /> : <ChevronDown className="h-6 w-6 text-white/10" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: useMobileMotion ? 0.24 : 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 md:px-24 pb-16 border-t border-white/10 pt-12">
                      {section.content.map((block, bIdx) => (
                        <div
                          key={bIdx}
                          style={{ textAlign: block.align }}
                        >
                          {renderContent(block)}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      
      <div className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center text-center">
         <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center mb-4 grayscale opacity-30 mt-[-20px] bg-[#0D0D14]">
            <img src="/logo.svg" alt="BNS" className="h-4 w-auto" />
         </div>
         <p className="text-[10px] uppercase tracking-[0.4em] text-[#F0EDE6]/20">
            End of Lesson Document
         </p>
      </div>
    </div>
  );
};

export default LessonPane;