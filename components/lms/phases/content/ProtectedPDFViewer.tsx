'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize,
  Download,
  Loader2,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface ProtectedPDFViewerProps {
  pdfId: string;
  initialPage?: number;
  showControls?: boolean;
  className?: string;
}

export function ProtectedPDFViewer({
  pdfId,
  initialPage = 1,
  showControls = true,
  className = '',
}: ProtectedPDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(10); // Would come from PDF
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // User info for watermark
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    // Get user info for watermark
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('user_email') || 'Learner';
      setUserInfo(email);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [pdfId]);

  // Prevent keyboard shortcuts for saving/printing
  useEffect(() => {
    const preventDefaults = (e: Event) => {
      // Prevent Print
      if (e.key === 'Print' || (e.ctrlKey && e.key === 'p')) {
        e.preventDefault();
        alert('Printing is disabled for this content.');
      }
      // Prevent Save
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        alert('Saving is disabled for this content.');
      }
      // Prevent copy in some browsers
      if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
        // Allow normal copy but add watermark
      }
    };

    window.addEventListener('keydown', preventDefaults);
    return () => window.removeEventListener('keydown', preventDefaults);
  }, []);

  // Prevent context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Navigation handlers
  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // Zoom handlers
  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(200, prev + 25));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(50, prev - 25));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'Home') {
        setCurrentPage(1);
      } else if (e.key === 'End') {
        setCurrentPage(totalPages);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevPage, goToNextPage, totalPages]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  return (
    <TooltipProvider>
      <Card className={`overflow-hidden ${className}`}>
        {/* Header with controls */}
        {showControls && (
          <div className="flex items-center justify-between p-3 border-b bg-secondary/30">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">
                Protected View
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Page navigation */}
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Previous page</TooltipContent>
                </Tooltip>
                
                <span className="text-sm px-2 min-w-[80px] text-center">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Next page</TooltipContent>
                </Tooltip>
              </div>

              <div className="h-4 w-px bg-border mx-2" />

              {/* Zoom controls */}
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={zoomOut}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom out</TooltipContent>
                </Tooltip>
                
                <span className="text-sm px-1 min-w-[50px] text-center">
                  {zoom}%
                </span>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={zoomIn}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom in</TooltipContent>
                </Tooltip>
              </div>

              <div className="h-4 w-px bg-border mx-2" />

              {/* Fullscreen */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                    <Maximize className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Fullscreen</TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}

        {/* PDF Content Area */}
        <CardContent 
          className={`relative ${isFullscreen ? 'h-[calc(100vh-4rem)]' : 'h-[600px]'}`}
          onContextMenu={handleContextMenu}
          style={{ 
            userSelect: 'none',
            WebkitUserSelect: 'none',
          } as React.CSSProperties}
        >
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading protected content...</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-center text-destructive">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* PDF Canvas (simulated) */}
          <div 
            className="w-full h-full overflow-auto flex items-start justify-center p-4"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-white shadow-lg"
              style={{ 
                width: '612px', // US Letter width in px at 72dpi
                minHeight: '792px',
              }}
            >
              {/* Simulated PDF content */}
              <div className="p-8 space-y-4">
                {/* Header */}
                <div className="text-center border-b pb-4">
                  <h2 className="text-xl font-bold">Budget Policy Statement 2026</h2>
                  <p className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</p>
                </div>
                
                {/* Sample content */}
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Chapter {Math.ceil(currentPage / 2)}: </strong>
                    This is a protected view of the educational content. 
                    The content is displayed for learning purposes only.
                  </p>
                  
                  <p>
                    Direct downloading and printing have been disabled to 
                    protect the intellectual property and ensure proper 
                    attribution.
                  </p>

                  <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 Learning Tip:</strong> Take notes as you go through 
                      this content. Use the interactive features to test your understanding.
                    </p>
                  </div>
                  
                  {currentPage > 1 && (
                    <>
                      <h3 className="font-semibold mt-4">Key Points</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Understanding budget priorities</li>
                        <li>Revenue and expenditure analysis</li>
                        <li>County allocation framework</li>
                        <li>Risk assessment and mitigation</li>
                      </ul>
                    </>
                  )}
                </div>

                {/* Page number */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-muted-foreground">
                  {currentPage}
                </div>
              </div>

              {/* Watermark overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-10 select-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%232F4494' text-anchor='middle' transform='rotate(-45)'%3E${encodeURIComponent(userInfo)}%3C/text%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px',
                }}
              />
            </motion.div>
          </div>

          {/* Protection notice */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted-foreground bg-background/90 px-2 py-1 rounded">
            <Lock className="h-3 w-3" />
            <span>Copying & download disabled</span>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen exit hint */}
      {isFullscreen && (
        <div className="fixed top-4 right-4 z-50">
          <Button variant="secondary" size="sm" onClick={toggleFullscreen}>
            Press ESC to exit fullscreen
          </Button>
        </div>
      )}
    </TooltipProvider>
  );
}

export default ProtectedPDFViewer;
