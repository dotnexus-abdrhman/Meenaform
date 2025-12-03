"use client";

import { FileUploadSettings } from "@/types/component";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Image as ImageIcon, Video } from "lucide-react";

interface FileUploadPreviewProps {
  settings: FileUploadSettings;
}

export default function FileUploadPreview({ settings }: FileUploadPreviewProps) {
  const getIcon = () => {
    switch (settings.type) {
      case "pdf_upload":
        return <FileText className="w-8 h-8 text-red-600" />;
      case "image_upload":
        return <ImageIcon className="w-8 h-8 text-green-600" />;
      case "video_upload":
        return <Video className="w-8 h-8 text-purple-600" />;
      default:
        return <Upload className="w-8 h-8 text-gray-600" />;
    }
  };

  const getFileTypeLabel = () => {
    switch (settings.type) {
      case "pdf_upload":
        return "ملف PDF";
      case "image_upload":
        return "صورة";
      case "video_upload":
        return "فيديو";
      default:
        return "ملف";
    }
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <div>
        <Label className="text-base font-semibold text-gray-900">
          {settings.label}
          {settings.required && <span className="text-red-500 mr-1">*</span>}
        </Label>
        {settings.description && (
          <p className="text-sm text-gray-600 mt-1">{settings.description}</p>
        )}
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 text-center hover:border-primary hover:bg-primary/5 transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
            {getIcon()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              اضغط لرفع {getFileTypeLabel()} أو اسحبه هنا
            </p>
            <p className="text-xs text-gray-500 mt-1">
              الحد الأقصى: {settings.maxFileSize} ميجابايت
            </p>
            {settings.allowMultiple && settings.maxFiles && (
              <p className="text-xs text-gray-500">
                يمكنك رفع حتى {settings.maxFiles} ملفات
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-1 justify-center">
            {settings.acceptedFileTypes.map((type, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

