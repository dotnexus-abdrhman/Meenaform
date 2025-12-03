"use client";

import { useState, useRef } from "react";
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
import { FileDown, Loader2, RotateCcw, Upload, Image as ImageIcon, X, Plus, Table2, Sparkles } from "lucide-react";
import { PDFExportConfig, defaultPDFConfig, exportSingleTablePDF, exportSeparateTablesPDF, exportCustomTablesPDF, CustomTable } from "@/lib/pdf-export";
import { toast } from "sonner";
import { TableEditorDialog } from "./TableEditorDialog";
import { TableCard } from "./TableCard";
import { PDFEditorDialog } from "@/components/pdf/PDFEditorDialog";
import { PDFEditorProvider } from "@/contexts/PDFEditorContext";

interface ExportPDFDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  responses: any[];
  components: any[];
  isSingleParticipant?: boolean; // New prop to indicate single participant mode
}

export default function ExportPDFDialog({
  open,
  onOpenChange,
  eventTitle,
  responses,
  components,
  isSingleParticipant = false,
}: ExportPDFDialogProps) {
  // Set default layout to "separate-tables" for single participant
  const initialConfig = isSingleParticipant
    ? { ...defaultPDFConfig, layout: "separate-tables" as const }
    : defaultPDFConfig;

  const [config, setConfig] = useState<PDFExportConfig>(initialConfig);
  const [isExporting, setIsExporting] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const backgroundImageInputRef = useRef<HTMLInputElement>(null);

  // Get question/rating/signature components for selection
  const questionComponents = components.filter(c => c.type === "question" || c.type === "rating" || c.type === "signature");

  // Initialize selected components (all by default)
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>(
    questionComponents.map(c => c.id)
  );

  // Custom Tables State
  const [customTables, setCustomTables] = useState<CustomTable[]>([]);
  const [isTableEditorOpen, setIsTableEditorOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<CustomTable | null>(null);

  // Advanced PDF Editor State
  const [isAdvancedEditorOpen, setIsAdvancedEditorOpen] = useState(false);

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("يرجى رفع صورة فقط");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setConfig({
        ...config,
        logo: {
          data: reader.result as string,
          position: config.logo?.position || "top-right",
          size: config.logo?.size || "medium",
        },
      });
      toast.success("تم رفع الشعار بنجاح");
    };
    reader.readAsDataURL(file);
  };

  // Handle background image upload
  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("يرجى رفع صورة بصيغة PNG أو JPG فقط");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setConfig({
        ...config,
        backgroundImage: reader.result as string,
      });
      toast.success("تم رفع صورة الخلفية بنجاح");
    };
    reader.readAsDataURL(file);
  };

  // Remove background image
  const handleRemoveBackgroundImage = () => {
    setConfig({
      ...config,
      backgroundImage: undefined,
    });
    if (backgroundImageInputRef.current) {
      backgroundImageInputRef.current.value = "";
    }
    toast.success("تم إزالة صورة الخلفية");
  };

  // Handle component selection
  const handleToggleComponent = (componentId: string) => {
    setSelectedComponentIds(prev =>
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleSelectAllComponents = () => {
    setSelectedComponentIds(questionComponents.map(c => c.id));
  };

  const handleDeselectAllComponents = () => {
    setSelectedComponentIds([]);
  };

  // Custom Tables Management
  const handleAddTable = () => {
    setEditingTable(null);
    setIsTableEditorOpen(true);
  };

  const handleEditTable = (table: CustomTable) => {
    setEditingTable(table);
    setIsTableEditorOpen(true);
  };

  const handleSaveTable = (table: CustomTable) => {
    setCustomTables(prev => {
      const existing = prev.find(t => t.id === table.id);
      if (existing) {
        // Update existing table
        return prev.map(t => t.id === table.id ? table : t);
      } else {
        // Add new table
        return [...prev, table];
      }
    });
    toast.success(editingTable ? "تم حفظ التغييرات بنجاح!" : "تم إنشاء الجدول بنجاح!");
  };

  const handleDeleteTable = (tableId: string) => {
    setCustomTables(prev => prev.filter(t => t.id !== tableId));
    toast.success("تم حذف الجدول بنجاح");
  };

  const handleDuplicateTable = (table: CustomTable) => {
    const newTable: CustomTable = {
      ...table,
      id: `table-${Date.now()}`,
      title: `${table.title} (نسخة)`,
      order: customTables.length,
    };
    setCustomTables(prev => [...prev, newTable]);
    toast.success("تم نسخ الجدول بنجاح!");
  };

  const handleMoveTableUp = (tableId: string) => {
    setCustomTables(prev => {
      const index = prev.findIndex(t => t.id === tableId);
      if (index <= 0) return prev;

      const newTables = [...prev];
      [newTables[index - 1], newTables[index]] = [newTables[index], newTables[index - 1]];

      // Update order
      return newTables.map((t, i) => ({ ...t, order: i }));
    });
  };

  const handleMoveTableDown = (tableId: string) => {
    setCustomTables(prev => {
      const index = prev.findIndex(t => t.id === tableId);
      if (index < 0 || index >= prev.length - 1) return prev;

      const newTables = [...prev];
      [newTables[index], newTables[index + 1]] = [newTables[index + 1], newTables[index]];

      // Update order
      return newTables.map((t, i) => ({ ...t, order: i }));
    });
  };

  // Handle export
  const handleExport = async (editorSettings?: any) => {
    if (responses.length === 0) {
      toast.error("لا توجد نتائج للتصدير");
      return;
    }

    // Validation based on layout
    if (config.layout === "custom-tables") {
      if (customTables.length === 0) {
        toast.error("يرجى إنشاء جدول واحد على الأقل");
        return;
      }

      const validTables = customTables.filter(t => t.componentIds.length > 0);
      if (validTables.length === 0) {
        toast.error("جميع الجداول فارغة. يرجى إضافة مكونات إلى الجداول");
        return;
      }
    } else {
      if (selectedComponentIds.length === 0) {
        toast.error("يرجى اختيار مكون واحد على الأقل للتصدير");
        return;
      }
    }

    setIsExporting(true);

    try {
      // Update config with selected components
      const exportConfig = {
        ...config,
        selectedComponentIds: selectedComponentIds.length === questionComponents.length ? undefined : selectedComponentIds,
        customTables: customTables,
      };

      if (config.layout === "custom-tables") {
        await exportCustomTablesPDF(eventTitle, responses, components, exportConfig, editorSettings);
      } else if (config.layout === "single-table") {
        await exportSingleTablePDF(eventTitle, responses, components, exportConfig);
      } else {
        await exportSeparateTablesPDF(eventTitle, responses, components, exportConfig);
      }

      toast.success("تم تصدير PDF بنجاح!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error(error instanceof Error ? error.message : "حدث خطأ أثناء تصدير PDF");
    } finally {
      setIsExporting(false);
    }
  };

  // Handle advanced editor export
  const handleAdvancedExport = async (editorSettings: any) => {
    await handleExport(editorSettings);
  };

  // Reset to defaults
  const handleReset = () => {
    setConfig(defaultPDFConfig);
    toast.success("تم إعادة تعيين الإعدادات");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <FileDown className="w-6 h-6 text-primary" />
            تصدير النتائج إلى PDF
          </DialogTitle>
          <DialogDescription>
            قم بتخصيص شكل ومحتوى ملف PDF قبل التصدير
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="layout" className="w-full">
          <TabsList className="flex w-full overflow-x-auto no-scrollbar">
            <TabsTrigger value="layout" className="flex-shrink-0">التخطيط</TabsTrigger>
            {config.layout === "custom-tables" ? (
              <TabsTrigger value="custom-tables" className="flex-shrink-0">
                <Table2 className="w-4 h-4 ml-1" />
                <span className="hidden sm:inline">جداول مخصصة</span>
                <span className="sm:hidden">جداول</span>
              </TabsTrigger>
            ) : (
              <TabsTrigger value="components" className="flex-shrink-0">المكونات</TabsTrigger>
            )}
            <TabsTrigger value="colors" className="flex-shrink-0">الألوان</TabsTrigger>
            <TabsTrigger value="logo" className="flex-shrink-0">الشعار</TabsTrigger>
            <TabsTrigger value="content" className="flex-shrink-0">المحتوى</TabsTrigger>
            <TabsTrigger value="info" className="flex-shrink-0">معلومات</TabsTrigger>
          </TabsList>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold">تخطيط البيانات</Label>

              {isSingleParticipant ? (
                // Single participant mode - show info message
                <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center mt-0.5">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        تخطيط مشارك واحد
                      </h4>
                      <p className="text-sm text-gray-600">
                        سيتم تصدير بيانات المشارك في صفحة مخصصة مع جدول تفصيلي لجميع الأسئلة والإجابات.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Multiple participants mode - show both options
                <div className="space-y-3">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      config.layout === "single-table"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                    onClick={() => setConfig({ ...config, layout: "single-table" })}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center mt-0.5">
                        {config.layout === "single-table" && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          جدول واحد لجميع المشاركين
                        </h4>
                        <p className="text-sm text-gray-600">
                          جدول كبير يحتوي على جميع المشاركين وإجاباتهم. كل صف يمثل مشاركاً واحداً.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      config.layout === "separate-tables"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                    onClick={() => setConfig({ ...config, layout: "separate-tables" })}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center mt-0.5">
                        {config.layout === "separate-tables" && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          جدول منفصل لكل مشارك
                        </h4>
                        <p className="text-sm text-gray-600">
                          كل مشارك له صفحة خاصة مع جدول يعرض أسئلته وإجاباته بشكل تفصيلي.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      config.layout === "custom-tables"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                    onClick={() => setConfig({ ...config, layout: "custom-tables" })}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center mt-0.5">
                        {config.layout === "custom-tables" && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                          <Table2 className="w-4 h-4" />
                          جداول متعددة مخصصة
                          <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full">
                            جديد
                          </span>
                        </h4>
                        <p className="text-sm text-gray-600">
                          أنشئ عدة جداول مخصصة بمكونات مختلفة لكل جدول. تحكم كامل في التنظيم والتنسيق.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Font Settings */}
            <div className="space-y-3 pt-4 border-t">
              <Label className="text-base font-semibold">إعدادات الخط</Label>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="fontSize" className="text-sm mb-2 block">
                    حجم الخط: {config.fontSize}
                  </Label>
                  <Slider
                    id="fontSize"
                    min={8}
                    max={18}
                    step={1}
                    value={[config.fontSize]}
                    onValueChange={(value) => setConfig({ ...config, fontSize: value[0] })}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="fontFamily" className="text-sm mb-2 block">
                    نوع الخط
                  </Label>
                  <Select
                    value={config.fontFamily}
                    onValueChange={(value) => setConfig({ ...config, fontFamily: value })}
                  >
                    <SelectTrigger id="fontFamily">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Times">Times New Roman</SelectItem>
                      <SelectItem value="Courier">Courier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Custom Tables Tab - NEW */}
          <TabsContent value="custom-tables" className="space-y-4">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">الجداول المخصصة</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    أنشئ جداول متعددة بمكونات مختلفة لتنظيم بياناتك بشكل احترافي
                  </p>
                </div>
                <Button onClick={handleAddTable} className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة جدول جديد
                </Button>
              </div>

              {/* Tables List */}
              {customTables.length === 0 ? (
                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Table2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        لم يتم إنشاء أي جداول بعد
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        ابدأ بإنشاء جدول جديد لتنظيم بياناتك بالطريقة التي تريدها
                      </p>
                      <Button onClick={handleAddTable} variant="outline" className="gap-2">
                        <Plus className="w-4 h-4" />
                        إنشاء أول جدول
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tables Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {customTables
                      .sort((a, b) => a.order - b.order)
                      .map((table, index) => (
                        <TableCard
                          key={table.id}
                          table={table}
                          index={index}
                          totalTables={customTables.length}
                          onEdit={handleEditTable}
                          onDelete={handleDeleteTable}
                          onDuplicate={handleDuplicateTable}
                          onMoveUp={handleMoveTableUp}
                          onMoveDown={handleMoveTableDown}
                        />
                      ))}
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          📊 إجمالي الجداول: <span className="text-primary">{customTables.length}</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          إجمالي المكونات المُصدّرة:{" "}
                          <span className="font-medium">
                            {customTables.reduce((sum, t) => sum + t.componentIds.length, 0)}
                          </span>{" "}
                          من {questionComponents.length}
                        </p>
                      </div>
                      <Button onClick={handleAddTable} variant="outline" size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة جدول
                      </Button>
                    </div>
                  </div>

                  {/* Warnings */}
                  {customTables.some(t => t.componentIds.length === 0) && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        ⚠️ <strong>تحذير:</strong> بعض الجداول فارغة. يرجى إضافة مكونات إليها أو حذفها.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </TabsContent>

          {/* Components Tab - NEW */}
          <TabsContent value="components" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">اختيار المكونات للتصدير</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAllComponents}
                  >
                    تحديد الكل
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDeselectAllComponents}
                  >
                    إلغاء الكل
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                اختر الأسئلة والحقول التي تريد تضمينها في ملف PDF ({selectedComponentIds.length} من {questionComponents.length} محدد)
              </p>

              {/* Serial Number Option */}
              <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary bg-primary/5">
                <Checkbox
                  id="includeSerialNumber"
                  checked={config.includeSerialNumber}
                  onCheckedChange={(checked) =>
                    setConfig({ ...config, includeSerialNumber: checked as boolean })
                  }
                />
                <Label htmlFor="includeSerialNumber" className="cursor-pointer flex-1">
                  <div className="font-medium text-primary">إضافة رقم تسلسلي للمشاركين</div>
                  <div className="text-sm text-gray-600">
                    سيتم إضافة عمود "#" في بداية الجدول يحتوي على أرقام تسلسلية (1، 2، 3...)
                  </div>
                </Label>
              </div>

              {/* Components List */}
              <div className="border rounded-lg divide-y max-h-[400px] overflow-y-auto">
                {questionComponents.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>لا توجد مكونات متاحة للتصدير</p>
                  </div>
                ) : (
                  questionComponents.map((component, index) => {
                    const isSelected = selectedComponentIds.includes(component.id);
                    const label = component.settings?.label || "سؤال بدون عنوان";
                    const questionType = component.settings?.questionType || component.type;

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
                            <p className="font-medium text-gray-900 text-sm truncate" title={label}>
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

              {/* Summary */}
              {selectedComponentIds.length > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ <strong>تم تحديد {selectedComponentIds.length} مكون</strong> للتصدير
                    {config.includeSerialNumber && " (مع الترقيم التسلسلي)"}
                  </p>
                </div>
              )}

              {selectedComponentIds.length === 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    ⚠️ <strong>تحذير:</strong> لم يتم تحديد أي مكون. يرجى اختيار مكون واحد على الأقل للتصدير.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="headerColor" className="text-sm mb-2 block">
                  لون العناوين
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="headerColor"
                    type="color"
                    value={config.headerColor}
                    onChange={(e) => setConfig({ ...config, headerColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={config.headerColor}
                    onChange={(e) => setConfig({ ...config, headerColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="textColor" className="text-sm mb-2 block">
                  لون النصوص
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="textColor"
                    type="color"
                    value={config.textColor}
                    onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={config.textColor}
                    onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="backgroundColor" className="text-sm mb-2 block">
                  لون الخلفية
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Background Image Section */}
              <div className="border-t pt-4 mt-4">
                <Label className="text-sm mb-2 block font-semibold">صورة الخلفية</Label>
                <p className="text-xs text-gray-500 mb-3">
                  سيتم استخدام الصورة كخلفية للـ PDF بدلاً من اللون (اختياري)
                </p>

                {/* Upload Button */}
                <div className="flex gap-3 mb-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => backgroundImageInputRef.current?.click()}
                    className="flex-1"
                    disabled={!!config.backgroundImage}
                  >
                    <ImageIcon className="w-4 h-4 ml-2" />
                    رفع صورة خلفية
                  </Button>
                  <input
                    ref={backgroundImageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleBackgroundImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Image Preview */}
                {config.backgroundImage && (
                  <div className="relative border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded overflow-hidden border">
                        <img
                          src={config.backgroundImage}
                          alt="Background Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">صورة الخلفية</p>
                        <p className="text-xs text-gray-500">سيتم استخدامها كخلفية للـ PDF</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveBackgroundImage}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 ml-1" />
                        إزالة
                      </Button>
                    </div>
                  </div>
                )}

                {/* Info Note */}
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700">
                    💡 <strong>نصيحة:</strong> استخدم صورة بجودة عالية وألوان فاتحة لضمان وضوح النصوص. الحد الأقصى: 5 ميجابايت.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Logo Tab */}
          <TabsContent value="logo" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm mb-2 block">رفع الشعار</Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => logoInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 ml-2" />
                    {config.logo ? "تغيير الشعار" : "رفع شعار"}
                  </Button>
                  {config.logo && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setConfig({ ...config, logo: undefined })}
                    >
                      إزالة
                    </Button>
                  )}
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {config.logo && (
                  <div className="mt-3 p-3 border rounded-lg bg-gray-50">
                    <img
                      src={config.logo.data}
                      alt="Logo preview"
                      className="max-w-[100px] max-h-[100px] object-contain"
                    />
                  </div>
                )}
              </div>

              {config.logo && (
                <>
                  <div>
                    <Label htmlFor="logoPosition" className="text-sm mb-2 block">
                      موضع الشعار
                    </Label>
                    <Select
                      value={config.logo.position}
                      onValueChange={(value: any) =>
                        setConfig({
                          ...config,
                          logo: { ...config.logo!, position: value },
                        })
                      }
                    >
                      <SelectTrigger id="logoPosition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-right">أعلى اليمين</SelectItem>
                        <SelectItem value="top-left">أعلى اليسار</SelectItem>
                        <SelectItem value="center">في المنتصف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="logoSize" className="text-sm mb-2 block">
                      حجم الشعار
                    </Label>
                    <Select
                      value={config.logo.size}
                      onValueChange={(value: any) =>
                        setConfig({
                          ...config,
                          logo: { ...config.logo!, size: value },
                        })
                      }
                    >
                      <SelectTrigger id="logoSize">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">صغير</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="large">كبير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold">محتوى التصدير</Label>
              <p className="text-sm text-gray-600">
                اختر أنواع البيانات التي تريد تضمينها في PDF
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Checkbox
                    id="includeParticipantName"
                    checked={config.includeParticipantName}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeParticipantName: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeParticipantName" className="cursor-pointer flex-1">
                    <div className="font-medium">تضمين اسم المشارك</div>
                    <div className="text-sm text-gray-600">عرض أسماء المشاركين من بيانات التسجيل</div>
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Checkbox
                    id="includeParticipationDate"
                    checked={config.includeParticipationDate}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeParticipationDate: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeParticipationDate" className="cursor-pointer flex-1">
                    <div className="font-medium">تضمين تاريخ المشاركة</div>
                    <div className="text-sm text-gray-600">عرض تاريخ ووقت إرسال كل مشارك</div>
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Checkbox
                    id="includeTextAnswers"
                    checked={config.includeTextAnswers}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeTextAnswers: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeTextAnswers" className="cursor-pointer flex-1">
                    <div className="font-medium">تضمين الإجابات النصية</div>
                    <div className="text-sm text-gray-600">
                      نصوص قصيرة وطويلة، بريد إلكتروني، هاتف، أرقام، روابط
                    </div>
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Checkbox
                    id="includeChoices"
                    checked={config.includeChoices}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeChoices: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeChoices" className="cursor-pointer flex-1">
                    <div className="font-medium">تضمين الاختيارات</div>
                    <div className="text-sm text-gray-600">
                      اختيار من متعدد، اختيار متعدد، نعم/لا، قوائم منسدلة
                    </div>
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Checkbox
                    id="includeRatings"
                    checked={config.includeRatings}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeRatings: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeRatings" className="cursor-pointer flex-1">
                    <div className="font-medium">تضمين التقييمات</div>
                    <div className="text-sm text-gray-600">نجوم، قلوب، إيموجي، أرقام</div>
                  </Label>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>ملاحظة:</strong> الصور والملفات المرفوعة (PDF، فيديو) لن يتم تضمينها في التصدير.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold">معلومات إضافية</Label>
              <p className="text-sm text-gray-600">
                أضف معلومات إضافية إلى PDF
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Checkbox
                    id="includeEventTitle"
                    checked={config.includeEventTitle}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeEventTitle: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeEventTitle" className="cursor-pointer flex-1">
                    <div className="font-medium">إضافة عنوان الحدث في الأعلى</div>
                    <div className="text-sm text-gray-600">عرض عنوان الحدث في رأس PDF</div>
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Checkbox
                    id="includeExportDate"
                    checked={config.includeExportDate}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeExportDate: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeExportDate" className="cursor-pointer flex-1">
                    <div className="font-medium">إضافة تاريخ التصدير</div>
                    <div className="text-sm text-gray-600">عرض تاريخ إنشاء ملف PDF</div>
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Checkbox
                    id="includeParticipantCount"
                    checked={config.includeParticipantCount}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeParticipantCount: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeParticipantCount" className="cursor-pointer flex-1">
                    <div className="font-medium">إضافة عدد المشاركين</div>
                    <div className="text-sm text-gray-600">عرض إجمالي عدد المشاركين</div>
                  </Label>
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="customFooter" className="text-sm">
                    نص تذييل مخصص (اختياري)
                  </Label>
                  <Input
                    id="customFooter"
                    type="text"
                    placeholder="مثال: شكراً لمشاركتكم في الاستبيان"
                    value={config.customFooter || ""}
                    onChange={(e) => setConfig({ ...config, customFooter: e.target.value })}
                  />
                  <p className="text-xs text-gray-500">
                    سيظهر هذا النص في أسفل كل صفحة من PDF
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:flex-wrap">
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة تعيين
          </Button>

          {/* Advanced PDF Editor Button - Only for custom tables */}
          {config.layout === "custom-tables" && customTables.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setIsAdvancedEditorOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:from-purple-100 hover:to-blue-100"
            >
              <Sparkles className="w-4 h-4 ml-2 text-purple-600" />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                محرر PDF متقدم
              </span>
            </Button>
          )}

          <Button onClick={() => handleExport()} disabled={isExporting} className="w-full sm:w-auto">
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                جاري التصدير...
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 ml-2" />
                تصدير PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Table Editor Dialog */}
      <TableEditorDialog
        open={isTableEditorOpen}
        onOpenChange={setIsTableEditorOpen}
        table={editingTable}
        components={components}
        onSave={handleSaveTable}
        existingTables={customTables}
      />

      {/* Advanced PDF Editor Dialog */}
      <PDFEditorProvider>
        <PDFEditorDialog
          open={isAdvancedEditorOpen}
          onOpenChange={setIsAdvancedEditorOpen}
          eventData={{
            eventTitle: eventTitle,
            eventId: 'current-event',
            components: components,
            responses: responses,
            customTables: customTables,
          }}
          onExport={handleAdvancedExport}
        />
      </PDFEditorProvider>
    </Dialog>
  );
}

