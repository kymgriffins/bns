'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  GripVertical,
  Target,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DragDropItem {
  id: string;
  content: string;
  category?: string;
  imageUrl?: string;
}

interface DropZone {
  id: string;
  label: string;
  acceptCategories: string[];
  description?: string;
}

interface DragDropActivityProps {
  items: DragDropItem[];
  dropZones: DropZone[];
  correctMapping: Record<string, string>; // item.id -> zone.id
  onComplete?: (result: { correct: number; total: number }) => void;
  feedbackMode?: 'immediate' | 'on-submit';
  showFeedback?: boolean;
}

export function DragDropActivity({
  items: initialItems,
  dropZones,
  correctMapping,
  onComplete,
  feedbackMode = 'on-submit',
  showFeedback = true,
}: DragDropActivityProps) {
  const [items, setItems] = useState<DragDropItem[]>(initialItems);
  const [placedItems, setPlacedItems] = useState<Map<string, string>>(new Map()); // item.id -> zone.id
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<{ correct: number; total: number } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const itemId = active.id as string;
    const zoneId = over.id as string;

    // Check if dropping on a valid zone
    const zone = dropZones.find(z => z.id === zoneId);
    if (zone) {
      setPlacedItems(prev => {
        const newMap = new Map(prev);
        newMap.set(itemId, zoneId);
        return newMap;
      });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const removeFromZone = (itemId: string) => {
    setPlacedItems(prev => {
      const newMap = new Map(prev);
      newMap.delete(itemId);
      return newMap;
    });
  };

  const handleSubmit = () => {
    let correct = 0;
    placedItems.forEach((zoneId, itemId) => {
      if (correctMapping[itemId] === zoneId) {
        correct++;
      }
    });

    const total = items.length;
    const result = { correct, total };
    setResults(result);
    setIsSubmitted(true);
    onComplete?.(result);
  };

  const handleReset = () => {
    setPlacedItems(new Map());
    setIsSubmitted(false);
    setResults(null);
  };

  // Get items not yet placed
  const unplacedItems = items.filter(item => !placedItems.has(item.id));

  // Get items placed in each zone
  const getItemsInZone = (zoneId: string) => {
    return items.filter(item => placedItems.get(item.id) === zoneId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Drag and Drop Activity
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Drag items from the pool into the correct categories
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Results summary */}
        {isSubmitted && results && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              results.correct === results.total 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-yellow-50 border border-yellow-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {results.correct === results.total ? (
                  <Award className="h-5 w-5 text-green-600" />
                ) : (
                  <Target className="h-5 w-5 text-yellow-600" />
                )}
                <span className="font-medium">
                  You got {results.correct} out of {results.total} correct!
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </motion.div>
        )}

        {/* Drop Zones */}
        <div className="grid md:grid-cols-2 gap-4">
          {dropZones.map(zone => (
            <DropZoneCard
              key={zone.id}
              zone={zone}
              items={getItemsInZone(zone.id)}
              isSubmitted={isSubmitted}
              correctMapping={correctMapping}
              onRemove={removeFromZone}
            />
          ))}
        </div>

        {/* Item Pool */}
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">Available Items</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={unplacedItems.map(i => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-wrap gap-2">
                {unplacedItems.map(item => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    isSubmitted={isSubmitted}
                    isCorrect={isSubmitted ? correctMapping[item.id] === placedItems.get(item.id) : undefined}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
                  {items.find(i => i.id === activeId)?.content}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Submit button */}
        {!isSubmitted && placedItems.size > 0 && (
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={placedItems.size < items.length}>
              Check Answers
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// =============================================================================
// Sortable Item Component
// =============================================================================

interface SortableItemProps {
  item: DragDropItem;
  isSubmitted: boolean;
  isCorrect?: boolean;
}

function SortableItem({ item, isSubmitted, isCorrect }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let borderColor = 'border-border';
  if (isSubmitted && isCorrect !== undefined) {
    borderColor = isCorrect ? 'border-green-500' : 'border-red-500';
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        flex items-center gap-2 px-4 py-2 bg-background border-2 rounded-lg cursor-grab active:cursor-grabbing
        hover:border-primary/50 transition-colors
        ${isDragging ? 'opacity-50' : ''}
        ${borderColor}
      `}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground" />
      <span>{item.content}</span>
      {isSubmitted && isCorrect !== undefined && (
        isCorrect ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-red-500" />
        )
      )}
    </div>
  );
}

// =============================================================================
// Drop Zone Card
// =============================================================================

interface DropZoneCardProps {
  zone: DropZone;
  items: DragDropItem[];
  isSubmitted: boolean;
  correctMapping: Record<string, string>;
  onRemove: (itemId: string) => void;
}

function DropZoneCard({
  zone,
  items,
  isSubmitted,
  correctMapping,
  onRemove,
}: DropZoneCardProps) {
  const { setNodeRef, isOver } = useSortable({ id: zone.id });

  return (
    <div
      ref={setNodeRef}
      className={`
        p-4 rounded-lg border-2 transition-colors min-h-[120px]
        ${isOver ? 'border-primary bg-primary/5' : 'border-dashed border-border'}
      `}
    >
      <h4 className="font-medium mb-2">{zone.label}</h4>
      {zone.description && (
        <p className="text-xs text-muted-foreground mb-3">{zone.description}</p>
      )}
      
      <div className="space-y-2">
        {items.map(item => {
          const isCorrect = isSubmitted && correctMapping[item.id] === zone.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                flex items-center justify-between px-3 py-2 rounded bg-secondary/50
                ${isSubmitted && isCorrect !== undefined 
                  ? (isCorrect ? 'bg-green-100' : 'bg-red-100') 
                  : ''
                }
              `}
            >
              <span className="text-sm">{item.content}</span>
              {!isSubmitted && (
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
              {isSubmitted && (
                isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )
              )}
            </motion.div>
          );
        })}
        
        {items.length === 0 && (
          <p className="text-xs text-muted-foreground italic">
            Drag items here
          </p>
        )}
      </div>
    </div>
  );
}

export default DragDropActivity;
