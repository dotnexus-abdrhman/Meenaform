"use client";

import { useState } from "react";
import { Section } from "@/types/section";
import { Component } from "@/types/component";
import { EventType } from "@/types/event";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit3, Check, X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableComponentCard from "./SortableComponentCard";

interface EditableSectionViewProps {
  section: Section;
  sectionIndex: number;
  eventType: EventType;
  onEditComponent: (component: Component) => void;
  onDeleteComponent: (componentId: string) => void;
  onAddComponent: () => void;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onReorderComponents: (components: Component[]) => void;
}

export default function EditableSectionView({
  section,
  sectionIndex,
  eventType,
  onEditComponent,
  onDeleteComponent,
  onAddComponent,
  onUpdateTitle,
  onUpdateDescription,
  onReorderComponents,
}: EditableSectionViewProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [tempTitle, setTempTitle] = useState(section.title);
  const [tempDescription, setTempDescription] = useState(section.description || "");

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end - reorder components
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = section.components.findIndex((c) => c.id === active.id);
      const newIndex = section.components.findIndex((c) => c.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newComponents = arrayMove(section.components, oldIndex, newIndex);
        // Update order property for each component
        const reorderedComponents = newComponents.map((c, index) => ({
          ...c,
          order: index,
        }));
        onReorderComponents(reorderedComponents);
      }
    }
  };

  const handleSaveTitle = () => {
    onUpdateTitle(tempTitle);
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    onUpdateDescription(tempDescription);
    setIsEditingDescription(false);
  };

  const handleCancelTitle = () => {
    setTempTitle(section.title);
    setIsEditingTitle(false);
  };

  const handleCancelDescription = () => {
    setTempDescription(section.description || "");
    setIsEditingDescription(false);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Section Header */}
      <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white">
        {/* Title */}
        <div className="mb-4">
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="text-2xl font-bold"
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleSaveTitle}>
                <Check className="w-4 h-4 text-green-600" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancelTitle}>
                <X className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 group">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {section.title}
              </h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingTitle(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          {isEditingDescription ? (
            <div className="flex items-start gap-2">
              <Textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                className="min-h-[80px]"
                placeholder="أضف وصفاً للقسم..."
                autoFocus
              />
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="ghost" onClick={handleSaveDescription}>
                  <Check className="w-4 h-4 text-green-600" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancelDescription}>
                  <X className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 group">
              {section.description ? (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {section.description}
                </p>
              ) : (
                <p className="text-gray-400 text-lg italic">
                  لا يوجد وصف - اضغط لإضافة وصف
                </p>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingDescription(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <Edit3 className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Components */}
      <div className="p-6 space-y-6">
        {section.components.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={section.components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {section.components.map((component, index) => (
                  <SortableComponentCard
                    key={component.id}
                    component={component}
                    index={index}
                    eventType={eventType}
                    onEdit={onEditComponent}
                    onDelete={onDeleteComponent}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 mb-4">لا توجد مكونات في هذا القسم</p>
          </div>
        )}

        {/* Add Component Button */}
        <Button
          variant="outline"
          className="w-full py-6 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all"
          onClick={onAddComponent}
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة مكون جديد
        </Button>
      </div>
    </Card>
  );
}

