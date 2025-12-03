"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RatingSettings as RatingSettingsType, RatingType } from "@/types/component";
import { Star, Hash, Smile } from "lucide-react";

interface RatingSettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: RatingSettingsType) => void;
  initialSettings?: Partial<RatingSettingsType>;
}

const ratingTypes: { value: RatingType; label: string; icon: any }[] = [
  { value: "stars", label: "نجوم", icon: Star },
  { value: "numbers", label: "أرقام", icon: Hash },
  { value: "emoji", label: "إيموجي", icon: Smile },
];

const emojiSets = [
  { label: "سعادة", emojis: ["😞", "😐", "😊", "😃", "😍"] },
  { label: "موافقة", emojis: ["👎", "👌", "👍"] },
  { label: "جودة", emojis: ["😡", "😕", "😐", "🙂", "😄"] },
];

export default function RatingSettings({
  open,
  onClose,
  onSave,
  initialSettings,
}: RatingSettingsProps) {
  const [label, setLabel] = useState(initialSettings?.label || "");
  const [description, setDescription] = useState(initialSettings?.description || "");
  const [ratingType, setRatingType] = useState<RatingType>(
    initialSettings?.ratingType || "stars"
  );
  const [required, setRequired] = useState(initialSettings?.required ?? true);
  const [maxRating, setMaxRating] = useState(initialSettings?.maxRating || 5);
  const [emojiSet, setEmojiSet] = useState<string[]>(
    initialSettings?.emojiSet || emojiSets[0].emojis
  );

  const handleSave = () => {
    if (!label.trim()) {
      alert("يرجى إدخال عنوان التقييم");
      return;
    }

    const settings: RatingSettingsType = {
      type: "rating",
      label: label.trim(),
      description: description.trim() || undefined,
      ratingType,
      required,
      maxRating,
    };

    if (ratingType === "emoji") {
      settings.emojiSet = emojiSet;
    }

    onSave(settings);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            إعدادات التقييم
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating Type */}
          <div className="space-y-3">
            <Label>نوع التقييم *</Label>
            <div className="grid grid-cols-3 gap-3">
              {ratingTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setRatingType(type.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      ratingType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${
                      ratingType === type.value ? "text-primary" : "text-gray-600"
                    }`} />
                    <p className="text-sm font-medium">{type.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">عنوان التقييم *</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="مثال: كيف تقيم تجربتك؟"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">وصف اختياري</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف توضيحي للتقييم"
              rows={2}
            />
          </div>

          {/* Max Rating (for stars and numbers) */}
          {(ratingType === "stars" || ratingType === "numbers") && (
            <div className="space-y-2">
              <Label htmlFor="maxRating">
                {ratingType === "stars" ? "عدد النجوم" : "الحد الأقصى"}
              </Label>
              <Select
                value={maxRating.toString()}
                onValueChange={(value) => setMaxRating(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {ratingType === "stars" ? "نجوم" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Preview */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">معاينة:</p>
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: maxRating }).map((_, i) => (
                    <div key={i}>
                      {ratingType === "stars" ? (
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Emoji Set */}
          {ratingType === "emoji" && (
            <div className="space-y-3">
              <Label>مجموعة الإيموجي</Label>
              <div className="space-y-2">
                {emojiSets.map((set, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setEmojiSet(set.emojis)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      JSON.stringify(emojiSet) === JSON.stringify(set.emojis)
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{set.label}</span>
                      <div className="flex gap-2 text-2xl">
                        {set.emojis.map((emoji, i) => (
                          <span key={i}>{emoji}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Required */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label>تقييم مطلوب</Label>
              <p className="text-sm text-gray-600">يجب على المشارك تقديم تقييم</p>
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

