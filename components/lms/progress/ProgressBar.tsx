'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning';
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  showLabel = true,
  label,
  size = 'md',
  variant = 'default',
  animated = true,
  className = '',
}: ProgressBarProps) {
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colors = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{label || 'Progress'}</span>
          <span className="font-medium">{Math.round(value)}%</span>
        </div>
      )}
      <div className={`w-full bg-secondary rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          className={`h-full ${colors[variant]} rounded-full`}
          initial={animated ? { width: 0 } : { width: `${value}%` }}
          animate={{ width: `${value}%` }}
          transition={{ 
            duration: 0.5, 
            ease: 'easeOut',
          }}
        />
      </div>
    </div>
  );
}

// =============================================================================
// Phase Progress Component
// =============================================================================

interface PhaseProgressProps {
  phases: Array<{
    number: number;
    label: string;
    icon: string;
    progress: number;
    isComplete: boolean;
  }>;
  currentPhase: number;
  className?: string;
}

export function PhaseProgress({
  phases,
  currentPhase,
  className = '',
}: PhaseProgressProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {phases.map((phase, index) => {
        const isActive = currentPhase === phase.number;
        const isPast = currentPhase > phase.number;

        return (
          <div
            key={phase.number}
            className={`
              flex items-center gap-3 p-3 rounded-lg transition-colors
              ${isActive ? 'bg-primary/10' : isPast ? 'bg-green-50' : 'bg-secondary/30'}
            `}
          >
            {/* Icon */}
            <div 
              className={`
                h-8 w-8 rounded-full flex items-center justify-center text-sm
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : isPast 
                    ? 'bg-green-500 text-white'
                    : 'bg-secondary'
                }
              `}
            >
              {phase.isComplete ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <span>{phase.icon}</span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className={`font-medium ${isActive ? 'text-primary' : ''}`}>
                  {phase.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {phase.isComplete ? 'Complete' : `${Math.round(phase.progress)}%`}
                </span>
              </div>
              <Progress 
                value={phase.progress} 
                className="h-1" 
                variant={phase.isComplete ? 'success' : 'default'}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// Milestone Progress
// =============================================================================

interface MilestoneProgressProps {
  current: number;
  total: number;
  milestones?: Array<{ at: number; label: string }>;
  className?: string;
}

export function MilestoneProgress({
  current,
  total,
  milestones = [
    { at: 25, label: 'Getting Started' },
    { at: 50, label: 'Halfway There' },
    { at: 75, label: 'Almost Done' },
    { at: 100, label: 'Complete!' },
  ],
  className = '',
}: MilestoneProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      <ProgressBar value={progress} label="" />
      
      {/* Milestone markers */}
      <div className="relative">
        <div className="flex justify-between">
          {milestones.map((milestone, idx) => {
            const isReached = progress >= milestone.at;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center ${
                  isReached ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Trophy className={`h-4 w-4 ${isReached ? 'opacity-100' : 'opacity-30'}`} />
                <span className="text-xs mt-1">{milestone.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
