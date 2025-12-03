"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Star,
  MessageSquare,
  ClipboardList,
  ThumbsUp,
  Search,
  Clock,
  FileText,
  Layers,
  ArrowRight,
  Sparkles,
  BookmarkCheck,
  Trash2,
  Copy,
  Edit,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { eventTemplates } from "@/data/templates";
import { useEventBuilderStore } from "@/store/eventBuilderStore";
import { useUserTemplatesStore } from "@/store/userTemplatesStore";

// Map icon names to components
const iconMap: Record<string, any> = {
  GraduationCap,
  Star,
  MessageSquare,
  ClipboardList,
  ThumbsUp,
};

// Category colors
const categoryColors: Record<string, string> = {
  exam: "bg-blue-100 text-blue-700",
  survey: "bg-purple-100 text-purple-700",
  poll: "bg-green-100 text-green-700",
  form: "bg-orange-100 text-orange-700",
  feedback: "bg-pink-100 text-pink-700",
};

// Category labels
const categoryLabels: Record<string, string> = {
  exam: "اختبار",
  survey: "استبيان",
  poll: "استطلاع رأي",
  form: "نموذج",
  feedback: "تقييم",
};

function TemplatesPageContent() {
  const router = useRouter();
  const { loadTemplate } = useEventBuilderStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("system");

  // User Templates Store
  const {
    templates: userTemplates,
    loadTemplates,
    deleteTemplate,
    duplicateTemplate,
  } = useUserTemplatesStore();

  // Load user templates on mount
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  // Filter system templates
  const filteredTemplates = eventTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter user templates
  const filteredUserTemplates = userTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || template.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(eventTemplates.map((t) => t.category))
  );

  const handleUseTemplate = (templateId: string) => {
    loadTemplate(templateId);
    router.push("/dashboard/events/new?from=template");
  };

  const handleUseUserTemplate = (templateId: string) => {
    const template = userTemplates.find((t) => t.id === templateId);
    if (!template) return;

    // Load template using the store's loadUserTemplate function
    const { loadUserTemplate } = useEventBuilderStore.getState();
    loadUserTemplate(template);

    // Increment usage count
    const { incrementUsageCount } = useUserTemplatesStore.getState();
    incrementUsageCount(templateId);

    // Navigate to event builder
    router.push("/dashboard/events/new?from=user-template");
  };

  const handleDeleteUserTemplate = (templateId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا القالب؟")) {
      deleteTemplate(templateId);
    }
  };

  const handleDuplicateUserTemplate = (templateId: string) => {
    duplicateTemplate(templateId);
  };

  return (
    <DashboardLayout
      title="القوالب"
      description="اختر قالباً جاهزاً أو استخدم قوالبك الخاصة"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              القوالب
            </h1>
            <p className="text-gray-600">
              اختر من القوالب الجاهزة أو استخدم قوالبك المخصصة
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/events/new")}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            البدء من الصفر
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                💡 نصيحة: القوالب قابلة للتعديل بالكامل
              </h3>
              <p className="text-sm text-gray-600">
                جميع القوالب هي نقطة بداية فقط. يمكنك تعديل الأسئلة، إضافة أقسام
                جديدة، حذف ما لا تحتاجه، وتخصيص كل شيء حسب احتياجاتك.
              </p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="system" className="gap-2">
              <Sparkles className="w-4 h-4" />
              القوالب الجاهزة
              <Badge variant="secondary" className="mr-1">
                {eventTemplates.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="user" className="gap-2">
              <BookmarkCheck className="w-4 h-4" />
              قوالبي الخاصة
              <Badge variant="secondary" className="mr-1">
                {userTemplates.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="ابحث عن قالب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                الكل
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {categoryLabels[category]}
                </Button>
              ))}
            </div>
          </div>

          {/* System Templates Tab */}
          <TabsContent value="system" className="mt-0">
            {filteredTemplates.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  لا توجد نتائج
                </h3>
                <p className="text-gray-600 mb-4">
                  لم نجد أي قوالب تطابق بحثك. جرب كلمات مختلفة أو اختر فئة أخرى.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  مسح البحث
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const Icon = iconMap[template.icon];
                  return (
                    <Card
                      key={template.id}
                      className="p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/50 group"
                    >
                      <div className="space-y-4">
                        {/* Icon and Category */}
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 border-0 gap-1">
                            <Sparkles className="w-3 h-3" />
                            قالب جاهز
                          </Badge>
                        </div>

                        {/* Title and Description */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {template.description}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Layers className="w-4 h-4" />
                            <span>{template.totalSections} أقسام</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{template.totalQuestions} سؤال</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>الوقت المقدر: {template.estimatedTime}</span>
                        </div>

                        {/* Action Button */}
                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => handleUseTemplate(template.id)}
                        >
                          <ArrowRight className="w-4 h-4 ml-2" />
                          استخدام هذا القالب
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* User Templates Tab */}
          <TabsContent value="user" className="mt-0">
            {filteredUserTemplates.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookmarkCheck className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  لم تقم بإنشاء أي قوالب بعد!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  احفظ أحداثك المتكررة كقوالب لإعادة استخدامها بسهولة. وفر الوقت والجهد في إنشاء أحداث مشابهة.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/dashboard/events")}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                    عرض أحداثي
                  </Button>
                  <Button onClick={() => router.push("/dashboard/events/new")}>
                    <ArrowRight className="w-4 h-4 ml-2" />
                    إنشاء حدث جديد
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUserTemplates.map((template) => {
                  const typeConfig = {
                    survey: { label: "استبيان", color: "bg-blue-100 text-blue-700" },
                    poll: { label: "استطلاع", color: "bg-purple-100 text-purple-700" },
                    form: { label: "نموذج", color: "bg-green-100 text-green-700" },
                    quiz: { label: "اختبار", color: "bg-orange-100 text-orange-700" },
                  };
                  const config = typeConfig[template.type];

                  return (
                    <Card
                      key={template.id}
                      className="p-6 hover:shadow-lg transition-all duration-200 hover:border-amber-500/50 group relative"
                    >
                      <div className="space-y-4">
                        {/* Icon and Badge */}
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center group-hover:from-amber-200 group-hover:to-yellow-200 transition-colors">
                            <BookmarkCheck className="w-6 h-6 text-amber-600" />
                          </div>
                          <Badge className="bg-amber-100 text-amber-700 border-0 gap-1">
                            <Star className="w-3 h-3" />
                            قالبي
                          </Badge>
                        </div>

                        {/* Title and Description */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {template.description || "لا يوجد وصف"}
                          </p>
                        </div>

                        {/* Type and Stats */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge className={`${config.color} border-0`}>
                            {config.label}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Layers className="w-4 h-4" />
                            <span>{template.sections.length} أقسام</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{template.usageCount} استخدام</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                            onClick={() => handleUseUserTemplate(template.id)}
                          >
                            <ArrowRight className="w-4 h-4 ml-2" />
                            استخدام القالب
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleDuplicateUserTemplate(template.id)}>
                                <Copy className="w-4 h-4 ml-2" />
                                تكرار القالب
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteUserTemplate(template.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="w-4 h-4 ml-2" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-50 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                لم تجد القالب المناسب؟
              </h3>
              <p className="text-sm text-gray-600">
                ابدأ من الصفر وأنشئ حدثك الخاص بالطريقة التي تريدها
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => router.push("/dashboard/events/new")}
            >
              <ArrowRight className="w-5 h-5 ml-2" />
              إنشاء حدث جديد
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function TemplatesPage() {
  return (
    <ProtectedRoute>
      <TemplatesPageContent />
    </ProtectedRoute>
  );
}

