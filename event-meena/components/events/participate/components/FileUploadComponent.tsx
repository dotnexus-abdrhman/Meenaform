"use client";

import { Component } from "@/types/component";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, File, X, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { filesService, FileCategory } from "@/lib/api/services";
import { Progress } from "@/components/ui/progress";

interface FileUploadComponentProps {
  component: Component;
  value: any;
  onChange: (value: any) => void;
  index: number;
}

export default function FileUploadComponent({
  component,
  value,
  onChange,
  index,
}: FileUploadComponentProps) {
  const settings = component.settings as any;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isPdfOnly = component.type === "pdf_upload";
  const isImageOnly = component.type === "image_upload";
  const isVideoOnly = component.type === "video_upload";
  const allowMultiple = settings.allowMultiple || false;
  const maxFiles = settings.maxFiles || 1;
  const maxFileSize = settings.maxFileSize || 10; // MB

  const files = Array.isArray(value) ? value : value ? [value] : [];

  // تحديد نوع الملف للـ API
  const getFileCategory = (): FileCategory => {
    if (isPdfOnly) return "pdf";
    if (isImageOnly) return "image";
    if (isVideoOnly) return "video";
    return "image"; // default
  };

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles = Array.from(selectedFiles);

    // Validate file types
    if (isPdfOnly) {
      const invalidFiles = newFiles.filter((file) => file.type !== "application/pdf");
      if (invalidFiles.length > 0) {
        setUploadError("يرجى رفع ملفات PDF فقط");
        return;
      }
    } else if (isImageOnly) {
      const invalidFiles = newFiles.filter((file) => !file.type.startsWith("image/"));
      if (invalidFiles.length > 0) {
        setUploadError("يرجى رفع صور فقط");
        return;
      }
    } else if (isVideoOnly) {
      const invalidFiles = newFiles.filter((file) => !file.type.startsWith("video/"));
      if (invalidFiles.length > 0) {
        setUploadError("يرجى رفع فيديوهات فقط");
        return;
      }
    }

    // Validate file sizes
    const oversizedFiles = newFiles.filter(
      (file) => file.size > maxFileSize * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setUploadError(`حجم الملف يجب أن لا يتجاوز ${maxFileSize} ميجابايت`);
      return;
    }

    // Validate number of files
    if (allowMultiple) {
      const totalFiles = files.length + newFiles.length;
      if (totalFiles > maxFiles) {
        setUploadError(`يمكنك رفع ${maxFiles} ملفات كحد أقصى`);
        return;
      }
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // رفع الملفات إلى الخادم
      const uploadedFiles = await Promise.all(
        newFiles.map(async (file) => {
          const result = await filesService.uploadFile(
            file,
            getFileCategory(),
            (progress) => setUploadProgress(progress)
          );
          return {
            fileName: result.fileName,
            fileSize: result.fileSize,
            fileType: result.fileType,
            fileUrl: result.fileUrl,
            uploadedAt: result.uploadedAt,
          };
        })
      );

      // تحديث القيمة
      if (allowMultiple) {
        onChange([...files, ...uploadedFiles]);
      } else {
        onChange(uploadedFiles[0]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError(error instanceof Error ? error.message : "فشل رفع الملف");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = (index: number) => {
    if (allowMultiple) {
      const newFiles = files.filter((_: any, i: number) => i !== index);
      onChange(newFiles.length > 0 ? newFiles : null);
    } else {
      onChange(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (file: any) => {
    const fileType = file.fileType || file.type || "";
    if (fileType.startsWith("image/")) return ImageIcon;
    if (fileType === "application/pdf") return FileText;
    return File;
  };

  const getFileName = (file: any) => {
    return file.fileName || file.name || "ملف";
  };

  const getFileSize = (file: any) => {
    return file.fileSize || file.size || 0;
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
          {index + 1}
        </span>
        <div className="flex-1">
          <Label className="text-xl font-semibold text-gray-900 leading-relaxed">
            {settings.label || "رفع ملف"}
            {settings.required && <span className="text-red-500 mr-1">*</span>}
          </Label>
          {settings.description && (
            <p className="text-gray-600 mt-2 text-base leading-relaxed">
              {settings.description}
            </p>
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div className="pr-11 space-y-4">
        {/* Error Message */}
        {uploadError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {uploadError}
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-primary font-medium">جاري رفع الملف... {uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Drag & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-all",
            isUploading
              ? "pointer-events-none opacity-50"
              : "cursor-pointer",
            isDragging
              ? "border-primary bg-blue-50"
              : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
          )}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-primary" />
              )}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-1">
                {isUploading ? "جاري الرفع..." : "اسحب الملفات هنا أو انقر للاختيار"}
              </p>
              <p className="text-sm text-gray-600">
                {isPdfOnly ? "ملفات PDF فقط" : isImageOnly ? "صور فقط" : isVideoOnly ? "فيديوهات فقط" : "جميع أنواع الملفات"}
                {" • "}
                حجم أقصى {maxFileSize} ميجابايت
                {allowMultiple && ` • حتى ${maxFiles} ملفات`}
              </p>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={isPdfOnly ? ".pdf" : isImageOnly ? "image/*" : isVideoOnly ? "video/*" : "*"}
          multiple={allowMultiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file: any, idx: number) => {
              const FileIcon = getFileIcon(file);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <FileIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {getFileName(file)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(getFileSize(file))}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFile(idx)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Upload Another Button (for multiple files) */}
        {allowMultiple && files.length > 0 && files.length < maxFiles && (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            رفع ملف آخر ({files.length}/{maxFiles})
          </Button>
        )}
      </div>
    </div>
  );
}

