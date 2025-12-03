/**
 * PDF Template Validator
 * 
 * Validates imported PDF templates to ensure they have correct structure.
 * Prevents errors from malformed or corrupted template files.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

import { PDFEditorSettings, AVAILABLE_FONTS } from '@/types/pdf-editor';

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate PDF editor settings structure
 */
export function validatePDFSettings(data: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if data exists
  if (!data || typeof data !== 'object') {
    errors.push('البيانات غير صالحة أو فارغة');
    return { isValid: false, errors, warnings };
  }

  // Validate page settings
  if (!data.page || typeof data.page !== 'object') {
    errors.push('إعدادات الصفحة مفقودة');
  } else {
    if (!['landscape', 'portrait'].includes(data.page.orientation)) {
      errors.push('اتجاه الصفحة غير صالح');
    }
    if (!['a4', 'a3', 'letter', 'legal', 'custom'].includes(data.page.size)) {
      errors.push('حجم الصفحة غير صالح');
    }
    if (!data.page.margins || typeof data.page.margins !== 'object') {
      errors.push('هوامش الصفحة مفقودة');
    } else {
      const margins = ['top', 'right', 'bottom', 'left'];
      margins.forEach(margin => {
        if (typeof data.page.margins[margin] !== 'number') {
          errors.push(`هامش ${margin} غير صالح`);
        }
      });
    }
    if (typeof data.page.backgroundColor !== 'string' || !data.page.backgroundColor.match(/^#[0-9A-Fa-f]{6}$/)) {
      warnings.push('لون خلفية الصفحة غير صالح، سيتم استخدام القيمة الافتراضية');
    }
  }

  // Validate fonts settings
  if (!data.fonts || typeof data.fonts !== 'object') {
    errors.push('إعدادات الخطوط مفقودة');
  } else {
    // Validate font family
    const validFonts = AVAILABLE_FONTS.map(f => f.value);
    if (!validFonts.includes(data.fonts.family)) {
      warnings.push('نوع الخط غير صالح، سيتم استخدام Arial');
    }

    // Validate font sizes
    if (!data.fonts.sizes || typeof data.fonts.sizes !== 'object') {
      errors.push('أحجام الخطوط مفقودة');
    } else {
      const sizeKeys = ['eventTitle', 'tableTitle', 'header', 'content', 'info', 'footer'];
      sizeKeys.forEach(key => {
        if (typeof data.fonts.sizes[key] !== 'number' || data.fonts.sizes[key] < 8 || data.fonts.sizes[key] > 100) {
          warnings.push(`حجم الخط ${key} غير صالح`);
        }
      });
    }

    // Validate font weights
    if (!data.fonts.weights || typeof data.fonts.weights !== 'object') {
      errors.push('أوزان الخطوط مفقودة');
    } else {
      const weightKeys = ['eventTitle', 'tableTitle', 'header', 'content'];
      const validWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
      weightKeys.forEach(key => {
        if (!validWeights.includes(data.fonts.weights[key])) {
          warnings.push(`وزن الخط ${key} غير صالح`);
        }
      });
    }
  }

  // Validate colors settings
  if (!data.colors || typeof data.colors !== 'object') {
    errors.push('إعدادات الألوان مفقودة');
  } else {
    const colorKeys = [
      'primary', 'secondary', 'text', 'border',
      'eventTitleBg', 'eventTitleText',
      'tableTitleBg', 'tableTitleText',
      'headerBg', 'headerText',
      'alternateRowBg'
    ];
    colorKeys.forEach(key => {
      if (typeof data.colors[key] !== 'string' || !data.colors[key].match(/^#[0-9A-Fa-f]{6}$/)) {
        warnings.push(`اللون ${key} غير صالح`);
      }
    });
  }

  // Validate spacing settings
  if (!data.spacing || typeof data.spacing !== 'object') {
    errors.push('إعدادات المسافات مفقودة');
  } else {
    if (typeof data.spacing.tableSeparation !== 'number' || data.spacing.tableSeparation < 0) {
      warnings.push('مسافة الفصل بين الجداول غير صالحة');
    }
    if (!data.spacing.containerPadding || typeof data.spacing.containerPadding !== 'object') {
      warnings.push('حشو الحاوية مفقود');
    }
    if (!data.spacing.cellPadding || typeof data.spacing.cellPadding !== 'object') {
      warnings.push('حشو الخلايا مفقود');
    }
    if (!data.spacing.titleMargins || typeof data.spacing.titleMargins !== 'object') {
      warnings.push('هوامش العناوين مفقودة');
    }
  }

  // Validate table settings
  if (!data.table || typeof data.table !== 'object') {
    errors.push('إعدادات الجداول مفقودة');
  } else {
    if (!data.table.border || typeof data.table.border !== 'object') {
      warnings.push('إعدادات حدود الجدول مفقودة');
    } else {
      if (typeof data.table.border.width !== 'number' || data.table.border.width < 0 || data.table.border.width > 10) {
        warnings.push('عرض حدود الجدول غير صالح');
      }
      if (!['solid', 'dashed', 'dotted'].includes(data.table.border.style)) {
        warnings.push('نمط حدود الجدول غير صالح');
      }
    }
    if (!['auto', 'fixed', 'custom'].includes(data.table.columnWidthMode)) {
      warnings.push('وضع عرض الأعمدة غير صالح');
    }
    if (typeof data.table.zebraStriping !== 'boolean') {
      warnings.push('إعداد الصفوف المتناوبة غير صالح');
    }
  }

  // Validate advanced settings
  if (!data.advanced || typeof data.advanced !== 'object') {
    errors.push('الإعدادات المتقدمة مفقودة');
  } else {
    if (!['low', 'medium', 'high'].includes(data.advanced.quality)) {
      warnings.push('جودة التصدير غير صالحة');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Sanitize and fix common issues in imported settings
 */
export function sanitizePDFSettings(data: any): Partial<PDFEditorSettings> {
  const sanitized: any = { ...data };

  // Fix colors - ensure they have # prefix
  if (sanitized.colors) {
    Object.keys(sanitized.colors).forEach(key => {
      if (typeof sanitized.colors[key] === 'string' && !sanitized.colors[key].startsWith('#')) {
        sanitized.colors[key] = '#' + sanitized.colors[key];
      }
    });
  }

  // Fix font weights - ensure they are valid numbers
  if (sanitized.fonts?.weights) {
    const validWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    Object.keys(sanitized.fonts.weights).forEach(key => {
      const weight = sanitized.fonts.weights[key];
      if (!validWeights.includes(weight)) {
        // Find closest valid weight
        sanitized.fonts.weights[key] = validWeights.reduce((prev, curr) => 
          Math.abs(curr - weight) < Math.abs(prev - weight) ? curr : prev
        );
      }
    });
  }

  // Fix page size - ensure it's lowercase
  if (sanitized.page?.size) {
    sanitized.page.size = sanitized.page.size.toLowerCase();
  }

  // Fix orientation - ensure it's lowercase
  if (sanitized.page?.orientation) {
    sanitized.page.orientation = sanitized.page.orientation.toLowerCase();
  }

  return sanitized;
}

/**
 * Create a safe filename for template export
 */
export function createTemplateFilename(templateName: string): string {
  const safeName = templateName
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, '') // Keep Arabic, English, numbers, spaces, hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase();
  
  const timestamp = new Date().toISOString().split('T')[0];
  return `pdf-template-${safeName}-${timestamp}.json`;
}

