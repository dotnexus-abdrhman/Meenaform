"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Component } from "@/types/component";
import { EventType } from "@/types/event";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Settings, Trash2, GripVertical } from "lucide-react";
import ComponentRenderer from "@/components/events/participate/ComponentRenderer";

interface SortableComponentCardProps {
  component: Component;
  index: number;
  eventType: EventType;
  onEdit: (component: Component) => void;
  onDelete: (componentId: string) => void;
}

export default function SortableComponentCard({
  component,
  index,
  eventType,
  onEdit,
  onDelete,
}: SortableComponentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const handleDelete = () => {
    onDelete(component.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={`
          relative p-6 transition-all duration-200 border-2
          ${isDragging 
            ? "border-primary shadow-2xl scale-[1.02] bg-blue-50/50" 
            : isHovered 
              ? "border-primary/50 shadow-lg bg-blue-50/30" 
              : "border-gray-100 hover:border-gray-200"
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Drag Handle & Actions - تظهر عند Hover */}
        <div
          className={`
            absolute top-2 left-2 flex items-center gap-2 transition-opacity duration-200
            ${isHovered || isDragging ? "opacity-100" : "opacity-0"}
          `}
        >
          {/* Drag Handle - مقبض السحب */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-500 touch-none"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(component)}
            className="h-8 px-3 bg-white hover:bg-primary hover:text-white border-gray-200"
          >
            <Settings className="w-3.5 h-3.5 ml-1.5" />
            تعديل
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="h-8 px-3 bg-white hover:bg-red-600 hover:text-white border-gray-200"
          >
            <Trash2 className="w-3.5 h-3.5 ml-1.5" />
            حذف
          </Button>
        </div>

        {/* Component Preview */}
        <div className={`${isHovered || isDragging ? "mt-8" : ""} transition-all duration-200`}>
          <ComponentRenderer
            component={component}
            value={undefined}
            onChange={() => {}}
            index={index}
            eventType={eventType}
            isPreviewMode={true}
          />
        </div>

        {/* Hover/Drag Overlay */}
        {(isHovered || isDragging) && (
          <div className={`absolute inset-0 border-2 rounded-lg pointer-events-none ${
            isDragging ? "border-primary" : "border-primary/30"
          }`} />
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف المكون</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا المكون؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

