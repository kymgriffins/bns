"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Play,
  BookOpen,
  Video,
  Lightbulb,
  Menu,
  X,
  Clock,
  CheckCircle2,
  Sparkles,
  Hash
} from 'lucide-react';
import { LearningModule, UserProgress, ContentType } from '@/types/learn';
import { getModuleData } from '@/lib/learn-data';
import StoryViewer from './content/StoryViewer';
import LessonPane from './content/LessonPane';
import VideoPlayer from './content/VideoPlayer';
import QuizPane from './content/QuizPane';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  const [activeTab, setActiveTab] = useState<ContentType>('learn');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [moduleData, setModuleData] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined);

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
  }, []);

  const handleSidebarSectionClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section in lesson pane
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close sidebar on mobile
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }, []);

  useEffect(() => {
    // Load module data
    const data = getModuleData(module.id);
    setModuleData(data);
    setLoading(false);
  }, [module.id]);

  const tabs: { id: ContentType; label: string; icon: any; color: string }[] = [
    { id: 'learn', label: 'Lesson', icon: BookOpen, color: '#F5C842' },
    { id: 'stories', label: 'Stories', icon: Play, color: '#BB0631' },
    { id: 'videos', label: 'Videos', icon: Video, color: '#006400' },
    { id: 'quiz', label: 'Quiz', icon: Lightbulb, color: '#A0AEC0' },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-kenya-black text-[#F0EDE6]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-[#F5C842] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono uppercase tracking-widest opacity-50">Loading Module...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-kenya-black text-[#F0EDE6] overflow-hidden font-sans">
      {/* Top Navigation - Fixed */}
      <nav className="fixed top-0 left-0 right-0 h-16 sm:h-20 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-white/5 bg-[#0D0D14]/90 backdrop-blur-2xl z-[100]">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <button
            onClick={onBack}
            className="group flex items-center justify-center p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-[#F0EDE6]/60 hover:text-white hover:bg-kenya-red/10 hover:border-kenya-red/30 transition-all shadow-sm shrink-0"
          >
            <ArrowLeft className="h-4 w-4 sm:h-3.5 sm:w-3.5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden md:inline ml-2">Return to Hub</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block shrink-0" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2 whitespace-nowrap overflow-hidden">
            <span className="text-[10px] font-mono text-[#F0EDE6]/30 uppercase tracking-tighter sm:tracking-normal">Module {module.num}</span>
            <span className="hidden sm:inline text-white/10">/</span>
            <span className="text-xs sm:text-sm font-bold truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none">{module.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Progress Indicator - Unified Design */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white/10">
            <div className="w-12 xs:w-16 sm:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-kenya-red via-kenya-gold to-kenya-green transition-all duration-1000"
                style={{ width: `${progress?.progressPercent || 0}%` }}
              />
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold font-mono text-[#F0EDE6]/80">{progress?.progressPercent || 0}%</span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center p-2 hover:bg-white/5 rounded-full transition-colors text-[#F0EDE6]/60 bg-white/5 lg:bg-transparent"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16 sm:h-20 flex-shrink-0" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar overlay for mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="flex flex-col flex-shrink-0 bg-[#0D0D14]/95 backdrop-blur-2xl fixed top-0 left-0 z-[90] h-[100dvh] rounded-r-3xl lg:rounded-none shadow-2xl lg:shadow-[1px_0_0_rgba(255,255,255,0.04)]"
              style={{ width: '300px' }}
            >
              {/* Sidebar top spacer for desktop (under fixed nav) */}
              <div className="hidden lg:block h-20 flex-shrink-0" />

              <div className="p-6 border-b border-white/[0.06] flex-shrink-0">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center grayscale opacity-50">
                    <img src="/logo.svg" alt="BNS" className="h-4 w-auto" />
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-[#F0EDE6]/40 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <Badge className="mb-4 bg-white/10 text-kenya-gold border-none rounded-full px-3 py-0.5 text-[10px] uppercase font-bold tracking-[0.2em]">
                  {module.level} · {module.category}
                </Badge>
                <h3 className="font-bold text-2xl leading-tight mb-3 tracking-tight text-white">{module.title}</h3>
                <p className="text-xs text-[#F0EDE6]/50 mb-6 line-clamp-3 leading-relaxed font-medium">{module.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0EDE6]/30 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5">
                  <Clock className="h-3.5 w-3.5 text-kenya-red" />
                  {module.duration} total
                </div>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-4 px-4 no-scrollbar">
                <div className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#F0EDE6]/20">Module Content</div>
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const isAvailable = module.types.includes(tab.id);
                    if (!isAvailable) return null;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 border-l-4",
                          isActive
                            ? "bg-gradient-to-r from-kenya-red/20 to-transparent text-white border-kenya-red shadow-lg shadow-kenya-red/5"
                            : "text-[#F0EDE6]/40 border-transparent hover:bg-white/[0.03] hover:text-[#F0EDE6]"
                        )}
                      >
                        <tab.icon className={cn("h-5 w-5 transition-transform", isActive ? "text-kenya-red scale-110" : "text-[#F0EDE6]/20")} />
                        <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
                        {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                      </button>
                    );
                  })}
                </div>

                {/* Section-level navigation for Lessons */}
                {activeTab === 'learn' && moduleData?.lessons && moduleData.lessons.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/[0.06]">
                    <div className="px-4 mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#F0EDE6]/20">Sections</div>
                    <div className="space-y-1">
                      {moduleData.lessons.map((section: any, idx: number) => {
                        const isSectionActive = activeSection === section.id;
                        return (
                          <button
                            key={section.id}
                            onClick={() => handleSidebarSectionClick(section.id)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                              isSectionActive
                                ? "bg-kenya-gold/10 text-kenya-gold"
                                : "text-[#F0EDE6]/30 hover:bg-white/[0.03] hover:text-[#F0EDE6]/60"
                            )}
                          >
                            <div className={cn(
                              "h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors",
                              isSectionActive
                                ? "bg-kenya-gold/20 text-kenya-gold"
                                : "bg-white/5 text-[#F0EDE6]/20 group-hover:bg-white/10"
                            )}>
                              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </div>
                            <span className="text-[11px] font-semibold truncate">{section.title}</span>
                            {isSectionActive && (
                              <Hash className="ml-auto h-3 w-3 opacity-50 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex-shrink-0 border-t border-white/[0.06] bg-white/[0.01]">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xl shadow-inner border border-white/10">
                    {module.teacher.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{module.teacher.name}</p>
                    <p className="text-[10px] text-[#F0EDE6]/30 uppercase tracking-widest truncate">{module.teacher.role}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Pane */}
        <main className={cn("flex-1 flex flex-col min-w-0 bg-[#0D0D14] overflow-hidden relative transition-[margin] duration-300", sidebarOpen && "lg:ml-[300px]")}>
          {/* Mobile/Tablet Tab Bar - Refined */}
          <div className="lg:hidden flex border-b border-white/[0.06] bg-[#13131F] overflow-x-auto no-scrollbar sticky top-0 z-50">
            {tabs.map((tab) => {
              if (!module.types.includes(tab.id)) return null;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center gap-1.5 py-4 px-6 min-h-[72px] min-w-[90px] transition-all border-b-2",
                    isActive
                      ? "text-kenya-gold border-kenya-gold bg-white/[0.03]"
                      : "text-[#F0EDE6]/30 border-transparent hover:text-[#F0EDE6]/60"
                  )}
                >
                  <tab.icon className={cn("h-5 w-5", isActive ? "text-kenya-gold" : "opacity-40")} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth no-scrollbar pb-[env(safe-area-inset-bottom)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full min-h-full"
              >
                {activeTab === 'stories' && moduleData?.stories && (
                  <StoryViewer
                    slides={moduleData.stories}
                    currentSlideIdx={currentSlide}
                    onSlideChange={setCurrentSlide}
                  />
                )}

                {activeTab === 'learn' && moduleData?.lessons && (
                  <LessonPane
                    sections={moduleData.lessons}
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                  />
                )}

                {activeTab === 'videos' && moduleData?.videos && (
                  <VideoPlayer
                    videos={moduleData.videos}
                    progress={progress || null}
                  />
                )}

                {activeTab === 'quiz' && moduleData?.quiz && (
                  <QuizPane
                    questions={moduleData.quiz}
                    progress={progress || null}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModuleScreen;