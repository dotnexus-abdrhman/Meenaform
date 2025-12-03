"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users, UserPlus, Calendar, Mail } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface SendHistoryItem {
  id: string;
  eventId: string;
  eventTitle: string;
  eventUrl: string;
  sentAt: string;
  recipients: {
    contactIds?: string[];
    groupIds?: string[];
  };
  totalRecipients: number;
}

interface EventSendHistoryProps {
  eventId: string;
}

export default function EventSendHistory({ eventId }: EventSendHistoryProps) {
  const [sendHistory, setSendHistory] = useState<SendHistoryItem[]>([]);

  useEffect(() => {
    // Load send history from LocalStorage
    const history = JSON.parse(
      localStorage.getItem("event_send_history") || "[]"
    );
    
    // Filter by eventId
    const eventHistory = history.filter(
      (item: SendHistoryItem) => item.eventId === eventId
    );
    
    // Sort by date (newest first)
    eventHistory.sort(
      (a: SendHistoryItem, b: SendHistoryItem) =>
        new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );
    
    setSendHistory(eventHistory);
  }, [eventId]);

  if (sendHistory.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-50">
            <Send className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">سجل المشاركة</h3>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">لم يتم إرسال هذا الحدث بعد</p>
          <p className="text-sm text-gray-400">
            استخدم زر "مشاركة" لإرسال الحدث إلى جهات الاتصال أو المجموعات
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-50">
            <Send className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">سجل المشاركة</h3>
            <p className="text-sm text-gray-600">
              تم الإرسال {sendHistory.length} مرة
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm">
          {sendHistory.reduce((sum, item) => sum + item.totalRecipients, 0)} مستلم
        </Badge>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {sendHistory.map((item, index) => (
            <SendHistoryCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

function SendHistoryCard({
  item,
  index,
}: {
  item: SendHistoryItem;
  index: number;
}) {
  const hasContacts = item.recipients.contactIds && item.recipients.contactIds.length > 0;
  const hasGroups = item.recipients.groupIds && item.recipients.groupIds.length > 0;

  return (
    <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-primary/30 hover:bg-gray-50 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
            {index + 1}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              إرسال {hasContacts && hasGroups ? "لجهات اتصال ومجموعات" : hasContacts ? "لجهات اتصال" : "لمجموعات"}
            </p>
            <p className="text-xs text-gray-500">
              {format(new Date(item.sentAt), "d MMMM yyyy - h:mm a", {
                locale: ar,
              })}
            </p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <Mail className="w-3 h-3 ml-1" />
          تم الإرسال
        </Badge>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200">
        {hasContacts && (
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50">
              <UserPlus className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">جهات اتصال</p>
              <p className="text-sm font-semibold text-gray-900">
                {item.recipients.contactIds?.length || 0}
              </p>
            </div>
          </div>
        )}
        {hasGroups && (
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-50">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">مجموعات</p>
              <p className="text-sm font-semibold text-gray-900">
                {item.recipients.groupIds?.length || 0}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 col-span-2">
          <div className="p-2 rounded-lg bg-green-50">
            <Mail className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">إجمالي المستلمين</p>
            <p className="text-sm font-semibold text-gray-900">
              {item.totalRecipients} مستلم
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

