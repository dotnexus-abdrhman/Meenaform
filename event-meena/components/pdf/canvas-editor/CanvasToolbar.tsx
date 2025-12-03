/**
 * Canvas Toolbar Component
 * 
 * Toolbar with tools for the canvas editor.
 * 
 * @version 5.0.0
 * @date 2025-11-12
 */

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Type,
  Table,
  Image,
  Square,
  Undo,
  Redo,
  Grid3x3,
  Magnet,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CanvasToolbarProps {
  onAddText: () => void;
  onAddTable: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  gridEnabled: boolean;
  snapEnabled: boolean;
  onToggleGrid: () => void;
  onToggleSnap: () => void;
}

export function CanvasToolbar({
  onAddText,
  onAddTable,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  gridEnabled,
  snapEnabled,
  onToggleGrid,
  onToggleSnap,
}: CanvasToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-3 bg-white border-b shadow-sm">
      {/* Add Tools */}
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={onAddText}
          className="gap-2"
        >
          <Type className="w-4 h-4" />
          <span className="hidden sm:inline">نص</span>
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={onAddTable}
          className="gap-2"
        >
          <Table className="w-4 h-4" />
          <span className="hidden sm:inline">جدول</span>
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* History Tools */}
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={onUndo}
          disabled={!canUndo}
          title="تراجع (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={onRedo}
          disabled={!canRedo}
          title="إعادة (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* View Tools */}
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant={gridEnabled ? 'default' : 'outline'}
          onClick={onToggleGrid}
          className={cn(
            "gap-2",
            gridEnabled && "bg-purple-500 hover:bg-purple-600"
          )}
          title="إظهار/إخفاء الشبكة"
        >
          <Grid3x3 className="w-4 h-4" />
          <span className="hidden sm:inline">شبكة</span>
        </Button>
        
        <Button
          size="sm"
          variant={snapEnabled ? 'default' : 'outline'}
          onClick={onToggleSnap}
          className={cn(
            "gap-2",
            snapEnabled && "bg-purple-500 hover:bg-purple-600"
          )}
          title="تفعيل/تعطيل المحاذاة التلقائية"
        >
          <Magnet className="w-4 h-4" />
          <span className="hidden sm:inline">محاذاة</span>
        </Button>
      </div>
      
      <div className="flex-1" />
      
      {/* Info */}
      <div className="text-xs text-muted-foreground hidden md:block">
        <span className="font-medium">نصيحة:</span> اسحب العناصر لتحريكها • انقر مرتين للتحرير
      </div>
    </div>
  );
}

