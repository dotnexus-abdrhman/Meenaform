"use client";

import { Component } from "@/types/component";
import { EventType } from "@/types/event";
import QuestionComponent from "./components/QuestionComponent";
import RatingComponent from "./components/RatingComponent";
import FileUploadComponent from "./components/FileUploadComponent";
import SignatureComponent from "./components/SignatureComponent";
import TableComponent from "./components/TableComponent";
import DisplayComponent from "./components/DisplayComponent";

interface ComponentRendererProps {
  component: Component;
  value: any;
  onChange: (value: any) => void;
  index: number;
  eventType: EventType;
  isPreviewMode?: boolean;
}

export default function ComponentRenderer({
  component,
  value,
  onChange,
  index,
  eventType,
  isPreviewMode = false,
}: ComponentRendererProps) {
  // Render component based on type
  const renderComponent = () => {
    switch (component.type) {
      case "question":
        return (
          <QuestionComponent
            component={component}
            value={value}
            onChange={onChange}
            index={index}
            eventType={eventType}
          />
        );

      case "rating":
        return (
          <RatingComponent
            component={component}
            value={value}
            onChange={onChange}
            index={index}
          />
        );

      case "pdf_upload":
      case "image_upload":
      case "video_upload":
        return (
          <FileUploadComponent
            component={component}
            value={value}
            onChange={onChange}
            index={index}
          />
        );

      case "signature":
        return (
          <SignatureComponent
            component={component}
            value={value}
            onChange={onChange}
            index={index}
          />
        );

      case "table":
        return (
          <TableComponent
            component={component}
            value={value}
            onChange={onChange}
            index={index}
          />
        );

      case "display":
      case "text":
      case "link":
        return <DisplayComponent component={component} />;

      default:
        return (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">
              نوع المكون غير مدعوم: {component.type}
            </p>
          </div>
        );
    }
  };

  return <div className="component-wrapper">{renderComponent()}</div>;
}

