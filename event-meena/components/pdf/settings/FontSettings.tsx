/**
 * Font Settings Component
 * 
 * Settings panel for font family, sizes, and weights.
 * Controls typography for all PDF elements.
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
import { AVAILABLE_FONTS, FONT_WEIGHTS } from '@/types/pdf-editor';

export function FontSettings() {
  const { state, updateFontSettings } = usePDFEditor();
  const { fonts } = state.currentSettings;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">إعدادات الخطوط</CardTitle>
        <CardDescription>
          تخصيص نوع الخط، الأحجام، والأوزان
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Font Family */}
        <SelectControl
          label="نوع الخط"
          value={fonts.family}
          options={AVAILABLE_FONTS.map(f => ({ value: f.value, label: f.label }))}
          onChange={(value) => updateFontSettings({ family: value })}
          description="اختر نوع الخط المستخدم في PDF"
        />
        
        {/* Font Sizes */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">أحجام الخطوط</h4>
          
          <SliderControl
            label="حجم عنوان الحدث"
            value={fonts.sizes.eventTitle}
            min={40}
            max={120}
            step={2}
            unit="px"
            onChange={(value) => updateFontSettings({
              sizes: { ...fonts.sizes, eventTitle: value }
            })}
            description="حجم العنوان الرئيسي للحدث"
          />

          <SliderControl
            label="حجم عنوان الجدول"
            value={fonts.sizes.tableTitle}
            min={30}
            max={100}
            step={2}
            unit="px"
            onChange={(value) => updateFontSettings({
              sizes: { ...fonts.sizes, tableTitle: value }
            })}
            description="حجم عنوان كل جدول"
          />

          <SliderControl
            label="حجم رأس الجدول"
            value={fonts.sizes.header}
            min={20}
            max={60}
            step={1}
            unit="px"
            onChange={(value) => updateFontSettings({
              sizes: { ...fonts.sizes, header: value }
            })}
            description="حجم خط رؤوس الأعمدة"
          />

          <SliderControl
            label="حجم محتوى الخلايا"
            value={fonts.sizes.content}
            min={16}
            max={50}
            step={1}
            unit="px"
            onChange={(value) => updateFontSettings({
              sizes: { ...fonts.sizes, content: value }
            })}
            description="حجم خط محتوى الجدول"
          />
          
          <SliderControl
            label="حجم النصوص الإضافية"
            value={fonts.sizes.info}
            min={14}
            max={40}
            step={1}
            unit="px"
            onChange={(value) => updateFontSettings({
              sizes: { ...fonts.sizes, info: value }
            })}
            description="حجم النصوص الإضافية (تاريخ التصدير، إلخ)"
          />

          <SliderControl
            label="حجم التذييل"
            value={fonts.sizes.footer}
            min={12}
            max={36}
            step={1}
            unit="px"
            onChange={(value) => updateFontSettings({
              sizes: { ...fonts.sizes, footer: value }
            })}
            description="حجم خط التذييل"
          />
        </div>
        
        {/* Font Weights */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">أوزان الخطوط</h4>
          
          <SelectControl
            label="وزن عنوان الحدث"
            value={fonts.weights.eventTitle.toString()}
            options={FONT_WEIGHTS.map(w => ({ value: w.value.toString(), label: w.label }))}
            onChange={(value) => updateFontSettings({ 
              weights: { ...fonts.weights, eventTitle: parseInt(value) as any } 
            })}
            description="سُمك خط عنوان الحدث"
          />
          
          <SelectControl
            label="وزن عنوان الجدول"
            value={fonts.weights.tableTitle.toString()}
            options={FONT_WEIGHTS.map(w => ({ value: w.value.toString(), label: w.label }))}
            onChange={(value) => updateFontSettings({ 
              weights: { ...fonts.weights, tableTitle: parseInt(value) as any } 
            })}
            description="سُمك خط عنوان الجدول"
          />
          
          <SelectControl
            label="وزن رأس الجدول"
            value={fonts.weights.header.toString()}
            options={FONT_WEIGHTS.map(w => ({ value: w.value.toString(), label: w.label }))}
            onChange={(value) => updateFontSettings({ 
              weights: { ...fonts.weights, header: parseInt(value) as any } 
            })}
            description="سُمك خط رؤوس الأعمدة"
          />
          
          <SelectControl
            label="وزن محتوى الخلايا"
            value={fonts.weights.content.toString()}
            options={FONT_WEIGHTS.map(w => ({ value: w.value.toString(), label: w.label }))}
            onChange={(value) => updateFontSettings({ 
              weights: { ...fonts.weights, content: parseInt(value) as any } 
            })}
            description="سُمك خط محتوى الجدول"
          />
        </div>
      </CardContent>
    </Card>
  );
}

