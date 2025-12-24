"use client";

import { ParticipationComponent } from "@/types/participation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Star, FileText, Image as ImageIcon } from "lucide-react";

interface AnswerDisplayProps {
  component: ParticipationComponent;
  answer: any;
  questionNumber: number;
}

export default function AnswerDisplay({ component, answer, questionNumber }: AnswerDisplayProps) {
  const settings = component.settings;
  const label = settings?.label || `سؤال ${questionNumber}`;

  const renderAnswer = () => {
    if (answer === undefined || answer === null || answer === "") {
      return <span className="text-gray-400 italic">لم يتم الإجابة</span>;
    }

    switch (component.type) {
      case "question":
        return renderQuestionAnswer();
      case "rating":
        return renderRatingAnswer();
      case "signature":
        return renderSignatureAnswer();
	      case "pdf_upload":
	      case "image_upload":
	      case "video_upload":
	        return renderFileAnswer();
      default:
        return renderTextAnswer();
    }
  };

  const renderQuestionAnswer = () => {
    const questionType = settings?.questionType;

	    switch (questionType) {
	      case "multiple_choice":
	      case "single_choice":
	      case "dropdown":
	        return renderChoiceAnswer();
	      case "yes_no":
	        return renderCheckboxAnswer();
	      case "linear_scale":
	        return renderScaleAnswer();
	      case "date":
	        return renderDateAnswer();
	      case "time":
	        return renderTimeAnswer();
	      default:
	        return renderTextAnswer();
	    }
  };

  const renderChoiceAnswer = () => {
    const choices = settings?.choices || [];
    const selectedIds = Array.isArray(answer) ? answer : [answer];
    
    return (
      <div className="space-y-2">
        {choices.map((choice: any) => {
          const isSelected = selectedIds.includes(choice.id) || selectedIds.includes(choice.value);
          const isCorrect = choice.isCorrect;
          
          return (
            <div
              key={choice.id}
              className={`flex items-center gap-3 p-2 rounded-lg border ${
                isSelected
                  ? isCorrect !== undefined
                    ? isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                    : "bg-primary/5 border-primary/20"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              {isSelected && (
                isCorrect !== undefined ? (
                  isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                  )
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                )
              )}
              <span className={isSelected ? "font-medium" : "text-gray-500"}>
                {choice.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCheckboxAnswer = () => {
    return (
      <Badge variant={answer ? "default" : "secondary"}>
        {answer ? "نعم" : "لا"}
      </Badge>
    );
  };

  const renderRatingAnswer = () => {
    const maxRating = settings?.maxRating || 5;
    const rating = Number(answer) || 0;
    
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="mr-2 text-sm text-gray-500">({rating}/{maxRating})</span>
      </div>
    );
  };

  const renderScaleAnswer = () => {
    const min = settings?.minValue || 1;
    const max = settings?.maxValue || 10;
    const value = Number(answer) || min;
    
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">{settings?.minLabel || min}</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-500">{settings?.maxLabel || max}</span>
        <Badge variant="secondary" className="mr-2">{value}</Badge>
      </div>
    );
  };

  const renderDateAnswer = () => {
    try {
      const date = new Date(answer);
      return <span>{date.toLocaleDateString("ar-SA")}</span>;
    } catch {
      return <span>{answer}</span>;
    }
  };

  const renderTimeAnswer = () => <span>{answer}</span>;

  const renderSignatureAnswer = () => (
    <div className="border rounded-lg p-2 bg-white inline-block">
      <img src={answer} alt="التوقيع" className="max-h-20" />
    </div>
  );

  const renderFileAnswer = () => (
    <div className="flex items-center gap-2 text-primary">
      <FileText className="h-4 w-4" />
      <span>ملف مرفق</span>
    </div>
  );

  const renderImageAnswer = () => (
    <div className="flex items-center gap-2 text-primary">
      <ImageIcon className="h-4 w-4" />
      <span>صورة مرفقة</span>
    </div>
  );

  const renderTextAnswer = () => (
    <p className="text-gray-700 whitespace-pre-wrap">{String(answer)}</p>
  );

  return (
    <Card className="border-gray-100">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-medium shrink-0">
            {questionNumber}
          </span>
          <div className="flex-1 space-y-2">
            <p className="font-medium text-gray-900">{label}</p>
            {settings?.description && (
              <p className="text-sm text-gray-500">{settings.description}</p>
            )}
            <div className="pt-2">{renderAnswer()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

