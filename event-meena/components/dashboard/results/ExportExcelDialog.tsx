"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FileDown, Loader2, RotateCcw, FileSpreadsheet } from "lucide-react";
import {
  ExcelExportConfig,
  defaultExcelConfig,
  exportSingleSheetExcel,
  exportSeparateSheetsExcel,
} from "@/lib/excel-export";
import { toast } from "sonner";

interface ExportExcelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  responses: any[];
  components: any[];
  isQuiz?: boolean;
}

export default function ExportExcelDialog({
  open,
  onOpenChange,
  eventTitle,
  responses,
  components,
  isQuiz = false,
}: ExportExcelDialogProps) {
  const [config, setConfig] = useState<ExcelExportConfig>(defaultExcelConfig);
  const [isExporting, setIsExporting] = useState(false);

  // Handle export
  const handleExport = async () => {
    if (responses.length === 0) {
      toast.error("لا توجد نتائج للتصدير");
      return;
    }

    setIsExporting(true);

    try {
      if (config.layout === "single-sheet") {
        exportSingleSheetExcel(eventTitle, responses, components, config);
      } else {
        exportSeparateSheetsExcel(eventTitle, responses, components, config);
      }

      toast.success("تم تصدير Excel بنجاح!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      toast.error("حدث خطأ أثناء تصدير Excel");
    } finally {
      setIsExporting(false);
    }
  };

  // Reset to defaults
  const handleReset = () => {
    setConfig(defaultExcelConfig);
    toast.success("تم إعادة تعيين الإعدادات");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
            </div>
            تخصيص تصدير Excel
          </DialogTitle>
          <DialogDescription>
            قم بتخصيص إعدادات تصدير ملف Excel حسب احتياجاتك
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="layout" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="layout">التخطيط</TabsTrigger>
            <TabsTrigger value="formatting">التنسيق</TabsTrigger>
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="info">معلومات</TabsTrigger>
          </TabsList>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold">تخطيط البيانات</Label>

              <div className="space-y-3">
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    config.layout === "single-sheet"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setConfig({ ...config, layout: "single-sheet" })}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center mt-0.5">
                      {config.layout === "single-sheet" && (
                        <div className="w-3 h-3 rounded-full bg-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        ورقة واحدة لجميع المشاركين
                      </h4>
                      <p className="text-sm text-gray-600">
                        جدول كبير يحتوي على جميع المشاركين وإجاباتهم في ورقة واحدة.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    config.layout === "separate-sheets"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setConfig({ ...config, layout: "separate-sheets" })}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center mt-0.5">
                      {config.layout === "separate-sheets" && (
                        <div className="w-3 h-3 rounded-full bg-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        ورقة منفصلة لكل مشارك
                      </h4>
                      <p className="text-sm text-gray-600">
                        كل مشارك له ورقة خاصة مع جدول يعرض أسئلته وإجاباته بشكل تفصيلي.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-4 border-t">
              <Label className="text-base font-semibold">خيارات إضافية</Label>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="freezeHeader"
                    checked={config.freezeHeader}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, freezeHeader: checked as boolean })
                    }
                  />
                  <Label htmlFor="freezeHeader" className="cursor-pointer">
                    تجميد الصف الأول (Freeze Header Row)
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="autoFilter"
                    checked={config.autoFilter}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, autoFilter: checked as boolean })
                    }
                  />
                  <Label htmlFor="autoFilter" className="cursor-pointer">
                    تطبيق تصفية تلقائية (Auto Filter)
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="autoFitColumns"
                    checked={config.autoFitColumns}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, autoFitColumns: checked as boolean })
                    }
                  />
                  <Label htmlFor="autoFitColumns" className="cursor-pointer">
                    ضبط عرض الأعمدة تلقائياً (Auto-fit Columns)
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Formatting Tab */}
          <TabsContent value="formatting" className="space-y-4">
            <div className="space-y-4">
              {/* Header Colors */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">ألوان الرأس</Label>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="headerBg" className="text-sm mb-2 block">
                      لون خلفية الرأس
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="headerBg"
                        type="color"
                        value={config.headerBackgroundColor}
                        onChange={(e) =>
                          setConfig({ ...config, headerBackgroundColor: e.target.value })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={config.headerBackgroundColor}
                        onChange={(e) =>
                          setConfig({ ...config, headerBackgroundColor: e.target.value })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="headerText" className="text-sm mb-2 block">
                      لون نص الرأس
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="headerText"
                        type="color"
                        value={config.headerTextColor}
                        onChange={(e) =>
                          setConfig({ ...config, headerTextColor: e.target.value })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={config.headerTextColor}
                        onChange={(e) =>
                          setConfig({ ...config, headerTextColor: e.target.value })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row Colors */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">ألوان الصفوف</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="zebraStriping"
                      checked={config.zebraStriping}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, zebraStriping: checked as boolean })
                      }
                    />
                    <Label htmlFor="zebraStriping" className="text-sm cursor-pointer">
                      تفعيل Zebra Striping
                    </Label>
                  </div>
                </div>

                {config.zebraStriping && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="evenRow" className="text-sm mb-2 block">
                        لون الصفوف الزوجية
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="evenRow"
                          type="color"
                          value={config.evenRowColor}
                          onChange={(e) =>
                            setConfig({ ...config, evenRowColor: e.target.value })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          type="text"
                          value={config.evenRowColor}
                          onChange={(e) =>
                            setConfig({ ...config, evenRowColor: e.target.value })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="oddRow" className="text-sm mb-2 block">
                        لون الصفوف الفردية
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="oddRow"
                          type="color"
                          value={config.oddRowColor}
                          onChange={(e) =>
                            setConfig({ ...config, oddRowColor: e.target.value })
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          type="text"
                          value={config.oddRowColor}
                          onChange={(e) =>
                            setConfig({ ...config, oddRowColor: e.target.value })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Border Style & Font Size */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-base font-semibold">إعدادات إضافية</Label>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="borderStyle" className="text-sm mb-2 block">
                      نمط الحدود
                    </Label>
                    <Select
                      value={config.borderStyle}
                      onValueChange={(value: any) =>
                        setConfig({ ...config, borderStyle: value })
                      }
                    >
                      <SelectTrigger id="borderStyle">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">بدون حدود</SelectItem>
                        <SelectItem value="light">حدود خفيفة</SelectItem>
                        <SelectItem value="medium">حدود متوسطة</SelectItem>
                        <SelectItem value="thick">حدود سميكة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="fontSize" className="text-sm mb-2 block">
                      حجم الخط: {config.fontSize}
                    </Label>
                    <Slider
                      id="fontSize"
                      min={8}
                      max={16}
                      step={1}
                      value={[config.fontSize]}
                      onValueChange={(value) =>
                        setConfig({ ...config, fontSize: value[0] })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <div className="space-y-4">
              {/* Columns to Include */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">الأعمدة المطلوب تصديرها</Label>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeName"
                      checked={config.includeParticipantName}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeParticipantName: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeName" className="cursor-pointer">
                      اسم المشارك
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeEmail"
                      checked={config.includeParticipantEmail}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeParticipantEmail: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeEmail" className="cursor-pointer">
                      البريد الإلكتروني
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeDate"
                      checked={config.includeParticipationDate}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeParticipationDate: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeDate" className="cursor-pointer">
                      تاريخ المشاركة
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeTime"
                      checked={config.includeTimeSpent}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeTimeSpent: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeTime" className="cursor-pointer">
                      الوقت المستغرق
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeDevice"
                      checked={config.includeDevice}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeDevice: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeDevice" className="cursor-pointer">
                      الجهاز المستخدم
                    </Label>
                  </div>

                  {isQuiz && (
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="includeScore"
                        checked={config.includeScore}
                        onCheckedChange={(checked) =>
                          setConfig({ ...config, includeScore: checked as boolean })
                        }
                      />
                      <Label htmlFor="includeScore" className="cursor-pointer">
                        النتيجة (للاختبارات)
                      </Label>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeQuestions"
                      checked={config.includeAllQuestions}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeAllQuestions: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeQuestions" className="cursor-pointer font-semibold">
                      جميع الأسئلة والإجابات
                    </Label>
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-base font-semibold">خيارات إضافية</Label>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeStats"
                      checked={config.includeStatisticsRow}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeStatisticsRow: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeStats" className="cursor-pointer">
                      تضمين صف الإحصائيات
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeSummary"
                      checked={config.includeSummarySheet}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeSummarySheet: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeSummary" className="cursor-pointer">
                      تضمين ورقة ملخص منفصلة
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-4">
            <div className="space-y-4">
              {/* Header Info */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">معلومات الرأس</Label>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeTitle"
                      checked={config.includeEventTitle}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeEventTitle: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeTitle" className="cursor-pointer">
                      عنوان الحدث في الصف الأول
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeExportDate"
                      checked={config.includeExportDate}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeExportDate: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeExportDate" className="cursor-pointer">
                      تاريخ التصدير
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="includeCount"
                      checked={config.includeParticipantCount}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeParticipantCount: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeCount" className="cursor-pointer">
                      عدد المشاركين
                    </Label>
                  </div>
                </div>
              </div>

              {/* Custom Footer */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-base font-semibold">معلومات التذييل</Label>

                <div>
                  <Label htmlFor="customFooter" className="text-sm mb-2 block">
                    نص تذييل مخصص (اختياري)
                  </Label>
                  <Input
                    id="customFooter"
                    type="text"
                    placeholder="مثال: تم إنشاء هذا التقرير بواسطة Event Meena"
                    value={config.customFooter || ""}
                    onChange={(e) =>
                      setConfig({ ...config, customFooter: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Preview Info */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">معاينة الإعدادات</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>• التخطيط: {config.layout === "single-sheet" ? "ورقة واحدة" : "أوراق منفصلة"}</p>
                  <p>• عدد المشاركين: {responses.length}</p>
                  <p>• عدد الأسئلة: {components.filter(c => c.type === "question" || c.type === "rating").length}</p>
                  {config.includeSummarySheet && <p>• سيتم إضافة ورقة ملخص</p>}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة تعيين
          </Button>
          <Button onClick={handleExport} disabled={isExporting} className="bg-green-600 hover:bg-green-700">
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                جاري التصدير...
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 ml-2" />
                تصدير Excel
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

