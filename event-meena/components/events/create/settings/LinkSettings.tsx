"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { LinkSettings as LinkSettingsType } from "@/types/component";
import { Link2 } from "lucide-react";

interface LinkSettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: LinkSettingsType) => void;
  initialSettings?: Partial<LinkSettingsType>;
}

export default function LinkSettings({
  open,
  onClose,
  onSave,
  initialSettings,
}: LinkSettingsProps) {
  const [label, setLabel] = useState(initialSettings?.label || "");
  const [description, setDescription] = useState(initialSettings?.description || "");
  const [required, setRequired] = useState(initialSettings?.required ?? false);
  const [placeholder, setPlaceholder] = useState(initialSettings?.placeholder || "");
  const [validateUrl, setValidateUrl] = useState(initialSettings?.validateUrl ?? true);

  const handleSave = () => {
    if (!label.trim()) {
      alert("يرجى إدخال عنوان حقل الرابط");
      return;
    }

    const settings: LinkSettingsType = {
      type: "link",
      label: label.trim(),
      description: description.trim() || undefined,
      required,
      placeholder: placeholder.trim() || undefined,
      validateUrl,
    };

    onSave(settings);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Link2 className="w-6 h-6" />
            إعدادات الرابط
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">عنوان حقل الرابط *</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="مثال: رابط موقعك الإلكتروني"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">وصف اختياري</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف توضيحي لحقل الرابط"
              rows={2}
            />
          </div>

          {/* Placeholder */}
          <div className="space-y-2">
            <Label htmlFor="placeholder">نص توضيحي (Placeholder)</Label>
            <Input
              id="placeholder"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              placeholder="مثال: https://example.com"
            />
          </div>

          {/* Validate URL */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label>التحقق من صحة الرابط</Label>
              <p className="text-sm text-gray-600">
                التأكد من أن الرابط المدخل صحيح
              </p>
            </div>
            <Checkbox
              checked={validateUrl}
              onCheckedChange={(checked) => setValidateUrl(checked === true)}
            />
          </div>

          {/* Required */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label>حقل مطلوب</Label>
              <p className="text-sm text-gray-600">يجب على المشارك إدخال رابط</p>
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

