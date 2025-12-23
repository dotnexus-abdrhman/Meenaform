"use client";

import { CustomTable } from "@/lib/pdf-export";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Copy, ChevronUp, ChevronDown, Table2 } from "lucide-react";

interface TableCardProps {
  table: CustomTable;
  index: number;
  totalTables: number;
  onEdit: (table: CustomTable) => void;
  onDelete: (tableId: string) => void;
  onDuplicate: (table: CustomTable) => void;
  onMoveUp: (tableId: string) => void;
  onMoveDown: (tableId: string) => void;
}

export function TableCard({
  table,
  index,
  totalTables,
  onEdit,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}: TableCardProps) {
  const handleDelete = () => {
    if (confirm(`هل أنت متأكد من حذف الجدول "${table.title}"؟`)) {
      onDelete(table.id);
    }
  };

  return (
    <div className="group relative border-2 rounded-lg p-4 hover:border-primary transition-all bg-white shadow-sm hover:shadow-md">
      {/* Order Badge */}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-10 border-2 border-white">
        {index + 1}
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Table2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 truncate" title={table.title}>
            {table.title}
          </h3>
          <p className="text-sm text-gray-600">
            {table.componentIds.length} مكون محدد
          </p>
        </div>
      </div>

      {/* Settings Summary */}
      <div className="flex flex-wrap gap-2 mb-4">
        {table.settings.includeSerialNumber && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
            ترقيم تسلسلي
          </span>
        )}
        {table.settings.showHeader !== false && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
            رأس الجدول
          </span>
        )}
        {table.settings.showTitle !== false && (
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
            عنوان الجدول
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Move Up/Down */}
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMoveUp(table.id)}
            disabled={index === 0}
            title="تحريك لأعلى"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMoveDown(table.id)}
            disabled={index === totalTables - 1}
            title="تحريك لأسفل"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1" />

        {/* Edit, Duplicate, Delete */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(table)}
          title="تعديل"
        >
          <Edit className="w-4 h-4 ml-1" />
          تعديل
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDuplicate(table)}
          title="نسخ"
        >
          <Copy className="w-4 h-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          title="حذف"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Empty Warning */}
      {table.componentIds.length === 0 && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
          ⚠️ هذا الجدول فارغ. يرجى إضافة مكونات.
        </div>
      )}
    </div>
  );
}

