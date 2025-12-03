/**
 * PDF Editor Context
 * 
 * Global state management for the PDF editor using React Context API.
 * Provides settings, templates, and actions to all editor components.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import {
  PDFEditorSettings,
  PDFEditorState,
  PDFEditorAction,
  PDFTemplate,
  DEFAULT_PDF_SETTINGS,
  PRESET_TEMPLATES,
  PDFPageSettings,
  PDFFontSettings,
  PDFColorSettings,
  PDFSpacingSettings,
  PDFTableSettings,
  PDFAdvancedSettings,
  CustomTextOverlay,
  SelectedElement,
  PreviewMode,
} from '@/types/pdf-editor';

// ============================================================================
// Context Definition
// ============================================================================

interface PDFEditorContextType {
  state: PDFEditorState;
  dispatch: React.Dispatch<PDFEditorAction>;

  // Convenience methods
  setSettings: (settings: PDFEditorSettings) => void;
  updateSettings: (settings: Partial<PDFEditorSettings>) => void;
  updatePageSettings: (settings: Partial<PDFPageSettings>) => void;
  updateFontSettings: (settings: Partial<PDFFontSettings>) => void;
  updateColorSettings: (settings: Partial<PDFColorSettings>) => void;
  updateSpacingSettings: (settings: Partial<PDFSpacingSettings>) => void;
  updateTableSettings: (settings: Partial<PDFTableSettings>) => void;
  updateAdvancedSettings: (settings: Partial<PDFAdvancedSettings>) => void;

  // Custom Text Overlay methods
  addCustomTextOverlay: (overlay: Omit<CustomTextOverlay, 'id'>) => void;
  updateCustomTextOverlay: (id: string, updates: Partial<CustomTextOverlay>) => void;
  deleteCustomTextOverlay: (id: string) => void;

  // Template methods
  loadTemplate: (templateId: string) => void;
  saveTemplate: (name: string, description?: string) => void;
  deleteTemplate: (templateId: string) => void;

  // Preview methods
  setPreviewLoading: (loading: boolean) => void;
  setPreviewZoom: (zoom: number) => void;

  // Interactive Visual PDF Editor methods (v4.0)
  selectElement: (element: SelectedElement) => void;
  deselectElement: () => void;
  setPreviewMode: (mode: PreviewMode) => void;

  // Utility methods
  resetToDefault: () => void;
  markClean: () => void;
}

const PDFEditorContext = createContext<PDFEditorContextType | undefined>(undefined);

// ============================================================================
// Local Storage Keys
// ============================================================================

const STORAGE_KEYS = {
  TEMPLATES: 'pdf-editor-templates',
  CURRENT_SETTINGS: 'pdf-editor-current-settings',
  SELECTED_TEMPLATE: 'pdf-editor-selected-template',
} as const;

// ============================================================================
// Reducer
// ============================================================================

function pdfEditorReducer(state: PDFEditorState, action: PDFEditorAction): PDFEditorState {
  switch (action.type) {
    case 'SET_SETTINGS':
      return {
        ...state,
        currentSettings: action.payload,
        isDirty: true,
      };
      
    case 'UPDATE_PAGE_SETTINGS':
      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          page: {
            ...state.currentSettings.page,
            ...action.payload,
          },
        },
        isDirty: true,
      };
      
    case 'UPDATE_FONT_SETTINGS':
      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          fonts: {
            ...state.currentSettings.fonts,
            ...action.payload,
            sizes: {
              ...state.currentSettings.fonts.sizes,
              ...(action.payload.sizes || {}),
            },
            weights: {
              ...state.currentSettings.fonts.weights,
              ...(action.payload.weights || {}),
            },
          },
        },
        isDirty: true,
      };
      
    case 'UPDATE_COLOR_SETTINGS':
      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          colors: {
            ...state.currentSettings.colors,
            ...action.payload,
          },
        },
        isDirty: true,
      };
      
    case 'UPDATE_SPACING_SETTINGS':
      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          spacing: {
            ...state.currentSettings.spacing,
            ...action.payload,
            containerPadding: {
              ...state.currentSettings.spacing.containerPadding,
              ...(action.payload.containerPadding || {}),
            },
            cellPadding: {
              ...state.currentSettings.spacing.cellPadding,
              ...(action.payload.cellPadding || {}),
            },
            titleMargins: {
              ...state.currentSettings.spacing.titleMargins,
              ...(action.payload.titleMargins || {}),
            },
          },
        },
        isDirty: true,
      };
      
    case 'UPDATE_TABLE_SETTINGS':
      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          table: {
            ...state.currentSettings.table,
            ...action.payload,
            border: {
              ...state.currentSettings.table.border,
              ...(action.payload.border || {}),
            },
          },
        },
        isDirty: true,
      };
      
    case 'UPDATE_ADVANCED_SETTINGS':
      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          advanced: {
            ...state.currentSettings.advanced,
            ...action.payload,
          },
        },
        isDirty: true,
      };
      
    case 'LOAD_TEMPLATE': {
      const template = state.templates.find(t => t.id === action.payload);
      if (!template) return state;
      
      return {
        ...state,
        currentSettings: template.settings,
        selectedTemplateId: template.id,
        isDirty: false,
      };
    }
    
    case 'SAVE_TEMPLATE': {
      const newTemplate: PDFTemplate = {
        id: `custom-${Date.now()}`,
        name: action.payload.name,
        description: action.payload.description,
        settings: state.currentSettings,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreset: false,
      };
      
      const updatedTemplates = [...state.templates, newTemplate];
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(
          updatedTemplates.filter(t => !t.isPreset)
        ));
      }
      
      return {
        ...state,
        templates: updatedTemplates,
        selectedTemplateId: newTemplate.id,
        isDirty: false,
      };
    }
    
    case 'DELETE_TEMPLATE': {
      // Cannot delete preset templates
      const template = state.templates.find(t => t.id === action.payload);
      if (!template || template.isPreset) return state;
      
      const updatedTemplates = state.templates.filter(t => t.id !== action.payload);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(
          updatedTemplates.filter(t => !t.isPreset)
        ));
      }
      
      return {
        ...state,
        templates: updatedTemplates,
        selectedTemplateId: state.selectedTemplateId === action.payload 
          ? undefined 
          : state.selectedTemplateId,
      };
    }
    
    case 'SET_PREVIEW_LOADING':
      return {
        ...state,
        isPreviewLoading: action.payload,
      };
      
    case 'SET_PREVIEW_ZOOM':
      return {
        ...state,
        previewZoom: Math.max(0.5, Math.min(2.0, action.payload)),
      };
      
    case 'RESET_TO_DEFAULT':
      return {
        ...state,
        currentSettings: DEFAULT_PDF_SETTINGS,
        selectedTemplateId: 'professional',
        isDirty: false,
      };
      
    case 'MARK_CLEAN':
      return {
        ...state,
        isDirty: false,
      };

    case 'ADD_CUSTOM_TEXT_OVERLAY': {
      const newOverlay: CustomTextOverlay = {
        ...action.payload,
        id: `overlay-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          customTextOverlays: [
            ...(state.currentSettings.customTextOverlays || []),
            newOverlay,
          ],
        },
        isDirty: true,
      };
    }

    case 'UPDATE_CUSTOM_TEXT_OVERLAY': {
      const overlays = state.currentSettings.customTextOverlays || [];
      const updatedOverlays = overlays.map(overlay =>
        overlay.id === action.payload.id
          ? { ...overlay, ...action.payload.updates }
          : overlay
      );

      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          customTextOverlays: updatedOverlays,
        },
        isDirty: true,
      };
    }

    case 'DELETE_CUSTOM_TEXT_OVERLAY': {
      const overlays = state.currentSettings.customTextOverlays || [];
      const filteredOverlays = overlays.filter(overlay => overlay.id !== action.payload);

      return {
        ...state,
        currentSettings: {
          ...state.currentSettings,
          customTextOverlays: filteredOverlays,
        },
        isDirty: true,
      };
    }

    // v4.0: Interactive Visual PDF Editor - Selection actions
    case 'SELECT_ELEMENT': {
      return {
        ...state,
        selectedElement: action.payload,
      };
    }

    case 'DESELECT_ELEMENT': {
      return {
        ...state,
        selectedElement: null,
      };
    }

    case 'SET_PREVIEW_MODE': {
      return {
        ...state,
        previewMode: action.payload,
        // Deselect element when switching modes
        selectedElement: null,
      };
    }

    default:
      return state;
  }
}

// ============================================================================
// Provider Component
// ============================================================================

export function PDFEditorProvider({ children }: { children: React.ReactNode }) {
  // Load initial state from localStorage
  const loadInitialState = (): PDFEditorState => {
    if (typeof window === 'undefined') {
      return {
        currentSettings: DEFAULT_PDF_SETTINGS,
        templates: PRESET_TEMPLATES,
        selectedTemplateId: 'professional',
        isPreviewLoading: false,
        previewZoom: 1.0,
        isDirty: false,
        selectedElement: null, // v4.0: Interactive Visual PDF Editor
        previewMode: 'preview', // v4.0: Start in preview mode
      };
    }
    
    // Load custom templates from localStorage
    const savedTemplatesJson = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    const customTemplates: PDFTemplate[] = savedTemplatesJson 
      ? JSON.parse(savedTemplatesJson) 
      : [];
    
    // Load current settings
    const savedSettingsJson = localStorage.getItem(STORAGE_KEYS.CURRENT_SETTINGS);
    const currentSettings: PDFEditorSettings = savedSettingsJson
      ? JSON.parse(savedSettingsJson)
      : DEFAULT_PDF_SETTINGS;
    
    // Load selected template
    const selectedTemplateId = localStorage.getItem(STORAGE_KEYS.SELECTED_TEMPLATE) || 'professional';
    
    return {
      currentSettings,
      templates: [...PRESET_TEMPLATES, ...customTemplates],
      selectedTemplateId,
      isPreviewLoading: false,
      previewZoom: 1.0,
      isDirty: false,
      selectedElement: null, // v4.0: Interactive Visual PDF Editor
      previewMode: 'preview', // v4.0: Start in preview mode
    };
  };
  
  const [state, dispatch] = useReducer(pdfEditorReducer, null, loadInitialState);
  
  // Save current settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SETTINGS, JSON.stringify(state.currentSettings));
      if (state.selectedTemplateId) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_TEMPLATE, state.selectedTemplateId);
      }
    }
  }, [state.currentSettings, state.selectedTemplateId]);
  
  // Convenience methods
  const setSettings = useCallback((settings: PDFEditorSettings) => {
    dispatch({ type: 'SET_SETTINGS', payload: settings });
  }, []);

  const updateSettings = useCallback((settings: Partial<PDFEditorSettings>) => {
    dispatch({
      type: 'SET_SETTINGS',
      payload: {
        ...state.currentSettings,
        ...settings,
        page: { ...state.currentSettings.page, ...(settings.page || {}) },
        fonts: {
          ...state.currentSettings.fonts,
          ...(settings.fonts || {}),
          sizes: { ...state.currentSettings.fonts.sizes, ...(settings.fonts?.sizes || {}) },
          weights: { ...state.currentSettings.fonts.weights, ...(settings.fonts?.weights || {}) },
        },
        colors: { ...state.currentSettings.colors, ...(settings.colors || {}) },
        spacing: {
          ...state.currentSettings.spacing,
          ...(settings.spacing || {}),
          containerPadding: { ...state.currentSettings.spacing.containerPadding, ...(settings.spacing?.containerPadding || {}) },
          cellPadding: { ...state.currentSettings.spacing.cellPadding, ...(settings.spacing?.cellPadding || {}) },
          titleMargins: { ...state.currentSettings.spacing.titleMargins, ...(settings.spacing?.titleMargins || {}) },
        },
        table: {
          ...state.currentSettings.table,
          ...(settings.table || {}),
          border: { ...state.currentSettings.table.border, ...(settings.table?.border || {}) },
        },
        advanced: { ...state.currentSettings.advanced, ...(settings.advanced || {}) },
      }
    });
  }, [state.currentSettings]);

  const updatePageSettings = useCallback((settings: Partial<PDFPageSettings>) => {
    dispatch({ type: 'UPDATE_PAGE_SETTINGS', payload: settings });
  }, []);
  
  const updateFontSettings = useCallback((settings: Partial<PDFFontSettings>) => {
    dispatch({ type: 'UPDATE_FONT_SETTINGS', payload: settings });
  }, []);
  
  const updateColorSettings = useCallback((settings: Partial<PDFColorSettings>) => {
    dispatch({ type: 'UPDATE_COLOR_SETTINGS', payload: settings });
  }, []);
  
  const updateSpacingSettings = useCallback((settings: Partial<PDFSpacingSettings>) => {
    dispatch({ type: 'UPDATE_SPACING_SETTINGS', payload: settings });
  }, []);
  
  const updateTableSettings = useCallback((settings: Partial<PDFTableSettings>) => {
    dispatch({ type: 'UPDATE_TABLE_SETTINGS', payload: settings });
  }, []);
  
  const updateAdvancedSettings = useCallback((settings: Partial<PDFAdvancedSettings>) => {
    dispatch({ type: 'UPDATE_ADVANCED_SETTINGS', payload: settings });
  }, []);

  // Custom Text Overlay methods
  const addCustomTextOverlay = useCallback((overlay: Omit<CustomTextOverlay, 'id'>) => {
    dispatch({ type: 'ADD_CUSTOM_TEXT_OVERLAY', payload: overlay });
  }, []);

  const updateCustomTextOverlay = useCallback((id: string, updates: Partial<CustomTextOverlay>) => {
    dispatch({ type: 'UPDATE_CUSTOM_TEXT_OVERLAY', payload: { id, updates } });
  }, []);

  const deleteCustomTextOverlay = useCallback((id: string) => {
    dispatch({ type: 'DELETE_CUSTOM_TEXT_OVERLAY', payload: id });
  }, []);

  const loadTemplate = useCallback((templateId: string) => {
    dispatch({ type: 'LOAD_TEMPLATE', payload: templateId });
  }, []);
  
  const saveTemplate = useCallback((name: string, description?: string) => {
    dispatch({ type: 'SAVE_TEMPLATE', payload: { name, description } });
  }, []);
  
  const deleteTemplate = useCallback((templateId: string) => {
    dispatch({ type: 'DELETE_TEMPLATE', payload: templateId });
  }, []);
  
  const setPreviewLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_PREVIEW_LOADING', payload: loading });
  }, []);
  
  const setPreviewZoom = useCallback((zoom: number) => {
    dispatch({ type: 'SET_PREVIEW_ZOOM', payload: zoom });
  }, []);

  // v4.0: Interactive Visual PDF Editor methods
  const selectElement = useCallback((element: SelectedElement) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: element });
  }, []);

  const deselectElement = useCallback(() => {
    dispatch({ type: 'DESELECT_ELEMENT' });
  }, []);

  const setPreviewMode = useCallback((mode: PreviewMode) => {
    dispatch({ type: 'SET_PREVIEW_MODE', payload: mode });
  }, []);

  const resetToDefault = useCallback(() => {
    dispatch({ type: 'RESET_TO_DEFAULT' });
  }, []);

  const markClean = useCallback(() => {
    dispatch({ type: 'MARK_CLEAN' });
  }, []);

  const value: PDFEditorContextType = {
    state,
    dispatch,
    setSettings,
    updateSettings,
    updatePageSettings,
    updateFontSettings,
    updateColorSettings,
    updateSpacingSettings,
    updateTableSettings,
    updateAdvancedSettings,
    addCustomTextOverlay,
    updateCustomTextOverlay,
    deleteCustomTextOverlay,
    loadTemplate,
    saveTemplate,
    deleteTemplate,
    setPreviewLoading,
    setPreviewZoom,
    selectElement,
    deselectElement,
    setPreviewMode,
    resetToDefault,
    markClean,
  };
  
  return (
    <PDFEditorContext.Provider value={value}>
      {children}
    </PDFEditorContext.Provider>
  );
}

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * Hook to access PDF editor context
 * Must be used within PDFEditorProvider
 */
export function usePDFEditor() {
  const context = useContext(PDFEditorContext);
  
  if (context === undefined) {
    throw new Error('usePDFEditor must be used within PDFEditorProvider');
  }
  
  return context;
}

