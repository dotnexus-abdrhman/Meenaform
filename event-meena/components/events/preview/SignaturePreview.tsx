"use client";

import { SignatureSettings } from "@/types/component";
import { Label } from "@/components/ui/label";
import { PenTool } from "lucide-react";

interface SignaturePreviewProps {
  settings: SignatureSettings;
}

export default function SignaturePreview({ settings }: SignaturePreviewProps) {
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

      {/* Signature Canvas */}
      <div className="relative">
        <div
          className="border-2 border-gray-300 rounded-lg bg-white"
          style={{
            width: settings.width || 500,
            height: settings.height || 200,
            maxWidth: "100%",
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <PenTool className="w-12 h-12 mb-2" />
            <p className="text-sm">وقّع هنا</p>
          </div>
        </div>
        
        {/* Clear Button */}
        <button
          disabled
          className="absolute top-2 left-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors disabled:cursor-not-allowed"
        >
          مسح
        </button>
      </div>

      <p className="text-xs text-gray-500">
        استخدم الماوس أو الإصبع للتوقيع في المربع أعلاه
      </p>
    </div>
  );
}

