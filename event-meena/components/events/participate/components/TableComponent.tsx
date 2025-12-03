"use client";

import { Component, TableSettings } from "@/types/component";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableComponentProps {
  component: Component;
  value: any;
  onChange: (value: any) => void;
  index: number;
}

/**
 * مكون الجدول للعرض فقط (Read-Only)
 * يعرض الجدول الذي أنشأه منشئ الحدث للمشاركين
 * المشاركون لا يستطيعون تعديل البيانات
 */
export default function TableComponent({
  component,
  index,
}: TableComponentProps) {
  const settings = component.settings as TableSettings;
  const columns = settings.columns || [];
  const rowCount = settings.rowCount || 0;
  const tableData = settings.tableData || {};
  const tableType = settings.tableType || "simple";
  const calculations = settings.calculations || [];

  // حساب قيمة العملية الحسابية
  const calculateValue = (calc: { type: string; columnId: string }) => {
    const values: number[] = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const cellValue = tableData[rowIndex]?.[calc.columnId];
      if (cellValue !== undefined && cellValue !== "") {
        const num = parseFloat(cellValue);
        if (!isNaN(num)) {
          values.push(num);
        }
      }
    }

    if (values.length === 0) return 0;

    switch (calc.type) {
      case "sum":
        return values.reduce((sum, val) => sum + val, 0);
      case "avg":
        return values.reduce((sum, val) => sum + val, 0) / values.length;
      case "min":
        return Math.min(...values);
      case "max":
        return Math.max(...values);
      case "count":
        return values.length;
      default:
        return 0;
    }
  };

  // الحصول على قيمة الخلية
  const getCellValue = (rowIndex: number, columnId: string): string => {
    return tableData[rowIndex]?.[columnId] || "";
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
          {index + 1}
        </span>
        <div className="flex-1">
          <Label className="text-xl font-semibold text-gray-900 leading-relaxed">
            {settings.label || "جدول"}
          </Label>
          {settings.description && (
            <p className="text-gray-600 mt-2 text-base leading-relaxed">
              {settings.description}
            </p>
          )}
        </div>
      </div>

      {/* Table - Read Only */}
      <div className="pr-11 overflow-x-auto">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-900 text-center w-16">
                  #
                </TableHead>
                {columns.map((col) => (
                  <TableHead key={col.id} className="font-bold text-gray-900 text-center">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-gray-50/50">
                  <TableCell className="font-semibold text-gray-600 text-center bg-gray-50">
                    {rowIndex + 1}
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.id} className="text-center text-gray-900">
                      {getCellValue(rowIndex, col.id) || (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Calculations Footer (for calculation tables) */}
              {tableType === "calculation" && calculations.length > 0 && (
                <>
                  {calculations.map((calc) => {
                    const column = columns.find((c) => c.id === calc.columnId);
                    if (!column) return null;

                    return (
                      <TableRow key={calc.id} className="bg-blue-50 font-bold">
                        <TableCell className="text-gray-900 text-center">
                          {calc.label}
                        </TableCell>
                        {columns.map((col) => (
                          <TableCell key={col.id} className="text-center">
                            {col.id === calc.columnId ? (
                              <span className="text-blue-700">
                                {calculateValue(calc).toFixed(2)}
                              </span>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

