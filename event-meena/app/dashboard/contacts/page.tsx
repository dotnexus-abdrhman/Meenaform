"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useContactsStore } from "@/store/contactsStore";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Users,
  UserPlus,
  Filter,
  Download,
  Upload,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import ContactsList from "@/components/contacts/ContactsList";
import GroupsList from "@/components/contacts/GroupsList";
import ContactDialog from "@/components/contacts/ContactDialog";
import GroupDialog from "@/components/contacts/GroupDialog";
import { Contact, Group } from "@/types/contact";

type TabType = "contacts" | "groups";

function ContactsPageContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("contacts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const {
    contacts,
    groups,
    isLoading,
    fetchContacts,
    fetchGroups,
    deleteContact,
    deleteGroup,
    setFilters,
    setGroupsFilters,
  } = useContactsStore();

  useEffect(() => {
    fetchContacts();
    fetchGroups();
  }, [fetchContacts, fetchGroups]);

  // تطبيق البحث
  useEffect(() => {
    if (activeTab === "contacts") {
      setFilters({ search: searchQuery });
    } else {
      setGroupsFilters({ search: searchQuery });
    }
  }, [searchQuery, activeTab, setFilters, setGroupsFilters]);

  const handleAddContact = () => {
    setEditingContact(null);
    setIsContactDialogOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsContactDialogOpen(true);
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف جهة الاتصال هذه؟")) {
      try {
        await deleteContact(id);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const handleAddGroup = () => {
    setEditingGroup(null);
    setIsGroupDialogOpen(true);
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setIsGroupDialogOpen(true);
  };

  const handleDeleteGroup = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف المجموعة هذه؟")) {
      try {
        await deleteGroup(id);
      } catch (error) {
        console.error("Error deleting group:", error);
      }
    }
  };

  const handleContactDialogClose = () => {
    setIsContactDialogOpen(false);
    setEditingContact(null);
  };

  const handleGroupDialogClose = () => {
    setIsGroupDialogOpen(false);
    setEditingGroup(null);
  };

  return (
    <DashboardLayout>
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4 ml-1" />
              العودة إلى لوحة التحكم
            </Link>
          </div>

          {/* Title and Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* العنوان والوصف */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                جهات الاتصال والمجموعات
              </h1>
              <p className="text-gray-600 text-lg">
                إدارة جهات الاتصال والمجموعات لإرسال الأحداث بسهولة
              </p>
            </div>

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row gap-3">
              {activeTab === "contacts" ? (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {}}
                    className="border-2 border-gray-200 hover:border-primary hover:bg-primary/5"
                  >
                    <Upload className="w-5 h-5 ml-2" />
                    استيراد
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {}}
                    className="border-2 border-gray-200 hover:border-primary hover:bg-primary/5"
                  >
                    <Download className="w-5 h-5 ml-2" />
                    تصدير
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleAddContact}
                    className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                  >
                    <UserPlus className="w-5 h-5 ml-2" />
                    إضافة جهة اتصال
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  onClick={handleAddGroup}
                  className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  إنشاء مجموعة
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  إجمالي جهات الاتصال
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {contacts.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">عدد المجموعات</p>
                <p className="text-3xl font-bold text-gray-900">
                  {groups.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <UserPlus className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">جهات اتصال جديدة</p>
                <p className="text-3xl font-bold text-gray-900">
                  {
                    contacts.filter(
                      (c) =>
                        new Date(c.createdAt) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs & Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setActiveTab("contacts")}
                className={`px-6 py-2.5 rounded-md font-medium transition-all ${
                  activeTab === "contacts"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                جهات الاتصال ({contacts.length})
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`px-6 py-2.5 rounded-md font-medium transition-all ${
                  activeTab === "groups"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                المجموعات ({groups.length})
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={
                  activeTab === "contacts"
                    ? "ابحث عن جهة اتصال..."
                    : "ابحث عن مجموعة..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-11"
              />
            </div>

            {/* Filter Button */}
            <Button variant="outline" size="lg" className="gap-2">
              <Filter className="w-4 h-4" />
              فلترة
            </Button>
          </div>
        </Card>

        {/* Content */}
        {activeTab === "contacts" ? (
          <ContactsList
            contacts={contacts}
            groups={groups}
            isLoading={isLoading}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        ) : (
          <GroupsList
            groups={groups}
            contacts={contacts}
            isLoading={isLoading}
            onEdit={handleEditGroup}
            onDelete={handleDeleteGroup}
          />
        )}
      </div>

      {/* Dialogs */}
      <ContactDialog
        open={isContactDialogOpen}
        onClose={handleContactDialogClose}
        contact={editingContact}
        groups={groups}
      />

      <GroupDialog
        open={isGroupDialogOpen}
        onClose={handleGroupDialogClose}
        group={editingGroup}
        contacts={contacts}
      />
    </DashboardLayout>
  );
}

export default function ContactsPage() {
  return (
    <ProtectedRoute>
      <ContactsPageContent />
    </ProtectedRoute>
  );
}

