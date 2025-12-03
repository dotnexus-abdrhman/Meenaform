"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DisplaySettings as DisplaySettingsType, DisplayType } from "@/types/component";
import { Image, FileText, Link as LinkIcon, Upload, X } from "lucide-react";

interface DisplaySettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: DisplaySettingsType) => void;
  initialSettings?: Partial<DisplaySettingsType>;
}

export default function DisplaySettings({
  open,
  onClose,
  onSave,
  initialSettings,
}: DisplaySettingsProps) {
  const [label, setLabel] = useState(initialSettings?.label || "");
  const [description, setDescription] = useState(initialSettings?.description || "");
  const [displayType, setDisplayType] = useState<DisplayType>(
    initialSettings?.displayType || "image"
  );

  // Image settings
  const [imageUrl, setImageUrl] = useState(initialSettings?.imageUrl || "");
  const [imageFile, setImageFile] = useState<File | undefined>(initialSettings?.imageFile);
  const [imageAlt, setImageAlt] = useState(initialSettings?.imageAlt || "");

  // PDF settings
  const [pdfUrl, setPdfUrl] = useState(initialSettings?.pdfUrl || "");
  const [pdfFile, setPdfFile] = useState<File | undefined>(initialSettings?.pdfFile);
  const [pdfFileName, setPdfFileName] = useState(initialSettings?.pdfFileName || "");
  const [allowDownload, setAllowDownload] = useState(initialSettings?.allowDownload ?? true);

  // Link settings
  const [linkUrl, setLinkUrl] = useState(initialSettings?.linkUrl || "");
  const [linkText, setLinkText] = useState(initialSettings?.linkText || "");
  const [openInNewTab, setOpenInNewTab] = useState(initialSettings?.openInNewTab ?? true);

  const handleSave = () => {
    if (!label.trim()) {
      alert("يرجى إدخال عنوان العرض");
      return;
    }

    // Validation based on display type
    if (displayType === "image" && !imageUrl && !imageFile) {
      alert("يرجى رفع صورة أو إدخال رابط الصورة");
      return;
    }

    if (displayType === "pdf" && !pdfUrl && !pdfFile) {
      alert("يرجى رفع ملف PDF أو إدخال رابط الملف");
      return;
    }

    if (displayType === "link" && !linkUrl.trim()) {
      alert("يرجى إدخال رابط URL");
      return;
    }

    const settings: DisplaySettingsType = {
      type: "display",
      label: label.trim(),
      description: description.trim() || undefined,
      displayType,
      ...(displayType === "image" && {
        imageUrl,
        imageFile,
        imageAlt: imageAlt.trim() || undefined,
      }),
      ...(displayType === "pdf" && {
        pdfUrl,
        pdfFile,
        pdfFileName: pdfFileName.trim() || undefined,
        allowDownload,
      }),
      ...(displayType === "link" && {
        linkUrl: linkUrl.trim(),
        linkText: linkText.trim() || undefined,
        openInNewTab,
      }),
    };

    onSave(settings);
    onClose();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("يرجى اختيار ملف صورة صالح");
        return;
      }
      setImageFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("يرجى اختيار ملف PDF صالح");
        return;
      }
      setPdfFile(file);
      setPdfFileName(file.name);
      // Create URL for the file
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  const clearImageFile = () => {
    setImageFile(undefined);
    setImageUrl("");
  };

  const clearPdfFile = () => {
    setPdfFile(undefined);
    setPdfUrl("");
    setPdfFileName("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إعدادات العرض</DialogTitle>
          <DialogDescription>
            قم بإعداد محتوى العرض الذي سيراه المشاركون
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Display Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="displayType">نوع العرض *</Label>
            <Select value={displayType} onValueChange={(value: DisplayType) => setDisplayType(value)}>
              <SelectTrigger id="displayType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    <span>عرض صورة</span>
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>عرض PDF</span>
                  </div>
                </SelectItem>
                <SelectItem value="link">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    <span>عرض رابط</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">عنوان العرض *</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="مثال: صورة توضيحية، ملف الشروط والأحكام، رابط الموقع"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">وصف اختياري</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف إضافي للمحتوى المعروض"
              rows={2}
            />
          </div>

          {/* Image Display Settings */}
          {displayType === "image" && (
            <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800 font-semibold">
                <Image className="w-5 h-5" />
                <span>إعدادات عرض الصورة</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="imageFile">رفع صورة</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="flex-1"
                    />
                    {imageFile && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={clearImageFile}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {imageUrl && (
                  <div className="space-y-2">
                    <Label>معاينة الصورة</Label>
                    <div className="border rounded-lg p-2 bg-white">
                      <img
                        src={imageUrl}
                        alt={imageAlt || "Preview"}
                        className="max-w-full h-auto max-h-64 mx-auto rounded"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="imageAlt">نص بديل للصورة (Alt Text)</Label>
                  <Input
                    id="imageAlt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="وصف الصورة للمستخدمين الذين لا يمكنهم رؤيتها"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PDF Display Settings */}
          {displayType === "pdf" && (
            <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 font-semibold">
                <FileText className="w-5 h-5" />
                <span>إعدادات عرض PDF</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="pdfFile">رفع ملف PDF</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pdfFile"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfFileChange}
                      className="flex-1"
                    />
                    {pdfFile && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={clearPdfFile}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {pdfFileName && (
                  <div className="p-3 bg-white border rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{pdfFileName}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <Label className="text-sm">السماح بالتحميل</Label>
                    <p className="text-xs text-gray-600">المشاركون يمكنهم تحميل الملف</p>
                  </div>
                  <Checkbox
                    checked={allowDownload}
                    onCheckedChange={(checked) => setAllowDownload(checked === true)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Link Display Settings */}
          {displayType === "link" && (
            <div className="space-y-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 text-purple-800 font-semibold">
                <LinkIcon className="w-5 h-5" />
                <span>إعدادات عرض الرابط</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="linkUrl">رابط URL *</Label>
                  <Input
                    id="linkUrl"
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkText">نص الرابط</Label>
                  <Input
                    id="linkText"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="اضغط هنا للمزيد من المعلومات"
                  />
                  <p className="text-xs text-gray-600">
                    إذا تركته فارغاً، سيتم عرض الرابط نفسه
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <Label className="text-sm">فتح في نافذة جديدة</Label>
                    <p className="text-xs text-gray-600">فتح الرابط في تبويب جديد</p>
                  </div>
                  <Checkbox
                    checked={openInNewTab}
                    onCheckedChange={(checked) => setOpenInNewTab(checked === true)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

