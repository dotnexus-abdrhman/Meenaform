"use client";

import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventsPageHeader() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* العنوان والوصف */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              أحداثي
            </h1>
            <p className="text-gray-600 text-lg">
              أنشئ وأدر جميع أحداثك التفاعلية من مكان واحد
            </p>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 border-primary/20 hover:border-primary hover:bg-primary/5"
            >
              <Link href="/dashboard/events/templates">
                <FileText className="w-5 h-5 ml-2" />
                إنشاء من قالب
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
            >
              <Link href="/dashboard/events/new">
                <Plus className="w-5 h-5 ml-2" />
                إنشاء حدث جديد
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

