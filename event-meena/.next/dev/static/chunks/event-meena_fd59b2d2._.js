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
"[project]/event-meena/components/landing/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/store/authStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Header() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userMenuOpen, setUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, isAuthenticated, logout, checkAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    // التحقق من الجلسة عند تحميل المكون
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            checkAuth();
        }
    }["Header.useEffect"], [
        checkAuth
    ]);
    const handleLogout = async ()=>{
        await logout();
        setUserMenuOpen(false);
        router.push("/");
    };
    const navigation = [
        {
            name: "الرئيسية",
            href: "#home"
        },
        {
            name: "المميزات",
            href: "#features"
        },
        {
            name: "كيف يعمل",
            href: "#how-it-works"
        },
        {
            name: "من نحن",
            href: "#about"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between h-16 lg:h-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center gap-2.5 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative bg-[#1a56db] p-2 rounded-xl group-hover:bg-[#1648c7] transition-colors duration-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-6 h-6 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                            lineNumber: 42,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-gray-900",
                                        children: [
                                            "Event ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#1a56db]",
                                                children: "Meena"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                lineNumber: 45,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center gap-8",
                            children: navigation.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "text-gray-700 hover:text-[#1a56db] font-medium transition-colors duration-200 relative group",
                                    children: [
                                        item.name,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute bottom-0 right-0 w-0 h-0.5 bg-[#1a56db] group-hover:w-full transition-all duration-300"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.name, true, {
                                    fileName: "[project]/event-meena/components/landing/Header.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center gap-3",
                            children: isAuthenticated && user ? // قائمة المستخدم
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setUserMenuOpen(!userMenuOpen),
                                        className: "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-9 h-9 rounded-full bg-[#1a56db] text-white flex items-center justify-center font-semibold",
                                                children: user.name.charAt(0)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                lineNumber: 73,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-700 font-medium",
                                                children: user.name
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: `w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this),
                                    userMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                className: "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors",
                                                onClick: ()=>setUserMenuOpen(false),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "لوحة التحكم"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                lineNumber: 83,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                                className: "my-2 border-gray-200"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                lineNumber: 91,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleLogout,
                                                className: "flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "تسجيل الخروج"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                lineNumber: 92,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                        lineNumber: 82,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this) : // أزرار تسجيل الدخول والتسجيل
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "text-gray-600 hover:text-[#1a56db] font-medium px-4 py-2 transition-colors",
                                        children: "تسجيل الدخول"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                        lineNumber: 105,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/signup",
                                        className: "bg-[#1a56db] hover:bg-[#1648c7] text-white rounded-xl px-6 py-2.5 font-medium transition-colors duration-200",
                                        children: "ابدأ الآن مجاناً"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors",
                            onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                            children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                lineNumber: 130,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/landing/Header.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: [
                            navigation.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "text-gray-700 hover:text-[#1a56db] font-medium transition-colors duration-200 py-2",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    children: item.name
                                }, item.name, false, {
                                    fileName: "[project]/event-meena/components/landing/Header.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 pt-4 border-t border-gray-200",
                                children: isAuthenticated && user ? // معلومات المستخدم وأزرار
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 rounded-full bg-[#1a56db] text-white flex items-center justify-center font-semibold",
                                                    children: user.name.charAt(0)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-gray-900",
                                                            children: user.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500",
                                                            children: user.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                            lineNumber: 154,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard",
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 23
                                                }, this),
                                                "لوحة التحكم"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                            lineNumber: 163,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                handleLogout();
                                                setMobileMenuOpen(false);
                                            },
                                            className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Header.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 23
                                                }, this),
                                                "تسجيل الخروج"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                            lineNumber: 171,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true) : // أزرار تسجيل الدخول والتسجيل
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors",
                                            children: "تسجيل الدخول"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                            lineNumber: 185,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/signup",
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "w-full flex items-center justify-center px-4 py-2.5 bg-[#1a56db] hover:bg-[#1648c7] text-white rounded-lg font-medium transition-colors",
                                            children: "ابدأ الآن مجاناً"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/Header.tsx",
                                            lineNumber: 192,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/landing/Header.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/landing/Header.tsx",
                        lineNumber: 138,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/landing/Header.tsx",
                    lineNumber: 137,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/event-meena/components/landing/Header.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/event-meena/components/landing/Header.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(Header, "p+UVYNd6SIjl3PhQ5iUim8vKs3E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/landing/HeroSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function HeroSection() {
    _s();
    const [animationPhase, setAnimationPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroSection.useEffect": ()=>{
            // تشغيل الـ animation تلقائياً
            const phases = [
                0,
                1,
                2,
                3,
                4,
                5
            ];
            let currentIndex = 0;
            const interval = setInterval({
                "HeroSection.useEffect.interval": ()=>{
                    currentIndex = (currentIndex + 1) % phases.length;
                    setAnimationPhase(phases[currentIndex]);
                }
            }["HeroSection.useEffect.interval"], 2000);
            return ({
                "HeroSection.useEffect": ()=>clearInterval(interval)
            })["HeroSection.useEffect"];
        }
    }["HeroSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "home",
        className: "relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-gray-50/50 to-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center lg:text-right space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-primary text-sm font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 37,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "منصة إنشاء الأحداث التفاعلية الأولى عربياً"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 38,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight",
                                    children: [
                                        "أنشئ",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-primary",
                                            children: "حدثك التفاعلي"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this),
                                        "في دقائق معدودة"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0",
                                    children: "منصة احترافية لإنشاء الاستبيانات، الاختبارات، والنماذج التفاعلية بطريقة سهلة وسريعة. صمم، شارك، وحلل النتائج بكل سهولة."
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard/events/new",
                                            className: "inline-flex items-center justify-center gap-2 bg-[#1a56db] hover:bg-[#1648c7] text-white text-lg font-medium px-8 py-4 rounded-xl transition-colors duration-200 group",
                                            children: [
                                                "ابدأ الآن مجاناً",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard/events/templates",
                                            className: "inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-lg font-medium px-8 py-4 rounded-xl transition-colors duration-200",
                                            children: "استعرض القوالب"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-6 pt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center lg:text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold text-gray-900",
                                                    children: "+10K"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600 mt-1",
                                                    children: "مستخدم نشط"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center lg:text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold text-gray-900",
                                                    children: "+50K"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600 mt-1",
                                                    children: "حدث تم إنشاؤه"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center lg:text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold text-gray-900",
                                                    children: "+200K"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600 mt-1",
                                                    children: "مشارك"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-gentle-float",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-6 pb-4 border-b border-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 bg-[#1a56db] rounded-xl flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                className: "w-5 h-5 text-white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-bold text-gray-900 text-sm",
                                                                    children: "استبيان رضا العملاء"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                    lineNumber: 100,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: "يتم البناء..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                    lineNumber: 101,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                            className: "w-3 h-3 text-red-400 fill-red-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 105,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                            className: "w-3 h-3 text-yellow-400 fill-yellow-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                            className: "w-3 h-3 text-green-400 fill-green-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `transition-all duration-500 ${animationPhase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 mb-1.5 font-medium",
                                                            children: "سؤال نصي"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 115,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gray-50 rounded-lg p-3 border border-gray-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-800 font-medium",
                                                                    children: "ما رأيك في خدماتنا؟"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                    lineNumber: 117,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 h-8 bg-white rounded border border-gray-300 flex items-center px-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-400 text-xs",
                                                                        children: "اكتب إجابتك هنا..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                        lineNumber: 119,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                    lineNumber: 118,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 116,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `transition-all duration-500 delay-100 ${animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 mb-1.5 font-medium",
                                                            children: "اختيار من متعدد"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gray-50 rounded-lg p-3 border border-gray-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-800 font-medium mb-2",
                                                                    children: "كيف عرفت عنا؟"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                    lineNumber: 128,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-1.5",
                                                                    children: [
                                                                        'وسائل التواصل',
                                                                        'صديق أو زميل',
                                                                        'محرك البحث'
                                                                    ].map((option, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `flex items-center gap-2 p-2 bg-white rounded border transition-all duration-300 ${animationPhase >= 2 && i === 0 ? 'border-[#1a56db] bg-blue-50' : 'border-gray-300'}`,
                                                                            style: {
                                                                                transitionDelay: `${i * 100}ms`
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: `w-4 h-4 rounded-full border-2 flex items-center justify-center ${animationPhase >= 2 && i === 0 ? 'border-[#1a56db]' : 'border-gray-400'}`,
                                                                                    children: animationPhase >= 2 && i === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-2 h-2 rounded-full bg-[#1a56db]"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                                        lineNumber: 146,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                                    lineNumber: 140,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs text-gray-700",
                                                                                    children: option
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                                    lineNumber: 149,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, i, true, {
                                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                            lineNumber: 131,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                    lineNumber: 129,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 127,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `transition-all duration-500 delay-200 ${animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 mb-1.5 font-medium",
                                                            children: "تقييم بالنجوم"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gray-50 rounded-lg p-3 border border-gray-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-800 font-medium mb-2",
                                                                    children: "قيّم تجربتك معنا"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                    lineNumber: 160,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-1",
                                                                    children: [
                                                                        1,
                                                                        2,
                                                                        3,
                                                                        4,
                                                                        5
                                                                    ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                            className: `w-6 h-6 transition-all duration-300 ${animationPhase >= 4 && star <= 4 ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-gray-300'}`,
                                                                            style: {
                                                                                transitionDelay: `${star * 100}ms`
                                                                            }
                                                                        }, star, false, {
                                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                            lineNumber: 163,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                    lineNumber: 161,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `transition-all duration-500 delay-300 ${animationPhase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "w-full bg-[#1a56db] text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                                lineNumber: 180,
                                                                columnNumber: 21
                                                            }, this),
                                                            "إرسال الاستبيان"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-4 -left-4 bg-white rounded-xl shadow-md p-3 border border-gray-200 animate-gentle-float",
                                    style: {
                                        animationDelay: '0.5s'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                    className: "w-4 h-4 text-green-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-bold text-gray-800",
                                                        children: "+234 رد"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-gray-500",
                                                        children: "هذا الأسبوع"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-4 -right-4 bg-white rounded-xl shadow-md p-3 border border-gray-200 animate-gentle-float",
                                    style: {
                                        animationDelay: '1s'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                    className: "w-4 h-4 text-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-bold text-gray-800",
                                                        children: "87% إكمال"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-gray-500",
                                                        children: "معدل الاستجابة"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/landing/HeroSection.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(HeroSection, "NhHhpksj6EzvoqX5wGiKsG1RyNA=");
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
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
"[project]/event-meena/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/event-meena/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/event-meena/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/event-meena/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/event-meena/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/event-meena/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/event-meena/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/event-meena/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/landing/FeaturesSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeaturesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$click$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointerClick$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/mouse-pointer-click.js [app-client] (ecmascript) <export default as MousePointerClick>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/file-down.js [app-client] (ecmascript) <export default as FileDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
"use client";
;
;
;
const features = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$click$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointerClick$3e$__["MousePointerClick"],
        title: "تصميم سهل بالسحب والإفلات",
        description: "أنشئ أحداثك التفاعلية بكل سهولة من خلال واجهة سحب وإفلات بديهية. لا حاجة لخبرة تقنية!",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"],
        title: "مشاركة ذكية ومرنة",
        description: "شارك أحداثك عبر رابط مباشر أو أرسلها لجهات اتصال محددة ومجموعات بكل سهولة.",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50",
        iconColor: "text-green-600"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
        title: "تحليل ذكي للنتائج",
        description: "احصل على تحليلات فورية ورسوم بيانية تفاعلية لفهم نتائج أحداثك بشكل أفضل.",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__["FileDown"],
        title: "تصدير احترافي للتقارير",
        description: "صدّر نتائجك كملفات PDF مخصصة بالكامل مع شعارك وألوانك الخاصة.",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        iconColor: "text-orange-600"
    }
];
function FeaturesSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "features",
        className: "py-20 lg:py-28 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-3xl mx-auto mb-14",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[#1a56db] text-sm font-medium mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "المميزات"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6",
                            children: [
                                "كل ما تحتاجه لإنشاء",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#1a56db]",
                                    children: "أحداث تفاعلية مميزة"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-gray-600 leading-relaxed",
                            children: "منصة متكاملة توفر لك جميع الأدوات اللازمة لإنشاء ومشاركة وتحليل أحداثك التفاعلية"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
                    children: features.map((feature, index)=>{
                        const Icon = feature.icon;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "relative p-6 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: `w-6 h-6 ${feature.iconColor}`
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                            lineNumber: 79,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                        lineNumber: 78,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-gray-900 group-hover:text-[#1a56db] transition-colors duration-300",
                                        children: feature.title
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                        lineNumber: 83,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 text-sm leading-relaxed",
                                        children: feature.description
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                        lineNumber: 88,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-0.5 w-0 group-hover:w-12 bg-gradient-to-r ${feature.color} rounded-full transition-all duration-500`
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                            lineNumber: 94,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                        lineNumber: 93,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                lineNumber: 76,
                                columnNumber: 17
                            }, this)
                        }, index, false, {
                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                            lineNumber: 72,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-16 grid md:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        className: "w-6 h-6 text-[#1a56db]"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-gray-900",
                                    children: "سريع وسهل"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: "أنشئ حدثك في أقل من 5 دقائق"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-6 h-6 text-[#1a56db]"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-gray-900",
                                    children: "تصميم احترافي"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: "قوالب جاهزة وتصميمات عصرية"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                        className: "w-6 h-6 text-[#1a56db]"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-gray-900",
                                    children: "تحليلات متقدمة"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: "رؤى عميقة لفهم جمهورك"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/event-meena/components/landing/FeaturesSection.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c = FeaturesSection;
var _c;
__turbopack_context__.k.register(_c, "FeaturesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/landing/HowItWorksSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HowItWorksSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/pen-tool.js [app-client] (ecmascript) <export default as PenTool>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
"use client";
;
;
;
;
const steps = [
    {
        number: "01",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"],
        title: "صمم حدثك",
        description: "اختر من القوالب الجاهزة أو ابدأ من الصفر. أضف الأسئلة والمكونات بسهولة من خلال السحب والإفلات.",
        features: [
            "قوالب جاهزة",
            "سحب وإفلات",
            "مكونات متنوعة"
        ],
        color: "from-blue-500 to-blue-600"
    },
    {
        number: "02",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
        title: "خصص الإعدادات",
        description: "حدد مدة الحدث، نوع المشاركة، وخصص رسالة الشكر. اجعل حدثك مميزاً بلمستك الخاصة.",
        features: [
            "تحديد المدة",
            "خيارات المشاركة",
            "رسائل مخصصة"
        ],
        color: "from-purple-500 to-purple-600"
    },
    {
        number: "03",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"],
        title: "شارك وانشر",
        description: "احصل على رابط مباشر أو أرسل الحدث لجهات اتصال محددة. شارك عبر البريد أو وسائل التواصل.",
        features: [
            "رابط مباشر",
            "إرسال للمجموعات",
            "مشاركة سهلة"
        ],
        color: "from-green-500 to-green-600"
    },
    {
        number: "04",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
        title: "حلل النتائج",
        description: "تابع الردود لحظياً، احصل على تحليلات تفصيلية، وصدّر التقارير بصيغة PDF احترافية.",
        features: [
            "تحليل فوري",
            "رسوم بيانية",
            "تصدير PDF"
        ],
        color: "from-orange-500 to-orange-600"
    }
];
function HowItWorksSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "how-it-works",
        className: "py-20 lg:py-28 bg-gray-50 relative overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-3xl mx-auto mb-14",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[#1a56db] text-sm font-medium mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "كيف يعمل"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6",
                            children: [
                                "أربع خطوات بسيطة",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#1a56db]",
                                    children: "لحدث تفاعلي ناجح"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-gray-600 leading-relaxed",
                            children: "من الفكرة إلى النتائج في دقائق معدودة"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-y-1/2 -z-10"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid lg:grid-cols-4 gap-6",
                            children: steps.map((step, index)=>{
                                const Icon = step.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md h-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "p-6 space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-30 transition-opacity`,
                                                                children: step.number
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                                lineNumber: 83,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-11 h-11 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                    className: "w-5 h-5 text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                                    lineNumber: 87,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                                lineNumber: 86,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-bold text-gray-900 group-hover:text-[#1a56db] transition-colors",
                                                        children: step.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-600 leading-relaxed text-sm",
                                                        children: step.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-1.5 pt-2",
                                                        children: step.features.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2 text-sm text-gray-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        className: "w-3.5 h-3.5 text-green-500 flex-shrink-0"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                                        lineNumber: 105,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: feature
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                                        lineNumber: 106,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                lineNumber: 80,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                            lineNumber: 79,
                                            columnNumber: 19
                                        }, this),
                                        index < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden lg:block absolute top-1/2 -left-3 -translate-y-1/2 z-10",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-6 h-6 bg-white rounded-full border border-gray-300 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                    className: "w-3 h-3 text-gray-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                                lineNumber: 116,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                            lineNumber: 115,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                    lineNumber: 78,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-14 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center sm:text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-gray-900 mb-1",
                                        children: "جاهز للبدء؟"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 text-sm",
                                        children: "أنشئ حدثك الأول الآن مجاناً"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/events/new",
                                className: "inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1a56db] hover:bg-[#1648c7] text-white font-bold rounded-xl transition-colors duration-200 group",
                                children: [
                                    "ابدأ الآن",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/event-meena/components/landing/HowItWorksSection.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = HowItWorksSection;
var _c;
__turbopack_context__.k.register(_c, "HowItWorksSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/landing/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>");
"use client";
;
;
;
function Footer() {
    const currentYear = new Date().getFullYear();
    const footerLinks = {
        product: [
            {
                name: "المميزات",
                href: "#features"
            },
            {
                name: "كيف يعمل",
                href: "#how-it-works"
            },
            {
                name: "الأسعار",
                href: "#pricing"
            },
            {
                name: "القوالب",
                href: "/dashboard/events/templates"
            }
        ],
        company: [
            {
                name: "من نحن",
                href: "#about"
            },
            {
                name: "المدونة",
                href: "#blog"
            },
            {
                name: "الوظائف",
                href: "#careers"
            },
            {
                name: "اتصل بنا",
                href: "#contact"
            }
        ],
        legal: [
            {
                name: "الشروط والأحكام",
                href: "#terms"
            },
            {
                name: "سياسة الخصوصية",
                href: "#privacy"
            },
            {
                name: "سياسة الاستخدام",
                href: "#usage"
            },
            {
                name: "الأسئلة الشائعة",
                href: "#faq"
            }
        ]
    };
    const socialLinks = [
        {
            name: "Facebook",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"],
            href: "#",
            color: "hover:text-blue-600"
        },
        {
            name: "Twitter",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"],
            href: "#",
            color: "hover:text-sky-500"
        },
        {
            name: "Instagram",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"],
            href: "#",
            color: "hover:text-pink-600"
        },
        {
            name: "LinkedIn",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__["Linkedin"],
            href: "#",
            color: "hover:text-blue-700"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-gray-900 text-gray-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center gap-2.5 group w-fit",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#1a56db] p-2 rounded-xl",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "w-6 h-6 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                lineNumber: 47,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl font-bold text-white",
                                            children: [
                                                "Event ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#3b82f6]",
                                                    children: "Meena"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 leading-relaxed max-w-md",
                                    children: "منصة احترافية لإنشاء الاستبيانات والاختبارات والنماذج التفاعلية. صمم، شارك، وحلل بكل سهولة."
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 text-gray-400 hover:text-[#3b82f6] transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    className: "w-5 h-5 flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "mailto:info@eventmeena.com",
                                                    children: "info@eventmeena.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 text-gray-400 hover:text-[#3b82f6] transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                    className: "w-5 h-5 flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "tel:+966500000000",
                                                    dir: "ltr",
                                                    children: "+966 50 000 0000"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 text-gray-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "w-5 h-5 flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "الرياض، المملكة العربية السعودية"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-white font-bold text-lg mb-4",
                                    children: "المنتج"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: footerLinks.product.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-gray-400 hover:text-[#3b82f6] transition-colors duration-200",
                                                children: link.name
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                lineNumber: 83,
                                                columnNumber: 19
                                            }, this)
                                        }, link.name, false, {
                                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-white font-bold text-lg mb-4",
                                    children: "الشركة"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: footerLinks.company.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-gray-400 hover:text-[#3b82f6] transition-colors duration-200",
                                                children: link.name
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, this)
                                        }, link.name, false, {
                                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-white font-bold text-lg mb-4",
                                    children: "القانونية"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: footerLinks.legal.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-gray-400 hover:text-[#3b82f6] transition-colors duration-200",
                                                children: link.name
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                                lineNumber: 117,
                                                columnNumber: 19
                                            }, this)
                                        }, link.name, false, {
                                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/landing/Footer.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-800"
            }, void 0, false, {
                fileName: "[project]/event-meena/components/landing/Footer.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6 lg:px-8 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400 text-sm text-center md:text-right",
                            suppressHydrationWarning: true,
                            children: [
                                "© ",
                                currentYear,
                                " Event Meena. جميع الحقوق محفوظة."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: socialLinks.map((social)=>{
                                const Icon = social.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: social.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: `w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:bg-gray-700 transition-colors duration-200`,
                                    "aria-label": social.name,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                        lineNumber: 154,
                                        columnNumber: 19
                                    }, this)
                                }, social.name, false, {
                                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                                    lineNumber: 146,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/landing/Footer.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/landing/Footer.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/landing/Footer.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/landing/Footer.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=event-meena_fd59b2d2._.js.map