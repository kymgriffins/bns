"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, 
  Trash2, 
  Plus, 
  ChevronRight, 
  Layout, 
  BookOpen, 
  Play, 
  Lightbulb, 
  Video,
  Type,
  Image as ImageIcon,
  Quote,
  Code as CodeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LearningModule, ContentType } from "@/types/learn";
import { cn } from "@/lib/utils";

interface ModuleEditorProps {
  initialData: any;
  onSave: (data: any) => void | Promise<void>;
  onBack: () => void;
}

export function ModuleEditor({ initialData, onSave, onBack }: ModuleEditorProps) {
  const [data, setData] = useState(initialData);
  const [activeRootTab, setActiveRootTab] = useState<'meta' | 'lessons' | 'stories' | 'quiz' | 'videos'>('meta');
  const [saveState, setSaveState] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  const initialSnapshot = useMemo(() => JSON.stringify(initialData), [initialData]);
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState(initialSnapshot);
  const isDirty = JSON.stringify(data) !== lastSavedSnapshot;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const updateMeta = (field: string, value: any) => {
    setData({ ...data, module: { ...data.module, [field]: value } });
  };

  const addLessonSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      label: 'New Section',
      title: 'Untitle Section',
      content: []
    };
    setData({ ...data, lessons: [...data.lessons, newSection] });
  };

  const addStorySlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      type: 'bullets',
      title: 'New Story Slide',
      bullets: [],
      bg: '#0D0D14'
    };
    setData({ ...data, stories: [...data.stories, newSlide] });
  };

  const handleSave = async () => {
    if (!isDirty || saveState === "saving") return;
    setSaveState("saving");
    setSaveMessage("");
    try {
      await onSave(data);
      const savedSnapshot = JSON.stringify(data);
      setLastSavedSnapshot(savedSnapshot);
      setSaveState("success");
      setSaveMessage("Changes saved successfully.");
      setTimeout(() => {
        setSaveState((current) => (current === "success" ? "idle" : current));
        setSaveMessage((current) => (current === "Changes saved successfully." ? "" : current));
      }, 2000);
    } catch {
      setSaveState("error");
      setSaveMessage("Save failed. Please retry.");
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      const shouldLeave = window.confirm("You have unsaved changes. Leave without saving?");
      if (!shouldLeave) return;
    }
    onBack();
  };

  return (
    <div className="flex flex-col h-full bg-[#050508] text-[#F0EDE6]">
      {/* Editor Toolbar */}
      <header className="h-16 flex-shrink-0 border-b border-white/5 bg-[#0D0D14] flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
           <button onClick={handleCancel} className="min-h-11 min-w-11 p-2 hover:bg-white/5 rounded-full transition-colors">
              <ArrowLeft className="h-4 w-4" />
           </button>
           <div className="h-4 w-[1px] bg-white/10" />
           <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Editing Module</span>
              <span className="text-sm font-serif">{data.module.title}</span>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="ghost" onClick={handleCancel} className="rounded-full text-xs hover:bg-white/5">Cancel</Button>
           <Button
             onClick={handleSave}
             disabled={!isDirty || saveState === "saving"}
             className="rounded-full bg-[#F5C842] text-[#1A1200] font-bold px-6 shadow-[0_10px_30px_rgba(245,200,66,0.1)] disabled:opacity-50"
           >
              <Save className="h-4 w-4 mr-2" /> {saveState === "saving" ? "Saving..." : "Save Changes"}
           </Button>
        </div>
      </header>

      {(isDirty || saveMessage) && (
        <div className="px-6 py-3 border-b border-white/5 bg-[#0A0A10] flex items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-wider font-bold text-white/60">
            {isDirty ? "Unsaved changes" : "All changes saved"}
          </p>
          {saveMessage && (
            <p
              className={
                saveState === "error"
                  ? "text-[11px] font-semibold text-red-300"
                  : "text-[11px] font-semibold text-emerald-300"
              }
            >
              {saveMessage}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#0D0D14] flex flex-col p-4">
           <nav className="space-y-1">
              {[
                { id: 'meta', label: 'Meta Data', icon: Layout },
                { id: 'stories', label: 'Stories', icon: Play },
                { id: 'lessons', label: 'Lessons', icon: BookOpen },
                { id: 'videos', label: 'Videos', icon: Video },
                { id: 'quiz', label: 'Quiz Questions', icon: Lightbulb },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRootTab(tab.id as any)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    activeRootTab === tab.id 
                      ? "bg-white/5 text-[#F5C842] border border-white/5" 
                      : "text-white/40 hover:bg-white/[0.02] hover:text-white"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-xs font-semibold">{tab.label}</span>
                </button>
              ))}
           </nav>
        </aside>

        {/* Editor Workspace */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#050508] no-scrollbar">
           <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                 {activeRootTab === 'meta' && (
                    <motion.div 
                      key="meta"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                       <section>
                          <h2 className="text-xl font-serif mb-6 text-white border-b border-white/5 pb-4">Basic Information</h2>
                          <div className="grid grid-cols-2 gap-6">
                             <div className="col-span-2 space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Module Title</label>
                                <Input 
                                  value={data.module.title}
                                  onChange={(e) => updateMeta('title', e.target.value)}
                                  className="bg-white/5 border-white/10 rounded-xl py-6 font-serif text-lg"
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Module ID</label>
                                <Input 
                                  value={data.module.id}
                                  onChange={(e) => updateMeta('id', e.target.value)}
                                  className="bg-white/5 border-white/10 rounded-xl font-mono text-xs"
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Module Num</label>
                                <Input 
                                  value={data.module.num}
                                  onChange={(e) => updateMeta('num', e.target.value)}
                                  className="bg-white/5 border-white/10 rounded-xl font-mono text-xs"
                                />
                             </div>
                             <div className="col-span-2 space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Description</label>
                                <Textarea 
                                  value={data.module.desc}
                                  onChange={(e) => updateMeta('desc', e.target.value)}
                                  className="bg-white/5 border-white/10 rounded-xl min-h-[100px] text-sm"
                                />
                             </div>
                          </div>
                       </section>

                       <section>
                          <h2 className="text-xl font-serif mb-6 text-white border-b border-white/5 pb-4 pt-10">Styling & Credits</h2>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Category</label>
                                <Input 
                                  value={data.module.category}
                                  onChange={(e) => updateMeta('category', e.target.value)}
                                  className="bg-white/5 border-white/10 rounded-xl text-xs uppercase font-bold tracking-widest"
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Credits</label>
                                <Input 
                                  value={data.module.credits}
                                  onChange={(e) => updateMeta('credits', e.target.value)}
                                  className="bg-white/5 border-white/10 rounded-xl text-xs"
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Teacher Name</label>
                                <Input 
                                  value={data.module.teacher.name}
                                  onChange={(e) => updateMeta('teacher', { ...data.module.teacher, name: e.target.value })}
                                  className="bg-white/5 border-white/10 rounded-xl text-xs"
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Teacher Avatar (Emoji)</label>
                                <Input 
                                  value={data.module.teacher.avatar}
                                  onChange={(e) => updateMeta('teacher', { ...data.module.teacher, avatar: e.target.value })}
                                  className="bg-white/5 border-white/10 rounded-xl text-center text-xl"
                                />
                             </div>
                          </div>
                       </section>
                    </motion.div>
                 )}

                 {activeRootTab === 'lessons' && (
                    <motion.div 
                      key="lessons"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                       <div className="flex items-center justify-between mb-8">
                          <div>
                            <h2 className="text-xl font-serif text-white">Lesson Document Sections</h2>
                            <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Structured rich text content</p>
                          </div>
                          <Button onClick={addLessonSection} variant="outline" className="rounded-full border-white/10 bg-white/5 text-xs">
                             <Plus className="h-4 w-4 mr-2" /> Add Section
                          </Button>
                       </div>

                       <div className="space-y-4">
                          {data.lessons.map((section: any, idx: number) => (
                             <div key={section.id} className="p-6 rounded-[24px] bg-[#0D0D14] border border-white/10 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                   <div className="flex items-center gap-4">
                                      <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center font-mono text-[10px] text-white/30">
                                         {idx + 1}
                                      </div>
                                      <Input 
                                        value={section.title}
                                        onChange={(e) => {
                                          const newLessons = [...data.lessons];
                                          newLessons[idx].title = e.target.value;
                                          setData({ ...data, lessons: newLessons });
                                        }}
                                        className="bg-transparent border-none text-lg font-serif p-0 h-auto focus:ring-0"
                                      />
                                   </div>
                                   <button className="text-white/20 hover:text-red-400 transition-colors">
                                      <Trash2 className="h-4 w-4" />
                                   </button>
                                </div>
                                
                                <div className="space-y-2 pl-12">
                                   <label className="text-[10px] uppercase font-bold tracking-widest text-white/20">Short Label</label>
                                   <Input 
                                      value={section.label}
                                      onChange={(e) => {
                                        const newLessons = [...data.lessons];
                                        newLessons[idx].label = e.target.value;
                                        setData({ ...data, lessons: newLessons });
                                      }}
                                      className="bg-white/5 border-white/5 rounded-lg text-[10px] max-w-[200px]"
                                   />
                                </div>
                             </div>
                          ))}
                       </div>
                    </motion.div>
                 )}

                 {/* Other tabs would go here similarly */}
                 {activeRootTab === 'stories' && (
                   <div className="text-center py-20 bg-white/[0.02] rounded-[32px] border border-white/5 border-dashed">
                      <Play className="h-10 w-10 text-white/10 mx-auto mb-4" />
                      <p className="text-sm text-white/30 font-serif italic">Story Editor / Canvas coming soon...</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/20 mt-2">Manage all 7 slide types</p>
                   </div>
                 )}
              </AnimatePresence>
           </div>
        </main>
      </div>
    </div>
  );
}
