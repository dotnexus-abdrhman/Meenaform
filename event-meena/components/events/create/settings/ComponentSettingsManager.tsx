"use client";

import { ComponentType, ComponentSettings } from "@/types/component";
import QuestionSettings from "./QuestionSettings";
import RatingSettings from "./RatingSettings";
import TableSettings from "./TableSettings";
import FileUploadSettings from "./FileUploadSettings";
import LinkSettings from "./LinkSettings";
import SignatureSettings from "./SignatureSettings";
import TextSettings from "./TextSettings";
import DisplaySettings from "./DisplaySettings";

interface ComponentSettingsManagerProps {
  componentType: ComponentType | null;
  open: boolean;
  onClose: () => void;
  onSave: (settings: ComponentSettings) => void;
  initialSettings?: Partial<ComponentSettings>;
}

export default function ComponentSettingsManager({
  componentType,
  open,
  onClose,
  onSave,
  initialSettings,
}: ComponentSettingsManagerProps) {
  if (!componentType) return null;

  switch (componentType) {
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
      return (
        <QuestionSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
        />
      );

    case "rating":
      return (
        <RatingSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
        />
      );

    case "table":
      return (
        <TableSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
        />
      );

    case "pdf_upload":
      return (
        <FileUploadSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
          uploadType="pdf_upload"
        />
      );

    case "image_upload":
      return (
        <FileUploadSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
          uploadType="image_upload"
        />
      );

    case "video_upload":
      return (
        <FileUploadSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
          uploadType="video_upload"
        />
      );

    case "link":
      return (
        <LinkSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
        />
      );

    case "signature":
      return (
        <SignatureSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
        />
      );

    case "text":
      return (
        <TextSettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
        />
      );

    case "display":
      return (
        <DisplaySettings
          open={open}
          onClose={onClose}
          onSave={onSave}
          initialSettings={initialSettings as any}
        />
      );

    default:
      return null;
  }
}

