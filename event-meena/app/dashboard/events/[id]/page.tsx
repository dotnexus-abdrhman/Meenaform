"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEventsStore } from "@/store/eventsStore";
import { useContactsStore } from "@/store/contactsStore";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EventDetailsHeader from "@/components/events/EventDetailsHeader";
import EventInfoCard from "@/components/events/EventInfoCard";
import EventQRCode from "@/components/events/EventQRCode";
import EventPublicLink from "@/components/events/EventPublicLink";
import EventSectionsDisplay from "@/components/events/EventSectionsDisplay";
import DeleteEventDialog from "@/components/events/DeleteEventDialog";
import SendEventDialog from "@/components/events/create/SendEventDialog";
import SaveAsTemplateDialog from "@/components/templates/SaveAsTemplateDialog";
import LoadingState from "@/components/dashboard/LoadingState";

function EventDetailsPageContent() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const eventId = params.id as string;

  const {
    currentEvent,
    fetchEventById,
    deleteEvent,
    duplicateEvent,
    archiveEvent,
    updateEventStatus,
    isLoading,
    events,
  } = useEventsStore();

  const { fetchContacts, fetchGroups } = useContactsStore();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [saveAsTemplateDialogOpen, setSaveAsTemplateDialogOpen] = useState(false);

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId);
      fetchContacts();
      fetchGroups();
    }
  }, [eventId, fetchEventById, fetchContacts, fetchGroups]);

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId);
      setDeleteDialogOpen(false);
      router.push("/dashboard/events");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleDuplicate = async () => {
    try {
      const duplicated = await duplicateEvent(eventId);
      toast({
        title: "تم نسخ الحدث بنجاح",
        description: `تم إنشاء "${duplicated.title}"`,
      });
      router.push("/dashboard/events");
    } catch (error) {
      console.error("Error duplicating event:", error);
      toast({
        title: "خطأ",
        description: "فشل في نسخ الحدث",
        variant: "destructive",
      });
    }
  };

  const handleArchive = async () => {
    try {
      await archiveEvent(eventId);
      toast({
        title: "تمت الأرشفة",
        description: "تم أرشفة الحدث بنجاح",
      });
      router.push("/dashboard/events");
    } catch (error) {
      console.error("Error archiving event:", error);
      toast({
        title: "خطأ",
        description: "فشل في أرشفة الحدث",
        variant: "destructive",
      });
    }
  };

  const handlePublish = async () => {
    try {
      await updateEventStatus(eventId, "active");
      toast({
        title: "تم النشر",
        description: "تم نشر الحدث بنجاح وأصبح متاحاً للمشاركين",
      });
    } catch (error) {
      console.error("Error publishing event:", error);
      toast({
        title: "خطأ",
        description: "فشل في نشر الحدث",
        variant: "destructive",
      });
    }
  };

  const handleUnpublish = async () => {
    try {
      await updateEventStatus(eventId, "draft");
      toast({
        title: "تم التحويل",
        description: "تم تحويل الحدث إلى مسودة",
      });
    } catch (error) {
      console.error("Error unpublishing event:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحويل الحدث إلى مسودة",
        variant: "destructive",
      });
    }
  };

  const handleOpenSendDialog = () => {
    setShowSendDialog(true);
  };

  if (isLoading || !currentEvent) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingState message="جاري تحميل تفاصيل الحدث..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <EventDetailsHeader
        event={currentEvent}
        onDuplicate={handleDuplicate}
        onArchive={handleArchive}
        onDelete={() => setDeleteDialogOpen(true)}
        onShare={handleOpenSendDialog}
        onSaveAsTemplate={() => setSaveAsTemplateDialogOpen(true)}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
      />

      {/* المحتوى */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Event Info & Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info */}
            <EventInfoCard event={currentEvent} />

            {/* Sections Display */}
            <EventSectionsDisplay event={currentEvent} />
          </div>

          {/* Right Column - QR Code & Public Link */}
          <div className="space-y-6">
            {/* QR Code */}
            <EventQRCode shareCode={currentEvent.shareCode || ""} eventTitle={currentEvent.title} />

            {/* Public Link */}
            <EventPublicLink shareCode={currentEvent.shareCode || ""} />
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteEventDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        eventTitle={currentEvent.title}
      />

      {/* Send Event Dialog */}
      <SendEventDialog
        open={showSendDialog}
        onClose={() => setShowSendDialog(false)}
        eventId={eventId}
        eventTitle={currentEvent.title}
        eventUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/events/${eventId}`}
      />

      {/* Save As Template Dialog */}
      <SaveAsTemplateDialog
        event={currentEvent}
        open={saveAsTemplateDialogOpen}
        onOpenChange={setSaveAsTemplateDialogOpen}
      />
    </DashboardLayout>
  );
}

export default function EventDetailsPage() {
  return (
    <ProtectedRoute>
      <EventDetailsPageContent />
    </ProtectedRoute>
  );
}

