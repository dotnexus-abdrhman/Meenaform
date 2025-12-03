"use client";

import { useRouter } from "next/navigation";
import { Eye, Edit, BarChart3, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEventsStore } from "@/store/eventsStore";
import EventStatusBadge from "@/components/events/EventStatusBadge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

export default function RecentEventsTable() {
  const router = useRouter();
  const { events, isLoading } = useEventsStore();
  const { toast } = useToast();

  // أحدث 5 أحداث
  const recentEvents = events.slice(0, 5);

  const handleCopyLink = async (eventId: string) => {
    const eventUrl = `${window.location.origin}/e/${eventId}`;
    try {
      await navigator.clipboard.writeText(eventUrl);
      toast({
        title: "تم النسخ!",
        description: "تم نسخ رابط الحدث إلى الحافظة",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل نسخ الرابط",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">الأحداث الأخيرة</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (recentEvents.length === 0) {
    return (
      <Card className="p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">الأحداث الأخيرة</h3>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4">لا توجد أحداث بعد</p>
          <Button
            onClick={() => router.push("/dashboard/events/new")}
            variant="outline"
            className="border-[#1a56db] text-[#1a56db] hover:bg-blue-50"
          >
            إنشاء حدث جديد
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">الأحداث الأخيرة</h3>
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/events")}
          className="text-[#1a56db] hover:text-[#1648c7]"
        >
          عرض الكل
        </Button>
      </div>

      <div className="space-y-3">
        {recentEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 group"
          >
            {/* معلومات الحدث */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-gray-900 truncate group-hover:text-[#1a56db] transition-colors duration-300">
                  {event.title}
                </h4>
                <EventStatusBadge status={event.status} />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  {format(new Date(event.createdAt), "d MMMM yyyy", {
                    locale: ar,
                  })}
                </span>
                <span>•</span>
                <span>{event.stats.totalResponses} رد</span>
                <span>•</span>
                <span>{event.stats.views} مشاهدة</span>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push(`/dashboard/events/${event.id}`)}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  router.push(`/dashboard/events/${event.id}/edit`)
                }
                className="hover:bg-green-50 hover:text-green-600"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  router.push(`/dashboard/events/${event.id}/results`)
                }
                className="hover:bg-purple-50 hover:text-purple-600"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/events/${event.id}`)}
                  >
                    عرض التفاصيل
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/events/${event.id}/edit`)
                    }
                  >
                    تعديل
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/events/${event.id}/results`)
                    }
                  >
                    النتائج
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleCopyLink(event.id)}
                  >
                    نسخ الرابط
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

