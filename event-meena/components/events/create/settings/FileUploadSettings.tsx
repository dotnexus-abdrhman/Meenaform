"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUploadSettings as FileUploadSettingsType } from "@/types/component";
import { Upload, Image as ImageIcon, Video, FileText } from "lucide-react";

interface FileUploadSettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: FileUploadSettingsType) => void;
  initialSettings?: Partial<FileUploadSettingsType>;
  uploadType: "pdf_upload" | "image_upload" | "video_upload";
}

const uploadTypeConfig = {
  pdf_upload: {
    label: "رفع PDF",
    icon: FileText,
    acceptedTypes: [".pdf"],
    defaultMaxSize: 10,
  },
  image_upload: {
    label: "رفع صورة",
    icon: ImageIcon,
    acceptedTypes: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    defaultMaxSize: 5,
  },
  video_upload: {
    label: "رفع فيديو",
    icon: Video,
    acceptedTypes: [".mp4", ".mov", ".avi", ".mkv"],
    defaultMaxSize: 50,
  },
};

export default function FileUploadSettings({
  open,
  onClose,
  onSave,
  initialSettings,
  uploadType,
}: FileUploadSettingsProps) {
  const config = uploadTypeConfig[uploadType];
  const Icon = config.icon;

  const [label, setLabel] = useState(initialSettings?.label || "");
  const [description, setDescription] = useState(initialSettings?.description || "");
  const [required, setRequired] = useState(initialSettings?.required ?? true);
  const [maxFileSize, setMaxFileSize] = useState(
    initialSettings?.maxFileSize || config.defaultMaxSize
  );
  const [allowMultiple, setAllowMultiple] = useState(
    initialSettings?.allowMultiple ?? false
  );
  const [maxFiles, setMaxFiles] = useState(initialSettings?.maxFiles || 5);

  const handleSave = () => {
    if (!label.trim()) {
      alert("يرجى إدخال عنوان حقل الرفع");
      return;
    }

    const settings: FileUploadSettingsType = {
      type: uploadType,
      label: label.trim(),
      description: description.trim() || undefined,
      required,
      maxFileSize,
      acceptedFileTypes: config.acceptedTypes,
      allowMultiple,
      maxFiles: allowMultiple ? maxFiles : undefined,
    };

    onSave(settings);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Icon className="w-6 h-6" />
            إعدادات {config.label}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">عنوان حقل الرفع *</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={`مثال: قم برفع ${config.label === "رفع PDF" ? "ملف PDF" : config.label === "رفع صورة" ? "صورة" : "فيديو"}`}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">وصف اختياري</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف توضيحي لحقل الرفع"
              rows={2}
            />
          </div>

          {/* Max File Size */}
          <div className="space-y-2">
            <Label htmlFor="maxFileSize">الحد الأقصى لحجم الملف (MB)</Label>
            <Input
              id="maxFileSize"
              type="number"
              value={maxFileSize}
              onChange={(e) => setMaxFileSize(parseInt(e.target.value) || config.defaultMaxSize)}
              min={1}
              max={uploadType === "video_upload" ? 500 : uploadType === "pdf_upload" ? 50 : 20}
            />
            <p className="text-xs text-gray-600">
              الحد الأقصى الموصى به: {config.defaultMaxSize} MB
            </p>
          </div>

          {/* Accepted File Types */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <Label className="text-sm">أنواع الملفات المسموحة</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {config.acceptedTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-white border rounded-full text-sm font-mono"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Allow Multiple */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label>السماح برفع ملفات متعددة</Label>
              <p className="text-sm text-gray-600">
                يمكن للمشارك رفع أكثر من ملف واحد
              </p>
            </div>
            <Checkbox
              checked={allowMultiple}
              onCheckedChange={(checked) => setAllowMultiple(checked === true)}
            />
          </div>

          {/* Max Files (if multiple allowed) */}
          {allowMultiple && (
            <div className="space-y-2">
              <Label htmlFor="maxFiles">الحد الأقصى لعدد الملفات</Label>
              <Input
                id="maxFiles"
                type="number"
                value={maxFiles}
                onChange={(e) => setMaxFiles(parseInt(e.target.value) || 5)}
                min={1}
                max={20}
              />
            </div>
          )}

          {/* Required */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label>حقل مطلوب</Label>
              <p className="text-sm text-gray-600">يجب على المشارك رفع ملف</p>
            </div>
            <Checkbox
              checked={required}
              onCheckedChange={(checked) => setRequired(checked === true)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="button" onClick={handleSave}>
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

