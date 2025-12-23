"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionSettings as QuestionSettingsType, QuestionType, QuestionChoice } from "@/types/component";
import { Plus, X, GripVertical, CheckCircle2, Award } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useEventBuilderStore } from "@/store/eventBuilderStore";

interface QuestionSettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: QuestionSettingsType) => void;
  initialSettings?: Partial<QuestionSettingsType>;
}

const questionTypes: { value: QuestionType; label: string }[] = [
  { value: "short_text", label: "نص قصير" },
  { value: "long_text", label: "نص طويل" },
  { value: "single_choice", label: "اختيار من متعدد" },
  { value: "multiple_choice", label: "اختيار متعدد" },
  { value: "dropdown", label: "قائمة منسدلة" },
  { value: "yes_no", label: "نعم/لا" },
  { value: "linear_scale", label: "مقياس خطي" },
  { value: "choice_grid", label: "شبكة اختيارات" },
  { value: "number", label: "رقم" },
  { value: "email", label: "بريد إلكتروني" },
  { value: "phone", label: "رقم جوال" },
  { value: "date", label: "تاريخ" },
  { value: "time", label: "وقت" },
];

export default function QuestionSettings({
  open,
  onClose,
  onSave,
  initialSettings,
}: QuestionSettingsProps) {
  // Get event type from store to conditionally show auto-grading options
  const { type: eventType } = useEventBuilderStore();

  const [label, setLabel] = useState(initialSettings?.label || "");
  const [description, setDescription] = useState(initialSettings?.description || "");
  const [questionType, setQuestionType] = useState<QuestionType>(
    initialSettings?.questionType || "short_text"
  );
  const [required, setRequired] = useState(initialSettings?.required ?? true);
  const [placeholder, setPlaceholder] = useState(initialSettings?.placeholder || "");

  // For choices (single_choice, multiple_choice, dropdown)
  const [choices, setChoices] = useState<QuestionChoice[]>(
    initialSettings?.choices || [
      { id: uuidv4(), label: "الخيار 1", value: "option1", isCorrect: false },
      { id: uuidv4(), label: "الخيار 2", value: "option2", isCorrect: false },
    ]
  );

  // For linear scale
  const [scaleMin, setScaleMin] = useState(initialSettings?.scaleMin || 1);
  const [scaleMax, setScaleMax] = useState(initialSettings?.scaleMax || 5);
  const [scaleMinLabel, setScaleMinLabel] = useState(initialSettings?.scaleMinLabel || "");
  const [scaleMaxLabel, setScaleMaxLabel] = useState(initialSettings?.scaleMaxLabel || "");

  // For choice grid
  const [rows, setRows] = useState<string[]>(initialSettings?.rows || ["الصف 1", "الصف 2"]);
  const [columns, setColumns] = useState<string[]>(initialSettings?.columns || ["العمود 1", "العمود 2"]);

  // For auto-grading (التصحيح التلقائي)
  const [enableAutoGrading, setEnableAutoGrading] = useState(initialSettings?.points !== undefined);
  const [correctAnswerText, setCorrectAnswerText] = useState(
    typeof initialSettings?.correctAnswer === "string" ? initialSettings.correctAnswer : ""
  );
  const [questionScore, setQuestionScore] = useState(initialSettings?.points || 1);

  const needsChoices = ["single_choice", "multiple_choice", "dropdown"].includes(questionType);
  const needsScale = questionType === "linear_scale";
  const needsGrid = questionType === "choice_grid";

  // الأنواع التي تدعم التصحيح التلقائي
  const supportsAutoGrading = ["short_text", "long_text", "single_choice", "multiple_choice"].includes(questionType);

  const handleSave = () => {
    if (!label.trim()) {
      alert("يرجى إدخال عنوان السؤال");
      return;
    }

    const settings: QuestionSettingsType = {
      type: "question",
      label: label.trim(),
      description: description.trim() || undefined,
      questionType,
      required,
      placeholder: placeholder.trim() || undefined,
    };

    if (needsChoices) {
      settings.choices = choices.filter(c => c.label.trim());
    }

    if (needsScale) {
      settings.scaleMin = scaleMin;
      settings.scaleMax = scaleMax;
      settings.scaleMinLabel = scaleMinLabel.trim() || undefined;
      settings.scaleMaxLabel = scaleMaxLabel.trim() || undefined;
    }

    if (needsGrid) {
      settings.rows = rows.filter(r => r.trim());
      settings.columns = columns.filter(c => c.trim());
    }

    // إضافة التصحيح التلقائي
    if (enableAutoGrading && supportsAutoGrading) {
      settings.points = questionScore;

      if (questionType === "short_text" || questionType === "long_text") {
        settings.correctAnswer = correctAnswerText.trim();
      } else if (questionType === "single_choice") {
        const correctChoice = choices.find(c => c.isCorrect);
        if (correctChoice) {
          settings.correctAnswer = correctChoice.value;
        }
      } else if (questionType === "multiple_choice") {
        const correctChoices = choices.filter(c => c.isCorrect).map(c => c.value);
        if (correctChoices.length > 0) {
          settings.correctAnswer = correctChoices;
        }
      }
    }

    onSave(settings);
    onClose();
  };

  const addChoice = () => {
    setChoices([...choices, { id: uuidv4(), label: `الخيار ${choices.length + 1}`, value: `option${choices.length + 1}`, isCorrect: false }]);
  };

  const removeChoice = (id: string) => {
    if (choices.length > 1) {
      setChoices(choices.filter(c => c.id !== id));
    }
  };

  const updateChoice = (id: string, label: string) => {
    setChoices(choices.map(c => c.id === id ? { ...c, label, value: label.toLowerCase().replace(/\s+/g, '_') } : c));
  };

  const toggleCorrectChoice = (id: string) => {
    if (questionType === "single_choice") {
      // للاختيار الواحد: إلغاء تحديد الجميع وتحديد الخيار المختار فقط
      setChoices(choices.map(c => ({ ...c, isCorrect: c.id === id })));
    } else if (questionType === "multiple_choice") {
      // للاختيار المتعدد: تبديل حالة الخيار المختار
      setChoices(choices.map(c => c.id === id ? { ...c, isCorrect: !c.isCorrect } : c));
    }
  };

  const addRow = () => {
    setRows([...rows, `الصف ${rows.length + 1}`]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRow = (index: number, value: string) => {
    setRows(rows.map((r, i) => i === index ? value : r));
  };

  const addColumn = () => {
    setColumns([...columns, `العمود ${columns.length + 1}`]);
  };

  const removeColumn = (index: number) => {
    if (columns.length > 1) {
      setColumns(columns.filter((_, i) => i !== index));
    }
  };

  const updateColumn = (index: number, value: string) => {
    setColumns(columns.map((c, i) => i === index ? value : c));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">
            إعدادات السؤال
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Question Type */}
          <div className="space-y-2">
            <Label htmlFor="questionType">نوع السؤال *</Label>
            <Select value={questionType} onValueChange={(value) => setQuestionType(value as QuestionType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">عنوان السؤال *</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="مثال: ما هو اسمك؟"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">وصف اختياري</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف توضيحي للسؤال"
              rows={2}
            />
          </div>

          {/* Placeholder */}
          {["short_text", "long_text", "number", "email", "phone"].includes(questionType) && (
            <div className="space-y-2">
              <Label htmlFor="placeholder">نص توضيحي (Placeholder)</Label>
              <Input
                id="placeholder"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                placeholder="مثال: أدخل إجابتك هنا"
              />
            </div>
          )}

          {/* Choices */}
          {needsChoices && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>الخيارات</Label>
                <Button type="button" size="sm" variant="outline" onClick={addChoice}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة خيار
                </Button>
              </div>
              <div className="space-y-2">
                {choices.map((choice, index) => (
                  <div key={choice.id} className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />

                    {/* زر تحديد الإجابة الصحيحة (فقط للاختبارات والأنواع المدعومة) */}
                    {eventType === "quiz" && enableAutoGrading && (questionType === "single_choice" || questionType === "multiple_choice") && (
                      <Button
                        type="button"
                        size="sm"
                        variant={choice.isCorrect ? "default" : "outline"}
                        onClick={() => toggleCorrectChoice(choice.id)}
                        className={`w-8 h-8 p-0 ${choice.isCorrect ? "bg-green-600 hover:bg-green-700" : ""}`}
                        title={choice.isCorrect ? "إجابة صحيحة" : "تحديد كإجابة صحيحة"}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${choice.isCorrect ? "text-white" : "text-gray-400"}`} />
                      </Button>
                    )}

                    <Input
                      value={choice.label}
                      onChange={(e) => updateChoice(choice.id, e.target.value)}
                      placeholder={`الخيار ${index + 1}`}
                      className={eventType === "quiz" && choice.isCorrect && enableAutoGrading ? "border-green-500 bg-green-50" : ""}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeChoice(choice.id)}
                      disabled={choices.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* تنبيه للإجابة الصحيحة - فقط للاختبارات */}
              {eventType === "quiz" && enableAutoGrading && (questionType === "single_choice" || questionType === "multiple_choice") && (
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    {questionType === "single_choice"
                      ? "اضغط على الزر الأخضر لتحديد الإجابة الصحيحة (خيار واحد فقط)"
                      : "اضغط على الأزرار الخضراء لتحديد الإجابات الصحيحة (يمكن اختيار أكثر من خيار)"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Linear Scale */}
          {needsScale && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <Label>إعدادات المقياس الخطي</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scaleMin">من</Label>
                  <Input
                    id="scaleMin"
                    type="number"
                    value={scaleMin}
                    onChange={(e) => setScaleMin(parseInt(e.target.value) || 1)}
                    min={0}
                    max={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scaleMax">إلى</Label>
                  <Input
                    id="scaleMax"
                    type="number"
                    value={scaleMax}
                    onChange={(e) => setScaleMax(parseInt(e.target.value) || 5)}
                    min={1}
                    max={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scaleMinLabel">تسمية البداية</Label>
                  <Input
                    id="scaleMinLabel"
                    value={scaleMinLabel}
                    onChange={(e) => setScaleMinLabel(e.target.value)}
                    placeholder="مثال: سيء جداً"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scaleMaxLabel">تسمية النهاية</Label>
                  <Input
                    id="scaleMaxLabel"
                    value={scaleMaxLabel}
                    onChange={(e) => setScaleMaxLabel(e.target.value)}
                    placeholder="مثال: ممتاز"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Choice Grid */}
          {needsGrid && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <Label>إعدادات شبكة الاختيارات</Label>

              {/* Rows */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">الصفوف</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addRow}>
                    <Plus className="w-3 h-3 ml-1" />
                    إضافة صف
                  </Button>
                </div>
                <div className="space-y-2">
                  {rows.map((row, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={row}
                        onChange={(e) => updateRow(index, e.target.value)}
                        placeholder={`الصف ${index + 1}`}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeRow(index)}
                        disabled={rows.length === 1}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columns */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">الأعمدة</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addColumn}>
                    <Plus className="w-3 h-3 ml-1" />
                    إضافة عمود
                  </Button>
                </div>
                <div className="space-y-2">
                  {columns.map((column, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={column}
                        onChange={(e) => updateColumn(index, e.target.value)}
                        placeholder={`العمود ${index + 1}`}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeColumn(index)}
                        disabled={columns.length === 1}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Auto-Grading Section (التصحيح التلقائي) - Only for Quizzes */}
          {eventType === "quiz" && supportsAutoGrading && (
            <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Label className="text-lg font-bold text-blue-900">التصحيح التلقائي</Label>
                    <p className="text-sm text-blue-700">تفعيل نظام الدرجات والتصحيح التلقائي</p>
                  </div>
                </div>
                <Checkbox
                  checked={enableAutoGrading}
                  onCheckedChange={(checked) => setEnableAutoGrading(checked === true)}
                />
              </div>

              {enableAutoGrading && (
                <div className="space-y-4 pt-4 border-t border-blue-200">
                  {/* الإجابة الصحيحة للنص القصير والطويل */}
                  {(questionType === "short_text" || questionType === "long_text") && (
                    <div className="space-y-2">
                      <Label htmlFor="correctAnswer" className="text-blue-900">
                        الإجابة الصحيحة *
                      </Label>
                      {questionType === "short_text" ? (
                        <Input
                          id="correctAnswer"
                          value={correctAnswerText}
                          onChange={(e) => setCorrectAnswerText(e.target.value)}
                          placeholder="مثال: الرياض"
                          className="bg-white border-blue-300 focus:border-blue-500"
                        />
                      ) : (
                        <Textarea
                          id="correctAnswer"
                          value={correctAnswerText}
                          onChange={(e) => setCorrectAnswerText(e.target.value)}
                          placeholder="اكتب الإجابة النموذجية للسؤال..."
                          rows={4}
                          className="bg-white border-blue-300 focus:border-blue-500"
                        />
                      )}
                      <p className="text-xs text-blue-600">
                        سيتم مقارنة إجابة المشارك مع هذه الإجابة الصحيحة
                      </p>
                    </div>
                  )}

                  {/* رسالة للاختيارات */}
                  {(questionType === "single_choice" || questionType === "multiple_choice") && (
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-blue-900 mb-1">
                            {questionType === "single_choice"
                              ? "حدد الإجابة الصحيحة من الخيارات أعلاه"
                              : "حدد الإجابات الصحيحة من الخيارات أعلاه"}
                          </p>
                          <p className="text-sm text-blue-700">
                            {choices.filter(c => c.isCorrect).length > 0
                              ? `تم تحديد ${choices.filter(c => c.isCorrect).length} إجابة صحيحة ✓`
                              : "لم يتم تحديد أي إجابة صحيحة بعد"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* درجة السؤال */}
                  <div className="space-y-2">
                    <Label htmlFor="questionScore" className="text-blue-900">
                      درجة السؤال *
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="questionScore"
                        type="number"
                        value={questionScore}
                        onChange={(e) => setQuestionScore(Math.max(0, parseInt(e.target.value) || 1))}
                        min={0}
                        max={100}
                        className="bg-white border-blue-300 focus:border-blue-500 max-w-[120px]"
                      />
                      <span className="text-blue-900 font-medium">نقطة</span>
                    </div>
                    <p className="text-xs text-blue-600">
                      عدد النقاط التي يحصل عليها المشارك عند الإجابة الصحيحة
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Required */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label>سؤال مطلوب</Label>
              <p className="text-sm text-gray-600">يجب على المشارك الإجابة على هذا السؤال</p>
            </div>
            <Checkbox
              checked={required}
              onCheckedChange={(checked) => setRequired(checked === true)}
            />
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
            إلغاء
          </Button>
          <Button type="button" onClick={handleSave} className="w-full sm:w-auto">
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

