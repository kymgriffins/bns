/**
 * Module Card Component
 * Displays a single learning module card with stats and progress
 * Shows content type badges, progress bar, and CTA button
 */

'use client';

import React from 'react';
import { LearningModule, UserProgress } from '@/types/learn';
import styles from './module-card.module.css';

interface ModuleCardProps {
  module: LearningModule;
  progress?: UserProgress;
  contentCounts?: {
    stories: number;
    videos: number;
    lessons: number;
    quiz: number;
  };
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  progress,
  contentCounts,
  onClick,
}) => {
  const progressPercent = progress?.progressPercent || 0;
  const isCompleted = progress?.completed || false;

  const levelColors: Record<string, { bg: string; text: string }> = {
    basic: { bg: '#EFF6FF', text: '#0369A1' },
    advanced: { bg: '#FEF3C7', text: '#92400E' },
    expert: { bg: '#FEE2E2', text: '#991B1B' },
  };

  const levelColor = levelColors[module.level];

  return (
    <div
      className={`${styles['card']} ${isCompleted ? styles['completed'] : ''}`}
      style={{
        borderLeftColor: module.accentA,
      }}
    >
      {/* Top color bar */}
      <div
        className={styles['color-bar']}
        style={{
          background: `linear-gradient(to right, ${module.catColor}, ${module.accentA})`,
        }}
      />

      {/* Card header */}
      <div className={styles['card-header']}>
        <div className={styles['title-section']}>
          <h3 className={styles['title']}>{module.title}</h3>
          <p className={styles['description']}>{module.desc}</p>
        </div>

        {/* Completion badge */}
        {isCompleted && (
          <div className={styles['completed-badge']}>
            <span>✓ Completed</span>
          </div>
        )}
      </div>

      {/* Stats section */}
      <div className={styles['stats']}>
        <div className={styles['stat']}>
          <span className={styles['icon']}>📖</span>
          <span className={styles['value']}>{module.slidesCount}</span>
          <span className={styles['label']}>Stories</span>
        </div>
        <div className={styles['stat']}>
          <span className={styles['icon']}>📚</span>
          <span className={styles['value']}>{module.lessonsCount}</span>
          <span className={styles['label']}>Lessons</span>
        </div>
        <div className={styles['stat']}>
          <span className={styles['icon']}>▶️</span>
          <span className={styles['value']}>{module.videosCount}</span>
          <span className={styles['label']}>Videos</span>
        </div>
        <div className={styles['stat']}>
          <span className={styles['icon']}>❓</span>
          <span className={styles['value']}>{module.quizCount}</span>
          <span className={styles['label']}>Quiz Qs</span>
        </div>
      </div>

      {/* Metadata */}
      <div className={styles['metadata']}>
        <div className={styles['meta-item']}>
          <span className={styles['label']}>Teacher:</span>
          <span className={styles['value']}>
            {module.teacher.avatar} {module.teacher.name}
          </span>
        </div>
        <div className={styles['meta-item']}>
          <span className={styles['label']}>Duration:</span>
          <span className={styles['value']}>{module.duration}</span>
        </div>
        <div className={styles['meta-item']}>
          <span
            className={styles['level-badge']}
            style={{\n            backgroundColor: levelColor.bg,
              color: levelColor.text,
            }}\n          >\n            {module.level.toUpperCase()}\n          </span>\n        </div>\n      </div>\n\n      {/* Progress bar */}\n      {progress && (\n        <div className={styles['progress-section']}>\n          <div className={styles['progress-label']}>\n            <span>Progress</span>\n            <span className={styles['percent']}>{Math.round(progressPercent)}%</span>\n          </div>\n          <div className={styles['progress-bar']}>\n            <div\n              className={styles['progress-fill']}\n              style={{\n                width: `${progressPercent}%`,\n                backgroundColor: module.accentA,\n              }}\n            />\n          </div>\n        </div>\n      )}\n\n      {/* CTA Button */}\n      <button className={styles['start-btn']} onClick={onClick}>\n        {progress && progress.progressPercent > 0 ? 'Continue Learning' : 'Start Learning'}\n        <span className={styles['arrow']}>→</span>\n      </button>\n    </div>\n  );\n};\n\nexport default ModuleCard;\n