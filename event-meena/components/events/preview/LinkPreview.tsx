"use client";

import { LinkSettings } from "@/types/component";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LinkPreviewProps {
  settings: LinkSettings;
}

export default function LinkPreview({ settings }: LinkPreviewProps) {
  return (
    <div className="space-y-3">
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

      {/* Input */}
      <Input
        type="url"
        placeholder={settings.placeholder || "https://example.com"}
        disabled
        className="bg-gray-50"
      />
      
      {settings.validateUrl && (
        <p className="text-xs text-gray-500">
          يجب أن يكون الرابط صحيحاً (يبدأ بـ http:// أو https://)
        </p>
      )}
    </div>
  );
}

