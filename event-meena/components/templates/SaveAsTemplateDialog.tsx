"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserTemplatesStore } from "@/store/userTemplatesStore";
import { Event } from "@/types/event";
import { BookmarkPlus, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface SaveAsTemplateDialogProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SaveAsTemplateDialog({
  event,
  open,
  onOpenChange,
}: SaveAsTemplateDialogProps) {
  const [name, setName] = useState(event.title);
  const [description, setDescription] = useState(event.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const createTemplate = useUserTemplatesStore((state) => state.createTemplate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("الرجاء إدخال اسم القالب");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create template from event
      const template = createTemplate({
        name: name.trim(),
        description: description.trim(),
        type: event.type,
        sections: event.sections,
        settings: event.settings,
        sourceEventId: event.id,
        sourceEventTitle: event.title,
        tags: [event.type],
      });

      setSuccess(true);
      
      // Show success message
      toast.success("تم حفظ القالب بنجاح!", {
        description: "يمكنك الآن استخدام هذا القالب لإنشاء أحداث جديدة",
      });

      // Close dialog after 1.5 seconds
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        setName(event.title);
        setDescription(event.description || "");
      }, 1500);
    } catch (error) {
      console.error("Error creating template:", error);
      toast.error("حدث خطأ أثناء حفظ القالب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      setSuccess(false);
      setName(event.title);
      setDescription(event.description || "");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        {success ? (
          // Success State
          <div className="py-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              تم الحفظ بنجاح!
            </h3>
            <p className="text-gray-600">
              تم حفظ القالب في قوالبك الخاصة
            </p>
          </div>
        ) : (
          // Form State
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                  <BookmarkPlus className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl">حفظ كقالب مخصص</DialogTitle>
                  <DialogDescription>
                    احفظ هذا الحدث كقالب لإعادة استخدامه لاحقاً
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {/* Template Name */}
              <div className="space-y-2">
                <Label htmlFor="template-name" className="text-base font-semibold">
                  اسم القالب <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="template-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: استبيان رضا العملاء"
                  required
                  className="text-base"
                />
              </div>

              {/* Template Description */}
              <div className="space-y-2">
                <Label htmlFor="template-description" className="text-base font-semibold">
                  وصف القالب <span className="text-gray-400 text-sm">(اختياري)</span>
                </Label>
                <Textarea
                  id="template-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف مختصر للقالب وكيفية استخدامه..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Template Info */}
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-semibold text-blue-900">سيتم حفظ:</p>
                    <ul className="list-disc list-inside space-y-0.5 mr-2">
                      <li>جميع الأقسام ({event.sections.length} قسم)</li>
                      <li>جميع المكونات والأسئلة</li>
                      <li>الإعدادات والتخصيصات</li>
                      <li>رسائل الشكر والنتائج</li>
                    </ul>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !name.trim()}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      حفظ القالب
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

