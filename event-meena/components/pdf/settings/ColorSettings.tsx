/**
 * Color Settings Component
 * 
 * Settings panel for color scheme customization.
 * Controls colors for all PDF elements.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React from 'react';
import { usePDFEditor } from '@/contexts/PDFEditorContext';
import { ColorPicker } from '../controls/ColorPicker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ColorSettings() {
  const { state, updateColorSettings } = usePDFEditor();
  const { colors } = state.currentSettings;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">إعدادات الألوان</CardTitle>
        <CardDescription>
          تخصيص نظام الألوان لجميع عناصر PDF
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Primary Colors */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">الألوان الأساسية</h4>
          
          <ColorPicker
            label="اللون الأساسي"
            value={colors.primary}
            onChange={(value) => updateColorSettings({ primary: value })}
            description="اللون الرئيسي المستخدم في العناوين والتمييزات"
          />
          
          <ColorPicker
            label="اللون الثانوي"
            value={colors.secondary}
            onChange={(value) => updateColorSettings({ secondary: value })}
            description="اللون الثانوي للخلفيات الخفيفة"
          />
          
          <ColorPicker
            label="لون النص"
            value={colors.text}
            onChange={(value) => updateColorSettings({ text: value })}
            description="اللون الافتراضي للنصوص"
          />
          
          <ColorPicker
            label="لون الحدود"
            value={colors.border}
            onChange={(value) => updateColorSettings({ border: value })}
            description="لون حدود الجداول والعناصر"
          />
        </div>
        
        <Separator />
        
        {/* Event Title Colors */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">ألوان عنوان الحدث</h4>
          
          <ColorPicker
            label="لون خلفية عنوان الحدث"
            value={colors.eventTitleBg}
            onChange={(value) => updateColorSettings({ eventTitleBg: value })}
            description="لون الخلفية المتدرجة لعنوان الحدث"
          />
          
          <ColorPicker
            label="لون نص عنوان الحدث"
            value={colors.eventTitleText}
            onChange={(value) => updateColorSettings({ eventTitleText: value })}
            description="لون النص في عنوان الحدث (عادة أبيض)"
          />
        </div>
        
        <Separator />
        
        {/* Table Title Colors */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">ألوان عنوان الجدول</h4>
          
          <ColorPicker
            label="لون خلفية عنوان الجدول"
            value={colors.tableTitleBg}
            onChange={(value) => updateColorSettings({ tableTitleBg: value })}
            description="لون خلفية عنوان الجدول (يفضل شفاف)"
          />
          
          <ColorPicker
            label="لون نص عنوان الجدول"
            value={colors.tableTitleText}
            onChange={(value) => updateColorSettings({ tableTitleText: value })}
            description="لون النص في عنوان الجدول"
          />
        </div>
        
        <Separator />
        
        {/* Table Header Colors */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">ألوان رأس الجدول</h4>
          
          <ColorPicker
            label="لون خلفية رأس الجدول"
            value={colors.headerBg}
            onChange={(value) => updateColorSettings({ headerBg: value })}
            description="لون خلفية رؤوس الأعمدة"
          />
          
          <ColorPicker
            label="لون نص رأس الجدول"
            value={colors.headerText}
            onChange={(value) => updateColorSettings({ headerText: value })}
            description="لون النص في رؤوس الأعمدة (عادة أبيض)"
          />
        </div>
        
        <Separator />
        
        {/* Alternate Row Color */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">ألوان إضافية</h4>
          
          <ColorPicker
            label="لون الصفوف المتبادلة"
            value={colors.alternateRowBg || '#f9fafb'}
            onChange={(value) => updateColorSettings({ alternateRowBg: value })}
            description="لون خلفية الصفوف المتبادلة (Zebra Striping)"
          />
        </div>
      </CardContent>
    </Card>
  );
}

