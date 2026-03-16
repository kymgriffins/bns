'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ClickRevealProps {
  revealType: 'text' | 'image' | 'video' | 'interactive';
  content: React.ReactNode;
  hint?: string;
  onReveal?: () => void;
  revealAnimation?: 'fade' | 'slide' | 'scale' | 'flip';
  initiallyRevealed?: boolean;
  className?: string;
}

export function ClickReveal({
  revealType,
  content,
  hint = 'Click to reveal',
  onReveal,
  revealAnimation = 'fade',
  initiallyRevealed = false,
  className = '',
}: ClickRevealProps) {
  const [isRevealed, setIsRevealed] = useState(initiallyRevealed);

  const handleReveal = () => {
    if (!isRevealed) {
      onReveal?.();
    }
    setIsRevealed(!isRevealed);
  };

  // Animation variants
  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
    flip: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
      exit: { opacity: 0, rotateX: 90 },
    },
  };

  const variant = animationVariants[revealAnimation];

  // Preview content based on type
  const renderPreview = () => {
    switch (revealType) {
      case 'text':
        return (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{hint}</span>
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center justify-center h-32 bg-secondary/50 rounded-lg">
            <Eye className="h-8 w-8 text-muted-foreground" />
          </div>
        );
      case 'video':
        return (
          <div className="flex items-center justify-center h-32 bg-secondary/50 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Eye className="h-6 w-6 text-primary" />
            </div>
          </div>
        );
      case 'interactive':
        return (
          <div className="flex items-center justify-center h-32 bg-primary/5 border-2 border-dashed border-primary/30 rounded-lg">
            <span className="text-primary font-medium">{hint}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Preview state */}
      <AnimatePresence mode="wait">
        {!isRevealed && (
          <motion.div
            key="preview"
            initial="initial"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
              onClick={handleReveal}
            >
              {renderPreview()}
              <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed state */}
      <AnimatePresence mode="wait">
        {isRevealed && (
          <motion.div
            key="content"
            initial={variant.initial}
            animate={variant.animate}
            exit={variant.exit}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            {/* Content */}
            <div className="mb-3">
              {content}
            </div>

            {/* Hide button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReveal}
              className="w-full"
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Hide content
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// =============================================================================
// Accordion-style Click Reveal (Multiple items)
// =============================================================================

interface AccordionRevealProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
  allowMultiple?: boolean;
  className?: string;
}

export function AccordionReveal({
  items,
  allowMultiple = false,
  className = '',
}: AccordionRevealProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map(item => (
        <Card key={item.id}>
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto"
            onClick={() => toggleItem(item.id)}
          >
            <span className="font-medium text-left">{item.title}</span>
            <motion.div
              animate={{ rotate: openItems.has(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
          
          <AnimatePresence>
            {openItems.has(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 pb-4">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}

export default ClickReveal;
