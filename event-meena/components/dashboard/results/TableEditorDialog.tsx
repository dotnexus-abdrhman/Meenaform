"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomTable } from "@/lib/pdf-export";
import { Check, X } from "lucide-react";

interface TableEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: CustomTable | null;
  components: any[];
  onSave: (table: CustomTable) => void;
  existingTables: CustomTable[];
}

export function TableEditorDialog({
  open,
  onOpenChange,
  table,
  components,
  onSave,
  existingTables,
}: TableEditorDialogProps) {
  const [title, setTitle] = useState("");
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>([]);
  const [headerColor, setHeaderColor] = useState("#1a56db");
  const [fontSize, setFontSize] = useState(10);
  const [includeSerialNumber, setIncludeSerialNumber] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  // Get question/rating/signature components
  const questionComponents = components.filter(c => c.type === "question" || c.type === "rating" || c.type === "signature");

  // Initialize form when table changes
  useEffect(() => {
    if (table) {
      setTitle(table.title);
      setSelectedComponentIds(table.componentIds);
      setHeaderColor(table.settings.headerColor || "#1a56db");
      setFontSize(table.settings.fontSize || 10);
      setIncludeSerialNumber(table.settings.includeSerialNumber || false);
      setShowHeader(table.settings.showHeader !== false);
      setShowTitle(table.settings.showTitle !== false);
    } else {
      // Reset for new table
      setTitle("");
      setSelectedComponentIds([]);
      setHeaderColor("#1a56db");
      setFontSize(10);
      setIncludeSerialNumber(false);
      setShowHeader(true);
      setShowTitle(true);
    }
  }, [table, open]);

  const handleToggleComponent = (componentId: string) => {
    setSelectedComponentIds(prev =>
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedComponentIds(questionComponents.map(c => c.id));
  };

  const handleDeselectAll = () => {
    setSelectedComponentIds([]);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("يرجى إدخال عنوان للجدول");
      return;
    }

    if (selectedComponentIds.length === 0) {
      alert("يرجى اختيار مكون واحد على الأقل");
      return;
    }

    const newTable: CustomTable = {
      id: table?.id || `table-${Date.now()}`,
      title: title.trim(),
      componentIds: selectedComponentIds,
      order: table?.order || existingTables.length,
      settings: {
        headerColor,
        fontSize,
        includeSerialNumber,
        showHeader,
        showTitle,
      },
    };

    onSave(newTable);
    onOpenChange(false);
  };

  // Get type label in Arabic
  const getTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      short_text: "نص قصير",
      long_text: "نص طويل",
      email: "بريد إلكتروني",
      phone: "هاتف",
      number: "رقم",
      url: "رابط",
      single_choice: "اختيار من متعدد",
      multiple_choice: "اختيار متعدد",
      yes_no: "نعم/لا",
      dropdown: "قائمة منسدلة",
      rating: "تقييم",
      date: "تاريخ",
      time: "وقت",
      linear_scale: "مقياس خطي",
      signature: "توقيع إلكتروني",
    };
    return typeLabels[type] || type;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {table ? "تعديل الجدول" : "إنشاء جدول جديد"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Table Title */}
          <div className="space-y-2">
            <Label htmlFor="table-title" className="text-base font-semibold">
              عنوان الجدول *
            </Label>
            <Input
              id="table-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: المعلومات الشخصية، التقييمات، الأسئلة المفتوحة..."
              className="text-lg"
            />
          </div>

          {/* Table Settings */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">إعدادات الجدول</Label>

            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              {/* Header Color */}
              <div className="space-y-2">
                <Label htmlFor="header-color" className="text-sm font-medium">
                  لون رأس الجدول
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="header-color"
                    type="color"
                    value={headerColor}
                    onChange={(e) => setHeaderColor(e.target.value)}
                    className="w-20 h-10 cursor-pointer"
                  />
                  <Input
                    value={headerColor}
                    onChange={(e) => setHeaderColor(e.target.value)}
                    placeholder="#1a56db"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <Label htmlFor="font-size" className="text-sm font-medium">
                  حجم الخط
                </Label>
                <Input
                  id="font-size"
                  type="number"
                  min="8"
                  max="16"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Serial Number Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded border">
                <Checkbox
                  id="include-serial"
                  checked={includeSerialNumber}
                  onCheckedChange={(checked) => setIncludeSerialNumber(checked as boolean)}
                />
                <Label htmlFor="include-serial" className="cursor-pointer text-sm font-medium">
                  إضافة ترقيم تسلسلي (#)
                </Label>
              </div>

              {/* Show Header Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded border">
                <Checkbox
                  id="show-header"
                  checked={showHeader}
                  onCheckedChange={(checked) => setShowHeader(checked as boolean)}
                />
                <Label htmlFor="show-header" className="cursor-pointer text-sm font-medium">
                  إظهار رأس الجدول
                </Label>
              </div>

              {/* Show Title Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded border col-span-2">
                <Checkbox
                  id="show-title"
                  checked={showTitle}
                  onCheckedChange={(checked) => setShowTitle(checked as boolean)}
                />
                <Label htmlFor="show-title" className="cursor-pointer text-sm font-medium">
                  إظهار عنوان الجدول في PDF
                </Label>
              </div>
            </div>
          </div>

          {/* Component Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                اختيار المكونات ({selectedComponentIds.length} من {questionComponents.length})
              </Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  تحديد الكل
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDeselectAll}
                >
                  إلغاء الكل
                </Button>
              </div>
            </div>

            {/* Components List */}
            <div className="border rounded-lg divide-y max-h-[300px] overflow-y-auto">
              {questionComponents.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>لا توجد مكونات متاحة</p>
                </div>
              ) : (
                questionComponents.map((component, index) => {
                  const isSelected = selectedComponentIds.includes(component.id);
                  const label = component.settings?.label || "سؤال بدون عنوان";
                  const questionType = component.settings?.questionType || component.type;

                  return (
                    <div
                      key={component.id}
                      className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                        isSelected ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleToggleComponent(component.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleToggleComponent(component.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {index + 1}
                            </span>
                            <span className="text-xs text-gray-500 bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                              {getTypeLabel(questionType)}
                            </span>
                          </div>
                          <p className="font-medium text-gray-900 text-sm" title={label}>
                            {label}
                          </p>
                          {component.settings?.description && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {component.settings.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Summary */}
          {selectedComponentIds.length > 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ <strong>تم تحديد {selectedComponentIds.length} مكون</strong> لهذا الجدول
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 ml-2" />
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            <Check className="w-4 h-4 ml-2" />
            {table ? "حفظ التغييرات" : "إنشاء الجدول"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

