/**
 * Canvas Properties Panel Component
 * 
 * Panel showing properties of the selected element.
 * 
 * @version 5.0.0
 * @date 2025-11-12
 */

"use client";

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CanvasElement } from '@/types/canvas-editor';

interface CanvasPropertiesPanelProps {
  selectedElement: CanvasElement | null;
  canvas: any; // fabric.Canvas
}

export function CanvasPropertiesPanel({
  selectedElement,
  canvas,
}: CanvasPropertiesPanelProps) {
  const [properties, setProperties] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    fill: '#000000',
  });

  // Update properties when element changes or moves
  useEffect(() => {
    if (!selectedElement) return;

    const updateProperties = () => {
      const obj = selectedElement.fabricObject;
      const fillValue = typeof obj.fill === 'string' ? obj.fill : '#000000';
      setProperties({
        left: Math.round(obj.left || 0),
        top: Math.round(obj.top || 0),
        width: Math.round(obj.getScaledWidth?.() || obj.width || 0),
        height: Math.round(obj.getScaledHeight?.() || obj.height || 0),
        fill: fillValue,
      });
    };

    updateProperties();

    // Listen to object modifications
    const onModified = () => updateProperties();
    const onMoving = () => updateProperties();
    const onScaling = () => updateProperties();

    selectedElement.fabricObject.on('modified', onModified);
    selectedElement.fabricObject.on('moving', onMoving);
    selectedElement.fabricObject.on('scaling', onScaling);

    return () => {
      selectedElement.fabricObject.off('modified', onModified);
      selectedElement.fabricObject.off('moving', onMoving);
      selectedElement.fabricObject.off('scaling', onScaling);
    };
  }, [selectedElement]);

  const handlePositionChange = (axis: 'left' | 'top', value: number) => {
    if (!selectedElement) return;
    selectedElement.fabricObject.set({ [axis]: value });
    selectedElement.fabricObject.setCoords();
    canvas?.renderAll();
    setProperties(prev => ({ ...prev, [axis]: value }));
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    if (!selectedElement) return;
    selectedElement.fabricObject.set({
      [dimension]: value,
      scaleX: 1,
      scaleY: 1,
    });
    selectedElement.fabricObject.setCoords();
    canvas?.renderAll();
    setProperties(prev => ({ ...prev, [dimension]: value }));
  };

  const handleColorChange = (property: string, value: string) => {
    if (!selectedElement) return;
    selectedElement.fabricObject.set({ [property]: value });
    canvas?.renderAll();
    setProperties(prev => ({ ...prev, [property]: value }));
  };

  if (!selectedElement) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>لم يتم تحديد أي عنصر</p>
          <p className="text-xs mt-1">انقر على عنصر لعرض خصائصه</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-bold text-sm">الخصائص</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {selectedElement.name}
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Position */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">الموضع</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="pos-x" className="text-xs text-muted-foreground">X</Label>
                <Input
                  id="pos-x"
                  type="number"
                  value={properties.left}
                  onChange={(e) => handlePositionChange('left', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="pos-y" className="text-xs text-muted-foreground">Y</Label>
                <Input
                  id="pos-y"
                  type="number"
                  value={properties.top}
                  onChange={(e) => handlePositionChange('top', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>
          
          {/* Size */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">الحجم</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="size-w" className="text-xs text-muted-foreground">العرض</Label>
                <Input
                  id="size-w"
                  type="number"
                  value={properties.width}
                  onChange={(e) => handleSizeChange('width', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="size-h" className="text-xs text-muted-foreground">الارتفاع</Label>
                <Input
                  id="size-h"
                  type="number"
                  value={properties.height}
                  onChange={(e) => handleSizeChange('height', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>
          
          {/* Text Properties (if text element) */}
          {selectedElement.type === 'text' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="font-size" className="text-xs font-medium">حجم الخط</Label>
                <Input
                  id="font-size"
                  type="number"
                  defaultValue={24}
                  className="h-8 text-xs"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="text-color" className="text-xs font-medium">اللون</Label>
                <Input
                  id="text-color"
                  type="color"
                  defaultValue="#000000"
                  className="h-8"
                />
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

