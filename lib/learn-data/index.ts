/**
 * Learn Data Barrel Export
 * Centralized data access point for the learning platform
 * Consolidates all modules, stories, videos, lessons, and quizzes
 */

export {
  MODULES,
  getModuleById,
  getModuleByNum,
  getModulesByLevel,
  getModulesByCategory,
} from './modules';

export {
  STORIES_002,
  STORY_QUIZ_002,
  getStorySlide,
  getStoryQuizQuestion,
} from './stories';

export {
  VIDEOS_001,
  VIDEOS_002,
  VIDEOS_003,
  ALL_VIDEOS,
  getVideosByModuleId,
  getVideoById,
} from './videos';

export {
  QUIZ_001,
  QUIZ_002,
  QUIZ_003,
  getQuizByModuleId,
  getQuizQuestion,
  getQuestionCount,
} from './quiz';

export {
  LESSON_SECTIONS_001,
  LESSON_SECTIONS_002,
  LESSON_SECTIONS_003,
  getLessonsByModuleId,
  getLessonSection,
  getSectionCount,
} from './lessons';

// ============================================================================
// UNIFIED DATA ACCESS
// ============================================================================

import type { LearningModule, StorySlide, VideoItem, QuizQuestion, LessonSection } from '@/types/learn';
import {
  MODULES,
  getModuleById,
  getModuleByNum,
  getModulesByLevel,
  getModulesByCategory,
} from './modules';
import {
  STORIES_002,
  STORY_QUIZ_002,
  getStorySlide,
  getStoryQuizQuestion,
} from './stories';
import {
  VIDEOS_001,
  VIDEOS_002,
  VIDEOS_003,
  ALL_VIDEOS,
  getVideosByModuleId,
  getVideoById,
} from './videos';
import {
  QUIZ_001,
  QUIZ_002,
  QUIZ_003,
  getQuizByModuleId,
  getQuizQuestion,
  getQuestionCount,
} from './quiz';
import {
  LESSON_SECTIONS_001,
  LESSON_SECTIONS_002,
  LESSON_SECTIONS_003,
  getLessonsByModuleId,
  getLessonSection,
  getSectionCount,
} from './lessons';

/**
 * Get complete module data including all content
 */
export const getModuleData = (moduleId: string) => {
  const module = getModuleById(moduleId);
  if (!module) return null;

  // In a real CRUD app, these would come from a database or a mapping file
  // For now, we still use the constants but mapped by ID
  const storiesMap: Record<string, any[]> = {
    'bps-basic': STORIES_002, // Reusing STORIES_002 as placeholder if others don't exist, or just use empty if no data
    'bps-advanced': STORIES_002,
    'budget-county': STORIES_002, // Placeholder for now to avoid "No stories" message during testing
  };

  return {
    module,
    stories: storiesMap[moduleId] || [],
    videos: getVideosByModuleId(moduleId),
    lessons: getLessonsByModuleId(moduleId),
    quiz: getQuizByModuleId(moduleId),
  };
};

/**
 * Get all content for the hub (browsable catalog)
 */
export const getAllModulesData = () => {
  return {
    modules: MODULES,
    modulesCount: MODULES.length,
    totalStories: 1, // Currently only STORIES_002
    totalVideos: ALL_VIDEOS.length,
    totalLessons: LESSON_SECTIONS_001.length + LESSON_SECTIONS_002.length + LESSON_SECTIONS_003.length,
    totalQuestions: QUIZ_001.length + QUIZ_002.length + QUIZ_003.length,
  };
};

/**
 * Search across all content
 */
export const searchContent = (query: string) => {
  const q = query.toLowerCase();
  const results = {
    modules: MODULES.filter(
      (m) => m.title.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q)
    ),
    videos: ALL_VIDEOS.filter(
      (v) => v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q)
    ),
    lessons: [],
    questions: [],
  };

  return results;
};

/**
 * Get content statistics
 */
export const getContentStats = () => {
  return {
    modules: MODULES.length,
    stories: 1,
    videos: ALL_VIDEOS.length,
    lessons: getSectionCount('bps-advanced'),
    quizzes: QUIZ_002.length,
    totalContent: ALL_VIDEOS.length + 1 + 1 + QUIZ_002.length,
  };
};

/**
 * Validate module exists
 */
export const moduleExists = (moduleId: string): boolean => {
  return getModuleById(moduleId) !== undefined;
};

/**
 * Get module content counts
 */
export const getModuleContentCounts = (moduleId: string) => {
  const module = getModuleById(moduleId);
  if (!module)
    return {
      stories: 0,
      videos: 0,
      lessons: 0,
      quiz: 0,
    };

  return {
    stories: module.slidesCount,
    videos: module.videosCount,
    lessons: getSectionCount(moduleId),
    quiz: getQuestionCount(moduleId),
  };
};
