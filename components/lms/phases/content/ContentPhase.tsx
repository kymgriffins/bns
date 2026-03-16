'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle,
  Play,
  Pause,
  FileText,
  ExternalLink,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ContentSection } from '../../types';
import { useLMS } from '../../learning-shell';
import { ClickReveal } from '../../interactive/ClickReveal';
import { ScrollReveal } from '../../interactive/ScrollReveal';
import { ProtectedPDFViewer } from './ProtectedPDFViewer';

interface ContentPhaseProps {
  sections: ContentSection[];
  currentSection: number;
  onSectionChange: (index: number) => void;
  onComplete: () => void;
}

export function ContentPhase({
  sections,
  currentSection,
  onSectionChange,
  onComplete,
}: ContentPhaseProps) {
  const { progress, markSectionComplete } = useLMS();
  const [isPlaying, setIsPlaying] = useState(false);
  const section = sections[currentSection];
  const isComplete = progress.phase_2_sections_complete.includes(section?.id || '');

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
        onSectionChange(currentSection + 1);
      } else if (e.key === 'ArrowLeft' && currentSection > 0) {
        onSectionChange(currentSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, sections.length, onSectionChange]);

  if (!section) return null;

  const handleMarkComplete = () => {
    markSectionComplete(section.id);
    if (currentSection < sections.length - 1) {
      onSectionChange(currentSection + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Section {currentSection + 1} of {sections.length}</span>
            <span>•</span>
            <span>~{section.duration_estimate} min</span>
          </div>
          <h2 className="text-2xl font-bold">{section.title}</h2>
        </div>
        
        <Button
          variant={isComplete ? 'secondary' : 'default'}
          size="sm"
          onClick={handleMarkComplete}
        >
          {isComplete ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </>
          ) : (
            <>
              <Circle className="h-4 w-4 mr-2" />
              Mark Complete
            </>
          )}
        </Button>
      </div>

      {/* Section navigation dots */}
      <div className="flex gap-2 justify-center">
        {sections.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => onSectionChange(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSection 
                ? 'w-8 bg-primary' 
                : progress.phase_2_sections_complete.includes(s.id)
                  ? 'w-2 bg-green-500'
                  : 'w-2 bg-secondary'
            }`}
            aria-label={`Go to section ${idx + 1}`}
          />
        ))}
      </div>

      {/* Content area */}
      <Card className="overflow-hidden">
        <Tabs defaultValue="content" className="w-full">
          <CardHeader className="pb-0">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">
                <FileText className="h-4 w-4 mr-2" />
                Content
              </TabsTrigger>
              {section.type === 'video' && (
                <TabsTrigger value="video">
                  <Play className="h-4 w-4 mr-2" />
                  Video
                </TabsTrigger>
              )}
              <TabsTrigger value="resources">
                <ExternalLink className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="pt-4">
            <TabsContent value="content" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                <SectionContent section={section} />
              </ScrollArea>
            </TabsContent>

            {section.type === 'video' && (
              <TabsContent value="video" className="mt-0">
                <VideoPlayer 
                  url={(section.content as any).url}
                  onComplete={() => markSectionComplete(section.id)}
                />
              </TabsContent>
            )}

            <TabsContent value="resources" className="mt-0">
              <ResourcesList section={section} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => onSectionChange(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {currentSection === sections.length - 1 ? (
          <Button onClick={onComplete}>
            Finish Content
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleMarkComplete}>
            Next Section
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Section Content Renderer
// =============================================================================

interface SectionContentProps {
  section: ContentSection;
}

function SectionContent({ section }: SectionContentProps) {
  switch (section.type) {
    case 'text':
      return <TextContent content={section.content} />;
    case 'pdf':
      return <ProtectedPDFViewer pdfId={(section.content as any).pdf_id} />;
    case 'video':
      return <VideoContent content={section.content} />;
    case 'interactive':
      return <InteractiveContent content={section.content} />;
    default:
      return <div>Unknown content type</div>;
  }
}

function TextContent({ content }: { content: any }) {
  const textContent = content as { html?: string; reveal_sections?: any[] };
  
  return (
    <div className="prose prose-sm max-w-none">
      {textContent.html ? (
        <div dangerouslySetInnerHTML={{ __html: textContent.html }} />
      ) : (
        <p>No content available</p>
      )}
      
      {/* Click-to-reveal sections */}
      {textContent.reveal_sections?.map((reveal) => (
        <ClickReveal
          key={reveal.id}
          revealType="text"
          content={<p className="mt-4 p-4 bg-secondary/50 rounded-lg">{reveal.content}</p>}
          hint="Click to learn more"
        />
      ))}
    </div>
  );
}

function VideoContent({ content }: { content: any }) {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">Video content would be displayed here.</p>
      <pre className="text-xs bg-secondary p-2 rounded overflow-x-auto">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}

function InteractiveContent({ content }: { content: any }) {
  return (
    <div className="p-4 bg-primary/5 rounded-lg">
      <p className="font-medium mb-2">Interactive Content</p>
      <pre className="text-xs bg-secondary p-2 rounded overflow-x-auto">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}

// =============================================================================
// Video Player Component
// =============================================================================

interface VideoPlayerProps {
  url: string;
  onComplete: () => void;
}

function VideoPlayer({ url, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-black" />
            ) : (
              <Play className="h-8 w-8 text-black ml-1" />
            )}
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Video transcript and additional resources available in the Resources tab.
      </p>
    </div>
  );
}

// =============================================================================
// Resources List
// =============================================================================

interface ResourcesListProps {
  section: ContentSection;
}

function ResourcesList({ section }: ResourcesListProps) {
  const resources = [
    { title: 'Related Article', type: 'link', url: '#' },
    { title: 'Downloadable Worksheet', type: 'pdf', url: '#' },
  ];

  return (
    <div className="space-y-3">
      {resources.map((resource, idx) => (
        <a
          key={idx}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
        >
          <FileText className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium">{resource.title}</p>
            <p className="text-xs text-muted-foreground uppercase">{resource.type}</p>
          </div>
          <ExternalLink className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export default ContentPhase;
