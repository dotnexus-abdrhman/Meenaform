/**
 * PDF Preview Component
 * 
 * Real-time preview of PDF with zoom controls and loading states.
 * Shows how the PDF will look with current settings.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React, { useState, useMemo, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { usePDFEditor } from '@/contexts/PDFEditorContext';
import { usePDFPreview } from '@/hooks/usePDFPreview';
import { AdvancedCanvasEditor } from './canvas-editor/AdvancedCanvasEditor';
import { EditorErrorBoundary } from './canvas-editor/EditorErrorBoundary';
import { ColorPickerPopover } from './ColorPickerPopover';

// Use dynamic import with ssr: false to avoid build-time parsing of large file
const EnhancedHTMLEditor = dynamic(
  () => import('./canvas-editor/EnhancedHTMLEditor'),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full">Loading editor...</div>
  }
);
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Loader2,
  AlertCircle,
  Edit3,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PDFPreviewProps {
  /** Sample data for preview */
  sampleData?: {
    eventTitle: string;
    tables: Array<{
      title: string;
      headers: string[];
      rows: Array<Record<string, string>>;
    }>;
  };
}

export function PDFPreview({ sampleData }: PDFPreviewProps) {
  const { state, setPreviewZoom, setPreviewMode, updateSettings, updateCustomTextOverlay } = usePDFEditor();
  const { previewUrl, isLoading, error, regeneratePreview } = usePDFPreview({
    settings: state.currentSettings,
    sampleData,
    debounceDelay: 800, // 800ms debounce for better performance
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  // Zoom levels - memoized to prevent recreation
  const zoomLevels = useMemo(() => [0.5, 0.75, 1.0, 1.25, 1.5, 2.0], []);
  const currentZoomIndex = useMemo(
    () => zoomLevels.indexOf(state.previewZoom),
    [zoomLevels, state.previewZoom]
  );

  // Memoized handlers to prevent unnecessary re-renders
  const handleZoomIn = useCallback(() => {
    const nextIndex = Math.min(currentZoomIndex + 1, zoomLevels.length - 1);
    setPreviewZoom(zoomLevels[nextIndex]);
  }, [currentZoomIndex, zoomLevels, setPreviewZoom]);

  const handleZoomOut = useCallback(() => {
    const prevIndex = Math.max(currentZoomIndex - 1, 0);
    setPreviewZoom(zoomLevels[prevIndex]);
  }, [currentZoomIndex, zoomLevels, setPreviewZoom]);

  const handleResetZoom = useCallback(() => {
    setPreviewZoom(1.0);
  }, [setPreviewZoom]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const handleRefresh = useCallback(() => {
    regeneratePreview();
  }, [regeneratePreview]);

  // v4.0: Interactive Visual PDF Editor - Toggle Edit Mode
  const handleToggleEditMode = useCallback(() => {
    setPreviewMode(state.previewMode === 'preview' ? 'edit' : 'preview');
  }, [state.previewMode, setPreviewMode]);

  // v4.0: Color change handlers for selected elements
  const handleColorChange = useCallback((color: string) => {
    const selected = state.selectedElement;
    if (!selected) return;

    switch (selected.type) {
      case 'header':
        updateSettings({
          ...state.currentSettings,
          colors: {
            ...state.currentSettings.colors,
            eventTitleText: color,
          },
        });
        break;

      case 'table':
        // Change table header background color
        updateSettings({
          ...state.currentSettings,
          colors: {
            ...state.currentSettings.colors,
            headerBg: color,
          },
        });
        break;

      case 'customTextOverlay':
        // Find and update the overlay
        const overlayId = selected.id;
        const overlay = state.currentSettings.customTextOverlays?.find(o => o.id === overlayId);
        if (overlay) {
          updateCustomTextOverlay(overlayId, {
            ...overlay,
            color,
          });
        }
        break;
    }
  }, [state.selectedElement, state.currentSettings, updateSettings, updateCustomTextOverlay]);

  // In edit mode, render EnhancedHTMLEditor directly without Card wrapper
  if (state.previewMode === 'edit') {
    return (
      <div className="flex flex-col h-full w-full">
        <EditorErrorBoundary>
          <EnhancedHTMLEditor
            settings={state.currentSettings}
            sampleData={sampleData}
            zoom={state.previewZoom}
            onBack={() => setPreviewMode('preview')}
          />
        </EditorErrorBoundary>
      </div>
    );
  }

  // Preview mode: Show Card with header and preview image
  return (
    <Card className={cn(
      "flex flex-col h-full",
      isFullscreen && "fixed inset-0 z-50 rounded-none"
    )}>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">معاينة PDF</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              معاينة مباشرة للتغييرات
            </p>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              disabled={currentZoomIndex === 0 || isLoading}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleResetZoom}
              disabled={isLoading}
              className="min-w-[80px]"
            >
              {Math.round(state.previewZoom * 100)}%
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              disabled={currentZoomIndex === zoomLevels.length - 1 || isLoading}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn(
                "w-4 h-4",
                isLoading && "animate-spin"
              )} />
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleToggleFullscreen}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Edit Mode Button - Opens Advanced Editor */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleToggleEditMode}
              disabled={isLoading}
              className="gap-2 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
            >
              <Edit3 className="w-4 h-4" />
              <span>تحرير متقدم</span>
            </Button>
          </div>
        </div>

        {/* Desktop recommendation hint */}
        <p className="text-xs text-muted-foreground mt-2 sm:hidden flex items-center gap-1.5 px-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          استخدام الكمبيوتر يعطيك تجربة أفضل في التحرير التفاعلي
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 relative">
        <ScrollArea className="h-full">
          <div className="p-6">
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  جاري إنشاء المعاينة...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="p-4 rounded-full bg-destructive/10">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRefresh}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    إعادة المحاولة
                  </Button>
                </div>
              </div>
            )}

            {/* Preview Content - Static Image Only (Edit mode handled above) */}
            {!isLoading && !error && previewUrl && (
              <div className="flex justify-center">
                <div
                  className="relative bg-white shadow-2xl rounded-lg overflow-hidden"
                  style={{
                    transform: `scale(${state.previewZoom})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="PDF Preview"
                    className="max-w-full h-auto"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />

                  {/* Watermark */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-xs font-medium">
                    معاينة
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!previewUrl && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="p-4 rounded-full bg-muted">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium">
                    لا توجد معاينة
                  </p>
                  <p className="text-xs text-muted-foreground">
                    قم بتعديل الإعدادات لرؤية المعاينة
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Loading Overlay */}
        {isLoading && previewUrl && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-background border rounded-lg p-4 shadow-lg flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm font-medium">جاري التحديث...</span>
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Settings Info Footer */}
      <div className="border-t px-6 py-3 bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>
              الصفحة: {state.currentSettings.page.size.toUpperCase()} 
              ({state.currentSettings.page.orientation === 'landscape' ? 'أفقي' : 'عمودي'})
            </span>
            <span>•</span>
            <span>
              الخط: {state.currentSettings.fonts.family}
            </span>
          </div>
          
          {state.isDirty && (
            <span className="text-orange-500 font-medium">
              • تم التعديل
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

// Import FileText icon
import { FileText } from 'lucide-react';

