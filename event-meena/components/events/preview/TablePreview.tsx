"use client";

import { TableSettings } from "@/types/component";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface TablePreviewProps {
  settings: TableSettings;
}

export default function TablePreview({ settings }: TablePreviewProps) {
  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-center gap-2">
        <Label className="text-base font-semibold text-gray-900">
          {settings.label}
        </Label>
        <Badge variant="secondary" className="text-xs">
          {settings.tableType === "simple" ? "جدول عادي" : "جدول حسابي"}
        </Badge>
      </div>
      {settings.description && (
        <p className="text-sm text-gray-600">{settings.description}</p>
      )}

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {settings.columns.map((column) => (
                <th
                  key={column.id}
                  className="border-b border-gray-200 p-3 text-right text-sm font-semibold text-gray-900"
                  style={{ width: column.width ? `${column.width}px` : "auto" }}
                >
                  {column.label}
                  {column.required && <span className="text-red-500 mr-1">*</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: settings.rowCount }).map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {settings.columns.map((column) => {
                  const cellValue = settings.tableData?.[rowIndex]?.[column.id] || "";
                  
                  return (
                    <td key={column.id} className="border-b border-gray-200 p-3">
                      <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                        {cellValue || (
                          <span className="text-gray-400">
                            {column.type === "number" ? "0" : "-"}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          
          {/* Calculations Footer */}
          {settings.tableType === "calculation" && settings.calculations && settings.calculations.length > 0 && (
            <tfoot className="bg-blue-50">
              {settings.calculations.map((calc) => {
                const column = settings.columns.find((col) => col.id === calc.columnId);
                if (!column) return null;

                // حساب القيمة
                let calculatedValue = 0;
                const values = Array.from({ length: settings.rowCount })
                  .map((_, rowIndex) => {
                    const val = settings.tableData?.[rowIndex]?.[calc.columnId];
                    return val ? parseFloat(val) : 0;
                  })
                  .filter((v) => !isNaN(v));

                switch (calc.type) {
                  case "sum":
                    calculatedValue = values.reduce((sum, val) => sum + val, 0);
                    break;
                  case "avg":
                    calculatedValue = values.length > 0 
                      ? values.reduce((sum, val) => sum + val, 0) / values.length 
                      : 0;
                    break;
                  case "min":
                    calculatedValue = values.length > 0 ? Math.min(...values) : 0;
                    break;
                  case "max":
                    calculatedValue = values.length > 0 ? Math.max(...values) : 0;
                    break;
                  case "count":
                    calculatedValue = values.length;
                    break;
                }

                return (
                  <tr key={calc.id}>
                    <td
                      colSpan={settings.columns.length}
                      className="border-t-2 border-blue-200 p-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-blue-900">
                          {calc.label}
                        </span>
                        <span className="text-sm font-bold text-blue-900">
                          {calculatedValue.toFixed(2)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

