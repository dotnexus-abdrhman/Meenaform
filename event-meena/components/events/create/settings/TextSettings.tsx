"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TextSettings as TextSettingsType } from "@/types/component";
import { Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface TextSettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: TextSettingsType) => void;
  initialSettings?: Partial<TextSettingsType>;
}

export default function TextSettings({
  open,
  onClose,
  onSave,
  initialSettings,
}: TextSettingsProps) {
  const [content, setContent] = useState(initialSettings?.content || "");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    initialSettings?.fontSize || "medium"
  );
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    initialSettings?.textAlign || "right"
  );

  const handleSave = () => {
    if (!content.trim()) {
      alert("يرجى إدخال محتوى النص");
      return;
    }

    const settings: TextSettingsType = {
      type: "text",
      content: content.trim(),
      fontSize,
      textAlign,
    };

    onSave(settings);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Type className="w-6 h-6" />
            إعدادات النص التوضيحي
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">المحتوى النصي *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="أدخل النص التوضيحي هنا..."
              rows={6}
              className="font-arabic"
            />
            <p className="text-xs text-gray-600">
              يمكنك استخدام هذا المكون لإضافة نصوص توضيحية أو تعليمات للمشاركين
            </p>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label htmlFor="fontSize">حجم الخط</Label>
            <Select value={fontSize} onValueChange={(value: any) => setFontSize(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">صغير</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="large">كبير</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Text Align */}
          <div className="space-y-2">
            <Label>محاذاة النص</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={textAlign === "right" ? "default" : "outline"}
                size="sm"
                onClick={() => setTextAlign("right")}
                className="flex-1"
              >
                <AlignRight className="w-4 h-4 ml-2" />
                يمين
              </Button>
              <Button
                type="button"
                variant={textAlign === "center" ? "default" : "outline"}
                size="sm"
                onClick={() => setTextAlign("center")}
                className="flex-1"
              >
                <AlignCenter className="w-4 h-4 ml-2" />
                وسط
              </Button>
              <Button
                type="button"
                variant={textAlign === "left" ? "default" : "outline"}
                size="sm"
                onClick={() => setTextAlign("left")}
                className="flex-1"
              >
                <AlignLeft className="w-4 h-4 ml-2" />
                يسار
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <Label className="text-sm mb-2 block">معاينة:</Label>
            <div
              className={`
                ${fontSize === "small" ? "text-sm" : fontSize === "large" ? "text-lg" : "text-base"}
                ${textAlign === "right" ? "text-right" : textAlign === "center" ? "text-center" : "text-left"}
              `}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {content || "النص سيظهر هنا..."}
            </div>
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

