"use client";

import React, { useState, useEffect } from 'react';
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
  Sparkles
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
  const [activeTab, setActiveTab] = useState<ContentType>('stories');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [moduleData, setModuleData] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Load module data
    const data = getModuleData(module.id);
    setModuleData(data);
    setLoading(false);
  }, [module.id]);

  const tabs: { id: ContentType; label: string; icon: any; color: string }[] = [
    { id: 'stories', label: 'Stories', icon: Play, color: '#BB0631' },
    { id: 'learn', label: 'Lesson', icon: BookOpen, color: '#F5C842' },
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
    <div className="flex h-screen flex-col bg-kenya-black text-[#F0EDE6] overflow-hidden font-sans">
      {/* Top Navigation */}
      <nav className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-sm text-[#F0EDE6]/60 hover:text-[#F0EDE6] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Hub</span>
          </button>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          <div className="text-xs font-mono tracking-wider truncate max-w-[200px] sm:max-w-none">
            <span className="text-[#F0EDE6]/30 uppercase">Module {module.num}</span>
            <span className="mx-2 text-white/10">/</span>
            <span className="font-semibold">{module.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {/* Mobile progress - compact */}
           <div className="md:hidden flex items-center gap-2 bg-white/5 rounded-full px-2 py-1 border border-white/5">
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#F5C842] to-[#38B2AC] transition-all duration-1000" 
                  style={{ width: `${progress?.progressPercent || 0}%` }}
                />
              </div>
              <span className="text-[9px] font-bold font-mono">{progress?.progressPercent || 0}%</span>
           </div>
           {/* Desktop progress */}
           <div className="hidden md:flex items-center gap-3 bg-white/5 rounded-none px-3 py-1 border border-white/5">
              <div className="w-24 h-1 bg-white/10 rounded-none overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-kenya-red via-kenya-gold to-kenya-green transition-all duration-1000" 
                  style={{ width: `${progress?.progressPercent || 0}%` }}
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">{progress?.progressPercent || 0}%</span>
           </div>
           <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#F0EDE6]/60"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
           >
             {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
           </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - show on all screens with toggle */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex flex-col flex-shrink-0 border-r border-white/5 bg-white/[0.01] overflow-hidden absolute lg:relative z-40 h-full"
              style={{ width: '280px' }}
            >
              <div className="p-6 border-b border-white/10">
                <Badge className="mb-3 bg-white/5 text-[#F0EDE6]/40 border-none rounded-none px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest">
                  {module.level} · {module.category}
                </Badge>
                <h3 className="font-bold text-lg leading-tight mb-2 tracking-tight">{module.title}</h3>
                <p className="text-[11px] text-[#F0EDE6]/40 mb-4 line-clamp-2 leading-relaxed">{module.desc}</p>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#F0EDE6]/30">
                  <Clock className="h-3 w-3" />
                  {module.duration} total
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-6 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0EDE6]/30">Content</div>
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const isAvailable = module.types.includes(tab.id);
                    if (!isAvailable) return null;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "w-full flex items-center gap-4 px-6 py-4 transition-all border-l-4",
                          isActive 
                            ? "bg-white/5 text-kenya-red border-kenya-red" 
                            : "text-[#F0EDE6]/40 border-transparent hover:bg-white/[0.02] hover:text-[#F0EDE6]"
                        )}
                      >
                        <tab.icon className={cn("h-4 w-4", isActive && "text-kenya-red")} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{tab.label}</span>
                        {isActive && <ChevronRight className="ml-auto h-3 w-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="p-6 mt-auto border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-lg shadow-inner">
                    {module.teacher.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-[#F0EDE6]">{module.teacher.name}</p>
                    <p className="text-[10px] text-[#F0EDE6]/40">{module.teacher.role}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Pane */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0D0D14] overflow-hidden relative">
          {/* Mobile/Tablet Tab Bar */}
          <div className="lg:hidden flex border-b border-white/5 bg-[#13131F] overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
               if (!module.types.includes(tab.id)) return null;
               return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-1 py-3 px-4 min-w-[80px] transition-all border-b-2",
                    activeTab === tab.id 
                      ? "text-[#F5C842] border-[#F5C842]" 
                      : "text-[#F0EDE6]/40 border-transparent"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
                </button>
               );
            })}
          </div>

          <div className="flex-1 scroll-smooth no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
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