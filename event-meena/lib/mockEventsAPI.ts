import { Event, EventFormData, EventStatus, EventType } from "@/types/event";

const EVENTS_KEY = "event_meena_events";

// تأخير وهمي لمحاكاة API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// الحصول على جميع الأحداث من LocalStorage
const getEvents = (): Event[] => {
  if (typeof window === "undefined") return [];
  const eventsJson = localStorage.getItem(EVENTS_KEY);
  return eventsJson ? JSON.parse(eventsJson) : [];
};

// حفظ الأحداث في LocalStorage
const saveEvents = (events: Event[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

// إنشاء بيانات تجريبية
export const initializeMockEventsData = (userId: string) => {
  const existingEvents = getEvents();
  
  // إذا كانت هناك أحداث بالفعل، لا تفعل شيئاً
  if (existingEvents.length > 0) return;
  
  const mockEvents: Event[] = [
    {
      id: "evt-1",
      userId,
      title: "استبيان رضا العملاء 2025",
      description: "نود معرفة رأيك في خدماتنا لتحسين تجربتك معنا",
      type: "survey",
      status: "active",
      coverImage: "",
      sections: [
        {
          id: "sec-1",
          eventId: "evt-1",
          title: "القسم الأول",
          description: "معلومات عامة",
          order: 0,
          components: [
            {
              id: "comp-1",
              sectionId: "sec-1",
              type: "rating",
              order: 0,
              settings: {
                type: "rating",
                label: "كيف تقيم خدماتنا؟",
                description: "",
                required: true,
                ratingType: "stars",
                maxRating: 5,
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          settings: {
            visible: true,
            skippable: false,
            showProgress: true,
            allowBackNavigation: true,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      settings: {
        allowMultipleResponses: false,
        showResults: true,
        showProgressBar: true,
        requireAuth: false,
      },
      stats: {
        views: 320,
        totalResponses: 245,
        completedResponses: 213,
        inProgressResponses: 32,
        completionRate: 87,
        averageTime: 180, // 3 minutes in seconds
        lastResponseAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "evt-2",
      userId,
      title: "استطلاع رأي: أفضل وقت للفعاليات",
      description: "ساعدنا في اختيار أفضل وقت لإقامة الفعاليات القادمة",
      type: "poll",
      status: "active",
      sections: [
        {
          id: "sec-2",
          eventId: "evt-2",
          title: "اختر الوقت المناسب",
          description: "",
          order: 0,
          components: [
            {
              id: "comp-2",
              sectionId: "sec-2",
              type: "question",
              order: 0,
              settings: {
                type: "question",
                label: "ما هو الوقت المفضل لديك؟",
                description: "",
                required: true,
                questionType: "single_choice",
                choices: [
                  { id: "opt1", label: "صباحاً (9-12)", value: "morning" },
                  { id: "opt2", label: "ظهراً (12-3)", value: "afternoon" },
                  { id: "opt3", label: "مساءً (6-9)", value: "evening" },
                ],
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          settings: {
            visible: true,
            skippable: false,
            showProgress: true,
            allowBackNavigation: true,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      settings: {
        allowMultipleResponses: false,
        showResults: true,
        showProgressBar: true,
        requireAuth: false,
      },
      stats: {
        views: 650,
        totalResponses: 532,
        completedResponses: 505,
        inProgressResponses: 27,
        completionRate: 95,
        averageTime: 60, // 1 minute in seconds
        lastResponseAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  
  saveEvents(mockEvents);
};

// الحصول على جميع الأحداث
export const mockGetEvents = async (userId: string): Promise<Event[]> => {
  await delay(500);
  initializeMockEventsData(userId);
  const events = getEvents();
  return events.filter((e) => e.userId === userId);
};

// الحصول على حدث بواسطة ID
export const mockGetEventById = async (id: string): Promise<Event | null> => {
  await delay(300);
  const events = getEvents();
  return events.find((e) => e.id === id) || null;
};

// إنشاء حدث جديد
export const mockCreateEvent = async (
  userId: string,
  data: any // استخدام any لأن البيانات قد تأتي من buildEvent
): Promise<Event> => {
  await delay(800);

  const newEvent: Event = {
    id: data.id || `evt-${Date.now()}`,
    userId,
    title: data.title,
    description: data.description,
    type: data.type,
    status: data.status,
    coverImage: data.coverImage,
    sections: data.sections || [],
    settings: data.settings || {
      allowMultipleResponses: false,
      showProgressBar: true,
    },
    stats: data.stats || {
      views: 0,
      totalResponses: 0,
      completedResponses: 0,
      inProgressResponses: 0,
      completionRate: 0,
      averageTime: 0,
    },
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    publishedAt: data.status === "active" ? new Date().toISOString() : undefined,
    startDate: data.startDate,
    endDate: data.endDate,
  };

  const events = getEvents();
  events.push(newEvent);
  saveEvents(events);

  return newEvent;
};

// تحديث حدث
export const mockUpdateEvent = async (
  id: string,
  data: Partial<EventFormData>
): Promise<Event> => {
  await delay(600);
  
  const events = getEvents();
  const index = events.findIndex((e) => e.id === id);
  
  if (index === -1) {
    throw new Error("الحدث غير موجود");
  }
  
  events[index] = {
    ...events[index],
    ...data,
    settings: {
      ...events[index].settings,
      ...data.settings,
    },
    updatedAt: new Date().toISOString(),
  } as Event;
  
  saveEvents(events);
  return events[index];
};

// حذف حدث
export const mockDeleteEvent = async (id: string): Promise<void> => {
  await delay(400);
  
  const events = getEvents();
  const filteredEvents = events.filter((e) => e.id !== id);
  saveEvents(filteredEvents);
};

// نسخ حدث
export const mockDuplicateEvent = async (id: string): Promise<Event> => {
  await delay(700);

  const events = getEvents();
  const original = events.find((e) => e.id === id);

  if (!original) {
    throw new Error("الحدث غير موجود");
  }

  const duplicate: Event = {
    ...original,
    id: `evt-${Date.now()}`,
    title: `${original.title} (نسخة)`,
    status: "draft",
    stats: {
      views: 0,
      totalResponses: 0,
      completedResponses: 0,
      inProgressResponses: 0,
      completionRate: 0,
      averageTime: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: undefined,
  };

  events.push(duplicate);
  saveEvents(events);

  return duplicate;
};

// أرشفة حدث
export const mockArchiveEvent = async (id: string): Promise<void> => {
  await delay(400);
  
  const events = getEvents();
  const index = events.findIndex((e) => e.id === id);
  
  if (index === -1) {
    throw new Error("الحدث غير موجود");
  }
  
  events[index].status = "archived";
  events[index].updatedAt = new Date().toISOString();
  
  saveEvents(events);
};

