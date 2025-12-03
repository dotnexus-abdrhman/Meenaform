/**
 * Transform Control Panel
 * 
 * Professional transform controls for elements (position, size, rotation, flip)
 * Similar to Figma, Canva, and Photoshop transform panels
 * 
 * @version 1.0.0
 * @date 2025-11-13
 */

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  X,
  Lock,
  Unlock,
  FlipHorizontal,
  FlipVertical,
  RotateCw,
  RotateCcw,
  RefreshCw,
} from 'lucide-react';

interface TransformState {
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  scale: { x: number; y: number };
  lockAspectRatio: boolean;
}

interface TransformControlPanelProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
  transform: TransformState;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
  onUpdateTransform: (transform: Partial<TransformState>) => void;
  onClose: () => void;
}

export function TransformControlPanel({
  position,
  size,
  transform,
  onUpdatePosition,
  onUpdateSize,
  onUpdateTransform,
  onClose,
}: TransformControlPanelProps) {
  const handleRotationChange = (value: string) => {
    const rotation = parseFloat(value) || 0;
    onUpdateTransform({ rotation: rotation % 360 });
  };

  const handleRotate90CW = () => {
    onUpdateTransform({ rotation: (transform.rotation + 90) % 360 });
  };

  const handleRotate90CCW = () => {
    onUpdateTransform({ rotation: (transform.rotation - 90 + 360) % 360 });
  };

  const handleFlipHorizontal = () => {
    onUpdateTransform({ flipHorizontal: !transform.flipHorizontal });
  };

  const handleFlipVertical = () => {
    onUpdateTransform({ flipVertical: !transform.flipVertical });
  };

  const handleResetTransform = () => {
    onUpdateTransform({
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      scale: { x: 1, y: 1 },
    });
  };

  const handleToggleAspectRatio = () => {
    onUpdateTransform({ lockAspectRatio: !transform.lockAspectRatio });
  };

  const handleWidthChange = (value: string) => {
    const width = parseFloat(value) || size.width;
    if (transform.lockAspectRatio) {
      const aspectRatio = size.width / size.height;
      const height = width / aspectRatio;
      onUpdateSize({ width, height });
    } else {
      onUpdateSize({ width, height: size.height });
    }
  };

  const handleHeightChange = (value: string) => {
    const height = parseFloat(value) || size.height;
    if (transform.lockAspectRatio) {
      const aspectRatio = size.width / size.height;
      const width = height * aspectRatio;
      onUpdateSize({ width, height });
    } else {
      onUpdateSize({ width: size.width, height });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          🎨 التحكم في التحويلات
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="p-4 space-y-4">
          {/* Position Controls */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              📍 الموضع (Position)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-600 dark:text-gray-400">X</Label>
                <Input
                  type="number"
                  value={Math.round(position.x)}
                  onChange={(e) => onUpdatePosition({ x: parseFloat(e.target.value) || 0, y: position.y })}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600 dark:text-gray-400">Y</Label>
                <Input
                  type="number"
                  value={Math.round(position.y)}
                  onChange={(e) => onUpdatePosition({ x: position.x, y: parseFloat(e.target.value) || 0 })}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Size Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                📏 الحجم (Size)
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleAspectRatio}
                className="h-6 w-6 p-0"
                title={transform.lockAspectRatio ? "فك قفل النسبة" : "قفل النسبة"}
              >
                {transform.lockAspectRatio ? (
                  <Lock className="w-3 h-3 text-blue-500" />
                ) : (
                  <Unlock className="w-3 h-3 text-gray-400" />
                )}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-600 dark:text-gray-400">العرض (W)</Label>
                <Input
                  type="number"
                  value={Math.round(size.width)}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600 dark:text-gray-400">الارتفاع (H)</Label>
                <Input
                  type="number"
                  value={Math.round(size.height)}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              النسبة: {(size.width / size.height).toFixed(2)}
            </div>
          </div>

          <Separator />

          {/* Rotation Controls */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              🔄 الدوران (Rotation)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={Math.round(transform.rotation)}
                onChange={(e) => handleRotationChange(e.target.value)}
                className="h-8 text-xs flex-1"
                min="0"
                max="360"
              />
              <span className="text-xs text-gray-500">°</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRotate90CCW}
                className="flex-1 text-xs"
                title="دوران 90° عكس عقارب الساعة"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                90° ←
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRotate90CW}
                className="flex-1 text-xs"
                title="دوران 90° مع عقارب الساعة"
              >
                <RotateCw className="w-3 h-3 mr-1" />
                90° →
              </Button>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={transform.rotation}
              onChange={(e) => handleRotationChange(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <Separator />

          {/* Flip Controls */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              ↔️ القلب (Flip)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={transform.flipHorizontal ? "default" : "outline"}
                size="sm"
                onClick={handleFlipHorizontal}
                className="text-xs"
              >
                <FlipHorizontal className="w-3 h-3 mr-1" />
                أفقي
              </Button>
              <Button
                variant={transform.flipVertical ? "default" : "outline"}
                size="sm"
                onClick={handleFlipVertical}
                className="text-xs"
              >
                <FlipVertical className="w-3 h-3 mr-1" />
                عمودي
              </Button>
            </div>
          </div>

          <Separator />

          {/* Reset Button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleResetTransform}
            className="w-full text-xs"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            إعادة تعيين التحويلات
          </Button>

          {/* Transform Info */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-1">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <strong>الدوران:</strong> {Math.round(transform.rotation)}°
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <strong>القلب الأفقي:</strong> {transform.flipHorizontal ? 'نعم' : 'لا'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <strong>القلب العمودي:</strong> {transform.flipVertical ? 'نعم' : 'لا'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <strong>قفل النسبة:</strong> {transform.lockAspectRatio ? 'مقفل' : 'مفتوح'}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

