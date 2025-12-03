"use client";

import { Contact, Group } from "@/types/contact";
import ContactCard from "./ContactCard";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

interface ContactsListProps {
  contacts: Contact[];
  groups: Group[];
  isLoading: boolean;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactsList({
  contacts,
  groups,
  isLoading,
  onEdit,
  onDelete,
}: ContactsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              لا توجد جهات اتصال
            </h3>
            <p className="text-gray-600">
              ابدأ بإضافة جهات اتصال جديدة لإرسال الأحداث إليهم
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          groups={groups}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

