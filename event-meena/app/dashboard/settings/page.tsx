"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { User, Shield, ChevronLeft } from "lucide-react";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AccountSettings from "@/components/settings/AccountSettings";

function SettingsPageContent() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      value: "profile",
      label: "الملف الشخصي",
      icon: User,
      description: "إدارة معلوماتك الشخصية",
    },
    {
      value: "account",
      label: "الأمان",
      icon: Shield,
      description: "تغيير كلمة المرور",
    },
  ];

  return (
    <DashboardLayout
      title="الإعدادات"
      description="إدارة حسابك وتفضيلاتك"
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <a href="/dashboard" className="hover:text-primary">
            لوحة التحكم
          </a>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-gray-900 font-medium">الإعدادات</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الإعدادات</h1>
          <p className="text-gray-600">
            إدارة حسابك، تفضيلاتك، وإعدادات الخصوصية
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tabs List - Desktop */}
          <div className="hidden lg:block">
            <Card className="p-2 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-300">
              <TabsList className="grid grid-cols-2 gap-2 bg-transparent h-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="group flex flex-col items-start gap-2 p-4 data-[state=active]:bg-[#1a56db] data-[state=active]:text-white rounded-lg transition-all"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Icon className="w-5 h-5" />
                        <span className="font-semibold">{tab.label}</span>
                      </div>
                      <span className="text-xs text-gray-600 group-data-[state=active]:text-white/80 text-right">
                        {tab.description}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Card>
          </div>

          {/* Tabs List - Mobile */}
          <div className="lg:hidden">
            <Card className="p-2 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-300">
              <TabsList className="grid grid-cols-2 gap-2 bg-transparent h-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center gap-2 p-3 data-[state=active]:bg-[#1a56db] data-[state=active]:text-white rounded-lg"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Card>
          </div>

          {/* Tab Contents */}
          <TabsContent value="profile" className="space-y-6">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsPageContent />
    </ProtectedRoute>
  );
}

