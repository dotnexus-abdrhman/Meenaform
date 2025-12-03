module.exports = [
"[project]/event-meena/store/authStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Zustand Store لإدارة حالة المصادقة
 * مربوط بـ Backend API
 */ __turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/authService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/client.ts [app-ssr] (ecmascript)");
;
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        // الحالة الأولية
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        // تسجيل الدخول - متصل بـ Backend API
        login: async (data)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login(data);
                set({
                    user: result.user,
                    token: result.token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                // استخراج رسالة الخطأ
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول";
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: errorMessage
                });
                throw error;
            }
        },
        // إنشاء حساب جديد - متصل بـ Backend API
        signup: async (data)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].register(data);
                set({
                    user: result.user,
                    token: result.token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                // استخراج رسالة الخطأ
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحساب";
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: errorMessage
                });
                throw error;
            }
        },
        // تسجيل الخروج - متصل بـ Backend API
        logout: async ()=>{
            set({
                isLoading: true
            });
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].logout();
            } finally{
                // مسح الحالة في جميع الحالات (حتى لو فشل الطلب)
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null
                });
            }
        },
        // التحقق من الجلسة الحالية - متصل بـ Backend API
        checkAuth: async ()=>{
            // التحقق من وجود توكن محفوظ
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tokenManager"].hasValidToken()) {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null
                });
                return;
            }
            set({
                isLoading: true
            });
            try {
                // جلب بيانات المستخدم من الـ API
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
                const token = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tokenManager"].getAccessToken();
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch  {
                // فشل التحقق - مسح التوكن والحالة
                __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tokenManager"].clearTokens();
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null
                });
            }
        },
        // تحديث الملف الشخصي - متصل بـ Backend API
        updateProfile: async (data)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].updateProfile(data);
                set({
                    user: updatedUser,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء تحديث الملف الشخصي";
                set({
                    isLoading: false,
                    error: errorMessage
                });
                throw error;
            }
        },
        // مسح الأخطاء
        clearError: ()=>{
            set({
                error: null
            });
        }
    }));
}),
"[project]/event-meena/store/eventsStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Zustand Store لإدارة الأحداث
 * مربوط بـ Backend API
 */ __turbopack_context__.s([
    "useEventsStore",
    ()=>useEventsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/eventsService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/client.ts [app-ssr] (ecmascript)");
;
;
;
const useEventsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        events: [],
        currentEvent: null,
        isLoading: false,
        error: null,
        filters: {
            search: "",
            status: "all",
            type: "all",
            sortBy: "createdAt",
            sortOrder: "desc"
        },
        // جلب جميع الأحداث - متصل بـ Backend API
        fetchEvents: async ()=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const events = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].getAll();
                set({
                    events,
                    isLoading: false
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء جلب الأحداث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
            }
        },
        // جلب حدث بواسطة ID - متصل بـ Backend API
        // يستخدم /full endpoint لجلب الأقسام والمكونات
        fetchEventById: async (id)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                // استخدام getFullDetails بدلاً من getById لجلب الأقسام والمكونات
                const event = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].getFullDetails(id);
                set({
                    currentEvent: event,
                    isLoading: false
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء جلب الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
            }
        },
        // جلب حدث بواسطة رمز المشاركة (للمشاركين) - Public endpoint
        fetchEventByShareCode: async (shareCode)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const event = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].getByShareCode(shareCode);
                set({
                    currentEvent: event,
                    isLoading: false
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء جلب الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
            }
        },
        // جلب حدث للمعاينة (Public - بدون التحقق من الحالة)
        fetchEventForPreview: async (id)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const event = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].getForPreview(id);
                set({
                    currentEvent: event,
                    isLoading: false
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء جلب الحدث للمعاينة";
                set({
                    error: errorMessage,
                    isLoading: false
                });
            }
        },
        // إنشاء حدث جديد - متصل بـ Backend API
        // يستخدم createWithSections لحفظ الحدث مع الأقسام والمكونات
        createEvent: async (data)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                let newEvent;
                // إذا كان الحدث يحتوي على أقسام، استخدم createWithSections
                if ('sections' in data && data.sections && data.sections.length > 0) {
                    newEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].createWithSections(data);
                } else {
                    // وإلا استخدم create العادي
                    newEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].create(data);
                }
                set((state)=>({
                        events: [
                            newEvent,
                            ...state.events
                        ],
                        isLoading: false
                    }));
                return newEvent;
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
                throw error;
            }
        },
        // تحديث حدث - متصل بـ Backend API
        // يستخدم updateWithSections إذا كان الحدث يحتوي على أقسام
        updateEvent: async (id, data)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                let updatedEvent;
                // إذا كان الحدث يحتوي على أقسام، استخدم updateWithSections
                if ('sections' in data && data.sections && Array.isArray(data.sections) && data.sections.length > 0) {
                    updatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].updateWithSections(id, data);
                } else {
                    updatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].update(id, data);
                }
                set((state)=>({
                        events: state.events.map((e)=>e.id === id ? updatedEvent : e),
                        currentEvent: state.currentEvent?.id === id ? updatedEvent : state.currentEvent,
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء تحديث الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
                throw error;
            }
        },
        // حذف حدث - متصل بـ Backend API
        deleteEvent: async (id)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].delete(id);
                set((state)=>({
                        events: state.events.filter((e)=>e.id !== id),
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء حذف الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
                throw error;
            }
        },
        // نسخ حدث - متصل بـ Backend API
        duplicateEvent: async (id)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const duplicatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].duplicate(id);
                set((state)=>({
                        events: [
                            duplicatedEvent,
                            ...state.events
                        ],
                        isLoading: false
                    }));
                return duplicatedEvent;
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء نسخ الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
                throw error;
            }
        },
        // أرشفة حدث - متصل بـ Backend API (تحديث الحالة إلى archived)
        archiveEvent: async (id)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                // استخدام updateStatus لتغيير الحالة إلى archived دون فقدان البيانات
                const updatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].updateStatus(id, "archived");
                set((state)=>({
                        events: state.events.map((e)=>e.id === id ? updatedEvent : e),
                        currentEvent: state.currentEvent?.id === id ? updatedEvent : state.currentEvent,
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء أرشفة الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
                throw error;
            }
        },
        // تغيير حالة الحدث - متصل بـ Backend API
        // يستخدم PATCH endpoint لتحديث الحالة فقط دون المساس بالبيانات الأخرى
        updateEventStatus: async (id, status)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                // استخدام updateStatus بدلاً من update لتجنب فقدان البيانات
                const updatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].updateStatus(id, status);
                set((state)=>({
                        events: state.events.map((e)=>e.id === id ? updatedEvent : e),
                        currentEvent: state.currentEvent?.id === id ? updatedEvent : state.currentEvent,
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء تحديث حالة الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
                throw error;
            }
        },
        // إنشاء حدث من الصفر - يستخدم createEvent
        createEventFromScratch: async (data)=>{
            // تحويل البيانات إلى EventFormData
            const eventData = {
                title: data.title,
                description: data.description,
                type: data.type,
                status: "draft",
                coverImage: data.coverImage,
                settings: {}
            };
            return get().createEvent(eventData);
        },
        // تحديث إعدادات الحدث - يستخدم updateEvent
        updateEventSettings: async (id, settings)=>{
            return get().updateEvent(id, {
                settings
            });
        },
        // نشر حدث - متصل بـ Backend API
        publishEvent: async (id)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const publishedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsService"].publish(id);
                set((state)=>({
                        events: state.events.map((e)=>e.id === id ? publishedEvent : e),
                        currentEvent: state.currentEvent?.id === id ? publishedEvent : state.currentEvent,
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء نشر الحدث";
                set({
                    error: errorMessage,
                    isLoading: false
                });
                throw error;
            }
        },
        // تعيين البحث
        setSearch: (search)=>{
            set((state)=>({
                    filters: {
                        ...state.filters,
                        search
                    }
                }));
        },
        // تعيين فلتر الحالة
        setStatusFilter: (status)=>{
            set((state)=>({
                    filters: {
                        ...state.filters,
                        status
                    }
                }));
        },
        // تعيين فلتر النوع
        setTypeFilter: (type)=>{
            set((state)=>({
                    filters: {
                        ...state.filters,
                        type
                    }
                }));
        },
        // تعيين الترتيب
        setSortBy: (sortBy)=>{
            set((state)=>({
                    filters: {
                        ...state.filters,
                        sortBy
                    }
                }));
        },
        // تعيين اتجاه الترتيب
        setSortOrder: (sortOrder)=>{
            set((state)=>({
                    filters: {
                        ...state.filters,
                        sortOrder
                    }
                }));
        },
        // مسح الفلاتر
        clearFilters: ()=>{
            set({
                filters: {
                    search: "",
                    status: "all",
                    type: "all",
                    sortBy: "createdAt",
                    sortOrder: "desc"
                }
            });
        },
        // الحصول على الأحداث المفلترة
        getFilteredEvents: ()=>{
            const { events, filters } = get();
            let filtered = [
                ...events
            ];
            // إخفاء الأحداث المؤرشفة تلقائياً (إلا إذا طلب المستخدم عرضها بشكل صريح)
            if (filters.status !== "archived") {
                filtered = filtered.filter((e)=>e.status !== "archived");
            }
            // فلترة حسب البحث
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                filtered = filtered.filter((e)=>e.title.toLowerCase().includes(searchLower) || e.description.toLowerCase().includes(searchLower));
            }
            // فلترة حسب الحالة (بعد إخفاء المؤرشفة)
            if (filters.status !== "all" && filters.status !== "archived") {
                filtered = filtered.filter((e)=>e.status === filters.status);
            }
            // فلترة حسب النوع
            if (filters.type !== "all") {
                filtered = filtered.filter((e)=>e.type === filters.type);
            }
            // الترتيب
            filtered.sort((a, b)=>{
                let aValue;
                let bValue;
                switch(filters.sortBy){
                    case "title":
                        aValue = a.title.toLowerCase();
                        bValue = b.title.toLowerCase();
                        break;
                    case "responses":
                        aValue = a.stats.totalResponses;
                        bValue = b.stats.totalResponses;
                        break;
                    case "updatedAt":
                        aValue = new Date(a.updatedAt).getTime();
                        bValue = new Date(b.updatedAt).getTime();
                        break;
                    case "createdAt":
                    default:
                        aValue = new Date(a.createdAt).getTime();
                        bValue = new Date(b.createdAt).getTime();
                        break;
                }
                if (filters.sortOrder === "asc") {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });
            return filtered;
        }
    }));
}),
"[project]/event-meena/types/pdf-editor.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PDF Editor Types and Interfaces
 * 
 * This file contains all TypeScript types and interfaces for the advanced PDF editor.
 * It provides complete type safety for PDF customization settings.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */ // ============================================================================
// Core Settings Interfaces
// ============================================================================
/**
 * Page layout and formatting settings
 */ __turbopack_context__.s([
    "AVAILABLE_FONTS",
    ()=>AVAILABLE_FONTS,
    "DEFAULT_PDF_SETTINGS",
    ()=>DEFAULT_PDF_SETTINGS,
    "FONT_WEIGHTS",
    ()=>FONT_WEIGHTS,
    "PAGE_SIZE_DIMENSIONS",
    ()=>PAGE_SIZE_DIMENSIONS,
    "PRESET_TEMPLATES",
    ()=>PRESET_TEMPLATES,
    "QUALITY_SCALE_MAP",
    ()=>QUALITY_SCALE_MAP
]);
const QUALITY_SCALE_MAP = {
    low: 1,
    medium: 2,
    high: 3,
    ultra: 4
};
const PAGE_SIZE_DIMENSIONS = {
    a4: {
        width: 210,
        height: 297
    },
    a3: {
        width: 297,
        height: 420
    },
    letter: {
        width: 215.9,
        height: 279.4
    },
    legal: {
        width: 215.9,
        height: 355.6
    }
};
const AVAILABLE_FONTS = [
    {
        value: 'Arial',
        label: 'Arial'
    },
    {
        value: 'Tahoma',
        label: 'Tahoma'
    },
    {
        value: 'Cairo',
        label: 'Cairo'
    },
    {
        value: 'Amiri',
        label: 'Amiri'
    },
    {
        value: 'Helvetica',
        label: 'Helvetica'
    },
    {
        value: 'Times New Roman',
        label: 'Times New Roman'
    }
];
const FONT_WEIGHTS = [
    {
        value: 400,
        label: 'عادي (400)'
    },
    {
        value: 600,
        label: 'متوسط (600)'
    },
    {
        value: 700,
        label: 'سميك (700)'
    },
    {
        value: 800,
        label: 'سميك جداً (800)'
    },
    {
        value: 900,
        label: 'أسود (900)'
    }
];
const DEFAULT_PDF_SETTINGS = {
    page: {
        orientation: 'landscape',
        size: 'a4',
        margins: {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        },
        backgroundColor: '#ffffff'
    },
    fonts: {
        family: 'Cairo',
        sizes: {
            eventTitle: 76,
            tableTitle: 60,
            header: 34,
            content: 30,
            info: 24,
            footer: 20
        },
        weights: {
            eventTitle: 900,
            tableTitle: 900,
            header: 800,
            content: 400
        }
    },
    colors: {
        primary: '#3b82f6',
        secondary: '#f8fafc',
        text: '#1e293b',
        border: '#e2e8f0',
        eventTitleBg: '#1e293b',
        eventTitleText: '#ffffff',
        tableTitleBg: '#f8fafc',
        tableTitleText: '#1e293b',
        headerBg: '#334155',
        headerText: '#ffffff',
        alternateRowBg: '#f8fafc'
    },
    spacing: {
        tableSeparation: 20,
        containerPadding: {
            vertical: 50,
            horizontal: 60
        },
        cellPadding: {
            vertical: 20,
            horizontal: 16
        },
        titleMargins: {
            eventTitle: 80,
            tableTitle: 40
        }
    },
    table: {
        border: {
            width: 1,
            style: 'solid',
            radius: 0
        },
        columnWidthMode: 'auto',
        zebraStriping: false,
        headerStyle: 'gradient'
    },
    advanced: {
        quality: 'high',
        compression: false,
        embedFonts: true
    },
    customTexts: {
        header: {
            enabled: false,
            text: '',
            fontSize: 28,
            color: '#1e293b',
            alignment: 'center',
            bold: true,
            italic: false,
            marginBottom: 40
        },
        footer: {
            enabled: false,
            text: '',
            fontSize: 24,
            color: '#64748b',
            alignment: 'center',
            bold: false,
            italic: true,
            marginTop: 60
        },
        separator: {
            enabled: false,
            text: '• • •',
            fontSize: 20,
            color: '#94a3b8',
            alignment: 'center',
            bold: false,
            italic: false,
            marginTop: 30,
            marginBottom: 30
        }
    }
};
const PRESET_TEMPLATES = [
    {
        id: 'professional',
        name: 'احترافي أزرق',
        description: 'التصميم الحالي v9.0 + v9.1 - احترافي بألوان هادئة وتدرجات جميلة مع دعم كامل للعربية',
        settings: {
            ...DEFAULT_PDF_SETTINGS
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreset: true
    },
    {
        id: 'minimal',
        name: 'بسيط أبيض وأسود',
        description: 'تصميم بسيط وأنيق بالأبيض والأسود - مثالي للطباعة',
        settings: {
            ...DEFAULT_PDF_SETTINGS,
            fonts: {
                ...DEFAULT_PDF_SETTINGS.fonts,
                family: 'Cairo',
                sizes: {
                    ...DEFAULT_PDF_SETTINGS.fonts.sizes,
                    eventTitle: 72,
                    tableTitle: 56,
                    header: 32,
                    content: 28
                },
                weights: {
                    eventTitle: 800,
                    tableTitle: 700,
                    header: 700,
                    content: 400
                }
            },
            colors: {
                ...DEFAULT_PDF_SETTINGS.colors,
                primary: '#000000',
                secondary: '#f9fafb',
                text: '#000000',
                border: '#d1d5db',
                eventTitleBg: '#000000',
                eventTitleText: '#ffffff',
                tableTitleBg: '#f3f4f6',
                tableTitleText: '#000000',
                headerBg: '#000000',
                headerText: '#ffffff',
                alternateRowBg: '#f9fafb'
            },
            spacing: {
                ...DEFAULT_PDF_SETTINGS.spacing,
                tableSeparation: 18,
                cellPadding: {
                    vertical: 18,
                    horizontal: 14
                }
            },
            table: {
                ...DEFAULT_PDF_SETTINGS.table,
                border: {
                    width: 2,
                    style: 'solid',
                    radius: 0
                },
                headerStyle: 'solid',
                zebraStriping: true
            }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreset: true
    },
    {
        id: 'colorful',
        name: 'ملون إبداعي',
        description: 'تصميم ملون وجذاب بألوان بنفسجية وحواف دائرية',
        settings: {
            ...DEFAULT_PDF_SETTINGS,
            fonts: {
                ...DEFAULT_PDF_SETTINGS.fonts,
                family: 'Cairo',
                sizes: {
                    ...DEFAULT_PDF_SETTINGS.fonts.sizes,
                    eventTitle: 80,
                    tableTitle: 62,
                    header: 36,
                    content: 32
                },
                weights: {
                    eventTitle: 900,
                    tableTitle: 800,
                    header: 700,
                    content: 600
                }
            },
            colors: {
                ...DEFAULT_PDF_SETTINGS.colors,
                primary: '#8b5cf6',
                secondary: '#faf5ff',
                text: '#581c87',
                border: '#e9d5ff',
                eventTitleBg: '#7c3aed',
                eventTitleText: '#ffffff',
                tableTitleBg: '#f3e8ff',
                tableTitleText: '#6b21a8',
                headerBg: '#8b5cf6',
                headerText: '#ffffff',
                alternateRowBg: '#faf5ff'
            },
            spacing: {
                ...DEFAULT_PDF_SETTINGS.spacing,
                tableSeparation: 22,
                cellPadding: {
                    vertical: 22,
                    horizontal: 18
                },
                titleMargins: {
                    eventTitle: 85,
                    tableTitle: 45
                }
            },
            table: {
                ...DEFAULT_PDF_SETTINGS.table,
                zebraStriping: true,
                border: {
                    width: 1,
                    style: 'solid',
                    radius: 12
                },
                headerStyle: 'gradient'
            }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreset: true
    },
    {
        id: 'modern',
        name: 'عصري أخضر',
        description: 'تصميم عصري بألوان خضراء منعشة وحواف دائرية كبيرة',
        settings: {
            ...DEFAULT_PDF_SETTINGS,
            fonts: {
                ...DEFAULT_PDF_SETTINGS.fonts,
                family: 'Cairo',
                sizes: {
                    ...DEFAULT_PDF_SETTINGS.fonts.sizes,
                    eventTitle: 78,
                    tableTitle: 58,
                    header: 34,
                    content: 30
                },
                weights: {
                    eventTitle: 900,
                    tableTitle: 800,
                    header: 700,
                    content: 400
                }
            },
            colors: {
                ...DEFAULT_PDF_SETTINGS.colors,
                primary: '#10b981',
                secondary: '#f0fdf4',
                text: '#064e3b',
                border: '#d1fae5',
                eventTitleBg: '#059669',
                eventTitleText: '#ffffff',
                tableTitleBg: '#d1fae5',
                tableTitleText: '#065f46',
                headerBg: '#10b981',
                headerText: '#ffffff',
                alternateRowBg: '#f0fdf4'
            },
            spacing: {
                ...DEFAULT_PDF_SETTINGS.spacing,
                tableSeparation: 20,
                cellPadding: {
                    vertical: 20,
                    horizontal: 16
                }
            },
            table: {
                ...DEFAULT_PDF_SETTINGS.table,
                border: {
                    width: 1,
                    style: 'solid',
                    radius: 16
                },
                zebraStriping: true,
                headerStyle: 'gradient'
            }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreset: true
    },
    {
        id: 'elegant',
        name: 'أنيق ذهبي',
        description: 'تصميم أنيق كلاسيكي بألوان ذهبية وبنية فاخرة',
        settings: {
            ...DEFAULT_PDF_SETTINGS,
            fonts: {
                ...DEFAULT_PDF_SETTINGS.fonts,
                family: 'Amiri',
                sizes: {
                    ...DEFAULT_PDF_SETTINGS.fonts.sizes,
                    eventTitle: 74,
                    tableTitle: 58,
                    header: 32,
                    content: 28
                },
                weights: {
                    eventTitle: 900,
                    tableTitle: 800,
                    header: 700,
                    content: 400
                }
            },
            colors: {
                ...DEFAULT_PDF_SETTINGS.colors,
                primary: '#d97706',
                secondary: '#fffbeb',
                text: '#78350f',
                border: '#fde68a',
                eventTitleBg: '#b45309',
                eventTitleText: '#ffffff',
                tableTitleBg: '#fef3c7',
                tableTitleText: '#92400e',
                headerBg: '#d97706',
                headerText: '#ffffff',
                alternateRowBg: '#fffbeb'
            },
            spacing: {
                ...DEFAULT_PDF_SETTINGS.spacing,
                tableSeparation: 18,
                cellPadding: {
                    vertical: 18,
                    horizontal: 16
                }
            },
            table: {
                ...DEFAULT_PDF_SETTINGS.table,
                border: {
                    width: 2,
                    style: 'solid',
                    radius: 6
                },
                zebraStriping: true,
                headerStyle: 'solid'
            }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreset: true
    },
    {
        id: 'pastel',
        name: 'هادئ باستيل',
        description: 'تصميم هادئ بألوان باستيل ناعمة وحواف دائرية',
        settings: {
            ...DEFAULT_PDF_SETTINGS,
            fonts: {
                ...DEFAULT_PDF_SETTINGS.fonts,
                family: 'Cairo',
                sizes: {
                    ...DEFAULT_PDF_SETTINGS.fonts.sizes,
                    eventTitle: 74,
                    tableTitle: 56,
                    header: 32,
                    content: 28
                },
                weights: {
                    eventTitle: 800,
                    tableTitle: 700,
                    header: 700,
                    content: 400
                }
            },
            colors: {
                ...DEFAULT_PDF_SETTINGS.colors,
                primary: '#ec4899',
                secondary: '#fdf2f8',
                text: '#831843',
                border: '#fbcfe8',
                eventTitleBg: '#db2777',
                eventTitleText: '#ffffff',
                tableTitleBg: '#fce7f3',
                tableTitleText: '#9f1239',
                headerBg: '#ec4899',
                headerText: '#ffffff',
                alternateRowBg: '#fdf2f8'
            },
            spacing: {
                ...DEFAULT_PDF_SETTINGS.spacing,
                tableSeparation: 22,
                cellPadding: {
                    vertical: 22,
                    horizontal: 18
                },
                titleMargins: {
                    eventTitle: 85,
                    tableTitle: 45
                }
            },
            table: {
                ...DEFAULT_PDF_SETTINGS.table,
                border: {
                    width: 1,
                    style: 'solid',
                    radius: 14
                },
                zebraStriping: true,
                headerStyle: 'gradient'
            }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreset: true
    },
    {
        id: 'contrast',
        name: 'تباين عالي',
        description: 'تصميم بتباين عالي للقراءة الواضحة - مثالي لضعاف البصر',
        settings: {
            ...DEFAULT_PDF_SETTINGS,
            fonts: {
                ...DEFAULT_PDF_SETTINGS.fonts,
                family: 'Cairo',
                sizes: {
                    ...DEFAULT_PDF_SETTINGS.fonts.sizes,
                    eventTitle: 82,
                    tableTitle: 64,
                    header: 38,
                    content: 34
                },
                weights: {
                    eventTitle: 900,
                    tableTitle: 900,
                    header: 800,
                    content: 700
                }
            },
            colors: {
                ...DEFAULT_PDF_SETTINGS.colors,
                primary: '#dc2626',
                secondary: '#ffffff',
                text: '#000000',
                border: '#000000',
                eventTitleBg: '#000000',
                eventTitleText: '#ffffff',
                tableTitleBg: '#fef2f2',
                tableTitleText: '#000000',
                headerBg: '#dc2626',
                headerText: '#ffffff',
                alternateRowBg: '#fef2f2'
            },
            spacing: {
                ...DEFAULT_PDF_SETTINGS.spacing,
                tableSeparation: 24,
                cellPadding: {
                    vertical: 24,
                    horizontal: 20
                },
                titleMargins: {
                    eventTitle: 90,
                    tableTitle: 50
                }
            },
            table: {
                ...DEFAULT_PDF_SETTINGS.table,
                border: {
                    width: 3,
                    style: 'solid',
                    radius: 0
                },
                zebraStriping: true,
                headerStyle: 'solid'
            }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreset: true
    }
];
}),
"[project]/event-meena/contexts/PDFEditorContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PDF Editor Context
 * 
 * Global state management for the PDF editor using React Context API.
 * Provides settings, templates, and actions to all editor components.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */ __turbopack_context__.s([
    "PDFEditorProvider",
    ()=>PDFEditorProvider,
    "usePDFEditor",
    ()=>usePDFEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$types$2f$pdf$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/types/pdf-editor.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const PDFEditorContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// ============================================================================
// Local Storage Keys
// ============================================================================
const STORAGE_KEYS = {
    TEMPLATES: 'pdf-editor-templates',
    CURRENT_SETTINGS: 'pdf-editor-current-settings',
    SELECTED_TEMPLATE: 'pdf-editor-selected-template'
};
// ============================================================================
// Reducer
// ============================================================================
function pdfEditorReducer(state, action) {
    switch(action.type){
        case 'SET_SETTINGS':
            return {
                ...state,
                currentSettings: action.payload,
                isDirty: true
            };
        case 'UPDATE_PAGE_SETTINGS':
            return {
                ...state,
                currentSettings: {
                    ...state.currentSettings,
                    page: {
                        ...state.currentSettings.page,
                        ...action.payload
                    }
                },
                isDirty: true
            };
        case 'UPDATE_FONT_SETTINGS':
            return {
                ...state,
                currentSettings: {
                    ...state.currentSettings,
                    fonts: {
                        ...state.currentSettings.fonts,
                        ...action.payload,
                        sizes: {
                            ...state.currentSettings.fonts.sizes,
                            ...action.payload.sizes || {}
                        },
                        weights: {
                            ...state.currentSettings.fonts.weights,
                            ...action.payload.weights || {}
                        }
                    }
                },
                isDirty: true
            };
        case 'UPDATE_COLOR_SETTINGS':
            return {
                ...state,
                currentSettings: {
                    ...state.currentSettings,
                    colors: {
                        ...state.currentSettings.colors,
                        ...action.payload
                    }
                },
                isDirty: true
            };
        case 'UPDATE_SPACING_SETTINGS':
            return {
                ...state,
                currentSettings: {
                    ...state.currentSettings,
                    spacing: {
                        ...state.currentSettings.spacing,
                        ...action.payload,
                        containerPadding: {
                            ...state.currentSettings.spacing.containerPadding,
                            ...action.payload.containerPadding || {}
                        },
                        cellPadding: {
                            ...state.currentSettings.spacing.cellPadding,
                            ...action.payload.cellPadding || {}
                        },
                        titleMargins: {
                            ...state.currentSettings.spacing.titleMargins,
                            ...action.payload.titleMargins || {}
                        }
                    }
                },
                isDirty: true
            };
        case 'UPDATE_TABLE_SETTINGS':
            return {
                ...state,
                currentSettings: {
                    ...state.currentSettings,
                    table: {
                        ...state.currentSettings.table,
                        ...action.payload,
                        border: {
                            ...state.currentSettings.table.border,
                            ...action.payload.border || {}
                        }
                    }
                },
                isDirty: true
            };
        case 'UPDATE_ADVANCED_SETTINGS':
            return {
                ...state,
                currentSettings: {
                    ...state.currentSettings,
                    advanced: {
                        ...state.currentSettings.advanced,
                        ...action.payload
                    }
                },
                isDirty: true
            };
        case 'LOAD_TEMPLATE':
            {
                const template = state.templates.find((t)=>t.id === action.payload);
                if (!template) return state;
                return {
                    ...state,
                    currentSettings: template.settings,
                    selectedTemplateId: template.id,
                    isDirty: false
                };
            }
        case 'SAVE_TEMPLATE':
            {
                const newTemplate = {
                    id: `custom-${Date.now()}`,
                    name: action.payload.name,
                    description: action.payload.description,
                    settings: state.currentSettings,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isPreset: false
                };
                const updatedTemplates = [
                    ...state.templates,
                    newTemplate
                ];
                // Save to localStorage
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                return {
                    ...state,
                    templates: updatedTemplates,
                    selectedTemplateId: newTemplate.id,
                    isDirty: false
                };
            }
        case 'DELETE_TEMPLATE':
            {
                // Cannot delete preset templates
                const template = state.templates.find((t)=>t.id === action.payload);
                if (!template || template.isPreset) return state;
                const updatedTemplates = state.templates.filter((t)=>t.id !== action.payload);
                // Save to localStorage
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                return {
                    ...state,
                    templates: updatedTemplates,
                    selectedTemplateId: state.selectedTemplateId === action.payload ? undefined : state.selectedTemplateId
                };
            }
        case 'SET_PREVIEW_LOADING':
            return {
                ...state,
                isPreviewLoading: action.payload
            };
        case 'SET_PREVIEW_ZOOM':
            return {
                ...state,
                previewZoom: Math.max(0.5, Math.min(2.0, action.payload))
            };
        case 'RESET_TO_DEFAULT':
            return {
                ...state,
                currentSettings: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$types$2f$pdf$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PDF_SETTINGS"],
                selectedTemplateId: 'professional',
                isDirty: false
            };
        case 'MARK_CLEAN':
            return {
                ...state,
                isDirty: false
            };
        case 'ADD_CUSTOM_TEXT_OVERLAY':
            {
                const newOverlay = {
                    ...action.payload,
                    id: `overlay-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                };
                return {
                    ...state,
                    currentSettings: {
                        ...state.currentSettings,
                        customTextOverlays: [
                            ...state.currentSettings.customTextOverlays || [],
                            newOverlay
                        ]
                    },
                    isDirty: true
                };
            }
        case 'UPDATE_CUSTOM_TEXT_OVERLAY':
            {
                const overlays = state.currentSettings.customTextOverlays || [];
                const updatedOverlays = overlays.map((overlay)=>overlay.id === action.payload.id ? {
                        ...overlay,
                        ...action.payload.updates
                    } : overlay);
                return {
                    ...state,
                    currentSettings: {
                        ...state.currentSettings,
                        customTextOverlays: updatedOverlays
                    },
                    isDirty: true
                };
            }
        case 'DELETE_CUSTOM_TEXT_OVERLAY':
            {
                const overlays = state.currentSettings.customTextOverlays || [];
                const filteredOverlays = overlays.filter((overlay)=>overlay.id !== action.payload);
                return {
                    ...state,
                    currentSettings: {
                        ...state.currentSettings,
                        customTextOverlays: filteredOverlays
                    },
                    isDirty: true
                };
            }
        // v4.0: Interactive Visual PDF Editor - Selection actions
        case 'SELECT_ELEMENT':
            {
                return {
                    ...state,
                    selectedElement: action.payload
                };
            }
        case 'DESELECT_ELEMENT':
            {
                return {
                    ...state,
                    selectedElement: null
                };
            }
        case 'SET_PREVIEW_MODE':
            {
                return {
                    ...state,
                    previewMode: action.payload,
                    // Deselect element when switching modes
                    selectedElement: null
                };
            }
        default:
            return state;
    }
}
function PDFEditorProvider({ children }) {
    // Load initial state from localStorage
    const loadInitialState = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return {
                currentSettings: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$types$2f$pdf$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PDF_SETTINGS"],
                templates: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$types$2f$pdf$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESET_TEMPLATES"],
                selectedTemplateId: 'professional',
                isPreviewLoading: false,
                previewZoom: 1.0,
                isDirty: false,
                selectedElement: null,
                previewMode: 'preview'
            };
        }
        //TURBOPACK unreachable
        ;
        // Load custom templates from localStorage
        const savedTemplatesJson = undefined;
        const customTemplates = undefined;
        // Load current settings
        const savedSettingsJson = undefined;
        const currentSettings = undefined;
        // Load selected template
        const selectedTemplateId = undefined;
    };
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(pdfEditorReducer, null, loadInitialState);
    // Save current settings to localStorage whenever they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        state.currentSettings,
        state.selectedTemplateId
    ]);
    // Convenience methods
    const setSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((settings)=>{
        dispatch({
            type: 'SET_SETTINGS',
            payload: settings
        });
    }, []);
    const updateSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((settings)=>{
        dispatch({
            type: 'SET_SETTINGS',
            payload: {
                ...state.currentSettings,
                ...settings,
                page: {
                    ...state.currentSettings.page,
                    ...settings.page || {}
                },
                fonts: {
                    ...state.currentSettings.fonts,
                    ...settings.fonts || {},
                    sizes: {
                        ...state.currentSettings.fonts.sizes,
                        ...settings.fonts?.sizes || {}
                    },
                    weights: {
                        ...state.currentSettings.fonts.weights,
                        ...settings.fonts?.weights || {}
                    }
                },
                colors: {
                    ...state.currentSettings.colors,
                    ...settings.colors || {}
                },
                spacing: {
                    ...state.currentSettings.spacing,
                    ...settings.spacing || {},
                    containerPadding: {
                        ...state.currentSettings.spacing.containerPadding,
                        ...settings.spacing?.containerPadding || {}
                    },
                    cellPadding: {
                        ...state.currentSettings.spacing.cellPadding,
                        ...settings.spacing?.cellPadding || {}
                    },
                    titleMargins: {
                        ...state.currentSettings.spacing.titleMargins,
                        ...settings.spacing?.titleMargins || {}
                    }
                },
                table: {
                    ...state.currentSettings.table,
                    ...settings.table || {},
                    border: {
                        ...state.currentSettings.table.border,
                        ...settings.table?.border || {}
                    }
                },
                advanced: {
                    ...state.currentSettings.advanced,
                    ...settings.advanced || {}
                }
            }
        });
    }, [
        state.currentSettings
    ]);
    const updatePageSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((settings)=>{
        dispatch({
            type: 'UPDATE_PAGE_SETTINGS',
            payload: settings
        });
    }, []);
    const updateFontSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((settings)=>{
        dispatch({
            type: 'UPDATE_FONT_SETTINGS',
            payload: settings
        });
    }, []);
    const updateColorSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((settings)=>{
        dispatch({
            type: 'UPDATE_COLOR_SETTINGS',
            payload: settings
        });
    }, []);
    const updateSpacingSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((settings)=>{
        dispatch({
            type: 'UPDATE_SPACING_SETTINGS',
            payload: settings
        });
    }, []);
    const updateTableSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((settings)=>{
        dispatch({
            type: 'UPDATE_TABLE_SETTINGS',
            payload: settings
        });
    }, []);
    const updateAdvancedSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((settings)=>{
        dispatch({
            type: 'UPDATE_ADVANCED_SETTINGS',
            payload: settings
        });
    }, []);
    // Custom Text Overlay methods
    const addCustomTextOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((overlay)=>{
        dispatch({
            type: 'ADD_CUSTOM_TEXT_OVERLAY',
            payload: overlay
        });
    }, []);
    const updateCustomTextOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, updates)=>{
        dispatch({
            type: 'UPDATE_CUSTOM_TEXT_OVERLAY',
            payload: {
                id,
                updates
            }
        });
    }, []);
    const deleteCustomTextOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        dispatch({
            type: 'DELETE_CUSTOM_TEXT_OVERLAY',
            payload: id
        });
    }, []);
    const loadTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((templateId)=>{
        dispatch({
            type: 'LOAD_TEMPLATE',
            payload: templateId
        });
    }, []);
    const saveTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((name, description)=>{
        dispatch({
            type: 'SAVE_TEMPLATE',
            payload: {
                name,
                description
            }
        });
    }, []);
    const deleteTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((templateId)=>{
        dispatch({
            type: 'DELETE_TEMPLATE',
            payload: templateId
        });
    }, []);
    const setPreviewLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((loading)=>{
        dispatch({
            type: 'SET_PREVIEW_LOADING',
            payload: loading
        });
    }, []);
    const setPreviewZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((zoom)=>{
        dispatch({
            type: 'SET_PREVIEW_ZOOM',
            payload: zoom
        });
    }, []);
    // v4.0: Interactive Visual PDF Editor methods
    const selectElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((element)=>{
        dispatch({
            type: 'SELECT_ELEMENT',
            payload: element
        });
    }, []);
    const deselectElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dispatch({
            type: 'DESELECT_ELEMENT'
        });
    }, []);
    const setPreviewMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((mode)=>{
        dispatch({
            type: 'SET_PREVIEW_MODE',
            payload: mode
        });
    }, []);
    const resetToDefault = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dispatch({
            type: 'RESET_TO_DEFAULT'
        });
    }, []);
    const markClean = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dispatch({
            type: 'MARK_CLEAN'
        });
    }, []);
    const value = {
        state,
        dispatch,
        setSettings,
        updateSettings,
        updatePageSettings,
        updateFontSettings,
        updateColorSettings,
        updateSpacingSettings,
        updateTableSettings,
        updateAdvancedSettings,
        addCustomTextOverlay,
        updateCustomTextOverlay,
        deleteCustomTextOverlay,
        loadTemplate,
        saveTemplate,
        deleteTemplate,
        setPreviewLoading,
        setPreviewZoom,
        selectElement,
        deselectElement,
        setPreviewMode,
        resetToDefault,
        markClean
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PDFEditorContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/event-meena/contexts/PDFEditorContext.tsx",
        lineNumber: 570,
        columnNumber: 5
    }, this);
}
function usePDFEditor() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(PDFEditorContext);
    if (context === undefined) {
        throw new Error('usePDFEditor must be used within PDFEditorProvider');
    }
    return context;
}
}),
"[project]/event-meena/hooks/usePDFPreview.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PDF Preview Hook
 * 
 * Custom hook for managing PDF preview generation and state.
 * Handles debouncing, memoization, and preview updates.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */ __turbopack_context__.s([
    "usePDFPreview",
    ()=>usePDFPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$pdf$2d$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/pdf-performance.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function usePDFPreview({ settings, sampleData, debounceDelay = 500 }) {
    const [previewUrl, setPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Refs for debouncing
    const debounceTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    /**
   * Generate preview from settings
   */ const generatePreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$pdf$2d$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].start('preview-generation');
            setIsLoading(true);
            setError(null);
            // Create temporary container
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.left = '-9999px';
            container.style.top = '0';
            container.style.width = '3500px';
            container.style.padding = `${settings.spacing.containerPadding.vertical}px ${settings.spacing.containerPadding.horizontal}px`;
            container.style.fontFamily = settings.fonts.family;
            container.style.direction = 'rtl';
            container.style.backgroundColor = settings.page.backgroundColor;
            container.style.zIndex = '-9999';
            // v9.1: Fix Arabic text rendering
            container.style.unicodeBidi = "embed";
            container.style.textRendering = "optimizeLegibility";
            container.style.webkitFontSmoothing = "antialiased";
            container.style.mozOsxFontSmoothing = "grayscale";
            // Build HTML content
            let htmlContent = '';
            // Event title (if sample data provided) - v10.0 design with customizable colors
            if (sampleData?.eventTitle) {
                htmlContent += `
          <div style="
            position: relative;
            text-align: center;
            margin-bottom: ${settings.spacing.titleMargins.eventTitle}px;
            padding: 48px 60px;
            background: ${settings.colors.eventTitleBg};
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              top: 0;
              right: 0;
              width: 100%;
              height: 6px;
              background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
            "></div>
            <h1 style="
              font-size: ${settings.fonts.sizes.eventTitle}px;
              font-weight: ${settings.fonts.weights.eventTitle};
              color: ${settings.colors.eventTitleText};
              margin: 0;
              font-family: ${settings.fonts.family};
              direction: rtl;
              unicode-bidi: bidi-override;
              line-height: 1.5;
              letter-spacing: 0;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              white-space: pre-wrap;
              word-break: keep-all;
            ">${sampleData.eventTitle}</h1>
          </div>
        `;
            }
            // Header Text (Custom Text) - v2.0
            if (settings.customTexts.header.enabled && settings.customTexts.header.text) {
                const textAlign = settings.customTexts.header.alignment === 'right' ? 'right' : settings.customTexts.header.alignment === 'left' ? 'left' : 'center';
                htmlContent += `
          <div style="
            text-align: ${textAlign};
            margin-bottom: ${settings.customTexts.header.marginBottom}px;
            padding: 20px 30px;
            background-color: rgba(248, 250, 252, 0.5);
            border-radius: 8px;
          ">
            <p style="
              font-size: ${settings.customTexts.header.fontSize}px;
              color: ${settings.customTexts.header.color};
              font-weight: ${settings.customTexts.header.bold ? '700' : '400'};
              font-style: ${settings.customTexts.header.italic ? 'italic' : 'normal'};
              margin: 0;
              font-family: ${settings.fonts.family};
              direction: rtl;
              unicode-bidi: bidi-override;
              line-height: 1.8;
              white-space: pre-wrap;
            ">${settings.customTexts.header.text}</p>
          </div>
        `;
            }
            // Sample table (if sample data provided)
            if (sampleData?.tables && sampleData.tables.length > 0) {
                const table = sampleData.tables[0];
                // Table title - v10.0 design with customizable colors
                htmlContent += `
          <div style="
            text-align: right;
            margin-bottom: ${settings.spacing.titleMargins.tableTitle}px;
            margin-top: 60px;
            padding: 24px 36px;
            background: ${settings.colors.tableTitleBg};
            border-right: 5px solid ${settings.colors.primary};
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          ">
            <h2 style="
              font-size: ${settings.fonts.sizes.tableTitle}px;
              font-weight: ${settings.fonts.weights.tableTitle};
              color: ${settings.colors.tableTitleText};
              margin: 0;
              font-family: ${settings.fonts.family};
              direction: rtl;
              unicode-bidi: bidi-override;
              line-height: 1.5;
              letter-spacing: 0;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              white-space: pre-wrap;
              word-break: keep-all;
            ">${table.title}</h2>
          </div>
        `;
                // Table - v9.0 design
                htmlContent += `
          <table style="
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            direction: rtl;
          ">
            <thead>
              <tr style="
                background: ${settings.colors.headerBg};
              ">
                ${table.headers.map((header)=>`
                  <th style="
                    padding: ${settings.spacing.cellPadding.vertical + 4}px ${settings.spacing.cellPadding.horizontal}px;
                    border: none;
                    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
                    text-align: center;
                    color: ${settings.colors.headerText};
                    font-weight: ${settings.fonts.weights.header};
                    font-size: ${settings.fonts.sizes.header}px;
                    direction: rtl;
                    unicode-bidi: bidi-override;
                    letter-spacing: 0;
                    text-rendering: optimizeLegibility;
                    -webkit-font-smoothing: antialiased;
                    white-space: nowrap;
                  ">${header}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${table.rows.map((row, index)=>`
                <tr style="
                  background-color: ${settings.table.zebraStriping && index % 2 === 1 ? settings.colors.alternateRowBg : '#ffffff'};
                  transition: background-color 0.2s;
                ">
                  ${table.headers.map((header)=>{
                        const cellValue = row[header] || '-';
                        const isSignature = cellValue.startsWith?.('data:image');
                        const cellContent = isSignature ? `<img src="${cellValue}" style="max-width: 180px; max-height: 70px; object-fit: contain; display: block; margin: 0 auto;" alt="توقيع" />` : cellValue;
                        return `
                    <td style="
                      padding: ${settings.spacing.cellPadding.vertical}px ${settings.spacing.cellPadding.horizontal}px;
                      border: none;
                      border-bottom: 1px solid #e2e8f0;
                      text-align: center;
                      color: ${settings.colors.text};
                      font-weight: ${settings.fonts.weights.content};
                      font-size: ${settings.fonts.sizes.content}px;
                      direction: rtl;
                      unicode-bidi: bidi-override;
                      text-rendering: optimizeLegibility;
                      white-space: pre-wrap;
                      line-height: 1.6;
                      vertical-align: middle;
                    ">${cellContent}</td>
                  `;
                    }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
            }
            // Footer Text (Custom Text) - v2.0
            if (settings.customTexts.footer.enabled && settings.customTexts.footer.text) {
                const textAlign = settings.customTexts.footer.alignment === 'right' ? 'right' : settings.customTexts.footer.alignment === 'left' ? 'left' : 'center';
                htmlContent += `
          <div style="
            text-align: ${textAlign};
            margin-top: ${settings.customTexts.footer.marginTop}px;
            padding: 20px 30px;
            background-color: rgba(248, 250, 252, 0.5);
            border-radius: 8px;
            border-top: 2px solid #e2e8f0;
          ">
            <p style="
              font-size: ${settings.customTexts.footer.fontSize}px;
              color: ${settings.customTexts.footer.color};
              font-weight: ${settings.customTexts.footer.bold ? '700' : '400'};
              font-style: ${settings.customTexts.footer.italic ? 'italic' : 'normal'};
              margin: 0;
              font-family: ${settings.fonts.family};
              direction: rtl;
              unicode-bidi: bidi-override;
              line-height: 1.8;
              white-space: pre-wrap;
            ">${settings.customTexts.footer.text}</p>
          </div>
        `;
            }
            container.innerHTML = htmlContent;
            document.body.appendChild(container);
            // Custom Text Overlays - v3.0 (Phase 5)
            // Add custom text overlays as absolutely positioned elements
            const overlays = settings.customTextOverlays || [];
            const visibleOverlays = overlays.filter((overlay)=>overlay.visible !== false);
            if (visibleOverlays.length > 0) {
                // Sort by zIndex (lower first, so higher zIndex appears on top)
                const sortedOverlays = [
                    ...visibleOverlays
                ].sort((a, b)=>(a.zIndex || 0) - (b.zIndex || 0));
                sortedOverlays.forEach((overlay)=>{
                    const overlayDiv = document.createElement('div');
                    // Convert mm to pixels (assuming 96 DPI: 1mm ≈ 3.7795px)
                    const mmToPx = 3.7795;
                    const xPx = overlay.position.x * mmToPx;
                    const yPx = overlay.position.y * mmToPx;
                    // Apply styles
                    overlayDiv.style.position = 'absolute';
                    overlayDiv.style.left = `${xPx}px`;
                    overlayDiv.style.top = `${yPx}px`;
                    overlayDiv.style.fontSize = `${overlay.fontSize}px`;
                    overlayDiv.style.color = overlay.color;
                    overlayDiv.style.fontWeight = overlay.fontWeight.toString();
                    overlayDiv.style.textAlign = overlay.textAlign;
                    overlayDiv.style.fontFamily = overlay.fontFamily || settings.fonts.family;
                    overlayDiv.style.direction = 'rtl';
                    overlayDiv.style.unicodeBidi = 'embed';
                    overlayDiv.style.whiteSpace = 'pre-wrap';
                    overlayDiv.style.lineHeight = '1.6';
                    overlayDiv.style.zIndex = (overlay.zIndex || 0).toString();
                    // Optional properties
                    if (overlay.rotation) {
                        overlayDiv.style.transform = `rotate(${overlay.rotation}deg)`;
                        overlayDiv.style.transformOrigin = 'top right';
                    }
                    if (overlay.opacity !== undefined) {
                        overlayDiv.style.opacity = overlay.opacity.toString();
                    }
                    if (overlay.backgroundColor) {
                        overlayDiv.style.backgroundColor = overlay.backgroundColor;
                        overlayDiv.style.padding = '8px 12px';
                        overlayDiv.style.borderRadius = '4px';
                    }
                    // Set content
                    overlayDiv.textContent = overlay.content;
                    // Append to container
                    container.appendChild(overlayDiv);
                });
            }
            containerRef.current = container;
            // Generate canvas
            const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(container, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: settings.page.backgroundColor,
                logging: false,
                width: 3500,
                windowWidth: 3500
            });
            // Convert to data URL
            const dataUrl = canvas.toDataURL('image/png', 0.8);
            setPreviewUrl(dataUrl);
            // Cleanup - Safe removal with check
            if (container && container.parentNode === document.body) {
                document.body.removeChild(container);
            }
            containerRef.current = null;
            __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$pdf$2d$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].end('preview-generation');
            __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$pdf$2d$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].measureMemory();
            setIsLoading(false);
        } catch (err) {
            console.error('Preview generation error:', err);
            setError('فشل إنشاء المعاينة');
            setIsLoading(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$pdf$2d$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].end('preview-generation');
            // Cleanup on error
            if (containerRef.current && document.body.contains(containerRef.current)) {
                document.body.removeChild(containerRef.current);
                containerRef.current = null;
            }
        }
    }, [
        settings,
        sampleData
    ]);
    /**
   * Debounced preview generation
   */ const debouncedGeneratePreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        // Set new timer
        debounceTimerRef.current = setTimeout(()=>{
            generatePreview();
        }, debounceDelay);
    }, [
        generatePreview,
        debounceDelay
    ]);
    /**
   * Manually trigger preview regeneration
   */ const regeneratePreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        generatePreview();
    }, [
        generatePreview
    ]);
    /**
   * Clear preview
   */ const clearPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setPreviewUrl(null);
        setError(null);
    }, []);
    // Auto-generate preview when settings change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        debouncedGeneratePreview();
        // Cleanup on unmount
        return ()=>{
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            if (containerRef.current && document.body.contains(containerRef.current)) {
                document.body.removeChild(containerRef.current);
            }
        };
    }, [
        debouncedGeneratePreview
    ]);
    return {
        previewUrl,
        isLoading,
        error,
        regeneratePreview,
        clearPreview
    };
}
}),
"[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParticipantDetailsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/auth/ProtectedRoute.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/store/eventsStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$DashboardLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/dashboard/DashboardLayout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/dashboard/LoadingState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/monitor.js [app-ssr] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-ssr] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tablet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tablet$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/tablet.js [app-ssr] (ecmascript) <export default as Tablet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$results$2f$ParticipantAnswers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/dashboard/results/ParticipantAnswers.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$results$2f$ExportPDFDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/dashboard/results/ExportPDFDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$responsesService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/responsesService.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function ParticipantDetailsPageContent() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const eventId = params.id;
    const responseId = params.responseId;
    const { currentEvent, fetchEventById, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventsStore"])();
    const [response, setResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showExportDialog, setShowExportDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingResponse, setIsLoadingResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (eventId) {
            fetchEventById(eventId);
            loadResponse();
        }
    }, [
        eventId,
        responseId,
        fetchEventById
    ]);
    const loadResponse = async ()=>{
        setIsLoadingResponse(true);
        try {
            // Load response from API
            const apiResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$responsesService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["responsesService"].getById(responseId);
            setResponse(apiResponse);
            console.log("✅ Loaded response from API:", apiResponse.id);
        } catch (error) {
            console.error("❌ Failed to load response from API:", error);
            // Fallback: try localStorage for backward compatibility
            const allResponses = JSON.parse(localStorage.getItem("event_responses") || "[]");
            const foundResponse = allResponses.find((r)=>r.id === responseId && r.eventId === eventId);
            setResponse(foundResponse || null);
            if (foundResponse) {
                console.log("⚠️ Using localStorage fallback for response");
            }
        } finally{
            setIsLoadingResponse(false);
        }
    };
    const formatTime = (seconds)=>{
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes} دقيقة و ${secs} ثانية`;
    };
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    const getDeviceIcon = (device)=>{
        if (!device) return __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"];
        if (device === "mobile") return __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"];
        if (device === "tablet") return __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tablet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tablet$3e$__["Tablet"];
        return __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"];
    };
    if (isLoading || !currentEvent || !response) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$DashboardLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    message: "جاري تحميل تفاصيل المشارك..."
                }, void 0, false, {
                    fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, this);
    }
    const DeviceIcon = getDeviceIcon(response.metadata.device);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$DashboardLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-b border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6 lg:px-8 py-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        asChild: true,
                                        className: "hover:bg-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/dashboard/events/${eventId}/results`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "w-5 h-5 ml-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 19
                                                }, this),
                                                "العودة إلى النتائج"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold text-gray-900",
                                                children: "تفاصيل المشارك"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 mt-1",
                                                children: currentEvent.title
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: ()=>setShowExportDialog(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "w-4 h-4 ml-2"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, this),
                                    "تصدير PDF"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: "p-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0",
                                        children: response.participant.name?.charAt(0).toUpperCase() || "؟"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 grid grid-cols-1 md:grid-cols-2 gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 rounded-lg bg-blue-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            className: "w-5 h-5 text-blue-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600 mb-1",
                                                                children: "الاسم الكامل"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-gray-900",
                                                                children: response.participant.name || "مشارك مجهول"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 167,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                lineNumber: 161,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 rounded-lg bg-green-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                            className: "w-5 h-5 text-green-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600 mb-1",
                                                                children: "البريد الإلكتروني"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 179,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-gray-900",
                                                                children: response.participant.email || "لا يوجد"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 180,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 rounded-lg bg-purple-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            className: "w-5 h-5 text-purple-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600 mb-1",
                                                                children: "تاريخ المشاركة"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 192,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-gray-900",
                                                                children: formatDate(response.completedAt || response.startedAt)
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 193,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 rounded-lg bg-orange-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "w-5 h-5 text-orange-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600 mb-1",
                                                                children: "الوقت المستغرق"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 205,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-gray-900",
                                                                children: formatTime(response.timeSpent)
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 206,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 rounded-lg bg-gray-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DeviceIcon, {
                                                            className: "w-5 h-5 text-gray-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                            lineNumber: 215,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600 mb-1",
                                                                children: "الجهاز المستخدم"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-gray-900",
                                                                children: response.metadata.device === "mobile" ? "هاتف محمول" : response.metadata.device === "tablet" ? "تابلت" : "كمبيوتر"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 219,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this),
                                            response.score && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 rounded-lg bg-yellow-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                            className: "w-5 h-5 text-yellow-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                            lineNumber: 230,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 229,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600 mb-1",
                                                                children: "الدرجة"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 233,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-bold text-primary text-lg",
                                                                children: [
                                                                    response.score.earnedPoints,
                                                                    "/",
                                                                    response.score.totalPoints,
                                                                    " (",
                                                                    response.score.percentage,
                                                                    "%)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 234,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mt-1",
                                                                children: response.score.passed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                            className: "w-4 h-4 text-green-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                            lineNumber: 240,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-medium text-green-600",
                                                                            children: "نجح"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                            lineNumber: 241,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                            className: "w-4 h-4 text-red-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                            lineNumber: 245,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-medium text-red-600",
                                                                            children: "رسب"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                            lineNumber: 246,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                                lineNumber: 237,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: "p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-gray-900 mb-2",
                                            children: "📝 الإجابات التفصيلية"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                            lineNumber: 260,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "جميع إجابات المشارك على أسئلة ومكونات الحدث"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$results$2f$ParticipantAnswers$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    event: currentEvent,
                                    response: response
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$results$2f$ExportPDFDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: showExportDialog,
                onOpenChange: setShowExportDialog,
                eventTitle: currentEvent.title,
                responses: [
                    response
                ],
                components: currentEvent.sections.flatMap((section)=>section.components),
                isSingleParticipant: true
            }, void 0, false, {
                fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
function ParticipantDetailsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ParticipantDetailsPageContent, {}, void 0, false, {
            fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
            lineNumber: 292,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/event-meena/app/dashboard/events/[id]/results/[responseId]/page.tsx",
        lineNumber: 291,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=event-meena_ea894f69._.js.map