/**
 * Canvas Layers Panel Component
 * 
 * Panel showing all layers/elements in the canvas.
 * 
 * @version 5.0.0
 * @date 2025-11-12
 */

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, EyeOff, Lock, Unlock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CanvasElement } from '@/types/canvas-editor';

interface CanvasLayersPanelProps {
  elements: CanvasElement[];
  selectedElement: CanvasElement | null;
  onSelectElement: (element: CanvasElement) => void;
}

export function CanvasLayersPanel({
  elements,
  selectedElement,
  onSelectElement,
}: CanvasLayersPanelProps) {
  const handleToggleVisibility = (element: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation();
    const newVisible = !element.visible;
    element.fabricObject.set({ visible: newVisible });
    element.visible = newVisible;
    element.fabricObject.canvas?.renderAll();
  };

  const handleToggleLock = (element: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLocked = !element.locked;
    element.fabricObject.set({
      selectable: !newLocked,
      evented: !newLocked,
    });
    element.locked = newLocked;
    element.fabricObject.canvas?.renderAll();
  };

  const handleDelete = (element: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation();
    element.fabricObject.canvas?.remove(element.fabricObject);
    element.fabricObject.canvas?.renderAll();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-bold text-sm">الطبقات</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {elements.length} عنصر
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {elements.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              لا توجد عناصر
            </div>
          ) : (
            elements.map((element) => (
              <div
                key={element.id}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                  selectedElement?.id === element.id
                    ? "bg-purple-100 border border-purple-300"
                    : "hover:bg-gray-100"
                )}
                onClick={() => onSelectElement(element)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={(e) => handleToggleVisibility(element, e)}
                >
                  {element.visible ? (
                    <Eye className="w-3 h-3" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-muted-foreground" />
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={(e) => handleToggleLock(element, e)}
                >
                  {element.locked ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    <Unlock className="w-3 h-3 text-muted-foreground" />
                  )}
                </Button>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {element.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {element.type === 'text' && 'نص'}
                    {element.type === 'table' && 'جدول'}
                    {element.type === 'image' && 'صورة'}
                    {element.type === 'shape' && 'شكل'}
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  onClick={(e) => handleDelete(element, e)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

