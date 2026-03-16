'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Volume2, 
  VolumeX,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { AvatarConfig, AvatarState, AvatarAction, AvatarExpression } from '../types';

interface TeacherAvatarProps {
  config: AvatarConfig;
  state: AvatarState;
  message?: string;
  onInteraction?: (interaction: string) => void;
}

// Avatar character visual styles
const avatarStyles = {
  'teacher-1': {
    name: 'Sarah',
    primaryColor: '#2F4494',
    hairColor: '#4A3728',
    outfitColor: '#1E3A5F',
    expression: {
      neutral: '😊',
      happy: '😄',
      thoughtful: '🤔',
      excited: '🤩',
      curious: '🙂',
      encouraging: '💪',
    },
  },
  'teacher-2': {
    name: 'James',
    primaryColor: '#2563EB',
    hairColor: '#1C1C1C',
    outfitColor: '#334155',
    expression: {
      neutral: '🙂',
      happy: '😊',
      thoughtful: '🤨',
      excited: '😃',
      curious: '🙄',
      encouraging: '👍',
    },
  },
};

// Animation configurations
const actionAnimations: Record<AvatarAction, any> = {
  idle: {
    y: [0, 5, 0],
    transition: { repeat: Infinity, duration: 3 },
  },
  welcoming: {
    scale: [1, 1.1, 1],
    transition: { repeat: Infinity, duration: 2 },
  },
  explaining: {
    x: [0, 10, 0],
    transition: { repeat: Infinity, duration: 2 },
  },
  pointing: {
    rotate: [0, -5, 0],
    transition: { repeat: Infinity, duration: 1.5 },
  },
  questioning: {
    rotate: [0, 3, -3, 0],
    transition: { repeat: Infinity, duration: 3 },
  },
  celebrating: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 0.5 },
  },
  reading: {
    y: [0, 3, 0],
    transition: { repeat: Infinity, duration: 4 },
  },
  concluding: {
    scale: [1, 1.05, 1],
    transition: { duration: 1 },
  },
};

export function TeacherAvatar({
  config,
  state,
  message,
  onInteraction,
}: TeacherAvatarProps) {
  const [showMessage, setShowMessage] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const avatar = avatarStyles[config.character_id as keyof typeof avatarStyles] || avatarStyles['teacher-1'];

  // Auto-hide message after delay
  useEffect(() => {
    if (message && showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [message, showMessage]);

  // Get expression emoji
  const getExpression = () => {
    return avatar.expression[state.expression] || avatar.expression.neutral;
  };

  return (
    <motion.div
      className="relative"
      animate={actionAnimations[state.current_action]}
      initial={false}
    >
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-visible">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Avatar Visual */}
            <motion.div
              className="relative w-24 h-24 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Avatar container */}
              <div 
                className="w-full h-full rounded-full flex items-center justify-center text-5xl"
                style={{ 
                  background: `linear-gradient(135deg, ${avatar.primaryColor}20, ${avatar.primaryColor}40)`,
                  border: `3px solid ${avatar.primaryColor}`,
                }}
              >
                {/* Character face/emoji */}
                <span className="select-none">{getExpression()}</span>
              </div>

              {/* Status indicator */}
              {state.is_speaking && (
                <motion.div
                  className="absolute -bottom-1 -right-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Volume2 className="h-2 w-2 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Info & Message */}
            <div className="flex-1 min-w-0">
              {/* Name & Role */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{avatar.name}</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Your Guide
                </span>
              </div>

              {/* Message bubble */}
              <AnimatePresence mode="wait">
                {message && showMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-lg p-3 shadow-sm border">
                      <p className="text-sm">{message}</p>
                    </div>
                    {/* Speech bubble arrow */}
                    <div 
                      className="absolute left-0 -top-1 w-4 h-4 bg-white border-l border-t rotate-45"
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action hint */}
              {!message && (
                <p className="text-xs text-muted-foreground">
                  {state.current_action === 'idle' && 'Waiting for you to continue...'}
                  {state.current_action === 'explaining' && 'Listen carefully...'}
                  {state.current_action === 'questioning' && 'Think about your answer'}
                  {state.current_action === 'celebrating' && 'Great job!'}
                </p>
              )}

              {/* Controls */}
              <div className="flex items-center gap-2 mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="h-8"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                {message && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMessage(!showMessage)}
                    className="h-8"
                  >
                    {showMessage ? 'Hide' : 'Show'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-2 -right-2"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Sparkles className="h-6 w-6 text-yellow-500" />
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// Avatar with Story Mode
// =============================================================================

interface StoryAvatarProps {
  config: AvatarConfig;
  storyBeat: {
    dialogue: string;
    action: AvatarAction;
    expression: AvatarExpression;
  };
}

export function StoryAvatar({ config, storyBeat }: StoryAvatarProps) {
  return (
    <TeacherAvatar
      config={config}
      state={{
        current_action: storyBeat.action,
        expression: storyBeat.expression,
        position: config.position || 'right',
        is_speaking: true,
        visible: true,
      }}
      message={storyBeat.dialogue}
    />
  );
}

export default TeacherAvatar;
