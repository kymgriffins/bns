/**
 * Module Screen Component
 * Main learning interface for a selected module
 * Manages tab switching between Stories, Learn, Videos, Quiz
 * Integrates with progress tracking
 */

'use client';

import React, { useState, useEffect } from 'react';
import { LearningModule, UserProgress, ContentType } from '@/types/learn';
import { getModuleData } from '@/lib/learn-data';
import StoryViewer from './content/StoryViewer';
import LessonPane from './content/LessonPane';
import VideoPlayer from './content/VideoPlayer';
import QuizPane from './content/QuizPane';
import TabBar from './TabBar';
import ModuleSidebar from './ModuleSidebar';
import styles from './module-screen.module.css';

interface ModuleScreenProps {
  module: LearningModule;
  progress?: UserProgress;
  onBack: () => void;
  onProgressUpdate?: (progress: UserProgress) => void;
}

export const ModuleScreen: React.FC<ModuleScreenProps> = ({
  module,
  progress,
  onBack,
  onProgressUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<ContentType>('stories');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [moduleData, setModuleData] = useState<ReturnType<typeof getModuleData> | null>(null);
  const [activeSection, setActiveSection] = useState<string>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Load module data
    const data = getModuleData(module.id);
    setModuleData(data);
    setLoading(false);

    // Restore scroll position if available
    if (activeSection && activeSection.length > 0) {
      setTimeout(() => {
        const element = document.getElementById(`section-${activeSection}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [module.id, activeSection]);

  const handleStoryChange = (idx: number) => {
    setCurrentSlide(idx);
    if (onProgressUpdate) {
      const updated = {
        ...progress,
        currentSlide: idx,
        completedSlides: [...new Set([...(progress?.completedSlides || []), idx])],
      } as UserProgress;
      onProgressUpdate(updated);
    }
  };

  const handleQuizAnswer = (questionIdx: number, answer: number) => {
    if (onProgressUpdate) {
      const updated = {
        ...progress,
        quizAnswers: [...(progress?.quizAnswers || []), { questionIdx, selected: answer }],
      } as UserProgress;
      onProgressUpdate(updated);
    }
  };

  const handleVideoWatched = (videoId: string, percentage: number) => {
    if (onProgressUpdate) {
      const watchedVideos = [...(progress?.watchedVideos || [])];
      const idx = watchedVideos.findIndex((v) => v.videoId === videoId);
      if (idx >= 0) {
        watchedVideos[idx].percentage = Math.max(watchedVideos[idx].percentage, percentage);
      } else {
        watchedVideos.push({ videoId, percentage });
      }

      const updated = {
        ...progress,
        watchedVideos,
      } as UserProgress;
      onProgressUpdate(updated);
    }
  };

  if (loading) {
    return (
      <div className={styles['loading']}>
        <div className={styles['spinner']} />
        <p>Loading module content...</p>
      </div>
    );
  }

  return (
    <div className={styles['module-screen']}>
      {/* Header with back button */}
      <header className={styles['module-header']}>
        <button className={styles['back-btn']} onClick={onBack}>
          ← Back to Modules
        </button>
        <div className={styles['module-title-section']}>
          <h2>{module.title}</h2>
          <p
            className={styles['subtitle']}\n          style={{ color: module.catColor }}\n        >\n          {module.category} • {module.duration}\n        </p>\n      </div>\n      <button\n        className={styles['sidebar-toggle']}\n        onClick={() => setSidebarOpen(!sidebarOpen)}\n        aria-label=\"Toggle sidebar\"\n      >\n        {sidebarOpen ? '▶' : '◀'}\n      </button>\n    </header>\n\n    {/* Tab bar */}\n    <TabBar\n      activeTab={activeTab}\n      onTabChange={setActiveTab}\n      module={module}\n    />\n\n    {/* Main content area */}\n    <div className={styles['content-wrapper']}>\n      {/* Sidebar */}\n      {sidebarOpen && (\n        <ModuleSidebar\n          module={module}\n          progress={progress}\n          activeTab={activeTab}\n          onTabChange={setActiveTab}\n          activeSection={activeSection}\n          onSectionScroll={setActiveSection}\n        />\n      )}\n\n      {/* Content pane */}\n      <main className={styles['content-pane']}>\n        {activeTab === 'stories' && moduleData?.stories && (\n          <StoryViewer\n            slides={moduleData.stories}\n            currentSlideIdx={currentSlide}\n            onSlideChange={handleStoryChange}\n            onQuizAnswer={handleQuizAnswer}\n          />\n        )}\n\n        {activeTab === 'learn' && moduleData?.lessons && (\n          <LessonPane\n            sections={moduleData.lessons}\n            activeSection={activeSection}\n            onSectionChange={setActiveSection}\n          />\n        )}\n\n        {activeTab === 'videos' && moduleData?.videos && (\n          <VideoPlayer\n            videos={moduleData.videos}\n            progress={progress}\n            onVideoWatched={handleVideoWatched}\n          />\n        )}\n\n        {activeTab === 'quiz' && moduleData?.quiz && (\n          <QuizPane\n            questions={moduleData.quiz}\n            progress={progress}\n            onAnswerSubmit={handleQuizAnswer}\n          />\n        )}\n      </main>\n    </div>\n  </div>\n);\n};\n\nexport default ModuleScreen;\n