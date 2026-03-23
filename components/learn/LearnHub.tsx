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
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/learn-data/modules";
import { LearningModule } from "@/types/learn";
import ModuleScreen from "./ModuleScreen";

export function LearnHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...new Set(MODULES.map(m => m.category))];

  const filteredModules = MODULES.filter(m => {
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedModule) {
    return <ModuleScreen module={selectedModule} onBack={() => setSelectedModule(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D14] text-[#F0EDE6] selection:bg-[#F5C842] selection:text-[#1A1200]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#13131F] to-[#0D0D14] py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#FC4444]">
              Civic Hub · Premium Learning
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight tracking-tight mb-6">
              Follow the Budget.<br />
              <span className="italic text-[#FC4444]">Find the Story.</span>
            </h1>
            <p className="text-[#F0EDE6]/60 text-lg max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
              Premium civic education — structured as lessons, stories, and videos. Learn at your pace, on any device.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#F0EDE6]/50">
                <div className="h-1.5 w-1.5 rounded-full bg-[#48BB78]" />
                Plain language
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#F0EDE6]/50">
                <div className="h-1.5 w-1.5 rounded-full bg-[#38B2AC]" />
                Source-linked
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#F0EDE6]/50">
                <div className="h-1.5 w-1.5 rounded-full bg-[#F5C842]" />
                Youth-first
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#F0EDE6]/50">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FC4444]" />
                47 counties tracked
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Ambient Gradients */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#FC4444]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#38B2AC]/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border",
                  activeCategory === cat 
                    ? "bg-[#F5C842] text-[#1A1200] border-[#F5C842]" 
                    : "bg-white/5 text-[#F0EDE6]/60 border-white/5 hover:border-white/20 hover:text-[#F0EDE6]"
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
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs text-[#F0EDE6] focus:outline-none focus:border-[#F5C842]/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredModules.map((module, idx) => (
              <motion.div
                key={module.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                onClick={() => setSelectedModule(module)}
                className="group relative flex flex-col bg-[#13131F] border border-white/5 rounded-[20px] overflow-hidden cursor-pointer hover:border-white/15 transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Accent Top Bar */}
                <div className="h-1 w-full" style={{ backgroundColor: module.catColor }} />
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-white/5 text-[#F0EDE6]/50 hover:bg-white/10 border-none font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {module.level} · Module {module.num}
                    </Badge>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-lg group-hover:scale-110 transition-transform">
                      {module.teacher.avatar}
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-normal leading-snug mb-2 group-hover:text-[#F5C842] transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-xs text-[#F0EDE6]/40 font-mono mb-4">
                    Credits: {module.credits}
                  </p>

                  <p className="text-sm text-[#F0EDE6]/60 leading-relaxed mb-6 line-clamp-3">
                    {module.desc}
                  </p>

                  {/* Content Type Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {module.types.includes('stories') && (
                      <span className="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full bg-[#FC4444]/10 text-[#FC4444] border border-[#FC4444]/20">Stories</span>
                    )}
                    {module.types.includes('learn') && (
                      <span className="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full bg-[#F5C842]/10 text-[#F5C842] border border-[#F5C842]/20">Learn</span>
                    )}
                    {module.types.includes('videos') && (
                      <span className="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full bg-[#38B2AC]/10 text-[#38B2AC] border border-[#38B2AC]/20">Videos</span>
                    )}
                    {module.types.includes('quiz') && (
                      <span className="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full bg-[#9F7AEA]/10 text-[#9F7AEA] border border-[#9F7AEA]/20">Quiz</span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-[#F0EDE6]/50">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#F5C842]">
                      Start Module
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/5 text-center relative">
        <div className="flex items-center justify-center gap-2 mb-4 grayscale opacity-30">
           <img src="/logo.svg" alt="BNS" className="h-6 w-auto" />
           <span className="font-serif text-sm">Budget Ndio Story</span>
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
  );
}
