import { create } from "zustand";
import { Event, EventType, EventStatus } from "@/types/event";
import { Section } from "@/types/section";
import { Component } from "@/types/component";
import { v4 as uuidv4 } from "uuid";
import { eventTemplates } from "@/data/templates";

interface EventBuilderState {
  // Current step in wizard (1-5)
  currentStep: number;

  // Basic Info (Step 1)
  title: string;
  description: string;
  type: EventType;
  numberOfSections: number;

  // Sections (Step 2)
  sections: Section[];
  currentSectionIndex: number;

  // Settings (Step 4)
  startDate?: string;
  endDate?: string;
  requireAuth: boolean;
  allowEdit: boolean;
  showResults: boolean;
  allowMultipleResponses: boolean;
  requireSignature: boolean;
  thankYouMessage: string;

  // Quiz Result Messages
  successMessage: string;
  goodMessage: string;
  improvementMessage: string;

  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Basic Info Actions
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setType: (type: EventType) => void;
  setNumberOfSections: (number: number) => void;

  // Section Actions
  initializeSections: () => void;
  setCurrentSectionIndex: (index: number) => void;
  updateSectionTitle: (index: number, title: string) => void;
  updateSectionDescription: (index: number, description: string) => void;
  addComponentToSection: (sectionIndex: number, component: Component) => void;
  updateComponentInSection: (sectionIndex: number, componentId: string, updates: Partial<Component>) => void;
  removeComponentFromSection: (sectionIndex: number, componentId: string) => void;
  reorderComponentsInSection: (sectionIndex: number, components: Component[]) => void;
  reorderSections: (sections: Section[]) => void;

  // Validation
  areAllSectionsComplete: () => boolean;
  getIncompleteSectionsInfo: () => { total: number; completed: number; incomplete: number[] };

  // Settings Actions
  setStartDate: (date?: string) => void;
  setEndDate: (date?: string) => void;
  setRequireAuth: (value: boolean) => void;
  setAllowEdit: (value: boolean) => void;
  setShowResults: (value: boolean) => void;
  setAllowMultipleResponses: (value: boolean) => void;
  setRequireSignature: (value: boolean) => void;
  setThankYouMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
  setGoodMessage: (message: string) => void;
  setImprovementMessage: (message: string) => void;

  // Build Event
  buildEvent: () => Event;

  // Load Template
  loadTemplate: (templateId: string) => void;
  loadUserTemplate: (userTemplate: any) => void;

  // Reset
  reset: () => void;
}

const getDefaultThankYouMessage = (type: EventType): string => {
  switch (type) {
    case "survey":
      return "شكراً لمشاركتك! تم استلام إجاباتك بنجاح.";
    case "poll":
      return "شكراً لمشاركتك في الاستطلاع!";
    case "form":
      return "تم إرسال النموذج بنجاح. شكراً لك!";
    case "quiz":
      return "تم إنهاء الاختبار بنجاح! شكراً لمشاركتك.";
    default:
      return "شكراً لمشاركتك!";
  }
};

const initialState = {
  currentStep: 1,
  title: "",
  description: "",
  type: "survey" as EventType,
  numberOfSections: 1,
  sections: [],
  currentSectionIndex: 0,
  requireAuth: true, // Default to true for better participant tracking
  allowEdit: false,
  showResults: false,
  allowMultipleResponses: false,
  requireSignature: false,
  thankYouMessage: getDefaultThankYouMessage("survey"),
  successMessage: "ممتاز! أداء رائع!",
  goodMessage: "جيد جداً! استمر في التقدم",
  improvementMessage: "يحتاج إلى تحسين",
};

export const useEventBuilderStore = create<EventBuilderState>((set, get) => ({
  ...initialState,

  // Step Navigation
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
  previousStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  // Basic Info Actions
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setType: (type) => set({
    type,
    thankYouMessage: getDefaultThankYouMessage(type)
  }),
  setNumberOfSections: (number) => set({ numberOfSections: number }),

  // Section Actions
  initializeSections: () => {
    const { numberOfSections } = get();
    const sections: Section[] = [];

    for (let i = 0; i < numberOfSections; i++) {
      sections.push({
        id: uuidv4(),
        eventId: "", // Will be set when event is created
        title: `القسم ${i + 1}`,
        description: "",
        order: i,
        components: [],
        settings: {
          visible: true,
          skippable: false,
          showProgress: true,
          allowBackNavigation: true,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    set({ sections });
  },

  setCurrentSectionIndex: (index) => set({ currentSectionIndex: index }),

  updateSectionTitle: (index, title) =>
    set((state) => {
      const sections = [...state.sections];
      if (sections[index]) {
        sections[index] = {
          ...sections[index],
          title,
          updatedAt: new Date().toISOString(),
        };
      }
      return { sections };
    }),

  updateSectionDescription: (index, description) =>
    set((state) => {
      const sections = [...state.sections];
      if (sections[index]) {
        sections[index] = {
          ...sections[index],
          description,
          updatedAt: new Date().toISOString(),
        };
      }
      return { sections };
    }),

  addComponentToSection: (sectionIndex, component) =>
    set((state) => {
      const sections = [...state.sections];
      if (sections[sectionIndex]) {
        const newComponent = {
          ...component,
          id: component.id || uuidv4(),
          sectionId: sections[sectionIndex].id,
          order: sections[sectionIndex].components.length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        sections[sectionIndex] = {
          ...sections[sectionIndex],
          components: [...sections[sectionIndex].components, newComponent],
          updatedAt: new Date().toISOString(),
        };
      }
      return { sections };
    }),

  updateComponentInSection: (sectionIndex, componentId, updates) =>
    set((state) => {
      const sections = [...state.sections];
      if (sections[sectionIndex]) {
        sections[sectionIndex] = {
          ...sections[sectionIndex],
          components: sections[sectionIndex].components.map((c) =>
            c.id === componentId
              ? { ...c, ...updates, updatedAt: new Date().toISOString() }
              : c
          ),
          updatedAt: new Date().toISOString(),
        };
      }
      return { sections };
    }),

  removeComponentFromSection: (sectionIndex, componentId) =>
    set((state) => {
      const sections = [...state.sections];
      if (sections[sectionIndex]) {
        sections[sectionIndex] = {
          ...sections[sectionIndex],
          components: sections[sectionIndex].components.filter(
            (c) => c.id !== componentId
          ),
          updatedAt: new Date().toISOString(),
        };
      }
      return { sections };
    }),

  reorderComponentsInSection: (sectionIndex, components) =>
    set((state) => {
      const sections = [...state.sections];
      if (sections[sectionIndex]) {
        sections[sectionIndex] = {
          ...sections[sectionIndex],
          components: components.map((c, index) => ({ ...c, order: index })),
          updatedAt: new Date().toISOString(),
        };
      }
      return { sections };
    }),

  reorderSections: (sections) =>
    set({
      sections: sections.map((s, index) => ({
        ...s,
        order: index,
        updatedAt: new Date().toISOString(),
      })),
    }),

  // Validation
  areAllSectionsComplete: () => {
    const { sections, numberOfSections } = get();

    // التحقق من أن عدد الأقسام المنشأة يساوي العدد المحدد
    if (sections.length !== numberOfSections) {
      return false;
    }

    // التحقق من أن كل قسم له عنوان ومكون واحد على الأقل
    return sections.every(section =>
      section.title.trim() !== "" &&
      section.components.length > 0
    );
  },

  getIncompleteSectionsInfo: () => {
    const { sections, numberOfSections } = get();

    const incompleteSections: number[] = [];
    sections.forEach((section, index) => {
      if (section.title.trim() === "" || section.components.length === 0) {
        incompleteSections.push(index);
      }
    });

    return {
      total: numberOfSections,
      completed: sections.length - incompleteSections.length,
      incomplete: incompleteSections,
    };
  },

  // Settings Actions
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRequireAuth: (value) => set({ requireAuth: value }),
  setAllowEdit: (value) => set({ allowEdit: value }),
  setShowResults: (value) => set({ showResults: value }),
  setAllowMultipleResponses: (value) => set({ allowMultipleResponses: value }),
  setRequireSignature: (value) => set({ requireSignature: value }),
  setThankYouMessage: (message) => set({ thankYouMessage: message }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  setGoodMessage: (message) => set({ goodMessage: message }),
  setImprovementMessage: (message) => set({ improvementMessage: message }),

  // Build Event
  buildEvent: () => {
    const state = get();
    const eventId = uuidv4();
    const now = new Date().toISOString();

    // Get user from localStorage
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    const event: Event = {
      id: eventId,
      userId: user?.id || "",
      title: state.title,
      description: state.description,
      type: state.type,
      status: "draft" as EventStatus,
      sections: state.sections.map((s) => ({ ...s, eventId })),
      settings: {
        requireAuth: state.requireAuth,
        allowEdit: state.allowEdit,
        showResults: state.showResults,
        allowMultipleResponses: state.allowMultipleResponses,
        requireSignature: state.requireSignature,
        shuffleQuestions: false,
        showProgressBar: true,
        allowAnonymous: !state.requireAuth,
        thankYouMessage: state.thankYouMessage,
        successMessage: state.successMessage,
        goodMessage: state.goodMessage,
        improvementMessage: state.improvementMessage,
      },
      stats: {
        views: 0,
        totalResponses: 0,
        completedResponses: 0,
        inProgressResponses: 0,
        completionRate: 0,
        averageTime: 0,
        lastResponseAt: undefined,
      },
      createdAt: now,
      updatedAt: now,
      startDate: state.startDate,
      endDate: state.endDate,
    };

    return event;
  },

  // Load Template
  loadTemplate: (templateId) => {
    const template = eventTemplates.find((t) => t.id === templateId);
    if (!template) return;

    // Convert template sections to builder sections
    const sections: Section[] = template.sections.map((section) => ({
      id: section.id,
      eventId: "", // Will be set when event is created
      title: section.title,
      description: section.description,
      order: section.order,
      components: section.components.map((comp) => {
        // Convert template options to choices format
        const choices = comp.settings.options?.map((opt) => ({
          id: opt.id,
          label: opt.label,
          value: opt.label.toLowerCase().replace(/\s+/g, '_'),
          isCorrect: comp.settings.correctAnswer === opt.id ||
                     comp.settings.correctAnswers?.includes(opt.id) || false,
        }));

        return {
          id: comp.id,
          sectionId: section.id,
          type: "question" as any, // All template components are questions
          order: comp.order,
          settings: {
            type: "question",
            label: comp.label,
            description: "",
            questionType: comp.type, // single_choice, multiple_choice, etc.
            placeholder: comp.placeholder || "",
            required: comp.required,
            choices: choices, // Use converted choices
            options: choices?.map(c => c.label), // Also add options array for compatibility
            correctAnswer: comp.settings.correctAnswer,
            points: comp.settings.points,
            enableAutoGrading: comp.settings.points !== undefined,
          } as any,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }),
      settings: {
        visible: true,
        skippable: false,
        showProgress: true,
        allowBackNavigation: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    set({
      title: template.name,
      description: template.description,
      type: template.category === "exam" ? "quiz" : "survey" as EventType,
      numberOfSections: template.totalSections,
      sections,
      currentSectionIndex: 0,
      currentStep: 2, // Go to builder step
      requireAuth: !template.settings.allowAnonymous,
      allowEdit: template.settings.allowBackNavigation,
      showResults: template.settings.showResultsImmediately,
      allowMultipleResponses: false,
      requireSignature: false,
    });
  },

  // Load User Template
  loadUserTemplate: (userTemplate) => {
    if (!userTemplate) return;

    // User templates already have the correct Section format
    // No need for conversion like system templates
    set({
      title: userTemplate.name,
      description: userTemplate.description,
      type: userTemplate.type,
      numberOfSections: userTemplate.sections.length,
      sections: userTemplate.sections,
      currentSectionIndex: 0,
      currentStep: 2, // Go to builder step
      requireAuth: userTemplate.settings.requireAuth ?? false,
      allowEdit: userTemplate.settings.allowEdit ?? false,
      showResults: userTemplate.settings.showResults ?? false,
      allowMultipleResponses: userTemplate.settings.allowMultipleResponses ?? false,
      requireSignature: userTemplate.settings.requireSignature ?? false,
      thankYouMessage: userTemplate.settings.thankYouMessage || getDefaultThankYouMessage(userTemplate.type),
      successMessage: userTemplate.settings.successMessage || "ممتاز! أداء رائع!",
      goodMessage: userTemplate.settings.goodMessage || "جيد جداً! استمر في التقدم",
      improvementMessage: userTemplate.settings.improvementMessage || "يحتاج إلى تحسين",
    });
  },

  // Reset
  reset: () => set(initialState),
}));

