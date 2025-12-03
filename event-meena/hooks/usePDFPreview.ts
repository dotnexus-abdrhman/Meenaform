/**
 * PDF Preview Hook
 * 
 * Custom hook for managing PDF preview generation and state.
 * Handles debouncing, memoization, and preview updates.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { PDFEditorSettings } from '@/types/pdf-editor';
import html2canvas from 'html2canvas';
import { performanceMonitor } from '@/lib/pdf-performance';

interface UsePDFPreviewOptions {
  /** Current PDF settings */
  settings: PDFEditorSettings;
  
  /** Sample data for preview */
  sampleData?: {
    eventTitle: string;
    tables: Array<{
      title: string;
      headers: string[];
      rows: Array<Record<string, string>>;
    }>;
  };
  
  /** Debounce delay in ms */
  debounceDelay?: number;
}

interface UsePDFPreviewReturn {
  /** Preview image data URL */
  previewUrl: string | null;
  
  /** Loading state */
  isLoading: boolean;
  
  /** Error state */
  error: string | null;
  
  /** Manually trigger preview regeneration */
  regeneratePreview: () => void;
  
  /** Clear preview */
  clearPreview: () => void;
}

/**
 * Hook for managing PDF preview
 */
export function usePDFPreview({
  settings,
  sampleData,
  debounceDelay = 500,
}: UsePDFPreviewOptions): UsePDFPreviewReturn {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for debouncing
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  /**
   * Generate preview from settings
   */
  const generatePreview = useCallback(async () => {
    try {
      performanceMonitor.start('preview-generation');
      setIsLoading(true);
      setError(null);

      // Create temporary container
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '3500px';
      container.style.padding = `${settings.spacing.containerPadding.vertical}px ${settings.spacing.containerPadding.horizontal}px`;
      container.style.fontFamily = settings.fonts.family;
      container.style.direction = 'rtl';
      container.style.backgroundColor = settings.page.backgroundColor;
      container.style.zIndex = '-9999';

      // v9.1: Fix Arabic text rendering
      container.style.unicodeBidi = "embed";
      (container.style as any).textRendering = "optimizeLegibility";
      (container.style as any).webkitFontSmoothing = "antialiased";
      (container.style as any).mozOsxFontSmoothing = "grayscale";
      
      // Build HTML content
      let htmlContent = '';

      // Event title (if sample data provided) - v10.0 design with customizable colors
      if (sampleData?.eventTitle) {
        htmlContent += `
          <div style="
            position: relative;
            text-align: center;
            margin-bottom: ${settings.spacing.titleMargins.eventTitle}px;
            padding: 48px 60px;
            background: ${settings.colors.eventTitleBg};
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              top: 0;
              right: 0;
              width: 100%;
              height: 6px;
              background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
            "></div>
            <h1 style="
              font-size: ${settings.fonts.sizes.eventTitle}px;
              font-weight: ${settings.fonts.weights.eventTitle};
              color: ${settings.colors.eventTitleText};
              margin: 0;
              font-family: ${settings.fonts.family};
              direction: rtl;
              unicode-bidi: bidi-override;
              line-height: 1.5;
              letter-spacing: 0;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              white-space: pre-wrap;
              word-break: keep-all;
            ">${sampleData.eventTitle}</h1>
          </div>
        `;
      }

      // Header Text (Custom Text) - v2.0
      if (settings.customTexts.header.enabled && settings.customTexts.header.text) {
        const textAlign = settings.customTexts.header.alignment === 'right' ? 'right' :
                         settings.customTexts.header.alignment === 'left' ? 'left' : 'center';
        htmlContent += `
          <div style="
            text-align: ${textAlign};
            margin-bottom: ${settings.customTexts.header.marginBottom}px;
            padding: 20px 30px;
            background-color: rgba(248, 250, 252, 0.5);
            border-radius: 8px;
          ">
            <p style="
              font-size: ${settings.customTexts.header.fontSize}px;
              color: ${settings.customTexts.header.color};
              font-weight: ${settings.customTexts.header.bold ? '700' : '400'};
              font-style: ${settings.customTexts.header.italic ? 'italic' : 'normal'};
              margin: 0;
              font-family: ${settings.fonts.family};
              direction: rtl;
              unicode-bidi: bidi-override;
              line-height: 1.8;
              white-space: pre-wrap;
            ">${settings.customTexts.header.text}</p>
          </div>
        `;
      }

      // Sample table (if sample data provided)
      if (sampleData?.tables && sampleData.tables.length > 0) {
        const table = sampleData.tables[0];

        // Table title - v10.0 design with customizable colors
        htmlContent += `
          <div style="
            text-align: right;
            margin-bottom: ${settings.spacing.titleMargins.tableTitle}px;
            margin-top: 60px;
            padding: 24px 36px;
            background: ${settings.colors.tableTitleBg};
            border-right: 5px solid ${settings.colors.primary};
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          ">
            <h2 style="
              font-size: ${settings.fonts.sizes.tableTitle}px;
              font-weight: ${settings.fonts.weights.tableTitle};
              color: ${settings.colors.tableTitleText};
              margin: 0;
              font-family: ${settings.fonts.family};
              direction: rtl;
              unicode-bidi: bidi-override;
              line-height: 1.5;
              letter-spacing: 0;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              white-space: pre-wrap;
              word-break: keep-all;
            ">${table.title}</h2>
          </div>
        `;
        
        // Table - v9.0 design
        htmlContent += `
          <table style="
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            direction: rtl;
          ">
            <thead>
              <tr style="
                background: ${settings.colors.headerBg};
              ">
                ${table.headers.map(header => `
                  <th style="
                    padding: ${settings.spacing.cellPadding.vertical + 4}px ${settings.spacing.cellPadding.horizontal}px;
                    border: none;
                    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
                    text-align: center;
                    color: ${settings.colors.headerText};
                    font-weight: ${settings.fonts.weights.header};
                    font-size: ${settings.fonts.sizes.header}px;
                    direction: rtl;
                    unicode-bidi: bidi-override;
                    letter-spacing: 0;
                    text-rendering: optimizeLegibility;
                    -webkit-font-smoothing: antialiased;
                    white-space: nowrap;
                  ">${header}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${table.rows.map((row, index) => `
                <tr style="
                  background-color: ${settings.table.zebraStriping && index % 2 === 1
                    ? settings.colors.alternateRowBg
                    : '#ffffff'
                  };
                  transition: background-color 0.2s;
                ">
                  ${table.headers.map(header => {
                    const cellValue = row[header] || '-';
                    const isSignature = cellValue.startsWith?.('data:image');
                    const cellContent = isSignature
                      ? `<img src="${cellValue}" style="max-width: 180px; max-height: 70px; object-fit: contain; display: block; margin: 0 auto;" alt="توقيع" />`
                      : cellValue;
                    return `
                    <td style="
                      padding: ${settings.spacing.cellPadding.vertical}px ${settings.spacing.cellPadding.horizontal}px;
                      border: none;
                      border-bottom: 1px solid #e2e8f0;
                      text-align: center;
                      color: ${settings.colors.text};
                      font-weight: ${settings.fonts.weights.content};
                      font-size: ${settings.fonts.sizes.content}px;
                      direction: rtl;
                      unicode-bidi: bidi-override;
                      text-rendering: optimizeLegibility;
                      white-space: pre-wrap;
                      line-height: 1.6;
                      vertical-align: middle;
                    ">${cellContent}</td>
                  `}).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }

      // Footer Text (Custom Text) - v2.0
      if (settings.customTexts.footer.enabled && settings.customTexts.footer.text) {
        const textAlign = settings.customTexts.footer.alignment === 'right' ? 'right' :
                         settings.customTexts.footer.alignment === 'left' ? 'left' : 'center';
        htmlContent += `
          <div style="
            text-align: ${textAlign};
            margin-top: ${settings.customTexts.footer.marginTop}px;
            padding: 20px 30px;
            background-color: rgba(248, 250, 252, 0.5);
            border-radius: 8px;
            border-top: 2px solid #e2e8f0;
          ">
            <p style="
              font-size: ${settings.customTexts.footer.fontSize}px;
              color: ${settings.customTexts.footer.color};
              font-weight: ${settings.customTexts.footer.bold ? '700' : '400'};
              font-style: ${settings.customTexts.footer.italic ? 'italic' : 'normal'};
              margin: 0;
              font-family: ${settings.fonts.family};
              direction: rtl;
              unicode-bidi: bidi-override;
              line-height: 1.8;
              white-space: pre-wrap;
            ">${settings.customTexts.footer.text}</p>
          </div>
        `;
      }

      container.innerHTML = htmlContent;
      document.body.appendChild(container);

      // Custom Text Overlays - v3.0 (Phase 5)
      // Add custom text overlays as absolutely positioned elements
      const overlays = settings.customTextOverlays || [];
      const visibleOverlays = overlays.filter(overlay => overlay.visible !== false);

      if (visibleOverlays.length > 0) {
        // Sort by zIndex (lower first, so higher zIndex appears on top)
        const sortedOverlays = [...visibleOverlays].sort((a, b) =>
          (a.zIndex || 0) - (b.zIndex || 0)
        );

        sortedOverlays.forEach(overlay => {
          const overlayDiv = document.createElement('div');

          // Convert mm to pixels (assuming 96 DPI: 1mm ≈ 3.7795px)
          const mmToPx = 3.7795;
          const xPx = overlay.position.x * mmToPx;
          const yPx = overlay.position.y * mmToPx;

          // Apply styles
          overlayDiv.style.position = 'absolute';
          overlayDiv.style.left = `${xPx}px`;
          overlayDiv.style.top = `${yPx}px`;
          overlayDiv.style.fontSize = `${overlay.fontSize}px`;
          overlayDiv.style.color = overlay.color;
          overlayDiv.style.fontWeight = overlay.fontWeight.toString();
          overlayDiv.style.textAlign = overlay.textAlign;
          overlayDiv.style.fontFamily = overlay.fontFamily || settings.fonts.family;
          overlayDiv.style.direction = 'rtl';
          overlayDiv.style.unicodeBidi = 'embed';
          overlayDiv.style.whiteSpace = 'pre-wrap';
          overlayDiv.style.lineHeight = '1.6';
          overlayDiv.style.zIndex = (overlay.zIndex || 0).toString();

          // Optional properties
          if (overlay.rotation) {
            overlayDiv.style.transform = `rotate(${overlay.rotation}deg)`;
            overlayDiv.style.transformOrigin = 'top right';
          }

          if (overlay.opacity !== undefined) {
            overlayDiv.style.opacity = overlay.opacity.toString();
          }

          if (overlay.backgroundColor) {
            overlayDiv.style.backgroundColor = overlay.backgroundColor;
            overlayDiv.style.padding = '8px 12px';
            overlayDiv.style.borderRadius = '4px';
          }

          // Set content
          overlayDiv.textContent = overlay.content;

          // Append to container
          container.appendChild(overlayDiv);
        });
      }
      containerRef.current = container;
      
      // Generate canvas
      const canvas = await html2canvas(container, {
        scale: 2, // Medium quality for preview
        useCORS: true,
        allowTaint: true,
        backgroundColor: settings.page.backgroundColor,
        logging: false,
        width: 3500,
        windowWidth: 3500,
      });
      
      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png', 0.8);
      setPreviewUrl(dataUrl);

      // Cleanup - Safe removal with check
      if (container && container.parentNode === document.body) {
        document.body.removeChild(container);
      }
      containerRef.current = null;

      performanceMonitor.end('preview-generation');
      performanceMonitor.measureMemory();
      setIsLoading(false);
    } catch (err) {
      console.error('Preview generation error:', err);
      setError('فشل إنشاء المعاينة');
      setIsLoading(false);
      performanceMonitor.end('preview-generation');

      // Cleanup on error
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    }
  }, [settings, sampleData]);
  
  /**
   * Debounced preview generation
   */
  const debouncedGeneratePreview = useCallback(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      generatePreview();
    }, debounceDelay);
  }, [generatePreview, debounceDelay]);
  
  /**
   * Manually trigger preview regeneration
   */
  const regeneratePreview = useCallback(() => {
    generatePreview();
  }, [generatePreview]);
  
  /**
   * Clear preview
   */
  const clearPreview = useCallback(() => {
    setPreviewUrl(null);
    setError(null);
  }, []);
  
  // Auto-generate preview when settings change
  useEffect(() => {
    debouncedGeneratePreview();
    
    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, [debouncedGeneratePreview]);
  
  return {
    previewUrl,
    isLoading,
    error,
    regeneratePreview,
    clearPreview,
  };
}

