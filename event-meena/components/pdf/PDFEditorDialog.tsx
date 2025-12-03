/**
 * PDF Editor Dialog Component
 * 
 * Main dialog for the advanced PDF editor.
 * Combines settings panel and preview in a professional layout.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React, { useState } from 'react';
import { PDFEditorProvider, usePDFEditor } from '@/contexts/PDFEditorContext';
import { PDFSettingsPanel } from './PDFSettingsPanel';
import { PDFPreview } from './PDFPreview';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import {
  X,
  Download,
  RotateCcw,
  Sparkles,
  Settings,
  Eye,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface PDFEditorDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  
  /** Callback when dialog should close */
  onOpenChange: (open: boolean) => void;
  
  /** Event data for export */
  eventData: {
    eventTitle: string;
    eventId: string;
    components: any[];
    responses: any[];
    customTables: any[];
  };
  
  /** Callback when export is triggered */
  onExport?: (settings: any) => void;
}

/**
 * Inner component that uses the PDF editor context
 */
function PDFEditorDialogContent({ 
  onClose, 
  eventData,
  onExport,
}: { 
  onClose: () => void;
  eventData: PDFEditorDialogProps['eventData'];
  onExport?: (settings: any) => void;
}) {
  const { state, resetToDefault } = usePDFEditor();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [mobileTab, setMobileTab] = useState<'settings' | 'preview'>('settings');

  /**
   * Build real preview data from actual event responses
   * This ensures the preview shows the same data that will be exported
   */
  const buildPreviewData = () => {
    if (eventData.customTables.length === 0 || eventData.responses.length === 0) {
      // Fallback to sample data if no real data available
      return {
        eventTitle: eventData.eventTitle,
        tables: [{
          title: 'لا توجد بيانات',
          headers: ['#', 'الاسم'],
          rows: [
            { '#': '1', 'الاسم': 'لا توجد بيانات حقيقية' },
          ],
        }],
      };
    }

    // Build tables from custom tables configuration
    const tables = eventData.customTables.map((table) => {
      // Filter components for this table (including signature)
      const tableComponents = eventData.components.filter((c: any) =>
        table.componentIds.includes(c.id) && (c.type === "question" || c.type === "rating" || c.type === "signature")
      );

      // Sort components by the order in table.componentIds
      tableComponents.sort((a: any, b: any) => {
        const indexA = table.componentIds.indexOf(a.id);
        const indexB = table.componentIds.indexOf(b.id);
        return indexA - indexB;
      });

      // Build headers
      const headers: string[] = [];

      // Add serial number header if enabled
      if (table.settings.includeSerialNumber) {
        headers.push('#');
      }

      // Add participant name header (assuming it's always included)
      headers.push('اسم المشارك');

      // Add component headers
      tableComponents.forEach((component: any) => {
        const label = component.settings?.label || component.settings?.question || 'سؤال';
        headers.push(label);
      });

      // Build rows from responses (limit to first 3 for preview performance)
      const previewResponses = eventData.responses.slice(0, 3);
      const rows = previewResponses.map((response: any, index: number) => {
        const row: Record<string, string> = {};

        // Add serial number
        if (table.settings.includeSerialNumber) {
          row['#'] = String(index + 1);
        }

        // Add participant name
        row['اسم المشارك'] = response.participant?.name || 'مشارك مجهول';

        // Add component answers
        tableComponents.forEach((component: any) => {
          const label = component.settings?.label || component.settings?.question || 'سؤال';

          // Find the answer for this component
          // response.answers is an array of ComponentAnswer objects
          const answerObj = response.answers?.find((a: any) => a.componentId === component.id);
          const answer = answerObj?.answer;

          if (answer !== undefined && answer !== null) {
            // Handle different answer types
            if (typeof answer === 'object') {
              // Handle arrays (multiple choice, etc.)
              if (Array.isArray(answer)) {
                row[label] = answer.join(', ');
              }
              // Handle file answers
              else if (answer.fileName) {
                row[label] = answer.fileName;
              }
              // Handle signature answers - pass actual image data for PDF rendering
              else if (answer.signatureData) {
                row[label] = answer.signatureData; // base64 image data
              }
              // Handle table answers
              else if (answer.rows) {
                row[label] = `${answer.rows.length} صف`;
              }
              // Handle other objects
              else {
                row[label] = JSON.stringify(answer);
              }
            } else {
              // Handle primitive values (string, number, boolean)
              row[label] = String(answer);
            }
          } else {
            row[label] = '-';
          }
        });

        return row;
      });

      return {
        title: table.title,
        headers,
        rows,
      };
    });

    return {
      eventTitle: eventData.eventTitle,
      tables,
    };
  };

  // Build real preview data
  const sampleData = buildPreviewData();
  
  const handleReset = () => {
    resetToDefault();
    setShowResetDialog(false);
  };
  
  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Call the export callback with current settings
      if (onExport) {
        await onExport(state.currentSettings);
      }
      
      setIsExporting(false);
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      setIsExporting(false);
    }
  };
  
  const handleClose = () => {
    if (state.isDirty) {
      // TODO: Show unsaved changes warning
      const confirmed = confirm('لديك تغييرات غير محفوظة. هل تريد المتابعة؟');
      if (!confirmed) return;
    }
    onClose();
  };
  
  return (
    <>
      <DialogContent className="max-w-[98vw] w-[98vw] h-[98vh] max-h-[98vh] p-0 gap-0 flex flex-col">
        {/* Hidden DialogTitle for accessibility in Edit Mode */}
        {state.previewMode === 'edit' && (
          <VisuallyHidden.Root asChild>
            <DialogTitle>محرر PDF المتقدم - وضع التحرير</DialogTitle>
          </VisuallyHidden.Root>
        )}

        {/* Header - Hidden in Edit Mode for cleaner UI */}
        {state.previewMode !== 'edit' && (
          <DialogHeader className="px-3 sm:px-6 py-3 sm:py-4 border-b shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Title Section */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <DialogTitle className="text-base sm:text-xl truncate">محرر PDF المتقدم</DialogTitle>
                  <DialogDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm line-clamp-1 sm:line-clamp-none">
                    <span className="hidden sm:inline">خصص PDF بالكامل حسب احتياجاتك - تحكم كامل في كل التفاصيل</span>
                    <span className="sm:hidden">خصص PDF حسب احتياجاتك</span>
                  </DialogDescription>
                </div>
                {/* Close button on mobile - top right */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  disabled={isExporting}
                  className="sm:hidden shrink-0 mr-auto"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Actions Section */}
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowResetDialog(true)}
                  disabled={isExporting}
                  className="flex-1 sm:flex-none"
                >
                  <RotateCcw className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">إعادة تعيين</span>
                </Button>

                <Button
                  size="sm"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1 sm:flex-none"
                >
                  <Download className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">{isExporting ? 'جاري التصدير...' : 'تصدير PDF'}</span>
                  <span className="sm:hidden">{isExporting ? 'تصدير...' : 'تصدير'}</span>
                </Button>

                {/* Close button on desktop */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  disabled={isExporting}
                  className="hidden sm:flex"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </DialogHeader>
        )}

        {/* Main Content */}
        {state.previewMode === 'edit' ? (
          /* Full width Preview in Edit Mode */
          <div className="flex-1 overflow-hidden min-h-0">
            <PDFPreview sampleData={sampleData} />
          </div>
        ) : (
          <>
            {/* Mobile: Tabs Layout */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0 lg:hidden">
              <Tabs value={mobileTab} onValueChange={(v) => setMobileTab(v as 'settings' | 'preview')} className="flex-1 flex flex-col min-h-0">
                <TabsList className="grid w-full grid-cols-2 shrink-0 mx-3 mt-2" style={{ width: 'calc(100% - 24px)' }}>
                  <TabsTrigger value="settings" className="gap-2">
                    <Settings className="w-4 h-4" />
                    الإعدادات
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="gap-2">
                    <Eye className="w-4 h-4" />
                    المعاينة
                  </TabsTrigger>
                </TabsList>

                {/* Settings Tab Content - with scroll wrapper */}
                <div className={`flex-1 overflow-y-auto min-h-0 ${mobileTab === 'settings' ? 'block' : 'hidden'}`}>
                  <TabsContent value="settings" className="mt-0 h-full">
                    <div className="bg-muted/30">
                      <PDFSettingsPanel />
                    </div>
                  </TabsContent>
                </div>

                {/* Preview Tab Content - with overflow wrapper */}
                <div className={`flex-1 overflow-hidden min-h-0 ${mobileTab === 'preview' ? 'block' : 'hidden'}`}>
                  <TabsContent value="preview" className="mt-0 h-full">
                    <PDFPreview sampleData={sampleData} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Desktop: Side-by-Side Layout */}
            <div className="hidden lg:flex flex-1 overflow-hidden min-h-0">
              {/* Left Panel - Settings */}
              <div className="w-[580px] border-r bg-muted/30 overflow-y-auto shrink-0">
                <PDFSettingsPanel />
              </div>

              {/* Right Panel - Preview */}
              <div className="flex-1 overflow-hidden min-w-0">
                <PDFPreview sampleData={sampleData} />
              </div>
            </div>
          </>
        )}

        {/* Footer - Hidden in Edit Mode and on mobile for more space */}
        {state.previewMode !== 'edit' && (
          <div className="hidden sm:block px-3 sm:px-6 py-2 sm:py-3 border-t bg-muted/30 shrink-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">
                  محرر PDF المتقدم v1.0
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  تحكم كامل في التصميم والتنسيق
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {state.selectedTemplateId && (
                  <>
                    <span>
                      القالب: {state.templates.find(t => t.id === state.selectedTemplateId)?.name}
                    </span>
                    <span>•</span>
                  </>
                )}
                <span>
                  {state.templates.length} قالب متاح
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
      
      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>إعادة تعيين الإعدادات</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من إعادة تعيين جميع الإعدادات إلى القيم الافتراضية؟
              سيتم فقدان جميع التغييرات الحالية.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>
              إعادة تعيين
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/**
 * Main PDF Editor Dialog Component
 * Wraps content with PDFEditorProvider
 */
export function PDFEditorDialog({
  open,
  onOpenChange,
  eventData,
  onExport,
}: PDFEditorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <PDFEditorProvider>
        <PDFEditorDialogContent 
          onClose={() => onOpenChange(false)}
          eventData={eventData}
          onExport={onExport}
        />
      </PDFEditorProvider>
    </Dialog>
  );
}

