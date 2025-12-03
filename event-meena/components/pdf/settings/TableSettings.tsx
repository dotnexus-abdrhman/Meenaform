/**
 * Table Settings Component
 * 
 * Settings panel for table-specific styling options.
 * Controls borders, column widths, and table appearance.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React from 'react';
import { usePDFEditor } from '@/contexts/PDFEditorContext';
import { SelectControl } from '../controls/SelectControl';
import { SliderControl } from '../controls/SliderControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export function TableSettings() {
  const { state, updateTableSettings } = usePDFEditor();
  const { table } = state.currentSettings;
  
  const borderStyleOptions = [
    { value: 'solid', label: 'صلب (Solid)' },
    { value: 'dashed', label: 'متقطع (Dashed)' },
    { value: 'dotted', label: 'منقط (Dotted)' },
  ];
  
  const columnWidthModeOptions = [
    { value: 'auto', label: 'تلقائي (Auto)' },
    { value: 'fixed', label: 'ثابت (Fixed)' },
    { value: 'custom', label: 'مخصص (Custom)' },
  ];
  
  const headerStyleOptions = [
    { value: 'gradient', label: 'متدرج (Gradient)' },
    { value: 'solid', label: 'صلب (Solid)' },
    { value: 'none', label: 'بدون (None)' },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">إعدادات الجداول</CardTitle>
        <CardDescription>
          تخصيص مظهر الجداول والحدود
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Border Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">إعدادات الحدود</h4>
          
          <SliderControl
            label="سُمك الحدود"
            value={table.border.width}
            min={0}
            max={5}
            step={1}
            unit="px"
            onChange={(value) => updateTableSettings({ 
              border: { ...table.border, width: value } 
            })}
            description="سُمك حدود الجدول والخلايا"
          />
          
          <SelectControl
            label="نمط الحدود"
            value={table.border.style}
            options={borderStyleOptions}
            onChange={(value) => updateTableSettings({ 
              border: { ...table.border, style: value as any } 
            })}
            description="نمط خطوط الحدود"
          />
          
          <SliderControl
            label="استدارة الحواف"
            value={table.border.radius}
            min={0}
            max={20}
            step={1}
            unit="px"
            onChange={(value) => updateTableSettings({ 
              border: { ...table.border, radius: value } 
            })}
            description="استدارة زوايا الجدول (0 = حواف حادة)"
          />
        </div>
        
        <Separator />
        
        {/* Column Width Mode */}
        <SelectControl
          label="وضع عرض الأعمدة"
          value={table.columnWidthMode}
          options={columnWidthModeOptions}
          onChange={(value) => updateTableSettings({ 
            columnWidthMode: value as any 
          })}
          description="كيفية تحديد عرض الأعمدة"
        />
        
        <Separator />
        
        {/* Header Style */}
        <SelectControl
          label="نمط رأس الجدول"
          value={table.headerStyle}
          options={headerStyleOptions}
          onChange={(value) => updateTableSettings({ 
            headerStyle: value as any 
          })}
          description="نمط خلفية رؤوس الأعمدة"
        />
        
        <Separator />
        
        {/* Zebra Striping */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">
              تلوين الصفوف المتبادل
            </Label>
            <p className="text-xs text-muted-foreground">
              تفعيل تلوين الصفوف بالتبادل (Zebra Striping)
            </p>
          </div>
          <Switch
            checked={table.zebraStriping}
            onCheckedChange={(checked) => updateTableSettings({ 
              zebraStriping: checked 
            })}
          />
        </div>
      </CardContent>
    </Card>
  );
}

