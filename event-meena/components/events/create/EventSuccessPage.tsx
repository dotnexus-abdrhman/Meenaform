"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  Copy,
  ExternalLink,
  Eye,
  Edit,
  Share2,
  Download,
  Users,
  UserPlus,
  Send,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import { useContactsStore } from "@/store/contactsStore";
import SendEventDialog from "./SendEventDialog";

interface EventSuccessPageProps {
  eventId: string;
  shareCode: string;
  eventTitle: string;
}

export default function EventSuccessPage({
  eventId,
  shareCode,
  eventTitle,
}: EventSuccessPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [sendMode, setSendMode] = useState<"contacts" | "groups">("contacts");

  const { contacts, groups, fetchContacts, fetchGroups } = useContactsStore();

  // Use shareCode for public URL
  const eventUrl = `${window.location.origin}/e/${shareCode}`;

  // Fetch contacts and groups on mount
  useEffect(() => {
    fetchContacts();
    fetchGroups();
  }, [fetchContacts, fetchGroups]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      toast({
        title: "تم النسخ!",
        description: "تم نسخ رابط الحدث إلى الحافظة",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل نسخ الرابط",
        variant: "destructive",
      });
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `qr-code-${shareCode}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleOpenSendDialog = (mode: "contacts" | "groups") => {
    setSendMode(mode);
    setShowSendDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex p-6 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            تم إنشاء الحدث بنجاح! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            حدثك "{eventTitle}" جاهز الآن للمشاركة
          </p>
        </div>

        {/* Event Link */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            رابط الحدث
          </h3>
          <div className="flex gap-2">
            <Input
              value={eventUrl}
              readOnly
              className="flex-1 bg-gray-50"
              dir="ltr"
            />
            <Button
              onClick={handleCopy}
              className={copied ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 ml-2" />
              ) : (
                <Copy className="w-5 h-5 ml-2" />
              )}
              {copied ? "تم النسخ" : "نسخ"}
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(eventUrl, "_blank")}
            >
              <ExternalLink className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* QR Code */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            رمز QR للحدث
          </h3>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
              <QRCodeSVG
                id="qr-code"
                value={eventUrl}
                size={200}
                level="H"
                includeMargin={false}
                fgColor="#1a56db"
              />
            </div>
            <Button variant="outline" onClick={handleDownloadQR}>
              <Download className="w-5 h-5 ml-2" />
              تحميل رمز QR
            </Button>
          </div>
        </Card>

        {/* Share with Contacts Section */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                مشاركة الحدث مع جهات الاتصال
              </h3>
              <p className="text-sm text-gray-600">
                أرسل الحدث مباشرة إلى جهات الاتصال أو المجموعات
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                  <p className="text-sm text-gray-600">جهة اتصال</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
                  <p className="text-sm text-gray-600">مجموعة</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleOpenSendDialog("contacts")}
              className="w-full border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
              disabled={contacts.length === 0}
            >
              <UserPlus className="w-5 h-5 ml-2" />
              إرسال لجهات اتصال
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleOpenSendDialog("groups")}
              className="w-full border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400"
              disabled={groups.length === 0}
            >
              <Users className="w-5 h-5 ml-2" />
              إرسال لمجموعة
            </Button>
          </div>

          {/* Empty State */}
          {contacts.length === 0 && groups.length === 0 && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 text-center">
                لا توجد جهات اتصال أو مجموعات بعد.{" "}
                <button
                  onClick={() => router.push("/dashboard/contacts")}
                  className="font-semibold underline hover:text-yellow-900"
                >
                  أضف جهات اتصال الآن
                </button>
              </p>
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push(`/dashboard/events/${eventId}`)}
            className="w-full"
          >
            <Eye className="w-5 h-5 ml-2" />
            عرض التفاصيل
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push(`/dashboard/events/${eventId}/edit`)}
            className="w-full"
          >
            <Edit className="w-5 h-5 ml-2" />
            تعديل الحدث
          </Button>
          <Button
            size="lg"
            onClick={() => router.push("/dashboard/events")}
            className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
          >
            <Share2 className="w-5 h-5 ml-2" />
            إلى الأحداث
          </Button>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">💡</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">الخطوات التالية</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• شارك الرابط أو رمز QR مع المشاركين</li>
                <li>• أرسل الحدث لجهات الاتصال أو المجموعات</li>
                <li>• راقب الردود من صفحة تفاصيل الحدث</li>
                <li>• يمكنك تعديل الحدث في أي وقت</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Send Event Dialog */}
      <SendEventDialog
        open={showSendDialog}
        onClose={() => setShowSendDialog(false)}
        eventId={eventId}
        eventTitle={eventTitle}
        eventUrl={eventUrl}
        mode={sendMode}
      />
    </div>
  );
}

