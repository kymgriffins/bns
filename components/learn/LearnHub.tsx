"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Target,
  ChevronRight,
  Lock,
  Search,
  Filter,
  Menu,
  X,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/learn-data/modules";
import { LearningModule, UserProgress } from "@/types/learn";
import ModuleScreen from "./ModuleScreen";

// Storage key for progress persistence
const PROGRESS_STORAGE_KEY = 'bns_learn_progress';

export function LearnHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleProgress, setModuleProgress] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const loadProgress = () => {
      try {
        const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setModuleProgress(parsed);
          // Extract completed module IDs
          const completed = Object.values(parsed)
            .filter((p: any) => p.completed)
            .map((p: any) => p.moduleId);
          setCompletedModules(completed);
        }
      } catch (e) {
        console.error('Failed to load progress:', e);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Simulate loading delay for better UX
    const timer = setTimeout(loadProgress, 500);
    return () => clearTimeout(timer);
  }, []);

  // Save progress to localStorage
  const saveProgress = (progress: Record<string, any>) => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
      setModuleProgress(progress);
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  };

  // Get progress for a specific module
  const getModuleProgress = (moduleId: string): any => {
    return moduleProgress[moduleId] || null;
  };

  // Calculate progress percentage for a module
  const getProgressPercentage = (module: LearningModule): number => {
    const progress = moduleProgress[module.id];
    if (!progress) return 0;
    return progress.progressPercent || 0;
  };

  // Check if module has started (has some progress)
  const hasStarted = (moduleId: string): boolean => {
    const progress = moduleProgress[moduleId];
    if (!progress) return false;
    return progress.progressPercent > 0 && progress.progressPercent < 100;
  };

  // Check if module is completed
  const isCompleted = (moduleId: string): boolean => {
    return completedModules.includes(moduleId);
  };

  const categories = ["All", ...new Set(MODULES.map(m => m.category))];

  const filteredModules = MODULES.filter(m => {
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedModule) {
    const progress = getModuleProgress(selectedModule.id);
    return (
      <ModuleScreen 
        module={selectedModule} 
        progress={progress || undefined}
        onBack={() => setSelectedModule(null)}
        onProgressUpdate={(newProgress) => {
          const updated = { ...moduleProgress, [selectedModule.id]: newProgress };
          saveProgress(updated);
          if (newProgress.completed && !completedModules.includes(selectedModule.id)) {
            setCompletedModules([...completedModules, selectedModule.id]);
          }
        }}
      />
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full flex flex-col bg-[#050508] text-[#F0EDE6] items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-white/10 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-[#F5C842] animate-spin" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-serif mb-2">Loading Modules</p>
            <p className="text-xs text-[#F0EDE6]/40 font-mono uppercase tracking-widest">Preparing your learning journey...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kenya-black text-[#F0EDE6] selection:bg-kenya-gold selection:text-black font-sans">
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-6 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-xl relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-kenya-red">
              Civic Hub · Premium Learning
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
              Follow the Budget.<br />
              <span className="text-kenya-red">Find the Story.</span>
            </h1>
            <p className="text-[#F0EDE6]/50 text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Premium civic education — structured as lessons, stories, and videos. Learn at your pace, on any device.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F0EDE6]/40">
                <div className="h-1.5 w-1.5 rounded-full bg-kenya-green" />
                Plain language
              </div>
              <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F0EDE6]/40">
                <div className="h-1.5 w-1.5 rounded-full bg-kenya-red" />
                Source-linked
              </div>
              <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F0EDE6]/40">
                <div className="h-2 w-3 rounded-sm bg-kenya-black border border-white/20" />
                Youth-first
              </div>
              <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F0EDE6]/40">
                <div className="h-1.5 w-1.5 rounded-full bg-kenya-gold" />
                47 counties tracked
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Ambient Gradients */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-kenya-red/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-kenya-green/5 blur-[160px] rounded-full pointer-events-none" />
      </section>

      {/* sticky Navigation & Search Bar */}
      <div className="sticky top-0 z-30 bg-kenya-black/70 backdrop-blur-md border-b border-white/5">
        {/* Featured / Navigation */}
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-[#F0EDE6]/60"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className={cn(
            "flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar",
            mobileMenuOpen ? "flex" : "hidden md:flex"
          )}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border",
                  activeCategory === cat 
                    ? "bg-kenya-green text-white border-kenya-green" 
                    : "bg-white/5 text-[#F0EDE6]/40 border-white/5 hover:border-white/10 hover:text-[#F0EDE6]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F0EDE6]/30" />
            <input 
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-[11px] font-bold uppercase tracking-wider text-[#F0EDE6] focus:outline-none focus:border-kenya-gold/30 transition-all placeholder:text-white/10"
            />
          </div>
        </div>

        {/* Module Grid or Empty State */}
        {filteredModules.length === 0 ? (
          <div className="container mx-auto px-4 py-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-[#F0EDE6]/20" />
              </div>
              <h3 className="text-2xl font-serif text-[#F0EDE6] mb-3">No modules found</h3>
              <p className="text-[#F0EDE6]/50 max-w-md mb-8">
                We couldn't find any modules matching "<span className="text-[#F5C842]">{searchQuery}</span>". 
                Try adjusting your search or browse all categories.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 rounded-full text-xs font-semibold bg-[#F5C842] text-[#1A1200] hover:bg-[#F5C842]/90 transition-colors"
                >
                  Clear Search
                </button>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="px-6 py-2 rounded-full text-xs font-semibold bg-white/10 text-[#F0EDE6] border border-white/10 hover:border-white/20 transition-colors"
                >
                  View All Modules
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4 py-16">
            <AnimatePresence mode="popLayout">
              {filteredModules.map((module, idx) => {
                const progressPercent = getProgressPercentage(module);
                const moduleCompleted = isCompleted(module.id);
                const moduleStarted = hasStarted(module.id);
                
                return (
                  <motion.div
                    key={module.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    onClick={() => setSelectedModule(module)}
                    className="group relative flex flex-col bg-white/[0.02] border border-white/10 rounded-sm overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-350 hover:bg-white/[0.04]"
                  >
                    {/* Progress indicator bar */}
                    {progressPercent > 0 && (
                      <div className="h-1 w-full bg-white/10">
                        <div 
                          className="h-full transition-all duration-500"
                          style={{ 
                            width: `${progressPercent}%`,
                            backgroundColor: moduleCompleted ? '#006400' : '#BB0631'
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Accent Top Bar */}
                    <div className="h-1 w-full" style={{ backgroundColor: module.catColor }} />
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col gap-1">
                          <Badge className="bg-white/5 text-[#F0EDE6]/40 hover:bg-white/10 border-none font-bold text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-none">
                            {module.level} · Module {module.num}
                          </Badge>
                          {/* Progress badge */}
                          {progressPercent > 0 && (
                            <span className="text-[10px] font-mono flex items-center gap-1">
                              {moduleCompleted ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 text-kenya-green" />
                                  <span className="text-kenya-green font-bold">Completed</span>
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3 text-kenya-gold" />
                                  <span className="text-kenya-gold font-bold">{progressPercent}% complete</span>
                                </>
                              )}
                            </span>
                          )}
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-lg group-hover:scale-110 transition-transform">
                          {module.teacher.avatar}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-kenya-red transition-colors">
                        {module.title}
                      </h3>
                      
                      <p className="text-[10px] text-[#F0EDE6]/30 font-bold uppercase tracking-wider mb-4">
                        Credits: {module.credits}
                      </p>

                      <p className="text-sm text-[#F0EDE6]/60 leading-relaxed mb-6 line-clamp-3">
                        {module.desc}
                      </p>

                      {/* Content Type Pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {module.types.includes('stories') && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none bg-kenya-red/10 text-kenya-red border border-kenya-red/20">Stories</span>
                        )}
                        {module.types.includes('learn') && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none bg-kenya-gold/10 text-kenya-gold border border-kenya-gold/20">Learn</span>
                        )}
                        {module.types.includes('videos') && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none bg-kenya-green/10 text-kenya-green border border-kenya-green/20">Videos</span>
                        )}
                        {module.types.includes('quiz') && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none bg-white/10 text-white/50 border border-white/20">Quiz</span>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[11px] text-[#F0EDE6]/50">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider",
                          moduleCompleted 
                            ? "text-kenya-green" 
                            : moduleStarted 
                              ? "text-kenya-gold" 
                              : "text-kenya-red"
                        )}>
                          {moduleCompleted 
                            ? "Review Module" 
                            : moduleStarted 
                              ? "Continue" 
                              : "Start Module"
                          }
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Footer Branding */}
        <footer className="py-12 border-t border-white/5 text-center relative flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-4 grayscale opacity-30">
            <img src="/logo.svg" alt="BNS" className="h-6 w-auto" />
            <span className="font-bold text-[10px] uppercase tracking-[0.3em]">Budget Ndio Story</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#F0EDE6]/20">
            Decentralizing Knowledge · Empowering Youth
          </p>
          
          {/* Subtle Admin Link */}
          <Link 
            href="/learn/admin" 
            className="absolute bottom-4 right-4 text-[8px] uppercase tracking-widest text-white/5 hover:text-[#F5C842]/40 transition-colors"
          >
            Admin Portal
          </Link>
        </footer>
      </div>
    </div>
  );
}
