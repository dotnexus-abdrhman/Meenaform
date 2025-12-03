"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewToggleProps {
  view: "grid" | "table";
  onViewChange: (view: "grid" | "table") => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        className={`h-9 ${
          view === "grid"
            ? "bg-white shadow-sm"
            : "hover:bg-gray-200"
        }`}
      >
        <LayoutGrid className="w-4 h-4 ml-2" />
        بطاقات
      </Button>
      <Button
        variant={view === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("table")}
        className={`h-9 ${
          view === "table"
            ? "bg-white shadow-sm"
            : "hover:bg-gray-200"
        }`}
      >
        <List className="w-4 h-4 ml-2" />
        جدول
      </Button>
    </div>
  );
}

