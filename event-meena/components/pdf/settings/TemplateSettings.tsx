/**
 * Template Settings Component
 * 
 * Settings panel for template management.
 * Load, save, and delete PDF templates.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React, { useState } from 'react';
import { usePDFEditor } from '@/contexts/PDFEditorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  validatePDFSettings,
  sanitizePDFSettings,
  createTemplateFilename
} from '@/lib/pdf-template-validator';
import { PDFEditorSettings } from '@/types/pdf-editor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Save, Trash2, Download, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function TemplateSettings() {
  const { state, loadTemplate, saveTemplate, deleteTemplate, updateSettings } = usePDFEditor();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importWarnings, setImportWarnings] = useState<string[]>([]);
  
  const handleSaveTemplate = () => {
    if (templateName.trim()) {
      saveTemplate(templateName.trim(), templateDescription.trim() || undefined);
      setTemplateName('');
      setTemplateDescription('');
      setSaveDialogOpen(false);
    }
  };
  
  const handleLoadTemplate = (templateId: string) => {
    loadTemplate(templateId);
  };
  
  const handleDeleteTemplate = (templateId: string) => {
    deleteTemplate(templateId);
  };
  
  const handleExportTemplate = () => {
    try {
      const dataStr = JSON.stringify(state.currentSettings, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = createTemplateFilename('current-settings');
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('فشل تصدير القالب');
    }
  };

  const handleImportTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset errors
    setImportError(null);
    setImportWarnings([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const rawData = JSON.parse(e.target?.result as string);

        // Validate settings
        const validation = validatePDFSettings(rawData);

        if (!validation.isValid) {
          setImportError(`فشل التحقق من القالب:\n${validation.errors.join('\n')}`);
          alert(`فشل استيراد القالب:\n\n${validation.errors.join('\n')}`);
          return;
        }

        // Show warnings if any
        if (validation.warnings.length > 0) {
          setImportWarnings(validation.warnings);
          console.warn('Template import warnings:', validation.warnings);
        }

        // Sanitize settings
        const sanitizedSettings = sanitizePDFSettings(rawData) as PDFEditorSettings;

        // Update current settings
        updateSettings(sanitizedSettings);

        // Save as new template
        const templateName = `مستورد - ${file.name.replace('.json', '')}`;
        saveTemplate(templateName, 'قالب مستورد من ملف');

        // Show success message
        const warningMsg = validation.warnings.length > 0
          ? `\n\nتحذيرات: ${validation.warnings.length}`
          : '';
        alert(`تم استيراد القالب بنجاح!${warningMsg}`);

      } catch (error) {
        console.error('Failed to import template:', error);
        setImportError('فشل قراءة الملف. تأكد من أنه ملف JSON صالح.');
        alert('فشل استيراد القالب. تأكد من صحة الملف.');
      }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = '';
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">إدارة القوالب</CardTitle>
        <CardDescription>
          حفظ وتحميل قوالب الإعدادات المخصصة
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Import Warnings */}
        {importWarnings.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>تحذيرات الاستيراد</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 text-xs mt-2">
                {importWarnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Save Current Settings */}
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="default">
              <Save className="w-4 h-4 mr-2" />
              حفظ الإعدادات الحالية كقالب
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>حفظ قالب جديد</DialogTitle>
              <DialogDescription>
                احفظ الإعدادات الحالية كقالب لاستخدامه لاحقاً
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">اسم القالب *</Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="مثال: قالب الفعاليات الرسمية"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template-description">الوصف (اختياري)</Label>
                <Textarea
                  id="template-description"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="وصف مختصر للقالب..."
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSaveTemplate} disabled={!templateName.trim()}>
                حفظ القالب
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Import/Export */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={handleExportTemplate}>
            <Download className="w-4 h-4 mr-2" />
            تصدير
          </Button>
          
          <Button variant="outline" className="flex-1" asChild>
            <label>
              <Upload className="w-4 h-4 mr-2" />
              استيراد
              <input
                type="file"
                accept=".json"
                onChange={handleImportTemplate}
                className="hidden"
              />
            </label>
          </Button>
        </div>
        
        {/* Available Templates */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">القوالب المتاحة</h4>

          <div className="space-y-2">
            {state.templates.map((template) => (
              <div
                key={template.id}
                className={`
                  flex flex-col gap-3 p-3 rounded-lg border cursor-pointer
                  ${state.selectedTemplateId === template.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }
                  transition-all duration-200
                `}
                onClick={() => handleLoadTemplate(template.id)}
              >
                <div className="flex-1 pointer-events-none">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h5 className="text-sm font-medium">
                      {template.name}
                    </h5>
                    {template.isPreset && (
                      <Badge variant="secondary" className="text-xs">
                        مدمج
                      </Badge>
                    )}
                  </div>
                  {template.description && (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {template.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 pointer-events-auto">
                  <Button
                    size="sm"
                    variant={state.selectedTemplateId === template.id ? 'default' : 'outline'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadTemplate(template.id);
                    }}
                    className="flex-1"
                  >
                    {state.selectedTemplateId === template.id ? 'محمّل' : 'تحميل'}
                  </Button>

                  {!template.isPreset && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>حذف القالب</AlertDialogTitle>
                          <AlertDialogDescription>
                            هل أنت متأكد من حذف القالب "{template.name}"؟
                            لا يمكن التراجع عن هذا الإجراء.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

