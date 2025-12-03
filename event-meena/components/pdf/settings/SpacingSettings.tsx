/**
 * Spacing Settings Component
 * 
 * Settings panel for spacing and padding customization.
 * Controls spacing between tables, padding, and margins.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React from 'react';
import { usePDFEditor } from '@/contexts/PDFEditorContext';
import { SliderControl } from '../controls/SliderControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function SpacingSettings() {
  const { state, updateSpacingSettings } = usePDFEditor();
  const { spacing } = state.currentSettings;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">إعدادات المسافات</CardTitle>
        <CardDescription>
          تخصيص المسافات والحشو بين العناصر
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Table Separation */}
        <SliderControl
          label="المسافة بين الجداول"
          value={spacing.tableSeparation}
          min={5}
          max={50}
          step={5}
          unit="mm"
          onChange={(value) => updateSpacingSettings({ tableSeparation: value })}
          description="المسافة الفاصلة بين جدول وآخر"
        />
        
        <Separator />
        
        {/* Container Padding */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">حشو الحاوية (Container Padding)</h4>
          
          <SliderControl
            label="الحشو العمودي"
            value={spacing.containerPadding.vertical}
            min={20}
            max={80}
            step={5}
            unit="px"
            onChange={(value) => updateSpacingSettings({ 
              containerPadding: { ...spacing.containerPadding, vertical: value } 
            })}
            description="المسافة العمودية داخل الحاوية (أعلى وأسفل)"
          />
          
          <SliderControl
            label="الحشو الأفقي"
            value={spacing.containerPadding.horizontal}
            min={20}
            max={100}
            step={5}
            unit="px"
            onChange={(value) => updateSpacingSettings({ 
              containerPadding: { ...spacing.containerPadding, horizontal: value } 
            })}
            description="المسافة الأفقية داخل الحاوية (يمين ويسار)"
          />
        </div>
        
        <Separator />
        
        {/* Cell Padding */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">حشو الخلايا (Cell Padding)</h4>
          
          <SliderControl
            label="الحشو العمودي للخلايا"
            value={spacing.cellPadding.vertical}
            min={8}
            max={32}
            step={2}
            unit="px"
            onChange={(value) => updateSpacingSettings({ 
              cellPadding: { ...spacing.cellPadding, vertical: value } 
            })}
            description="المسافة العمودية داخل خلايا الجدول"
          />
          
          <SliderControl
            label="الحشو الأفقي للخلايا"
            value={spacing.cellPadding.horizontal}
            min={8}
            max={32}
            step={2}
            unit="px"
            onChange={(value) => updateSpacingSettings({ 
              cellPadding: { ...spacing.cellPadding, horizontal: value } 
            })}
            description="المسافة الأفقية داخل خلايا الجدول"
          />
        </div>
        
        <Separator />
        
        {/* Title Margins */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">هوامش العناوين (Title Margins)</h4>
          
          <SliderControl
            label="هامش عنوان الحدث"
            value={spacing.titleMargins.eventTitle}
            min={10}
            max={60}
            step={2}
            unit="px"
            onChange={(value) => updateSpacingSettings({ 
              titleMargins: { ...spacing.titleMargins, eventTitle: value } 
            })}
            description="المسافة أسفل عنوان الحدث"
          />
          
          <SliderControl
            label="هامش عنوان الجدول"
            value={spacing.titleMargins.tableTitle}
            min={10}
            max={50}
            step={2}
            unit="px"
            onChange={(value) => updateSpacingSettings({ 
              titleMargins: { ...spacing.titleMargins, tableTitle: value } 
            })}
            description="المسافة أسفل عنوان الجدول"
          />
        </div>
      </CardContent>
    </Card>
  );
}

