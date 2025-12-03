"use client";

import { RatingSettings } from "@/types/component";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface RatingPreviewProps {
  settings: RatingSettings;
}

export default function RatingPreview({ settings }: RatingPreviewProps) {
  const renderRating = () => {
    switch (settings.ratingType) {
      case "stars":
        return (
          <div className="flex gap-2">
            {Array.from({ length: settings.maxRating || 5 }).map((_, idx) => (
              <button
                key={idx}
                disabled
                className="transition-colors disabled:cursor-not-allowed"
              >
                <Star
                  className="w-8 h-8 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400"
                  fill="none"
                />
              </button>
            ))}
          </div>
        );

      case "numbers":
        return (
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: settings.maxRating || 5 }).map((_, idx) => (
              <button
                key={idx}
                disabled
                className="w-12 h-12 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-700 font-semibold hover:border-primary hover:bg-primary hover:text-white transition-colors disabled:cursor-not-allowed"
              >
                {idx + 1}
              </button>
            ))}
          </div>
        );

      case "emoji":
        const defaultEmojis = ["😞", "😐", "😊", "😄", "🤩"];
        const emojis = settings.emojiSet || defaultEmojis.slice(0, settings.maxRating || 5);
        
        return (
          <div className="flex gap-3">
            {emojis.map((emoji, idx) => (
              <button
                key={idx}
                disabled
                className="text-4xl hover:scale-110 transition-transform disabled:cursor-not-allowed opacity-50 hover:opacity-100"
              >
                {emoji}
              </button>
            ))}
          </div>
        );

      default:
        return null;
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

      {/* Rating */}
      <div className="flex justify-center md:justify-start">
        {renderRating()}
      </div>
    </div>
  );
}

