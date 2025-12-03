"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SignatureSettings as SignatureSettingsType } from "@/types/component";
import { PenTool } from "lucide-react";

interface SignatureSettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: SignatureSettingsType) => void;
  initialSettings?: Partial<SignatureSettingsType>;
}

export default function SignatureSettings({
  open,
  onClose,
  onSave,
  initialSettings,
}: SignatureSettingsProps) {
  const [label, setLabel] = useState(initialSettings?.label || "");
  const [description, setDescription] = useState(initialSettings?.description || "");
  const [required, setRequired] = useState(initialSettings?.required ?? true);
  const [width, setWidth] = useState(initialSettings?.width || 500);
  const [height, setHeight] = useState(initialSettings?.height || 200);
  const [penColor, setPenColor] = useState(initialSettings?.penColor || "#000000");
  const [penWidth, setPenWidth] = useState(initialSettings?.penWidth || 2);

  const handleSave = () => {
    if (!label.trim()) {
      alert("يرجى إدخال عنوان حقل التوقيع");
      return;
    }

    const settings: SignatureSettingsType = {
      type: "signature",
      label: label.trim(),
      description: description.trim() || undefined,
      required,
      width,
      height,
      penColor,
      penWidth,
    };

    onSave(settings);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <PenTool className="w-6 h-6" />
            إعدادات التوقيع
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">عنوان حقل التوقيع *</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="مثال: التوقيع الإلكتروني"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">وصف اختياري</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف توضيحي لحقل التوقيع"
              rows={2}
            />
          </div>

          {/* Canvas Size */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <Label>حجم منطقة التوقيع</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width" className="text-sm">العرض (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value) || 500)}
                  min={300}
                  max={800}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm">الارتفاع (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 200)}
                  min={100}
                  max={400}
                />
              </div>
            </div>
          </div>

          {/* Pen Settings */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <Label>إعدادات القلم</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="penColor" className="text-sm">لون القلم</Label>
                <div className="flex gap-2">
                  <Input
                    id="penColor"
                    type="color"
                    value={penColor}
                    onChange={(e) => setPenColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={penColor}
                    onChange={(e) => setPenColor(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="penWidth" className="text-sm">سمك القلم</Label>
                <Input
                  id="penWidth"
                  type="number"
                  value={penWidth}
                  onChange={(e) => setPenWidth(parseInt(e.target.value) || 2)}
                  min={1}
                  max={10}
                />
              </div>
            </div>
          </div>

          {/* Required */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label>توقيع مطلوب</Label>
              <p className="text-sm text-gray-600">يجب على المشارك التوقيع</p>
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

