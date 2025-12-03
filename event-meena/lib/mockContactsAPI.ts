import { Contact, ContactFormData, Group, GroupFormData } from "@/types/contact";

const CONTACTS_KEY = "event_meena_contacts";
const GROUPS_KEY = "event_meena_groups";

// تأخير وهمي لمحاكاة API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// الحصول على جهات الاتصال من LocalStorage
const getContacts = (): Contact[] => {
  if (typeof window === "undefined") return [];
  const contactsJson = localStorage.getItem(CONTACTS_KEY);
  return contactsJson ? JSON.parse(contactsJson) : [];
};

// حفظ جهات الاتصال في LocalStorage
const saveContacts = (contacts: Contact[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
};

// الحصول على المجموعات من LocalStorage
const getGroups = (): Group[] => {
  if (typeof window === "undefined") return [];
  const groupsJson = localStorage.getItem(GROUPS_KEY);
  return groupsJson ? JSON.parse(groupsJson) : [];
};

// حفظ المجموعات في LocalStorage
const saveGroups = (groups: Group[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
};

// إنشاء بيانات تجريبية
export const initializeMockContactsData = (userId: string) => {
  const existingContacts = getContacts();
  const existingGroups = getGroups();

  // إذا كانت هناك بيانات بالفعل، لا تفعل شيئاً
  if (existingContacts.length > 0 || existingGroups.length > 0) return;

  const mockGroups: Group[] = [
    {
      id: "grp-1",
      userId,
      name: "العائلة",
      description: "أفراد العائلة",
      color: "#1a56db",
      icon: "Users",
      contactIds: [],
      membersCount: 0,
      stats: {
        eventsSent: 0,
        averageResponseRate: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "grp-2",
      userId,
      name: "الأصدقاء",
      description: "الأصدقاء المقربون",
      color: "#16a34a",
      icon: "UserGroup",
      contactIds: [],
      membersCount: 0,
      stats: {
        eventsSent: 0,
        averageResponseRate: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "grp-3",
      userId,
      name: "العمل",
      description: "زملاء العمل",
      color: "#dc2626",
      icon: "Briefcase",
      contactIds: [],
      membersCount: 0,
      stats: {
        eventsSent: 0,
        averageResponseRate: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const mockContacts: Contact[] = [
    {
      id: "cnt-1",
      userId,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      company: "شركة التقنية",
      jobTitle: "مطور برمجيات",
      notes: "عميل مهم",
      tags: ["vip", "تقنية"],
      groupIds: ["grp-3"],
      stats: {
        eventsSent: 5,
        eventsCompleted: 4,
        responseRate: 80,
        lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "cnt-2",
      userId,
      name: "فاطمة علي",
      email: "fatima@example.com",
      phone: "+966507654321",
      company: "شركة التسويق",
      jobTitle: "مديرة تسويق",
      tags: ["تسويق"],
      groupIds: ["grp-2", "grp-3"],
      stats: {
        eventsSent: 3,
        eventsCompleted: 3,
        responseRate: 100,
        lastInteraction: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "cnt-3",
      userId,
      name: "محمد خالد",
      email: "mohammed@example.com",
      phone: "+966509876543",
      tags: [],
      groupIds: ["grp-1"],
      stats: {
        eventsSent: 2,
        eventsCompleted: 1,
        responseRate: 50,
        lastInteraction: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // تحديث عدد الأعضاء في المجموعات
  mockGroups[0].contactIds = ["cnt-3"];
  mockGroups[0].membersCount = 1;
  mockGroups[1].contactIds = ["cnt-2"];
  mockGroups[1].membersCount = 1;
  mockGroups[2].contactIds = ["cnt-1", "cnt-2"];
  mockGroups[2].membersCount = 2;

  saveContacts(mockContacts);
  saveGroups(mockGroups);
};

// الحصول على جميع جهات الاتصال
export const mockGetContacts = async (userId: string): Promise<Contact[]> => {
  await delay(500);
  initializeMockContactsData(userId);
  const contacts = getContacts();
  return contacts.filter((c) => c.userId === userId);
};

// الحصول على جهة اتصال بواسطة ID
export const mockGetContactById = async (id: string): Promise<Contact | null> => {
  await delay(300);
  const contacts = getContacts();
  return contacts.find((c) => c.id === id) || null;
};

// إنشاء جهة اتصال جديدة
export const mockCreateContact = async (
  userId: string,
  data: ContactFormData
): Promise<Contact> => {
  await delay(800);

  const newContact: Contact = {
    id: `cnt-${Date.now()}`,
    userId,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    company: data.company,
    jobTitle: data.jobTitle,
    notes: data.notes,
    tags: data.tags || [],
    groupIds: data.groupIds || [],
    stats: {
      eventsSent: 0,
      eventsCompleted: 0,
      responseRate: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const contacts = getContacts();
  contacts.push(newContact);
  saveContacts(contacts);

  // تحديث المجموعات
  if (data.groupIds && data.groupIds.length > 0) {
    const groups = getGroups();
    data.groupIds.forEach((groupId) => {
      const group = groups.find((g) => g.id === groupId);
      if (group && !group.contactIds.includes(newContact.id)) {
        group.contactIds.push(newContact.id);
        group.membersCount = group.contactIds.length;
        group.updatedAt = new Date().toISOString();
      }
    });
    saveGroups(groups);
  }

  return newContact;
};

// تحديث جهة اتصال
export const mockUpdateContact = async (
  id: string,
  data: Partial<ContactFormData>
): Promise<Contact> => {
  await delay(600);

  const contacts = getContacts();
  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error("جهة الاتصال غير موجودة");
  }

  const oldGroupIds = contacts[index].groupIds;
  const newGroupIds = data.groupIds || oldGroupIds;

  contacts[index] = {
    ...contacts[index],
    ...data,
    groupIds: newGroupIds,
    updatedAt: new Date().toISOString(),
  };

  saveContacts(contacts);

  // تحديث المجموعات
  const groups = getGroups();
  const removedGroups = oldGroupIds.filter((gid) => !newGroupIds.includes(gid));
  const addedGroups = newGroupIds.filter((gid) => !oldGroupIds.includes(gid));

  removedGroups.forEach((groupId) => {
    const group = groups.find((g) => g.id === groupId);
    if (group) {
      group.contactIds = group.contactIds.filter((cid) => cid !== id);
      group.membersCount = group.contactIds.length;
      group.updatedAt = new Date().toISOString();
    }
  });

  addedGroups.forEach((groupId) => {
    const group = groups.find((g) => g.id === groupId);
    if (group && !group.contactIds.includes(id)) {
      group.contactIds.push(id);
      group.membersCount = group.contactIds.length;
      group.updatedAt = new Date().toISOString();
    }
  });

  saveGroups(groups);

  return contacts[index];
};

// حذف جهة اتصال
export const mockDeleteContact = async (id: string): Promise<void> => {
  await delay(400);

  const contacts = getContacts();
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    throw new Error("جهة الاتصال غير موجودة");
  }

  // إزالة من المجموعات
  const groups = getGroups();
  contact.groupIds.forEach((groupId) => {
    const group = groups.find((g) => g.id === groupId);
    if (group) {
      group.contactIds = group.contactIds.filter((cid) => cid !== id);
      group.membersCount = group.contactIds.length;
      group.updatedAt = new Date().toISOString();
    }
  });
  saveGroups(groups);

  // حذف جهة الاتصال
  const filteredContacts = contacts.filter((c) => c.id !== id);
  saveContacts(filteredContacts);
};

// الحصول على جميع المجموعات
export const mockGetGroups = async (userId: string): Promise<Group[]> => {
  await delay(500);
  initializeMockContactsData(userId);
  const groups = getGroups();
  return groups.filter((g) => g.userId === userId);
};

// الحصول على مجموعة بواسطة ID
export const mockGetGroupById = async (id: string): Promise<Group | null> => {
  await delay(300);
  const groups = getGroups();
  return groups.find((g) => g.id === id) || null;
};

// إنشاء مجموعة جديدة
export const mockCreateGroup = async (
  userId: string,
  data: GroupFormData
): Promise<Group> => {
  await delay(800);

  const newGroup: Group = {
    id: `grp-${Date.now()}`,
    userId,
    name: data.name,
    description: data.description,
    color: data.color || "#1a56db",
    icon: data.icon,
    contactIds: data.contactIds || [],
    membersCount: data.contactIds?.length || 0,
    stats: {
      eventsSent: 0,
      averageResponseRate: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const groups = getGroups();
  groups.push(newGroup);
  saveGroups(groups);

  // تحديث جهات الاتصال
  if (data.contactIds && data.contactIds.length > 0) {
    const contacts = getContacts();
    data.contactIds.forEach((contactId) => {
      const contact = contacts.find((c) => c.id === contactId);
      if (contact && !contact.groupIds.includes(newGroup.id)) {
        contact.groupIds.push(newGroup.id);
        contact.updatedAt = new Date().toISOString();
      }
    });
    saveContacts(contacts);
  }

  return newGroup;
};

// تحديث مجموعة
export const mockUpdateGroup = async (
  id: string,
  data: Partial<GroupFormData>
): Promise<Group> => {
  await delay(600);

  const groups = getGroups();
  const index = groups.findIndex((g) => g.id === id);

  if (index === -1) {
    throw new Error("المجموعة غير موجودة");
  }

  const oldContactIds = groups[index].contactIds;
  const newContactIds = data.contactIds || oldContactIds;

  groups[index] = {
    ...groups[index],
    name: data.name || groups[index].name,
    description: data.description !== undefined ? data.description : groups[index].description,
    color: data.color || groups[index].color,
    icon: data.icon !== undefined ? data.icon : groups[index].icon,
    contactIds: newContactIds,
    membersCount: newContactIds.length,
    updatedAt: new Date().toISOString(),
  };

  saveGroups(groups);

  // تحديث جهات الاتصال
  const contacts = getContacts();
  const removedContacts = oldContactIds.filter((cid) => !newContactIds.includes(cid));
  const addedContacts = newContactIds.filter((cid) => !oldContactIds.includes(cid));

  removedContacts.forEach((contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      contact.groupIds = contact.groupIds.filter((gid) => gid !== id);
      contact.updatedAt = new Date().toISOString();
    }
  });

  addedContacts.forEach((contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (contact && !contact.groupIds.includes(id)) {
      contact.groupIds.push(id);
      contact.updatedAt = new Date().toISOString();
    }
  });

  saveContacts(contacts);

  return groups[index];
};

// حذف مجموعة
export const mockDeleteGroup = async (id: string): Promise<void> => {
  await delay(400);

  const groups = getGroups();
  const group = groups.find((g) => g.id === id);

  if (!group) {
    throw new Error("المجموعة غير موجودة");
  }

  // إزالة من جهات الاتصال
  const contacts = getContacts();
  group.contactIds.forEach((contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      contact.groupIds = contact.groupIds.filter((gid) => gid !== id);
      contact.updatedAt = new Date().toISOString();
    }
  });
  saveContacts(contacts);

  // حذف المجموعة
  const filteredGroups = groups.filter((g) => g.id !== id);
  saveGroups(filteredGroups);
};

// إضافة جهات اتصال إلى مجموعة
export const mockAddContactsToGroup = async (
  groupId: string,
  contactIds: string[]
): Promise<void> => {
  await delay(600);

  const groups = getGroups();
  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    throw new Error("المجموعة غير موجودة");
  }

  const contacts = getContacts();

  contactIds.forEach((contactId) => {
    // إضافة إلى المجموعة
    if (!group.contactIds.includes(contactId)) {
      group.contactIds.push(contactId);
    }

    // تحديث جهة الاتصال
    const contact = contacts.find((c) => c.id === contactId);
    if (contact && !contact.groupIds.includes(groupId)) {
      contact.groupIds.push(groupId);
      contact.updatedAt = new Date().toISOString();
    }
  });

  group.membersCount = group.contactIds.length;
  group.updatedAt = new Date().toISOString();

  saveGroups(groups);
  saveContacts(contacts);
};

// إزالة جهات اتصال من مجموعة
export const mockRemoveContactsFromGroup = async (
  groupId: string,
  contactIds: string[]
): Promise<void> => {
  await delay(600);

  const groups = getGroups();
  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    throw new Error("المجموعة غير موجودة");
  }

  const contacts = getContacts();

  contactIds.forEach((contactId) => {
    // إزالة من المجموعة
    group.contactIds = group.contactIds.filter((cid) => cid !== contactId);

    // تحديث جهة الاتصال
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      contact.groupIds = contact.groupIds.filter((gid) => gid !== groupId);
      contact.updatedAt = new Date().toISOString();
    }
  });

  group.membersCount = group.contactIds.length;
  group.updatedAt = new Date().toISOString();

  saveGroups(groups);
  saveContacts(contacts);
};

