/**
 * Learning Modules Data
 * Central repository of all learning modules
 */

import type { LearningModule } from '@/types/learn';

export const MODULES: LearningModule[] = [
  {
    id: 'bps-basic',
    num: '001',
    title: 'The Budget Policy Statement 2026',
    level: 'basic',
    credits: 'Budget Ndio Story Team',
    desc: 'Understand how Kenya\'s budget roadmap works and exactly where you fit in. No jargon. Plain language.',
    duration: '10 min',
    slidesCount: 12,
    lessonsCount: 5,
    videosCount: 3,
    quizCount: 4,
    category: 'Budget Basics',
    catColor: '#38B2AC',
    catBg: 'rgba(56, 178, 172, 0.12)',
    accentA: '#E53E3E',
    accentB: '#F5C842',
    teacher: {
      name: 'Wanjiru Kamau',
      role: 'Budget Literacy Educator',
      avatar: '👩🏾‍💼',
    },
    types: ['stories', 'learn', 'videos', 'quiz'],
  },

  {
    id: 'bps-advanced',
    num: '002',
    title: 'Reflecting on Kenya\'s 2026 Budget Policy Statement',
    level: 'advanced',
    credits: 'Millicent Makini',
    desc: 'Decode the budget\'s secret, master the 5 BETA Agenda pillars, track the trillion-shilling debt, and understand fiscal risks.',
    duration: '25 min',
    slidesCount: 12,
    lessonsCount: 8,
    videosCount: 5,
    quizCount: 15,
    category: 'Advanced',
    catColor: '#9F7AEA',
    catBg: 'rgba(159, 122, 234, 0.12)',
    accentA: '#9F7AEA',
    accentB: '#F06060',
    teacher: {
      name: 'Millicent Makini',
      role: 'Budget & Policy Analyst',
      avatar: '👩🏾‍💻',
    },
    types: ['stories', 'learn', 'videos', 'quiz'],
  },

  {
    id: 'budget-county',
    num: '003',
    title: 'County Government Budgets',
    level: 'intermediate',
    credits: 'Development Partners',
    desc: 'How county governments plan and execute their budgets. Understanding devolution and fiscal transfers.',
    duration: '15 min',
    slidesCount: 10,
    lessonsCount: 6,
    videosCount: 4,
    quizCount: 8,
    category: 'Intermediate',
    catColor: '#F5C842',
    catBg: 'rgba(245, 200, 66, 0.12)',
    accentA: '#F5C842',
    accentB: '#38B2AC',
    teacher: {
      name: 'James Kipchoge',
      role: 'County Budget Specialist',
      avatar: '👨🏾‍💼',
    },
    types: ['stories', 'learn', 'videos', 'quiz'],
  },
];

export const getModuleById = (id: string): LearningModule | undefined => {
  return MODULES.find((m) => m.id === id);
};

export const getModuleByNum = (num: string): LearningModule | undefined => {
  return MODULES.find((m) => m.num === num);
};

export const getModulesByLevel = (level: string): LearningModule[] => {
  return MODULES.filter((m) => m.level === level);
};

export const getModulesByCategory = (category: string): LearningModule[] => {
  return MODULES.filter((m) => m.category === category);
};
