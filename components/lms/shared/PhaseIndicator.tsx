'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';
import type { Phase } from '../types';

interface PhaseIndicatorProps {
  currentPhase: Phase;
  phases: Array<{
    number: Phase;
    label: string;
    icon: string;
  }>;
  onPhaseChange: (phase: Phase) => void;
}

export function PhaseIndicator({
  currentPhase,
  phases,
  onPhaseChange,
}: PhaseIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {phases.map((phase, index) => {
        const isActive = currentPhase === phase.number;
        const isCompleted = currentPhase > phase.number;

        return (
          <React.Fragment key={phase.number}>
            {/* Phase button */}
            <button
              onClick={() => onPhaseChange(phase.number)}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-full transition-all
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : isCompleted 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                }
              `}
            >
              {/* Icon or check mark */}
              {isCompleted ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <span className="text-sm">{phase.icon}</span>
              )}
              
              {/* Label */}
              <span className="text-sm font-medium">{phase.label}</span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="phase-indicator"
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>

            {/* Connector line */}
            {index < phases.length - 1 && (
              <div className={`h-0.5 w-8 ${
                isCompleted ? 'bg-green-500' : 'bg-secondary'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default PhaseIndicator;
