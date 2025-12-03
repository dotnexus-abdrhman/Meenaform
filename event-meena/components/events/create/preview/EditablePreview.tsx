"use client";

import { useState } from "react";
import { useEventBuilderStore } from "@/store/eventBuilderStore";
import { Component, ComponentType, ComponentSettings } from "@/types/component";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import EditableSectionView from "./EditableSectionView";
import ComponentSettingsManager from "../settings/ComponentSettingsManager";
import AddComponentDialog from "./AddComponentDialog";

export default function EditablePreview() {
  const {
    sections,
    type: eventType,
    currentSectionIndex,
    setCurrentSectionIndex,
    updateSectionTitle,
    updateSectionDescription,
    addComponentToSection,
    updateComponentInSection,
    removeComponentFromSection,
    reorderComponentsInSection,
  } = useEventBuilderStore();

  // Dialog States
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [addComponentDialogOpen, setAddComponentDialogOpen] = useState(false);
  const [selectedComponentType, setSelectedComponentType] = useState<ComponentType | null>(null);
  const [editingComponent, setEditingComponent] = useState<Component | null>(null);

  const currentSection = sections[currentSectionIndex];

  // Handle edit component
  const handleEditComponent = (component: Component) => {
    setSelectedComponentType(component.type);
    setEditingComponent(component);
    setSettingsDialogOpen(true);
  };

  // Handle delete component
  const handleDeleteComponent = (componentId: string) => {
    removeComponentFromSection(currentSectionIndex, componentId);
  };

  // Handle add component - open component type selector
  const handleAddComponent = () => {
    setAddComponentDialogOpen(true);
  };

  // Handle select component type from dialog
  const handleSelectComponentType = (type: ComponentType) => {
    setSelectedComponentType(type);
    setEditingComponent(null);
    setAddComponentDialogOpen(false);
    setSettingsDialogOpen(true);
  };

  // Handle save settings (for both new and edit)
  const handleSaveSettings = (settings: ComponentSettings) => {
    if (editingComponent) {
      // Update existing component
      updateComponentInSection(currentSectionIndex, editingComponent.id, { settings });
    } else if (selectedComponentType) {
      // Create new component
      const newComponent: Component = {
        id: uuidv4(),
        sectionId: currentSection.id,
        type: selectedComponentType,
        order: currentSection.components.length,
        settings,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addComponentToSection(currentSectionIndex, newComponent);
    }

    // Close dialog and reset state
    setSettingsDialogOpen(false);
    setSelectedComponentType(null);
    setEditingComponent(null);
  };

  // Handle close settings dialog
  const handleCloseSettings = () => {
    setSettingsDialogOpen(false);
    setSelectedComponentType(null);
    setEditingComponent(null);
  };

  if (!currentSection) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد أقسام</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      {sections.length > 1 && (
        <div className="flex items-center justify-center gap-4 bg-white rounded-xl p-4 shadow-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
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
                  w-10 h-10 rounded-full font-semibold transition-all
                  ${index === currentSectionIndex
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            onClick={() => setCurrentSectionIndex(Math.min(sections.length - 1, currentSectionIndex + 1))}
            disabled={currentSectionIndex === sections.length - 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Current Section */}
      <EditableSectionView
        section={currentSection}
        sectionIndex={currentSectionIndex}
        eventType={eventType}
        onEditComponent={handleEditComponent}
        onDeleteComponent={handleDeleteComponent}
        onAddComponent={handleAddComponent}
        onUpdateTitle={(title) => updateSectionTitle(currentSectionIndex, title)}
        onUpdateDescription={(desc) => updateSectionDescription(currentSectionIndex, desc)}
        onReorderComponents={(components) => reorderComponentsInSection(currentSectionIndex, components)}
      />

      {/* Add Component Dialog */}
      <AddComponentDialog
        open={addComponentDialogOpen}
        onClose={() => setAddComponentDialogOpen(false)}
        onSelect={handleSelectComponentType}
      />

      {/* Component Settings Dialog */}
      <ComponentSettingsManager
        componentType={selectedComponentType}
        open={settingsDialogOpen}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
        initialSettings={editingComponent?.settings}
      />
    </div>
  );
}

