/**
 * Page Settings Component
 * 
 * Settings panel for page layout and formatting options.
 * Includes orientation, size, margins, and background color.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React from 'react';
import { usePDFEditor } from '@/contexts/PDFEditorContext';
import { SelectControl } from '../controls/SelectControl';
import { SliderControl } from '../controls/SliderControl';
import { ColorPicker } from '../controls/ColorPicker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function PageSettings() {
  const { state, updatePageSettings } = usePDFEditor();
  const { page } = state.currentSettings;
  
  const orientationOptions = [
    { value: 'landscape', label: 'أفقي (Landscape)' },
    { value: 'portrait', label: 'عمودي (Portrait)' },
  ];
  
  const sizeOptions = [
    { value: 'a4', label: 'A4' },
    { value: 'a3', label: 'A3' },
    { value: 'letter', label: 'Letter' },
    { value: 'legal', label: 'Legal' },
    { value: 'custom', label: 'مخصص (Custom)' },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">إعدادات الصفحة</CardTitle>
        <CardDescription>
          تخصيص حجم الصفحة، الاتجاه، والهوامش
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Orientation */}
        <SelectControl
          label="اتجاه الصفحة"
          value={page.orientation}
          options={orientationOptions}
          onChange={(value) => updatePageSettings({ 
            orientation: value as 'portrait' | 'landscape' 
          })}
          description="اختر اتجاه الصفحة (أفقي أو عمودي)"
        />
        
        {/* Page Size */}
        <SelectControl
          label="حجم الصفحة"
          value={page.size}
          options={sizeOptions}
          onChange={(value) => updatePageSettings({ 
            size: value as any 
          })}
          description="اختر حجم الصفحة القياسي أو مخصص"
        />
        
        {/* Custom dimensions (only shown when size is 'custom') */}
        {page.size === 'custom' && (
          <>
            <SliderControl
              label="العرض المخصص"
              value={page.customWidth || 210}
              min={100}
              max={500}
              step={10}
              unit="mm"
              onChange={(value) => updatePageSettings({ customWidth: value })}
              description="عرض الصفحة بالمليمتر"
            />
            
            <SliderControl
              label="الارتفاع المخصص"
              value={page.customHeight || 297}
              min={100}
              max={700}
              step={10}
              unit="mm"
              onChange={(value) => updatePageSettings({ customHeight: value })}
              description="ارتفاع الصفحة بالمليمتر"
            />
          </>
        )}
        
        {/* Margins */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">الهوامش (Margins)</h4>
          
          <SliderControl
            label="الهامش العلوي"
            value={page.margins.top}
            min={0}
            max={50}
            step={1}
            unit="mm"
            onChange={(value) => updatePageSettings({ 
              margins: { ...page.margins, top: value } 
            })}
          />
          
          <SliderControl
            label="الهامش الأيمن"
            value={page.margins.right}
            min={0}
            max={50}
            step={1}
            unit="mm"
            onChange={(value) => updatePageSettings({ 
              margins: { ...page.margins, right: value } 
            })}
          />
          
          <SliderControl
            label="الهامش السفلي"
            value={page.margins.bottom}
            min={0}
            max={50}
            step={1}
            unit="mm"
            onChange={(value) => updatePageSettings({ 
              margins: { ...page.margins, bottom: value } 
            })}
          />
          
          <SliderControl
            label="الهامش الأيسر"
            value={page.margins.left}
            min={0}
            max={50}
            step={1}
            unit="mm"
            onChange={(value) => updatePageSettings({ 
              margins: { ...page.margins, left: value } 
            })}
          />
        </div>
        
        {/* Background Color */}
        <ColorPicker
          label="لون خلفية الصفحة"
          value={page.backgroundColor}
          onChange={(value) => updatePageSettings({ backgroundColor: value })}
          description="لون خلفية الصفحة (عادة أبيض)"
        />
      </CardContent>
    </Card>
  );
}

