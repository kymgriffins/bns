'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Medal, 
  Award, 
  Crown,
  Zap,
  CheckCircle,
  Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AchievementBadgeProps {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'medal' | 'award' | 'crown' | 'zap';
  unlocked?: boolean;
  unlockedAt?: string;
  progress?: number;
  className?: string;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  medal: Medal,
  award: Award,
  crown: Crown,
  zap: Zap,
};

const colorSchemes = {
  trophy: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-300',
    glow: 'shadow-yellow-200',
  },
  star: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
    glow: 'shadow-blue-200',
  },
  medal: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
    glow: 'shadow-orange-200',
  },
  award: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
    glow: 'shadow-purple-200',
  },
  crown: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-300',
    glow: 'shadow-amber-200',
  },
  zap: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
    glow: 'shadow-green-200',
  },
};

export function AchievementBadge({
  id,
  title,
  description,
  icon,
  unlocked = false,
  unlockedAt,
  progress,
  className = '',
}: AchievementBadgeProps) {
  const Icon = iconMap[icon];
  const colors = colorSchemes[icon];

  // If there's progress but not yet unlocked
  const isInProgress = progress !== undefined && progress > 0 && progress < 100;

  return (
    <motion.div
      whileHover={{ scale: unlocked ? 1.02 : 1 }}
      whileTap={{ scale: unlocked ? 0.98 : 1 }}
      className={className}
    >
      <Card 
        className={`
          relative overflow-hidden transition-all
          ${unlocked 
            ? `border-2 ${colors.border} shadow-lg ${colors.glow}` 
            : 'border-border opacity-70'
          }
        `}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Icon container */}
            <div 
              className={`
                h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0
                ${unlocked ? colors.bg : 'bg-secondary'}
                ${unlocked ? '' : 'grayscale'}
              `}
            >
              {unlocked ? (
                <Icon className={`h-6 w-6 ${colors.text}`} />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold ${unlocked ? '' : 'text-muted-foreground'}`}>
                {title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
              
              {/* Progress bar for in-progress achievements */}
              {isInProgress && (
                <div className="mt-2">
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${colors.bg.replace('bg-', 'bg-')}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {progress}% complete
                  </p>
                </div>
              )}

              {/* Unlocked date */}
              {unlocked && unlockedAt && (
                <p className="text-xs text-muted-foreground mt-2">
                  Unlocked {new Date(unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Checkmark for unlocked */}
            {unlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
            )}
          </div>
        </CardContent>

        {/* Unlocked glow effect */}
        {unlocked && (
          <motion.div
            className={`absolute inset-0 ${colors.bg} opacity-20`}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </Card>
    </motion.div>
  );
}

// =============================================================================
// Achievement Grid
// =============================================================================

interface AchievementGridProps {
  achievements: AchievementBadgeProps[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export function AchievementGrid({
  achievements,
  columns = 2,
  className = '',
}: AchievementGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {achievements.map((achievement) => (
        <AchievementBadge key={achievement.id} {...achievement} />
      ))}
    </div>
  );
}

// =============================================================================
// Predefined Achievements
// =============================================================================

export const defaultAchievements: AchievementBadgeProps[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'star',
    unlocked: false,
  },
  {
    id: 'module-complete',
    title: 'Module Master',
    description: 'Complete an entire learning module',
    icon: 'trophy',
    unlocked: false,
  },
  {
    id: 'quiz-perfect',
    title: 'Perfect Score',
    description: 'Get 100% on a quiz',
    icon: 'award',
    unlocked: false,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Learn for 7 days in a row',
    icon: 'zap',
    unlocked: false,
  },
  {
    id: 'all-modules',
    title: 'Budget Expert',
    description: 'Complete all learning modules',
    icon: 'crown',
    unlocked: false,
  },
  {
    id: 'community',
    title: 'Active Learner',
    description: 'Participate in community discussions',
    icon: 'medal',
    unlocked: false,
  },
];

export default AchievementBadge;
