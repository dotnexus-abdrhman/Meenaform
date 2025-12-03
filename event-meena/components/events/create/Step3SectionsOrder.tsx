"use client";

import { useState } from "react";
import { useEventBuilderStore } from "@/store/eventBuilderStore";
import { Card } from "@/components/ui/card";
import { GripVertical, Layers } from "lucide-react";

export default function Step3SectionsOrder() {
  const { sections, reorderSections } = useEventBuilderStore();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedSection);

    reorderSections(newSections);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ترتيب الأقسام
        </h2>
        <p className="text-gray-600">
          رتب الأقسام بالترتيب الذي تريد أن تظهر به للمشاركين
        </p>
      </div>

      {/* Sections List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {sections.map((section, index) => (
          <Card
            key={section.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`
              p-6 cursor-move transition-all
              ${
                draggedIndex === index
                  ? "opacity-50 scale-95"
                  : "hover:shadow-lg hover:scale-102"
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Drag Handle */}
              <div className="text-gray-400 hover:text-gray-600">
                <GripVertical className="w-6 h-6" />
              </div>

              {/* Number Badge */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg">
                {index + 1}
              </div>

              {/* Section Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {section.title || `القسم ${index + 1}`}
                </h3>
                {section.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {section.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-500">
                    {section.components.length} مكون
                  </span>
                </div>
              </div>

              {/* Components Count Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50">
                <Layers className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">
                  {section.components.length}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Help Text */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">💡</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">نصيحة</h4>
              <p className="text-sm text-blue-800">
                اسحب الأقسام لأعلى أو لأسفل لتغيير ترتيبها. سيظهر الترتيب
                للمشاركين بنفس الطريقة التي تراها هنا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

