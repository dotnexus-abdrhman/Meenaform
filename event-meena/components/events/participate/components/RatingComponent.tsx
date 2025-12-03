"use client";

import { Component } from "@/types/component";
import { Label } from "@/components/ui/label";
import { Star, Smile, Meh, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingComponentProps {
  component: Component;
  value: any;
  onChange: (value: any) => void;
  index: number;
}

export default function RatingComponent({
  component,
  value,
  onChange,
  index,
}: RatingComponentProps) {
  const settings = component.settings as any;
  const ratingType = settings.ratingType || "stars";
  const maxRating = settings.maxRating || 5;

  const renderRating = () => {
    switch (ratingType) {
      case "stars":
        return (
          <div className="flex gap-2">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => onChange(rating)}
                className={cn(
                  "w-12 h-12 rounded-lg transition-all hover:scale-110",
                  value >= rating
                    ? "text-yellow-500"
                    : "text-gray-300 hover:text-yellow-400"
                )}
              >
                <Star
                  className="w-full h-full"
                  fill={value >= rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        );

      case "numbers":
        return (
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => onChange(rating)}
                className={cn(
                  "w-14 h-14 rounded-lg border-2 font-bold text-lg transition-all hover:scale-105",
                  value === rating
                    ? "bg-primary text-white border-primary shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary/50"
                )}
              >
                {rating}
              </button>
            ))}
          </div>
        );

      case "emoji":
        const emojis = [
          { icon: Frown, label: "سيء جداً", color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
          { icon: Meh, label: "سيء", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
          { icon: Meh, label: "متوسط", color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200" },
          { icon: Smile, label: "جيد", color: "text-green-500", bg: "bg-green-50", border: "border-green-200" },
          { icon: Smile, label: "ممتاز", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
        ];

        return (
          <div className="flex gap-3 flex-wrap">
            {emojis.slice(0, maxRating).map((emoji, idx) => {
              const rating = idx + 1;
              const Icon = emoji.icon;
              return (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onChange(rating)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:scale-105",
                    value === rating
                      ? `${emoji.bg} ${emoji.border} shadow-lg`
                      : "bg-white border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-10 h-10",
                      value === rating ? emoji.color : "text-gray-400"
                    )}
                  />
                  <span className="text-xs font-medium text-gray-600">
                    {emoji.label}
                  </span>
                </button>
              );
            })}
          </div>
        );

      case "scale":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{settings.minLabel || "الأدنى"}</span>
              <span className="text-sm text-gray-600">{settings.maxLabel || "الأعلى"}</span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onChange(rating)}
                  className={cn(
                    "flex-1 h-12 rounded-lg border-2 font-bold transition-all hover:scale-105",
                    value === rating
                      ? "bg-primary text-white border-primary shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary/50"
                  )}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Rating Label */}
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
          {index + 1}
        </span>
        <div className="flex-1">
          <Label className="text-xl font-semibold text-gray-900 leading-relaxed">
            {settings.label || "تقييم"}
            {settings.required && <span className="text-red-500 mr-1">*</span>}
          </Label>
          {settings.description && (
            <p className="text-gray-600 mt-2 text-base leading-relaxed">
              {settings.description}
            </p>
          )}
        </div>
      </div>

      {/* Rating Input */}
      <div className="pr-11">{renderRating()}</div>

      {/* Selected Value Display */}
      {value && (
        <div className="pr-11 text-sm text-gray-600">
          التقييم المختار: <span className="font-semibold text-primary">{value}</span> من {maxRating}
        </div>
      )}
    </div>
  );
}

