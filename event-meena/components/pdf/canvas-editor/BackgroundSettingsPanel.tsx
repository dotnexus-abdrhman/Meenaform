/**
 * Background Settings Panel for Title Element
 * 
 * Provides comprehensive background customization controls including:
 * - Background type selection (none, solid, gradient, semi-transparent)
 * - Color pickers for solid and gradient backgrounds
 * - Opacity slider
 * - Border controls (width, color, radius, style)
 * - Shadow controls (enabled, color, blur, offset)
 * - Preset background styles
 * 
 * @version 1.0.0
 * @date 2025-11-13
 */

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, RotateCcw } from 'lucide-react';

interface TitleBackgroundStyle {
  type: 'none' | 'solid' | 'gradient' | 'semi-transparent';
  solidColor?: string;
  opacity?: number;
  gradient?: {
    type: 'linear' | 'radial';
    angle?: number;
    startColor: string;
    endColor: string;
  };
  border?: {
    width: number;
    color: string;
    radius: number;
    style: 'solid' | 'dashed' | 'dotted' | 'none';
  };
  shadow?: {
    enabled: boolean;
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
}

interface BackgroundSettingsPanelProps {
  background: TitleBackgroundStyle;
  onUpdate: (background: TitleBackgroundStyle) => void;
  onClose: () => void;
  tableHeaderColor?: string; // Color from settings.colors.headerBg
}

const PRESET_BACKGROUNDS: Array<{ name: string; style: TitleBackgroundStyle }> = [
  {
    name: 'احترافي داكن',
    style: {
      type: 'gradient',
      opacity: 1,
      gradient: {
        type: 'linear',
        angle: 135,
        startColor: '#1e293b',
        endColor: '#334155',
      },
      border: { width: 0, color: '#e5e7eb', radius: 12, style: 'none' },
      shadow: { enabled: true, color: 'rgba(0, 0, 0, 0.1)', blur: 12, offsetX: 0, offsetY: 4 },
    },
  },
  {
    name: 'أزرق حديث',
    style: {
      type: 'gradient',
      opacity: 1,
      gradient: {
        type: 'linear',
        angle: 135,
        startColor: '#3b82f6',
        endColor: '#1e40af',
      },
      border: { width: 0, color: '#e5e7eb', radius: 12, style: 'none' },
      shadow: { enabled: true, color: 'rgba(59, 130, 246, 0.3)', blur: 16, offsetX: 0, offsetY: 4 },
    },
  },
  {
    name: 'بنفسجي أنيق',
    style: {
      type: 'gradient',
      opacity: 1,
      gradient: {
        type: 'linear',
        angle: 135,
        startColor: '#8b5cf6',
        endColor: '#6d28d9',
      },
      border: { width: 0, color: '#e5e7eb', radius: 12, style: 'none' },
      shadow: { enabled: true, color: 'rgba(139, 92, 246, 0.3)', blur: 16, offsetX: 0, offsetY: 4 },
    },
  },
  {
    name: 'شفاف خفيف',
    style: {
      type: 'semi-transparent',
      solidColor: '#ffffff',
      opacity: 0.9,
      border: { width: 2, color: '#e5e7eb', radius: 12, style: 'solid' },
      shadow: { enabled: true, color: 'rgba(0, 0, 0, 0.05)', blur: 8, offsetX: 0, offsetY: 2 },
    },
  },
  {
    name: 'بدون خلفية',
    style: {
      type: 'none',
      opacity: 1,
      border: { width: 0, color: 'transparent', radius: 0, style: 'none' },
      shadow: { enabled: false, color: 'rgba(0, 0, 0, 0)', blur: 0, offsetX: 0, offsetY: 0 },
    },
  },
];

export function BackgroundSettingsPanel({
  background,
  onUpdate,
  onClose,
  tableHeaderColor,
}: BackgroundSettingsPanelProps) {
  const updateBackground = (updates: Partial<TitleBackgroundStyle>) => {
    onUpdate({ ...background, ...updates });
  };

  const updateGradient = (updates: Partial<NonNullable<TitleBackgroundStyle['gradient']>>) => {
    onUpdate({
      ...background,
      gradient: { ...background.gradient!, ...updates },
    });
  };

  const updateBorder = (updates: Partial<NonNullable<TitleBackgroundStyle['border']>>) => {
    onUpdate({
      ...background,
      border: { ...background.border!, ...updates },
    });
  };

  const updateShadow = (updates: Partial<NonNullable<TitleBackgroundStyle['shadow']>>) => {
    onUpdate({
      ...background,
      shadow: { ...background.shadow!, ...updates },
    });
  };

  return (
    <div className="absolute top-16 left-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-sm">إعدادات الخلفية</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="p-4 space-y-4">
          {/* Background Type */}
          <div className="space-y-2">
            <Label className="text-xs">نوع الخلفية</Label>
            <Select
              value={background.type}
              onValueChange={(value) => updateBackground({ type: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">بدون خلفية</SelectItem>
                <SelectItem value="solid">لون صلب</SelectItem>
                <SelectItem value="gradient">تدرج لوني</SelectItem>
                <SelectItem value="semi-transparent">شفاف</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Solid Color */}
          {(background.type === 'solid' || background.type === 'semi-transparent') && (
            <div className="space-y-2">
              <Label className="text-xs">اللون</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={background.solidColor || '#1e293b'}
                  onChange={(e) => updateBackground({ solidColor: e.target.value })}
                  className="w-full h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={background.solidColor || '#1e293b'}
                  onChange={(e) => updateBackground({ solidColor: e.target.value })}
                  className="w-24 px-2 text-xs border rounded"
                />
              </div>
            </div>
          )}

          {/* Opacity */}
          {background.type !== 'none' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">الشفافية</Label>
                <span className="text-xs text-gray-500">
                  {Math.round((background.opacity ?? 1) * 100)}%
                </span>
              </div>
              <Slider
                value={[(background.opacity ?? 1) * 100]}
                onValueChange={([value]) => updateBackground({ opacity: value / 100 })}
                min={0}
                max={100}
                step={1}
              />
            </div>
          )}

          {/* Gradient Settings */}
          {background.type === 'gradient' && background.gradient && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label className="text-xs font-semibold">إعدادات التدرج</Label>

                {/* Gradient Type */}
                <div className="space-y-2">
                  <Label className="text-xs">نوع التدرج</Label>
                  <Select
                    value={background.gradient.type}
                    onValueChange={(value) => updateGradient({ type: value as 'linear' | 'radial' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">خطي</SelectItem>
                      <SelectItem value="radial">دائري</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Start Color */}
                <div className="space-y-2">
                  <Label className="text-xs">اللون الأول</Label>
                  <input
                    type="color"
                    value={background.gradient.startColor}
                    onChange={(e) => updateGradient({ startColor: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>

                {/* End Color */}
                <div className="space-y-2">
                  <Label className="text-xs">اللون الثاني</Label>
                  <input
                    type="color"
                    value={background.gradient.endColor}
                    onChange={(e) => updateGradient({ endColor: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>

                {/* Angle (for linear gradient) */}
                {background.gradient.type === 'linear' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">الزاوية</Label>
                      <span className="text-xs text-gray-500">{background.gradient.angle || 135}°</span>
                    </div>
                    <Slider
                      value={[background.gradient.angle || 135]}
                      onValueChange={([value]) => updateGradient({ angle: value })}
                      min={0}
                      max={360}
                      step={15}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Border Settings */}
          <Separator />
          <div className="space-y-3">
            <Label className="text-xs font-semibold">إعدادات الحدود</Label>

            {/* Border Style */}
            <div className="space-y-2">
              <Label className="text-xs">نمط الحد</Label>
              <Select
                value={background.border?.style || 'none'}
                onValueChange={(value) => updateBorder({ style: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">بدون</SelectItem>
                  <SelectItem value="solid">صلب</SelectItem>
                  <SelectItem value="dashed">متقطع</SelectItem>
                  <SelectItem value="dotted">منقط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {background.border?.style !== 'none' && (
              <>
                {/* Border Width */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">سمك الحد</Label>
                    <span className="text-xs text-gray-500">{background.border?.width || 0}px</span>
                  </div>
                  <Slider
                    value={[background.border?.width || 0]}
                    onValueChange={([value]) => updateBorder({ width: value })}
                    min={0}
                    max={10}
                    step={1}
                  />
                </div>

                {/* Border Color */}
                <div className="space-y-2">
                  <Label className="text-xs">لون الحد</Label>
                  <input
                    type="color"
                    value={background.border?.color || '#e5e7eb'}
                    onChange={(e) => updateBorder({ color: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </>
            )}

            {/* Border Radius */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">استدارة الزوايا</Label>
                <span className="text-xs text-gray-500">{background.border?.radius || 0}px</span>
              </div>
              <Slider
                value={[background.border?.radius || 0]}
                onValueChange={([value]) => updateBorder({ radius: value })}
                min={0}
                max={50}
                step={2}
              />
            </div>
          </div>

          {/* Shadow Settings */}
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">الظل</Label>
              <Button
                variant={background.shadow?.enabled ? "default" : "outline"}
                size="sm"
                onClick={() => updateShadow({ enabled: !background.shadow?.enabled })}
              >
                {background.shadow?.enabled ? 'مفعّل' : 'معطّل'}
              </Button>
            </div>

            {background.shadow?.enabled && (
              <>
                {/* Shadow Blur */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">التمويه</Label>
                    <span className="text-xs text-gray-500">{background.shadow?.blur || 0}px</span>
                  </div>
                  <Slider
                    value={[background.shadow?.blur || 0]}
                    onValueChange={([value]) => updateShadow({ blur: value })}
                    min={0}
                    max={50}
                    step={2}
                  />
                </div>

                {/* Shadow Offset X */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">الإزاحة الأفقية</Label>
                    <span className="text-xs text-gray-500">{background.shadow?.offsetX || 0}px</span>
                  </div>
                  <Slider
                    value={[background.shadow?.offsetX || 0]}
                    onValueChange={([value]) => updateShadow({ offsetX: value })}
                    min={-20}
                    max={20}
                    step={1}
                  />
                </div>

                {/* Shadow Offset Y */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">الإزاحة العمودية</Label>
                    <span className="text-xs text-gray-500">{background.shadow?.offsetY || 0}px</span>
                  </div>
                  <Slider
                    value={[background.shadow?.offsetY || 0]}
                    onValueChange={([value]) => updateShadow({ offsetY: value })}
                    min={-20}
                    max={20}
                    step={1}
                  />
                </div>
              </>
            )}
          </div>

          {/* Presets */}
          <Separator />
          <div className="space-y-2">
            <Label className="text-xs font-semibold">أنماط جاهزة</Label>

            {/* Match Table Color Button */}
            {tableHeaderColor && (
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  onUpdate({
                    type: 'solid',
                    solidColor: tableHeaderColor,
                    opacity: 1,
                    border: { width: 0, color: 'transparent', radius: 12, style: 'none' },
                    shadow: { enabled: true, color: 'rgba(0, 0, 0, 0.1)', blur: 12, offsetX: 0, offsetY: 4 },
                  });
                }}
                className="w-full text-xs"
              >
                🎨 مطابقة لون الجداول
              </Button>
            )}

            <div className="grid grid-cols-2 gap-2">
              {PRESET_BACKGROUNDS.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdate(preset.style)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

