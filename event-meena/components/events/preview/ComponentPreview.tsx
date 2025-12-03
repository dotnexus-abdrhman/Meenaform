"use client";

import { Component } from "@/types/component";
import QuestionPreview from "./QuestionPreview";
import RatingPreview from "./RatingPreview";
import TablePreview from "./TablePreview";
import FileUploadPreview from "./FileUploadPreview";
import LinkPreview from "./LinkPreview";
import SignaturePreview from "./SignaturePreview";
import TextPreview from "./TextPreview";
import DisplayPreview from "./DisplayPreview";

interface ComponentPreviewProps {
  component: Component;
}

/**
 * مكون رئيسي لعرض معاينة أي مكون
 * يقوم بتوجيه المكون إلى المعاينة المناسبة حسب نوعه
 */
export default function ComponentPreview({ component }: ComponentPreviewProps) {
  switch (component.type) {
    case "question":
    // Support question subtypes directly (for templates)
    case "short_text" as any:
    case "long_text" as any:
    case "single_choice" as any:
    case "multiple_choice" as any:
    case "dropdown" as any:
    case "yes_no" as any:
    case "linear_scale" as any:
    case "choice_grid" as any:
    case "number" as any:
    case "email" as any:
    case "phone" as any:
    case "date" as any:
    case "time" as any:
      return <QuestionPreview settings={component.settings as any} />;

    case "rating":
      return <RatingPreview settings={component.settings as any} />;

    case "table":
      return <TablePreview settings={component.settings as any} />;

    case "pdf_upload":
    case "image_upload":
    case "video_upload":
      return <FileUploadPreview settings={component.settings as any} />;

    case "link":
      return <LinkPreview settings={component.settings as any} />;

    case "signature":
      return <SignaturePreview settings={component.settings as any} />;

    case "text":
      return <TextPreview settings={component.settings as any} />;

    case "display":
      return <DisplayPreview settings={component.settings as any} />;

    default:
      return (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-500">نوع مكون غير معروف: {component.type}</p>
        </div>
      );
  }
}

