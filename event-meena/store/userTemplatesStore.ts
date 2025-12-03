import { create } from "zustand";
import { UserTemplate, CreateUserTemplateData, UpdateUserTemplateData } from "@/types/template";
import { v4 as uuidv4 } from "uuid";

interface UserTemplatesState {
  // State
  templates: UserTemplate[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadTemplates: () => void;
  createTemplate: (data: CreateUserTemplateData) => UserTemplate;
  updateTemplate: (id: string, data: UpdateUserTemplateData) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => UserTemplate;
  incrementUsageCount: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getTemplateById: (id: string) => UserTemplate | undefined;
  getTemplatesByType: (type: string) => UserTemplate[];
  searchTemplates: (query: string) => UserTemplate[];
  clearTemplates: () => void;
}

const STORAGE_KEY = "event-meena-user-templates";

// Load templates from localStorage
const loadFromStorage = (): UserTemplate[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading user templates:", error);
    return [];
  }
};

// Save templates to localStorage
const saveToStorage = (templates: UserTemplate[]) => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error("Error saving user templates:", error);
  }
};

export const useUserTemplatesStore = create<UserTemplatesState>((set, get) => ({
  templates: [],
  isLoading: false,
  error: null,

  // Load templates from localStorage
  loadTemplates: () => {
    set({ isLoading: true });
    try {
      const templates = loadFromStorage();
      set({ templates, isLoading: false, error: null });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Failed to load templates" 
      });
    }
  },

  // Create new template
  createTemplate: (data: CreateUserTemplateData) => {
    const now = new Date().toISOString();
    const newTemplate: UserTemplate = {
      id: uuidv4(),
      userId: "", // Will be set from auth context
      ...data,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
      isFavorite: false,
    };

    const templates = [...get().templates, newTemplate];
    set({ templates });
    saveToStorage(templates);
    
    return newTemplate;
  },

  // Update template
  updateTemplate: (id: string, data: UpdateUserTemplateData) => {
    const templates = get().templates.map((template) =>
      template.id === id
        ? { ...template, ...data, updatedAt: new Date().toISOString() }
        : template
    );
    
    set({ templates });
    saveToStorage(templates);
  },

  // Delete template
  deleteTemplate: (id: string) => {
    const templates = get().templates.filter((template) => template.id !== id);
    set({ templates });
    saveToStorage(templates);
  },

  // Duplicate template
  duplicateTemplate: (id: string) => {
    const template = get().templates.find((t) => t.id === id);
    if (!template) {
      throw new Error("Template not found");
    }

    const now = new Date().toISOString();
    const duplicatedTemplate: UserTemplate = {
      ...template,
      id: uuidv4(),
      name: `${template.name} (نسخة)`,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
      isFavorite: false,
    };

    const templates = [...get().templates, duplicatedTemplate];
    set({ templates });
    saveToStorage(templates);
    
    return duplicatedTemplate;
  },

  // Increment usage count
  incrementUsageCount: (id: string) => {
    const templates = get().templates.map((template) =>
      template.id === id
        ? { ...template, usageCount: template.usageCount + 1 }
        : template
    );
    
    set({ templates });
    saveToStorage(templates);
  },

  // Toggle favorite
  toggleFavorite: (id: string) => {
    const templates = get().templates.map((template) =>
      template.id === id
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    );
    
    set({ templates });
    saveToStorage(templates);
  },

  // Get template by ID
  getTemplateById: (id: string) => {
    return get().templates.find((template) => template.id === id);
  },

  // Get templates by type
  getTemplatesByType: (type: string) => {
    return get().templates.filter((template) => template.type === type);
  },

  // Search templates
  searchTemplates: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return get().templates.filter(
      (template) =>
        template.name.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  },

  // Clear all templates
  clearTemplates: () => {
    set({ templates: [] });
    saveToStorage([]);
  },
}));

