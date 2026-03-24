'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQItemRowProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemRow({ item, index, isOpen, onToggle }: FAQItemRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className={cn(
        'border-b border-border/60 last:border-0',
        isOpen && 'border-border/80'
      )}
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-start gap-5 py-6 text-left"
        aria-expanded={isOpen}
      >
        {/* Animated number */}
        <span className="mt-0.5 shrink-0 text-[11px] font-semibold tabular-nums tracking-[0.18em] text-muted-foreground/60 transition-colors duration-200 group-hover:text-primary">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span className="flex-1 text-sm font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary md:text-base">
          {item.question}
        </span>

        {/* Plus → X icon */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
            isOpen
              ? 'border-primary/40 bg-primary/10 text-primary'
              : 'border-border bg-background text-muted-foreground group-hover:border-primary/30 group-hover:text-primary'
          )}
          aria-hidden
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      {/* Answer with smooth height animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pl-9 text-sm leading-relaxed text-muted-foreground md:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AnimatedFAQProps {
  items: FAQItem[];
  /** Allow multiple open at once */
  allowMultiple?: boolean;
  className?: string;
}

export function AnimatedFAQ({ items, allowMultiple = false, className }: AnimatedFAQProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className={cn('divide-y-0', className)}>
      {items.map((item, i) => (
        <FAQItemRow
          key={i}
          item={item}
          index={i}
          isOpen={openIndexes.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
