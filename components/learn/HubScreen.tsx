/**
 * Hub Screen Component
 * Landing page displaying all available learning modules
 * Users browse and select modules to start learning
 */

'use client';

import React, { useState, useEffect } from 'react';
import { LearningModule, UserProgress } from '@/types/learn';
import { MODULES } from '@/lib/learn-data';
import { getModuleContentCounts } from '@/lib/learn-data';
import ModuleCard from './ModuleCard';
import styles from './hub.module.css';

interface HubScreenProps {
  onModuleSelect: (moduleId: string) => void;
  userProgress?: Map<string, UserProgress>;
  isLoading?: boolean;
}

export const HubScreen: React.FC<HubScreenProps> = ({
  onModuleSelect,
  userProgress,
  isLoading = false,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'basic' | 'advanced' | 'expert'>(
    'all'
  );
  const [modules, setModules] = useState<LearningModule[]>([]);

  useEffect(() => {
    let filtered = MODULES;

    if (selectedLevel !== 'all') {
      filtered = filtered.filter((m) => m.level === selectedLevel);
    }

    setModules(filtered);
  }, [selectedLevel]);

  const levels = ['all', 'basic', 'advanced', 'expert'] as const;
  const stats = {
    total: MODULES.length,
    completed: userProgress ? Array.from(userProgress.values()).filter((p) => p.completed).length : 0,
    inProgress: userProgress ? Array.from(userProgress.values()).filter((p) => !p.completed && p.progressPercent > 0).length : 0,
  };

  return (
    <div className={styles['hub-container']}>
      {/* Hero Section */}
      <section className={styles['hero']}>
        <div className={styles['hero-content']}>
          <h1>Learn About Kenya's Budget & Civic Issues</h1>
          <p>
            Master budget literacy, understand devolution, and engage in civic participation.
            Choose your learning journey and start today.
          </p>

          {/* Progress stats */}
          <div className={styles['stats-bar']}>
            <div className={styles['stat']}>
              <span className={styles['stat-num']}>{stats.total}</span>
              <span className={styles['stat-label']}>Modules</span>
            </div>
            <div className={styles['stat']}>
              <span className={styles['stat-num']}>{stats.completed}</span>
              <span className={styles['stat-label']}>Completed</span>
            </div>
            <div className={styles['stat']}>
              <span className={styles['stat-num']}>{stats.inProgress}</span>
              <span className={styles['stat-label']}>In Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles['filters']}>
        <div className={styles['filter-group']}>
          <label htmlFor="level-filter">Filter by Level:</label>
          <div className={styles['filter-buttons']}>
            {levels.map((level) => (
              <button
                key={level}
                className={`${styles['filter-btn']} ${selectedLevel === level ? styles['active'] : ''}`}
                onClick={() => setSelectedLevel(level)}
              >
                {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Module Cards Grid */}
      <section className={styles['modules-grid']}>
        {isLoading ? (
          <div className={styles['loading']}>
            <div className={styles['spinner']} />
            <p>Loading modules...</p>
          </div>
        ) : modules.length > 0 ? (
          modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={userProgress?.get(module.id)}
              onClick={() => onModuleSelect(module.id)}
              contentCounts={getModuleContentCounts(module.id)}
            />
          ))
        ) : (
          <div className={styles['no-modules']}>
            <p>No modules available for this level.</p>
            <button onClick={() => setSelectedLevel('all')}>View All Modules</button>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className={styles['info-section']}>
        <h2>How It Works</h2>
        <div className={styles['info-cards']}>
          <div className={styles['info-card']}>
            <span className={styles['info-num']}>1</span>
            <h3>Choose a Module</h3>
            <p>Select a learning module that interests you. Each has curated content on specific topics.</p>
          </div>
          <div className={styles['info-card']}>
            <span className={styles['info-num']}>2</span>
            <h3>Follow the Path</h3>
            <p>
              Progress through Stories (visual slides), Lessons (in-depth reading), Videos (visual
              learning), and Quizzes (test your knowledge).
            </p>
          </div>
          <div className={styles['info-card']}>
            <span className={styles['info-num']}>3</span>
            <h3>Track Progress</h3>
            <p>Your progress is saved automatically. Complete content and earn certificates.</p>
          </div>
          <div className={styles['info-card']}>
            <span className={styles['info-num']}>4</span>
            <h3>Take Action</h3>
            <p>Apply what you learn to engage in civic participation and budget discussions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HubScreen;
