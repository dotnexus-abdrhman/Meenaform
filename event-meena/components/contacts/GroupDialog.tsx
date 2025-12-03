"use client";

import { useState, useEffect } from "react";
import { Contact, Group, GroupFormData, DEFAULT_GROUP_COLORS } from "@/types/contact";
import { useContactsStore } from "@/store/contactsStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface GroupDialogProps {
  open: boolean;
  onClose: () => void;
  group: Group | null;
  contacts: Contact[];
}

export default function GroupDialog({
  open,
  onClose,
  group,
  contacts,
}: GroupDialogProps) {
  const { toast } = useToast();
  const { createGroup, updateGroup } = useContactsStore();

  const [formData, setFormData] = useState<GroupFormData>({
    name: "",
    description: "",
    color: DEFAULT_GROUP_COLORS[0],
    icon: "Users",
    contactIds: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name,
        description: group.description,
        color: group.color,
        icon: group.icon,
        contactIds: group.contactIds,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        color: DEFAULT_GROUP_COLORS[0],
        icon: "Users",
        contactIds: [],
      });
    }
    setErrors({});
  }, [group, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "اسم المجموعة مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (group) {
        await updateGroup(group.id, formData);
        toast({
          title: "تم التحديث!",
          description: "تم تحديث المجموعة بنجاح",
        });
      } else {
        await createGroup(formData);
        toast({
          title: "تم الإنشاء!",
          description: "تم إنشاء المجموعة بنجاح",
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ ما",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactToggle = (contactId: string) => {
    setFormData((prev) => ({
      ...prev,
      contactIds: prev.contactIds?.includes(contactId)
        ? prev.contactIds.filter((id) => id !== contactId)
        : [...(prev.contactIds || []), contactId],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {group ? "تعديل المجموعة" : "إنشاء مجموعة جديدة"}
          </DialogTitle>
          <DialogDescription>
            {group
              ? "قم بتعديل معلومات المجموعة"
              : "أنشئ مجموعة جديدة لتنظيم جهات الاتصال"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* اسم المجموعة */}
          <div>
            <Label htmlFor="name">
              اسم المجموعة <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="العائلة، الأصدقاء، العمل..."
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* الوصف */}
          <div>
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="وصف المجموعة..."
              rows={3}
            />
          </div>

          {/* اللون */}
          <div>
            <Label>اللون</Label>
            <div className="grid grid-cols-8 gap-2 mt-2">
              {DEFAULT_GROUP_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    formData.color === color
                      ? "ring-2 ring-offset-2 ring-primary scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {formData.color === color && (
                    <Check className="w-5 h-5 text-white mx-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* جهات الاتصال */}
          {contacts.length > 0 && (
            <div>
              <Label>جهات الاتصال ({formData.contactIds?.length || 0})</Label>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {contacts.map((contact) => {
                  const initials = contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <div key={contact.id} className="flex items-center gap-3">
                      <Checkbox
                        id={`contact-${contact.id}`}
                        checked={formData.contactIds?.includes(contact.id)}
                        onCheckedChange={() => handleContactToggle(contact.id)}
                      />
                      <label
                        htmlFor={`contact-${contact.id}`}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {initials}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-xs text-gray-500">
                            {contact.email}
                          </p>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting
                ? "جاري الحفظ..."
                : group
                ? "حفظ التغييرات"
                : "إنشاء المجموعة"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

