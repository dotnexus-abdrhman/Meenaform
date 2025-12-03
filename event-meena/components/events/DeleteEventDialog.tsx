"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  eventTitle?: string;
  isLoading?: boolean;
}

export default function DeleteEventDialog({
  open,
  onOpenChange,
  onConfirm,
  eventTitle,
  isLoading = false,
}: DeleteEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-right">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl text-gray-900">تأكيد الحذف</DialogTitle>
          </div>
          <DialogDescription className="text-base text-right text-gray-600 leading-relaxed">
            هل أنت متأكد من حذف الحدث{" "}
            {eventTitle && (
              <span className="font-semibold text-gray-900">"{eventTitle}"</span>
            )}
            ؟
            <br />
            <span className="text-red-600 font-medium mt-2 block">
              لا يمكن التراجع عن هذا الإجراء.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row-reverse gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            إلغاء
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white min-w-[100px]"
          >
            <Trash2 className="w-4 h-4 ml-2" />
            {isLoading ? "جاري الحذف..." : "حذف"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

