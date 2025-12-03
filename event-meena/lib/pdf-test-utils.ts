/**
 * PDF Test Utilities
 * 
 * Utilities for testing PDF editor functionality.
 * Provides sample data, mock functions, and test helpers.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

import { PDFEditorSettings, DEFAULT_PDF_SETTINGS } from '@/types/pdf-editor';

/**
 * Sample event data for testing
 */
export const SAMPLE_EVENT_DATA = {
  eventTitle: 'مؤتمر التكنولوجيا السنوي 2025',
  eventId: 'test-event-123',
  components: [],
  responses: [],
  customTables: [
    {
      title: 'قائمة المشاركين',
      settings: {
        showHeader: true,
        headerColor: '#2563eb',
      },
      columns: [
        { id: 'name', label: 'الاسم', type: 'text' },
        { id: 'email', label: 'البريد الإلكتروني', type: 'email' },
        { id: 'phone', label: 'رقم الهاتف', type: 'tel' },
        { id: 'company', label: 'الشركة', type: 'text' },
      ],
      data: [
        { name: 'أحمد محمد', email: 'ahmed@example.com', phone: '0501234567', company: 'شركة التقنية' },
        { name: 'فاطمة علي', email: 'fatima@example.com', phone: '0507654321', company: 'مؤسسة الابتكار' },
        { name: 'محمد خالد', email: 'mohammed@example.com', phone: '0509876543', company: 'مجموعة النجاح' },
        { name: 'سارة أحمد', email: 'sara@example.com', phone: '0503456789', company: 'شركة المستقبل' },
        { name: 'عبدالله حسن', email: 'abdullah@example.com', phone: '0502345678', company: 'دار الإبداع' },
      ],
    },
    {
      title: 'جدول الفعاليات',
      settings: {
        showHeader: true,
        headerColor: '#16a34a',
      },
      columns: [
        { id: 'time', label: 'الوقت', type: 'text' },
        { id: 'activity', label: 'النشاط', type: 'text' },
        { id: 'speaker', label: 'المتحدث', type: 'text' },
        { id: 'location', label: 'المكان', type: 'text' },
      ],
      data: [
        { time: '09:00 - 10:00', activity: 'الافتتاح والترحيب', speaker: 'د. أحمد السعيد', location: 'القاعة الرئيسية' },
        { time: '10:00 - 11:30', activity: 'الذكاء الاصطناعي في التعليم', speaker: 'د. فاطمة النور', location: 'القاعة A' },
        { time: '11:30 - 13:00', activity: 'تطبيقات البلوك تشين', speaker: 'م. محمد الخالدي', location: 'القاعة B' },
        { time: '13:00 - 14:00', activity: 'استراحة الغداء', speaker: '-', location: 'صالة الطعام' },
        { time: '14:00 - 15:30', activity: 'أمن المعلومات', speaker: 'د. سارة المطيري', location: 'القاعة الرئيسية' },
      ],
    },
  ],
};

/**
 * Sample preview data
 */
export const SAMPLE_PREVIEW_DATA = {
  eventTitle: 'مؤتمر التكنولوجيا السنوي 2025',
  tables: [
    {
      title: 'قائمة المشاركين',
      headers: ['#', 'الاسم', 'البريد الإلكتروني', 'رقم الهاتف'],
      rows: [
        { '#': '1', 'الاسم': 'أحمد محمد', 'البريد الإلكتروني': 'ahmed@example.com', 'رقم الهاتف': '0501234567' },
        { '#': '2', 'الاسم': 'فاطمة علي', 'البريد الإلكتروني': 'fatima@example.com', 'رقم الهاتف': '0507654321' },
        { '#': '3', 'الاسم': 'محمد خالد', 'البريد الإلكتروني': 'mohammed@example.com', 'رقم الهاتف': '0509876543' },
      ],
    },
  ],
};

/**
 * Test settings variations
 */
export const TEST_SETTINGS_VARIATIONS: Record<string, Partial<PDFEditorSettings>> = {
  // Large fonts
  largeFonts: {
    fonts: {
      ...DEFAULT_PDF_SETTINGS.fonts,
      sizes: {
        eventTitle: 72,
        tableTitle: 60,
        header: 32,
        content: 28,
        info: 24,
        footer: 20,
      },
    },
  },
  
  // Small fonts
  smallFonts: {
    fonts: {
      ...DEFAULT_PDF_SETTINGS.fonts,
      sizes: {
        eventTitle: 36,
        tableTitle: 30,
        header: 18,
        content: 16,
        info: 14,
        footer: 12,
      },
    },
  },
  
  // Dark theme
  darkTheme: {
    colors: {
      primary: '#1e293b',
      secondary: '#334155',
      text: '#f1f5f9',
      border: '#475569',
      eventTitleBg: '#0f172a',
      eventTitleText: '#f1f5f9',
      tableTitleBg: '#1e293b',
      tableTitleText: '#f1f5f9',
      headerBg: '#334155',
      headerText: '#f1f5f9',
      alternateRowBg: '#1e293b',
    },
    page: {
      ...DEFAULT_PDF_SETTINGS.page,
      backgroundColor: '#0f172a',
    },
  },
  
  // Colorful theme
  colorfulTheme: {
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      text: '#1f2937',
      border: '#d1d5db',
      eventTitleBg: '#ec4899',
      eventTitleText: '#ffffff',
      tableTitleBg: '#8b5cf6',
      tableTitleText: '#ffffff',
      headerBg: '#06b6d4',
      headerText: '#ffffff',
      alternateRowBg: '#fef3c7',
    },
  },
  
  // Portrait orientation
  portrait: {
    page: {
      ...DEFAULT_PDF_SETTINGS.page,
      orientation: 'portrait',
    },
  },
  
  // A3 size
  a3Size: {
    page: {
      ...DEFAULT_PDF_SETTINGS.page,
      size: 'a3',
    },
  },
  
  // Large margins
  largeMargins: {
    page: {
      ...DEFAULT_PDF_SETTINGS.page,
      margins: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
  },
  
  // No zebra striping
  noZebraStriping: {
    table: {
      ...DEFAULT_PDF_SETTINGS.table,
      zebraStriping: false,
    },
  },
  
  // Thick borders
  thickBorders: {
    table: {
      ...DEFAULT_PDF_SETTINGS.table,
      border: {
        width: 3,
        style: 'solid',
        radius: 8,
      },
    },
  },
};

/**
 * Validate settings structure
 */
export function validateSettingsStructure(settings: any): boolean {
  const requiredKeys = ['page', 'fonts', 'colors', 'spacing', 'table', 'advanced'];
  
  for (const key of requiredKeys) {
    if (!(key in settings)) {
      console.error(`Missing required key: ${key}`);
      return false;
    }
  }
  
  return true;
}

/**
 * Compare two settings objects
 */
export function compareSettings(
  settings1: PDFEditorSettings,
  settings2: PDFEditorSettings
): string[] {
  const differences: string[] = [];
  
  // Compare page settings
  if (settings1.page.orientation !== settings2.page.orientation) {
    differences.push('page.orientation');
  }
  if (settings1.page.size !== settings2.page.size) {
    differences.push('page.size');
  }
  
  // Compare font sizes
  Object.keys(settings1.fonts.sizes).forEach(key => {
    if (settings1.fonts.sizes[key as keyof typeof settings1.fonts.sizes] !== 
        settings2.fonts.sizes[key as keyof typeof settings2.fonts.sizes]) {
      differences.push(`fonts.sizes.${key}`);
    }
  });
  
  // Compare colors
  Object.keys(settings1.colors).forEach(key => {
    if (settings1.colors[key as keyof typeof settings1.colors] !== 
        settings2.colors[key as keyof typeof settings2.colors]) {
      differences.push(`colors.${key}`);
    }
  });
  
  return differences;
}

/**
 * Generate random settings for stress testing
 */
export function generateRandomSettings(): PDFEditorSettings {
  const randomColor = () => {
    const colors = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0891b2'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const randomSize = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  return {
    ...DEFAULT_PDF_SETTINGS,
    fonts: {
      ...DEFAULT_PDF_SETTINGS.fonts,
      sizes: {
        eventTitle: randomSize(40, 80),
        tableTitle: randomSize(35, 65),
        header: randomSize(20, 35),
        content: randomSize(18, 30),
        info: randomSize(16, 24),
        footer: randomSize(14, 20),
      },
    },
    colors: {
      primary: randomColor(),
      secondary: randomColor(),
      text: '#1f2937',
      border: '#d1d5db',
      eventTitleBg: randomColor(),
      eventTitleText: '#ffffff',
      tableTitleBg: randomColor(),
      tableTitleText: '#ffffff',
      headerBg: randomColor(),
      headerText: '#ffffff',
      alternateRowBg: '#f9fafb',
    },
  };
}

/**
 * Mock export function for testing
 */
export async function mockExportPDF(
  settings: PDFEditorSettings,
  data: typeof SAMPLE_EVENT_DATA
): Promise<{ success: boolean; message: string }> {
  // Simulate export delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate settings
  if (!validateSettingsStructure(settings)) {
    return { success: false, message: 'Invalid settings structure' };
  }
  
  // Simulate success
  return { success: true, message: 'PDF exported successfully' };
}

