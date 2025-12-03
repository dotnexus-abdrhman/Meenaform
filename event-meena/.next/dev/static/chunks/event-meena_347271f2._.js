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
 * التحقق من أن الـ response هو Problem Details
 */ const isProblemDetails = (data)=>{
    return typeof data === "object" && data !== null && "title" in data && "status" in data;
};
/**
 * استخراج رسائل الخطأ من Problem Details
 */ const extractProblemDetailsErrors = (problemDetails)=>{
    const errors = [];
    if (problemDetails.errors) {
        // تحويل object { "Password": ["error1", "error2"] } إلى array
        Object.values(problemDetails.errors).forEach((fieldErrors)=>{
            if (Array.isArray(fieldErrors)) {
                errors.push(...fieldErrors);
            }
        });
    }
    return errors;
};
/**
 * إنشاء ApiError من AxiosError
 */ const createApiError = (error)=>{
    if (error.response) {
        const { data, status } = error.response;
        // التحقق من Problem Details format (من FluentValidation)
        if (isProblemDetails(data)) {
            const errors = extractProblemDetailsErrors(data);
            const message = errors.length > 0 ? errors.join(" | ") : data.title || getErrorMessage(status);
            return new ApiError(message, status, errors);
        }
        // التعامل مع ApiResponse format العادي
        const apiData = data;
        const message = apiData?.message || getErrorMessage(status);
        const errors = apiData?.errors || [];
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
            allowEdit: backend.allowEditResponses,
            requireAuth: backend.requireLogin,
            requireLogin: backend.requireLogin,
            showResults: backend.showResults,
            showProgressBar: true,
            showCorrectAnswers: backend.showCorrectAnswers,
            shuffleQuestions: backend.shuffleQuestions,
            allowAnonymous: backend.allowAnonymous,
            timeLimit: backend.timeLimitMinutes || undefined,
            passingScore: backend.passingScore || undefined,
            thankYouMessage: backend.thankYouMessage || undefined,
            successMessage: backend.successMessage || undefined,
            goodMessage: backend.goodMessage || undefined,
            improvementMessage: backend.improvementMessage || undefined
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
            completedResponses: backend.completedResponseCount,
            inProgressResponses: backend.responseCount - backend.completedResponseCount,
            completionRate: backend.completionRate,
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
            settings = {
                type: "table",
                label: backend.title || "جدول",
                description: backend.description || "",
                tableType: styleData.tableType || "simple",
                columns: styleData.columns || [],
                rowCount: styleData.rowCount || 3,
                tableData: styleData.tableData || {},
                calculations: styleData.calculations || []
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
        allowEditResponses: data.settings?.allowEdit || false,
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
        allowEditResponses: event.settings?.allowEdit || false,
        showResults: event.settings?.showResults || false,
        showCorrectAnswers: event.settings?.showCorrectAnswers || false,
        shuffleQuestions: event.settings?.shuffleQuestions || false,
        shuffleOptions: event.settings?.shuffleOptions || false,
        passingScore: event.settings?.passingScore || null,
        thankYouMessage: event.settings?.thankYouMessage || null,
        successMessage: event.settings?.successMessage || null,
        goodMessage: event.settings?.goodMessage || null,
        improvementMessage: event.settings?.improvementMessage || null,
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
   * تحديث حدث كامل مع الأقسام والمكونات
   * يُستخدم عند تعديل الحدث من Event Builder
   */ updateWithSections: async (id, event)=>{
        console.log("🔵 Updating event with sections:", event);
        const backendData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventWithSectionsToBackend"])(event);
        console.log("🔵 Backend data for update:", backendData);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/Events/${id}/with-sections`, backendData);
        console.log("🔵 Update API Response:", response.data);
        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.message || "فشل تحديث الحدث");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEventWithFullDetails"])(response.data.data);
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
    ()=>cn,
    "parseBackendDate",
    ()=>parseBackendDate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function parseBackendDate(dateString) {
    if (!dateString) return new Date();
    // إذا كان التاريخ بدون timezone indicator، نفترض أنه UTC
    const normalized = dateString.endsWith("Z") ? dateString : dateString + "Z";
    return new Date(normalized);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/lib/helpers/componentDisplay.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getComponentDisplaySubtitle",
    ()=>getComponentDisplaySubtitle,
    "getComponentDisplayTitle",
    ()=>getComponentDisplayTitle
]);
function getComponentDisplayTitle(component) {
    const settings = component.settings;
    switch(component.type){
        case "question":
            return settings.label || "سؤال بدون عنوان";
        case "rating":
            return settings.label || "تقييم بدون عنوان";
        case "table":
            return settings.label || "جدول بدون عنوان";
        case "pdf_upload":
            return settings.label || "رفع PDF";
        case "image_upload":
            return settings.label || "رفع صورة";
        case "video_upload":
            return settings.label || "رفع فيديو";
        case "link":
            return settings.label || "رابط";
        case "signature":
            return settings.label || "توقيع";
        case "text":
            return "نص توضيحي";
        case "display":
            return settings.label || "عرض";
        // Support question subtypes directly (for templates)
        case "short_text":
        case "long_text":
        case "single_choice":
        case "multiple_choice":
        case "dropdown":
        case "yes_no":
        case "linear_scale":
        case "choice_grid":
        case "number":
        case "email":
        case "phone":
        case "date":
        case "time":
            return settings.label || "سؤال بدون عنوان";
        default:
            return settings.label || "مكون";
    }
}
function getComponentDisplaySubtitle(component) {
    const settings = component.settings;
    switch(component.type){
        case "question":
            return getQuestionTypeLabel(settings.questionType) + (settings.required ? " • مطلوب" : "");
        case "rating":
            return getRatingTypeLabel(settings.ratingType) + (settings.required ? " • مطلوب" : "");
        case "table":
            return getTableTypeLabel(settings.tableType) + ` • ${settings.columns?.length || 0} عمود × ${settings.rowCount || 0} صف`;
        case "pdf_upload":
        case "image_upload":
        case "video_upload":
            return `حجم أقصى: ${settings.maxFileSize || 10}MB` + (settings.allowMultiple ? " • ملفات متعددة" : "");
        case "link":
            return "رابط خارجي" + (settings.validateUrl ? " • مع التحقق" : "");
        case "signature":
            return `${settings.width || 500}×${settings.height || 200}px`;
        case "text":
            const content = settings.content || "";
            return content.length > 60 ? content.substring(0, 60) + "..." : content;
        case "display":
            return getDisplayTypeLabel(settings.displayType);
        // Support question subtypes directly (for templates)
        case "short_text":
        case "long_text":
        case "single_choice":
        case "multiple_choice":
        case "dropdown":
        case "yes_no":
        case "linear_scale":
        case "choice_grid":
        case "number":
        case "email":
        case "phone":
        case "date":
        case "time":
            return getQuestionTypeLabel(component.type) + (settings.required ? " • مطلوب" : "");
        default:
            return "";
    }
}
/**
 * Get question type label in Arabic
 */ function getQuestionTypeLabel(type) {
    const labels = {
        short_text: "نص قصير",
        long_text: "نص طويل",
        single_choice: "اختيار واحد",
        multiple_choice: "اختيار متعدد",
        dropdown: "قائمة منسدلة",
        yes_no: "نعم/لا",
        linear_scale: "مقياس خطي",
        choice_grid: "شبكة اختيارات",
        number: "رقم",
        email: "بريد إلكتروني",
        phone: "هاتف",
        date: "تاريخ",
        time: "وقت"
    };
    return labels[type] || type;
}
/**
 * Get rating type label in Arabic
 */ function getRatingTypeLabel(type) {
    const labels = {
        stars: "نجوم",
        numbers: "أرقام",
        emoji: "إيموجي"
    };
    return labels[type] || type;
}
/**
 * Get table type label in Arabic
 */ function getTableTypeLabel(type) {
    const labels = {
        simple: "جدول بسيط",
        calculation: "جدول حسابي"
    };
    return labels[type] || type;
}
/**
 * Get display type label in Arabic
 */ function getDisplayTypeLabel(type) {
    const labels = {
        image: "عرض صورة",
        pdf: "عرض PDF",
        link: "عرض رابط"
    };
    return labels[type] || type;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/store/authStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Zustand Store لإدارة حالة المصادقة
 * مربوط بـ Backend API
 */ __turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/authService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/client.ts [app-client] (ecmascript)");
;
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
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
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].login(data);
                set({
                    user: result.user,
                    token: result.token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                // استخراج رسالة الخطأ
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول";
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
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].register(data);
                set({
                    user: result.user,
                    token: result.token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                // استخراج رسالة الخطأ
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحساب";
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
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
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenManager"].hasValidToken()) {
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
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
                const token = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenManager"].getAccessToken();
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } catch  {
                // فشل التحقق - مسح التوكن والحالة
                __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenManager"].clearTokens();
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
                const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].updateProfile(data);
                set({
                    user: updatedUser,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء تحديث الملف الشخصي";
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/store/eventsStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Zustand Store لإدارة الأحداث
 * مربوط بـ Backend API
 */ __turbopack_context__.s([
    "useEventsStore",
    ()=>useEventsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/eventsService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/client.ts [app-client] (ecmascript)");
;
;
;
const useEventsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
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
                const events = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].getAll();
                set({
                    events,
                    isLoading: false
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء جلب الأحداث";
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
                const event = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].getFullDetails(id);
                set({
                    currentEvent: event,
                    isLoading: false
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء جلب الحدث";
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
                const event = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].getByShareCode(shareCode);
                set({
                    currentEvent: event,
                    isLoading: false
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء جلب الحدث";
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
                const event = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].getForPreview(id);
                set({
                    currentEvent: event,
                    isLoading: false
                });
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء جلب الحدث للمعاينة";
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
                    newEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].createWithSections(data);
                } else {
                    // وإلا استخدم create العادي
                    newEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].create(data);
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
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحدث";
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
                    updatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].updateWithSections(id, data);
                } else {
                    updatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].update(id, data);
                }
                set((state)=>({
                        events: state.events.map((e)=>e.id === id ? updatedEvent : e),
                        currentEvent: state.currentEvent?.id === id ? updatedEvent : state.currentEvent,
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء تحديث الحدث";
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].delete(id);
                set((state)=>({
                        events: state.events.filter((e)=>e.id !== id),
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء حذف الحدث";
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
                const duplicatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].duplicate(id);
                set((state)=>({
                        events: [
                            duplicatedEvent,
                            ...state.events
                        ],
                        isLoading: false
                    }));
                return duplicatedEvent;
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء نسخ الحدث";
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
                const updatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].updateStatus(id, "archived");
                set((state)=>({
                        events: state.events.map((e)=>e.id === id ? updatedEvent : e),
                        currentEvent: state.currentEvent?.id === id ? updatedEvent : state.currentEvent,
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء أرشفة الحدث";
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
                const updatedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].updateStatus(id, status);
                set((state)=>({
                        events: state.events.map((e)=>e.id === id ? updatedEvent : e),
                        currentEvent: state.currentEvent?.id === id ? updatedEvent : state.currentEvent,
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء تحديث حالة الحدث";
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
                const publishedEvent = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$eventsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsService"].publish(id);
                set((state)=>({
                        events: state.events.map((e)=>e.id === id ? publishedEvent : e),
                        currentEvent: state.currentEvent?.id === id ? publishedEvent : state.currentEvent,
                        isLoading: false
                    }));
            } catch (error) {
                const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.message : error instanceof Error ? error.message : "حدث خطأ أثناء نشر الحدث";
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/store/eventBuilderStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEventBuilderStore",
    ()=>useEventBuilderStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$data$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/data/templates.ts [app-client] (ecmascript)");
;
;
;
const getDefaultThankYouMessage = (type)=>{
    switch(type){
        case "survey":
            return "شكراً لمشاركتك! تم استلام إجاباتك بنجاح.";
        case "poll":
            return "شكراً لمشاركتك في الاستطلاع!";
        case "form":
            return "تم إرسال النموذج بنجاح. شكراً لك!";
        case "quiz":
            return "تم إنهاء الاختبار بنجاح! شكراً لمشاركتك.";
        default:
            return "شكراً لمشاركتك!";
    }
};
const initialState = {
    currentStep: 1,
    title: "",
    description: "",
    type: "survey",
    numberOfSections: 1,
    sections: [],
    currentSectionIndex: 0,
    requireAuth: true,
    allowEdit: false,
    showResults: false,
    allowMultipleResponses: false,
    requireSignature: false,
    thankYouMessage: getDefaultThankYouMessage("survey"),
    successMessage: "ممتاز! أداء رائع!",
    goodMessage: "جيد جداً! استمر في التقدم",
    improvementMessage: "يحتاج إلى تحسين"
};
const useEventBuilderStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialState,
        // Step Navigation
        setCurrentStep: (step)=>set({
                currentStep: step
            }),
        nextStep: ()=>set((state)=>({
                    currentStep: Math.min(state.currentStep + 1, 5)
                })),
        previousStep: ()=>set((state)=>({
                    currentStep: Math.max(state.currentStep - 1, 1)
                })),
        // Basic Info Actions
        setTitle: (title)=>set({
                title
            }),
        setDescription: (description)=>set({
                description
            }),
        setType: (type)=>set({
                type,
                thankYouMessage: getDefaultThankYouMessage(type)
            }),
        setNumberOfSections: (number)=>set({
                numberOfSections: number
            }),
        // Section Actions
        initializeSections: ()=>{
            const { numberOfSections } = get();
            const sections = [];
            for(let i = 0; i < numberOfSections; i++){
                sections.push({
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                    eventId: "",
                    title: `القسم ${i + 1}`,
                    description: "",
                    order: i,
                    components: [],
                    settings: {
                        visible: true,
                        skippable: false,
                        showProgress: true,
                        allowBackNavigation: true
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
            set({
                sections
            });
        },
        setCurrentSectionIndex: (index)=>set({
                currentSectionIndex: index
            }),
        updateSectionTitle: (index, title)=>set((state)=>{
                const sections = [
                    ...state.sections
                ];
                if (sections[index]) {
                    sections[index] = {
                        ...sections[index],
                        title,
                        updatedAt: new Date().toISOString()
                    };
                }
                return {
                    sections
                };
            }),
        updateSectionDescription: (index, description)=>set((state)=>{
                const sections = [
                    ...state.sections
                ];
                if (sections[index]) {
                    sections[index] = {
                        ...sections[index],
                        description,
                        updatedAt: new Date().toISOString()
                    };
                }
                return {
                    sections
                };
            }),
        addComponentToSection: (sectionIndex, component)=>set((state)=>{
                const sections = [
                    ...state.sections
                ];
                if (sections[sectionIndex]) {
                    const newComponent = {
                        ...component,
                        id: component.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        sectionId: sections[sectionIndex].id,
                        order: sections[sectionIndex].components.length,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    sections[sectionIndex] = {
                        ...sections[sectionIndex],
                        components: [
                            ...sections[sectionIndex].components,
                            newComponent
                        ],
                        updatedAt: new Date().toISOString()
                    };
                }
                return {
                    sections
                };
            }),
        updateComponentInSection: (sectionIndex, componentId, updates)=>set((state)=>{
                const sections = [
                    ...state.sections
                ];
                if (sections[sectionIndex]) {
                    sections[sectionIndex] = {
                        ...sections[sectionIndex],
                        components: sections[sectionIndex].components.map((c)=>c.id === componentId ? {
                                ...c,
                                ...updates,
                                updatedAt: new Date().toISOString()
                            } : c),
                        updatedAt: new Date().toISOString()
                    };
                }
                return {
                    sections
                };
            }),
        removeComponentFromSection: (sectionIndex, componentId)=>set((state)=>{
                const sections = [
                    ...state.sections
                ];
                if (sections[sectionIndex]) {
                    sections[sectionIndex] = {
                        ...sections[sectionIndex],
                        components: sections[sectionIndex].components.filter((c)=>c.id !== componentId),
                        updatedAt: new Date().toISOString()
                    };
                }
                return {
                    sections
                };
            }),
        reorderComponentsInSection: (sectionIndex, components)=>set((state)=>{
                const sections = [
                    ...state.sections
                ];
                if (sections[sectionIndex]) {
                    sections[sectionIndex] = {
                        ...sections[sectionIndex],
                        components: components.map((c, index)=>({
                                ...c,
                                order: index
                            })),
                        updatedAt: new Date().toISOString()
                    };
                }
                return {
                    sections
                };
            }),
        reorderSections: (sections)=>set({
                sections: sections.map((s, index)=>({
                        ...s,
                        order: index,
                        updatedAt: new Date().toISOString()
                    }))
            }),
        // Validation
        areAllSectionsComplete: ()=>{
            const { sections, numberOfSections } = get();
            // التحقق من أن عدد الأقسام المنشأة يساوي العدد المحدد
            if (sections.length !== numberOfSections) {
                return false;
            }
            // التحقق من أن كل قسم له عنوان ومكون واحد على الأقل
            return sections.every((section)=>section.title.trim() !== "" && section.components.length > 0);
        },
        getIncompleteSectionsInfo: ()=>{
            const { sections, numberOfSections } = get();
            const incompleteSections = [];
            sections.forEach((section, index)=>{
                if (section.title.trim() === "" || section.components.length === 0) {
                    incompleteSections.push(index);
                }
            });
            return {
                total: numberOfSections,
                completed: sections.length - incompleteSections.length,
                incomplete: incompleteSections
            };
        },
        // Settings Actions
        setStartDate: (date)=>set({
                startDate: date
            }),
        setEndDate: (date)=>set({
                endDate: date
            }),
        setRequireAuth: (value)=>set({
                requireAuth: value
            }),
        setAllowEdit: (value)=>set({
                allowEdit: value
            }),
        setShowResults: (value)=>set({
                showResults: value
            }),
        setAllowMultipleResponses: (value)=>set({
                allowMultipleResponses: value
            }),
        setRequireSignature: (value)=>set({
                requireSignature: value
            }),
        setThankYouMessage: (message)=>set({
                thankYouMessage: message
            }),
        setSuccessMessage: (message)=>set({
                successMessage: message
            }),
        setGoodMessage: (message)=>set({
                goodMessage: message
            }),
        setImprovementMessage: (message)=>set({
                improvementMessage: message
            }),
        // Build Event
        buildEvent: ()=>{
            const state = get();
            const eventId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const now = new Date().toISOString();
            // Get user from localStorage
            const userStr = localStorage.getItem("user");
            const user = userStr ? JSON.parse(userStr) : null;
            const event = {
                id: eventId,
                userId: user?.id || "",
                title: state.title,
                description: state.description,
                type: state.type,
                status: "draft",
                sections: state.sections.map((s)=>({
                        ...s,
                        eventId
                    })),
                settings: {
                    requireAuth: state.requireAuth,
                    allowEdit: state.allowEdit,
                    showResults: state.showResults,
                    allowMultipleResponses: state.allowMultipleResponses,
                    requireSignature: state.requireSignature,
                    shuffleQuestions: false,
                    showProgressBar: true,
                    allowAnonymous: !state.requireAuth,
                    thankYouMessage: state.thankYouMessage,
                    successMessage: state.successMessage,
                    goodMessage: state.goodMessage,
                    improvementMessage: state.improvementMessage
                },
                stats: {
                    views: 0,
                    totalResponses: 0,
                    completedResponses: 0,
                    inProgressResponses: 0,
                    completionRate: 0,
                    averageTime: 0,
                    lastResponseAt: undefined
                },
                createdAt: now,
                updatedAt: now,
                startDate: state.startDate,
                endDate: state.endDate
            };
            return event;
        },
        // Load Template
        loadTemplate: (templateId)=>{
            const template = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$data$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventTemplates"].find((t)=>t.id === templateId);
            if (!template) return;
            // Convert template sections to builder sections
            const sections = template.sections.map((section)=>({
                    id: section.id,
                    eventId: "",
                    title: section.title,
                    description: section.description,
                    order: section.order,
                    components: section.components.map((comp)=>{
                        // Convert template options to choices format
                        const choices = comp.settings.options?.map((opt)=>({
                                id: opt.id,
                                label: opt.label,
                                value: opt.label.toLowerCase().replace(/\s+/g, '_'),
                                isCorrect: comp.settings.correctAnswer === opt.id || comp.settings.correctAnswers?.includes(opt.id) || false
                            }));
                        return {
                            id: comp.id,
                            sectionId: section.id,
                            type: "question",
                            order: comp.order,
                            settings: {
                                type: "question",
                                label: comp.label,
                                description: "",
                                questionType: comp.type,
                                placeholder: comp.placeholder || "",
                                required: comp.required,
                                choices: choices,
                                options: choices?.map((c)=>c.label),
                                correctAnswer: comp.settings.correctAnswer,
                                points: comp.settings.points,
                                enableAutoGrading: comp.settings.points !== undefined
                            },
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        };
                    }),
                    settings: {
                        visible: true,
                        skippable: false,
                        showProgress: true,
                        allowBackNavigation: true
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }));
            set({
                title: template.name,
                description: template.description,
                type: template.category === "exam" ? "quiz" : "survey",
                numberOfSections: template.totalSections,
                sections,
                currentSectionIndex: 0,
                currentStep: 2,
                requireAuth: !template.settings.allowAnonymous,
                allowEdit: template.settings.allowBackNavigation,
                showResults: template.settings.showResultsImmediately,
                allowMultipleResponses: false,
                requireSignature: false
            });
        },
        // Load User Template
        loadUserTemplate: (userTemplate)=>{
            if (!userTemplate) return;
            // User templates already have the correct Section format
            // No need for conversion like system templates
            set({
                title: userTemplate.name,
                description: userTemplate.description,
                type: userTemplate.type,
                numberOfSections: userTemplate.sections.length,
                sections: userTemplate.sections,
                currentSectionIndex: 0,
                currentStep: 2,
                requireAuth: userTemplate.settings.requireAuth ?? false,
                allowEdit: userTemplate.settings.allowEdit ?? false,
                showResults: userTemplate.settings.showResults ?? false,
                allowMultipleResponses: userTemplate.settings.allowMultipleResponses ?? false,
                requireSignature: userTemplate.settings.requireSignature ?? false,
                thankYouMessage: userTemplate.settings.thankYouMessage || getDefaultThankYouMessage(userTemplate.type),
                successMessage: userTemplate.settings.successMessage || "ممتاز! أداء رائع!",
                goodMessage: userTemplate.settings.goodMessage || "جيد جداً! استمر في التقدم",
                improvementMessage: userTemplate.settings.improvementMessage || "يحتاج إلى تحسين"
            });
        },
        // Reset
        reset: ()=>set(initialState)
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/data/templates-additional.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "additionalTemplates",
    ()=>additionalTemplates
]);
const additionalTemplates = [
    // Template 4: Registration Form
    {
        id: "registration-form",
        name: "نموذج تسجيل",
        description: "نموذج شامل لتسجيل المشاركين في الأحداث والفعاليات",
        category: "form",
        icon: "ClipboardList",
        totalQuestions: 10,
        totalSections: 3,
        estimatedTime: "5 دقائق",
        settings: {
            allowAnonymous: false,
            showProgressBar: true,
            shuffleQuestions: false,
            allowBackNavigation: true,
            showResultsImmediately: false
        },
        sections: [
            {
                id: "section-1",
                title: "المعلومات الشخصية",
                description: "معلومات أساسية عن المشارك",
                order: 0,
                components: [
                    {
                        id: "q1",
                        type: "short_text",
                        label: "الاسم الكامل",
                        placeholder: "أدخل اسمك الكامل",
                        required: true,
                        order: 0,
                        settings: {}
                    },
                    {
                        id: "q2",
                        type: "short_text",
                        label: "البريد الإلكتروني",
                        placeholder: "example@email.com",
                        required: true,
                        order: 1,
                        settings: {}
                    },
                    {
                        id: "q3",
                        type: "short_text",
                        label: "رقم الهاتف",
                        placeholder: "+966 5XX XXX XXX",
                        required: true,
                        order: 2,
                        settings: {}
                    },
                    {
                        id: "q4",
                        type: "single_choice",
                        label: "الجنس",
                        placeholder: "",
                        required: true,
                        order: 3,
                        settings: {
                            options: [
                                {
                                    id: "gender1",
                                    label: "ذكر",
                                    order: 0
                                },
                                {
                                    id: "gender2",
                                    label: "أنثى",
                                    order: 1
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: "section-2",
                title: "معلومات إضافية",
                description: "معلومات تساعدنا في تنظيم الحدث",
                order: 1,
                components: [
                    {
                        id: "q5",
                        type: "single_choice",
                        label: "كيف سمعت عن هذا الحدث؟",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "source1",
                                    label: "وسائل التواصل الاجتماعي",
                                    order: 0
                                },
                                {
                                    id: "source2",
                                    label: "صديق أو زميل",
                                    order: 1
                                },
                                {
                                    id: "source3",
                                    label: "البريد الإلكتروني",
                                    order: 2
                                },
                                {
                                    id: "source4",
                                    label: "موقع الويب",
                                    order: 3
                                },
                                {
                                    id: "source5",
                                    label: "أخرى",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q6",
                        type: "multiple_choice",
                        label: "ما هي اهتماماتك؟ (يمكن اختيار أكثر من إجابة)",
                        placeholder: "",
                        required: false,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "int1",
                                    label: "التكنولوجيا",
                                    order: 0
                                },
                                {
                                    id: "int2",
                                    label: "الأعمال",
                                    order: 1
                                },
                                {
                                    id: "int3",
                                    label: "التعليم",
                                    order: 2
                                },
                                {
                                    id: "int4",
                                    label: "الصحة",
                                    order: 3
                                },
                                {
                                    id: "int5",
                                    label: "الفنون",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q7",
                        type: "long_text",
                        label: "ملاحظات أو متطلبات خاصة",
                        placeholder: "اكتب أي ملاحظات أو متطلبات خاصة...",
                        required: false,
                        order: 2,
                        settings: {}
                    }
                ]
            },
            {
                id: "section-3",
                title: "الموافقة والشروط",
                description: "يرجى قراءة الشروط والموافقة عليها",
                order: 2,
                components: [
                    {
                        id: "q8",
                        type: "single_choice",
                        label: "أوافق على الشروط والأحكام",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "agree1",
                                    label: "نعم، أوافق",
                                    order: 0
                                },
                                {
                                    id: "agree2",
                                    label: "لا أوافق",
                                    order: 1
                                }
                            ]
                        }
                    },
                    {
                        id: "q9",
                        type: "single_choice",
                        label: "أوافق على تلقي رسائل بريد إلكتروني حول الأحداث القادمة",
                        placeholder: "",
                        required: false,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "email1",
                                    label: "نعم",
                                    order: 0
                                },
                                {
                                    id: "email2",
                                    label: "لا",
                                    order: 1
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    // Template 5: Customer Satisfaction
    {
        id: "customer-satisfaction",
        name: "استبيان رضا العملاء",
        description: "استبيان شامل لقياس مستوى رضا العملاء وتحسين الخدمات",
        category: "feedback",
        icon: "ThumbsUp",
        totalQuestions: 16,
        totalSections: 4,
        estimatedTime: "12 دقيقة",
        settings: {
            allowAnonymous: false,
            showProgressBar: true,
            shuffleQuestions: false,
            allowBackNavigation: true,
            showResultsImmediately: false
        },
        sections: [
            {
                id: "section-1",
                title: "التقييم العام",
                description: "تقييم شامل لتجربتك معنا",
                order: 0,
                components: [
                    {
                        id: "q1",
                        type: "single_choice",
                        label: "كيف تقيّم تجربتك الإجمالية معنا؟",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "exp1",
                                    label: "⭐⭐⭐⭐⭐ ممتازة",
                                    order: 0
                                },
                                {
                                    id: "exp2",
                                    label: "⭐⭐⭐⭐ جيدة جداً",
                                    order: 1
                                },
                                {
                                    id: "exp3",
                                    label: "⭐⭐⭐ جيدة",
                                    order: 2
                                },
                                {
                                    id: "exp4",
                                    label: "⭐⭐ مقبولة",
                                    order: 3
                                },
                                {
                                    id: "exp5",
                                    label: "⭐ سيئة",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q2",
                        type: "single_choice",
                        label: "هل تلبي منتجاتنا/خدماتنا توقعاتك؟",
                        placeholder: "",
                        required: true,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "meet1",
                                    label: "تتجاوز التوقعات",
                                    order: 0
                                },
                                {
                                    id: "meet2",
                                    label: "تلبي التوقعات",
                                    order: 1
                                },
                                {
                                    id: "meet3",
                                    label: "أقل من التوقعات",
                                    order: 2
                                },
                                {
                                    id: "meet4",
                                    label: "أقل بكثير من التوقعات",
                                    order: 3
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: "section-2",
                title: "تقييم تفصيلي",
                description: "قيّم جوانب محددة من خدماتنا",
                order: 1,
                components: [
                    {
                        id: "q3",
                        type: "single_choice",
                        label: "جودة المنتج/الخدمة",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "qual1",
                                    label: "⭐⭐⭐⭐⭐ ممتازة",
                                    order: 0
                                },
                                {
                                    id: "qual2",
                                    label: "⭐⭐⭐⭐ جيدة",
                                    order: 1
                                },
                                {
                                    id: "qual3",
                                    label: "⭐⭐⭐ متوسطة",
                                    order: 2
                                },
                                {
                                    id: "qual4",
                                    label: "⭐⭐ ضعيفة",
                                    order: 3
                                },
                                {
                                    id: "qual5",
                                    label: "⭐ سيئة جداً",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q4",
                        type: "single_choice",
                        label: "القيمة مقابل السعر",
                        placeholder: "",
                        required: true,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "value1",
                                    label: "⭐⭐⭐⭐⭐ ممتازة",
                                    order: 0
                                },
                                {
                                    id: "value2",
                                    label: "⭐⭐⭐⭐ جيدة",
                                    order: 1
                                },
                                {
                                    id: "value3",
                                    label: "⭐⭐⭐ متوسطة",
                                    order: 2
                                },
                                {
                                    id: "value4",
                                    label: "⭐⭐ ضعيفة",
                                    order: 3
                                },
                                {
                                    id: "value5",
                                    label: "⭐ سيئة",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q5",
                        type: "single_choice",
                        label: "خدمة العملاء",
                        placeholder: "",
                        required: true,
                        order: 2,
                        settings: {
                            options: [
                                {
                                    id: "serv1",
                                    label: "⭐⭐⭐⭐⭐ ممتازة",
                                    order: 0
                                },
                                {
                                    id: "serv2",
                                    label: "⭐⭐⭐⭐ جيدة",
                                    order: 1
                                },
                                {
                                    id: "serv3",
                                    label: "⭐⭐⭐ متوسطة",
                                    order: 2
                                },
                                {
                                    id: "serv4",
                                    label: "⭐⭐ ضعيفة",
                                    order: 3
                                },
                                {
                                    id: "serv5",
                                    label: "⭐ سيئة",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q6",
                        type: "single_choice",
                        label: "سهولة الاستخدام",
                        placeholder: "",
                        required: true,
                        order: 3,
                        settings: {
                            options: [
                                {
                                    id: "ease1",
                                    label: "⭐⭐⭐⭐⭐ سهل جداً",
                                    order: 0
                                },
                                {
                                    id: "ease2",
                                    label: "⭐⭐⭐⭐ سهل",
                                    order: 1
                                },
                                {
                                    id: "ease3",
                                    label: "⭐⭐⭐ متوسط",
                                    order: 2
                                },
                                {
                                    id: "ease4",
                                    label: "⭐⭐ صعب",
                                    order: 3
                                },
                                {
                                    id: "ease5",
                                    label: "⭐ صعب جداً",
                                    order: 4
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: "section-3",
                title: "الاقتراحات والتحسينات",
                description: "ساعدنا في تحسين خدماتنا",
                order: 2,
                components: [
                    {
                        id: "q7",
                        type: "long_text",
                        label: "ما الذي أعجبك أكثر في تجربتك معنا؟",
                        placeholder: "اكتب رأيك هنا...",
                        required: false,
                        order: 0,
                        settings: {}
                    },
                    {
                        id: "q8",
                        type: "long_text",
                        label: "ما الذي يمكننا تحسينه؟",
                        placeholder: "اكتب اقتراحاتك هنا...",
                        required: false,
                        order: 1,
                        settings: {}
                    }
                ]
            },
            {
                id: "section-4",
                title: "التوصية والولاء",
                description: "مدى احتمالية توصيتك بنا",
                order: 3,
                components: [
                    {
                        id: "q9",
                        type: "single_choice",
                        label: "ما مدى احتمالية أن توصي بنا لأصدقائك أو عائلتك؟",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "nps1",
                                    label: "10 - بالتأكيد سأوصي",
                                    order: 0
                                },
                                {
                                    id: "nps2",
                                    label: "9 - على الأرجح سأوصي",
                                    order: 1
                                },
                                {
                                    id: "nps3",
                                    label: "8 - ربما سأوصي",
                                    order: 2
                                },
                                {
                                    id: "nps4",
                                    label: "7 - محايد",
                                    order: 3
                                },
                                {
                                    id: "nps5",
                                    label: "6 أو أقل - لن أوصي",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q10",
                        type: "single_choice",
                        label: "هل ستستخدم خدماتنا مرة أخرى؟",
                        placeholder: "",
                        required: true,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "return1",
                                    label: "بالتأكيد نعم",
                                    order: 0
                                },
                                {
                                    id: "return2",
                                    label: "على الأرجح نعم",
                                    order: 1
                                },
                                {
                                    id: "return3",
                                    label: "ربما",
                                    order: 2
                                },
                                {
                                    id: "return4",
                                    label: "على الأرجح لا",
                                    order: 3
                                },
                                {
                                    id: "return5",
                                    label: "بالتأكيد لا",
                                    order: 4
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/data/templates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventTemplates",
    ()=>eventTemplates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$data$2f$templates$2d$additional$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/data/templates-additional.ts [app-client] (ecmascript)");
;
const eventTemplates = [
    // Template 1: Academic Exam
    {
        id: "academic-exam",
        name: "اختبار أكاديمي شامل",
        description: "اختبار كامل مع تصحيح تلقائي وتقييم فوري للطلاب",
        category: "exam",
        icon: "GraduationCap",
        totalQuestions: 30,
        totalSections: 3,
        estimatedTime: "45 دقيقة",
        settings: {
            allowAnonymous: false,
            showProgressBar: true,
            shuffleQuestions: true,
            allowBackNavigation: false,
            showResultsImmediately: true
        },
        sections: [
            {
                id: "section-1",
                title: "القسم الأول: أسئلة أساسية",
                description: "أسئلة اختيار من متعدد - 10 نقاط لكل سؤال",
                order: 0,
                components: Array.from({
                    length: 10
                }, (_, i)=>({
                        id: `q1-${i + 1}`,
                        type: "single_choice",
                        label: `السؤال ${i + 1}: ما هي الإجابة الصحيحة؟`,
                        placeholder: "",
                        required: true,
                        order: i,
                        settings: {
                            options: [
                                {
                                    id: `opt-${i}-1`,
                                    label: "الخيار الأول",
                                    order: 0
                                },
                                {
                                    id: `opt-${i}-2`,
                                    label: "الخيار الثاني",
                                    order: 1
                                },
                                {
                                    id: `opt-${i}-3`,
                                    label: "الخيار الثالث",
                                    order: 2
                                },
                                {
                                    id: `opt-${i}-4`,
                                    label: "الخيار الرابع",
                                    order: 3
                                }
                            ],
                            correctAnswer: `opt-${i}-1`,
                            points: 10
                        }
                    }))
            },
            {
                id: "section-2",
                title: "القسم الثاني: أسئلة متوسطة",
                description: "أسئلة اختيار من متعدد - 10 نقاط لكل سؤال",
                order: 1,
                components: Array.from({
                    length: 10
                }, (_, i)=>({
                        id: `q2-${i + 1}`,
                        type: "single_choice",
                        label: `السؤال ${i + 11}: اختر الإجابة الصحيحة`,
                        placeholder: "",
                        required: true,
                        order: i,
                        settings: {
                            options: [
                                {
                                    id: `opt2-${i}-1`,
                                    label: "الخيار الأول",
                                    order: 0
                                },
                                {
                                    id: `opt2-${i}-2`,
                                    label: "الخيار الثاني",
                                    order: 1
                                },
                                {
                                    id: `opt2-${i}-3`,
                                    label: "الخيار الثالث",
                                    order: 2
                                },
                                {
                                    id: `opt2-${i}-4`,
                                    label: "الخيار الرابع",
                                    order: 3
                                }
                            ],
                            correctAnswer: `opt2-${i}-1`,
                            points: 10
                        }
                    }))
            },
            {
                id: "section-3",
                title: "القسم الثالث: أسئلة متقدمة",
                description: "أسئلة اختيار من متعدد - 10 نقاط لكل سؤال",
                order: 2,
                components: Array.from({
                    length: 10
                }, (_, i)=>({
                        id: `q3-${i + 1}`,
                        type: "single_choice",
                        label: `السؤال ${i + 21}: حدد الإجابة الصحيحة`,
                        placeholder: "",
                        required: true,
                        order: i,
                        settings: {
                            options: [
                                {
                                    id: `opt3-${i}-1`,
                                    label: "الخيار الأول",
                                    order: 0
                                },
                                {
                                    id: `opt3-${i}-2`,
                                    label: "الخيار الثاني",
                                    order: 1
                                },
                                {
                                    id: `opt3-${i}-3`,
                                    label: "الخيار الثالث",
                                    order: 2
                                },
                                {
                                    id: `opt3-${i}-4`,
                                    label: "الخيار الرابع",
                                    order: 3
                                }
                            ],
                            correctAnswer: `opt3-${i}-1`,
                            points: 10
                        }
                    }))
            }
        ]
    },
    // Template 2: Rating Survey
    {
        id: "rating-survey",
        name: "استبيان تقييمات",
        description: "استبيان شامل لتقييم الخدمات والمنتجات مع أسئلة متنوعة",
        category: "survey",
        icon: "Star",
        totalQuestions: 15,
        totalSections: 4,
        estimatedTime: "10 دقائق",
        settings: {
            allowAnonymous: false,
            showProgressBar: true,
            shuffleQuestions: false,
            allowBackNavigation: true,
            showResultsImmediately: false
        },
        sections: [
            {
                id: "section-1",
                title: "معلومات عامة",
                description: "معلومات أساسية عن المشارك",
                order: 0,
                components: [
                    {
                        id: "q1",
                        type: "short_text",
                        label: "ما هو اسمك؟ (اختياري)",
                        placeholder: "أدخل اسمك",
                        required: false,
                        order: 0,
                        settings: {}
                    },
                    {
                        id: "q2",
                        type: "single_choice",
                        label: "كم مرة استخدمت خدماتنا؟",
                        placeholder: "",
                        required: true,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "opt1",
                                    label: "المرة الأولى",
                                    order: 0
                                },
                                {
                                    id: "opt2",
                                    label: "2-5 مرات",
                                    order: 1
                                },
                                {
                                    id: "opt3",
                                    label: "6-10 مرات",
                                    order: 2
                                },
                                {
                                    id: "opt4",
                                    label: "أكثر من 10 مرات",
                                    order: 3
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: "section-2",
                title: "تقييم الخدمة",
                description: "قيّم جودة الخدمة المقدمة",
                order: 1,
                components: [
                    {
                        id: "q3",
                        type: "single_choice",
                        label: "كيف تقيّم جودة الخدمة بشكل عام؟",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "rate1",
                                    label: "⭐ ضعيف جداً",
                                    order: 0
                                },
                                {
                                    id: "rate2",
                                    label: "⭐⭐ ضعيف",
                                    order: 1
                                },
                                {
                                    id: "rate3",
                                    label: "⭐⭐⭐ متوسط",
                                    order: 2
                                },
                                {
                                    id: "rate4",
                                    label: "⭐⭐⭐⭐ جيد",
                                    order: 3
                                },
                                {
                                    id: "rate5",
                                    label: "⭐⭐⭐⭐⭐ ممتاز",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q4",
                        type: "single_choice",
                        label: "كيف تقيّم سرعة الخدمة؟",
                        placeholder: "",
                        required: true,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "speed1",
                                    label: "⭐ بطيء جداً",
                                    order: 0
                                },
                                {
                                    id: "speed2",
                                    label: "⭐⭐ بطيء",
                                    order: 1
                                },
                                {
                                    id: "speed3",
                                    label: "⭐⭐⭐ متوسط",
                                    order: 2
                                },
                                {
                                    id: "speed4",
                                    label: "⭐⭐⭐⭐ سريع",
                                    order: 3
                                },
                                {
                                    id: "speed5",
                                    label: "⭐⭐⭐⭐⭐ سريع جداً",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q5",
                        type: "single_choice",
                        label: "كيف تقيّم التعامل مع فريق الدعم؟",
                        placeholder: "",
                        required: true,
                        order: 2,
                        settings: {
                            options: [
                                {
                                    id: "support1",
                                    label: "⭐ سيء جداً",
                                    order: 0
                                },
                                {
                                    id: "support2",
                                    label: "⭐⭐ سيء",
                                    order: 1
                                },
                                {
                                    id: "support3",
                                    label: "⭐⭐⭐ متوسط",
                                    order: 2
                                },
                                {
                                    id: "support4",
                                    label: "⭐⭐⭐⭐ جيد",
                                    order: 3
                                },
                                {
                                    id: "support5",
                                    label: "⭐⭐⭐⭐⭐ ممتاز",
                                    order: 4
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: "section-3",
                title: "ملاحظات وتعليقات",
                description: "شاركنا رأيك وملاحظاتك",
                order: 2,
                components: [
                    {
                        id: "q6",
                        type: "long_text",
                        label: "ما هي أكثر ميزة أعجبتك في خدماتنا؟",
                        placeholder: "اكتب رأيك هنا...",
                        required: false,
                        order: 0,
                        settings: {}
                    },
                    {
                        id: "q7",
                        type: "long_text",
                        label: "ما هي الأشياء التي تحتاج إلى تحسين؟",
                        placeholder: "اكتب اقتراحاتك هنا...",
                        required: false,
                        order: 1,
                        settings: {}
                    }
                ]
            },
            {
                id: "section-4",
                title: "التوصية",
                description: "هل ستوصي بخدماتنا؟",
                order: 3,
                components: [
                    {
                        id: "q8",
                        type: "single_choice",
                        label: "هل ستوصي بخدماتنا لأصدقائك؟",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "rec1",
                                    label: "بالتأكيد نعم",
                                    order: 0
                                },
                                {
                                    id: "rec2",
                                    label: "ربما",
                                    order: 1
                                },
                                {
                                    id: "rec3",
                                    label: "غير متأكد",
                                    order: 2
                                },
                                {
                                    id: "rec4",
                                    label: "على الأرجح لا",
                                    order: 3
                                },
                                {
                                    id: "rec5",
                                    label: "بالتأكيد لا",
                                    order: 4
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    // Template 3: Opinion Poll
    {
        id: "opinion-poll",
        name: "استبيان آراء عام",
        description: "استبيان لجمع آراء المستخدمين حول موضوع معين",
        category: "poll",
        icon: "MessageSquare",
        totalQuestions: 12,
        totalSections: 3,
        estimatedTime: "8 دقائق",
        settings: {
            allowAnonymous: false,
            showProgressBar: true,
            shuffleQuestions: false,
            allowBackNavigation: true,
            showResultsImmediately: false
        },
        sections: [
            {
                id: "section-1",
                title: "الآراء العامة",
                description: "شاركنا رأيك حول الموضوع",
                order: 0,
                components: [
                    {
                        id: "q1",
                        type: "single_choice",
                        label: "ما هو رأيك في الموضوع المطروح؟",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "op1",
                                    label: "موافق بشدة",
                                    order: 0
                                },
                                {
                                    id: "op2",
                                    label: "موافق",
                                    order: 1
                                },
                                {
                                    id: "op3",
                                    label: "محايد",
                                    order: 2
                                },
                                {
                                    id: "op4",
                                    label: "غير موافق",
                                    order: 3
                                },
                                {
                                    id: "op5",
                                    label: "غير موافق بشدة",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q2",
                        type: "multiple_choice",
                        label: "ما هي العوامل المؤثرة في رأيك؟ (يمكن اختيار أكثر من إجابة)",
                        placeholder: "",
                        required: true,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "fac1",
                                    label: "التجربة الشخصية",
                                    order: 0
                                },
                                {
                                    id: "fac2",
                                    label: "آراء الآخرين",
                                    order: 1
                                },
                                {
                                    id: "fac3",
                                    label: "المعلومات المتاحة",
                                    order: 2
                                },
                                {
                                    id: "fac4",
                                    label: "الأخبار والإعلام",
                                    order: 3
                                },
                                {
                                    id: "fac5",
                                    label: "أخرى",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q3",
                        type: "long_text",
                        label: "اشرح رأيك بالتفصيل",
                        placeholder: "اكتب رأيك هنا...",
                        required: false,
                        order: 2,
                        settings: {}
                    }
                ]
            },
            {
                id: "section-2",
                title: "التفاصيل والاقتراحات",
                description: "نريد معرفة المزيد عن رأيك",
                order: 1,
                components: [
                    {
                        id: "q4",
                        type: "single_choice",
                        label: "هل تعتقد أن هذا الموضوع مهم؟",
                        placeholder: "",
                        required: true,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "imp1",
                                    label: "مهم جداً",
                                    order: 0
                                },
                                {
                                    id: "imp2",
                                    label: "مهم",
                                    order: 1
                                },
                                {
                                    id: "imp3",
                                    label: "متوسط الأهمية",
                                    order: 2
                                },
                                {
                                    id: "imp4",
                                    label: "غير مهم",
                                    order: 3
                                }
                            ]
                        }
                    },
                    {
                        id: "q5",
                        type: "long_text",
                        label: "ما هي اقتراحاتك للتحسين؟",
                        placeholder: "اكتب اقتراحاتك هنا...",
                        required: false,
                        order: 1,
                        settings: {}
                    }
                ]
            },
            {
                id: "section-3",
                title: "معلومات ديموغرافية",
                description: "معلومات اختيارية لتحليل أفضل",
                order: 2,
                components: [
                    {
                        id: "q6",
                        type: "single_choice",
                        label: "الفئة العمرية",
                        placeholder: "",
                        required: false,
                        order: 0,
                        settings: {
                            options: [
                                {
                                    id: "age1",
                                    label: "أقل من 18",
                                    order: 0
                                },
                                {
                                    id: "age2",
                                    label: "18-25",
                                    order: 1
                                },
                                {
                                    id: "age3",
                                    label: "26-35",
                                    order: 2
                                },
                                {
                                    id: "age4",
                                    label: "36-50",
                                    order: 3
                                },
                                {
                                    id: "age5",
                                    label: "أكثر من 50",
                                    order: 4
                                }
                            ]
                        }
                    },
                    {
                        id: "q7",
                        type: "single_choice",
                        label: "المستوى التعليمي",
                        placeholder: "",
                        required: false,
                        order: 1,
                        settings: {
                            options: [
                                {
                                    id: "edu1",
                                    label: "ثانوي أو أقل",
                                    order: 0
                                },
                                {
                                    id: "edu2",
                                    label: "بكالوريوس",
                                    order: 1
                                },
                                {
                                    id: "edu3",
                                    label: "ماجستير",
                                    order: 2
                                },
                                {
                                    id: "edu4",
                                    label: "دكتوراه",
                                    order: 3
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    ...__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$data$2f$templates$2d$additional$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["additionalTemplates"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/hooks/use-toast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// hooks/use-toast.ts
// Simple toast hook using browser alert for now
// TODO: Replace with proper toast library later
__turbopack_context__.s([
    "useToast",
    ()=>useToast
]);
function useToast() {
    const toast = ({ title, description, variant })=>{
        const message = description ? `${title}\n${description}` : title;
        if (variant === "destructive") {
            alert(`❌ ${message}`);
        } else {
            alert(`✅ ${message}`);
        }
    };
    return {
        toast
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/app/dashboard/events/[id]/edit/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditEventPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/auth/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/store/eventsStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventBuilderStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/store/eventBuilderStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$create$2f$EventBuilderWizard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/events/create/EventBuilderWizard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$LoadingState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/dashboard/LoadingState.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function EditEventPageContent() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const eventId = params.id;
    const { currentEvent, fetchEventById, updateEvent, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventsStore"])();
    const { reset: resetBuilder, setTitle, setDescription, setType, setNumberOfSections, initializeSections, setStartDate, setEndDate, setRequireAuth, setAllowEdit, setShowResults, setAllowMultipleResponses, setRequireSignature } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventBuilderStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventBuilderStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditEventPageContent.useEffect": ()=>{
            if (eventId) {
                fetchEventById(eventId);
            }
        }
    }["EditEventPageContent.useEffect"], [
        eventId,
        fetchEventById
    ]);
    // Load event data into builder when event is fetched
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditEventPageContent.useEffect": ()=>{
            if (currentEvent && !isLoading) {
                // Reset builder first
                resetBuilder();
                // Set basic info
                setTitle(currentEvent.title);
                setDescription(currentEvent.description);
                setType(currentEvent.type);
                setNumberOfSections(currentEvent.sections?.length || 1);
                // Set settings
                if (currentEvent.startDate) setStartDate(currentEvent.startDate);
                if (currentEvent.endDate) setEndDate(currentEvent.endDate);
                setRequireAuth(currentEvent.settings?.requireLogin || false);
                setAllowEdit(currentEvent.settings?.allowEdit || false);
                setShowResults(currentEvent.settings?.showResultsToParticipants || false);
                setAllowMultipleResponses(currentEvent.settings?.allowMultipleResponses || false);
                setRequireSignature(currentEvent.settings?.requireSignature || false);
                // Initialize sections with existing data
                initializeSections();
                // Load sections and components
                if (currentEvent.sections && currentEvent.sections.length > 0) {
                    const builderStore = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventBuilderStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventBuilderStore"].getState();
                    builderStore.sections = currentEvent.sections.map({
                        "EditEventPageContent.useEffect": (section)=>({
                                ...section,
                                components: section.components || []
                            })
                    }["EditEventPageContent.useEffect"]);
                }
            }
        }
    }["EditEventPageContent.useEffect"], [
        currentEvent,
        isLoading,
        resetBuilder,
        setTitle,
        setDescription,
        setType,
        setNumberOfSections,
        setStartDate,
        setEndDate,
        setRequireAuth,
        setAllowEdit,
        setShowResults,
        setAllowMultipleResponses,
        setRequireSignature,
        initializeSections
    ]);
    const handleComplete = async ()=>{
        try {
            const builderStore = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventBuilderStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventBuilderStore"].getState();
            // Don't use buildEvent() for updates as it generates a new ID
            // Instead, construct the update data manually
            const updateData = {
                title: builderStore.title,
                description: builderStore.description,
                type: builderStore.type,
                sections: builderStore.sections.map((s)=>({
                        ...s,
                        eventId
                    })),
                settings: {
                    requireAuth: builderStore.requireAuth,
                    allowEdit: builderStore.allowEdit,
                    showResults: builderStore.showResults,
                    allowMultipleResponses: builderStore.allowMultipleResponses,
                    requireSignature: builderStore.requireSignature,
                    shuffleQuestions: false,
                    showProgressBar: true,
                    allowAnonymous: !builderStore.requireAuth
                },
                startDate: builderStore.startDate,
                endDate: builderStore.endDate,
                updatedAt: new Date().toISOString()
            };
            await updateEvent(eventId, updateData);
            router.push(`/dashboard/events/${eventId}`);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };
    if (isLoading || !currentEvent) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$dashboard$2f$LoadingState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: "جاري تحميل الحدث..."
            }, void 0, false, {
                fileName: "[project]/event-meena/app/dashboard/events/[id]/edit/page.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/event-meena/app/dashboard/events/[id]/edit/page.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$create$2f$EventBuilderWizard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            mode: "edit",
            eventId: eventId,
            onComplete: handleComplete
        }, void 0, false, {
            fileName: "[project]/event-meena/app/dashboard/events/[id]/edit/page.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/event-meena/app/dashboard/events/[id]/edit/page.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s(EditEventPageContent, "uaQ58vJuMqlkPGq2VGIMlrozz+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$eventBuilderStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventBuilderStore"]
    ];
});
_c = EditEventPageContent;
function EditEventPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditEventPageContent, {}, void 0, false, {
            fileName: "[project]/event-meena/app/dashboard/events/[id]/edit/page.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/event-meena/app/dashboard/events/[id]/edit/page.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_c1 = EditEventPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "EditEventPageContent");
__turbopack_context__.k.register(_c1, "EditEventPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=event-meena_347271f2._.js.map