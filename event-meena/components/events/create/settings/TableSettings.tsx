"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TableSettings as TableSettingsType, TableType, TableColumn, TableCalculation } from "@/types/component";
import { Table as TableIcon, Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface TableSettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: TableSettingsType) => void;
  initialSettings?: Partial<TableSettingsType>;
}

export default function TableSettings({
  open,
  onClose,
  onSave,
  initialSettings,
}: TableSettingsProps) {
  const [label, setLabel] = useState(initialSettings?.label || "");
  const [description, setDescription] = useState(initialSettings?.description || "");
  const [tableType, setTableType] = useState<TableType>(
    initialSettings?.tableType || "simple"
  );
  const [columns, setColumns] = useState<TableColumn[]>(
    initialSettings?.columns || [
      { id: uuidv4(), label: "العمود 1", type: "text", required: false },
      { id: uuidv4(), label: "العمود 2", type: "text", required: false },
    ]
  );
  const [rowCount, setRowCount] = useState(initialSettings?.rowCount || 3);
  const [tableData, setTableData] = useState<Record<number, Record<string, string>>>(
    initialSettings?.tableData || {}
  );
  const [calculations, setCalculations] = useState(initialSettings?.calculations || []);

  const handleSave = () => {
    if (!label.trim()) {
      alert("يرجى إدخال عنوان الجدول");
      return;
    }

    if (columns.length === 0) {
      alert("يجب إضافة عمود واحد على الأقل");
      return;
    }

    const settings: TableSettingsType = {
      type: "table",
      label: label.trim(),
      description: description.trim() || undefined,
      tableType,
      columns: columns.filter(c => c.label.trim()),
      rowCount,
      tableData,
      calculations: tableType === "calculation" ? calculations : undefined,
    };

    onSave(settings);
    onClose();
  };

  const addColumn = () => {
    setColumns([
      ...columns,
      { id: uuidv4(), label: `العمود ${columns.length + 1}`, type: "text", required: false },
    ]);
  };

  const removeColumn = (id: string) => {
    if (columns.length > 1) {
      setColumns(columns.filter(c => c.id !== id));
    }
  };

  const updateColumn = (id: string, updates: Partial<TableColumn>) => {
    setColumns(columns.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const updateCellData = (rowIndex: number, columnId: string, value: string) => {
    setTableData(prev => ({
      ...prev,
      [rowIndex]: {
        ...(prev[rowIndex] || {}),
        [columnId]: value,
      },
    }));
  };

  const getCellData = (rowIndex: number, columnId: string): string => {
    return tableData[rowIndex]?.[columnId] || "";
  };

  const addCalculation = () => {
    const numericColumns = columns.filter(c => c.type === "number");
    if (numericColumns.length === 0) {
      alert("يجب إضافة عمود رقمي أولاً");
      return;
    }

    setCalculations([
      ...calculations,
      {
        id: uuidv4(),
        type: "sum",
        columnId: numericColumns[0].id,
        label: "المجموع",
      },
    ]);
  };

  const removeCalculation = (id: string) => {
    setCalculations(calculations.filter(c => c.id !== id));
  };

  const updateCalculation = (id: string, updates: any) => {
    setCalculations(calculations.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <TableIcon className="w-6 h-6" />
            إعدادات الجدول
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Table Type */}
          <div className="space-y-3">
            <Label>نوع الجدول *</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTableType("simple")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  tableType === "simple"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-medium">جدول بسيط</p>
                <p className="text-xs text-gray-600 mt-1">جدول عادي لإدخال البيانات</p>
              </button>
              <button
                type="button"
                onClick={() => setTableType("calculation")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  tableType === "calculation"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-medium">جدول حسابي</p>
                <p className="text-xs text-gray-600 mt-1">يدعم المعادلات (SUM, AVG, إلخ)</p>
              </button>
            </div>
          </div>

          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">عنوان الجدول *</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="مثال: جدول البيانات"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">وصف اختياري</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف توضيحي للجدول"
              rows={2}
            />
          </div>

          {/* Columns */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>الأعمدة</Label>
              <Button type="button" size="sm" variant="outline" onClick={addColumn}>
                <Plus className="w-4 h-4 ml-2" />
                إضافة عمود
              </Button>
            </div>
            <div className="space-y-3">
              {columns.map((column, index) => (
                <div key={column.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      العمود {index + 1}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeColumn(column.id)}
                      disabled={columns.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">اسم العمود</Label>
                      <Input
                        value={column.label}
                        onChange={(e) => updateColumn(column.id, { label: e.target.value })}
                        placeholder={`العمود ${index + 1}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">نوع البيانات</Label>
                      <Select
                        value={column.type}
                        onValueChange={(value: any) => updateColumn(column.id, { type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">نص</SelectItem>
                          <SelectItem value="number">رقم</SelectItem>
                          <SelectItem value="date">تاريخ</SelectItem>
                          <SelectItem value="select">قائمة منسدلة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={column.required}
                      onCheckedChange={(checked) => updateColumn(column.id, { required: checked === true })}
                    />
                    <Label className="text-xs">حقل مطلوب</Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row Count */}
          <div className="space-y-2">
            <Label htmlFor="rowCount">عدد الصفوف</Label>
            <Input
              id="rowCount"
              type="number"
              min="1"
              max="50"
              value={rowCount}
              onChange={(e) => setRowCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
            />
            <p className="text-xs text-gray-600">عدد الصفوف في الجدول (1-50)</p>
          </div>

          {/* Table Data Editor */}
          <div className="space-y-3">
            <Label>ملء بيانات الجدول</Label>
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700 border-b w-16">
                      #
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.id}
                        className="px-3 py-2 text-right text-xs font-semibold text-gray-700 border-b"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: rowCount }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="border-b last:border-b-0">
                      <td className="px-3 py-2 text-xs text-gray-600 bg-gray-50">
                        {rowIndex + 1}
                      </td>
                      {columns.map((column) => (
                        <td key={column.id} className="px-2 py-1">
                          <Input
                            value={getCellData(rowIndex, column.id)}
                            onChange={(e) => updateCellData(rowIndex, column.id, e.target.value)}
                            placeholder={column.type === "number" ? "0" : "..."}
                            type={column.type === "number" ? "number" : "text"}
                            className="h-8 text-sm"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600">
              💡 املأ الجدول بالبيانات التي تريد عرضها للمشاركين
            </p>
          </div>

          {/* Calculations (for calculation tables) */}
          {tableType === "calculation" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>العمليات الحسابية</Label>
                <Button type="button" size="sm" variant="outline" onClick={addCalculation}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة عملية حسابية
                </Button>
              </div>

              {calculations.length === 0 ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-sm text-blue-800">
                    💡 أضف عمليات حسابية لحساب المجموع، المتوسط، الحد الأدنى، أو الحد الأقصى
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {calculations.map((calc, index) => (
                    <div key={calc.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          عملية حسابية {index + 1}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeCalculation(calc.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">نوع العملية</Label>
                          <Select
                            value={calc.type}
                            onValueChange={(value: any) => updateCalculation(calc.id, { type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sum">المجموع (SUM)</SelectItem>
                              <SelectItem value="avg">المتوسط (AVG)</SelectItem>
                              <SelectItem value="min">الحد الأدنى (MIN)</SelectItem>
                              <SelectItem value="max">الحد الأقصى (MAX)</SelectItem>
                              <SelectItem value="count">العدد (COUNT)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">العمود</Label>
                          <Select
                            value={calc.columnId}
                            onValueChange={(value) => updateCalculation(calc.id, { columnId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {columns
                                .filter(c => c.type === "number")
                                .map(column => (
                                  <SelectItem key={column.id} value={column.id}>
                                    {column.label}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">تسمية النتيجة</Label>
                        <Input
                          value={calc.label}
                          onChange={(e) => updateCalculation(calc.id, { label: e.target.value })}
                          placeholder="مثال: المجموع الكلي"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="button" onClick={handleSave}>
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

