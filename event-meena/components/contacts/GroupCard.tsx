"use client";

import { Contact, Group } from "@/types/contact";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Edit, Trash2, Mail, TrendingUp } from "lucide-react";

interface GroupCardProps {
  group: Group;
  contacts: Contact[];
  onEdit: (group: Group) => void;
  onDelete: (id: string) => void;
}

export default function GroupCard({
  group,
  contacts,
  onEdit,
  onDelete,
}: GroupCardProps) {
  // الحصول على جهات الاتصال في المجموعة
  const groupContacts = contacts.filter((c) =>
    group.contactIds.includes(c.id)
  );

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: group.color }}
          >
            <Users className="w-6 h-6" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 mb-1 truncate">
              {group.name}
            </h3>
            {group.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {group.description}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(group)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(group.id)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Members Count */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">عدد الأعضاء</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {group.membersCount}
          </span>
        </div>
      </div>

      {/* Members Preview */}
      {groupContacts.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">الأعضاء:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {groupContacts.slice(0, 3).map((contact) => {
              const initials = contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={contact.id}
                  className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-lg"
                  title={contact.name}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: group.color }}
                  >
                    {initials}
                  </div>
                  <span className="text-xs text-gray-700 truncate max-w-[100px]">
                    {contact.name}
                  </span>
                </div>
              );
            })}
            {groupContacts.length > 3 && (
              <div className="flex items-center justify-center px-3 py-1 bg-gray-100 rounded-lg">
                <span className="text-xs text-gray-600 font-medium">
                  +{groupContacts.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">الأحداث المرسلة</p>
          <p className="text-sm font-bold text-gray-900">
            {group.stats.eventsSent}
          </p>
        </div>
        <div className="text-center border-r border-gray-100">
          <p className="text-xs text-gray-500 mb-1">معدل الاستجابة</p>
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3 text-blue-600" />
            <p className="text-sm font-bold text-blue-600">
              {group.stats.averageResponseRate}%
            </p>
          </div>
        </div>
      </div>

      {/* Last Event */}
      {group.stats.lastEventSent && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            آخر حدث:{" "}
            {new Date(group.stats.lastEventSent).toLocaleDateString("ar-SA")}
          </p>
        </div>
      )}
    </Card>
  );
}

