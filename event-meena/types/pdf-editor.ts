/**
 * PDF Editor Types and Interfaces
 * 
 * This file contains all TypeScript types and interfaces for the advanced PDF editor.
 * It provides complete type safety for PDF customization settings.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

// ============================================================================
// Core Settings Interfaces
// ============================================================================

/**
 * Page layout and formatting settings
 */
export interface PDFPageSettings {
  /** Page orientation */
  orientation: 'portrait' | 'landscape';
  
  /** Page size preset or custom */
  size: 'a4' | 'a3' | 'letter' | 'legal' | 'custom';
  
  /** Custom page width in mm (only used when size is 'custom') */
  customWidth?: number;
  
  /** Custom page height in mm (only used when size is 'custom') */
  customHeight?: number;
  
  /** Page margins in mm */
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  
  /** Page background color (hex) */
  backgroundColor: string;
}

/**
 * Font family, sizes, and weights settings
 */
export interface PDFFontSettings {
  /** Font family name */
  family: string;
  
  /** Font sizes in pixels for different elements */
  sizes: {
    eventTitle: number;
    tableTitle: number;
    header: number;
    content: number;
    info: number;
    footer: number;
  };
  
  /** Font weights for different elements */
  weights: {
    eventTitle: 400 | 600 | 700 | 800 | 900;
    tableTitle: 400 | 600 | 700 | 800 | 900;
    header: 400 | 600 | 700 | 800 | 900;
    content: 400 | 600 | 700 | 800 | 900;
  };
}

/**
 * Color scheme settings for all PDF elements
 */
export interface PDFColorSettings {
  /** Primary color (used for headers and accents) */
  primary: string;
  
  /** Secondary color (used for backgrounds) */
  secondary: string;
  
  /** Main text color */
  text: string;
  
  /** Border color */
  border: string;
  
  /** Event title background color */
  eventTitleBg: string;
  
  /** Event title text color */
  eventTitleText: string;
  
  /** Table title background color */
  tableTitleBg: string;
  
  /** Table title text color */
  tableTitleText: string;
  
  /** Table header background color */
  headerBg: string;
  
  /** Table header text color */
  headerText: string;
  
  /** Alternate row background color (for zebra striping) */
  alternateRowBg?: string;
}

/**
 * Spacing and padding settings
 */
export interface PDFSpacingSettings {
  /** Space between tables in mm */
  tableSeparation: number;
  
  /** Container padding */
  containerPadding: {
    vertical: number;
    horizontal: number;
  };
  
  /** Cell padding */
  cellPadding: {
    vertical: number;
    horizontal: number;
  };
  
  /** Title margins */
  titleMargins: {
    eventTitle: number;
    tableTitle: number;
  };
}

/**
 * Table-specific styling settings
 */
export interface PDFTableSettings {
  /** Border settings */
  border: {
    width: number;
    style: 'solid' | 'dashed' | 'dotted';
    radius: number;
  };
  
  /** Column width mode */
  columnWidthMode: 'auto' | 'fixed' | 'custom';
  
  /** Custom column widths (column id -> width in px) */
  customColumnWidths?: Record<string, number>;
  
  /** Enable zebra striping (alternate row colors) */
  zebraStriping: boolean;
  
  /** Header style */
  headerStyle: 'gradient' | 'solid' | 'none';
}

/**
 * Advanced PDF generation settings
 */
export interface PDFAdvancedSettings {
  /** Rendering quality (affects html2canvas scale) */
  quality: 'low' | 'medium' | 'high' | 'ultra';

  /** Enable PDF compression */
  compression: boolean;

  /** Embed fonts in PDF */
  embedFonts: boolean;
}

/**
 * Custom text settings for PDF
 * @version 2.0.0
 */
export interface PDFCustomTextSettings {
  /** Header text (appears before tables) */
  header: {
    enabled: boolean;
    text: string;
    fontSize: number;
    color: string;
    alignment: 'left' | 'center' | 'right';
    bold: boolean;
    italic: boolean;
    marginBottom: number;
  };

  /** Footer text (appears after tables) */
  footer: {
    enabled: boolean;
    text: string;
    fontSize: number;
    color: string;
    alignment: 'left' | 'center' | 'right';
    bold: boolean;
    italic: boolean;
    marginTop: number;
  };

  /** Separator text (appears between tables) */
  separator: {
    enabled: boolean;
    text: string;
    fontSize: number;
    color: string;
    alignment: 'left' | 'center' | 'right';
    bold: boolean;
    italic: boolean;
    marginTop: number;
    marginBottom: number;
  };
}

/**
 * Custom text overlay that can be positioned anywhere on the PDF
 * @version 1.0.0
 */
export interface CustomTextOverlay {
  /** Unique ID for this text overlay */
  id: string;

  /** Text content (supports multi-line with \n) */
  content: string;

  /** Position on the page */
  position: {
    /** X coordinate in mm from left edge */
    x: number;
    /** Y coordinate in mm from top edge */
    y: number;
  };

  /** Font size in pixels */
  fontSize: number;

  /** Text color (hex format) */
  color: string;

  /** Font weight */
  fontWeight: 400 | 600 | 700 | 800 | 900;

  /** Text alignment */
  textAlign: 'right' | 'center' | 'left';

  /** Rotation angle in degrees (optional) */
  rotation?: number;

  /** Opacity (0-1, optional) */
  opacity?: number;

  /** Background color (hex format, optional) */
  backgroundColor?: string;

  /** Font family (optional, defaults to PDF font) */
  fontFamily?: string;

  /** Whether this overlay is visible */
  visible?: boolean;

  /** Z-index for layering (optional) */
  zIndex?: number;

  /** Width in pixels (optional, for resizable overlays) */
  width?: number;

  /** Height in pixels (optional, for resizable overlays) */
  height?: number;
}

/**
 * Complete PDF editor settings
 */
export interface PDFEditorSettings {
  page: PDFPageSettings;
  fonts: PDFFontSettings;
  colors: PDFColorSettings;
  spacing: PDFSpacingSettings;
  table: PDFTableSettings;
  advanced: PDFAdvancedSettings;
  customTexts: PDFCustomTextSettings;

  /** Custom text overlays that can be positioned anywhere on the PDF */
  customTextOverlays?: CustomTextOverlay[];
}

// ============================================================================
// Template Management
// ============================================================================

/**
 * PDF template (saved settings configuration)
 */
export interface PDFTemplate {
  /** Unique template ID */
  id: string;
  
  /** Template name */
  name: string;
  
  /** Template description */
  description?: string;
  
  /** Template settings */
  settings: PDFEditorSettings;
  
  /** Creation timestamp */
  createdAt: Date;
  
  /** Last update timestamp */
  updatedAt: Date;
  
  /** Whether this is a preset template (cannot be deleted) */
  isPreset?: boolean;
}

// ============================================================================
// Editor State Management
// ============================================================================

/**
 * Element types that can be selected in the interactive preview
 * v4.0: Interactive Visual PDF Editor (Phase 2)
 */
export type SelectableElementType =
  | 'table'
  | 'header'
  | 'text'
  | 'customTextOverlay'
  | 'tableCell'
  | 'background';

/**
 * Selected element information
 * v4.0: Interactive Visual PDF Editor (Phase 2)
 */
export interface SelectedElement {
  /** Type of the selected element */
  type: SelectableElementType;

  /** Unique identifier for the element */
  id: string;

  /** Additional metadata about the element */
  metadata?: {
    /** For table cells: row and column index */
    cellPosition?: { row: number; col: number };

    /** For custom text overlays: overlay index */
    overlayIndex?: number;

    /** Current position (for draggable elements) */
    position?: { x: number; y: number };

    /** Current size (for resizable elements) */
    size?: { width: number; height: number };

    /** Any other relevant data */
    [key: string]: unknown;
  };
}

/**
 * Preview mode for the PDF editor
 * v4.0: Interactive Visual PDF Editor (Phase 3)
 */
export type PreviewMode = 'preview' | 'edit';

/**
 * PDF editor state
 */
export interface PDFEditorState {
  /** Current active settings */
  currentSettings: PDFEditorSettings;

  /** Available templates (preset + user-created) */
  templates: PDFTemplate[];

  /** Currently selected template ID */
  selectedTemplateId?: string;

  /** Preview loading state */
  isPreviewLoading: boolean;

  /** Preview zoom level (0.5 to 2.0) */
  previewZoom: number;

  /** Whether settings have been modified */
  isDirty: boolean;

  /** Currently selected element in the interactive preview (v4.0) */
  selectedElement: SelectedElement | null;

  /** Preview mode: 'preview' (static image) or 'edit' (interactive HTML) (v4.0) */
  previewMode: PreviewMode;
}

/**
 * PDF editor actions
 */
export type PDFEditorAction =
  | { type: 'SET_SETTINGS'; payload: PDFEditorSettings }
  | { type: 'UPDATE_PAGE_SETTINGS'; payload: Partial<PDFPageSettings> }
  | { type: 'UPDATE_FONT_SETTINGS'; payload: Partial<PDFFontSettings> }
  | { type: 'UPDATE_COLOR_SETTINGS'; payload: Partial<PDFColorSettings> }
  | { type: 'UPDATE_SPACING_SETTINGS'; payload: Partial<PDFSpacingSettings> }
  | { type: 'UPDATE_TABLE_SETTINGS'; payload: Partial<PDFTableSettings> }
  | { type: 'UPDATE_ADVANCED_SETTINGS'; payload: Partial<PDFAdvancedSettings> }
  | { type: 'ADD_CUSTOM_TEXT_OVERLAY'; payload: Omit<CustomTextOverlay, 'id'> }
  | { type: 'UPDATE_CUSTOM_TEXT_OVERLAY'; payload: { id: string; updates: Partial<CustomTextOverlay> } }
  | { type: 'DELETE_CUSTOM_TEXT_OVERLAY'; payload: string }
  | { type: 'LOAD_TEMPLATE'; payload: string }
  | { type: 'SAVE_TEMPLATE'; payload: { name: string; description?: string } }
  | { type: 'DELETE_TEMPLATE'; payload: string }
  | { type: 'SET_PREVIEW_LOADING'; payload: boolean }
  | { type: 'SET_PREVIEW_ZOOM'; payload: number }
  | { type: 'RESET_TO_DEFAULT' }
  | { type: 'MARK_CLEAN' }
  | { type: 'SELECT_ELEMENT'; payload: SelectedElement }
  | { type: 'DESELECT_ELEMENT' }
  | { type: 'SET_PREVIEW_MODE'; payload: PreviewMode };

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Quality scale mapping for html2canvas
 */
export const QUALITY_SCALE_MAP: Record<PDFAdvancedSettings['quality'], number> = {
  low: 1,
  medium: 2,
  high: 3,
  ultra: 4,
};

/**
 * Page size dimensions in mm
 */
export const PAGE_SIZE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  a3: { width: 297, height: 420 },
  letter: { width: 215.9, height: 279.4 },
  legal: { width: 215.9, height: 355.6 },
};

/**
 * Available font families
 */
export const AVAILABLE_FONTS = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Cairo', label: 'Cairo' },
  { value: 'Amiri', label: 'Amiri' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
] as const;

/**
 * Font weight options
 */
export const FONT_WEIGHTS = [
  { value: 400, label: 'عادي (400)' },
  { value: 600, label: 'متوسط (600)' },
  { value: 700, label: 'سميك (700)' },
  { value: 800, label: 'سميك جداً (800)' },
  { value: 900, label: 'أسود (900)' },
] as const;

// ============================================================================
// Default Settings
// ============================================================================

/**
 * Default PDF editor settings
 * These are the current production settings (v7.5)
 */
export const DEFAULT_PDF_SETTINGS: PDFEditorSettings = {
  page: {
    orientation: 'landscape',
    size: 'a4',
    margins: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
    },
    backgroundColor: '#ffffff',
  },

  fonts: {
    family: 'Cairo',     // v9.1: تغيير من Arial إلى Cairo لدعم أفضل للعربية
    sizes: {
      eventTitle: 76,      // زيادة من 58 إلى 76 (أكبر بـ 31%)
      tableTitle: 60,      // زيادة من 48 إلى 60 (أكبر بـ 25%)
      header: 34,          // زيادة من 26 إلى 34 (أكبر بـ 31%)
      content: 30,         // زيادة من 24 إلى 30 (أكبر بـ 25%)
      info: 24,            // زيادة من 20 إلى 24 (أكبر بـ 20%)
      footer: 20,          // زيادة من 18 إلى 20 (أكبر بـ 11%)
    },
    weights: {
      eventTitle: 900,
      tableTitle: 900,
      header: 800,
      content: 400,
    },
  },

  colors: {
    primary: '#3b82f6', // blue-500
    secondary: '#f8fafc', // slate-50
    text: '#1e293b', // slate-800 - v9.0: darker for better contrast
    border: '#e2e8f0', // slate-200 - v9.0: softer border
    eventTitleBg: '#1e293b', // slate-800 - v9.0: professional dark
    eventTitleText: '#ffffff', // white
    tableTitleBg: '#f8fafc', // slate-50 - v9.0: subtle background
    tableTitleText: '#1e293b', // slate-800 - v9.0: dark text
    headerBg: '#334155', // slate-700 - v9.0: elegant dark header
    headerText: '#ffffff', // white
    alternateRowBg: '#f8fafc', // slate-50 - v9.0: subtle alternating
  },

  spacing: {
    tableSeparation: 20, // mm - زيادة من 15 إلى 20
    containerPadding: {
      vertical: 50, // px - زيادة من 40 إلى 50
      horizontal: 60, // px - زيادة من 50 إلى 60
    },
    cellPadding: {
      vertical: 20, // px - زيادة من 16 إلى 20
      horizontal: 16, // px - زيادة من 12 إلى 16
    },
    titleMargins: {
      eventTitle: 80, // px - v9.0: زيادة من 48 إلى 80 للمسافة الكبيرة
      tableTitle: 40, // px - v9.0: زيادة من 36 إلى 40
    },
  },

  table: {
    border: {
      width: 1,
      style: 'solid',
      radius: 0,
    },
    columnWidthMode: 'auto',
    zebraStriping: false,
    headerStyle: 'gradient',
  },

  advanced: {
    quality: 'high',
    compression: false,
    embedFonts: true,
  },

  customTexts: {
    header: {
      enabled: false,
      text: '',
      fontSize: 28,
      color: '#1e293b',
      alignment: 'center',
      bold: true,
      italic: false,
      marginBottom: 40,
    },
    footer: {
      enabled: false,
      text: '',
      fontSize: 24,
      color: '#64748b',
      alignment: 'center',
      bold: false,
      italic: true,
      marginTop: 60,
    },
    separator: {
      enabled: false,
      text: '• • •',
      fontSize: 20,
      color: '#94a3b8',
      alignment: 'center',
      bold: false,
      italic: false,
      marginTop: 30,
      marginBottom: 30,
    },
  },
};

// ============================================================================
// Preset Templates
// ============================================================================

/**
 * Preset templates that come with the editor
 * These cannot be deleted by users
 */
export const PRESET_TEMPLATES: PDFTemplate[] = [
  {
    id: 'professional',
    name: 'احترافي أزرق',
    description: 'التصميم الحالي v9.0 + v9.1 - احترافي بألوان هادئة وتدرجات جميلة مع دعم كامل للعربية',
    settings: {
      ...DEFAULT_PDF_SETTINGS,
      // v9.1 Arabic text fixes are already in DEFAULT_PDF_SETTINGS
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    isPreset: true,
  },

  {
    id: 'minimal',
    name: 'بسيط أبيض وأسود',
    description: 'تصميم بسيط وأنيق بالأبيض والأسود - مثالي للطباعة',
    settings: {
      ...DEFAULT_PDF_SETTINGS,
      fonts: {
        ...DEFAULT_PDF_SETTINGS.fonts,
        family: 'Cairo',
        sizes: {
          ...DEFAULT_PDF_SETTINGS.fonts.sizes,
          eventTitle: 72,
          tableTitle: 56,
          header: 32,
          content: 28,
        },
        weights: {
          eventTitle: 800,
          tableTitle: 700,
          header: 700,
          content: 400,
        },
      },
      colors: {
        ...DEFAULT_PDF_SETTINGS.colors,
        primary: '#000000',
        secondary: '#f9fafb',
        text: '#000000',
        border: '#d1d5db',
        eventTitleBg: '#000000',
        eventTitleText: '#ffffff',
        tableTitleBg: '#f3f4f6',
        tableTitleText: '#000000',
        headerBg: '#000000',
        headerText: '#ffffff',
        alternateRowBg: '#f9fafb',
      },
      spacing: {
        ...DEFAULT_PDF_SETTINGS.spacing,
        tableSeparation: 18,
        cellPadding: {
          vertical: 18,
          horizontal: 14,
        },
      },
      table: {
        ...DEFAULT_PDF_SETTINGS.table,
        border: { width: 2, style: 'solid', radius: 0 },
        headerStyle: 'solid',
        zebraStriping: true,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    isPreset: true,
  },

  {
    id: 'colorful',
    name: 'ملون إبداعي',
    description: 'تصميم ملون وجذاب بألوان بنفسجية وحواف دائرية',
    settings: {
      ...DEFAULT_PDF_SETTINGS,
      fonts: {
        ...DEFAULT_PDF_SETTINGS.fonts,
        family: 'Cairo',
        sizes: {
          ...DEFAULT_PDF_SETTINGS.fonts.sizes,
          eventTitle: 80,
          tableTitle: 62,
          header: 36,
          content: 32,
        },
        weights: {
          eventTitle: 900,
          tableTitle: 800,
          header: 700,
          content: 600,
        },
      },
      colors: {
        ...DEFAULT_PDF_SETTINGS.colors,
        primary: '#8b5cf6', // purple-500
        secondary: '#faf5ff', // purple-50
        text: '#581c87', // purple-900
        border: '#e9d5ff', // purple-200
        eventTitleBg: '#7c3aed', // purple-600
        eventTitleText: '#ffffff',
        tableTitleBg: '#f3e8ff', // purple-100
        tableTitleText: '#6b21a8', // purple-800
        headerBg: '#8b5cf6', // purple-500
        headerText: '#ffffff',
        alternateRowBg: '#faf5ff', // purple-50
      },
      spacing: {
        ...DEFAULT_PDF_SETTINGS.spacing,
        tableSeparation: 22,
        cellPadding: {
          vertical: 22,
          horizontal: 18,
        },
        titleMargins: {
          eventTitle: 85,
          tableTitle: 45,
        },
      },
      table: {
        ...DEFAULT_PDF_SETTINGS.table,
        zebraStriping: true,
        border: { width: 1, style: 'solid', radius: 12 },
        headerStyle: 'gradient',
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    isPreset: true,
  },

  {
    id: 'modern',
    name: 'عصري أخضر',
    description: 'تصميم عصري بألوان خضراء منعشة وحواف دائرية كبيرة',
    settings: {
      ...DEFAULT_PDF_SETTINGS,
      fonts: {
        ...DEFAULT_PDF_SETTINGS.fonts,
        family: 'Cairo',
        sizes: {
          ...DEFAULT_PDF_SETTINGS.fonts.sizes,
          eventTitle: 78,
          tableTitle: 58,
          header: 34,
          content: 30,
        },
        weights: {
          eventTitle: 900,
          tableTitle: 800,
          header: 700,
          content: 400,
        },
      },
      colors: {
        ...DEFAULT_PDF_SETTINGS.colors,
        primary: '#10b981', // green-500
        secondary: '#f0fdf4', // green-50
        text: '#064e3b', // green-900
        border: '#d1fae5', // green-200
        eventTitleBg: '#059669', // green-600
        eventTitleText: '#ffffff',
        tableTitleBg: '#d1fae5', // green-200
        tableTitleText: '#065f46', // green-800
        headerBg: '#10b981', // green-500
        headerText: '#ffffff',
        alternateRowBg: '#f0fdf4', // green-50
      },
      spacing: {
        ...DEFAULT_PDF_SETTINGS.spacing,
        tableSeparation: 20,
        cellPadding: {
          vertical: 20,
          horizontal: 16,
        },
      },
      table: {
        ...DEFAULT_PDF_SETTINGS.table,
        border: { width: 1, style: 'solid', radius: 16 },
        zebraStriping: true,
        headerStyle: 'gradient',
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    isPreset: true,
  },

  {
    id: 'elegant',
    name: 'أنيق ذهبي',
    description: 'تصميم أنيق كلاسيكي بألوان ذهبية وبنية فاخرة',
    settings: {
      ...DEFAULT_PDF_SETTINGS,
      fonts: {
        ...DEFAULT_PDF_SETTINGS.fonts,
        family: 'Amiri',
        sizes: {
          ...DEFAULT_PDF_SETTINGS.fonts.sizes,
          eventTitle: 74,
          tableTitle: 58,
          header: 32,
          content: 28,
        },
        weights: {
          eventTitle: 900,
          tableTitle: 800,
          header: 700,
          content: 400,
        },
      },
      colors: {
        ...DEFAULT_PDF_SETTINGS.colors,
        primary: '#d97706', // amber-600
        secondary: '#fffbeb', // amber-50
        text: '#78350f', // amber-900
        border: '#fde68a', // amber-200
        eventTitleBg: '#b45309', // amber-700
        eventTitleText: '#ffffff',
        tableTitleBg: '#fef3c7', // amber-100
        tableTitleText: '#92400e', // amber-800
        headerBg: '#d97706', // amber-600
        headerText: '#ffffff',
        alternateRowBg: '#fffbeb', // amber-50
      },
      spacing: {
        ...DEFAULT_PDF_SETTINGS.spacing,
        tableSeparation: 18,
        cellPadding: {
          vertical: 18,
          horizontal: 16,
        },
      },
      table: {
        ...DEFAULT_PDF_SETTINGS.table,
        border: { width: 2, style: 'solid', radius: 6 },
        zebraStriping: true,
        headerStyle: 'solid',
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    isPreset: true,
  },

  {
    id: 'pastel',
    name: 'هادئ باستيل',
    description: 'تصميم هادئ بألوان باستيل ناعمة وحواف دائرية',
    settings: {
      ...DEFAULT_PDF_SETTINGS,
      fonts: {
        ...DEFAULT_PDF_SETTINGS.fonts,
        family: 'Cairo',
        sizes: {
          ...DEFAULT_PDF_SETTINGS.fonts.sizes,
          eventTitle: 74,
          tableTitle: 56,
          header: 32,
          content: 28,
        },
        weights: {
          eventTitle: 800,
          tableTitle: 700,
          header: 700,
          content: 400,
        },
      },
      colors: {
        ...DEFAULT_PDF_SETTINGS.colors,
        primary: '#ec4899', // pink-500
        secondary: '#fdf2f8', // pink-50
        text: '#831843', // pink-900
        border: '#fbcfe8', // pink-200
        eventTitleBg: '#db2777', // pink-600
        eventTitleText: '#ffffff',
        tableTitleBg: '#fce7f3', // pink-100
        tableTitleText: '#9f1239', // pink-800
        headerBg: '#ec4899', // pink-500
        headerText: '#ffffff',
        alternateRowBg: '#fdf2f8', // pink-50
      },
      spacing: {
        ...DEFAULT_PDF_SETTINGS.spacing,
        tableSeparation: 22,
        cellPadding: {
          vertical: 22,
          horizontal: 18,
        },
        titleMargins: {
          eventTitle: 85,
          tableTitle: 45,
        },
      },
      table: {
        ...DEFAULT_PDF_SETTINGS.table,
        border: { width: 1, style: 'solid', radius: 14 },
        zebraStriping: true,
        headerStyle: 'gradient',
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    isPreset: true,
  },

  {
    id: 'contrast',
    name: 'تباين عالي',
    description: 'تصميم بتباين عالي للقراءة الواضحة - مثالي لضعاف البصر',
    settings: {
      ...DEFAULT_PDF_SETTINGS,
      fonts: {
        ...DEFAULT_PDF_SETTINGS.fonts,
        family: 'Cairo',
        sizes: {
          ...DEFAULT_PDF_SETTINGS.fonts.sizes,
          eventTitle: 82,
          tableTitle: 64,
          header: 38,
          content: 34,
        },
        weights: {
          eventTitle: 900,
          tableTitle: 900,
          header: 800,
          content: 700,
        },
      },
      colors: {
        ...DEFAULT_PDF_SETTINGS.colors,
        primary: '#dc2626', // red-600
        secondary: '#ffffff',
        text: '#000000',
        border: '#000000',
        eventTitleBg: '#000000',
        eventTitleText: '#ffffff',
        tableTitleBg: '#fef2f2', // red-50
        tableTitleText: '#000000',
        headerBg: '#dc2626', // red-600
        headerText: '#ffffff',
        alternateRowBg: '#fef2f2', // red-50
      },
      spacing: {
        ...DEFAULT_PDF_SETTINGS.spacing,
        tableSeparation: 24,
        cellPadding: {
          vertical: 24,
          horizontal: 20,
        },
        titleMargins: {
          eventTitle: 90,
          tableTitle: 50,
        },
      },
      table: {
        ...DEFAULT_PDF_SETTINGS.table,
        border: { width: 3, style: 'solid', radius: 0 },
        zebraStriping: true,
        headerStyle: 'solid',
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    isPreset: true,
  },
];

