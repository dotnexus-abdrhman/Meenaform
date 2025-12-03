(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/event-meena/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Client - Axios مع التكوين الأساسي
 * يتضمن interceptors للـ Token و Error handling
 */ __turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "apiClient",
    ()=>apiClient,
    "default",
    ()=>__TURBOPACK__default__export__,
    "tokenManager",
    ()=>tokenManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
// عنوان الـ Backend API
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5250/api") || "http://localhost:5250/api";
// مفاتيح LocalStorage
const ACCESS_TOKEN_KEY = "event_meena_access_token";
const REFRESH_TOKEN_KEY = "event_meena_refresh_token";
class ApiError extends Error {
    status;
    errors;
    constructor(message, status, errors = []){
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}
const tokenManager = {
    getAccessToken: ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },
    getRefreshToken: ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    setTokens: (accessToken, refreshToken)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },
    clearTokens: ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
    hasValidToken: ()=>{
        return !!tokenManager.getAccessToken();
    }
};
/**
 * إنشاء Axios Instance
 */ const createApiClient = ()=>{
    const client = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json"
        },
        timeout: 30000
    });
    // Request Interceptor - إضافة التوكن لكل طلب
    client.interceptors.request.use({
        "createApiClient.use": (config)=>{
            const token = tokenManager.getAccessToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
    }["createApiClient.use"], {
        "createApiClient.use": (error)=>Promise.reject(error)
    }["createApiClient.use"]);
    // Response Interceptor - معالجة الأخطاء وتجديد التوكن
    client.interceptors.response.use({
        "createApiClient.use": (response)=>response
    }["createApiClient.use"], {
        "createApiClient.use": async (error)=>{
            const originalRequest = error.config;
            // إذا كان الخطأ 401 ولم نحاول التجديد بعد
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = tokenManager.getRefreshToken();
                if (refreshToken) {
                    try {
                        // محاولة تجديد التوكن
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE_URL}/Auth/refresh-token`, {
                            refreshToken
                        });
                        if (response.data.success && response.data.data) {
                            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
                            tokenManager.setTokens(accessToken, newRefreshToken);
                            // إعادة المحاولة مع التوكن الجديد
                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            }
                            return client(originalRequest);
                        }
                    } catch  {
                        // فشل تجديد التوكن - تسجيل الخروج
                        tokenManager.clearTokens();
                        if ("TURBOPACK compile-time truthy", 1) {
                            window.location.href = "/login";
                        }
                    }
                }
            }
            // تحويل الخطأ إلى ApiError
            const apiError = createApiError(error);
            return Promise.reject(apiError);
        }
    }["createApiClient.use"]);
    return client;
};
/**
 * إنشاء ApiError من AxiosError
 */ const createApiError = (error)=>{
    if (error.response) {
        const { data, status } = error.response;
        const message = data?.message || getErrorMessage(status);
        const errors = data?.errors || [];
        return new ApiError(message, status, errors);
    }
    if (error.request) {
        return new ApiError("لا يمكن الاتصال بالخادم. تأكد من اتصالك بالإنترنت.", 0, []);
    }
    return new ApiError(error.message || "حدث خطأ غير متوقع", 0, []);
};
/**
 * الحصول على رسالة خطأ بناءً على الكود
 */ const getErrorMessage = (status)=>{
    switch(status){
        case 400:
            return "طلب غير صالح. تحقق من البيانات المدخلة.";
        case 401:
            return "غير مصرح. يرجى تسجيل الدخول مرة أخرى.";
        case 403:
            return "غير مسموح. ليس لديك صلاحية للوصول.";
        case 404:
            return "غير موجود. المورد المطلوب غير متاح.";
        case 409:
            return "تعارض. البيانات موجودة مسبقاً.";
        case 422:
            return "بيانات غير صالحة. تحقق من المدخلات.";
        case 429:
            return "طلبات كثيرة. انتظر قليلاً ثم حاول مرة أخرى.";
        case 500:
            return "خطأ في الخادم. حاول مرة أخرى لاحقاً.";
        case 502:
        case 503:
        case 504:
            return "الخدمة غير متاحة حالياً. حاول مرة أخرى لاحقاً.";
        default:
            return "حدث خطأ غير متوقع.";
    }
};
const apiClient = createApiClient();
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/api/mappers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Data Mappers - تحويل البيانات بين Frontend و Backend
 * 
 * Backend يستخدم PascalCase:
 *   - FullName, ProfileImage, AccessToken
 *   - Guid IDs
 * 
 * Frontend يستخدم camelCase:
 *   - name, avatar, token
 *   - string IDs
 */ __turbopack_context__.s([
    "mapAuthResponse",
    ()=>mapAuthResponse,
    "mapComponent",
    ()=>mapComponent,
    "mapComponentToBackend",
    ()=>mapComponentToBackend,
    "mapContact",
    ()=>mapContact,
    "mapContactFormToBackend",
    ()=>mapContactFormToBackend,
    "mapEvent",
    ()=>mapEvent,
    "mapEventFormToBackend",
    ()=>mapEventFormToBackend,
    "mapEventListItem",
    ()=>mapEventListItem,
    "mapEventStatusToNumber",
    ()=>mapEventStatusToNumber,
    "mapEventWithFullDetails",
    ()=>mapEventWithFullDetails,
    "mapEventWithSectionsToBackend",
    ()=>mapEventWithSectionsToBackend,
    "mapGroup",
    ()=>mapGroup,
    "mapGroupFormToBackend",
    ()=>mapGroupFormToBackend,
    "mapResponse",
    ()=>mapResponse,
    "mapResponseToBackendStart",
    ()=>mapResponseToBackendStart,
    "mapSectionAnswersToBackend",
    ()=>mapSectionAnswersToBackend,
    "mapSectionToBackend",
    ()=>mapSectionToBackend,
    "mapSectionWithComponents",
    ()=>mapSectionWithComponents,
    "mapUser",
    ()=>mapUser
]);
const mapAuthResponse = (backend)=>({
        user: {
            id: backend.userId,
            name: backend.fullName,
            email: backend.email,
            phone: "",
            avatar: backend.profileImage || undefined,
            createdAt: new Date().toISOString()
        },
        token: backend.accessToken,
        refreshToken: backend.refreshToken
    });
const mapUser = (backend)=>({
        id: backend.id,
        name: backend.fullName,
        email: backend.email,
        phone: backend.phone || "",
        avatar: backend.profileImage || undefined,
        createdAt: backend.createdAt
    });
const mapContact = (backend)=>({
        id: backend.id,
        userId: "",
        name: backend.name,
        email: backend.email || "",
        phone: backend.phone || "",
        company: backend.company || undefined,
        jobTitle: backend.jobTitle || undefined,
        notes: backend.notes || undefined,
        tags: backend.tags || [],
        groupIds: backend.groupIds || [],
        stats: backend.stats ? {
            eventsSent: backend.stats.eventsSent,
            eventsCompleted: backend.stats.eventsCompleted,
            responseRate: backend.stats.responseRate,
            lastInteraction: backend.stats.lastInteraction || undefined
        } : {
            eventsSent: 0,
            eventsCompleted: 0,
            responseRate: 0
        },
        createdAt: backend.createdAt,
        updatedAt: backend.updatedAt || backend.createdAt
    });
const mapGroup = (backend)=>({
        id: backend.id,
        userId: "",
        name: backend.name,
        description: backend.description || undefined,
        color: backend.color || "#1a56db",
        icon: backend.icon || undefined,
        contactIds: backend.contactIds || [],
        membersCount: backend.contactCount,
        stats: backend.stats ? {
            eventsSent: backend.stats.eventsSent,
            averageResponseRate: backend.stats.averageResponseRate,
            lastEventSent: backend.stats.lastEventSent || undefined
        } : {
            eventsSent: 0,
            averageResponseRate: 0
        },
        createdAt: backend.createdAt,
        updatedAt: backend.updatedAt || backend.createdAt
    });
/**
 * تحويل نوع الحدث من رقم إلى نص
 * Backend Enum: Survey=1, Quiz=2, Form=3, Event=4
 * Frontend Type: "survey" | "poll" | "form" | "quiz"
 */ const mapEventType = (type)=>{
    const types = {
        1: "survey",
        2: "quiz",
        3: "form",
        4: "poll"
    };
    return types[type] || "survey";
};
/**
 * تحويل حالة الحدث من رقم إلى نص
 * Backend Enum: Draft=1, Published=2, Closed=3, Archived=4
 * Frontend Status: "draft" | "active" | "archived"
 */ const mapEventStatus = (status)=>{
    const statuses = {
        1: "draft",
        2: "active",
        3: "archived",
        4: "archived"
    };
    return statuses[status] || "draft";
};
const mapEvent = (backend)=>({
        id: backend.id,
        userId: "",
        title: backend.title,
        description: backend.description || "",
        type: mapEventType(backend.type),
        status: mapEventStatus(backend.status),
        coverImage: backend.coverImage || undefined,
        shareCode: backend.shareCode || undefined,
        shareLink: backend.shareLink || `${("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable"}/e/${backend.shareCode}`,
        sections: [],
        settings: {
            sharingMethod: "public_link",
            publicLink: backend.shareLink || undefined,
            startDate: backend.startDate || undefined,
            endDate: backend.endDate || undefined,
            allowMultipleResponses: backend.allowMultipleResponses,
            requireAuth: backend.requireLogin,
            requireLogin: backend.requireLogin,
            showResults: backend.showResults,
            showProgressBar: true,
            showCorrectAnswers: backend.showCorrectAnswers,
            shuffleQuestions: backend.shuffleQuestions,
            allowAnonymous: backend.allowAnonymous,
            timeLimit: backend.timeLimitMinutes || undefined,
            passingScore: backend.passingScore || undefined
        },
        stats: {
            totalResponses: backend.responseCount,
            completedResponses: backend.responseCount,
            inProgressResponses: 0,
            completionRate: backend.responseCount > 0 ? 100 : 0,
            averageTime: 0,
            views: backend.viewCount
        },
        createdAt: backend.createdAt,
        updatedAt: backend.updatedAt || backend.createdAt,
        publishedAt: backend.status === 2 ? backend.createdAt : undefined,
        startDate: backend.startDate || undefined,
        endDate: backend.endDate || undefined
    });
const mapEventListItem = (backend)=>({
        id: backend.id,
        title: backend.title,
        description: backend.description || "",
        type: mapEventType(backend.type),
        status: mapEventStatus(backend.status),
        shareCode: backend.shareCode,
        shareLink: `${("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable"}/e/${backend.shareCode}`,
        sections: [],
        sectionsCount: backend.sectionsCount,
        componentsCount: backend.componentsCount,
        settings: {
            requireAuth: false,
            allowAnonymous: true,
            allowMultipleResponses: false,
            showProgressBar: true,
            shuffleQuestions: false
        },
        stats: {
            totalResponses: backend.responseCount,
            completedResponses: backend.responseCount,
            inProgressResponses: 0,
            completionRate: 0,
            averageTime: 0,
            views: backend.viewCount
        },
        createdAt: backend.createdAt,
        updatedAt: backend.createdAt,
        publishedAt: backend.status === 2 ? backend.createdAt : undefined,
        coverImage: backend.coverImage || undefined
    });
const mapComponentType = (type)=>{
    // أسئلة (1-14)
    if (type >= 1 && type <= 14) {
        // Rating هو component منفصل في Frontend
        if (type === 5) {
            return {
                componentType: "rating"
            };
        }
        const questionTypes = {
            1: "single_choice",
            2: "multiple_choice",
            3: "short_text",
            4: "long_text",
            // 5 = Rating (معالج أعلاه)
            6: "linear_scale",
            7: "date",
            8: "time",
            9: "number",
            10: "dropdown",
            11: "yes_no",
            12: "email",
            13: "phone",
            14: "choice_grid"
        };
        return {
            componentType: "question",
            questionType: questionTypes[type] || "short_text"
        };
    }
    // عناصر عرض (20-26)
    if (type >= 20 && type <= 26) {
        // Paragraph/Text
        if (type === 21) {
            return {
                componentType: "text"
            };
        }
        // DisplayImage
        if (type === 22) {
            return {
                componentType: "display",
                displayType: "image"
            };
        }
        // DisplayVideo
        if (type === 23) {
            return {
                componentType: "display",
                displayType: "link"
            }; // video يُعرض كـ link
        }
        // DisplayLink
        if (type === 25) {
            return {
                componentType: "display",
                displayType: "link"
            };
        }
        // DisplayPdf
        if (type === 26) {
            return {
                componentType: "display",
                displayType: "pdf"
            };
        }
        // Heading, Divider
        return {
            componentType: "text"
        };
    }
    // رفع ملفات (40-43)
    if (type === 40) return {
        componentType: "pdf_upload"
    }; // FileUpload عام → pdf_upload
    if (type === 41) return {
        componentType: "pdf_upload"
    };
    if (type === 42) return {
        componentType: "image_upload"
    };
    if (type === 43) return {
        componentType: "video_upload"
    };
    // عناصر خاصة (50-52)
    if (type === 50) return {
        componentType: "signature"
    };
    if (type === 51) return {
        componentType: "table"
    };
    if (type === 52) return {
        componentType: "link"
    };
    // Default: question مع short_text
    return {
        componentType: "question",
        questionType: "short_text"
    };
};
const mapComponent = (backend)=>{
    // Parse JSON fields
    let options = [];
    let correctAnswer = null;
    let styleData = {};
    if (backend.optionsJson) {
        try {
            options = JSON.parse(backend.optionsJson);
        } catch (e) {
            console.warn("Failed to parse optionsJson:", e);
        }
    }
    if (backend.correctAnswerJson) {
        try {
            correctAnswer = JSON.parse(backend.correctAnswerJson);
        } catch (e) {
            console.warn("Failed to parse correctAnswerJson:", e);
        }
    }
    if (backend.styleJson) {
        try {
            styleData = JSON.parse(backend.styleJson);
        } catch (e) {
            console.warn("Failed to parse styleJson:", e);
        }
    }
    // الحصول على معلومات النوع
    const typeInfo = mapComponentType(backend.type);
    // بناء Settings حسب نوع المكون
    let settings;
    switch(typeInfo.componentType){
        case "question":
            settings = {
                type: "question",
                label: backend.title || "",
                description: backend.description || "",
                questionType: typeInfo.questionType || "short_text",
                placeholder: backend.placeholder || "",
                required: backend.isRequired,
                choices: options.map((opt, index)=>({
                        id: opt.id || `choice-${index}`,
                        label: opt.label || opt.text || opt,
                        value: opt.value || opt.label || opt,
                        isCorrect: correctAnswer === opt.id || Array.isArray(correctAnswer) && correctAnswer.includes(opt.id)
                    })),
                scaleMin: backend.minValue || undefined,
                scaleMax: backend.maxValue || undefined,
                scaleMinLabel: backend.minLabel || undefined,
                scaleMaxLabel: backend.maxLabel || undefined,
                points: backend.points || undefined,
                correctAnswer: correctAnswer || undefined
            };
            break;
        case "rating":
            settings = {
                type: "rating",
                label: backend.title || "تقييم",
                description: backend.description || "",
                ratingType: styleData.ratingType || "stars",
                required: backend.isRequired,
                maxRating: backend.maxValue || 5
            };
            break;
        case "signature":
            settings = {
                type: "signature",
                label: backend.title || "التوقيع",
                description: backend.description || "",
                required: backend.isRequired,
                width: styleData.width || 500,
                height: styleData.height || 200,
                penColor: styleData.penColor || "#000000",
                penWidth: styleData.penWidth || 2
            };
            break;
        case "pdf_upload":
        case "image_upload":
        case "video_upload":
            settings = {
                type: typeInfo.componentType,
                label: backend.title || "رفع ملف",
                description: backend.description || "",
                required: backend.isRequired,
                maxFileSize: styleData.maxFileSize || 10,
                acceptedFileTypes: styleData.acceptedFileTypes || [],
                allowMultiple: styleData.allowMultiple || false,
                maxFiles: styleData.maxFiles || 1
            };
            break;
        case "table":
            // إنشاء rows array من rowCount إذا لم تكن موجودة
            const tableRowCount = styleData.rowCount || 3;
            const tableRows = styleData.rows || Array.from({
                length: tableRowCount
            }, (_, i)=>({
                    id: `row-${i}`,
                    label: `الصف ${i + 1}`
                }));
            settings = {
                type: "table",
                label: backend.title || "جدول",
                description: backend.description || "",
                tableType: styleData.tableType || "simple",
                columns: styleData.columns || [],
                rows: tableRows,
                rowCount: tableRowCount,
                tableData: styleData.tableData || {},
                calculations: styleData.calculations || [],
                enableCalculations: styleData.tableType === "calculation"
            };
            break;
        case "link":
            settings = {
                type: "link",
                label: backend.title || "رابط",
                description: backend.description || "",
                required: backend.isRequired,
                placeholder: backend.placeholder || "https://",
                validateUrl: true
            };
            break;
        case "text":
            settings = {
                type: "text",
                content: backend.description || styleData.content || "",
                fontSize: styleData.fontSize || "medium",
                textAlign: styleData.textAlign || "right",
                textColor: styleData.textColor,
                backgroundColor: styleData.backgroundColor
            };
            break;
        case "display":
            settings = {
                type: "display",
                label: backend.title || "",
                description: backend.description || "",
                displayType: typeInfo.displayType || "image",
                imageUrl: backend.mediaUrl || styleData.imageUrl,
                imageAlt: styleData.imageAlt,
                pdfUrl: backend.mediaUrl || styleData.pdfUrl,
                pdfFileName: styleData.pdfFileName,
                linkUrl: backend.mediaUrl || styleData.linkUrl,
                linkText: styleData.linkText,
                openInNewTab: styleData.openInNewTab ?? true
            };
            break;
        default:
            // Fallback to question
            settings = {
                type: "question",
                label: backend.title || "",
                description: backend.description || "",
                questionType: "short_text",
                placeholder: backend.placeholder || "",
                required: backend.isRequired
            };
    }
    return {
        id: backend.id,
        sectionId: backend.sectionId,
        type: typeInfo.componentType,
        order: backend.order,
        settings,
        createdAt: backend.createdAt,
        updatedAt: backend.updatedAt || backend.createdAt
    };
};
const mapSectionWithComponents = (backend)=>({
        id: backend.id,
        eventId: backend.eventId,
        title: backend.title,
        description: backend.description || undefined,
        order: backend.order,
        components: backend.components?.map(mapComponent) || [],
        settings: {
            visible: backend.isVisible,
            skippable: false,
            showProgress: true,
            allowBackNavigation: true
        },
        createdAt: backend.createdAt,
        updatedAt: backend.createdAt
    });
const mapEventWithFullDetails = (backend)=>({
        ...mapEvent(backend),
        sections: backend.sections?.map(mapSectionWithComponents) || []
    });
// ============================================================
// Mappers: Frontend → Backend
// ============================================================
/**
 * تحويل نوع الحدث من نص إلى رقم
 * Frontend Type: "survey" | "poll" | "form" | "quiz"
 * Backend Enum: Survey=1, Quiz=2, Form=3, Event=4
 */ const mapEventTypeToNumber = (type)=>{
    const types = {
        survey: 1,
        quiz: 2,
        form: 3,
        poll: 4
    };
    return types[type] ?? 1; // Default: Survey
};
const mapEventStatusToNumber = (status)=>{
    const statuses = {
        draft: 1,
        active: 2,
        archived: 4
    };
    return statuses[status] ?? 1; // Default: Draft
};
const mapContactFormToBackend = (data)=>({
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        company: data.company || null,
        jobTitle: data.jobTitle || null,
        notes: data.notes || null,
        tags: data.tags || [],
        groupIds: data.groupIds || []
    });
const mapGroupFormToBackend = (data)=>({
        name: data.name,
        description: data.description || null,
        color: data.color || "#1a56db",
        icon: data.icon || null,
        contactIds: data.contactIds || []
    });
const mapEventFormToBackend = (data)=>({
        title: data.title,
        description: data.description || null,
        type: mapEventTypeToNumber(data.type),
        status: mapEventStatusToNumber(data.status),
        coverImage: data.coverImage || null,
        requireLogin: data.settings?.requireAuth || data.settings?.requireLogin || false,
        allowAnonymous: data.settings?.allowAnonymous ?? true,
        allowMultipleResponses: data.settings?.allowMultipleResponses || false,
        showResults: data.settings?.showResults || false,
        showCorrectAnswers: data.settings?.showCorrectAnswers || false,
        shuffleQuestions: data.settings?.shuffleQuestions || false,
        timeLimitMinutes: data.settings?.timeLimit || null,
        passingScore: data.settings?.passingScore || null,
        startDate: data.settings?.startDate || null,
        endDate: data.settings?.endDate || null
    });
/**
 * تحويل نوع السؤال من نص إلى رقم
 * Frontend QuestionType → Backend ComponentType Enum
 *
 * Backend Enum الجديد:
 * - SingleChoice=1, MultipleChoice=2, ShortText=3, LongText=4, Rating=5
 * - LinearScale=6, Date=7, Time=8, Number=9, Dropdown=10, YesNo=11
 * - Email=12, Phone=13, ChoiceGrid=14
 */ const mapQuestionTypeToNumber = (questionType)=>{
    const types = {
        "single_choice": 1,
        "multiple_choice": 2,
        "short_text": 3,
        "long_text": 4,
        // Rating handled separately as component type
        "linear_scale": 6,
        "date": 7,
        "time": 8,
        "number": 9,
        "dropdown": 10,
        "yes_no": 11,
        "email": 12,
        "phone": 13,
        "choice_grid": 14
    };
    return types[questionType] || 3; // Default to short_text
};
/**
 * تحويل نوع المكون (Component Type) من Frontend إلى Backend
 * يشمل جميع أنواع المكونات وليس فقط الأسئلة
 */ const mapComponentTypeToNumber = (component)=>{
    const settings = component.settings;
    switch(component.type){
        case "question":
            return mapQuestionTypeToNumber(settings.questionType || "short_text");
        case "rating":
            return 5; // Rating = 5
        case "pdf_upload":
            return 41; // PdfUpload = 41
        case "image_upload":
            return 42; // ImageUpload = 42
        case "video_upload":
            return 43; // VideoUpload = 43
        case "signature":
            return 50; // Signature = 50
        case "table":
            return 51; // Table = 51
        case "link":
            return 52; // Link = 52
        case "text":
            return 21; // Paragraph = 21
        case "display":
            // Display type depends on displayType setting
            const displayType = settings.displayType;
            if (displayType === "image") return 22; // DisplayImage = 22
            if (displayType === "pdf") return 26; // DisplayPdf = 26
            if (displayType === "link") return 25; // DisplayLink = 25
            return 22; // Default to DisplayImage
        default:
            return 3; // Default to ShortText
    }
};
const mapComponentToBackend = (component, order)=>{
    const settings = component.settings;
    // القيم الأساسية المشتركة
    let optionsJson = null;
    let correctAnswerJson = null;
    let styleJson = null;
    let mediaUrl = null;
    let mediaType = null;
    let minValue = null;
    let maxValue = null;
    // معالجة حسب نوع المكون
    switch(component.type){
        case "question":
            // تحويل الخيارات
            if (settings.choices && settings.choices.length > 0) {
                optionsJson = JSON.stringify(settings.choices.map((c)=>({
                        id: c.id,
                        label: c.label,
                        value: c.value
                    })));
            }
            // تحويل الإجابة الصحيحة
            if (settings.correctAnswer !== undefined) {
                correctAnswerJson = JSON.stringify(settings.correctAnswer);
            }
            // للمقياس الخطي
            minValue = settings.scaleMin || null;
            maxValue = settings.scaleMax || null;
            break;
        case "rating":
            maxValue = settings.maxRating || 5;
            styleJson = JSON.stringify({
                ratingType: settings.ratingType || "stars",
                emojiSet: settings.emojiSet
            });
            break;
        case "signature":
            styleJson = JSON.stringify({
                width: settings.width || 500,
                height: settings.height || 200,
                penColor: settings.penColor || "#000000",
                penWidth: settings.penWidth || 2
            });
            break;
        case "pdf_upload":
        case "image_upload":
        case "video_upload":
            styleJson = JSON.stringify({
                maxFileSize: settings.maxFileSize || 10,
                acceptedFileTypes: settings.acceptedFileTypes || [],
                allowMultiple: settings.allowMultiple || false,
                maxFiles: settings.maxFiles || 1
            });
            break;
        case "table":
            styleJson = JSON.stringify({
                tableType: settings.tableType || "simple",
                columns: settings.columns || [],
                rowCount: settings.rowCount || 3,
                tableData: settings.tableData || {},
                calculations: settings.calculations || []
            });
            break;
        case "link":
            styleJson = JSON.stringify({
                validateUrl: settings.validateUrl ?? true
            });
            break;
        case "text":
            styleJson = JSON.stringify({
                content: settings.content || "",
                fontSize: settings.fontSize || "medium",
                textAlign: settings.textAlign || "right",
                textColor: settings.textColor,
                backgroundColor: settings.backgroundColor
            });
            break;
        case "display":
            mediaUrl = settings.imageUrl || settings.pdfUrl || settings.linkUrl || null;
            mediaType = settings.displayType || "image";
            styleJson = JSON.stringify({
                displayType: settings.displayType,
                imageUrl: settings.imageUrl,
                imageAlt: settings.imageAlt,
                pdfUrl: settings.pdfUrl,
                pdfFileName: settings.pdfFileName,
                linkUrl: settings.linkUrl,
                linkText: settings.linkText,
                openInNewTab: settings.openInNewTab
            });
            break;
    }
    return {
        type: mapComponentTypeToNumber(component),
        order: order,
        title: settings.label || settings.content?.substring(0, 100) || null,
        description: settings.description || null,
        placeholder: settings.placeholder || null,
        isRequired: settings.required || false,
        isVisible: true,
        optionsJson: optionsJson,
        validationJson: null,
        correctAnswerJson: correctAnswerJson,
        points: settings.points || null,
        explanation: null,
        minValue: minValue,
        maxValue: maxValue,
        minLabel: settings.scaleMinLabel || settings.minLabel || null,
        maxLabel: settings.scaleMaxLabel || settings.maxLabel || null,
        mediaUrl: mediaUrl,
        mediaType: mediaType,
        styleJson: styleJson
    };
};
const mapSectionToBackend = (section, order)=>({
        title: section.title,
        description: section.description || null,
        order: order,
        isVisible: section.settings?.visible ?? true,
        components: section.components?.map((comp, idx)=>mapComponentToBackend(comp, idx)) || []
    });
const mapEventWithSectionsToBackend = (event)=>({
        title: event.title,
        description: event.description || null,
        type: mapEventTypeToNumber(event.type),
        coverImage: event.coverImage || null,
        themeColor: event.settings?.themeColor || null,
        language: event.settings?.language || "ar",
        startDate: event.startDate || null,
        endDate: event.endDate || null,
        timeLimitMinutes: event.settings?.timeLimit || null,
        requireLogin: event.settings?.requireAuth || event.settings?.requireLogin || false,
        allowAnonymous: event.settings?.allowAnonymous ?? true,
        maxResponses: event.settings?.maxResponses || null,
        allowMultipleResponses: event.settings?.allowMultipleResponses || false,
        showResults: event.settings?.showResults || false,
        showCorrectAnswers: event.settings?.showCorrectAnswers || false,
        shuffleQuestions: event.settings?.shuffleQuestions || false,
        shuffleOptions: event.settings?.shuffleOptions || false,
        passingScore: event.settings?.passingScore || null,
        sections: event.sections?.map((section, idx)=>mapSectionToBackend(section, idx)) || []
    });
/**
 * تحويل حالة الرد من رقم إلى نص
 * Backend Enum: Started=1, InProgress=2, Completed=3, Abandoned=4
 */ const mapResponseStatus = (status)=>{
    const statuses = {
        1: "in_progress",
        2: "in_progress",
        3: "completed",
        4: "abandoned"
    };
    return statuses[status] || "in_progress";
};
const mapResponse = (backend)=>{
    // Parse answers from JSON
    let answers = [];
    if (backend.answersJson) {
        try {
            const parsedAnswers = JSON.parse(backend.answersJson);
            // Transform from object { componentId: answer } to array
            if (typeof parsedAnswers === "object" && !Array.isArray(parsedAnswers)) {
                answers = Object.entries(parsedAnswers).map(([componentId, answer])=>{
                    // Parse the answer if it's a JSON string (double-encoded from backend)
                    let parsedAnswer = answer;
                    if (typeof answer === "string") {
                        try {
                            parsedAnswer = JSON.parse(answer);
                        } catch  {
                            // Not JSON, keep as string (for simple text answers)
                            parsedAnswer = answer;
                        }
                    }
                    return {
                        componentId,
                        componentType: "unknown",
                        answer: parsedAnswer,
                        timeSpent: 0,
                        answeredAt: backend.createdAt
                    };
                });
            } else if (Array.isArray(parsedAnswers)) {
                answers = parsedAnswers;
            }
        } catch (e) {
            console.warn("Failed to parse answersJson:", e);
        }
    }
    // Build participant info
    const participant = {
        name: backend.respondentName || undefined,
        email: backend.respondentEmail || undefined,
        phone: backend.respondentPhone || undefined
    };
    // Build score if available
    const score = backend.score !== null && backend.totalPoints !== null ? {
        totalPoints: backend.totalPoints,
        earnedPoints: backend.score,
        percentage: backend.percentage || 0,
        passed: backend.isPassed || false
    } : undefined;
    // Calculate time spent
    const timeSpent = backend.durationSeconds || 0;
    return {
        id: backend.id,
        eventId: backend.eventId,
        participant,
        answers,
        status: mapResponseStatus(backend.status),
        timeSpent,
        score,
        progress: backend.status === 3 ? 100 : backend.currentSectionIndex * 10,
        metadata: {
            device: "desktop",
            browser: "Unknown",
            os: "Unknown",
            language: "ar",
            sessionId: backend.id
        },
        startedAt: backend.startedAt,
        completedAt: backend.completedAt || undefined,
        lastUpdatedAt: backend.completedAt || backend.startedAt
    };
};
const mapSectionAnswersToBackend = (answers)=>{
    return answers.map((answer)=>({
            componentId: answer.componentId,
            answerJson: JSON.stringify(answer.answer)
        }));
};
const mapResponseToBackendStart = (participantInfo)=>({
        respondentName: participantInfo?.name || null,
        respondentEmail: participantInfo?.email || null,
        respondentPhone: participantInfo?.phone || null
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/api/services/authService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Auth Service - خدمة المصادقة
 * الاتصال بـ Backend API للمصادقة
 */ __turbopack_context__.s([
    "authService",
    ()=>authService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
const authService = {
    /**
   * تسجيل الدخول
   */ login: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Auth/login", {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe || false
        });
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل تسجيل الدخول");
        }
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapAuthResponse"])(response.data.data);
        // حفظ التوكنات
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenManager"].setTokens(result.token, result.refreshToken);
        return result;
    },
    /**
   * إنشاء حساب جديد
   */ register: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Auth/register", {
            fullName: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phone: data.phone || null
        });
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إنشاء الحساب");
        }
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapAuthResponse"])(response.data.data);
        // حفظ التوكنات
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenManager"].setTokens(result.token, result.refreshToken);
        return result;
    },
    /**
   * تسجيل الخروج
   */ logout: async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Auth/logout");
        } finally{
            // مسح التوكنات في جميع الحالات
            __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenManager"].clearTokens();
        }
    },
    /**
   * الحصول على بيانات المستخدم الحالي
   */ getCurrentUser: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/Auth/me");
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل جلب بيانات المستخدم");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapUser"])(response.data.data);
    },
    /**
   * تحديث الملف الشخصي
   */ updateProfile: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put("/Auth/profile", {
            fullName: data.name,
            phone: data.phone || null,
            profileImage: data.avatar || null
        });
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل تحديث الملف الشخصي");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapUser"])(response.data.data);
    },
    /**
   * تغيير كلمة المرور
   */ changePassword: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Auth/change-password", data);
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل تغيير كلمة المرور");
        }
    },
    /**
   * نسيت كلمة المرور
   */ forgotPassword: async (email)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Auth/forgot-password", {
            email
        });
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل إرسال رابط استعادة كلمة المرور");
        }
    },
    /**
   * إعادة تعيين كلمة المرور
   */ resetPassword: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Auth/reset-password", data);
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل إعادة تعيين كلمة المرور");
        }
    },
    /**
   * التحقق من صحة التوكن
   */ verifyToken: async ()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenManager"].hasValidToken()) {
            return false;
        }
        try {
            await authService.getCurrentUser();
            return true;
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenManager"].clearTokens();
            return false;
        }
    }
};
const __TURBOPACK__default__export__ = authService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/api/services/eventsService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Events Service - خدمة الأحداث
 * الاتصال بـ Backend API للأحداث
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "eventsService",
    ()=>eventsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
const eventsService = {
    /**
   * جلب جميع الأحداث (مع Pagination)
   * Backend يُرجع PagedResult<EventListItemDto>
   */ getAll: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/Events");
        console.log("📡 API Response:", response.data);
        console.log("📡 API Response - items:", response.data.data?.items);
        // Log ALL properties of first item to see the actual property names
        if (response.data.data?.items?.[0]) {
            console.log("📡 First item ALL KEYS:", Object.keys(response.data.data.items[0]));
            console.log("📡 First item RAW:", JSON.stringify(response.data.data.items[0], null, 2));
        }
        // Log each item's title specifically
        response.data.data?.items?.forEach((item, index)=>{
            console.log(`📡 Item ${index} - title:`, item.title, "| type:", typeof item.title);
            // Also try Title (PascalCase)
            console.log(`📡 Item ${index} - Title (PascalCase):`, item.Title);
        });
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل جلب الأحداث");
        }
        // استخراج الـ items من الاستجابة المُرقّمة
        const events = response.data.data.items.map(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventListItem"]);
        console.log("📋 Mapped Events:", events);
        // Log each mapped event's title
        events.forEach((event, index)=>{
            console.log(`📋 Mapped Event ${index} - title:`, event.title, "| type:", typeof event.title);
        });
        return events;
    },
    /**
   * جلب حدث بواسطة ID
   */ getById: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Events/${id}`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "الحدث غير موجود");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEvent"])(response.data.data);
    },
    /**
   * جلب حدث مع التفاصيل الكاملة (sections و components)
   */ getFullDetails: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Events/${id}/full`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "الحدث غير موجود");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventWithFullDetails"])(response.data.data);
    },
    /**
   * جلب حدث بواسطة رمز المشاركة (Public - لا يحتاج تسجيل دخول)
   * يُرجع الحدث مع التفاصيل الكاملة (sections و components)
   */ getByShareCode: async (shareCode)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Public/events/${shareCode}`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "الحدث غير موجود");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventWithFullDetails"])(response.data.data);
    },
    /**
   * جلب حدث للمعاينة (Public - لا يحتاج تسجيل دخول - بدون التحقق من الحالة)
   * يُرجع الحدث مع التفاصيل الكاملة (sections و components)
   */ getForPreview: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Public/events/${id}/preview`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "الحدث غير موجود");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventWithFullDetails"])(response.data.data);
    },
    /**
   * جلب الأحداث حسب الحالة
   * Backend Enum: Draft=1, Published=2, Closed=3, Archived=4
   * Backend يُرجع List<EventListItemDto>
   */ getByStatus: async (status)=>{
        const statusNumber = {
            draft: 1,
            active: 2,
            archived: 4
        }[status];
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Events/by-status/${statusNumber}`);
        if (!response.data.success || !response.data.data) {
            return [];
        }
        return response.data.data.map(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventListItem"]);
    },
    /**
   * جلب الأحداث حسب النوع
   * Backend Enum: Survey=1, Quiz=2, Form=3, Event=4
   * Backend يُرجع List<EventListItemDto>
   */ getByType: async (type)=>{
        const typeNumber = {
            survey: 1,
            quiz: 2,
            form: 3,
            poll: 4
        }[type];
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Events/by-type/${typeNumber}`);
        if (!response.data.success || !response.data.data) {
            return [];
        }
        return response.data.data.map(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventListItem"]);
    },
    /**
   * إنشاء حدث جديد (بدون أقسام)
   */ create: async (data)=>{
        console.log("🔵 Creating event with data:", data);
        const backendData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventFormToBackend"])(data);
        console.log("🔵 Backend data:", backendData);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Events", backendData);
        console.log("🔵 API Response:", response.data);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إنشاء الحدث");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEvent"])(response.data.data);
    },
    /**
   * إنشاء حدث كامل مع الأقسام والمكونات
   * يُستخدم عند حفظ الحدث من Event Builder
   */ createWithSections: async (event)=>{
        console.log("🔵 Creating event with sections:", event);
        const backendData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventWithSectionsToBackend"])(event);
        console.log("🔵 Backend data with sections:", backendData);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Events/with-sections", backendData);
        console.log("🔵 API Response:", response.data);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إنشاء الحدث");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventWithFullDetails"])(response.data.data);
    },
    /**
   * تحديث حدث
   */ update: async (id, data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/Events/${id}`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventFormToBackend"])(data));
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل تحديث الحدث");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEvent"])(response.data.data);
    },
    /**
   * تحديث حالة الحدث فقط (بدون تغيير البيانات الأخرى)
   */ updateStatus: async (id, status)=>{
        const statusNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventStatusToNumber"])(status);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/Events/${id}/status`, {
            status: statusNumber
        });
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل تحديث حالة الحدث");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEvent"])(response.data.data);
    },
    /**
   * حذف حدث
   */ delete: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/Events/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل حذف الحدث");
        }
    },
    /**
   * نشر حدث
   */ publish: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Events/${id}/publish`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل نشر الحدث");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEvent"])(response.data.data);
    },
    /**
   * إغلاق حدث (تحويل إلى مسودة)
   */ close: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Events/${id}/close`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إغلاق الحدث");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEvent"])(response.data.data);
    },
    /**
   * نسخ حدث
   */ duplicate: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Events/${id}/duplicate`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل نسخ الحدث");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEvent"])(response.data.data);
    },
    /**
   * إرسال حدث لجهات الاتصال
   */ send: async (id, data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Events/${id}/send`, {
            contactIds: data.contactIds || [],
            groupIds: data.groupIds || [],
            sendMethod: data.sendMethod === "email" ? 0 : data.sendMethod === "sms" ? 1 : 2,
            customMessage: data.customMessage || null
        });
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إرسال الحدث");
        }
        return response.data.data;
    },
    /**
   * إرسال تذكير
   */ sendReminder: async (id, contactIds)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Events/${id}/send-reminder`, {
            contactIds
        });
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إرسال التذكير");
        }
        return response.data.data;
    },
    /**
   * جلب سجل الإرسال
   */ getSendHistory: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Events/${id}/send-history`);
        if (!response.data.success || !response.data.data) {
            return [];
        }
        return response.data.data.map((item)=>({
                ...item,
                openedAt: item.openedAt || undefined,
                respondedAt: item.respondedAt || undefined
            }));
    },
    /**
   * زيادة عدد مشاهدات الحدث (Public - لا يحتاج تسجيل دخول)
   */ incrementViewCount: async (eventId)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Public/events/${eventId}/view`);
        } catch (error) {
            // لا نريد إيقاف تحميل الصفحة إذا فشل تسجيل المشاهدة
            console.warn("Failed to increment view count:", error);
        }
    },
    /**
   * جلب إحصائيات لوحة التحكم
   */ getDashboardStats: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/Events/dashboard-stats");
            if (!response.data.success || !response.data.data) {
                return null;
            }
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch dashboard stats:", error);
            return null;
        }
    }
};
const __TURBOPACK__default__export__ = eventsService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/pdf-export.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultPDFConfig",
    ()=>defaultPDFConfig,
    "exportCustomTablesPDF",
    ()=>exportCustomTablesPDF,
    "exportSeparateTablesPDF",
    ()=>exportSeparateTablesPDF,
    "exportSingleTablePDF",
    ()=>exportSingleTablePDF,
    "formatAnswer",
    ()=>formatAnswer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/html2canvas/dist/html2canvas.js [app-client] (ecmascript)");
"use client";
;
;
const defaultPDFConfig = {
    layout: "single-table",
    backgroundColor: "#ffffff",
    backgroundImage: undefined,
    headerColor: "#1a56db",
    textColor: "#1f2937",
    fontSize: 10,
    fontFamily: "Arial",
    includeParticipantName: true,
    includeParticipationDate: true,
    includeTextAnswers: true,
    includeChoices: true,
    includeRatings: true,
    includeSignatures: true,
    includeEventTitle: true,
    includeExportDate: true,
    includeParticipantCount: true,
    selectedComponentIds: undefined,
    includeSerialNumber: false,
    customTables: [],
    useCustomTables: false
};
const formatAnswer = (answer, component, config)=>{
    const questionType = component.settings?.questionType || component.type;
    // Skip file uploads (images, PDFs, videos)
    if ([
        "pdf_upload",
        "image_upload",
        "video_upload"
    ].includes(component.type)) {
        return "[ملف مرفق - غير مضمن في PDF]";
    }
    // Handle signature separately (will be added as image)
    if (component.type === "signature") {
        return "[توقيع - انظر الصورة]";
    }
    // Text answers
    if (config.includeTextAnswers && [
        "short_text",
        "long_text",
        "email",
        "phone",
        "number",
        "url"
    ].includes(questionType)) {
        return String(answer.answer || "لا توجد إجابة");
    }
    // Choices
    if (config.includeChoices) {
        if (questionType === "single_choice" || questionType === "yes_no" || questionType === "dropdown") {
            return String(answer.answer || "لا توجد إجابة");
        }
        if (questionType === "multiple_choice") {
            const choices = Array.isArray(answer.answer) ? answer.answer : [
                answer.answer
            ];
            return choices.join("، ") || "لا توجد إجابة";
        }
    }
    // Ratings
    if (config.includeRatings && component.type === "rating") {
        const rating = answer.answer || 0;
        const maxRating = component.settings?.maxRating || 5;
        return `${rating}/${maxRating}`;
    }
    // Date and Time
    if (questionType === "date" || questionType === "time") {
        return String(answer.answer || "لا توجد إجابة");
    }
    // Linear Scale
    if (questionType === "linear_scale") {
        const value = answer.answer || 0;
        const min = component.settings?.minValue || 1;
        const max = component.settings?.maxValue || 10;
        return `${value} (من ${min} إلى ${max})`;
    }
    // Table
    if (component.type === "table") {
        return "[بيانات جدول - غير مضمن]";
    }
    return String(answer.answer || "لا توجد إجابة");
};
/**
 * Helper function to add custom text overlays to a container
 * v3.0: Custom Text Overlay feature (Phase 6)
 *
 * @param container - The HTML container element
 * @param overlays - Array of custom text overlays
 * @param fontFamily - Default font family from settings
 */ const addCustomTextOverlays = (container, overlays, fontFamily)=>{
    if (!overlays || overlays.length === 0) {
        return;
    }
    // Filter visible overlays
    const visibleOverlays = overlays.filter((overlay)=>overlay.visible !== false);
    if (visibleOverlays.length === 0) {
        return;
    }
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
        overlayDiv.style.fontFamily = overlay.fontFamily || fontFamily;
        overlayDiv.style.direction = 'rtl';
        overlayDiv.style.unicodeBidi = 'embed';
        overlayDiv.style.whiteSpace = 'pre-wrap';
        overlayDiv.style.lineHeight = '1.6';
        overlayDiv.style.zIndex = (overlay.zIndex || 0).toString();
        // v9.1: Arabic text rendering fixes
        overlayDiv.style.setProperty('text-rendering', 'optimizeLegibility');
        overlayDiv.style.setProperty('-webkit-font-smoothing', 'antialiased');
        overlayDiv.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
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
};
const exportSingleTablePDF = async (eventTitle, responses, components, config)=>{
    // Create temporary container for HTML rendering
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "2000px"; // Increased width for better table layout
    container.style.padding = "30px";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.direction = "rtl";
    container.style.backgroundColor = config.backgroundColor;
    // Build HTML content
    let htmlContent = "";
    // If background image is used, create a wrapper with background
    if (config.backgroundImage) {
        htmlContent += `
      <div style="
        background-image: url(${config.backgroundImage});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding: 40px;
        min-height: 100%;
      ">
        <div style="
          background-color: rgba(255, 255, 255, 0.96);
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        ">
    `;
    }
    // Add logo if provided
    if (config.logo) {
        const logoSize = config.logo.size === "small" ? "80px" : config.logo.size === "medium" ? "120px" : "160px";
        const logoPosition = config.logo.position === "center" ? "center" : config.logo.position === "top-right" ? "flex-end" : "flex-start";
        htmlContent += `
      <div style="display: flex; justify-content: ${logoPosition}; margin-bottom: 20px;">
        <img src="${config.logo.data}" style="width: ${logoSize}; height: ${logoSize}; object-fit: contain;" />
      </div>
    `;
    }
    // Add header section
    htmlContent += `<div style="text-align: center; margin-bottom: 30px;">`;
    if (config.includeEventTitle) {
        htmlContent += `<h1 style="color: ${config.headerColor}; font-size: 32px; margin-bottom: 10px; font-weight: bold;">${eventTitle}</h1>`;
    }
    if (config.includeExportDate) {
        const exportDate = new Date().toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        htmlContent += `<p style="color: ${config.textColor}; font-size: 14px; margin: 5px 0;">تاريخ التصدير: ${exportDate}</p>`;
    }
    if (config.includeParticipantCount) {
        htmlContent += `<p style="color: ${config.textColor}; font-size: 14px; margin: 5px 0;">عدد المشاركين: ${responses.length}</p>`;
    }
    htmlContent += `</div>`;
    // Prepare table data - filter by selected components if specified
    let questionComponents = components.filter((c)=>c.type === "question" || c.type === "rating");
    // Filter by selected component IDs if specified
    if (config.selectedComponentIds && config.selectedComponentIds.length > 0) {
        questionComponents = questionComponents.filter((c)=>config.selectedComponentIds.includes(c.id));
    }
    // Calculate column widths dynamically
    const baseColumns = [];
    if (config.includeSerialNumber) baseColumns.push("#");
    if (config.includeParticipantName) baseColumns.push("المشارك");
    if (config.includeParticipationDate) baseColumns.push("التاريخ");
    const baseColumnWidth = baseColumns.length > 0 ? "120px" : "0px";
    const serialColumnWidth = "60px";
    const questionColumnWidth = questionComponents.length > 0 ? `${Math.max(100, 800 / questionComponents.length)}px` : "0px";
    // Build table with optimized styling
    htmlContent += `
    <div style="overflow-x: auto; width: 100%;">
      <table style="
        width: 100%;
        border-collapse: collapse;
        font-size: ${Math.max(10, config.fontSize - 2)}px;
        table-layout: fixed;
      ">
        <thead>
          <tr style="background-color: ${config.headerColor}; color: white;">
  `;
    // Add serial number column header
    if (config.includeSerialNumber) {
        htmlContent += `
      <th style="
        padding: 8px 6px;
        border: 1px solid #ddd;
        text-align: center;
        font-weight: bold;
        width: ${serialColumnWidth};
        min-width: 50px;
        word-wrap: break-word;
      ">#</th>
    `;
    }
    // Add base column headers
    if (config.includeParticipantName) {
        htmlContent += `
      <th style="
        padding: 8px 6px;
        border: 1px solid #ddd;
        text-align: center;
        font-weight: bold;
        width: ${baseColumnWidth};
        min-width: 100px;
        word-wrap: break-word;
      ">المشارك</th>
    `;
    }
    if (config.includeParticipationDate) {
        htmlContent += `
      <th style="
        padding: 8px 6px;
        border: 1px solid #ddd;
        text-align: center;
        font-weight: bold;
        width: ${baseColumnWidth};
        min-width: 100px;
        word-wrap: break-word;
      ">التاريخ</th>
    `;
    }
    // Add question headers with truncation
    questionComponents.forEach((component)=>{
        const label = component.settings?.label || "سؤال";
        const truncatedLabel = label.length > 30 ? label.substring(0, 27) + "..." : label;
        htmlContent += `
      <th style="
        padding: 8px 6px;
        border: 1px solid #ddd;
        text-align: center;
        font-weight: bold;
        width: ${questionColumnWidth};
        min-width: 80px;
        word-wrap: break-word;
        font-size: ${Math.max(9, config.fontSize - 3)}px;
      " title="${label}">
        ${truncatedLabel}
      </th>
    `;
    });
    htmlContent += `
          </tr>
        </thead>
        <tbody>
  `;
    // Add rows with optimized styling
    responses.forEach((response, index)=>{
        const rowBg = index % 2 === 0 ? "#f9fafb" : "white";
        htmlContent += `<tr style="background-color: ${rowBg};">`;
        // Serial number
        if (config.includeSerialNumber) {
            htmlContent += `
        <td style="
          padding: 6px 4px;
          border: 1px solid #ddd;
          text-align: center;
          color: ${config.textColor};
          font-weight: bold;
          word-wrap: break-word;
        ">${index + 1}</td>
      `;
        }
        // Participant name
        if (config.includeParticipantName) {
            const name = response.participant?.name || "مشارك مجهول";
            htmlContent += `
        <td style="
          padding: 6px 4px;
          border: 1px solid #ddd;
          text-align: center;
          color: ${config.textColor};
          word-wrap: break-word;
          overflow: hidden;
        ">${name}</td>
      `;
        }
        // Participation date
        if (config.includeParticipationDate) {
            const date = new Date(response.submittedAt || response.completedAt || new Date()).toLocaleDateString("ar-EG", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit"
            });
            htmlContent += `
        <td style="
          padding: 6px 4px;
          border: 1px solid #ddd;
          text-align: center;
          color: ${config.textColor};
          word-wrap: break-word;
        ">${date}</td>
      `;
        }
        // Add answers with truncation
        questionComponents.forEach((component)=>{
            const answer = response.answers.find((a)=>a.componentId === component.id);
            let answerText = answer ? formatAnswer(answer, component, config) : "لا توجد إجابة";
            // Truncate long answers
            if (answerText.length > 50) {
                answerText = answerText.substring(0, 47) + "...";
            }
            htmlContent += `
        <td style="
          padding: 6px 4px;
          border: 1px solid #ddd;
          text-align: center;
          color: ${config.textColor};
          word-wrap: break-word;
          overflow: hidden;
          font-size: ${Math.max(9, config.fontSize - 3)}px;
        " title="${answer ? formatAnswer(answer, component, config) : 'لا توجد إجابة'}">
          ${answerText}
        </td>
      `;
        });
        htmlContent += `</tr>`;
    });
    htmlContent += `
        </tbody>
      </table>
    </div>
  `;
    // Add custom footer
    if (config.customFooter) {
        htmlContent += `
      <div style="text-align: center; margin-top: 30px; color: ${config.textColor}; font-size: 12px;">
        ${config.customFooter}
      </div>
    `;
    }
    // Close wrappers if background image is used
    if (config.backgroundImage) {
        htmlContent += `
        </div>
      </div>
    `;
    }
    container.innerHTML = htmlContent;
    document.body.appendChild(container);
    try {
        // Convert HTML to canvas
        const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(container, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: null
        });
        // Create PDF
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
            orientation: "landscape",
            unit: "mm",
            format: "a4"
        });
        // A4 landscape dimensions in mm
        const pageWidth = 297;
        const pageHeight = 210;
        // Calculate how the canvas fits into PDF pages
        const imgHeight = canvas.height * pageWidth / canvas.width;
        // Calculate number of pages needed
        const totalPages = Math.ceil(imgHeight / pageHeight);
        // Add pages to PDF
        for(let page = 0; page < totalPages; page++){
            if (page > 0) {
                doc.addPage();
            }
            // Calculate the portion of canvas for this page
            const sourceY = page * pageHeight * canvas.width / pageWidth;
            const sourceHeight = Math.min(pageHeight * canvas.width / pageWidth, canvas.height - sourceY);
            // Only add page if there's actual content
            if (sourceHeight > 0) {
                // Create temporary canvas for this page
                const pageCanvas = document.createElement("canvas");
                pageCanvas.width = canvas.width;
                pageCanvas.height = sourceHeight;
                const ctx = pageCanvas.getContext("2d");
                if (ctx) {
                    // Draw the portion of the original canvas
                    ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
                    // Convert to image and add to PDF
                    const pageImgData = pageCanvas.toDataURL("image/png");
                    const pageImgHeight = sourceHeight * pageWidth / canvas.width;
                    doc.addImage(pageImgData, "PNG", 0, 0, pageWidth, pageImgHeight);
                }
            }
        }
        // Save PDF
        const fileName = `${eventTitle.replace(/\s+/g, "-")}-results-${new Date().toISOString().split("T")[0]}.pdf`;
        doc.save(fileName);
    } finally{
        // Clean up
        document.body.removeChild(container);
    }
};
const exportSeparateTablesPDF = async (eventTitle, responses, components, config)=>{
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });
    for(let i = 0; i < responses.length; i++){
        const response = responses[i];
        if (i > 0) {
            doc.addPage();
        }
        // Create temporary container for HTML rendering
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "0";
        container.style.width = "800px";
        container.style.padding = "40px";
        container.style.fontFamily = "Arial, sans-serif";
        container.style.direction = "rtl";
        container.style.backgroundColor = config.backgroundColor;
        // Build HTML content
        let htmlContent = "";
        // If background image is used, create a wrapper with background
        if (config.backgroundImage) {
            htmlContent += `
        <div style="
          background-image: url(${config.backgroundImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 40px;
          min-height: 100%;
        ">
          <div style="
            background-color: rgba(255, 255, 255, 0.96);
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          ">
      `;
        }
        // Add logo if provided
        if (config.logo) {
            const logoSize = config.logo.size === "small" ? "60px" : config.logo.size === "medium" ? "90px" : "120px";
            const logoPosition = config.logo.position === "center" ? "center" : config.logo.position === "top-right" ? "flex-end" : "flex-start";
            htmlContent += `
        <div style="display: flex; justify-content: ${logoPosition}; margin-bottom: 20px;">
          <img src="${config.logo.data}" style="width: ${logoSize}; height: ${logoSize}; object-fit: contain;" />
        </div>
      `;
        }
        // Add event title
        if (config.includeEventTitle) {
            htmlContent += `
        <h1 style="color: ${config.headerColor}; font-size: 28px; text-align: center; margin-bottom: 20px; font-weight: bold;">
          ${eventTitle}
        </h1>
      `;
        }
        // Add participant info
        if (config.includeParticipantName) {
            htmlContent += `
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: ${config.textColor}; font-size: 16px; margin: 5px 0; font-weight: bold;">
            المشارك: ${response.participant?.name || "مشارك مجهول"}
          </p>
      `;
            if (config.includeParticipationDate) {
                const date = new Date(response.submittedAt || response.completedAt || new Date()).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                htmlContent += `
          <p style="color: ${config.textColor}; font-size: 14px; margin: 5px 0;">
            تاريخ المشاركة: ${date}
          </p>
        `;
            }
            htmlContent += `</div>`;
        }
        // Build table
        htmlContent += `
      <table style="width: 100%; border-collapse: collapse; font-size: ${config.fontSize}px;">
        <tbody>
    `;
        // Filter components by selected IDs if specified
        let filteredComponents = components.filter((c)=>c.type === "question" || c.type === "rating");
        if (config.selectedComponentIds && config.selectedComponentIds.length > 0) {
            filteredComponents = filteredComponents.filter((c)=>config.selectedComponentIds.includes(c.id));
        }
        // Add rows
        filteredComponents.forEach((component, index)=>{
            const answer = response.answers.find((a)=>a.componentId === component.id);
            const questionLabel = component.settings?.label || "سؤال";
            const answerText = answer ? formatAnswer(answer, component, config) : "لا توجد إجابة";
            const rowBg = index % 2 === 0 ? "#f9fafb" : "white";
            htmlContent += `
        <tr style="background-color: ${rowBg};">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: ${config.textColor}; width: 40%;">
            ${questionLabel}
          </td>
          <td style="padding: 12px; border: 1px solid #ddd; color: ${config.textColor}; width: 60%;">
            ${answerText}
          </td>
        </tr>
      `;
        });
        htmlContent += `
        </tbody>
      </table>
    `;
        // Add signatures if included
        if (config.includeSignatures) {
            const signatureComponents = components.filter((c)=>c.type === "signature");
            signatureComponents.forEach((component)=>{
                const answer = response.answers.find((a)=>a.componentId === component.id);
                if (answer && typeof answer.answer === 'object' && answer.answer !== null && 'signatureData' in answer.answer) {
                    const signatureData = answer.answer.signatureData;
                    if (signatureData) {
                        htmlContent += `
              <div style="margin-top: 30px;">
                <p style="color: ${config.textColor}; font-size: 14px; font-weight: bold; margin-bottom: 10px;">التوقيع:</p>
                <img src="${signatureData}" style="border: 1px solid #ddd; padding: 10px; background: white; max-width: 300px;" />
              </div>
            `;
                    }
                }
            });
        }
        // Add custom footer
        if (config.customFooter && i === responses.length - 1) {
            htmlContent += `
        <div style="text-align: center; margin-top: 30px; color: ${config.textColor}; font-size: 12px;">
          ${config.customFooter}
        </div>
      `;
        }
        // Close wrappers if background image is used
        if (config.backgroundImage) {
            htmlContent += `
          </div>
        </div>
      `;
        }
        container.innerHTML = htmlContent;
        document.body.appendChild(container);
        try {
            // Convert HTML to canvas
            const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(container, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: null
            });
            // A4 portrait dimensions in mm
            const pageWidth = 210;
            const pageHeight = 297;
            // Calculate how the canvas fits into PDF pages
            const imgHeight = canvas.height * pageWidth / canvas.width;
            // Calculate number of pages needed for this participant
            const totalPages = Math.ceil(imgHeight / pageHeight);
            // Add pages to PDF
            for(let page = 0; page < totalPages; page++){
                if (page > 0) {
                    doc.addPage();
                }
                // Calculate the portion of canvas for this page
                const sourceY = page * pageHeight * canvas.width / pageWidth;
                const sourceHeight = Math.min(pageHeight * canvas.width / pageWidth, canvas.height - sourceY);
                // Only add page if there's actual content
                if (sourceHeight > 0) {
                    // Create temporary canvas for this page
                    const pageCanvas = document.createElement("canvas");
                    pageCanvas.width = canvas.width;
                    pageCanvas.height = sourceHeight;
                    const ctx = pageCanvas.getContext("2d");
                    if (ctx) {
                        // Draw the portion of the original canvas
                        ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
                        // Convert to image and add to PDF
                        const pageImgData = pageCanvas.toDataURL("image/png");
                        const pageImgHeight = sourceHeight * pageWidth / canvas.width;
                        doc.addImage(pageImgData, "PNG", 0, 0, pageWidth, pageImgHeight);
                    }
                }
            }
        } finally{
            // Clean up
            document.body.removeChild(container);
        }
    }
    // Save PDF
    const fileName = `${eventTitle.replace(/\s+/g, "-")}-results-${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
};
const exportCustomTablesPDF = async (eventTitle, responses, components, config, editorSettings // Optional: Advanced editor settings
)=>{
    // Validate custom tables
    if (!config.customTables || config.customTables.length === 0) {
        throw new Error("لا توجد جداول مخصصة للتصدير");
    }
    // Sort tables by order
    const sortedTables = [
        ...config.customTables
    ].sort((a, b)=>a.order - b.order);
    // Filter out empty tables
    const validTables = sortedTables.filter((table)=>table.componentIds.length > 0);
    if (validTables.length === 0) {
        throw new Error("جميع الجداول فارغة. يرجى إضافة مكونات إلى الجداول");
    }
    // Use editor settings if provided, otherwise use defaults
    const orientation = editorSettings?.page.orientation || "landscape";
    const format = editorSettings?.page.size || "a4";
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
        orientation: orientation,
        unit: "mm",
        format: format
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    // Track current Y position for continuous layout
    // Use editor settings for margins if provided
    const topMargin = editorSettings?.page.margins.top || 5;
    let currentY = topMargin; // Start with top margin
    let isFirstTable = true;
    // Process each table
    for(let tableIndex = 0; tableIndex < validTables.length; tableIndex++){
        const table = validTables[tableIndex];
        // No automatic page breaks - we'll handle them intelligently based on content height
        // Filter components for this table
        const tableComponents = components.filter((c)=>table.componentIds.includes(c.id) && (c.type === "question" || c.type === "rating"));
        // Sort components by the order in table.componentIds
        tableComponents.sort((a, b)=>{
            const indexA = table.componentIds.indexOf(a.id);
            const indexB = table.componentIds.indexOf(b.id);
            return indexA - indexB;
        });
        // Get font size multiplier from config (default 1.0)
        const fontSizeMultiplier = config.fontSize ? config.fontSize / 10 : 1.0;
        // Calculate font sizes - v8.0: Use editor settings if provided, otherwise use v7.5 defaults
        const eventTitleSize = editorSettings?.fonts.sizes.eventTitle || Math.round(58 * fontSizeMultiplier);
        const tableTitleSize = editorSettings?.fonts.sizes.tableTitle || Math.round(48 * fontSizeMultiplier);
        const headerSize = editorSettings?.fonts.sizes.header || Math.round(26 * fontSizeMultiplier);
        const contentSize = editorSettings?.fonts.sizes.content || Math.round(24 * fontSizeMultiplier);
        const infoSize = editorSettings?.fonts.sizes.info || Math.round(20 * fontSizeMultiplier);
        const footerSize = editorSettings?.fonts.sizes.footer || Math.round(18 * fontSizeMultiplier);
        // Font weights from editor settings
        const eventTitleWeight = editorSettings?.fonts.weights.eventTitle || 900;
        const tableTitleWeight = editorSettings?.fonts.weights.tableTitle || 900;
        const headerWeight = editorSettings?.fonts.weights.header || 800;
        const contentWeight = editorSettings?.fonts.weights.content || 400;
        // Font family from editor settings
        // v9.1: Use Arabic-friendly fonts
        const fontFamily = editorSettings?.fonts.family || "'Cairo', 'Amiri', 'Tahoma', 'Arial', sans-serif";
        // Create temporary container for HTML rendering with professional styling
        // v8.0: Use editor settings for container styling
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.left = "-9999px"; // Move off-screen but keep visible for html2canvas
        container.style.top = "0";
        container.style.width = "3500px"; // Increased from 2800px to 3500px for larger table
        container.style.height = "auto";
        // Use editor settings for padding
        const containerPaddingV = editorSettings?.spacing.containerPadding.vertical || 40;
        const containerPaddingH = editorSettings?.spacing.containerPadding.horizontal || 50;
        container.style.padding = `${containerPaddingV}px ${containerPaddingH}px`;
        container.style.fontFamily = fontFamily;
        container.style.direction = "rtl";
        // v9.1: Fix Arabic text rendering
        container.style.unicodeBidi = "embed";
        container.style.setProperty('text-rendering', 'optimizeLegibility');
        container.style.setProperty('-webkit-font-smoothing', 'antialiased');
        container.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
        // Use editor settings for background color
        const backgroundColor = editorSettings?.page.backgroundColor || "#ffffff";
        container.style.backgroundColor = backgroundColor;
        container.style.zIndex = "-9999"; // Hide behind everything
        // Don't use visibility:hidden - it prevents html2canvas from capturing
        container.style.pointerEvents = "none"; // Disable interactions
        // Build HTML content with professional styling
        let htmlContent = "";
        // Add logo if configured (only on first table)
        if (config.logo && tableIndex === 0) {
            const logoSize = config.logo.size === "small" ? "70px" : config.logo.size === "large" ? "140px" : "100px";
            const logoPosition = config.logo.position === "top-right" ? "flex-end" : config.logo.position === "top-left" ? "flex-start" : "center";
            htmlContent += `
        <div style="display: flex; justify-content: ${logoPosition}; margin-bottom: 20px;">
          <img src="${config.logo.data}" style="width: ${logoSize}; height: ${logoSize}; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
        </div>
      `;
        }
        // Add event title if configured (only on first table)
        // v10.0: Professional design with customizable colors
        if (config.includeEventTitle && tableIndex === 0) {
            // v11.0: Increased margin from 80px to 100px for better spacing
            const eventTitleMargin = editorSettings?.spacing.titleMargins.eventTitle || 100;
            const eventTitleColor = editorSettings?.colors.eventTitleText || '#ffffff';
            const eventTitleBg = editorSettings?.colors.eventTitleBg || 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
            htmlContent += `
        <div style="
          text-align: center;
          margin-bottom: ${eventTitleMargin}px;
          padding: 48px 60px;
          background: ${eventTitleBg};
          border: none;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          "></div>
          <h1 style="
            font-size: ${eventTitleSize}px;
            font-weight: ${eventTitleWeight};
            color: ${eventTitleColor};
            margin: 0;
            font-family: ${fontFamily};
            direction: rtl;
            unicode-bidi: bidi-override;
            line-height: 1.5;
            letter-spacing: 0;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            white-space: pre-wrap;
            word-break: keep-all;
          ">${eventTitle}</h1>
        </div>
      `;
        }
        // Add table title with professional styling
        // v10.0: Elegant and modern design with customizable colors
        if (table.settings.showTitle !== false) {
            // v11.0: Increased margin from 40px to 80px for better spacing between title and table
            const tableTitleMargin = editorSettings?.spacing.titleMargins.tableTitle || 80;
            // v11.0: Increased top margin from 60px to 0px (event title already has 100px bottom margin)
            const tableTitleTopMargin = tableIndex === 0 ? '0px' : '40px';
            const tableTitleColor = editorSettings?.colors.tableTitleText || '#1e293b';
            const tableTitleBg = editorSettings?.colors.tableTitleBg || 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
            const primaryColor = editorSettings?.colors.primary || '#3b82f6';
            htmlContent += `
        <div style="
          text-align: right;
          margin-bottom: ${tableTitleMargin}px;
          margin-top: ${tableTitleTopMargin};
          padding: 24px 36px;
          background: ${tableTitleBg};
          border-right: 5px solid ${primaryColor};
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        ">
          <h2 style="
            font-size: ${tableTitleSize}px;
            font-weight: ${tableTitleWeight};
            color: ${tableTitleColor};
            margin: 0;
            font-family: ${fontFamily};
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
        }
        // Add export info with professional styling (without emojis)
        if ((config.includeExportDate || config.includeParticipantCount) && tableIndex === 0) {
            let infoText = "";
            if (config.includeExportDate) {
                const exportDate = new Date().toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                infoText += `تاريخ التصدير: ${exportDate}`;
            }
            if (config.includeParticipantCount) {
                if (infoText) infoText += "  |  ";
                infoText += `عدد المشاركين: ${responses.length}`;
            }
            htmlContent += `
        <div style="
          text-align: center;
          font-size: ${infoSize}px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 20px;
          padding: 10px 15px;
          background-color: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          font-family: 'Arial', 'Tahoma', sans-serif;
        ">${infoText}</div>
      `;
        }
        // Build professional table with clean styling
        // v8.0: Use editor settings for table styling
        // v8.0: Use editor settings for cell padding (define outside if block)
        const cellPaddingV = editorSettings?.spacing.cellPadding.vertical || 18;
        const cellPaddingH = editorSettings?.spacing.cellPadding.horizontal || 14;
        htmlContent += `
      <table style="
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-family: ${fontFamily};
        direction: rtl;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      ">
    `;
        // Table header with clean professional styling
        // v9.0: Modern gradient header design
        // v10.0: Use editor settings for colors
        const headerBgColor = editorSettings?.colors.headerBg || 'linear-gradient(135deg, #334155 0%, #475569 100%)';
        const headerTextColor = editorSettings?.colors.headerText || '#ffffff';
        if (table.settings.showHeader !== false) {
            htmlContent += `<thead><tr style="background: ${headerBgColor};">`;
            // Serial number column
            if (table.settings.includeSerialNumber) {
                htmlContent += `
          <th style="
            padding: ${cellPaddingV + 4}px ${cellPaddingH}px;
            border: none;
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            text-align: center;
            color: ${headerTextColor};
            font-weight: ${headerWeight};
            font-size: ${headerSize}px;
            min-width: 80px;
            direction: rtl;
            unicode-bidi: bidi-override;
            letter-spacing: 0;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            white-space: nowrap;
          ">#</th>
        `;
            }
            // Participant name column
            if (config.includeParticipantName) {
                htmlContent += `
          <th style="
            padding: ${cellPaddingV + 4}px ${cellPaddingH}px;
            border: none;
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            text-align: center;
            color: ${headerTextColor};
            font-weight: ${headerWeight};
            font-size: ${headerSize}px;
            min-width: 220px;
            direction: rtl;
            unicode-bidi: bidi-override;
            letter-spacing: 0;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            white-space: nowrap;
          ">اسم المشارك</th>
        `;
            }
            // Participation date column
            if (config.includeParticipationDate) {
                htmlContent += `
          <th style="
            padding: ${cellPaddingV + 4}px ${cellPaddingH}px;
            border: none;
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            text-align: center;
            color: ${headerTextColor};
            font-weight: ${headerWeight};
            font-size: ${headerSize}px;
            min-width: 180px;
            direction: rtl;
            unicode-bidi: bidi-override;
            letter-spacing: 0;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            white-space: nowrap;
          ">التاريخ</th>
        `;
            }
            // Component columns
            tableComponents.forEach((component)=>{
                const label = component.settings?.label || "سؤال";
                htmlContent += `
          <th style="
            padding: ${cellPaddingV + 4}px ${cellPaddingH}px;
            border: none;
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            text-align: center;
            color: ${headerTextColor};
            font-weight: ${headerWeight};
            font-size: ${headerSize}px;
            min-width: 220px;
            max-width: 400px;
            word-wrap: break-word;
            direction: rtl;
            unicode-bidi: bidi-override;
            letter-spacing: 0;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            white-space: pre-wrap;
          ">${label}</th>
        `;
            });
            htmlContent += `</tr></thead>`;
        }
        // Table body with clean styling
        // v9.0: Modern alternating row colors with subtle styling
        htmlContent += `<tbody>`;
        const textColor = editorSettings?.colors.text || "#1e293b";
        const alternateRowBg = editorSettings?.colors.alternateRowBg || "#f8fafc";
        const zebraStriping = editorSettings?.table.zebraStriping !== undefined ? editorSettings.table.zebraStriping : true;
        responses.forEach((response, index)=>{
            const rowBg = zebraStriping && index % 2 === 1 ? alternateRowBg : "#ffffff";
            htmlContent += `<tr style="background-color: ${rowBg}; transition: background-color 0.2s;">`;
            // Serial number
            if (table.settings.includeSerialNumber) {
                htmlContent += `
          <td style="
            padding: ${cellPaddingV}px ${cellPaddingH}px;
            border: none;
            border-bottom: 1px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: ${contentSize}px;
            font-weight: 600;
            line-height: 1.6;
            direction: rtl;
            unicode-bidi: bidi-override;
            text-rendering: optimizeLegibility;
            white-space: nowrap;
          ">${index + 1}</td>
        `;
            }
            // Participant name
            if (config.includeParticipantName) {
                const name = response.participant?.name || "مشارك مجهول";
                htmlContent += `
          <td style="
            padding: ${cellPaddingV}px ${cellPaddingH}px;
            border: none;
            border-bottom: 1px solid #e2e8f0;
            text-align: center;
            color: ${textColor};
            font-size: ${contentSize}px;
            font-weight: ${contentWeight};
            line-height: 1.6;
            direction: rtl;
            unicode-bidi: bidi-override;
            text-rendering: optimizeLegibility;
            white-space: pre-wrap;
          ">${name}</td>
        `;
            }
            // Participation date
            if (config.includeParticipationDate) {
                const date = new Date(response.submittedAt || response.completedAt || new Date()).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                });
                htmlContent += `
          <td style="
            padding: ${cellPaddingV}px ${cellPaddingH}px;
            border: none;
            border-bottom: 1px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: ${contentSize}px;
            font-weight: 500;
            line-height: 1.6;
            direction: rtl;
            unicode-bidi: bidi-override;
            text-rendering: optimizeLegibility;
            white-space: nowrap;
          ">${date}</td>
        `;
            }
            // Component answers
            tableComponents.forEach((component)=>{
                const answer = response.answers.find((a)=>a.componentId === component.id);
                const answerText = answer ? formatAnswer(answer, component, config) : "لا توجد إجابة";
                htmlContent += `
          <td style="
            padding: ${cellPaddingV}px ${cellPaddingH}px;
            border: none;
            border-bottom: 1px solid #e2e8f0;
            text-align: center;
            color: ${answer ? textColor : '#94a3b8'};
            font-size: ${contentSize}px;
            font-weight: ${contentWeight};
            word-wrap: break-word;
            line-height: 1.6;
            direction: rtl;
            unicode-bidi: bidi-override;
            text-rendering: optimizeLegibility;
            white-space: pre-wrap;
          ">${answerText}</td>
        `;
            });
            htmlContent += `</tr>`;
        });
        htmlContent += `</tbody></table>`;
        // Add custom footer if configured (without page numbers)
        if (config.customFooter) {
            htmlContent += `
        <div style="
          text-align: center;
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #dee2e6;
        ">
          <div style="
            font-size: ${footerSize}px;
            color: #868e96;
            font-family: 'Arial', 'Tahoma', sans-serif;
          ">${config.customFooter}</div>
        </div>
      `;
        }
        htmlContent += `</div>`;
        container.innerHTML = htmlContent;
        document.body.appendChild(container);
        // v3.0: Add custom text overlays (Phase 6)
        if (editorSettings?.customTextOverlays) {
            addCustomTextOverlays(container, editorSettings.customTextOverlays, fontFamily);
        }
        // Wait a bit for rendering
        await new Promise((resolve)=>setTimeout(resolve, 300));
        // Calculate dimensions for PDF
        // v8.0: Use editor settings for quality
        const quality = editorSettings?.advanced.quality || "high";
        const qualityScale = quality === "low" ? 1 : quality === "medium" ? 2 : 3;
        let canvas;
        try {
            canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(container, {
                scale: qualityScale,
                useCORS: true,
                allowTaint: true,
                backgroundColor: backgroundColor,
                logging: false,
                width: 3500,
                windowWidth: 3500,
                imageTimeout: 0,
                removeContainer: false
            });
        } catch (error) {
            // Clean up container on error
            if (container && container.parentNode === document.body) {
                document.body.removeChild(container);
            }
            console.error(`Failed to render table ${tableIndex + 1}:`, error);
            throw new Error(`فشل في تحويل الجدول ${tableIndex + 1} إلى صورة. ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
        }
        // Clean up container
        if (container && container.parentNode === document.body) {
            document.body.removeChild(container);
        }
        const imgData = canvas.toDataURL("image/png", 1.0); // Maximum quality
        // Use editor settings for margins
        const leftMargin = editorSettings?.page.margins.left || 5;
        const rightMargin = editorSettings?.page.margins.right || 5;
        const bottomMargin = editorSettings?.page.margins.bottom || 5;
        // Validate canvas dimensions
        if (!canvas || canvas.width <= 0 || canvas.height <= 0) {
            console.error("Invalid canvas dimensions:", {
                width: canvas?.width,
                height: canvas?.height
            });
            throw new Error(`فشل في إنشاء الجدول ${tableIndex + 1}. أبعاد غير صالحة.`);
        }
        const imgWidth = pageWidth - leftMargin - rightMargin;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        // Validate calculated dimensions
        if (!isFinite(imgWidth) || imgWidth <= 0 || !isFinite(imgHeight) || imgHeight <= 0) {
            console.error("Invalid image dimensions:", {
                imgWidth,
                imgHeight,
                pageWidth,
                leftMargin,
                rightMargin,
                canvasWidth: canvas.width,
                canvasHeight: canvas.height
            });
            throw new Error(`فشل في حساب أبعاد الجدول ${tableIndex + 1}. قيم غير صالحة.`);
        }
        // Validate margins and currentY
        if (!isFinite(leftMargin) || leftMargin < 0 || !isFinite(currentY) || currentY < 0) {
            console.error("Invalid position values:", {
                leftMargin,
                currentY
            });
            throw new Error(`فشل في تحديد موضع الجدول ${tableIndex + 1}. قيم غير صالحة.`);
        }
        // Add spacing between tables (except for first table)
        // v8.0: Use editor settings for table separation
        const tableSeparation = editorSettings?.spacing.tableSeparation || 15;
        const tableSpacing = isFirstTable ? 0 : tableSeparation;
        // Check if table fits on current page
        const availableHeight = pageHeight - currentY - bottomMargin;
        if (imgHeight + tableSpacing <= availableHeight) {
            // Table fits on current page - add it with spacing
            currentY += tableSpacing;
            doc.addImage(imgData, "PNG", leftMargin, currentY, imgWidth, imgHeight);
            currentY += imgHeight;
        } else {
            // Table doesn't fit - start new page
            doc.addPage();
            currentY = topMargin; // Reset Y position with top margin
            doc.addImage(imgData, "PNG", leftMargin, currentY, imgWidth, imgHeight);
            currentY += imgHeight;
        }
        isFirstTable = false;
    }
    // Save PDF with professional filename
    const fileName = `${eventTitle.replace(/\s+/g, "-")}-custom-tables-${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/pdf-template-validator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PDF Template Validator
 * 
 * Validates imported PDF templates to ensure they have correct structure.
 * Prevents errors from malformed or corrupted template files.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */ __turbopack_context__.s([
    "createTemplateFilename",
    ()=>createTemplateFilename,
    "sanitizePDFSettings",
    ()=>sanitizePDFSettings,
    "validatePDFSettings",
    ()=>validatePDFSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$types$2f$pdf$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/types/pdf-editor.ts [app-client] (ecmascript)");
;
function validatePDFSettings(data) {
    const errors = [];
    const warnings = [];
    // Check if data exists
    if (!data || typeof data !== 'object') {
        errors.push('البيانات غير صالحة أو فارغة');
        return {
            isValid: false,
            errors,
            warnings
        };
    }
    // Validate page settings
    if (!data.page || typeof data.page !== 'object') {
        errors.push('إعدادات الصفحة مفقودة');
    } else {
        if (![
            'landscape',
            'portrait'
        ].includes(data.page.orientation)) {
            errors.push('اتجاه الصفحة غير صالح');
        }
        if (![
            'a4',
            'a3',
            'letter',
            'legal',
            'custom'
        ].includes(data.page.size)) {
            errors.push('حجم الصفحة غير صالح');
        }
        if (!data.page.margins || typeof data.page.margins !== 'object') {
            errors.push('هوامش الصفحة مفقودة');
        } else {
            const margins = [
                'top',
                'right',
                'bottom',
                'left'
            ];
            margins.forEach((margin)=>{
                if (typeof data.page.margins[margin] !== 'number') {
                    errors.push(`هامش ${margin} غير صالح`);
                }
            });
        }
        if (typeof data.page.backgroundColor !== 'string' || !data.page.backgroundColor.match(/^#[0-9A-Fa-f]{6}$/)) {
            warnings.push('لون خلفية الصفحة غير صالح، سيتم استخدام القيمة الافتراضية');
        }
    }
    // Validate fonts settings
    if (!data.fonts || typeof data.fonts !== 'object') {
        errors.push('إعدادات الخطوط مفقودة');
    } else {
        // Validate font family
        const validFonts = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$types$2f$pdf$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_FONTS"].map((f)=>f.value);
        if (!validFonts.includes(data.fonts.family)) {
            warnings.push('نوع الخط غير صالح، سيتم استخدام Arial');
        }
        // Validate font sizes
        if (!data.fonts.sizes || typeof data.fonts.sizes !== 'object') {
            errors.push('أحجام الخطوط مفقودة');
        } else {
            const sizeKeys = [
                'eventTitle',
                'tableTitle',
                'header',
                'content',
                'info',
                'footer'
            ];
            sizeKeys.forEach((key)=>{
                if (typeof data.fonts.sizes[key] !== 'number' || data.fonts.sizes[key] < 8 || data.fonts.sizes[key] > 100) {
                    warnings.push(`حجم الخط ${key} غير صالح`);
                }
            });
        }
        // Validate font weights
        if (!data.fonts.weights || typeof data.fonts.weights !== 'object') {
            errors.push('أوزان الخطوط مفقودة');
        } else {
            const weightKeys = [
                'eventTitle',
                'tableTitle',
                'header',
                'content'
            ];
            const validWeights = [
                100,
                200,
                300,
                400,
                500,
                600,
                700,
                800,
                900
            ];
            weightKeys.forEach((key)=>{
                if (!validWeights.includes(data.fonts.weights[key])) {
                    warnings.push(`وزن الخط ${key} غير صالح`);
                }
            });
        }
    }
    // Validate colors settings
    if (!data.colors || typeof data.colors !== 'object') {
        errors.push('إعدادات الألوان مفقودة');
    } else {
        const colorKeys = [
            'primary',
            'secondary',
            'text',
            'border',
            'eventTitleBg',
            'eventTitleText',
            'tableTitleBg',
            'tableTitleText',
            'headerBg',
            'headerText',
            'alternateRowBg'
        ];
        colorKeys.forEach((key)=>{
            if (typeof data.colors[key] !== 'string' || !data.colors[key].match(/^#[0-9A-Fa-f]{6}$/)) {
                warnings.push(`اللون ${key} غير صالح`);
            }
        });
    }
    // Validate spacing settings
    if (!data.spacing || typeof data.spacing !== 'object') {
        errors.push('إعدادات المسافات مفقودة');
    } else {
        if (typeof data.spacing.tableSeparation !== 'number' || data.spacing.tableSeparation < 0) {
            warnings.push('مسافة الفصل بين الجداول غير صالحة');
        }
        if (!data.spacing.containerPadding || typeof data.spacing.containerPadding !== 'object') {
            warnings.push('حشو الحاوية مفقود');
        }
        if (!data.spacing.cellPadding || typeof data.spacing.cellPadding !== 'object') {
            warnings.push('حشو الخلايا مفقود');
        }
        if (!data.spacing.titleMargins || typeof data.spacing.titleMargins !== 'object') {
            warnings.push('هوامش العناوين مفقودة');
        }
    }
    // Validate table settings
    if (!data.table || typeof data.table !== 'object') {
        errors.push('إعدادات الجداول مفقودة');
    } else {
        if (!data.table.border || typeof data.table.border !== 'object') {
            warnings.push('إعدادات حدود الجدول مفقودة');
        } else {
            if (typeof data.table.border.width !== 'number' || data.table.border.width < 0 || data.table.border.width > 10) {
                warnings.push('عرض حدود الجدول غير صالح');
            }
            if (![
                'solid',
                'dashed',
                'dotted'
            ].includes(data.table.border.style)) {
                warnings.push('نمط حدود الجدول غير صالح');
            }
        }
        if (![
            'auto',
            'fixed',
            'custom'
        ].includes(data.table.columnWidthMode)) {
            warnings.push('وضع عرض الأعمدة غير صالح');
        }
        if (typeof data.table.zebraStriping !== 'boolean') {
            warnings.push('إعداد الصفوف المتناوبة غير صالح');
        }
    }
    // Validate advanced settings
    if (!data.advanced || typeof data.advanced !== 'object') {
        errors.push('الإعدادات المتقدمة مفقودة');
    } else {
        if (![
            'low',
            'medium',
            'high'
        ].includes(data.advanced.quality)) {
            warnings.push('جودة التصدير غير صالحة');
        }
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}
function sanitizePDFSettings(data) {
    const sanitized = {
        ...data
    };
    // Fix colors - ensure they have # prefix
    if (sanitized.colors) {
        Object.keys(sanitized.colors).forEach((key)=>{
            if (typeof sanitized.colors[key] === 'string' && !sanitized.colors[key].startsWith('#')) {
                sanitized.colors[key] = '#' + sanitized.colors[key];
            }
        });
    }
    // Fix font weights - ensure they are valid numbers
    if (sanitized.fonts?.weights) {
        const validWeights = [
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900
        ];
        Object.keys(sanitized.fonts.weights).forEach((key)=>{
            const weight = sanitized.fonts.weights[key];
            if (!validWeights.includes(weight)) {
                // Find closest valid weight
                sanitized.fonts.weights[key] = validWeights.reduce((prev, curr)=>Math.abs(curr - weight) < Math.abs(prev - weight) ? curr : prev);
            }
        });
    }
    // Fix page size - ensure it's lowercase
    if (sanitized.page?.size) {
        sanitized.page.size = sanitized.page.size.toLowerCase();
    }
    // Fix orientation - ensure it's lowercase
    if (sanitized.page?.orientation) {
        sanitized.page.orientation = sanitized.page.orientation.toLowerCase();
    }
    return sanitized;
}
function createTemplateFilename(templateName) {
    const safeName = templateName.replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, '') // Keep Arabic, English, numbers, spaces, hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase();
    const timestamp = new Date().toISOString().split('T')[0];
    return `pdf-template-${safeName}-${timestamp}.json`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/pdf-performance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PDF Performance Utilities
 * 
 * Performance monitoring and optimization utilities for PDF editor.
 * Helps track render times, memory usage, and identify bottlenecks.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */ /**
 * Performance metrics interface
 */ __turbopack_context__.s([
    "BatchUpdater",
    ()=>BatchUpdater,
    "checkBrowserSupport",
    ()=>checkBrowserSupport,
    "debounce",
    ()=>debounce,
    "measureRender",
    ()=>measureRender,
    "memoize",
    ()=>memoize,
    "optimizeImage",
    ()=>optimizeImage,
    "performanceMonitor",
    ()=>performanceMonitor,
    "throttle",
    ()=>throttle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Performance monitor class
 */ class PerformanceMonitor {
    metrics = new Map();
    enabled = ("TURBOPACK compile-time value", "development") === 'development';
    /**
   * Start timing an operation
   */ start(label) {
        if (!this.enabled) return;
        this.metrics.set(label, performance.now());
    }
    /**
   * End timing an operation and log the result
   */ end(label) {
        if (!this.enabled) return 0;
        const startTime = this.metrics.get(label);
        if (!startTime) {
            console.warn(`Performance: No start time found for "${label}"`);
            return 0;
        }
        const duration = performance.now() - startTime;
        this.metrics.delete(label);
        // Log if duration is significant (> 100ms)
        if (duration > 100) {
            console.warn(`⚠️ Performance: "${label}" took ${duration.toFixed(2)}ms`);
        } else {
            console.log(`✓ Performance: "${label}" took ${duration.toFixed(2)}ms`);
        }
        return duration;
    }
    /**
   * Measure memory usage (if available)
   */ measureMemory() {
        if (!this.enabled) return undefined;
        // @ts-ignore - performance.memory is not in TypeScript types
        if (performance.memory) {
            // @ts-ignore
            const usedJSHeapSize = performance.memory.usedJSHeapSize;
            // @ts-ignore
            const totalJSHeapSize = performance.memory.totalJSHeapSize;
            const percentage = usedJSHeapSize / totalJSHeapSize * 100;
            console.log(`Memory: ${(usedJSHeapSize / 1048576).toFixed(2)}MB / ${(totalJSHeapSize / 1048576).toFixed(2)}MB (${percentage.toFixed(1)}%)`);
            return usedJSHeapSize;
        }
        return undefined;
    }
    /**
   * Clear all metrics
   */ clear() {
        this.metrics.clear();
    }
    /**
   * Enable/disable monitoring
   */ setEnabled(enabled) {
        this.enabled = enabled;
    }
}
const performanceMonitor = new PerformanceMonitor();
function debounce(func, wait) {
    let timeout = null;
    return function executedFunction(...args) {
        const later = ()=>{
            timeout = null;
            func(...args);
        };
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}
function throttle(func, limit) {
    let inThrottle = false;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(()=>{
                inThrottle = false;
            }, limit);
        }
    };
}
function memoize(func) {
    const cache = new Map();
    return (...args)=>{
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func(...args);
        cache.set(key, result);
        // Limit cache size to prevent memory leaks
        if (cache.size > 100) {
            const firstKey = cache.keys().next().value;
            if (firstKey !== undefined) {
                cache.delete(firstKey);
            }
        }
        return result;
    };
}
function measureRender(componentName) {
    return {
        onRenderStart: ()=>{
            performanceMonitor.start(`render:${componentName}`);
        },
        onRenderEnd: ()=>{
            performanceMonitor.end(`render:${componentName}`);
        }
    };
}
function checkBrowserSupport() {
    const missing = [];
    // Check for required APIs
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!window.localStorage) {
        missing.push('localStorage');
    }
    if (!window.Blob) {
        missing.push('Blob API');
    }
    if (!window.URL || !window.URL.createObjectURL) {
        missing.push('URL API');
    }
    if (!window.FileReader) {
        missing.push('FileReader API');
    }
    // Check for canvas support
    const canvas = document.createElement('canvas');
    if (!canvas.getContext || !canvas.getContext('2d')) {
        missing.push('Canvas API');
    }
    return {
        supported: missing.length === 0,
        missing
    };
}
async function optimizeImage(imageUrl, maxWidth = 1920, quality = 0.9) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>{
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Canvas context not available'));
                return;
            }
            // Calculate new dimensions
            let width = img.width;
            let height = img.height;
            if (width > maxWidth) {
                height = height * maxWidth / width;
                width = maxWidth;
            }
            canvas.width = width;
            canvas.height = height;
            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob)=>{
                if (blob) {
                    resolve(URL.createObjectURL(blob));
                } else {
                    reject(new Error('Failed to create blob'));
                }
            }, 'image/jpeg', quality);
        };
        img.onerror = ()=>{
            reject(new Error('Failed to load image'));
        };
        img.src = imageUrl;
    });
}
class BatchUpdater {
    updates = [];
    timeout = null;
    callback;
    delay;
    constructor(callback, delay = 100){
        this.callback = callback;
        this.delay = delay;
    }
    add(update) {
        this.updates.push(update);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(()=>{
            this.flush();
        }, this.delay);
    }
    flush() {
        if (this.updates.length > 0) {
            this.callback([
                ...this.updates
            ]);
            this.updates = [];
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    clear() {
        this.updates = [];
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/excel-export.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultExcelConfig",
    ()=>defaultExcelConfig,
    "exportSeparateSheetsExcel",
    ()=>exportSeparateSheetsExcel,
    "exportSingleSheetExcel",
    ()=>exportSingleSheetExcel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/date-fns/locale/ar.js [app-client] (ecmascript)");
;
;
;
const defaultExcelConfig = {
    layout: "single-sheet",
    headerBackgroundColor: "#1a56db",
    headerTextColor: "#ffffff",
    evenRowColor: "#f9fafb",
    oddRowColor: "#ffffff",
    borderStyle: "light",
    fontSize: 11,
    freezeHeader: true,
    autoFilter: true,
    autoFitColumns: true,
    zebraStriping: true,
    includeParticipantName: true,
    includeParticipantEmail: true,
    includeParticipationDate: true,
    includeTimeSpent: true,
    includeDevice: true,
    includeScore: true,
    includeAllQuestions: true,
    includeStatisticsRow: false,
    includeSummarySheet: false,
    includeEventTitle: true,
    includeExportDate: true,
    includeParticipantCount: true
};
// Helper function to convert hex color to Excel color object
const hexToExcelColor = (hex)=>{
    const cleanHex = hex.replace("#", "");
    return {
        rgb: cleanHex.toUpperCase()
    };
};
// Helper function to format time spent
const formatTimeSpent = (seconds)=>{
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    if (hours > 0) {
        return `${hours}س ${minutes}د ${secs}ث`;
    } else if (minutes > 0) {
        return `${minutes}د ${secs}ث`;
    } else {
        return `${secs}ث`;
    }
};
// Helper function to format answer
const formatAnswer = (answer, component)=>{
    if (!answer || !answer.answer) return "لا توجد إجابة";
    const answerValue = answer.answer;
    // Handle different component types
    switch(component.type){
        case "question":
            if (component.settings.questionType === "single_choice" || component.settings.questionType === "multiple_choice") {
                if (Array.isArray(answerValue)) {
                    return answerValue.join(", ");
                }
                return String(answerValue);
            }
            if (component.settings.questionType === "yes_no") {
                return answerValue === "yes" ? "نعم" : "لا";
            }
            return String(answerValue);
        case "rating":
            if (component.settings.ratingType === "stars") {
                return `${"⭐".repeat(answerValue)} (${answerValue}/${component.settings.maxRating})`;
            }
            return `${answerValue}/${component.settings.maxRating}`;
        case "signature":
            return answerValue.signatureData ? "✓ تم التوقيع" : "لم يتم التوقيع";
        case "pdf_upload":
        case "image_upload":
        case "video_upload":
            return answerValue.fileName || "تم الرفع";
        case "link":
            return answerValue.url || "لا يوجد رابط";
        default:
            return String(answerValue);
    }
};
const exportSingleSheetExcel = (eventTitle, responses, components, config)=>{
    const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
    // Prepare data array
    const data = [];
    // Add event info rows if enabled
    let headerRowIndex = 0;
    if (config.includeEventTitle) {
        data.push([
            eventTitle
        ]);
        headerRowIndex++;
    }
    if (config.includeExportDate) {
        data.push([
            `تاريخ التصدير: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), "PPP", {
                locale: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ar"]
            })}`
        ]);
        headerRowIndex++;
    }
    if (config.includeParticipantCount) {
        data.push([
            `عدد المشاركين: ${responses.length}`
        ]);
        headerRowIndex++;
    }
    // Add empty row if we added info
    if (headerRowIndex > 0) {
        data.push([]);
        headerRowIndex++;
    }
    // Build header row
    const headers = [];
    if (config.includeParticipantName) headers.push("اسم المشارك");
    if (config.includeParticipantEmail) headers.push("البريد الإلكتروني");
    if (config.includeParticipationDate) headers.push("تاريخ المشاركة");
    if (config.includeTimeSpent) headers.push("الوقت المستغرق");
    if (config.includeDevice) headers.push("الجهاز");
    if (config.includeScore) headers.push("النتيجة");
    // Add question headers
    const questionComponents = components.filter((c)=>config.includeAllQuestions && (c.type === "question" || c.type === "rating"));
    questionComponents.forEach((component)=>{
        const label = component.settings?.label || "سؤال";
        headers.push(label);
    });
    data.push(headers);
    // Add data rows
    responses.forEach((response)=>{
        const row = [];
        if (config.includeParticipantName) {
            row.push(response.participant?.name || "مشارك مجهول");
        }
        if (config.includeParticipantEmail) {
            row.push(response.participant?.email || "");
        }
        if (config.includeParticipationDate) {
            const date = response.completedAt || response.startedAt;
            row.push(date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(date), "PPP", {
                locale: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ar"]
            }) : "");
        }
        if (config.includeTimeSpent) {
            row.push(formatTimeSpent(response.timeSpent || 0));
        }
        if (config.includeDevice) {
            row.push(response.metadata?.device || "غير معروف");
        }
        if (config.includeScore && response.score) {
            row.push(`${response.score.totalScore}/${response.score.maxScore}`);
        }
        // Add answers
        questionComponents.forEach((component)=>{
            const answer = response.answers.find((a)=>a.componentId === component.id);
            row.push(formatAnswer(answer, component));
        });
        data.push(row);
    });
    // Add statistics row if enabled
    if (config.includeStatisticsRow && responses.length > 0) {
        data.push([]); // Empty row
        const statsRow = [
            "الإحصائيات"
        ];
        // Add empty cells for other columns
        for(let i = 1; i < headers.length; i++){
            statsRow.push("");
        }
        data.push(statsRow);
    }
    // Create worksheet
    const worksheet = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].aoa_to_sheet(data);
    // Apply styling (basic - XLSX has limited styling support)
    const range = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].decode_range(worksheet['!ref'] || 'A1');
    // Set column widths
    if (config.autoFitColumns) {
        const colWidths = headers.map((header, i)=>{
            const maxLength = Math.max(header.length, ...data.slice(headerRowIndex + 1).map((row)=>String(row[i] || "").length));
            return {
                wch: Math.min(maxLength + 2, 50)
            };
        });
        worksheet['!cols'] = colWidths;
    }
    // Add worksheet to workbook
    __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, worksheet, "النتائج");
    // Add summary sheet if enabled
    if (config.includeSummarySheet) {
        const summaryData = [
            [
                "ملخص النتائج"
            ],
            [],
            [
                "عنوان الحدث",
                eventTitle
            ],
            [
                "عدد المشاركين",
                responses.length
            ],
            [
                "تاريخ التصدير",
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), "PPP", {
                    locale: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ar"]
                })
            ]
        ];
        if (config.includeScore && responses.some((r)=>r.score)) {
            const scores = responses.filter((r)=>r.score).map((r)=>r.score.totalScore);
            const avgScore = scores.reduce((a, b)=>a + b, 0) / scores.length;
            const maxScore = Math.max(...scores);
            const minScore = Math.min(...scores);
            summaryData.push([], [
                "إحصائيات النتائج"
            ], [
                "متوسط الدرجات",
                avgScore.toFixed(2)
            ], [
                "أعلى درجة",
                maxScore
            ], [
                "أقل درجة",
                minScore
            ]);
        }
        const summarySheet = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].aoa_to_sheet(summaryData);
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, summarySheet, "الملخص");
    }
    // Generate file and download
    const fileName = `${eventTitle.replace(/\s+/g, "-")}-results-${new Date().toISOString().split("T")[0]}.xlsx`;
    __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeFile"](workbook, fileName);
};
const exportSeparateSheetsExcel = (eventTitle, responses, components, config)=>{
    const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
    responses.forEach((response, index)=>{
        const data = [];
        // Add participant info
        if (config.includeEventTitle) {
            data.push([
                eventTitle
            ]);
        }
        if (config.includeParticipantName) {
            data.push([
                `المشارك: ${response.participant?.name || "مشارك مجهول"}`
            ]);
        }
        if (config.includeParticipationDate) {
            const date = response.completedAt || response.startedAt;
            data.push([
                `التاريخ: ${date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(date), "PPP", {
                    locale: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$date$2d$fns$2f$locale$2f$ar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ar"]
                }) : ""}`
            ]);
        }
        data.push([]); // Empty row
        // Add questions and answers
        data.push([
            "السؤال",
            "الإجابة"
        ]);
        const questionComponents = components.filter((c)=>config.includeAllQuestions && (c.type === "question" || c.type === "rating"));
        questionComponents.forEach((component)=>{
            const label = component.settings?.label || "سؤال";
            const answer = response.answers.find((a)=>a.componentId === component.id);
            data.push([
                label,
                formatAnswer(answer, component)
            ]);
        });
        // Create worksheet
        const worksheet = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].aoa_to_sheet(data);
        // Set column widths
        if (config.autoFitColumns) {
            worksheet['!cols'] = [
                {
                    wch: 40
                },
                {
                    wch: 60
                } // Answer column
            ];
        }
        // Add worksheet
        const sheetName = `مشارك ${index + 1}`;
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, worksheet, sheetName);
    });
    // Generate file and download
    const fileName = `${eventTitle.replace(/\s+/g, "-")}-results-${new Date().toISOString().split("T")[0]}.xlsx`;
    __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeFile"](workbook, fileName);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/api/services/contactsService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Contacts Service - خدمة جهات الاتصال
 * الاتصال بـ Backend API لجهات الاتصال والمجموعات
 */ __turbopack_context__.s([
    "contactsService",
    ()=>contactsService,
    "default",
    ()=>__TURBOPACK__default__export__,
    "groupsService",
    ()=>groupsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
const contactsService = {
    /**
   * جلب جميع جهات الاتصال (مع Pagination)
   * Backend يُرجع PagedResult<ContactDto>
   */ getAll: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/Contacts");
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل جلب جهات الاتصال");
        }
        // استخراج الـ items من الاستجابة المُرقّمة
        return response.data.data.items.map(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContact"]);
    },
    /**
   * جلب جهة اتصال بواسطة ID
   */ getById: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Contacts/${id}`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "جهة الاتصال غير موجودة");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContact"])(response.data.data);
    },
    /**
   * إنشاء جهة اتصال جديدة
   */ create: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Contacts", (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContactFormToBackend"])(data));
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إنشاء جهة الاتصال");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContact"])(response.data.data);
    },
    /**
   * تحديث جهة اتصال
   */ update: async (id, data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/Contacts/${id}`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContactFormToBackend"])(data));
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل تحديث جهة الاتصال");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContact"])(response.data.data);
    },
    /**
   * حذف جهة اتصال
   */ delete: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/Contacts/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل حذف جهة الاتصال");
        }
    },
    /**
   * البحث في جهات الاتصال
   */ search: async (query)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Contacts/search?query=${encodeURIComponent(query)}`);
        if (!response.data.success || !response.data.data) {
            return [];
        }
        return response.data.data.map(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContact"]);
    }
};
const groupsService = {
    /**
   * جلب جميع المجموعات
   */ getAll: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/Groups");
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل جلب المجموعات");
        }
        return response.data.data.map(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapGroup"]);
    },
    /**
   * جلب مجموعة بواسطة ID
   */ getById: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Groups/${id}`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "المجموعة غير موجودة");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapGroup"])(response.data.data);
    },
    /**
   * إنشاء مجموعة جديدة
   */ create: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/Groups", (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapGroupFormToBackend"])(data));
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إنشاء المجموعة");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapGroup"])(response.data.data);
    },
    /**
   * تحديث مجموعة
   */ update: async (id, data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/Groups/${id}`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapGroupFormToBackend"])(data));
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل تحديث المجموعة");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapGroup"])(response.data.data);
    },
    /**
   * حذف مجموعة
   */ delete: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/Groups/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل حذف المجموعة");
        }
    },
    /**
   * إضافة جهات اتصال إلى مجموعة
   */ addContacts: async (groupId, contactIds)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Groups/${groupId}/contacts`, {
            contactIds
        });
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل إضافة جهات الاتصال");
        }
    },
    /**
   * إزالة جهات اتصال من مجموعة
   */ removeContacts: async (groupId, contactIds)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/Groups/${groupId}/contacts`, {
            data: {
                contactIds
            }
        });
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل إزالة جهات الاتصال");
        }
    }
};
const __TURBOPACK__default__export__ = {
    contactsService,
    groupsService
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/api/services/responsesService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Responses Service - خدمة الردود
 * الاتصال بـ Backend API للردود
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "responsesService",
    ()=>responsesService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
const responsesService = {
    /**
   * بدء استجابة جديدة (للمشاركين - بدون مصادقة)
   */ startResponse: async (eventId, participantInfo)=>{
        const request = {
            respondentName: participantInfo?.name,
            respondentEmail: participantInfo?.email,
            respondentPhone: participantInfo?.phone
        };
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Responses/event/${eventId}/start`, request);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل بدء الاستجابة");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapResponse"])(response.data.data);
    },
    /**
   * إرسال إجابات قسم (للمشاركين - بدون مصادقة)
   */ submitSectionAnswers: async (responseId, sectionIndex, answers)=>{
        const request = {
            sectionIndex,
            answers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSectionAnswersToBackend"])(answers)
        };
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Responses/${responseId}/section-answers`, request);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إرسال الإجابات");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapResponse"])(response.data.data);
    },
    /**
   * إكمال الاستجابة (للمشاركين - بدون مصادقة)
   */ completeResponse: async (responseId, finalAnswers)=>{
        const request = {
            finalAnswers: finalAnswers ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSectionAnswersToBackend"])(finalAnswers) : undefined
        };
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/Responses/${responseId}/complete`, request);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل إكمال الاستجابة");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapResponse"])(response.data.data);
    },
    /**
   * جلب ردود حدث معين (للمالك - يحتاج مصادقة)
   */ getByEventId: async (eventId)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Responses/event/${eventId}`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل جلب الردود");
        }
        return response.data.data.items.map(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapResponse"]);
    },
    /**
   * جلب رد بالـ ID (للمالك - يحتاج مصادقة)
   */ getById: async (responseId)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/Responses/${responseId}`);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "الرد غير موجود");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapResponse"])(response.data.data);
    },
    /**
   * حذف رد (للمالك - يحتاج مصادقة)
   */ delete: async (responseId)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/Responses/${responseId}`);
        if (!response.data.success) {
            throw new Error(response.data.message || "فشل حذف الرد");
        }
    }
};
const __TURBOPACK__default__export__ = responsesService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/api/services/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * API Services - تصدير جميع الخدمات
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/authService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$contactsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/contactsService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/eventsService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$responsesService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/responsesService.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=event-meena_lib_41cc9150._.js.map