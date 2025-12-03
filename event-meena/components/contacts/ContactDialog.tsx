"use client";

import { useState, useEffect } from "react";
import { Contact, Group, ContactFormData } from "@/types/contact";
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

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
  contact: Contact | null;
  groups: Group[];
}

export default function ContactDialog({
  open,
  onClose,
  contact,
  groups,
}: ContactDialogProps) {
  const { toast } = useToast();
  const { createContact, updateContact } = useContactsStore();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    notes: "",
    tags: [],
    groupIds: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || "",
        company: contact.company,
        jobTitle: contact.jobTitle,
        notes: contact.notes,
        tags: contact.tags,
        groupIds: contact.groupIds,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        notes: "",
        tags: [],
        groupIds: [],
      });
    }
    setErrors({});
  }, [contact, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
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
      if (contact) {
        await updateContact(contact.id, formData);
        toast({
          title: "تم التحديث!",
          description: "تم تحديث جهة الاتصال بنجاح",
        });
      } else {
        await createContact(formData);
        toast({
          title: "تم الإنشاء!",
          description: "تم إضافة جهة الاتصال بنجاح",
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

  const handleGroupToggle = (groupId: string) => {
    setFormData((prev) => ({
      ...prev,
      groupIds: prev.groupIds?.includes(groupId)
        ? prev.groupIds.filter((id) => id !== groupId)
        : [...(prev.groupIds || []), groupId],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {contact ? "تعديل جهة الاتصال" : "إضافة جهة اتصال جديدة"}
          </DialogTitle>
          <DialogDescription>
            {contact
              ? "قم بتعديل معلومات جهة الاتصال"
              : "أضف معلومات جهة الاتصال الجديدة"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* الاسم */}
          <div>
            <Label htmlFor="name">
              الاسم الكامل <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="أحمد محمد"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <Label htmlFor="email">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="ahmed@example.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* رقم الهاتف */}
          <div>
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+966501234567"
              dir="ltr"
            />
          </div>

          {/* الشركة */}
          <div>
            <Label htmlFor="company">الشركة</Label>
            <Input
              id="company"
              value={formData.company || ""}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="شركة التقنية"
            />
          </div>

          {/* المسمى الوظيفي */}
          <div>
            <Label htmlFor="jobTitle">المسمى الوظيفي</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle || ""}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              placeholder="مطور برمجيات"
            />
          </div>

          {/* الملاحظات */}
          <div>
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="أي ملاحظات إضافية..."
              rows={3}
            />
          </div>

          {/* المجموعات */}
          {groups.length > 0 && (
            <div>
              <Label>المجموعات</Label>
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`group-${group.id}`}
                      checked={formData.groupIds?.includes(group.id)}
                      onCheckedChange={() => handleGroupToggle(group.id)}
                    />
                    <label
                      htmlFor={`group-${group.id}`}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: group.color }}
                      />
                      <span className="text-sm">{group.name}</span>
                      <span className="text-xs text-gray-500">
                        ({group.membersCount} عضو)
                      </span>
                    </label>
                  </div>
                ))}
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
                : contact
                ? "حفظ التغييرات"
                : "إضافة جهة الاتصال"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

