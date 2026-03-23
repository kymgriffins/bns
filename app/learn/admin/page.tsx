"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Settings,
  ArrowLeft,
  LayoutDashboard,
  BarChart2,
  BookOpen,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MODULES, 
  getAllModulesData, 
  getContentStats 
} from "@/lib/learn-data";
import { LearningModule } from "@/types/learn";
import { cn } from "@/lib/utils";

export default function LearnAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const stats = getContentStats();
  const allModules = MODULES;

  const filteredModules = allModules.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050508] text-[#F0EDE6] selection:bg-[#F5C842] selection:text-[#1A1200]">
      {/* Sidebar (Small Version) */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-[#0D0D14] border-r border-white/5 hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#F5C842] to-[#FC4444] flex items-center justify-center font-bold text-black text-xs">
            A
          </div>
          <span className="font-serif text-lg">Learn Admin</span>
        </div>

        <nav className="space-y-1 flex-1">
          <Link href="/learn/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-[#F5C842] font-medium border border-[#F5C842]/20 shadow-[0_10px_30px_rgba(245,200,66,0.1)]">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/learn" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#F0EDE6]/50 hover:bg-white/5 hover:text-[#F0EDE6] transition-all">
            <Eye className="h-4 w-4" /> View Site
          </Link>
          <div className="pt-6 pb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-white/20">System</div>
          <Link href="/learn/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#F0EDE6]/50 hover:bg-white/5 hover:text-[#F0EDE6] transition-all">
            <Settings className="h-4 w-4" /> Settings
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
           <Link href="/learn" className="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors">
              <ArrowLeft className="h-3 w-3" /> Back to Civic Hub
           </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif font-normal text-white mb-2">Modules Management</h1>
            <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Manage your structured learning curriculum</p>
          </div>
          <Button asChild className="rounded-full bg-[#F5C842] text-[#1A1200] font-bold px-6 shadow-[0_10px_30px_rgba(245,200,66,0.2)] hover:scale-[1.02] transition-transform">
             <Link href="/learn/admin/new">
               <Plus className="h-4 w-4 mr-2" /> Create New Module
             </Link>
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {[
             { label: 'Total Modules', value: stats.modules, icon: BookOpen, color: 'text-[#F5C842]' },
             { label: 'Lessons', value: stats.lessons, icon: BarChart2, color: 'text-[#38B2AC]' },
             { label: 'Videos', value: stats.videos, icon: Users, color: 'text-[#FC4444]' },
             { label: 'Completed By', value: '1.2k', icon: Plus, color: 'text-white/40' },
           ].map((s, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-[#0D0D14] border border-white/5 rounded-[24px] p-6 shadow-inner"
             >
                <s.icon className={cn("h-4 w-4 mb-4", s.color)} />
                <div className="text-2xl font-serif text-white">{s.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">{s.label}</div>
             </motion.div>
           ))}
        </div>

        {/* Content Table Area */}
        <div className="bg-[#0D0D14] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
           <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                 <h2 className="font-serif text-lg text-white">All Modules</h2>
                 <Badge className="bg-white/5 text-white/40 border-none px-2 rounded-full font-mono text-[10px]">{allModules.length}</Badge>
              </div>
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input 
                  type="text"
                  placeholder="Search by ID or Title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#F5C842]/50 transition-all font-mono"
                />
              </div>
           </div>

           <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                <thead className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5">
                  <tr>
                    <th className="px-8 py-4">ID / Num</th>
                    <th className="px-8 py-4">Module Title</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Level</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {filteredModules.map((m) => (
                      <tr key={m.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-5">
                           <div className="flex flex-col">
                              <span className="text-white font-mono text-xs">{m.id}</span>
                              <span className="text-[10px] text-white/20 font-bold tracking-widest uppercase">#{m.num}</span>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-lg shadow-inner">
                                 {m.teacher.avatar}
                              </div>
                              <span className="text-sm font-medium text-white/80 group-hover:text-[#F5C842] transition-colors">{m.title}</span>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{m.category}</span>
                        </td>
                        <td className="px-8 py-5">
                           <Badge className={cn(
                             "rounded-full border px-2 py-0.5 text-[9px] uppercase font-bold tracking-tighter",
                             m.level === 'basic' ? "bg-[#38B2AC]/10 text-[#38B2AC] border-[#38B2AC]/20" : 
                             m.level === 'advanced' ? "bg-[#9F7AEA]/10 text-[#9F7AEA] border-[#9F7AEA]/20" :
                             "bg-[#F5C842]/10 text-[#F5C842] border-[#F5C842]/20"
                           )}>
                             {m.level}
                           </Badge>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#48BB78] shadow-[0_0_8px_rgba(72,187,120,0.4)]" />
                              <span className="text-[10px] font-bold text-[#48BB78] uppercase tracking-widest">Active</span>
                           </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <Link href={`/learn/admin/${m.id}`} className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                                 <Edit2 className="h-3.5 w-3.5" />
                              </Link>
                              <button className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/40 hover:text-[#FC4444] hover:bg-[#FC4444]/10 transition-all">
                                 <Trash2 className="h-3.5 w-3.5" />
                              </button>
                           </div>
                        </td>
                      </tr>
                   ))}
                </tbody>
              </table>
           </div>
           
           <div className="p-6 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
              End of Catalog
           </div>
        </div>
      </main>
    </div>
  );
}
