"use client";

import { QuestionSettings } from "@/types/component";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionPreviewProps {
  settings: QuestionSettings;
}

export default function QuestionPreview({ settings }: QuestionPreviewProps) {
  const renderQuestionInput = () => {
    switch (settings.questionType) {
      case "short_text":
        return (
          <Input
            placeholder={settings.placeholder || "أدخل إجابتك هنا..."}
            disabled
            className="bg-gray-50"
          />
        );

      case "long_text":
        return (
          <Textarea
            placeholder={settings.placeholder || "أدخل إجابتك هنا..."}
            disabled
            className="bg-gray-50 min-h-[120px]"
          />
        );

      case "single_choice":
        return (
          <RadioGroup disabled className="space-y-3">
            {settings.choices?.map((choice) => (
              <div key={choice.id} className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value={choice.value} id={choice.id} />
                <Label htmlFor={choice.id} className="cursor-pointer">
                  {choice.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "multiple_choice":
        return (
          <div className="space-y-3">
            {settings.choices?.map((choice) => (
              <div key={choice.id} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id={choice.id} disabled />
                <Label htmlFor={choice.id} className="cursor-pointer">
                  {choice.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <Select disabled>
            <SelectTrigger className="bg-gray-50">
              <SelectValue placeholder="اختر من القائمة..." />
            </SelectTrigger>
            <SelectContent>
              {settings.choices?.map((choice) => (
                <SelectItem key={choice.id} value={choice.value}>
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "yes_no":
        return (
          <RadioGroup disabled className="space-y-3">
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">نعم</Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">لا</Label>
            </div>
          </RadioGroup>
        );

      case "linear_scale":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              {Array.from(
                { length: (settings.scaleMax || 5) - (settings.scaleMin || 1) + 1 },
                (_, i) => (settings.scaleMin || 1) + i
              ).map((num) => (
                <button
                  key={num}
                  disabled
                  className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-50 text-gray-700 font-semibold hover:border-primary hover:bg-primary hover:text-white transition-colors disabled:cursor-not-allowed"
                >
                  {num}
                </button>
              ))}
            </div>
            {(settings.scaleMinLabel || settings.scaleMaxLabel) && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>{settings.scaleMinLabel}</span>
                <span>{settings.scaleMaxLabel}</span>
              </div>
            )}
          </div>
        );

      case "choice_grid":
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-50"></th>
                  {settings.columns?.map((col, idx) => (
                    <th key={idx} className="border border-gray-300 p-2 bg-gray-50 text-sm font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {settings.rows?.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-sm font-semibold">
                      {row}
                    </td>
                    {settings.columns?.map((_, colIdx) => (
                      <td key={colIdx} className="border border-gray-300 p-2 text-center">
                        <input
                          type="radio"
                          name={`row-${rowIdx}`}
                          disabled
                          className="cursor-not-allowed"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={settings.placeholder || "أدخل رقم..."}
            disabled
            className="bg-gray-50"
          />
        );

      case "email":
        return (
          <Input
            type="email"
            placeholder={settings.placeholder || "example@email.com"}
            disabled
            className="bg-gray-50"
          />
        );

      case "phone":
        return (
          <Input
            type="tel"
            placeholder={settings.placeholder || "05xxxxxxxx"}
            disabled
            className="bg-gray-50"
          />
        );

      case "date":
        return (
          <Input
            type="date"
            disabled
            className="bg-gray-50"
          />
        );

      case "time":
        return (
          <Input
            type="time"
            disabled
            className="bg-gray-50"
          />
        );

      default:
        return (
          <Input
            placeholder="حقل إدخال"
            disabled
            className="bg-gray-50"
          />
        );
    }
  };

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
      <div>{renderQuestionInput()}</div>
    </div>
  );
}

