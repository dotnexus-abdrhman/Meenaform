"use client";

import { useEffect, useState } from "react";
import { useEventBuilderStore } from "@/store/eventBuilderStore";
import { ComponentType, ComponentSettings, Component } from "@/types/component";
import ComponentsPalette from "./ComponentsPalette";
import SectionBuilder from "./SectionBuilder";
import ComponentSettingsManager from "./settings/ComponentSettingsManager";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function Step2SectionsBuilder() {
  const {
    sections,
    currentSectionIndex,
    setCurrentSectionIndex,
    initializeSections,
    updateSectionTitle,
    updateSectionDescription,
    addComponentToSection,
    removeComponentFromSection,
    updateComponentInSection,
  } = useEventBuilderStore();

  // Settings Dialog State
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [selectedComponentType, setSelectedComponentType] = useState<ComponentType | null>(null);
  const [editingComponent, setEditingComponent] = useState<Component | null>(null);

  // Initialize sections on mount
  useEffect(() => {
    if (sections.length === 0) {
      initializeSections();
    }
  }, [sections.length, initializeSections]);

  const currentSection = sections[currentSectionIndex];

  const handleAddComponent = (type: ComponentType) => {
    // Open settings dialog for new component
    setSelectedComponentType(type);
    setEditingComponent(null);
    setSettingsDialogOpen(true);
  };

  const handleEditComponent = (component: Component) => {
    // Open settings dialog for existing component
    setSelectedComponentType(component.type);
    setEditingComponent(component);
    setSettingsDialogOpen(true);
  };

  const handleSaveSettings = (settings: ComponentSettings) => {
    if (editingComponent) {
      // Update existing component
      updateComponentInSection(currentSectionIndex, editingComponent.id, { settings });
    } else {
      // Create new component
      const newComponent: Component = {
        id: uuidv4(),
        sectionId: currentSection.id,
        type: selectedComponentType!,
        order: currentSection.components.length,
        settings,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addComponentToSection(currentSectionIndex, newComponent);
    }

    setSettingsDialogOpen(false);
    setSelectedComponentType(null);
    setEditingComponent(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    const componentType = e.dataTransfer.getData("componentType") as ComponentType;
    if (componentType) {
      handleAddComponent(componentType);
    }
  };

  if (!currentSection) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">بناء الأقسام</h2>
        <p className="text-gray-600">
          أضف المكونات التي تريدها لكل قسم من أقسام حدثك
        </p>
      </div>

      {/* Section Navigation */}
      {sections.length > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))
            }
            disabled={currentSectionIndex === 0}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSectionIndex(index)}
                className={`
                  w-8 h-8 rounded-full font-semibold transition-all
                  ${
                    index === currentSectionIndex
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentSectionIndex(
                Math.min(sections.length - 1, currentSectionIndex + 1)
              )
            }
            disabled={currentSectionIndex === sections.length - 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Components Palette - Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-6">
            <ComponentsPalette onAddComponent={handleAddComponent} />
          </div>
        </div>

        {/* Section Builder - Main Area */}
        <div className="lg:col-span-3">
          <SectionBuilder
            section={currentSection}
            sectionIndex={currentSectionIndex}
            onUpdateTitle={(title) =>
              updateSectionTitle(currentSectionIndex, title)
            }
            onUpdateDescription={(description) =>
              updateSectionDescription(currentSectionIndex, description)
            }
            onRemoveComponent={(componentId) =>
              removeComponentFromSection(currentSectionIndex, componentId)
            }
            onEditComponent={handleEditComponent}
            onDrop={handleDrop}
          />
        </div>
      </div>

      {/* Progress Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold">✓</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 mb-1">التقدم</h4>
            <p className="text-sm text-green-800">
              القسم {currentSectionIndex + 1} من {sections.length} •{" "}
              {currentSection.components.length} مكون مضاف
            </p>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <ComponentSettingsManager
        componentType={selectedComponentType}
        open={settingsDialogOpen}
        onClose={() => {
          setSettingsDialogOpen(false);
          setSelectedComponentType(null);
          setEditingComponent(null);
        }}
        onSave={handleSaveSettings}
        initialSettings={editingComponent?.settings}
      />
    </div>
  );
}

