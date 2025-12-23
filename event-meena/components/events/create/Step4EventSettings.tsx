"use client";

import { useState, useEffect } from "react";
import { useEventBuilderStore } from "@/store/eventBuilderStore";
import { useContactsStore } from "@/store/contactsStore";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Calendar,
  Lock,
  Edit,
  Eye,
  RefreshCw,
  Settings as SettingsIcon,
  MessageSquare,
  Trophy,
  AlertTriangle,
  Shield,
  Mail,
  X,
  Plus,
  Users,
  UserPlus,
  Search,
  Phone,
} from "lucide-react";
import { Contact, Group } from "@/types/contact";

export default function Step4EventSettings() {
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [showPrivateDialog, setShowPrivateDialog] = useState(false);
  const [showContactsDialog, setShowContactsDialog] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"contacts" | "groups">("contacts");
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  const {
    type,
    startDate,
    endDate,
    requireAuth,
    allowEdit,
    showResults,
    allowMultipleResponses,
    isPrivate,
    allowedEmails,
    thankYouMessage,
    successMessage,
    goodMessage,
    improvementMessage,
    setStartDate,
    setEndDate,
    setRequireAuth,
    setAllowEdit,
    setShowResults,
    setAllowMultipleResponses,
    setIsPrivate,
    setAllowedEmails,
    addAllowedEmail,
    removeAllowedEmail,
    setThankYouMessage,
    setSuccessMessage,
    setGoodMessage,
    setImprovementMessage,
  } = useEventBuilderStore();

  const { contacts, groups, fetchContacts, fetchGroups } = useContactsStore();

  // Fetch contacts on mount
  useEffect(() => {
    fetchContacts();
    fetchGroups();
  }, [fetchContacts, fetchGroups]);

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Add email handler
  const handleAddEmail = () => {
    const trimmedEmail = emailInput.trim().toLowerCase();
    if (!trimmedEmail) return;

    if (!validateEmail(trimmedEmail)) {
      setEmailError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    if (allowedEmails.includes(trimmedEmail)) {
      setEmailError("هذا البريد مضاف مسبقاً");
      return;
    }

    addAllowedEmail(trimmedEmail);
    setEmailInput("");
    setEmailError("");
  };

  // Handle key press (Enter to add)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  // Filter contacts/groups based on search
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle contact selection
  const toggleContactSelection = (contact: Contact) => {
    const isSelected = selectedContactIds.includes(contact.id);
    if (isSelected) {
      setSelectedContactIds(prev => prev.filter(id => id !== contact.id));
    } else {
      setSelectedContactIds(prev => [...prev, contact.id]);
    }
  };

  // Toggle group selection
  const toggleGroupSelection = (group: Group) => {
    const isSelected = selectedGroupIds.includes(group.id);
    if (isSelected) {
      setSelectedGroupIds(prev => prev.filter(id => id !== group.id));
    } else {
      setSelectedGroupIds(prev => [...prev, group.id]);
    }
  };

  // Add selected contacts/groups to allowed emails
  const handleAddFromContacts = () => {
    // Add selected contacts' emails
    selectedContactIds.forEach(contactId => {
      const contact = contacts.find(c => c.id === contactId);
      if (contact && contact.email && !allowedEmails.includes(contact.email.toLowerCase())) {
        addAllowedEmail(contact.email.toLowerCase());
      }
    });

    // Add selected groups' members' emails
    selectedGroupIds.forEach(groupId => {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        group.contactIds.forEach(contactId => {
          const contact = contacts.find(c => c.id === contactId);
          if (contact && contact.email && !allowedEmails.includes(contact.email.toLowerCase())) {
            addAllowedEmail(contact.email.toLowerCase());
          }
        });
      }
    });

    setShowContactsDialog(false);
    setSelectedContactIds([]);
    setSelectedGroupIds([]);
    setSearchQuery("");
  };

  // Handle private toggle
  const handlePrivateToggle = (value: boolean) => {
    if (value && !requireAuth) {
      // Show dialog explaining that requireAuth will be enabled
      setShowPrivateDialog(true);
    } else {
      setIsPrivate(value);
    }
  };

  // Confirm enabling private event
  const confirmEnablePrivate = () => {
    setIsPrivate(true); // This will also set requireAuth to true in the store
    setShowPrivateDialog(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          إعدادات الحدث
        </h2>
        <p className="text-gray-600">
          اضبط الإعدادات والخيارات المتقدمة لحدثك
        </p>
      </div>

      {/* Date Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-50">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">الفترة الزمنية</h3>
            <p className="text-sm text-gray-600">
              حدد متى يكون الحدث متاحاً للمشاركين
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">تاريخ البداية</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-11"
            />
            <p className="text-xs text-gray-500">
              اتركه فارغاً للبدء فوراً
            </p>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="endDate">تاريخ النهاية</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-11"
            />
            <p className="text-xs text-gray-500">
              اتركه فارغاً لعدم تحديد نهاية
            </p>
          </div>
        </div>
      </Card>

      {/* Access Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-50">
            <Lock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">إعدادات الوصول</h3>
            <p className="text-sm text-gray-600">
              تحكم في من يمكنه الوصول والمشاركة
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Require Auth */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <Label htmlFor="requireAuth" className="text-base font-semibold cursor-pointer">
                  يتطلب تسجيل دخول
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  المشاركون يجب أن يسجلوا الدخول قبل المشاركة
                </p>
              </div>
            </div>
            <Checkbox
              id="requireAuth"
              checked={requireAuth}
              onCheckedChange={(checked) => {
                if (checked === false && requireAuth === true) {
                  // Show warning dialog when trying to disable
                  setShowAuthWarning(true);
                } else {
                  // Enable directly without warning
                  setRequireAuth(true);
                }
              }}
            />
          </div>
        </div>
      </Card>

      {/* Response Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-50">
            <SettingsIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">إعدادات الردود</h3>
            <p className="text-sm text-gray-600">
              خيارات متعلقة بردود المشاركين
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Allow Edit */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3">
              <Edit className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <Label htmlFor="allowEdit" className="text-base font-semibold cursor-pointer">
                  السماح بتعديل الردود
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  المشاركون يمكنهم تعديل ردودهم بعد الإرسال
                </p>
              </div>
            </div>
            <Checkbox
              id="allowEdit"
              checked={allowEdit}
              onCheckedChange={(checked) => setAllowEdit(checked === true)}
            />
          </div>

          {/* Allow Multiple Responses */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <Label htmlFor="allowMultiple" className="text-base font-semibold cursor-pointer">
                  السماح بردود متعددة
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  المشارك يمكنه إرسال أكثر من رد واحد
                </p>
              </div>
            </div>
            <Checkbox
              id="allowMultiple"
              checked={allowMultipleResponses}
              onCheckedChange={(checked) => setAllowMultipleResponses(checked === true)}
            />
          </div>

          {/* Show Results - Only for Quizzes */}
          {type === "quiz" && (
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <Label htmlFor="showResults" className="text-base font-semibold cursor-pointer">
                    عرض النتائج للمشاركين
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    المشاركون يمكنهم رؤية النتائج بعد الإرسال
                  </p>
                </div>
              </div>
              <Checkbox
                id="showResults"
                checked={showResults}
                onCheckedChange={(checked) => setShowResults(checked === true)}
              />
            </div>
          )}

        </div>
      </Card>

      {/* Private Event Settings */}
      <Card className={`p-6 transition-all ${isPrivate ? 'border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50' : ''}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${isPrivate ? 'bg-purple-100' : 'bg-purple-50'}`}>
            <Shield className={`w-5 h-5 ${isPrivate ? 'text-purple-700' : 'text-purple-600'}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">الحدث الخاص</h3>
            <p className="text-sm text-gray-600">
              اجعل الحدث متاحاً فقط لأشخاص محددين
            </p>
          </div>
          <Checkbox
            id="isPrivate"
            checked={isPrivate}
            onCheckedChange={(checked) => handlePrivateToggle(checked === true)}
          />
        </div>

        {/* Private Event Content */}
        {isPrivate && (
          <div className="space-y-4 pt-4 border-t border-purple-200">
            {/* Email Input */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                إضافة بريد إلكتروني
              </Label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="أدخل البريد الإلكتروني..."
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setEmailError("");
                    }}
                    onKeyPress={handleKeyPress}
                    className={`pr-10 ${emailError ? 'border-red-500' : ''}`}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddEmail}
                  variant="outline"
                  className="gap-1"
                >
                  <Plus className="w-4 h-4" />
                  إضافة
                </Button>
              </div>
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
            </div>

            {/* Select from Contacts Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowContactsDialog(true)}
              className="w-full gap-2 border-dashed border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              <Users className="w-4 h-4" />
              اختر من جهات الاتصال
            </Button>

            {/* Allowed Emails List */}
            {allowedEmails.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">
                    المشاركون المسموح لهم ({allowedEmails.length})
                  </Label>
                  {allowedEmails.length > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setAllowedEmails([])}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      مسح الكل
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 p-3 bg-white rounded-lg border border-purple-200 max-h-40 overflow-y-auto">
                  {allowedEmails.map((email) => (
                    <Badge
                      key={email}
                      variant="secondary"
                      className="gap-1 py-1.5 px-3 bg-purple-100 text-purple-800 hover:bg-purple-200"
                    >
                      <Mail className="w-3 h-3" />
                      {email}
                      <button
                        type="button"
                        onClick={() => removeAllowedEmail(email)}
                        className="mr-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-purple-100/50 border border-purple-200 rounded-lg p-3">
              <p className="text-sm text-purple-800 flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">ℹ️</span>
                <span>
                  فقط الأشخاص في هذه القائمة سيتمكنون من الوصول للحدث.
                  سيُطلب منهم إدخال بريدهم الإلكتروني للتحقق.
                </span>
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Thank You Message */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              رسالة الشكر
            </h3>
            <p className="text-sm text-gray-600">
              خصص الرسالة التي ستظهر للمشاركين بعد الإرسال
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="thankYouMessage" className="text-base font-semibold">
            رسالة الشكر
          </Label>
          <Textarea
            id="thankYouMessage"
            value={thankYouMessage}
            onChange={(e) => setThankYouMessage(e.target.value)}
            placeholder="أدخل رسالة الشكر التي ستظهر للمشاركين بعد الإرسال"
            rows={4}
            className="mt-2 resize-none"
          />
          <p className="text-sm text-gray-500 mt-2 flex items-start gap-2">
            <span className="text-green-600 mt-0.5">ℹ️</span>
            <span>
              هذه الرسالة ستظهر للمشاركين بعد إرسال إجاباتهم بنجاح
            </span>
          </p>
        </div>
      </Card>

      {/* Quiz Result Messages - Only for Quiz with showResults enabled */}
      {type === "quiz" && showResults && (
        <Card className="p-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                رسائل النتائج (للاختبارات)
              </h3>
              <p className="text-sm text-gray-600">
                خصص الرسائل التي ستظهر للمشاركين حسب أدائهم في الاختبار
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Success Message */}
            <div>
              <Label htmlFor="successMessage" className="text-base font-semibold text-green-700">
                رسالة النجاح (درجة عالية)
              </Label>
              <Textarea
                id="successMessage"
                value={successMessage}
                onChange={(e) => setSuccessMessage(e.target.value)}
                placeholder="ممتاز! أداء رائع!"
                rows={2}
                className="mt-2 resize-none border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                تظهر للمشاركين الذين حصلوا على 80% أو أكثر
              </p>
            </div>

            {/* Good Message */}
            <div>
              <Label htmlFor="goodMessage" className="text-base font-semibold text-blue-700">
                رسالة الأداء الجيد (درجة متوسطة)
              </Label>
              <Textarea
                id="goodMessage"
                value={goodMessage}
                onChange={(e) => setGoodMessage(e.target.value)}
                placeholder="جيد جداً! استمر في التقدم"
                rows={2}
                className="mt-2 resize-none border-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                تظهر للمشاركين الذين حصلوا على 50% - 79%
              </p>
            </div>

            {/* Improvement Message */}
            <div>
              <Label htmlFor="improvementMessage" className="text-base font-semibold text-orange-700">
                رسالة التحسين (درجة منخفضة)
              </Label>
              <Textarea
                id="improvementMessage"
                value={improvementMessage}
                onChange={(e) => setImprovementMessage(e.target.value)}
                placeholder="يحتاج إلى تحسين"
                rows={2}
                className="mt-2 resize-none border-orange-200 focus:border-orange-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                تظهر للمشاركين الذين حصلوا على أقل من 50%
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg p-3 mt-4">
              <p className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">💡</span>
                <span>
                  هذه الرسائل ستظهر فقط إذا كان "عرض النتائج للمشاركين" مفعلاً. يمكنك تخصيصها لتحفيز المشاركين وتشجيعهم.
                </span>
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">💡</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">نصيحة</h4>
            <p className="text-sm text-blue-800">
              يمكنك تغيير هذه الإعدادات في أي وقت بعد إنشاء الحدث من صفحة
              التعديل.
            </p>
          </div>
        </div>
      </div>

      {/* Warning Dialog for Disabling Authentication */}
      <AlertDialog open={showAuthWarning} onOpenChange={setShowAuthWarning}>
        <AlertDialogContent className="max-w-lg bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-orange-600 text-xl">
              <AlertTriangle className="w-6 h-6" />
              تحذير: إلغاء تفعيل تسجيل الدخول
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-base text-gray-700" asChild>
              <div>
                <p className="font-semibold text-gray-900">
                  عند إلغاء تفعيل هذا الخيار:
                </p>
                <ul className="list-disc pr-6 space-y-2 text-gray-700">
                  <li>لن تتمكن من معرفة أسماء المشاركين في الحدث</li>
                  <li>ستظهر جميع الردود كـ <span className="font-semibold text-gray-900">"مشارك مجهول"</span> في صفحة النتائج</li>
                  <li>لن تتمكن من التواصل مع المشاركين لاحقاً</li>
                  <li>قد تفقد القدرة على تتبع الردود المكررة</li>
                </ul>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="font-semibold text-orange-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    توصية
                  </p>
                  <p className="text-sm text-orange-800 mt-1">
                    من الأفضل الإبقاء على هذا الخيار مفعّلاً لتتبع أفضل للمشاركين وجودة أعلى للبيانات المجمعة.
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900">
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setRequireAuth(false);
                setIsPrivate(false); // Also disable private event
                setShowAuthWarning(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              إلغاء التفعيل
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Private Event Confirmation Dialog */}
      <AlertDialog open={showPrivateDialog} onOpenChange={setShowPrivateDialog}>
        <AlertDialogContent className="max-w-lg bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-purple-600 text-xl">
              <Shield className="w-6 h-6" />
              تفعيل الحدث الخاص
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-base text-gray-700" asChild>
              <div>
                <p className="font-semibold text-gray-900">
                  لتفعيل الحدث الخاص:
                </p>
                <ul className="list-disc pr-6 space-y-2 text-gray-700">
                  <li>سيتم تفعيل <span className="font-semibold text-gray-900">"يتطلب تسجيل دخول"</span> تلقائياً</li>
                  <li>فقط الأشخاص في قائمة المسموح لهم سيتمكنون من الدخول</li>
                  <li>سيُطلب من المشاركين إدخال بريدهم للتحقق</li>
                </ul>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="font-semibold text-purple-700 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    ملاحظة
                  </p>
                  <p className="text-sm text-purple-800 mt-1">
                    يمكنك إضافة المشاركين المسموح لهم يدوياً أو اختيارهم من جهات الاتصال.
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900">
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmEnablePrivate}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              تفعيل الحدث الخاص
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Contacts Selection Dialog */}
      <Dialog open={showContactsDialog} onOpenChange={setShowContactsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] !flex !flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-2xl">اختر من جهات الاتصال</DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              اختر جهات الاتصال أو المجموعات لإضافتهم للمشاركين المسموح لهم
            </p>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setActiveTab("contacts")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === "contacts"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                جهات الاتصال
                {selectedContactIds.length > 0 && (
                  <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                    {selectedContactIds.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === "groups"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-4 h-4" />
                المجموعات
                {selectedGroupIds.length > 0 && (
                  <span className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {selectedGroupIds.length}
                  </span>
                )}
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={`ابحث عن ${activeTab === "contacts" ? "جهة اتصال" : "مجموعة"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* List */}
            <ScrollArea className="h-[300px] border rounded-lg">
              <div className="p-4 space-y-2">
                {activeTab === "contacts" ? (
                  filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                      <ContactItem
                        key={contact.id}
                        contact={contact}
                        selected={selectedContactIds.includes(contact.id)}
                        onToggle={() => toggleContactSelection(contact)}
                      />
                    ))
                  ) : (
                    <EmptyState message="لا توجد جهات اتصال" />
                  )
                ) : (
                  filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                      <GroupItem
                        key={group.id}
                        group={group}
                        selected={selectedGroupIds.includes(group.id)}
                        onToggle={() => toggleGroupSelection(group)}
                      />
                    ))
                  ) : (
                    <EmptyState message="لا توجد مجموعات" />
                  )
                )}
              </div>
            </ScrollArea>

            {/* Summary */}
            {(selectedContactIds.length > 0 || selectedGroupIds.length > 0) && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-900">
                      تم اختيار {selectedContactIds.length + selectedGroupIds.length} عنصر
                    </p>
                    <p className="text-sm text-purple-700">
                      {selectedContactIds.length > 0 && `${selectedContactIds.length} جهة اتصال`}
                      {selectedContactIds.length > 0 && selectedGroupIds.length > 0 && " • "}
                      {selectedGroupIds.length > 0 && `${selectedGroupIds.length} مجموعة`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-4">
            <Button variant="outline" onClick={() => {
              setShowContactsDialog(false);
              setSelectedContactIds([]);
              setSelectedGroupIds([]);
              setSearchQuery("");
            }}>
              إلغاء
            </Button>
            {(selectedContactIds.length > 0 || selectedGroupIds.length > 0) && (
              <Button onClick={handleAddFromContacts} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 ml-2" />
                إضافة للقائمة
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Contact Item Component
function ContactItem({
  contact,
  selected,
  onToggle,
}: {
  contact: Contact;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 ${
        selected ? "border-purple-500 bg-purple-50" : "border-gray-200"
      }`}
      onClick={onToggle}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={onToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{contact.name}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {contact.email}
          </span>
          {contact.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {contact.phone}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Group Item Component
function GroupItem({
  group,
  selected,
  onToggle,
}: {
  group: Group;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 ${
        selected ? "border-purple-500 bg-purple-50" : "border-gray-200"
      }`}
      onClick={onToggle}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={onToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: group.color }}
      >
        {group.name.charAt(0)}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{group.name}</p>
        <p className="text-sm text-gray-600">
          {group.contactIds.length} عضو
          {group.description && ` • ${group.description}`}
        </p>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">{message}</p>
    </div>
  );
}

