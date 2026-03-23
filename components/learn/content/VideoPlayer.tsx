"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Clock, Bookmark, Share2, Info, CheckCircle2 } from 'lucide-react';
import { VideoItem, UserProgress } from '@/types/learn';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videos: VideoItem[];
  progress: UserProgress | null;
  onVideoComplete?: (videoId: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videos,
  progress,
  onVideoComplete,
}) => {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  if (videos.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[#F0EDE6]/30 font-mono text-xs uppercase tracking-widest bg-[#0D0D14]">
        No videos available for this module.
      </div>
    );
  }

  const isCompleted = (videoId: string) => {
    return progress?.completedVideos?.includes(videoId) || false;
  };

  return (
    <div className="h-full w-full bg-[#0D0D14] flex flex-col p-6 lg:p-12 max-w-5xl mx-auto overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-10 text-[10px] font-bold uppercase tracking-[0.4em] text-[#38B2AC]">
        <Video className="h-4 w-4" />
        Video Gallery
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Player Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-video rounded-[40px] overflow-hidden bg-black border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] group">
             {/* Thumbnail/Overlay */}
             {!isPlaying && (
               <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                 <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => setIsPlaying(true)}
                   className="h-20 w-20 rounded-full bg-[#F5C842] flex items-center justify-center shadow-[0_0_50px_rgba(245,200,66,0.5)] group-hover:shadow-[0_0_80px_rgba(245,200,66,0.6)] transition-all"
                 >
                   <Play className="h-8 w-8 text-[#1A1200] ml-1" />
                 </motion.button>
                 <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-white/50">Click to Play</p>
               </div>
             )}
             
             {/* The Video (placeholder / iframe for now) */}
             <div className="h-full w-full bg-[#13131F] flex items-center justify-center">
                {isPlaying ? (
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.url.split('v=')[1] || activeVideo.url}?autoplay=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img 
                    src={activeVideo.thumbnail || '/video-placeholder.jpg'} 
                    alt={activeVideo.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                )}
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-serif text-white">{activeVideo.title}</h2>
                <div className="flex gap-4">
                   <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors">
                      <Bookmark className="h-5 w-5" />
                   </button>
                   <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors">
                      <Share2 className="h-5 w-5" />
                   </button>
                </div>
             </div>
             <p className="text-base text-[#F0EDE6]/60 leading-relaxed font-sans max-w-3xl">
                {activeVideo.desc}
             </p>
             <div className="flex items-center gap-6 pt-4 text-[10px] font-bold uppercase tracking-widest text-[#F0EDE6]/30">
                <div className="flex items-center gap-2">
                   <Clock className="h-4 w-4" />
                   {activeVideo.duration}
                </div>
                <div className="flex items-center gap-2">
                   <Info className="h-4 w-4" />
                   Source: Budget Ndio Story
                </div>
             </div>
          </div>
        </div>

        {/* Playlist / List View */}
        <div className="space-y-6">
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F0EDE6]/30 px-2">Playlist</h3>
           <div className="space-y-2">
              {videos.map((vid) => {
                const isActive = activeVideo.id === vid.id;
                const done = isCompleted(vid.id);

                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setActiveVideo(vid);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      "w-full flex gap-4 p-4 rounded-[32px] border transition-all text-left group",
                      isActive 
                        ? "bg-[#13131F] border-white/10 shadow-lg" 
                        : "bg-white/5 border-transparent hover:bg-white/[0.08]"
                    )}
                  >
                    <div className="relative h-20 w-32 shrink-0 rounded-[24px] overflow-hidden bg-black border border-white/5">
                       <img 
                          src={vid.thumbnail || '/video-placeholder.jpg'} 
                          alt={vid.title} 
                          className={cn("h-full w-full object-cover", isActive ? "opacity-40" : "opacity-60")}
                       />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Play className={cn("h-6 w-6 transition-all", isActive ? "text-[#F5C842] scale-110" : "text-white/40 group-hover:text-white/80")} />
                       </div>
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                       <h4 className={cn(
                         "text-sm font-medium leading-tight mb-1 truncate",
                         isActive ? "text-[#F5C842]" : "text-white/80"
                       )}>
                         {vid.title}
                       </h4>
                       <div className="flex items-center gap-2 text-[10px] text-white/30 truncate">
                          <Clock className="h-3 w-3" /> {vid.duration}
                          {done && (
                            <span className="flex items-center gap-1 text-[#48BB78]">
                               · <CheckCircle2 className="h-3 w-3" /> Watched
                            </span>
                          )}
                       </div>
                    </div>
                  </button>
                );
              })}
           </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;