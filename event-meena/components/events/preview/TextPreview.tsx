"use client";

import { TextSettings } from "@/types/component";

interface TextPreviewProps {
  settings: TextSettings;
}

export default function TextPreview({ settings }: TextPreviewProps) {
  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      case "medium":
      default:
        return "text-base";
    }
  };

  const getTextAlignClass = () => {
    switch (settings.textAlign) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
      default:
        return "text-right";
    }
  };

  return (
    <div
      className={`prose prose-sm max-w-none ${getFontSizeClass()} ${getTextAlignClass()}`}
      style={{
        color: settings.textColor || "inherit",
        backgroundColor: settings.backgroundColor || "transparent",
        padding: settings.backgroundColor ? "1rem" : "0",
        borderRadius: settings.backgroundColor ? "0.5rem" : "0",
      }}
      dangerouslySetInnerHTML={{ __html: settings.content }}
    />
  );
}

