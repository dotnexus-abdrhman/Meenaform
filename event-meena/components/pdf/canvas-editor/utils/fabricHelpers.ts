/**
 * Fabric.js Helper Functions
 *
 * Utility functions for working with Fabric.js canvas.
 *
 * @version 5.0.0
 * @date 2025-11-12
 */

import * as fabric from 'fabric';
import html2canvas from 'html2canvas';

/**
 * Create Arabic text with proper RTL support
 */
export function createArabicText(text: string, options: any): any {
  const textObj = new fabric.IText(text, {
    ...options,
    direction: 'rtl',
    charSpacing: 0,
    lineHeight: 1.2,
    // Fabric.js text rendering optimizations
    objectCaching: true,
    statefullCache: true,
  });

  return textObj;
}

/**
 * Setup grid on canvas
 */
export function setupGrid(canvas: any, gridSize: number = 10): void {
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  // Remove existing grid if any
  const existingGrid = canvas.getObjects().filter((obj: any) => obj.id === 'grid');
  existingGrid.forEach((obj: any) => canvas.remove(obj));

  // Create vertical lines
  for (let i = 0; i < width / gridSize; i++) {
    const line = new fabric.Line([i * gridSize, 0, i * gridSize, height], {
      stroke: '#e5e7eb',
      strokeWidth: 1,
      selectable: false,
      evented: false,
      excludeFromExport: true,
    } as any);
    (line as any).id = 'grid';
    canvas.add(line);
    canvas.sendObjectToBack(line);
  }

  // Create horizontal lines
  for (let i = 0; i < height / gridSize; i++) {
    const line = new fabric.Line([0, i * gridSize, width, i * gridSize], {
      stroke: '#e5e7eb',
      strokeWidth: 1,
      selectable: false,
      evented: false,
      excludeFromExport: true,
    } as any);
    (line as any).id = 'grid';
    canvas.add(line);
    canvas.sendObjectToBack(line);
  }

  canvas.renderAll();
}

/**
 * Remove grid from canvas
 */
export function removeGrid(canvas: any): void {
  const gridLines = canvas.getObjects().filter((obj: any) => obj.id === 'grid');
  gridLines.forEach((obj: any) => canvas.remove(obj));
  canvas.renderAll();
}

/**
 * Setup guidelines (alignment helpers)
 */
export function setupGuidelines(canvas: any): void {
  let verticalLine: any | null = null;
  let horizontalLine: any | null = null;

  canvas.on('object:moving', (e: any) => {
    const obj = e.target;
    if (!obj) return;
    
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const objLeft = obj.left || 0;
    const objTop = obj.top || 0;
    const objWidth = obj.getScaledWidth();
    const objHeight = obj.getScaledHeight();
    const objCenterX = objLeft + objWidth / 2;
    const objCenterY = objTop + objHeight / 2;
    
    const threshold = 5; // Snap threshold in pixels
    
    // Check for center alignment
    if (Math.abs(objCenterX - canvasWidth / 2) < threshold) {
      // Show vertical center line
      if (!verticalLine) {
        verticalLine = new fabric.Line(
          [canvasWidth / 2, 0, canvasWidth / 2, canvasHeight],
          {
            stroke: '#ff00ff',
            strokeWidth: 1,
            selectable: false,
            evented: false,
            strokeDashArray: [5, 5],
          }
        );
        canvas.add(verticalLine);
      }
      
      // Snap to center
      obj.set({ left: canvasWidth / 2 - objWidth / 2 });
    } else if (verticalLine) {
      canvas.remove(verticalLine);
      verticalLine = null;
    }
    
    if (Math.abs(objCenterY - canvasHeight / 2) < threshold) {
      // Show horizontal center line
      if (!horizontalLine) {
        horizontalLine = new fabric.Line(
          [0, canvasHeight / 2, canvasWidth, canvasHeight / 2],
          {
            stroke: '#ff00ff',
            strokeWidth: 1,
            selectable: false,
            evented: false,
            strokeDashArray: [5, 5],
          }
        );
        canvas.add(horizontalLine);
      }
      
      // Snap to center
      obj.set({ top: canvasHeight / 2 - objHeight / 2 });
    } else if (horizontalLine) {
      canvas.remove(horizontalLine);
      horizontalLine = null;
    }
    
    canvas.renderAll();
  });
  
  canvas.on('object:modified', () => {
    if (verticalLine) {
      canvas.remove(verticalLine);
      verticalLine = null;
    }
    if (horizontalLine) {
      canvas.remove(horizontalLine);
      horizontalLine = null;
    }
    canvas.renderAll();
  });
}

/**
 * Helper function to darken a color
 */
function darkenColor(color: string, percent: number): string {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Darken
  const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
  const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
  const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Helper function to lighten a color
 */
function lightenColor(color: string, percent: number): string {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Lighten
  const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Create a table on canvas with enhanced styling (gradients, shadows, rounded corners)
 */
export function createTable(
  canvas: any,
  data: {
    headers: string[];
    rows: any[];
    x: number;
    y: number;
    width: number;
    cellHeight?: number;
    headerBg?: string;
    headerText?: string;
    rowBg?: string;
    rowText?: string;
    borderColor?: string;
    alternateRowBg?: string;
    fontFamily?: string;
    fontSize?: number;
  }
): any {
  const {
    headers,
    rows,
    x,
    y,
    width,
    cellHeight = 40,
    headerBg = '#3b82f6',
    headerText = '#ffffff',
    rowBg = '#ffffff',
    rowText = '#000000',
    borderColor = '#e5e7eb',
    alternateRowBg = '#f8fafc',
    fontFamily = 'Cairo',
    fontSize = 14,
  } = data;

  const colWidth = width / headers.length;
  const group: any[] = [];

  // Create gradient for header
  const headerGradient = new fabric.Gradient({
    type: 'linear',
    coords: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: cellHeight,
    },
    colorStops: [
      { offset: 0, color: headerBg },
      { offset: 0.5, color: headerBg },
      { offset: 1, color: darkenColor(headerBg, 12) },
    ],
  } as any);

  // Create header row with enhanced styling
  headers.forEach((header, colIndex) => {
    const cellX = x + colIndex * colWidth;
    const isFirstCol = colIndex === 0;
    const isLastCol = colIndex === headers.length - 1;

    // Header cell background with gradient and rounded corners
    const headerRect = new fabric.Rect({
      left: cellX,
      top: y,
      width: colWidth,
      height: cellHeight,
      fill: headerGradient,
      stroke: borderColor,
      strokeWidth: 1,
      // Add rounded corners only to first and last columns
      rx: isFirstCol || isLastCol ? 12 : 0,
      ry: isFirstCol || isLastCol ? 12 : 0,
      selectable: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0, 0, 0, 0.08)',
        blur: 8,
        offsetX: 0,
        offsetY: 2,
      } as any),
    } as any);
    group.push(headerRect);

    // Header text with better positioning (padding)
    const headerTextObj = createArabicText(header, {
      left: cellX + colWidth / 2,
      top: y + cellHeight / 2,
      fontSize: fontSize + 1,
      fontWeight: 'bold',
      fill: headerText,
      fontFamily: fontFamily,
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });
    group.push(headerTextObj);
  });

  // Create data rows with zebra striping and enhanced styling
  rows.forEach((row, rowIndex) => {
    const rowY = y + cellHeight * (rowIndex + 1);
    const isEvenRow = rowIndex % 2 === 0;
    const isLastRow = rowIndex === rows.length - 1;

    // Alternate row colors for zebra striping
    const currentRowBg = isEvenRow ? rowBg : alternateRowBg;

    headers.forEach((header, colIndex) => {
      const cellX = x + colIndex * colWidth;
      const cellValue = row[header] || '';
      const isFirstCol = colIndex === 0;
      const isLastCol = colIndex === headers.length - 1;

      // Row cell background with subtle shadow and rounded corners for last row
      const cellRect = new fabric.Rect({
        left: cellX,
        top: rowY,
        width: colWidth,
        height: cellHeight,
        fill: currentRowBg,
        stroke: borderColor,
        strokeWidth: 0.5,
        // Add rounded corners only to bottom corners of last row
        rx: isLastRow && (isFirstCol || isLastCol) ? 12 : 0,
        ry: isLastRow && (isFirstCol || isLastCol) ? 12 : 0,
        selectable: false,
      } as any);
      group.push(cellRect);

      // Cell text with better positioning (padding)
      const cellTextObj = createArabicText(String(cellValue), {
        left: cellX + colWidth / 2,
        top: rowY + cellHeight / 2,
        fontSize: fontSize - 1,
        fill: rowText,
        fontFamily: fontFamily,
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        selectable: false,
      });
      group.push(cellTextObj);
    });
  });

  // Create group with enhanced shadow for the entire table
  const tableGroup = new fabric.Group(group, {
    left: x,
    top: y,
    selectable: true,
    hasControls: true,
    shadow: new fabric.Shadow({
      color: 'rgba(0, 0, 0, 0.12)',
      blur: 20,
      offsetX: 0,
      offsetY: 4,
    } as any),
  } as any);

  (tableGroup as any).type = 'table';
  (tableGroup as any).id = `table-${Date.now()}`;

  canvas.add(tableGroup);
  return tableGroup;
}

/**
 * Generate HTML for table (same as preview)
 */
export function generateTableHTML(
  table: {
    title?: string;
    headers: string[];
    rows: any[];
  },
  settings: any
): string {
  const cellPaddingV = settings.spacing?.cellPadding?.vertical || 12;
  const cellPaddingH = settings.spacing?.cellPadding?.horizontal || 16;
  const headerBg = settings.colors?.headerBg || '#3b82f6';
  const headerText = settings.colors?.headerText || '#ffffff';
  const textColor = settings.colors?.text || '#1e293b';
  const alternateRowBg = settings.colors?.alternateRowBg || '#f8fafc';
  const zebraStriping = settings.table?.zebraStriping !== false;
  const headerSize = settings.fonts?.sizes?.header || 16;
  const contentSize = settings.fonts?.sizes?.content || 14;
  const headerWeight = settings.fonts?.weights?.header || 'bold';
  const contentWeight = settings.fonts?.weights?.content || 'normal';
  const tableTitleBg = settings.colors?.tableTitleBg || '#f0f9ff';
  const tableTitleText = settings.colors?.tableTitleText || '#1e40af';
  const tableTitleSize = settings.fonts?.sizes?.tableTitle || 20;
  const tableTitleWeight = settings.fonts?.weights?.tableTitle || 'bold';
  const tableTitleMargin = settings.spacing?.titleMargins?.tableTitle || 16;
  const primary = settings.colors?.primary || '#3b82f6';

  let html = '';

  // Table title (if exists)
  if (table.title) {
    html += `
      <div style="
        text-align: right;
        margin-bottom: ${tableTitleMargin}px;
        padding: 24px 36px;
        background: ${tableTitleBg};
        border-right: 5px solid ${primary};
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      ">
        <h2 style="
          font-size: ${tableTitleSize}px;
          font-weight: ${tableTitleWeight};
          color: ${tableTitleText};
          margin: 0;
          font-family: ${settings.fonts?.family || 'Cairo'};
          direction: rtl;
          unicode-bidi: bidi-override;
          line-height: 1.5;
        ">${table.title}</h2>
      </div>
    `;
  }

  // Table
  html += `
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
        <tr style="background: ${headerBg};">
          ${table.headers.map(header => `
            <th style="
              padding: ${cellPaddingV + 4}px ${cellPaddingH}px;
              border: none;
              border-bottom: 2px solid rgba(255, 255, 255, 0.2);
              text-align: center;
              color: ${headerText};
              font-weight: ${headerWeight};
              font-size: ${headerSize}px;
              direction: rtl;
              unicode-bidi: bidi-override;
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
            background-color: ${zebraStriping && index % 2 === 1 ? alternateRowBg : '#ffffff'};
          ">
            ${table.headers.map(header => `
              <td style="
                padding: ${cellPaddingV}px ${cellPaddingH}px;
                border: none;
                border-bottom: 1px solid #e2e8f0;
                text-align: center;
                color: ${textColor};
                font-weight: ${contentWeight};
                font-size: ${contentSize}px;
                direction: rtl;
                unicode-bidi: bidi-override;
                text-rendering: optimizeLegibility;
                white-space: pre-wrap;
                line-height: 1.6;
              ">${row[header] || '-'}</td>
            `).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  return html;
}

/**
 * Convert HTML table to image using html2canvas
 */
export async function convertTableHTMLToImage(
  tableHTML: string,
  settings: any
): Promise<string> {
  // Create temporary container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.fontFamily = settings.fonts?.family || 'Cairo';
  container.style.direction = 'rtl';
  container.style.backgroundColor = '#ffffff';
  container.style.padding = '20px';
  container.innerHTML = tableHTML;

  document.body.appendChild(container);

  try {
    // Convert to canvas with high quality settings
    const canvas = await html2canvas(container, {
      scale: 3, // Higher scale for better quality (was 2)
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      // Additional quality improvements
      windowWidth: container.scrollWidth,
      windowHeight: container.scrollHeight,
      width: container.scrollWidth,
      height: container.scrollHeight,
    });

    // Convert to data URL
    const dataURL = canvas.toDataURL('image/png', 1.0);

    // Cleanup
    document.body.removeChild(container);

    return dataURL;
  } catch (error) {
    // Cleanup on error
    if (container.parentNode) {
      document.body.removeChild(container);
    }
    throw error;
  }
}

/**
 * Export canvas to data URL
 */
export function exportCanvasToDataURL(
  canvas: any,
  format: 'png' | 'jpeg' = 'png',
  quality: number = 1.0
): string {
  // Hide grid before export
  const gridLines = canvas.getObjects().filter((obj: any) => obj.id === 'grid');
  gridLines.forEach((obj: any) => obj.set({ visible: false }));

  const dataURL = canvas.toDataURL({
    format,
    quality,
    multiplier: 2, // Higher resolution
  });

  // Show grid again
  gridLines.forEach((obj: any) => obj.set({ visible: true }));
  canvas.renderAll();

  return dataURL;
}

