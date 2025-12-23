"use client";

import { Component } from "@/types/component";
import { EventType } from "@/types/event";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface QuestionComponentProps {
  component: Component;
  value: any;
  onChange: (value: any) => void;
  index: number;
  eventType: EventType;
}

export default function QuestionComponent({
  component,
  value,
  onChange,
  index,
  eventType,
}: QuestionComponentProps) {
  const settings = component.settings as any;
  const questionType = settings.questionType || "short_text";

  // Render based on question type
  const renderInput = () => {
    switch (questionType) {
      case "short_text":
        return (
          <Input
            type="text"
            placeholder={settings.placeholder || "اكتب إجابتك هنا..."}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="text-lg"
            required={settings.required}
          />
        );

      case "long_text":
        return (
          <Textarea
            placeholder={settings.placeholder || "اكتب إجابتك هنا..."}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={6}
            className="text-lg resize-none"
            required={settings.required}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={settings.placeholder || "أدخل رقماً..."}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            min={settings.minValue}
            max={settings.maxValue}
            className="text-lg"
            required={settings.required}
          />
        );

      case "email":
        return (
          <Input
            type="email"
            placeholder="example@email.com"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="text-lg"
            required={settings.required}
          />
        );

      case "phone":
        return (
          <Input
            type="tel"
            placeholder="05xxxxxxxx"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="text-lg"
            required={settings.required}
          />
        );

      case "date":
        return (
          <Input
            type="date"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="text-lg"
            required={settings.required}
          />
        );

      case "time":
        return (
          <Input
            type="time"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="text-lg"
            required={settings.required}
          />
        );

      case "single_choice":
        // Support both choices (new format) and options (legacy format)
        const singleChoices = settings.choices || settings.options?.map((opt: string) => ({ label: opt, value: opt })) || [];
        const isQuiz = eventType === "quiz";
        return (
          <RadioGroup
            value={value || ""}
            onValueChange={onChange}
            className="space-y-2 sm:space-y-3"
          >
            {singleChoices.map((choice: any, idx: number) => {
              const choiceLabel = typeof choice === 'string' ? choice : choice.label;
              const choiceValue = typeof choice === 'string' ? choice : (choice.value || choice.label);
              const isSelected = value === choiceValue;
              return (
                <div
                  key={idx}
                  className={`
                    flex items-center justify-between p-3 sm:p-5 rounded-lg sm:rounded-xl
                    border-2 transition-all duration-200 cursor-pointer group
                    ${isSelected
                      ? isQuiz
                        ? 'border-[#1a56db] bg-blue-50 shadow-md'
                        : 'border-primary bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                    }
                  `}
                >
                  <Label
                    htmlFor={`${component.id}-${idx}`}
                    className={`
                      flex-1 cursor-pointer text-sm sm:text-base font-medium leading-relaxed ml-2 sm:ml-4
                      ${isSelected ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}
                    `}
                  >
                    {choiceLabel}
                  </Label>
                  <RadioGroupItem
                    value={choiceValue}
                    id={`${component.id}-${idx}`}
                    className={isSelected && isQuiz ? 'border-[#1a56db] text-[#1a56db]' : ''}
                  />
                </div>
              );
            })}
          </RadioGroup>
        );

      case "multiple_choice":
        const selectedValues = Array.isArray(value) ? value : [];
        // Support both choices (new format) and options (legacy format)
        const multipleChoices = settings.choices || settings.options?.map((opt: string) => ({ label: opt, value: opt })) || [];
        const isQuizMultiple = eventType === "quiz";
        return (
          <div className="space-y-2 sm:space-y-3">
            {multipleChoices.map((choice: any, idx: number) => {
              const choiceLabel = typeof choice === 'string' ? choice : choice.label;
              const choiceValue = typeof choice === 'string' ? choice : (choice.value || choice.label);
              const isChecked = selectedValues.includes(choiceValue);
              return (
                <div
                  key={idx}
                  className={`
                    flex items-center justify-between p-3 sm:p-5 rounded-lg sm:rounded-xl
                    border-2 transition-all duration-200 cursor-pointer group
                    ${isChecked
                      ? isQuizMultiple
                        ? 'border-[#1a56db] bg-blue-50 shadow-md'
                        : 'border-primary bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                    }
                  `}
                >
                  <Label
                    htmlFor={`${component.id}-${idx}`}
                    className={`
                      flex-1 cursor-pointer text-sm sm:text-base font-medium leading-relaxed ml-2 sm:ml-4
                      ${isChecked ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}
                    `}
                  >
                    {choiceLabel}
                  </Label>
                  <Checkbox
                    id={`${component.id}-${idx}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...selectedValues, choiceValue]);
                      } else {
                        onChange(selectedValues.filter((v: string) => v !== choiceValue));
                      }
                    }}
                    className={isChecked && isQuizMultiple ? 'border-[#1a56db] data-[state=checked]:bg-[#1a56db]' : ''}
                  />
                </div>
              );
            })}
          </div>
        );

      case "yes_no":
        const isQuizYesNo = eventType === "quiz";
        const isYesSelected = value === "yes";
        const isNoSelected = value === "no";
        return (
          <RadioGroup
            value={value || ""}
            onValueChange={onChange}
            className="flex gap-4"
          >
            <div className={`
              flex items-center space-x-3 space-x-reverse p-5 rounded-xl
              border-2 transition-all duration-200 cursor-pointer flex-1
              ${isYesSelected
                ? isQuizYesNo
                  ? 'border-[#1a56db] bg-blue-50 shadow-md'
                  : 'border-primary bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
              }
            `}>
              <RadioGroupItem
                value="yes"
                id={`${component.id}-yes`}
                className={isYesSelected && isQuizYesNo ? 'border-[#1a56db] text-[#1a56db]' : ''}
              />
              <Label
                htmlFor={`${component.id}-yes`}
                className={`
                  flex-1 cursor-pointer text-base font-medium text-center
                  ${isYesSelected ? 'text-gray-900' : 'text-gray-700'}
                `}
              >
                نعم
              </Label>
            </div>
            <div className={`
              flex items-center space-x-3 space-x-reverse p-5 rounded-xl
              border-2 transition-all duration-200 cursor-pointer flex-1
              ${isNoSelected
                ? isQuizYesNo
                  ? 'border-[#1a56db] bg-blue-50 shadow-md'
                  : 'border-primary bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
              }
            `}>
              <RadioGroupItem
                value="no"
                id={`${component.id}-no`}
                className={isNoSelected && isQuizYesNo ? 'border-[#1a56db] text-[#1a56db]' : ''}
              />
              <Label
                htmlFor={`${component.id}-no`}
                className={`
                  flex-1 cursor-pointer text-base font-medium text-center
                  ${isNoSelected ? 'text-gray-900' : 'text-gray-700'}
                `}
              >
                لا
              </Label>
            </div>
          </RadioGroup>
        );

      case "linear_scale":
        const scaleMin = settings.scaleMin || 1;
        const scaleMax = settings.scaleMax || 5;
        const scaleMinLabel = settings.scaleMinLabel || "";
        const scaleMaxLabel = settings.scaleMaxLabel || "";
        const scaleValues = Array.from(
          { length: scaleMax - scaleMin + 1 },
          (_, i) => scaleMin + i
        );
        const isQuizScale = eventType === "quiz";
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {scaleValues.map((num) => {
                const isSelected = value === num || value === String(num);
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onChange(num)}
                    className={`
                      w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200
                      ${isSelected
                        ? isQuizScale
                          ? 'bg-[#1a56db] text-white shadow-lg scale-110'
                          : 'bg-primary text-white shadow-lg scale-110'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                      }
                    `}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            {(scaleMinLabel || scaleMaxLabel) && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>{scaleMinLabel}</span>
                <span>{scaleMaxLabel}</span>
              </div>
            )}
          </div>
        );

      case "dropdown":
        const dropdownChoices = settings.choices || settings.options?.map((opt: string) => ({ label: opt, value: opt })) || [];
        return (
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger className="w-full text-lg h-14">
              <SelectValue placeholder="اختر إجابة..." />
            </SelectTrigger>
            <SelectContent>
              {dropdownChoices.map((choice: any, idx: number) => {
                const choiceLabel = typeof choice === 'string' ? choice : choice.label;
                const choiceValue = typeof choice === 'string' ? choice : (choice.value || choice.label);
                return (
                  <SelectItem key={idx} value={choiceValue} className="text-base py-3">
                    {choiceLabel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );

      case "choice_grid":
        const gridRows = settings.rows || [];
        const gridColumns = settings.columns || [];
        const gridValue = value || {};
        const isQuizGrid = eventType === "quiz";
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-right bg-gray-50 border border-gray-200 min-w-[150px]"></th>
                  {gridColumns.map((col: string, colIdx: number) => (
                    <th
                      key={colIdx}
                      className="p-3 text-center bg-gray-50 border border-gray-200 font-medium text-gray-700 min-w-[100px]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gridRows.map((row: string, rowIdx: number) => (
                  <tr key={rowIdx}>
                    <td className="p-3 text-right bg-gray-50 border border-gray-200 font-medium text-gray-700">
                      {row}
                    </td>
                    {gridColumns.map((col: string, colIdx: number) => {
                      const cellValue = gridValue[row];
                      const isSelected = cellValue === col;
                      return (
                        <td
                          key={colIdx}
                          className="p-3 text-center border border-gray-200"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              onChange({ ...gridValue, [row]: col });
                            }}
                            className={`
                              w-6 h-6 rounded-full border-2 transition-all duration-200 mx-auto
                              ${isSelected
                                ? isQuizGrid
                                  ? 'bg-[#1a56db] border-[#1a56db]'
                                  : 'bg-primary border-primary'
                                : 'bg-white border-gray-300 hover:border-gray-400'
                              }
                            `}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <Input
            type="text"
            placeholder="اكتب إجابتك هنا..."
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="text-lg"
          />
        );
    }
  };

  const isQuizType = eventType === "quiz";

  return (
    <div className="space-y-3 sm:space-y-5">
      {/* Question Label */}
      <div className="flex items-start gap-2 sm:gap-4">
        <span className={`
          flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base shadow-sm
          ${isQuizType
            ? 'bg-gradient-to-br from-[#1a56db] to-[#0ea5e9] text-white'
            : 'bg-primary/10 text-primary'
          }
        `}>
          {index + 1}
        </span>
        <div className="flex-1">
          <Label className={`
            text-lg sm:text-xl md:text-2xl font-bold leading-relaxed block
            ${isQuizType ? 'text-gray-900' : 'text-gray-900'}
          `}>
            {settings.label || settings.question || "سؤال"}
            {settings.required && <span className="text-red-500 mr-2">*</span>}
          </Label>
          {settings.description && (
            <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg leading-relaxed">
              {settings.description}
            </p>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="pr-10 sm:pr-14">{renderInput()}</div>

      {/* Auto-grading indicator for quizzes */}
      {eventType === "quiz" && settings.enableAutoGrading && (
        <div className="pr-10 sm:pr-11 flex items-center gap-2 text-xs sm:text-sm text-blue-600">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>هذا السؤال يتم تصحيحه تلقائياً ({settings.points || 0} نقطة)</span>
        </div>
      )}

      {/* Character/Word count for text inputs */}
      {(questionType === "short_text" || questionType === "long_text") &&
        settings.maxLength && (
          <div className="pr-10 sm:pr-11 text-xs sm:text-sm text-gray-500 text-left">
            {(value || "").length} / {settings.maxLength}
          </div>
        )}
    </div>
  );
}

