"use client";

import { Section } from "@/types/section";
import { ComponentAnswer } from "@/types/response";
import { EventType } from "@/types/event";
import ComponentRenderer from "./ComponentRenderer";

interface SectionViewProps {
  section: Section;
  answers: ComponentAnswer[];
  onAnswerChange: (componentId: string, componentType: string, value: any) => void;
  eventType: EventType;
  isPreviewMode?: boolean;
}

export default function SectionView({
  section,
  answers,
  onAnswerChange,
  eventType,
  isPreviewMode = false,
}: SectionViewProps) {
  // Get answer for a specific component
  const getComponentAnswer = (componentId: string) => {
    return answers.find((a) => a.componentId === componentId)?.answer;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
      {/* Section Header */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {section.title}
        </h2>
        {section.description && (
          <p className="text-gray-600 text-lg leading-relaxed">
            {section.description}
          </p>
        )}
      </div>

      {/* Components */}
      <div className="space-y-8">
        {section.components.map((component, index) => (
          <div
            key={component.id}
            className={`pb-8 border-b border-gray-100 last:border-b-0 last:pb-0 ${
              isPreviewMode ? "pointer-events-none opacity-75" : ""
            }`}
          >
            <ComponentRenderer
              component={component}
              value={getComponentAnswer(component.id)}
              onChange={(value) => onAnswerChange(component.id, component.type, value)}
              index={index}
              eventType={eventType}
              isPreviewMode={isPreviewMode}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

