"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Quote, 
  Image as ImageIcon, 
  Code as CodeIcon,
  AlignLeft,
  List
} from 'lucide-react';
import { LessonSection, LessonContent } from '@/types/learn';
import { cn } from '@/lib/utils';

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

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
    onSectionChange?.(sectionId);
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
          <p className="text-lg text-[#F0EDE6]/50 leading-relaxed font-medium mb-8">
            {content.content}
          </p>
        );
      case 'bullets':
        return (
          <ul className="space-y-4 mb-8">
            {content.content.split('\n').filter(Boolean).map((bullet, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-4 p-6 rounded-none bg-white/[0.02] border border-white/10"
              >
                <div className="mt-1 h-5 w-5 shrink-0 rounded-none bg-kenya-green/20 flex items-center justify-center text-kenya-green">
                   <List className="h-3 w-3" />
                </div>
                <span className="text-sm font-medium text-[#F0EDE6]/60 leading-relaxed">
                  {bullet.replace(/^[•*-]\s*/, '')}
                </span>
              </motion.li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <div className="relative my-16 p-10 rounded-none bg-white/[0.02] border-l-4 border-kenya-gold overflow-hidden group">
            <Quote className="absolute top-4 left-4 h-16 w-16 text-kenya-gold/5 group-hover:text-kenya-gold/10 transition-colors" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-bold italic text-white/80 leading-tight tracking-tight">
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
    <div className="h-full w-full bg-kenya-black p-6 lg:p-16 overflow-y-auto no-scrollbar max-w-4xl mx-auto font-sans">
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
              className={cn(
                "rounded-none border transition-all duration-350 overflow-hidden",
                isExpanded 
                  ? "bg-white/[0.03] border-white/15" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/10"
              )}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 md:p-8"
              >
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "h-12 w-12 rounded-none border-t-2 border-r-2 flex items-center justify-center text-xs font-bold transition-colors",
                    isExpanded 
                      ? "bg-kenya-red text-white border-kenya-red" 
                      : "bg-white/5 text-[#F0EDE6]/20 border-white/10"
                  )}>
                    {sIdx + 1 < 10 ? `0${sIdx + 1}` : sIdx + 1}
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#F0EDE6]/20 mb-1">{section.label}</p>
                    <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight">{section.title}</h3>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-kenya-red" /> : <ChevronDown className="h-5 w-5 text-white/10" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
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