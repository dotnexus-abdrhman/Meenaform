/**
 * PDF Settings Panel Component
 * 
 * Main settings panel that contains all PDF customization options.
 * Organized in collapsible accordion sections for better UX.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageSettings } from './settings/PageSettings';
import { FontSettings } from './settings/FontSettings';
import { ColorSettings } from './settings/ColorSettings';
import { SpacingSettings } from './settings/SpacingSettings';
import { TableSettings } from './settings/TableSettings';
import { TemplateSettings } from './settings/TemplateSettings';
import { CustomTextSettings } from './settings/CustomTextSettings';
import { CustomTextOverlaySettings } from './settings/CustomTextOverlaySettings';
import {
  FileText,
  Type,
  Palette,
  Space,
  Table,
  Save,
  MessageSquare,
  TextCursor
} from 'lucide-react';

export function PDFSettingsPanel() {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">إعدادات PDF</h2>
            <p className="text-sm text-muted-foreground">
              خصص جميع جوانب PDF المُصدّر حسب احتياجاتك
            </p>
          </div>
        
        <Accordion 
          type="multiple" 
          defaultValue={['templates', 'page', 'fonts', 'colors']}
          className="space-y-4"
        >
          {/* Template Settings */}
          <AccordionItem value="templates" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Save className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">القوالب</h3>
                  <p className="text-xs text-muted-foreground">
                    حفظ وتحميل القوالب المخصصة
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <TemplateSettings />
            </AccordionContent>
          </AccordionItem>
          
          {/* Page Settings */}
          <AccordionItem value="page" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">الصفحة</h3>
                  <p className="text-xs text-muted-foreground">
                    الحجم، الاتجاه، والهوامش
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <PageSettings />
            </AccordionContent>
          </AccordionItem>
          
          {/* Font Settings */}
          <AccordionItem value="fonts" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Type className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">الخطوط</h3>
                  <p className="text-xs text-muted-foreground">
                    النوع، الأحجام، والأوزان
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <FontSettings />
            </AccordionContent>
          </AccordionItem>
          
          {/* Color Settings */}
          <AccordionItem value="colors" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <Palette className="w-5 h-5 text-pink-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">الألوان</h3>
                  <p className="text-xs text-muted-foreground">
                    نظام الألوان الكامل
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ColorSettings />
            </AccordionContent>
          </AccordionItem>
          
          {/* Spacing Settings */}
          <AccordionItem value="spacing" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Space className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">المسافات</h3>
                  <p className="text-xs text-muted-foreground">
                    الحشو والهوامش
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SpacingSettings />
            </AccordionContent>
          </AccordionItem>
          
          {/* Table Settings */}
          <AccordionItem value="table" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Table className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">الجداول</h3>
                  <p className="text-xs text-muted-foreground">
                    الحدود والتنسيق
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <TableSettings />
            </AccordionContent>
          </AccordionItem>

          {/* Custom Text Settings */}
          <AccordionItem value="customTexts" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <MessageSquare className="w-5 h-5 text-pink-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">نصوص مخصصة</h3>
                  <p className="text-xs text-muted-foreground">
                    إضافة مقدمة وخاتمة وفواصل
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <CustomTextSettings />
            </AccordionContent>
          </AccordionItem>

          {/* Custom Text Overlays */}
          <AccordionItem value="customTextOverlays" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <TextCursor className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">نصوص حرة</h3>
                  <p className="text-xs text-muted-foreground">
                    إضافة نصوص في أي مكان على PDF
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <CustomTextOverlaySettings />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}

