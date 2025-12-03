(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Background Settings Panel for Title Element
 * 
 * Provides comprehensive background customization controls including:
 * - Background type selection (none, solid, gradient, semi-transparent)
 * - Color pickers for solid and gradient backgrounds
 * - Opacity slider
 * - Border controls (width, color, radius, style)
 * - Shadow controls (enabled, color, blur, offset)
 * - Preset background styles
 * 
 * @version 1.0.0
 * @date 2025-11-13
 */ __turbopack_context__.s([
    "BackgroundSettingsPanel",
    ()=>BackgroundSettingsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
"use client";
;
;
;
;
;
;
;
;
const PRESET_BACKGROUNDS = [
    {
        name: 'احترافي داكن',
        style: {
            type: 'gradient',
            opacity: 1,
            gradient: {
                type: 'linear',
                angle: 135,
                startColor: '#1e293b',
                endColor: '#334155'
            },
            border: {
                width: 0,
                color: '#e5e7eb',
                radius: 12,
                style: 'none'
            },
            shadow: {
                enabled: true,
                color: 'rgba(0, 0, 0, 0.1)',
                blur: 12,
                offsetX: 0,
                offsetY: 4
            }
        }
    },
    {
        name: 'أزرق حديث',
        style: {
            type: 'gradient',
            opacity: 1,
            gradient: {
                type: 'linear',
                angle: 135,
                startColor: '#3b82f6',
                endColor: '#1e40af'
            },
            border: {
                width: 0,
                color: '#e5e7eb',
                radius: 12,
                style: 'none'
            },
            shadow: {
                enabled: true,
                color: 'rgba(59, 130, 246, 0.3)',
                blur: 16,
                offsetX: 0,
                offsetY: 4
            }
        }
    },
    {
        name: 'بنفسجي أنيق',
        style: {
            type: 'gradient',
            opacity: 1,
            gradient: {
                type: 'linear',
                angle: 135,
                startColor: '#8b5cf6',
                endColor: '#6d28d9'
            },
            border: {
                width: 0,
                color: '#e5e7eb',
                radius: 12,
                style: 'none'
            },
            shadow: {
                enabled: true,
                color: 'rgba(139, 92, 246, 0.3)',
                blur: 16,
                offsetX: 0,
                offsetY: 4
            }
        }
    },
    {
        name: 'شفاف خفيف',
        style: {
            type: 'semi-transparent',
            solidColor: '#ffffff',
            opacity: 0.9,
            border: {
                width: 2,
                color: '#e5e7eb',
                radius: 12,
                style: 'solid'
            },
            shadow: {
                enabled: true,
                color: 'rgba(0, 0, 0, 0.05)',
                blur: 8,
                offsetX: 0,
                offsetY: 2
            }
        }
    },
    {
        name: 'بدون خلفية',
        style: {
            type: 'none',
            opacity: 1,
            border: {
                width: 0,
                color: 'transparent',
                radius: 0,
                style: 'none'
            },
            shadow: {
                enabled: false,
                color: 'rgba(0, 0, 0, 0)',
                blur: 0,
                offsetX: 0,
                offsetY: 0
            }
        }
    }
];
function BackgroundSettingsPanel({ background, onUpdate, onClose, tableHeaderColor }) {
    const updateBackground = (updates)=>{
        onUpdate({
            ...background,
            ...updates
        });
    };
    const updateGradient = (updates)=>{
        onUpdate({
            ...background,
            gradient: {
                ...background.gradient,
                ...updates
            }
        });
    };
    const updateBorder = (updates)=>{
        onUpdate({
            ...background,
            border: {
                ...background.border,
                ...updates
            }
        });
    };
    const updateShadow = (updates)=>{
        onUpdate({
            ...background,
            shadow: {
                ...background.shadow,
                ...updates
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-16 left-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-4 border-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-sm",
                        children: "إعدادات الخلفية"
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: onClose,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                className: "h-[500px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs",
                                    children: "نوع الخلفية"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                    value: background.type,
                                    onValueChange: (value)=>updateBackground({
                                            type: value
                                        }),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 176,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "none",
                                                    children: "بدون خلفية"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "solid",
                                                    children: "لون صلب"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "gradient",
                                                    children: "تدرج لوني"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "semi-transparent",
                                                    children: "شفاف"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        (background.type === 'solid' || background.type === 'semi-transparent') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs",
                                    children: "اللون"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "color",
                                            value: background.solidColor || '#1e293b',
                                            onChange: (e)=>updateBackground({
                                                    solidColor: e.target.value
                                                }),
                                            className: "w-full h-10 rounded cursor-pointer"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: background.solidColor || '#1e293b',
                                            onChange: (e)=>updateBackground({
                                                    solidColor: e.target.value
                                                }),
                                            className: "w-24 px-2 text-xs border rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 190,
                            columnNumber: 13
                        }, this),
                        background.type !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs",
                                            children: "الشفافية"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-500",
                                            children: [
                                                Math.round((background.opacity ?? 1) * 100),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                    value: [
                                        (background.opacity ?? 1) * 100
                                    ],
                                    onValueChange: ([value])=>updateBackground({
                                            opacity: value / 100
                                        }),
                                    min: 0,
                                    max: 100,
                                    step: 1
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this),
                        background.type === 'gradient' && background.gradient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs font-semibold",
                                            children: "إعدادات التدرج"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs",
                                                    children: "نوع التدرج"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: background.gradient.type,
                                                    onValueChange: (value)=>updateGradient({
                                                            type: value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                                lineNumber: 243,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 242,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "linear",
                                                                    children: "خطي"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                                    lineNumber: 246,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "radial",
                                                                    children: "دائري"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                                    lineNumber: 247,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 245,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs",
                                                    children: "اللون الأول"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "color",
                                                    value: background.gradient.startColor,
                                                    onChange: (e)=>updateGradient({
                                                            startColor: e.target.value
                                                        }),
                                                    className: "w-full h-10 rounded cursor-pointer"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 253,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs",
                                                    children: "اللون الثاني"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "color",
                                                    value: background.gradient.endColor,
                                                    onChange: (e)=>updateGradient({
                                                            endColor: e.target.value
                                                        }),
                                                    className: "w-full h-10 rounded cursor-pointer"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this),
                                        background.gradient.type === 'linear' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            className: "text-xs",
                                                            children: "الزاوية"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 278,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500",
                                                            children: [
                                                                background.gradient.angle || 135,
                                                                "°"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                    value: [
                                                        background.gradient.angle || 135
                                                    ],
                                                    onValueChange: ([value])=>updateGradient({
                                                            angle: value
                                                        }),
                                                    min: 0,
                                                    max: 360,
                                                    step: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 276,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 295,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs font-semibold",
                                    children: "إعدادات الحدود"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs",
                                            children: "نمط الحد"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 301,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: background.border?.style || 'none',
                                            onValueChange: (value)=>updateBorder({
                                                    style: value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "none",
                                                            children: "بدون"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "solid",
                                                            children: "صلب"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "dashed",
                                                            children: "متقطع"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "dotted",
                                                            children: "منقط"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 302,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 300,
                                    columnNumber: 13
                                }, this),
                                background.border?.style !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            className: "text-xs",
                                                            children: "سمك الحد"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500",
                                                            children: [
                                                                background.border?.width || 0,
                                                                "px"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                    value: [
                                                        background.border?.width || 0
                                                    ],
                                                    onValueChange: ([value])=>updateBorder({
                                                            width: value
                                                        }),
                                                    min: 0,
                                                    max: 10,
                                                    step: 1
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 321,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs",
                                                    children: "لون الحد"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "color",
                                                    value: background.border?.color || '#e5e7eb',
                                                    onChange: (e)=>updateBorder({
                                                            color: e.target.value
                                                        }),
                                                    className: "w-full h-10 rounded cursor-pointer"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs",
                                                    children: "استدارة الزوايا"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500",
                                                    children: [
                                                        background.border?.radius || 0,
                                                        "px"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                            value: [
                                                background.border?.radius || 0
                                            ],
                                            onValueChange: ([value])=>updateBorder({
                                                    radius: value
                                                }),
                                            min: 0,
                                            max: 50,
                                            step: 2
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 354,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 296,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 365,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs font-semibold",
                                            children: "الظل"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 368,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: background.shadow?.enabled ? "default" : "outline",
                                            size: "sm",
                                            onClick: ()=>updateShadow({
                                                    enabled: !background.shadow?.enabled
                                                }),
                                            children: background.shadow?.enabled ? 'مفعّل' : 'معطّل'
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 369,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, this),
                                background.shadow?.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            className: "text-xs",
                                                            children: "التمويه"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 383,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500",
                                                            children: [
                                                                background.shadow?.blur || 0,
                                                                "px"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 384,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                    value: [
                                                        background.shadow?.blur || 0
                                                    ],
                                                    onValueChange: ([value])=>updateShadow({
                                                            blur: value
                                                        }),
                                                    min: 0,
                                                    max: 50,
                                                    step: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 381,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            className: "text-xs",
                                                            children: "الإزاحة الأفقية"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 398,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500",
                                                            children: [
                                                                background.shadow?.offsetX || 0,
                                                                "px"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 399,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                    value: [
                                                        background.shadow?.offsetX || 0
                                                    ],
                                                    onValueChange: ([value])=>updateShadow({
                                                            offsetX: value
                                                        }),
                                                    min: -20,
                                                    max: 20,
                                                    step: 1
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 396,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            className: "text-xs",
                                                            children: "الإزاحة العمودية"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500",
                                                            children: [
                                                                background.shadow?.offsetY || 0,
                                                                "px"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                            lineNumber: 414,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                    value: [
                                                        background.shadow?.offsetY || 0
                                                    ],
                                                    onValueChange: ([value])=>updateShadow({
                                                            offsetY: value
                                                        }),
                                                    min: -20,
                                                    max: 20,
                                                    step: 1
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 411,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 429,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs font-semibold",
                                    children: "أنماط جاهزة"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 431,
                                    columnNumber: 13
                                }, this),
                                tableHeaderColor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "default",
                                    size: "sm",
                                    onClick: ()=>{
                                        onUpdate({
                                            type: 'solid',
                                            solidColor: tableHeaderColor,
                                            opacity: 1,
                                            border: {
                                                width: 0,
                                                color: 'transparent',
                                                radius: 12,
                                                style: 'none'
                                            },
                                            shadow: {
                                                enabled: true,
                                                color: 'rgba(0, 0, 0, 0.1)',
                                                blur: 12,
                                                offsetX: 0,
                                                offsetY: 4
                                            }
                                        });
                                    },
                                    className: "w-full text-xs",
                                    children: "🎨 مطابقة لون الجداول"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 435,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: PRESET_BACKGROUNDS.map((preset, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: ()=>onUpdate(preset.style),
                                            className: "text-xs",
                                            children: preset.name
                                        }, index, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                            lineNumber: 455,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                                    lineNumber: 453,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                            lineNumber: 430,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_c = BackgroundSettingsPanel;
var _c;
__turbopack_context__.k.register(_c, "BackgroundSettingsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Transform Control Panel
 * 
 * Professional transform controls for elements (position, size, rotation, flip)
 * Similar to Figma, Canva, and Photoshop transform panels
 * 
 * @version 1.0.0
 * @date 2025-11-13
 */ __turbopack_context__.s([
    "TransformControlPanel",
    ()=>TransformControlPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipHorizontal$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/flip-horizontal.js [app-client] (ecmascript) <export default as FlipHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipVertical$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/flip-vertical.js [app-client] (ecmascript) <export default as FlipVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
"use client";
;
;
;
;
;
;
;
function TransformControlPanel({ position, size, transform, onUpdatePosition, onUpdateSize, onUpdateTransform, onClose }) {
    const handleRotationChange = (value)=>{
        const rotation = parseFloat(value) || 0;
        onUpdateTransform({
            rotation: rotation % 360
        });
    };
    const handleRotate90CW = ()=>{
        onUpdateTransform({
            rotation: (transform.rotation + 90) % 360
        });
    };
    const handleRotate90CCW = ()=>{
        onUpdateTransform({
            rotation: (transform.rotation - 90 + 360) % 360
        });
    };
    const handleFlipHorizontal = ()=>{
        onUpdateTransform({
            flipHorizontal: !transform.flipHorizontal
        });
    };
    const handleFlipVertical = ()=>{
        onUpdateTransform({
            flipVertical: !transform.flipVertical
        });
    };
    const handleResetTransform = ()=>{
        onUpdateTransform({
            rotation: 0,
            flipHorizontal: false,
            flipVertical: false,
            scale: {
                x: 1,
                y: 1
            }
        });
    };
    const handleToggleAspectRatio = ()=>{
        onUpdateTransform({
            lockAspectRatio: !transform.lockAspectRatio
        });
    };
    const handleWidthChange = (value)=>{
        const width = parseFloat(value) || size.width;
        if (transform.lockAspectRatio) {
            const aspectRatio = size.width / size.height;
            const height = width / aspectRatio;
            onUpdateSize({
                width,
                height
            });
        } else {
            onUpdateSize({
                width,
                height: size.height
            });
        }
    };
    const handleHeightChange = (value)=>{
        const height = parseFloat(value) || size.height;
        if (transform.lockAspectRatio) {
            const aspectRatio = size.width / size.height;
            const width = height * aspectRatio;
            onUpdateSize({
                width,
                height
            });
        } else {
            onUpdateSize({
                width: size.width,
                height
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed left-4 top-1/2 -translate-y-1/2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
                        children: "🎨 التحكم في التحويلات"
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: onClose,
                        className: "h-6 w-6 p-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                className: "h-[600px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs font-semibold text-gray-700 dark:text-gray-300",
                                    children: "📍 الموضع (Position)"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-gray-600 dark:text-gray-400",
                                                    children: "X"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "number",
                                                    value: Math.round(position.x),
                                                    onChange: (e)=>onUpdatePosition({
                                                            x: parseFloat(e.target.value) || 0,
                                                            y: position.y
                                                        }),
                                                    className: "h-8 text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-gray-600 dark:text-gray-400",
                                                    children: "Y"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "number",
                                                    value: Math.round(position.y),
                                                    onChange: (e)=>onUpdatePosition({
                                                            x: position.x,
                                                            y: parseFloat(e.target.value) || 0
                                                        }),
                                                    className: "h-8 text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs font-semibold text-gray-700 dark:text-gray-300",
                                            children: "📏 الحجم (Size)"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: handleToggleAspectRatio,
                                            className: "h-6 w-6 p-0",
                                            title: transform.lockAspectRatio ? "فك قفل النسبة" : "قفل النسبة",
                                            children: transform.lockAspectRatio ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "w-3 h-3 text-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                                className: "w-3 h-3 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                lineNumber: 177,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-gray-600 dark:text-gray-400",
                                                    children: "العرض (W)"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "number",
                                                    value: Math.round(size.width),
                                                    onChange: (e)=>handleWidthChange(e.target.value),
                                                    className: "h-8 text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-gray-600 dark:text-gray-400",
                                                    children: "الارتفاع (H)"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "number",
                                                    value: Math.round(size.height),
                                                    onChange: (e)=>handleHeightChange(e.target.value),
                                                    className: "h-8 text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 191,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500 dark:text-gray-400",
                                    children: [
                                        "النسبة: ",
                                        (size.width / size.height).toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs font-semibold text-gray-700 dark:text-gray-300",
                                    children: "🔄 الدوران (Rotation)"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "number",
                                            value: Math.round(transform.rotation),
                                            onChange: (e)=>handleRotationChange(e.target.value),
                                            className: "h-8 text-xs flex-1",
                                            min: "0",
                                            max: "360"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-500",
                                            children: "°"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: handleRotate90CCW,
                                            className: "flex-1 text-xs",
                                            title: "دوران 90° عكس عقارب الساعة",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                    className: "w-3 h-3 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 17
                                                }, this),
                                                "90° ←"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: handleRotate90CW,
                                            className: "flex-1 text-xs",
                                            title: "دوران 90° مع عقارب الساعة",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                                    className: "w-3 h-3 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this),
                                                "90° →"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 235,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0",
                                    max: "360",
                                    value: transform.rotation,
                                    onChange: (e)=>handleRotationChange(e.target.value),
                                    className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs font-semibold text-gray-700 dark:text-gray-300",
                                    children: "↔️ القلب (Flip)"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: transform.flipHorizontal ? "default" : "outline",
                                            size: "sm",
                                            onClick: handleFlipHorizontal,
                                            className: "text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipHorizontal$3e$__["FlipHorizontal"], {
                                                    className: "w-3 h-3 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 17
                                                }, this),
                                                "أفقي"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 264,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: transform.flipVertical ? "default" : "outline",
                                            size: "sm",
                                            onClick: handleFlipVertical,
                                            className: "text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipVertical$3e$__["FlipVertical"], {
                                                    className: "w-3 h-3 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this),
                                                "عمودي"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 263,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "destructive",
                            size: "sm",
                            onClick: handleResetTransform,
                            className: "w-full text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: "w-3 h-3 mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this),
                                "إعادة تعيين التحويلات"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 dark:text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "الدوران:"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 301,
                                            columnNumber: 15
                                        }, this),
                                        " ",
                                        Math.round(transform.rotation),
                                        "°"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 300,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 dark:text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "القلب الأفقي:"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, this),
                                        " ",
                                        transform.flipHorizontal ? 'نعم' : 'لا'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 303,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 dark:text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "القلب العمودي:"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 307,
                                            columnNumber: 15
                                        }, this),
                                        " ",
                                        transform.flipVertical ? 'نعم' : 'لا'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 dark:text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "قفل النسبة:"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this),
                                        " ",
                                        transform.lockAspectRatio ? 'مقفل' : 'مفتوح'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                                    lineNumber: 309,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_c = TransformControlPanel;
var _c;
__turbopack_context__.k.register(_c, "TransformControlPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/pdf/canvas-editor/RotationHandle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Rotation Handle Component
 * 
 * Visual rotation handle for dragging to rotate elements
 * Similar to Figma, Canva, and Photoshop rotation handles
 * 
 * @version 1.0.0
 * @date 2025-11-13
 */ __turbopack_context__.s([
    "RotationHandle",
    ()=>RotationHandle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function RotationHandle({ rotation, onRotate, elementRef, snapToAngles = true }) {
    _s();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentAngle, setCurrentAngle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(rotation);
    const [shiftPressed, setShiftPressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RotationHandle.useEffect": ()=>{
            setCurrentAngle(rotation);
        }
    }["RotationHandle.useEffect"], [
        rotation
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RotationHandle.useEffect": ()=>{
            const handleKeyDown = {
                "RotationHandle.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'Shift') {
                        setShiftPressed(true);
                    }
                }
            }["RotationHandle.useEffect.handleKeyDown"];
            const handleKeyUp = {
                "RotationHandle.useEffect.handleKeyUp": (e)=>{
                    if (e.key === 'Shift') {
                        setShiftPressed(false);
                    }
                }
            }["RotationHandle.useEffect.handleKeyUp"];
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            return ({
                "RotationHandle.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                    window.removeEventListener('keyup', handleKeyUp);
                }
            })["RotationHandle.useEffect"];
        }
    }["RotationHandle.useEffect"], []);
    const handleMouseDown = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        const element = elementRef.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const handleMouseMove = (moveEvent)=>{
            const deltaX = moveEvent.clientX - centerX;
            const deltaY = moveEvent.clientY - centerY;
            // Calculate angle in degrees
            let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
            // Normalize to 0-360
            if (angle < 0) angle += 360;
            // Snap to 45° increments if Shift is pressed
            if (shiftPressed && snapToAngles) {
                angle = Math.round(angle / 45) * 45;
            }
            setCurrentAngle(angle);
            onRotate(angle);
        };
        const handleMouseUp = ()=>{
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: handleRef,
                className: "absolute -top-10 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-50",
                onMouseDown: handleMouseDown,
                style: {
                    pointerEvents: 'auto'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-blue-400"
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/RotationHandle.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-8 h-8 bg-white border-2 border-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                            className: "w-4 h-4 text-blue-500"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/RotationHandle.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/RotationHandle.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/pdf/canvas-editor/RotationHandle.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            isDragging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap z-50",
                children: [
                    Math.round(currentAngle),
                    "°",
                    shiftPressed && snapToAngles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2 text-xs text-blue-300",
                        children: "(Snap)"
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/RotationHandle.tsx",
                        lineNumber: 126,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/pdf/canvas-editor/RotationHandle.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(RotationHandle, "zAmHDRBB4yXL1Uh5+qb78wQuP2E=");
_c = RotationHandle;
var _c;
__turbopack_context__.k.register(_c, "RotationHandle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Enhanced HTML-Based PDF Editor
 *
 * A high-performance, interactive PDF editor using HTML/CSS instead of Canvas.
 * Features draggable/resizable tables, inline editing, and professional UI.
 *
 * @version 5.0.1 - Enhanced HTML Editor - Fixed TypeScript errors
 * @date 2025-11-16
 */ __turbopack_context__.s([
    "EnhancedHTMLEditor",
    ()=>EnhancedHTMLEditor,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$draggable$2f$build$2f$cjs$2f$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/react-draggable/build/cjs/cjs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$resizable$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/react-resizable/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid3x3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$magnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Magnet$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/magnet.js [app-client] (ecmascript) <export default as Magnet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/redo-2.js [app-client] (ecmascript) <export default as Redo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Move$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/move.js [app-client] (ecmascript) <export default as Move>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipHorizontal$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/flip-horizontal.js [app-client] (ecmascript) <export default as FlipHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/clipboard.js [app-client] (ecmascript) <export default as Clipboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$justify$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalJustifyStart$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/align-horizontal-justify-start.js [app-client] (ecmascript) <export default as AlignHorizontalJustifyStart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$justify$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalJustifyCenter$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/align-horizontal-justify-center.js [app-client] (ecmascript) <export default as AlignHorizontalJustifyCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$justify$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalJustifyEnd$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/align-horizontal-justify-end.js [app-client] (ecmascript) <export default as AlignHorizontalJustifyEnd>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyStart$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/align-vertical-justify-start.js [app-client] (ecmascript) <export default as AlignVerticalJustifyStart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyCenter$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/align-vertical-justify-center.js [app-client] (ecmascript) <export default as AlignVerticalJustifyCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyEnd$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/align-vertical-justify-end.js [app-client] (ecmascript) <export default as AlignVerticalJustifyEnd>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/arrow-left-right.js [app-client] (ecmascript) <export default as ArrowLeftRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$group$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Group$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/group.js [app-client] (ecmascript) <export default as Group>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ungroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ungroup$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/ungroup.js [app-client] (ecmascript) <export default as Ungroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/bold.js [app-client] (ecmascript) <export default as Bold>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/italic.js [app-client] (ecmascript) <export default as Italic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/underline.js [app-client] (ecmascript) <export default as Underline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/text-align-start.js [app-client] (ecmascript) <export default as AlignLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/text-align-center.js [app-client] (ecmascript) <export default as AlignCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/text-align-end.js [app-client] (ecmascript) <export default as AlignRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$justify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignJustify$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/text-align-justify.js [app-client] (ecmascript) <export default as AlignJustify>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileStack$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/file-stack.js [app-client] (ecmascript) <export default as FileStack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/html2canvas/dist/html2canvas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$pdf$2f$canvas$2d$editor$2f$BackgroundSettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/pdf/canvas-editor/BackgroundSettingsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$pdf$2f$canvas$2d$editor$2f$TransformControlPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/pdf/canvas-editor/TransformControlPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$pdf$2f$canvas$2d$editor$2f$RotationHandle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/pdf/canvas-editor/RotationHandle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
;
;
/**
 * Default Editor Settings
 */ const DEFAULT_EDITOR_SETTINGS = {
    page: {
        size: 'a4',
        orientation: 'portrait',
        width: 1400,
        height: 1980,
        margins: {
            top: 40,
            right: 40,
            bottom: 40,
            left: 40
        }
    },
    colors: {
        eventTitleText: '#ffffff',
        headerBg: '#1e293b',
        headerText: '#ffffff',
        rowBg: '#ffffff',
        rowText: '#1f2937',
        borderColor: '#e5e7eb'
    },
    fonts: {
        family: "'Cairo', 'Amiri', 'Tajawal', 'Tahoma', 'Arial', sans-serif",
        sizes: {
            eventTitle: 32,
            tableTitle: 18,
            tableHeader: 14,
            tableCell: 12
        },
        weights: {
            eventTitle: 700,
            tableTitle: 600,
            tableHeader: 600,
            tableCell: 400
        }
    }
};
/**
 * Default transform state
 */ const DEFAULT_TRANSFORM = {
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
    scale: {
        x: 1,
        y: 1
    },
    lockAspectRatio: false
};
// ============================================================================
// Title Component (React.memo removed to allow local state updates during resize)
// ============================================================================
const DraggableTitle = ({ element, isSelected, isExporting, snapEnabled, GRID_SIZE, pageWidth, pageHeight, margins, onDrag, onDragStop, onResizeStop, onSelect, onUpdateElement, isOutOfBounds, isOutOfPrintArea })=>{
    _s();
    const nodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resizingSize, setResizingSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    // Track current position during drag for real-time warning updates
    const [currentPosition, setCurrentPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(element.position);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🔍 DEBUG: Log render
    console.log('🎨 [RENDER] DraggableTitle:', {
        elementId: element.id,
        elementSize: element.size,
        isResizing,
        resizingSize,
        computedWidth: isResizing ? resizingSize.width : element.size.width,
        computedHeight: isResizing ? resizingSize.height : element.size.height,
        isSelected
    });
    // 🔍 DEBUG: Check if resize handles exist in DOM
    __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "DraggableTitle.useEffect": ()=>{
            console.log('🔍 [useEffect] Running DOM check:', {
                elementId: element.id,
                isSelected,
                nodeRefExists: !!nodeRef.current
            });
            if (isSelected && nodeRef.current) {
                // Wait for next tick to ensure Resizable has rendered
                setTimeout({
                    "DraggableTitle.useEffect": ()=>{
                        const resizableDiv = nodeRef.current?.querySelector('.react-resizable');
                        const handles = nodeRef.current?.querySelectorAll('.react-resizable-handle');
                        console.log('🎯 [DOM CHECK] Resize handles found:', {
                            elementId: element.id,
                            resizableDivExists: !!resizableDiv,
                            handleCount: handles?.length || 0,
                            handles: handles ? Array.from(handles).map({
                                "DraggableTitle.useEffect": (h)=>({
                                        className: h.className,
                                        computedStyle: window.getComputedStyle(h),
                                        pointerEvents: window.getComputedStyle(h).pointerEvents,
                                        opacity: window.getComputedStyle(h).opacity,
                                        zIndex: window.getComputedStyle(h).zIndex,
                                        display: window.getComputedStyle(h).display
                                    })
                            }["DraggableTitle.useEffect"]) : []
                        });
                    }
                }["DraggableTitle.useEffect"], 100);
            }
        }
    }["DraggableTitle.useEffect"], [
        isSelected,
        element.id
    ]);
    // Calculate warnings based on current position (during drag) or element position (static)
    const activePosition = isDragging ? currentPosition : element.position;
    const currentIsOutOfBounds = activePosition.x < 0 || activePosition.x + element.size.width > pageWidth || activePosition.y < 0 || activePosition.y + element.size.height > pageHeight;
    const currentIsOutOfPrintArea = !currentIsOutOfBounds && (activePosition.x < margins.left || activePosition.x + element.size.width > pageWidth - margins.right || activePosition.y < margins.top || activePosition.y + element.size.height > pageHeight - margins.bottom);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$draggable$2f$build$2f$cjs$2f$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        nodeRef: nodeRef,
        defaultPosition: element.position,
        onDrag: (e, data)=>{
            setIsDragging(true);
            setCurrentPosition({
                x: data.x,
                y: data.y
            });
            if (onDrag) onDrag(element.id, e, data);
        },
        onStop: (e, data)=>{
            setIsDragging(false);
            setCurrentPosition({
                x: data.x,
                y: data.y
            });
            onDragStop(element.id, e, data);
        },
        bounds: "parent",
        disabled: element.locked || isEditing,
        grid: snapEnabled ? [
            GRID_SIZE,
            GRID_SIZE
        ] : undefined,
        cancel: ".react-resizable-handle",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: nodeRef,
            className: "absolute cursor-default",
            style: {
                zIndex: element.zIndex
            },
            children: [
                !isExporting && currentIsOutOfBounds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-8 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-[10000] whitespace-nowrap",
                    children: "⚠️ خارج حدود الصفحة"
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 483,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                !isExporting && currentIsOutOfPrintArea && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-8 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-[10000] whitespace-nowrap",
                    children: "⚠️ خارج منطقة الطباعة"
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 489,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", isSelected && !isExporting && "ring-4 ring-purple-500 ring-offset-2 element-selected"),
                    style: {
                        overflow: 'visible',
                        contain: 'none'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$resizable$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Resizable"], {
                        width: isResizing ? resizingSize.width : element.size.width,
                        height: isResizing ? resizingSize.height : element.size.height,
                        onResize: (e, { size })=>{
                            console.log('🔵 [onResize] Title resize started:', {
                                elementId: element.id,
                                originalSize: size,
                                snappedWidth: Math.round(size.width / 10) * 10,
                                snappedHeight: Math.round(size.height / 10) * 10,
                                event: e.type
                            });
                            setIsResizing(true);
                            // Apply grid snapping for smoother, faster resize (10px increments)
                            const snappedWidth = Math.round(size.width / 10) * 10;
                            const snappedHeight = Math.round(size.height / 10) * 10;
                            setResizingSize({
                                width: snappedWidth,
                                height: snappedHeight
                            });
                            console.log('🟢 [onResize] State updated:', {
                                isResizing: true,
                                resizingSize: {
                                    width: snappedWidth,
                                    height: snappedHeight
                                }
                            });
                        },
                        onResizeStart: (e, { size })=>{
                            console.log('🟡 [onResizeStart] Title resize starting:', {
                                elementId: element.id,
                                initialSize: size,
                                event: e.type
                            });
                        },
                        onResizeStop: (e, data)=>{
                            console.log('🔴 [onResizeStop] Title resize stopped:', {
                                elementId: element.id,
                                finalSize: data.size,
                                snappedWidth: Math.round(data.size.width / 10) * 10,
                                snappedHeight: Math.round(data.size.height / 10) * 10
                            });
                            setIsResizing(false);
                            // Apply grid snapping to final size
                            const snappedWidth = Math.round(data.size.width / 10) * 10;
                            const snappedHeight = Math.round(data.size.height / 10) * 10;
                            onResizeStop(element.id, e, {
                                ...data,
                                size: {
                                    width: snappedWidth,
                                    height: snappedHeight
                                }
                            });
                        },
                        resizeHandles: [
                            'se',
                            'sw',
                            'ne',
                            'nw'
                        ],
                        minConstraints: [
                            300,
                            60
                        ],
                        maxConstraints: [
                            pageWidth - margins.left - margins.right,
                            300
                        ],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: isResizing ? resizingSize.width : element.size.width,
                                height: isResizing ? resizingSize.height : element.size.height,
                                overflow: 'visible',
                                contain: 'none',
                                background: (()=>{
                                    const bg = element.style.background;
                                    if (bg.type === 'none') return 'transparent';
                                    // For solid color - apply opacity directly in the color if specified
                                    if (bg.type === 'solid') {
                                        const color = bg.solidColor || '#1e293b';
                                        const opacity = bg.opacity ?? 1;
                                        if (opacity < 1) {
                                            // Convert hex to rgba with opacity
                                            const r = parseInt(color.slice(1, 3), 16);
                                            const g = parseInt(color.slice(3, 5), 16);
                                            const b = parseInt(color.slice(5, 7), 16);
                                            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
                                        }
                                        return color; // Return exact color without modification
                                    }
                                    if (bg.type === 'semi-transparent') {
                                        const color = bg.solidColor || '#1e293b';
                                        const opacity = bg.opacity ?? 0.9;
                                        // Convert hex to rgba
                                        const r = parseInt(color.slice(1, 3), 16);
                                        const g = parseInt(color.slice(3, 5), 16);
                                        const b = parseInt(color.slice(5, 7), 16);
                                        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
                                    }
                                    if (bg.type === 'gradient' && bg.gradient) {
                                        const { type, angle, startColor, endColor } = bg.gradient;
                                        const opacity = bg.opacity ?? 1;
                                        if (type === 'radial') {
                                            const gradient = `radial-gradient(circle, ${startColor} 0%, ${endColor} 100%)`;
                                            // If opacity < 1, we need to apply it differently
                                            return gradient;
                                        }
                                        return `linear-gradient(${angle || 135}deg, ${startColor} 0%, ${endColor} 100%)`;
                                    }
                                    return 'transparent';
                                })(),
                                // Only apply opacity to the container if background type is 'none' or opacity is 1
                                // This prevents double opacity application
                                opacity: element.style.background.type === 'none' ? 1 : element.style.background.type === 'gradient' ? element.style.background.opacity ?? 1 : 1,
                                borderWidth: element.style.background.type === 'none' ? 0 : element.style.background.border?.width || 0,
                                borderColor: element.style.background.type === 'none' ? 'transparent' : element.style.background.border?.color || 'transparent',
                                borderStyle: element.style.background.type === 'none' ? 'none' : element.style.background.border?.style || 'none',
                                borderRadius: element.style.background.type === 'none' ? 0 : `${element.style.background.border?.radius || 12}px`,
                                boxShadow: element.style.background.type === 'none' || !element.style.background.shadow?.enabled ? 'none' : `${element.style.background.shadow.offsetX}px ${element.style.background.shadow.offsetY}px ${element.style.background.shadow.blur}px ${element.style.background.shadow.color}`,
                                // Apply CSS transforms
                                transform: `
                rotate(${element.transform.rotation}deg)
                scaleX(${element.transform.flipHorizontal ? -1 : 1})
                scaleY(${element.transform.flipVertical ? -1 : 1})
                scale(${element.transform.scale.x}, ${element.transform.scale.y})
              `,
                                transformOrigin: 'center center'
                            },
                            onClick: (e)=>{
                                e.stopPropagation();
                                onSelect(element.id, e.ctrlKey);
                            },
                            onDoubleClick: (e)=>{
                                e.stopPropagation();
                                setIsEditing(true);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full flex justify-center",
                                    style: {
                                        textAlign: element.style.textAlign,
                                        paddingTop: '48px',
                                        paddingBottom: '48px',
                                        paddingLeft: '24px',
                                        paddingRight: '24px',
                                        overflow: 'visible',
                                        contain: 'none',
                                        minHeight: '100%'
                                    },
                                    children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: element.content,
                                        onChange: (e)=>{
                                            onUpdateElement(element.id, {
                                                content: e.target.value
                                            });
                                        },
                                        onBlur: ()=>setIsEditing(false),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') {
                                                setIsEditing(false);
                                            }
                                        },
                                        autoFocus: true,
                                        className: "w-full bg-transparent border-2 border-white/50 rounded px-4 py-2 text-center outline-none",
                                        style: {
                                            fontSize: `${element.style.fontSize}px`,
                                            fontWeight: element.style.fontWeight,
                                            color: element.style.color,
                                            direction: 'rtl'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 641,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-bold select-none",
                                        style: {
                                            fontSize: `${element.style.fontSize}px`,
                                            fontWeight: element.style.fontWeight,
                                            color: element.style.color,
                                            direction: 'rtl',
                                            lineHeight: 2.2,
                                            wordBreak: 'break-word',
                                            fontFamily: "'Cairo', 'Amiri', 'Tajawal', 'Tahoma', 'Arial', sans-serif",
                                            textRendering: 'optimizeLegibility',
                                            WebkitFontSmoothing: 'antialiased',
                                            MozOsxFontSmoothing: 'grayscale',
                                            paddingTop: '0',
                                            paddingBottom: '0',
                                            marginTop: '0',
                                            marginBottom: '0',
                                            whiteSpace: 'normal',
                                            overflow: 'visible',
                                            contain: 'none',
                                            display: 'block',
                                            width: '100%',
                                            boxSizing: 'content-box'
                                        },
                                        children: element.content
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 665,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 627,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                isResizing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "resize-tooltip absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap z-50 shadow-2xl border-2 border-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-purple-100",
                                                children: "📏"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 699,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    Math.round(resizingSize.width),
                                                    " × ",
                                                    Math.round(resizingSize.height),
                                                    " px"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 700,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 698,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 697,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                isSelected && !isExporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$pdf$2f$canvas$2d$editor$2f$RotationHandle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RotationHandle"], {
                                    rotation: element.transform.rotation,
                                    onRotate: (rotation)=>{
                                        onUpdateElement(element.id, {
                                            transform: {
                                                ...element.transform,
                                                rotation
                                            }
                                        });
                                    },
                                    elementRef: nodeRef,
                                    snapToAngles: true
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 707,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 552,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 504,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 494,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
            lineNumber: 480,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
        lineNumber: 462,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DraggableTitle, "DIprfbPYlQPSZaVPSqcnOyV2VXM=");
_c = DraggableTitle;
// ============================================================================
// Table Title Component (React.memo removed to allow local state updates during resize)
// ============================================================================
const DraggableTableTitle = ({ element, isSelected, isExporting, editorSettings, snapEnabled, GRID_SIZE, pageWidth, pageHeight, margins, onDrag, onDragStop, onResizeStop, onSelect, onUpdateElement, onToggleLink, isOutOfBounds, isOutOfPrintArea })=>{
    _s1();
    const nodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editedContent, setEditedContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(element.content);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resizingSize, setResizingSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    // Track current position during drag for real-time warning updates
    const [currentPosition, setCurrentPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(element.position);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Calculate warnings based on current position (during drag) or element position (static)
    const activePosition = isDragging ? currentPosition : element.position;
    const currentIsOutOfBounds = activePosition.x < 0 || activePosition.x + element.size.width > pageWidth || activePosition.y < 0 || activePosition.y + element.size.height > pageHeight;
    const currentIsOutOfPrintArea = !currentIsOutOfBounds && (activePosition.x < margins.left || activePosition.x + element.size.width > pageWidth - margins.right || activePosition.y < margins.top || activePosition.y + element.size.height > pageHeight - margins.bottom);
    const handleDoubleClick = ()=>{
        if (!element.locked && !isExporting) {
            setIsEditing(true);
            setEditedContent(element.content);
        }
    };
    const handleBlur = ()=>{
        setIsEditing(false);
        if (editedContent !== element.content) {
            onUpdateElement(element.id, {
                content: editedContent
            });
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleBlur();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditedContent(element.content);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$draggable$2f$build$2f$cjs$2f$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        nodeRef: nodeRef,
        defaultPosition: element.position,
        onDrag: (e, data)=>{
            setIsDragging(true);
            setCurrentPosition({
                x: data.x,
                y: data.y
            });
            if (onDrag) onDrag(element.id, e, data);
        },
        onStop: (e, data)=>{
            setIsDragging(false);
            setCurrentPosition({
                x: data.x,
                y: data.y
            });
            onDragStop(element.id, e, data);
        },
        bounds: "parent",
        disabled: element.locked || isEditing,
        grid: snapEnabled ? [
            GRID_SIZE,
            GRID_SIZE
        ] : undefined,
        cancel: ".react-resizable-handle",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: nodeRef,
            className: "absolute cursor-default",
            style: {
                zIndex: element.zIndex
            },
            children: [
                !isExporting && currentIsOutOfBounds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-8 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-[10000] whitespace-nowrap",
                    children: "⚠️ خارج حدود الصفحة"
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 838,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                !isExporting && currentIsOutOfPrintArea && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-8 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-[10000] whitespace-nowrap",
                    children: "⚠️ خارج منطقة الطباعة"
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 844,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative transition-all duration-200", isSelected && !isExporting && "ring-4 ring-blue-500 ring-offset-2 element-selected"),
                    style: {
                        overflow: 'visible',
                        transform: `
              rotate(${element.transform.rotation}deg)
              scaleX(${element.transform.flipHorizontal ? -1 : 1})
              scaleY(${element.transform.flipVertical ? -1 : 1})
            `,
                        transformOrigin: 'center center'
                    },
                    onClick: (e)=>{
                        e.stopPropagation();
                        // Phase 4: Support Ctrl+Click for multi-selection
                        onSelect(element.id, e.ctrlKey);
                    },
                    onDoubleClick: handleDoubleClick,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$resizable$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Resizable"], {
                        width: isResizing ? resizingSize.width : element.size.width,
                        height: isResizing ? resizingSize.height : element.size.height,
                        onResize: (e, { size })=>{
                            setIsResizing(true);
                            // Apply grid snapping for smoother, faster resize (10px increments)
                            const snappedWidth = Math.round(size.width / 10) * 10;
                            const snappedHeight = Math.round(size.height / 10) * 10;
                            setResizingSize({
                                width: snappedWidth,
                                height: snappedHeight
                            });
                        },
                        onResizeStop: (e, data)=>{
                            setIsResizing(false);
                            // Apply grid snapping to final size
                            const snappedWidth = Math.round(data.size.width / 10) * 10;
                            const snappedHeight = Math.round(data.size.height / 10) * 10;
                            onResizeStop(element.id, e, {
                                ...data,
                                size: {
                                    width: snappedWidth,
                                    height: snappedHeight
                                }
                            });
                        },
                        resizeHandles: [
                            'e',
                            'w'
                        ],
                        minConstraints: [
                            200,
                            40
                        ],
                        maxConstraints: [
                            pageWidth - margins.left - margins.right,
                            80
                        ],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: isResizing ? resizingSize.width : element.size.width,
                                height: isResizing ? resizingSize.height : element.size.height
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full flex items-center px-4",
                                    style: {
                                        textAlign: element.style.textAlign,
                                        transform: `scale(${(isResizing ? resizingSize.width : element.size.width) / element.size.width})`,
                                        transformOrigin: element.style.textAlign === 'right' ? 'right center' : element.style.textAlign === 'left' ? 'left center' : 'center center'
                                    },
                                    children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: editedContent,
                                        onChange: (e)=>setEditedContent(e.target.value),
                                        onBlur: handleBlur,
                                        onKeyDown: handleKeyDown,
                                        autoFocus: true,
                                        className: "w-full bg-white border-2 border-blue-500 rounded px-2 py-1 text-center",
                                        style: {
                                            fontSize: `${element.style.fontSize}px`,
                                            fontWeight: element.style.fontWeight,
                                            color: element.style.color,
                                            direction: 'rtl',
                                            fontFamily: editorSettings.fonts.family
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 906,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold select-none w-full",
                                        style: {
                                            fontSize: `${element.style.fontSize}px`,
                                            fontWeight: element.style.fontWeight,
                                            color: element.style.color,
                                            direction: 'rtl',
                                            lineHeight: 1.5,
                                            wordBreak: 'break-word',
                                            fontFamily: editorSettings.fonts.family,
                                            textRendering: 'optimizeLegibility',
                                            WebkitFontSmoothing: 'antialiased',
                                            MozOsxFontSmoothing: 'grayscale'
                                        },
                                        children: element.content
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 923,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 897,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                isSelected && !isExporting && onToggleLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        onToggleLink(element.id, element.linkedTableId);
                                    },
                                    className: "absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs shadow-lg transition-colors",
                                    title: element.linkedTableId ? 'فك ربط العنوان من الجدول' : 'ربط العنوان بالجدول',
                                    children: element.linkedTableId ? '🔗 مربوط' : '🔓 غير مربوط'
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 945,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                isSelected && !isExporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$pdf$2f$canvas$2d$editor$2f$RotationHandle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RotationHandle"], {
                                    rotation: element.transform.rotation,
                                    onRotate: (rotation)=>{
                                        onUpdateElement(element.id, {
                                            transform: {
                                                ...element.transform,
                                                rotation
                                            }
                                        });
                                    },
                                    elementRef: nodeRef,
                                    snapToAngles: true
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 959,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 891,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 870,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 849,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
            lineNumber: 835,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
        lineNumber: 817,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(DraggableTableTitle, "awwfP4tUv0RlDq/BzI4StgSdtjU=");
_c1 = DraggableTableTitle;
// ============================================================================
// Table Component (React.memo removed to allow local state updates during resize)
// ============================================================================
const DraggableTable = ({ element, isSelected, isExporting, editorSettings, snapEnabled, GRID_SIZE, pageWidth, pageHeight, margins, onDrag, onDragStop, onResizeStop, onSelect, onUpdateElement, isOutOfBounds, isOutOfPrintArea })=>{
    _s2();
    // Create ref for React 19 compatibility (avoid findDOMNode)
    const nodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resizingSize, setResizingSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    // Track current position during drag for real-time warning updates
    const [currentPosition, setCurrentPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(element.position);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Column reordering functions
    const moveColumnLeft = (idx)=>{
        if (idx >= element.headers.length - 1) return; // Can't move last column left (RTL)
        const newHeaders = [
            ...element.headers
        ];
        // Swap with next column (in RTL, "left" means higher index)
        [newHeaders[idx], newHeaders[idx + 1]] = [
            newHeaders[idx + 1],
            newHeaders[idx]
        ];
        onUpdateElement(element.id, {
            headers: newHeaders
        });
    };
    const moveColumnRight = (idx)=>{
        if (idx <= 0) return; // Can't move first column right (RTL)
        const newHeaders = [
            ...element.headers
        ];
        // Swap with previous column (in RTL, "right" means lower index)
        [newHeaders[idx], newHeaders[idx - 1]] = [
            newHeaders[idx - 1],
            newHeaders[idx]
        ];
        onUpdateElement(element.id, {
            headers: newHeaders
        });
    };
    // Row reordering functions
    const moveRowUp = (rowIdx)=>{
        if (rowIdx <= 0) return; // Can't move first row up
        const newRows = [
            ...element.rows
        ];
        [newRows[rowIdx], newRows[rowIdx - 1]] = [
            newRows[rowIdx - 1],
            newRows[rowIdx]
        ];
        onUpdateElement(element.id, {
            rows: newRows
        });
    };
    const moveRowDown = (rowIdx)=>{
        if (rowIdx >= element.rows.length - 1) return; // Can't move last row down
        const newRows = [
            ...element.rows
        ];
        [newRows[rowIdx], newRows[rowIdx + 1]] = [
            newRows[rowIdx + 1],
            newRows[rowIdx]
        ];
        onUpdateElement(element.id, {
            rows: newRows
        });
    };
    // Calculate warnings based on current position (during drag) or element position (static)
    const activePosition = isDragging ? currentPosition : element.position;
    const currentIsOutOfBounds = activePosition.x < 0 || activePosition.x + element.size.width > pageWidth || activePosition.y < 0 || activePosition.y + element.size.height > pageHeight;
    const currentIsOutOfPrintArea = !currentIsOutOfBounds && (activePosition.x < margins.left || activePosition.x + element.size.width > pageWidth - margins.right || activePosition.y < margins.top || activePosition.y + element.size.height > pageHeight - margins.bottom);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$draggable$2f$build$2f$cjs$2f$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        nodeRef: nodeRef,
        defaultPosition: element.position,
        onDrag: (e, data)=>{
            setIsDragging(true);
            setCurrentPosition({
                x: data.x,
                y: data.y
            });
            if (onDrag) onDrag(element.id, e, data);
        },
        onStop: (e, data)=>{
            setIsDragging(false);
            setCurrentPosition({
                x: data.x,
                y: data.y
            });
            onDragStop(element.id, e, data);
        },
        bounds: "parent",
        disabled: element.locked,
        grid: snapEnabled ? [
            GRID_SIZE,
            GRID_SIZE
        ] : undefined,
        cancel: ".react-resizable-handle",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: nodeRef,
            className: "absolute cursor-default",
            style: {
                zIndex: element.zIndex
            },
            children: [
                !isExporting && currentIsOutOfBounds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-8 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-[10000] whitespace-nowrap",
                    children: "⚠️ خارج حدود الصفحة"
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 1095,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                !isExporting && currentIsOutOfPrintArea && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-8 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-[10000] whitespace-nowrap",
                    children: "⚠️ خارج منطقة الطباعة"
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 1101,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative transition-all duration-200", isSelected && !isExporting && "ring-4 ring-blue-500 ring-offset-2 element-selected"),
                    style: {
                        // Apply CSS transforms
                        transform: `
              rotate(${element.transform.rotation}deg)
              scaleX(${element.transform.flipHorizontal ? -1 : 1})
              scaleY(${element.transform.flipVertical ? -1 : 1})
              scale(${element.transform.scale.x}, ${element.transform.scale.y})
            `,
                        transformOrigin: 'center center'
                    },
                    onClick: (e)=>{
                        e.stopPropagation();
                        // Phase 4: Support Ctrl+Click for multi-selection
                        onSelect(element.id, e.ctrlKey);
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$resizable$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Resizable"], {
                        width: isResizing ? resizingSize.width : element.size.width,
                        height: isResizing ? resizingSize.height : element.size.height,
                        onResize: (e, { size })=>{
                            setIsResizing(true);
                            // Apply grid snapping for smoother, faster resize (10px increments)
                            const snappedWidth = Math.round(size.width / 10) * 10;
                            const snappedHeight = Math.round(size.height / 10) * 10;
                            setResizingSize({
                                width: snappedWidth,
                                height: snappedHeight
                            });
                        },
                        onResizeStop: (e, data)=>{
                            setIsResizing(false);
                            // Apply grid snapping to final size
                            const snappedWidth = Math.round(data.size.width / 10) * 10;
                            const snappedHeight = Math.round(data.size.height / 10) * 10;
                            onResizeStop(element.id, e, {
                                ...data,
                                size: {
                                    width: snappedWidth,
                                    height: snappedHeight
                                }
                            });
                        },
                        resizeHandles: [
                            'se',
                            'sw',
                            'ne',
                            'nw'
                        ],
                        minConstraints: [
                            200,
                            100
                        ],
                        maxConstraints: [
                            pageWidth - margins.left - margins.right,
                            pageHeight - margins.top - margins.bottom
                        ],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: isResizing ? resizingSize.width : element.size.width,
                                height: isResizing ? resizingSize.height : element.size.height
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-auto",
                                    style: {
                                        maxHeight: isExporting ? 'none' : element.size.height,
                                        height: isExporting ? 'auto' : undefined,
                                        borderRadius: '8px'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        dir: "rtl",
                                        style: {
                                            borderCollapse: 'separate',
                                            borderSpacing: 0,
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: element.headers.map((header, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                backgroundColor: editorSettings.colors.headerBg,
                                                                color: editorSettings.colors.headerText,
                                                                fontSize: `${editorSettings.fonts.sizes.tableHeader}px`,
                                                                fontWeight: editorSettings.fonts.weights.tableHeader,
                                                                fontFamily: editorSettings.fonts.family,
                                                                direction: 'rtl',
                                                                unicodeBidi: 'bidi-override',
                                                                textRendering: 'optimizeLegibility',
                                                                WebkitFontSmoothing: 'antialiased',
                                                                MozOsxFontSmoothing: 'grayscale',
                                                                padding: isSelected ? '6px 8px' : '14px 16px',
                                                                textAlign: 'center',
                                                                borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                                                                borderLeft: idx !== element.headers.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                                                                whiteSpace: 'nowrap',
                                                                lineHeight: '1.5'
                                                            },
                                                            children: [
                                                                isSelected && !isExporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        gap: '2px',
                                                                        marginBottom: '4px'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                moveColumnRight(idx);
                                                                            },
                                                                            disabled: idx <= 0,
                                                                            style: {
                                                                                background: idx <= 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)',
                                                                                border: 'none',
                                                                                borderRadius: '3px',
                                                                                padding: '2px 6px',
                                                                                cursor: idx <= 0 ? 'not-allowed' : 'pointer',
                                                                                color: idx <= 0 ? 'rgba(255,255,255,0.3)' : 'white',
                                                                                fontSize: '10px',
                                                                                fontWeight: 'bold',
                                                                                transition: 'all 0.15s ease'
                                                                            },
                                                                            title: "نقل العمود لليمين",
                                                                            children: "→"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 1209,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                moveColumnLeft(idx);
                                                                            },
                                                                            disabled: idx >= element.headers.length - 1,
                                                                            style: {
                                                                                background: idx >= element.headers.length - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)',
                                                                                border: 'none',
                                                                                borderRadius: '3px',
                                                                                padding: '2px 6px',
                                                                                cursor: idx >= element.headers.length - 1 ? 'not-allowed' : 'pointer',
                                                                                color: idx >= element.headers.length - 1 ? 'rgba(255,255,255,0.3)' : 'white',
                                                                                fontSize: '10px',
                                                                                fontWeight: 'bold',
                                                                                transition: 'all 0.15s ease'
                                                                            },
                                                                            title: "نقل العمود لليسار",
                                                                            children: "←"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 1231,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 1202,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    contentEditable: isSelected,
                                                                    suppressContentEditableWarning: true,
                                                                    style: {
                                                                        display: 'block',
                                                                        cursor: isSelected ? 'text' : 'default',
                                                                        outline: 'none',
                                                                        minWidth: '40px'
                                                                    },
                                                                    onBlur: (e)=>{
                                                                        const newValue = e.currentTarget.textContent?.trim() || header;
                                                                        if (newValue !== header) {
                                                                            const newHeaders = [
                                                                                ...element.headers
                                                                            ];
                                                                            const oldHeader = newHeaders[idx];
                                                                            newHeaders[idx] = newValue;
                                                                            // Update rows to use new header key
                                                                            const newRows = element.rows.map((row)=>{
                                                                                const newRow = {
                                                                                    ...row
                                                                                };
                                                                                if (oldHeader !== newValue) {
                                                                                    newRow[newValue] = row[oldHeader];
                                                                                    delete newRow[oldHeader];
                                                                                }
                                                                                return newRow;
                                                                            });
                                                                            onUpdateElement(element.id, {
                                                                                headers: newHeaders,
                                                                                rows: newRows
                                                                            });
                                                                        }
                                                                    },
                                                                    children: header
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 1255,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 1179,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 1177,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 1176,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: element.rows.map((row, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        style: {
                                                            backgroundColor: rowIdx % 2 === 0 ? '#ffffff' : '#f8fafc',
                                                            transition: 'background-color 0.15s ease'
                                                        },
                                                        children: element.headers.map((header, cellIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    fontSize: `${editorSettings.fonts.sizes.tableCell}px`,
                                                                    color: editorSettings.colors.rowText,
                                                                    fontFamily: editorSettings.fonts.family,
                                                                    direction: 'rtl',
                                                                    unicodeBidi: 'bidi-override',
                                                                    textRendering: 'optimizeLegibility',
                                                                    WebkitFontSmoothing: 'antialiased',
                                                                    MozOsxFontSmoothing: 'grayscale',
                                                                    padding: '12px 16px',
                                                                    textAlign: 'center',
                                                                    borderBottom: rowIdx !== element.rows.length - 1 ? '1px solid #e2e8f0' : 'none',
                                                                    borderLeft: cellIdx !== element.headers.length - 1 ? '1px solid #e2e8f0' : 'none',
                                                                    lineHeight: '1.6',
                                                                    minHeight: '44px',
                                                                    verticalAlign: 'middle',
                                                                    position: 'relative'
                                                                },
                                                                children: [
                                                                    cellIdx === 0 && isSelected && !isExporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            position: 'absolute',
                                                                            right: '4px',
                                                                            top: '50%',
                                                                            transform: 'translateY(-50%)',
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '2px',
                                                                            zIndex: 10
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>{
                                                                                    e.stopPropagation();
                                                                                    moveRowUp(rowIdx);
                                                                                },
                                                                                disabled: rowIdx <= 0,
                                                                                style: {
                                                                                    background: rowIdx <= 0 ? 'rgba(0,0,0,0.15)' : 'rgba(59,130,246,0.9)',
                                                                                    border: 'none',
                                                                                    borderRadius: '4px',
                                                                                    padding: '4px 8px',
                                                                                    cursor: rowIdx <= 0 ? 'not-allowed' : 'pointer',
                                                                                    color: rowIdx <= 0 ? 'rgba(0,0,0,0.3)' : 'white',
                                                                                    fontSize: '14px',
                                                                                    fontWeight: 'bold',
                                                                                    transition: 'all 0.15s ease',
                                                                                    lineHeight: 1,
                                                                                    minWidth: '24px',
                                                                                    minHeight: '20px'
                                                                                },
                                                                                title: "نقل لأعلى",
                                                                                children: "↑"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 1335,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>{
                                                                                    e.stopPropagation();
                                                                                    moveRowDown(rowIdx);
                                                                                },
                                                                                disabled: rowIdx >= element.rows.length - 1,
                                                                                style: {
                                                                                    background: rowIdx >= element.rows.length - 1 ? 'rgba(0,0,0,0.15)' : 'rgba(59,130,246,0.9)',
                                                                                    border: 'none',
                                                                                    borderRadius: '4px',
                                                                                    padding: '4px 8px',
                                                                                    cursor: rowIdx >= element.rows.length - 1 ? 'not-allowed' : 'pointer',
                                                                                    color: rowIdx >= element.rows.length - 1 ? 'rgba(0,0,0,0.3)' : 'white',
                                                                                    fontSize: '14px',
                                                                                    fontWeight: 'bold',
                                                                                    transition: 'all 0.15s ease',
                                                                                    lineHeight: 1,
                                                                                    minWidth: '24px',
                                                                                    minHeight: '20px'
                                                                                },
                                                                                title: "نقل لأسفل",
                                                                                children: "↓"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 1360,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 1324,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    row[header]?.startsWith?.('data:image') ? // Signature cell - render as image (larger size when exporting for better print quality)
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            paddingRight: isSelected && !isExporting && cellIdx === 0 ? '24px' : '0'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: row[header],
                                                                            alt: "توقيع",
                                                                            style: {
                                                                                maxWidth: isExporting ? '180px' : '120px',
                                                                                maxHeight: isExporting ? '70px' : '50px',
                                                                                objectFit: 'contain'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 1395,
                                                                            columnNumber: 31
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 1389,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)) : // Regular cell - editable text
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        contentEditable: isSelected,
                                                                        suppressContentEditableWarning: true,
                                                                        style: {
                                                                            display: 'block',
                                                                            outline: 'none',
                                                                            paddingRight: isSelected && !isExporting && cellIdx === 0 ? '24px' : '0'
                                                                        },
                                                                        onBlur: (e)=>{
                                                                            const newRows = [
                                                                                ...element.rows
                                                                            ];
                                                                            newRows[rowIdx][header] = e.currentTarget.textContent || '';
                                                                            onUpdateElement(element.id, {
                                                                                rows: newRows
                                                                            });
                                                                        },
                                                                        children: row[header] || '-'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 1407,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, cellIdx, true, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 1301,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, rowIdx, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 1293,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 1291,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 1164,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 1156,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                isResizing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "resize-tooltip absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap z-50 shadow-2xl border-2 border-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-100",
                                                children: "📏"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 1436,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    Math.round(resizingSize.width),
                                                    " × ",
                                                    Math.round(resizingSize.height),
                                                    " px"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 1437,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 1435,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 1434,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                isSelected && !isExporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -top-8 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap z-10",
                                            children: [
                                                "جدول • ",
                                                Math.round(element.size.width),
                                                "×",
                                                Math.round(element.size.height),
                                                "px"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 1444,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 1447,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 1448,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 1449,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 1450,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$pdf$2f$canvas$2d$editor$2f$RotationHandle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RotationHandle"], {
                                            rotation: element.transform.rotation,
                                            onRotate: (rotation)=>{
                                                onUpdateElement(element.id, {
                                                    transform: {
                                                        ...element.transform,
                                                        rotation
                                                    }
                                                });
                                            },
                                            elementRef: nodeRef,
                                            snapToAngles: true
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 1453,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 1148,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 1127,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 1106,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
            lineNumber: 1092,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
        lineNumber: 1074,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(DraggableTable, "kLzFjJ8kO+Ar+gE83bKsxI5SqXs=");
_c2 = DraggableTable;
function EnhancedHTMLEditor({ settings: externalSettings, sampleData, zoom: externalZoom = 1.0, onExport, onBack }) {
    _s3();
    // ============================================================================
    // State Management
    // ============================================================================
    // Internal editor settings (independent from external settings)
    const [editorSettings, setEditorSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "EnhancedHTMLEditor.useState": ()=>{
            // If external settings provided, convert them to EditorSettings format
            if (externalSettings) {
                return {
                    page: {
                        size: 'a4',
                        orientation: externalSettings.page.orientation,
                        width: externalSettings.page.orientation === 'landscape' ? 1980 : 1400,
                        height: externalSettings.page.orientation === 'landscape' ? 1400 : 1980,
                        margins: externalSettings.page.margins
                    },
                    colors: {
                        eventTitleText: externalSettings.colors.eventTitleText,
                        headerBg: externalSettings.colors.headerBg,
                        headerText: externalSettings.colors.headerText,
                        rowBg: externalSettings.colors.secondary,
                        rowText: externalSettings.colors.text,
                        borderColor: externalSettings.colors.border
                    },
                    fonts: {
                        family: externalSettings.fonts.family,
                        sizes: {
                            eventTitle: externalSettings.fonts.sizes.eventTitle,
                            tableTitle: externalSettings.fonts.sizes.tableTitle,
                            tableHeader: externalSettings.fonts.sizes.header,
                            tableCell: externalSettings.fonts.sizes.content
                        },
                        weights: {
                            eventTitle: externalSettings.fonts.weights.eventTitle,
                            tableTitle: externalSettings.fonts.weights.tableTitle,
                            tableHeader: externalSettings.fonts.weights.header,
                            tableCell: externalSettings.fonts.weights.content
                        }
                    }
                };
            }
            // Otherwise use default settings
            return DEFAULT_EDITOR_SETTINGS;
        }
    }["EnhancedHTMLEditor.useState"]);
    // Phase 7: Pages state
    const [pages, setPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 'page-1',
            name: 'صفحة 1',
            order: 0
        }
    ]);
    const [currentPageId, setCurrentPageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('page-1');
    const [elements, setElements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Phase 4: Multi-selection support - changed from single ID to array of IDs
    const [selectedElementIds, setSelectedElementIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Responsive zoom: 25% on mobile, 40% on desktop
    const getInitialZoom = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return window.innerWidth < 1024 ? 0.25 : 0.4;
        }
        //TURBOPACK unreachable
        ;
    };
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(getInitialZoom);
    const [gridEnabled, setGridEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [snapEnabled, setSnapEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showLayers, setShowLayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Mobile responsive states
    const [mobileLayersOpen, setMobileLayersOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobilePagesOpen, setMobilePagesOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingCellId, setEditingCellId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isExporting, setIsExporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showBackgroundPanel, setShowBackgroundPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTransformPanel, setShowTransformPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Track resizing state for all elements
    const [resizingElements, setResizingElements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Phase 4: Clipboard for copy/paste
    const [clipboard, setClipboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Track which text element is being edited
    const [editingTextElementId, setEditingTextElementId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Alignment guides state (Phase 2)
    const [alignmentGuides, setAlignmentGuides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        vertical: [],
        horizontal: []
    });
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [alignmentType, setAlignmentType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(''); // Type of alignment (center, margin, element)
    // History for undo/redo
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    // Refs
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ============================================================================
    // Constants
    // ============================================================================
    const GRID_SIZE = 20;
    const SNAP_THRESHOLD = 10;
    // Page dimensions from editor settings
    const pageWidth = editorSettings.page.width;
    const pageHeight = editorSettings.page.height;
    // Convert margins from mm to pixels
    const mmToPx = 3.7795;
    const margins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EnhancedHTMLEditor.useMemo[margins]": ()=>({
                top: editorSettings.page.margins.top * mmToPx,
                right: editorSettings.page.margins.right * mmToPx,
                bottom: editorSettings.page.margins.bottom * mmToPx,
                left: editorSettings.page.margins.left * mmToPx
            })
    }["EnhancedHTMLEditor.useMemo[margins]"], [
        editorSettings.page.margins
    ]);
    // ============================================================================
    // History Management (Moved before useEffect)
    // ============================================================================
    const saveToHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[saveToHistory]": (newElements)=>{
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push({
                elements: JSON.parse(JSON.stringify(newElements)),
                timestamp: Date.now()
            });
            // Limit history to 50 states
            if (newHistory.length > 50) {
                newHistory.shift();
            }
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        }
    }["EnhancedHTMLEditor.useCallback[saveToHistory]"], [
        history,
        historyIndex
    ]);
    // ============================================================================
    // Initialize Elements from Sample Data (with error handling)
    // ============================================================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EnhancedHTMLEditor.useEffect": ()=>{
            if (sampleData && elements.length === 0) {
                try {
                    const initialElements = [];
                    // Add Event Title as first element (if exists)
                    if (sampleData.eventTitle) {
                        const titleElement = {
                            id: 'event-title',
                            type: 'title',
                            content: sampleData.eventTitle,
                            pageId: 'page-1',
                            position: {
                                x: margins.left,
                                y: margins.top
                            },
                            size: {
                                width: pageWidth - margins.left - margins.right,
                                height: 260
                            },
                            visible: true,
                            locked: false,
                            zIndex: 1000,
                            transform: {
                                ...DEFAULT_TRANSFORM
                            },
                            style: {
                                fontSize: editorSettings.fonts.sizes.eventTitle,
                                fontWeight: editorSettings.fonts.weights.eventTitle,
                                color: editorSettings.colors.eventTitleText,
                                textAlign: 'center',
                                background: {
                                    type: 'gradient',
                                    opacity: 1,
                                    gradient: {
                                        type: 'linear',
                                        angle: 135,
                                        startColor: '#1e293b',
                                        endColor: '#334155'
                                    },
                                    border: {
                                        width: 0,
                                        color: '#e5e7eb',
                                        radius: 12,
                                        style: 'none'
                                    },
                                    shadow: {
                                        enabled: true,
                                        color: 'rgba(0, 0, 0, 0.1)',
                                        blur: 12,
                                        offsetX: 0,
                                        offsetY: 4
                                    }
                                }
                            }
                        };
                        initialElements.push(titleElement);
                    }
                    // Add Tables with separate Table Titles
                    sampleData.tables.forEach({
                        "EnhancedHTMLEditor.useEffect": (table, index)=>{
                            // Validate table data
                            if (!table.title || !table.headers || !Array.isArray(table.rows)) {
                                console.warn(`Invalid table data at index ${index}`, table);
                                return;
                            }
                            // Calculate Y position: start after event title (if exists) + spacing
                            const eventTitleHeight = sampleData.eventTitle ? 260 : 0; // Match actual title height
                            const startY = margins.top + eventTitleHeight + 150; // 150px spacing after title for clear separation
                            const tableTitleHeight = 50; // Height for table title
                            const tableSpacing = 50; // Spacing between title and table
                            const tableGroupHeight = 350; // Total height for title + table + spacing
                            const tableId = `table-${index}`;
                            const tableTitleId = `table-title-${index}`;
                            // Create Table Title Element (separate from table)
                            const tableTitleElement = {
                                id: tableTitleId,
                                type: 'table-title',
                                content: table.title,
                                linkedTableId: tableId,
                                pageId: 'page-1',
                                position: {
                                    x: margins.left,
                                    y: startY + index * tableGroupHeight
                                },
                                size: {
                                    width: pageWidth - margins.left - margins.right,
                                    height: tableTitleHeight
                                },
                                visible: true,
                                locked: false,
                                zIndex: 100 + index * 2,
                                transform: {
                                    ...DEFAULT_TRANSFORM
                                },
                                style: {
                                    fontSize: editorSettings.fonts.sizes.tableTitle,
                                    fontWeight: editorSettings.fonts.weights.tableTitle,
                                    color: editorSettings.colors.rowText,
                                    textAlign: 'right'
                                }
                            };
                            // Create Table Element (without title)
                            const tableElement = {
                                id: tableId,
                                type: 'table',
                                headers: table.headers,
                                rows: table.rows,
                                pageId: 'page-1',
                                position: {
                                    x: margins.left,
                                    y: startY + index * tableGroupHeight + tableTitleHeight + tableSpacing
                                },
                                size: {
                                    width: pageWidth - margins.left - margins.right,
                                    height: 250
                                },
                                visible: true,
                                locked: false,
                                zIndex: 100 + index * 2 - 1,
                                transform: {
                                    ...DEFAULT_TRANSFORM
                                }
                            };
                            initialElements.push(tableTitleElement, tableElement);
                        }
                    }["EnhancedHTMLEditor.useEffect"]);
                    if (initialElements.length > 0) {
                        setElements(initialElements);
                        saveToHistory(initialElements);
                    }
                } catch (error) {
                    console.error('Failed to initialize elements:', error);
                }
            }
        }
    }["EnhancedHTMLEditor.useEffect"], [
        sampleData,
        elements.length,
        margins,
        pageWidth,
        saveToHistory
    ]);
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[undo]": ()=>{
            if (historyIndex > 0) {
                setHistoryIndex(historyIndex - 1);
                setElements(JSON.parse(JSON.stringify(history[historyIndex - 1].elements)));
            }
        }
    }["EnhancedHTMLEditor.useCallback[undo]"], [
        history,
        historyIndex
    ]);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[redo]": ()=>{
            if (historyIndex < history.length - 1) {
                setHistoryIndex(historyIndex + 1);
                setElements(JSON.parse(JSON.stringify(history[historyIndex + 1].elements)));
            }
        }
    }["EnhancedHTMLEditor.useCallback[redo]"], [
        history,
        historyIndex
    ]);
    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;
    // ============================================================================
    // Phase 7.2: Clear selection if selected elements are not on current page
    // ============================================================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EnhancedHTMLEditor.useEffect": ()=>{
            // Filter out any selected elements that are not on the current page
            const validSelectedIds = selectedElementIds.filter({
                "EnhancedHTMLEditor.useEffect.validSelectedIds": (id)=>{
                    const element = elements.find({
                        "EnhancedHTMLEditor.useEffect.validSelectedIds.element": (el)=>el.id === id
                    }["EnhancedHTMLEditor.useEffect.validSelectedIds.element"]);
                    return element && element.pageId === currentPageId;
                }
            }["EnhancedHTMLEditor.useEffect.validSelectedIds"]);
            // If some elements were filtered out, update the selection
            if (validSelectedIds.length !== selectedElementIds.length) {
                setSelectedElementIds(validSelectedIds);
            }
        }
    }["EnhancedHTMLEditor.useEffect"], [
        currentPageId,
        selectedElementIds,
        elements
    ]);
    // ============================================================================
    // Phase 4: Keyboard Shortcuts (moved to after all functions are defined)
    // ============================================================================
    // ============================================================================
    // Zoom Controls
    // ============================================================================
    const handleZoomIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleZoomIn]": ()=>{
            setZoom({
                "EnhancedHTMLEditor.useCallback[handleZoomIn]": (prev)=>Math.min(prev + 0.1, 2.0)
            }["EnhancedHTMLEditor.useCallback[handleZoomIn]"]);
        }
    }["EnhancedHTMLEditor.useCallback[handleZoomIn]"], []);
    const handleZoomOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleZoomOut]": ()=>{
            setZoom({
                "EnhancedHTMLEditor.useCallback[handleZoomOut]": (prev)=>Math.max(prev - 0.1, 0.1)
            }["EnhancedHTMLEditor.useCallback[handleZoomOut]"]);
        }
    }["EnhancedHTMLEditor.useCallback[handleZoomOut]"], []);
    const handleZoomFit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleZoomFit]": ()=>{
            if (canvasRef.current && canvasRef.current.parentElement) {
                const container = canvasRef.current.parentElement;
                const containerWidth = container.clientWidth - 64;
                const containerHeight = container.clientHeight - 64;
                const scaleX = containerWidth / pageWidth;
                const scaleY = containerHeight / pageHeight;
                const fitZoom = Math.min(scaleX, scaleY, 1.0);
                setZoom(fitZoom);
            }
        }
    }["EnhancedHTMLEditor.useCallback[handleZoomFit]"], [
        pageWidth,
        pageHeight
    ]);
    const handleZoomReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleZoomReset]": ()=>{
            // Reset to appropriate zoom based on screen size
            const isMobile = window.innerWidth < 1024;
            setZoom(isMobile ? 0.25 : 0.4);
        }
    }["EnhancedHTMLEditor.useCallback[handleZoomReset]"], []);
    // ============================================================================
    // Snap to Grid Helper
    // ============================================================================
    const snapToGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[snapToGrid]": (value)=>{
            if (!snapEnabled) return value;
            return Math.round(value / GRID_SIZE) * GRID_SIZE;
        }
    }["EnhancedHTMLEditor.useCallback[snapToGrid]"], [
        snapEnabled
    ]);
    // ============================================================================
    // Element Manipulation (Optimized with debouncing)
    // ============================================================================
    const updateElementDebounced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const updateElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[updateElement]": (id, updates)=>{
            setElements({
                "EnhancedHTMLEditor.useCallback[updateElement]": (prev)=>{
                    const newElements = prev.map({
                        "EnhancedHTMLEditor.useCallback[updateElement].newElements": (el)=>el.id === id ? {
                                ...el,
                                ...updates
                            } : el
                    }["EnhancedHTMLEditor.useCallback[updateElement].newElements"]);
                    // Debounce history save to avoid too many history entries during drag
                    if (updateElementDebounced.current) {
                        clearTimeout(updateElementDebounced.current);
                    }
                    updateElementDebounced.current = setTimeout({
                        "EnhancedHTMLEditor.useCallback[updateElement]": ()=>{
                            saveToHistory(newElements);
                        }
                    }["EnhancedHTMLEditor.useCallback[updateElement]"], 300);
                    return newElements;
                }
            }["EnhancedHTMLEditor.useCallback[updateElement]"]);
        }
    }["EnhancedHTMLEditor.useCallback[updateElement]"], [
        saveToHistory
    ]);
    const deleteElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[deleteElement]": (id)=>{
            setElements({
                "EnhancedHTMLEditor.useCallback[deleteElement]": (prev)=>{
                    const newElements = prev.filter({
                        "EnhancedHTMLEditor.useCallback[deleteElement].newElements": (el)=>el.id !== id
                    }["EnhancedHTMLEditor.useCallback[deleteElement].newElements"]);
                    saveToHistory(newElements);
                    return newElements;
                }
            }["EnhancedHTMLEditor.useCallback[deleteElement]"]);
            // Phase 4: Update to handle multi-selection
            setSelectedElementIds({
                "EnhancedHTMLEditor.useCallback[deleteElement]": (prev)=>prev.filter({
                        "EnhancedHTMLEditor.useCallback[deleteElement]": (selectedId)=>selectedId !== id
                    }["EnhancedHTMLEditor.useCallback[deleteElement]"])
            }["EnhancedHTMLEditor.useCallback[deleteElement]"]);
        }
    }["EnhancedHTMLEditor.useCallback[deleteElement]"], [
        saveToHistory
    ]);
    const toggleElementVisibility = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[toggleElementVisibility]": (id)=>{
            setElements({
                "EnhancedHTMLEditor.useCallback[toggleElementVisibility]": (prev)=>prev.map({
                        "EnhancedHTMLEditor.useCallback[toggleElementVisibility]": (el)=>el.id === id ? {
                                ...el,
                                visible: !el.visible
                            } : el
                    }["EnhancedHTMLEditor.useCallback[toggleElementVisibility]"])
            }["EnhancedHTMLEditor.useCallback[toggleElementVisibility]"]);
        }
    }["EnhancedHTMLEditor.useCallback[toggleElementVisibility]"], []);
    // ============================================================================
    // Layer Ordering Functions (Z-Index Management)
    // ============================================================================
    /**
   * Bring element one layer forward (increase z-index)
   * Swaps z-index with the element that has the next higher z-index
   */ const bringForward = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[bringForward]": (id)=>{
            setElements({
                "EnhancedHTMLEditor.useCallback[bringForward]": (prev)=>{
                    const currentElement = prev.find({
                        "EnhancedHTMLEditor.useCallback[bringForward].currentElement": (el)=>el.id === id
                    }["EnhancedHTMLEditor.useCallback[bringForward].currentElement"]);
                    if (!currentElement) return prev;
                    // Get elements on the same page, sorted by z-index
                    const pageElements = prev.filter({
                        "EnhancedHTMLEditor.useCallback[bringForward].pageElements": (el)=>el.pageId === currentElement.pageId
                    }["EnhancedHTMLEditor.useCallback[bringForward].pageElements"]).sort({
                        "EnhancedHTMLEditor.useCallback[bringForward].pageElements": (a, b)=>a.zIndex - b.zIndex
                    }["EnhancedHTMLEditor.useCallback[bringForward].pageElements"]);
                    // Find the element with the next higher z-index
                    const currentIndex = pageElements.findIndex({
                        "EnhancedHTMLEditor.useCallback[bringForward].currentIndex": (el)=>el.id === id
                    }["EnhancedHTMLEditor.useCallback[bringForward].currentIndex"]);
                    if (currentIndex === pageElements.length - 1) return prev; // Already at top
                    const nextElement = pageElements[currentIndex + 1];
                    // Swap z-indices
                    const newElements = prev.map({
                        "EnhancedHTMLEditor.useCallback[bringForward].newElements": (el)=>{
                            if (el.id === id) {
                                return {
                                    ...el,
                                    zIndex: nextElement.zIndex
                                };
                            }
                            if (el.id === nextElement.id) {
                                return {
                                    ...el,
                                    zIndex: currentElement.zIndex
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[bringForward].newElements"]);
                    saveToHistory(newElements);
                    return newElements;
                }
            }["EnhancedHTMLEditor.useCallback[bringForward]"]);
        }
    }["EnhancedHTMLEditor.useCallback[bringForward]"], [
        saveToHistory
    ]);
    /**
   * Send element one layer backward (decrease z-index)
   * Swaps z-index with the element that has the next lower z-index
   */ const sendBackward = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[sendBackward]": (id)=>{
            setElements({
                "EnhancedHTMLEditor.useCallback[sendBackward]": (prev)=>{
                    const currentElement = prev.find({
                        "EnhancedHTMLEditor.useCallback[sendBackward].currentElement": (el)=>el.id === id
                    }["EnhancedHTMLEditor.useCallback[sendBackward].currentElement"]);
                    if (!currentElement) return prev;
                    // Get elements on the same page, sorted by z-index
                    const pageElements = prev.filter({
                        "EnhancedHTMLEditor.useCallback[sendBackward].pageElements": (el)=>el.pageId === currentElement.pageId
                    }["EnhancedHTMLEditor.useCallback[sendBackward].pageElements"]).sort({
                        "EnhancedHTMLEditor.useCallback[sendBackward].pageElements": (a, b)=>a.zIndex - b.zIndex
                    }["EnhancedHTMLEditor.useCallback[sendBackward].pageElements"]);
                    // Find the element with the next lower z-index
                    const currentIndex = pageElements.findIndex({
                        "EnhancedHTMLEditor.useCallback[sendBackward].currentIndex": (el)=>el.id === id
                    }["EnhancedHTMLEditor.useCallback[sendBackward].currentIndex"]);
                    if (currentIndex === 0) return prev; // Already at bottom
                    const prevElement = pageElements[currentIndex - 1];
                    // Swap z-indices
                    const newElements = prev.map({
                        "EnhancedHTMLEditor.useCallback[sendBackward].newElements": (el)=>{
                            if (el.id === id) {
                                return {
                                    ...el,
                                    zIndex: prevElement.zIndex
                                };
                            }
                            if (el.id === prevElement.id) {
                                return {
                                    ...el,
                                    zIndex: currentElement.zIndex
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[sendBackward].newElements"]);
                    saveToHistory(newElements);
                    return newElements;
                }
            }["EnhancedHTMLEditor.useCallback[sendBackward]"]);
        }
    }["EnhancedHTMLEditor.useCallback[sendBackward]"], [
        saveToHistory
    ]);
    // ============================================================================
    // Phase 4: Multi-Selection Functions
    // ============================================================================
    // Helper: Get the primary selected element (for backward compatibility)
    const selectedElementId = selectedElementIds.length > 0 ? selectedElementIds[0] : null;
    // Helper: Set single selected element (for backward compatibility)
    const setSelectedElementId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[setSelectedElementId]": (id)=>{
            if (id === null) {
                setSelectedElementIds([]);
            } else {
                setSelectedElementIds([
                    id
                ]);
            }
        }
    }["EnhancedHTMLEditor.useCallback[setSelectedElementId]"], []);
    const handleElementSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleElementSelect]": (elementId, ctrlKey = false)=>{
            // Phase 7.2: Only allow selection of elements on current page
            const element = elements.find({
                "EnhancedHTMLEditor.useCallback[handleElementSelect].element": (el)=>el.id === elementId
            }["EnhancedHTMLEditor.useCallback[handleElementSelect].element"]);
            if (!element || element.pageId !== currentPageId) return;
            if (ctrlKey) {
                // Multi-selection with Ctrl
                setSelectedElementIds({
                    "EnhancedHTMLEditor.useCallback[handleElementSelect]": (prev)=>{
                        if (prev.includes(elementId)) {
                            // Deselect if already selected
                            return prev.filter({
                                "EnhancedHTMLEditor.useCallback[handleElementSelect]": (id)=>id !== elementId
                            }["EnhancedHTMLEditor.useCallback[handleElementSelect]"]);
                        } else {
                            // Add to selection
                            return [
                                ...prev,
                                elementId
                            ];
                        }
                    }
                }["EnhancedHTMLEditor.useCallback[handleElementSelect]"]);
            } else {
                // Single selection (replace current selection)
                setSelectedElementIds([
                    elementId
                ]);
            }
        }
    }["EnhancedHTMLEditor.useCallback[handleElementSelect]"], [
        elements,
        currentPageId
    ]);
    const clearSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[clearSelection]": ()=>{
            setSelectedElementIds([]);
        }
    }["EnhancedHTMLEditor.useCallback[clearSelection]"], []);
    const selectAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[selectAll]": ()=>{
            // Phase 7: Select only elements on current page
            const currentPageElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[selectAll].currentPageElements": (el)=>el.pageId === currentPageId
            }["EnhancedHTMLEditor.useCallback[selectAll].currentPageElements"]);
            setSelectedElementIds(currentPageElements.map({
                "EnhancedHTMLEditor.useCallback[selectAll]": (el)=>el.id
            }["EnhancedHTMLEditor.useCallback[selectAll]"]));
        }
    }["EnhancedHTMLEditor.useCallback[selectAll]"], [
        elements,
        currentPageId
    ]);
    // ============================================================================
    // Phase 7: Page Management Functions
    // ============================================================================
    const addPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[addPage]": ()=>{
            const newPageNumber = pages.length + 1;
            const newPage = {
                id: `page-${Date.now()}`,
                name: `صفحة ${newPageNumber}`,
                order: pages.length
            };
            setPages({
                "EnhancedHTMLEditor.useCallback[addPage]": (prev)=>[
                        ...prev,
                        newPage
                    ]
            }["EnhancedHTMLEditor.useCallback[addPage]"]);
            setCurrentPageId(newPage.id); // Switch to new page
        }
    }["EnhancedHTMLEditor.useCallback[addPage]"], [
        pages
    ]);
    const deletePage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[deletePage]": (pageId)=>{
            // Don't allow deleting the last page
            if (pages.length === 1) {
                alert('لا يمكن حذف الصفحة الأخيرة');
                return;
            }
            // Check if page has elements
            const pageElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[deletePage].pageElements": (el)=>el.pageId === pageId
            }["EnhancedHTMLEditor.useCallback[deletePage].pageElements"]);
            if (pageElements.length > 0) {
                const confirmed = confirm(`هذه الصفحة تحتوي على ${pageElements.length} عنصر. هل تريد حذفها؟`);
                if (!confirmed) return;
            }
            // Delete page and its elements
            setPages({
                "EnhancedHTMLEditor.useCallback[deletePage]": (prev)=>prev.filter({
                        "EnhancedHTMLEditor.useCallback[deletePage]": (p)=>p.id !== pageId
                    }["EnhancedHTMLEditor.useCallback[deletePage]"]).map({
                        "EnhancedHTMLEditor.useCallback[deletePage]": (p, index)=>({
                                ...p,
                                order: index
                            })
                    }["EnhancedHTMLEditor.useCallback[deletePage]"])
            }["EnhancedHTMLEditor.useCallback[deletePage]"]);
            setElements({
                "EnhancedHTMLEditor.useCallback[deletePage]": (prev)=>prev.filter({
                        "EnhancedHTMLEditor.useCallback[deletePage]": (el)=>el.pageId !== pageId
                    }["EnhancedHTMLEditor.useCallback[deletePage]"])
            }["EnhancedHTMLEditor.useCallback[deletePage]"]);
            // Switch to first page if current page was deleted
            if (currentPageId === pageId) {
                setCurrentPageId(pages[0].id);
            }
        }
    }["EnhancedHTMLEditor.useCallback[deletePage]"], [
        pages,
        elements,
        currentPageId
    ]);
    const goToPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[goToPage]": (pageId)=>{
            setCurrentPageId(pageId);
            setSelectedElementIds([]); // Clear selection when switching pages
        }
    }["EnhancedHTMLEditor.useCallback[goToPage]"], []);
    const getCurrentPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[getCurrentPage]": ()=>{
            return pages.find({
                "EnhancedHTMLEditor.useCallback[getCurrentPage]": (p)=>p.id === currentPageId
            }["EnhancedHTMLEditor.useCallback[getCurrentPage]"]) || pages[0];
        }
    }["EnhancedHTMLEditor.useCallback[getCurrentPage]"], [
        pages,
        currentPageId
    ]);
    const getCurrentPageElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[getCurrentPageElements]": ()=>{
            return elements.filter({
                "EnhancedHTMLEditor.useCallback[getCurrentPageElements]": (el)=>el.pageId === currentPageId
            }["EnhancedHTMLEditor.useCallback[getCurrentPageElements]"]);
        }
    }["EnhancedHTMLEditor.useCallback[getCurrentPageElements]"], [
        elements,
        currentPageId
    ]);
    const moveElementsToPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[moveElementsToPage]": (elementIds, targetPageId)=>{
            if (elementIds.length === 0) return;
            setElements({
                "EnhancedHTMLEditor.useCallback[moveElementsToPage]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[moveElementsToPage].updated": (el)=>{
                            if (elementIds.includes(el.id)) {
                                return {
                                    ...el,
                                    pageId: targetPageId
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[moveElementsToPage].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[moveElementsToPage]"]);
            // Clear selection after moving
            setSelectedElementIds([]);
        }
    }["EnhancedHTMLEditor.useCallback[moveElementsToPage]"], [
        saveToHistory
    ]);
    // ============================================================================
    // Phase 7: End of Page Management Functions
    // ============================================================================
    const deleteSelectedElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[deleteSelectedElements]": ()=>{
            if (selectedElementIds.length === 0) return;
            setElements({
                "EnhancedHTMLEditor.useCallback[deleteSelectedElements]": (prev)=>{
                    const newElements = prev.filter({
                        "EnhancedHTMLEditor.useCallback[deleteSelectedElements].newElements": (el)=>!selectedElementIds.includes(el.id)
                    }["EnhancedHTMLEditor.useCallback[deleteSelectedElements].newElements"]);
                    saveToHistory(newElements);
                    return newElements;
                }
            }["EnhancedHTMLEditor.useCallback[deleteSelectedElements]"]);
            setSelectedElementIds([]);
        }
    }["EnhancedHTMLEditor.useCallback[deleteSelectedElements]"], [
        selectedElementIds,
        saveToHistory
    ]);
    // Copy selected elements to clipboard
    const copySelectedElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[copySelectedElements]": ()=>{
            if (selectedElementIds.length === 0) return;
            const elementsToCopy = elements.filter({
                "EnhancedHTMLEditor.useCallback[copySelectedElements].elementsToCopy": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[copySelectedElements].elementsToCopy"]);
            setClipboard(JSON.parse(JSON.stringify(elementsToCopy))); // Deep copy
        }
    }["EnhancedHTMLEditor.useCallback[copySelectedElements]"], [
        selectedElementIds,
        elements
    ]);
    // Paste elements from clipboard
    const pasteElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[pasteElements]": ()=>{
            if (clipboard.length === 0) return;
            const newElements = clipboard.map({
                "EnhancedHTMLEditor.useCallback[pasteElements].newElements": (el)=>({
                        ...el,
                        id: `${el.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        pageId: currentPageId,
                        position: {
                            x: el.position.x + 20,
                            y: el.position.y + 20
                        }
                    })
            }["EnhancedHTMLEditor.useCallback[pasteElements].newElements"]);
            setElements({
                "EnhancedHTMLEditor.useCallback[pasteElements]": (prev)=>{
                    const updated = [
                        ...prev,
                        ...newElements
                    ];
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[pasteElements]"]);
            // Select the newly pasted elements
            setSelectedElementIds(newElements.map({
                "EnhancedHTMLEditor.useCallback[pasteElements]": (el)=>el.id
            }["EnhancedHTMLEditor.useCallback[pasteElements]"]));
        }
    }["EnhancedHTMLEditor.useCallback[pasteElements]"], [
        clipboard,
        saveToHistory,
        currentPageId
    ]);
    // ============================================================================
    // Element Bounds Checking
    // ============================================================================
    const isElementOutOfBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[isElementOutOfBounds]": (element)=>{
            const { position, size } = element;
            // Check if element is outside page bounds
            const isOutLeft = position.x < 0;
            const isOutRight = position.x + size.width > pageWidth;
            const isOutTop = position.y < 0;
            const isOutBottom = position.y + size.height > pageHeight;
            return isOutLeft || isOutRight || isOutTop || isOutBottom;
        }
    }["EnhancedHTMLEditor.useCallback[isElementOutOfBounds]"], [
        pageWidth,
        pageHeight
    ]);
    const isElementOutOfPrintArea = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[isElementOutOfPrintArea]": (element)=>{
            const { position, size } = element;
            // Check if element is outside print margins
            const isOutLeft = position.x < margins.left;
            const isOutRight = position.x + size.width > pageWidth - margins.right;
            const isOutTop = position.y < margins.top;
            const isOutBottom = position.y + size.height > pageHeight - margins.bottom;
            return isOutLeft || isOutRight || isOutTop || isOutBottom;
        }
    }["EnhancedHTMLEditor.useCallback[isElementOutOfPrintArea]"], [
        pageWidth,
        pageHeight,
        margins
    ]);
    const fitElementToPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[fitElementToPage]": (elementId)=>{
            const element = elements.find({
                "EnhancedHTMLEditor.useCallback[fitElementToPage].element": (el)=>el.id === elementId
            }["EnhancedHTMLEditor.useCallback[fitElementToPage].element"]);
            if (!element) return;
            let newX = element.position.x;
            let newY = element.position.y;
            // Constrain to page bounds
            if (newX < margins.left) newX = margins.left;
            if (newX + element.size.width > pageWidth - margins.right) {
                newX = pageWidth - margins.right - element.size.width;
            }
            if (newY < margins.top) newY = margins.top;
            if (newY + element.size.height > pageHeight - margins.bottom) {
                newY = pageHeight - margins.bottom - element.size.height;
            }
            updateElement(elementId, {
                position: {
                    x: newX,
                    y: newY
                }
            });
        }
    }["EnhancedHTMLEditor.useCallback[fitElementToPage]"], [
        elements,
        pageWidth,
        pageHeight,
        margins,
        updateElement
    ]);
    const fitAllElementsToPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[fitAllElementsToPage]": ()=>{
            elements.forEach({
                "EnhancedHTMLEditor.useCallback[fitAllElementsToPage]": (element)=>{
                    if (isElementOutOfBounds(element) || isElementOutOfPrintArea(element)) {
                        fitElementToPage(element.id);
                    }
                }
            }["EnhancedHTMLEditor.useCallback[fitAllElementsToPage]"]);
        }
    }["EnhancedHTMLEditor.useCallback[fitAllElementsToPage]"], [
        elements,
        isElementOutOfBounds,
        isElementOutOfPrintArea,
        fitElementToPage
    ]);
    // ============================================================================
    // Phase 5: Alignment Functions
    // ============================================================================
    // Align selected elements to the left
    const alignLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[alignLeft]": ()=>{
            if (selectedElementIds.length < 2) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[alignLeft].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[alignLeft].selectedElements"]);
            const leftMost = Math.min(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[alignLeft].leftMost": (el)=>el.position.x
            }["EnhancedHTMLEditor.useCallback[alignLeft].leftMost"]));
            setElements({
                "EnhancedHTMLEditor.useCallback[alignLeft]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[alignLeft].updated": (el)=>{
                            if (selectedElementIds.includes(el.id)) {
                                return {
                                    ...el,
                                    position: {
                                        ...el.position,
                                        x: leftMost
                                    }
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[alignLeft].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[alignLeft]"]);
        }
    }["EnhancedHTMLEditor.useCallback[alignLeft]"], [
        selectedElementIds,
        elements,
        saveToHistory
    ]);
    // Align selected elements to the center horizontally
    const alignCenterHorizontal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[alignCenterHorizontal]": ()=>{
            if (selectedElementIds.length < 2) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[alignCenterHorizontal].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[alignCenterHorizontal].selectedElements"]);
            const leftMost = Math.min(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[alignCenterHorizontal].leftMost": (el)=>el.position.x
            }["EnhancedHTMLEditor.useCallback[alignCenterHorizontal].leftMost"]));
            const rightMost = Math.max(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[alignCenterHorizontal].rightMost": (el)=>el.position.x + el.size.width
            }["EnhancedHTMLEditor.useCallback[alignCenterHorizontal].rightMost"]));
            const centerX = (leftMost + rightMost) / 2;
            setElements({
                "EnhancedHTMLEditor.useCallback[alignCenterHorizontal]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[alignCenterHorizontal].updated": (el)=>{
                            if (selectedElementIds.includes(el.id)) {
                                return {
                                    ...el,
                                    position: {
                                        ...el.position,
                                        x: centerX - el.size.width / 2
                                    }
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[alignCenterHorizontal].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[alignCenterHorizontal]"]);
        }
    }["EnhancedHTMLEditor.useCallback[alignCenterHorizontal]"], [
        selectedElementIds,
        elements,
        saveToHistory
    ]);
    // Align selected elements to the right
    const alignRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[alignRight]": ()=>{
            if (selectedElementIds.length < 2) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[alignRight].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[alignRight].selectedElements"]);
            const rightMost = Math.max(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[alignRight].rightMost": (el)=>el.position.x + el.size.width
            }["EnhancedHTMLEditor.useCallback[alignRight].rightMost"]));
            setElements({
                "EnhancedHTMLEditor.useCallback[alignRight]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[alignRight].updated": (el)=>{
                            if (selectedElementIds.includes(el.id)) {
                                return {
                                    ...el,
                                    position: {
                                        ...el.position,
                                        x: rightMost - el.size.width
                                    }
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[alignRight].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[alignRight]"]);
        }
    }["EnhancedHTMLEditor.useCallback[alignRight]"], [
        selectedElementIds,
        elements,
        saveToHistory
    ]);
    // Align selected elements to the top
    const alignTop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[alignTop]": ()=>{
            if (selectedElementIds.length < 2) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[alignTop].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[alignTop].selectedElements"]);
            const topMost = Math.min(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[alignTop].topMost": (el)=>el.position.y
            }["EnhancedHTMLEditor.useCallback[alignTop].topMost"]));
            setElements({
                "EnhancedHTMLEditor.useCallback[alignTop]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[alignTop].updated": (el)=>{
                            if (selectedElementIds.includes(el.id)) {
                                return {
                                    ...el,
                                    position: {
                                        ...el.position,
                                        y: topMost
                                    }
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[alignTop].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[alignTop]"]);
        }
    }["EnhancedHTMLEditor.useCallback[alignTop]"], [
        selectedElementIds,
        elements,
        saveToHistory
    ]);
    // Align selected elements to the middle vertically
    const alignMiddleVertical = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[alignMiddleVertical]": ()=>{
            if (selectedElementIds.length < 2) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[alignMiddleVertical].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[alignMiddleVertical].selectedElements"]);
            const topMost = Math.min(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[alignMiddleVertical].topMost": (el)=>el.position.y
            }["EnhancedHTMLEditor.useCallback[alignMiddleVertical].topMost"]));
            const bottomMost = Math.max(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[alignMiddleVertical].bottomMost": (el)=>el.position.y + el.size.height
            }["EnhancedHTMLEditor.useCallback[alignMiddleVertical].bottomMost"]));
            const centerY = (topMost + bottomMost) / 2;
            setElements({
                "EnhancedHTMLEditor.useCallback[alignMiddleVertical]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[alignMiddleVertical].updated": (el)=>{
                            if (selectedElementIds.includes(el.id)) {
                                return {
                                    ...el,
                                    position: {
                                        ...el.position,
                                        y: centerY - el.size.height / 2
                                    }
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[alignMiddleVertical].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[alignMiddleVertical]"]);
        }
    }["EnhancedHTMLEditor.useCallback[alignMiddleVertical]"], [
        selectedElementIds,
        elements,
        saveToHistory
    ]);
    // Align selected elements to the bottom
    const alignBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[alignBottom]": ()=>{
            if (selectedElementIds.length < 2) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[alignBottom].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[alignBottom].selectedElements"]);
            const bottomMost = Math.max(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[alignBottom].bottomMost": (el)=>el.position.y + el.size.height
            }["EnhancedHTMLEditor.useCallback[alignBottom].bottomMost"]));
            setElements({
                "EnhancedHTMLEditor.useCallback[alignBottom]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[alignBottom].updated": (el)=>{
                            if (selectedElementIds.includes(el.id)) {
                                return {
                                    ...el,
                                    position: {
                                        ...el.position,
                                        y: bottomMost - el.size.height
                                    }
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[alignBottom].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[alignBottom]"]);
        }
    }["EnhancedHTMLEditor.useCallback[alignBottom]"], [
        selectedElementIds,
        elements,
        saveToHistory
    ]);
    // Distribute selected elements horizontally with equal spacing
    const distributeHorizontal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[distributeHorizontal]": ()=>{
            if (selectedElementIds.length < 3) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[distributeHorizontal].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[distributeHorizontal].selectedElements"]);
            // Sort by x position
            const sorted = [
                ...selectedElements
            ].sort({
                "EnhancedHTMLEditor.useCallback[distributeHorizontal].sorted": (a, b)=>a.position.x - b.position.x
            }["EnhancedHTMLEditor.useCallback[distributeHorizontal].sorted"]);
            const leftMost = sorted[0].position.x;
            const rightMost = sorted[sorted.length - 1].position.x + sorted[sorted.length - 1].size.width;
            const totalWidth = sorted.reduce({
                "EnhancedHTMLEditor.useCallback[distributeHorizontal].totalWidth": (sum, el)=>sum + el.size.width
            }["EnhancedHTMLEditor.useCallback[distributeHorizontal].totalWidth"], 0);
            const spacing = (rightMost - leftMost - totalWidth) / (sorted.length - 1);
            let currentX = leftMost;
            const updates = {};
            sorted.forEach({
                "EnhancedHTMLEditor.useCallback[distributeHorizontal]": (el)=>{
                    updates[el.id] = {
                        x: currentX
                    };
                    currentX += el.size.width + spacing;
                }
            }["EnhancedHTMLEditor.useCallback[distributeHorizontal]"]);
            setElements({
                "EnhancedHTMLEditor.useCallback[distributeHorizontal]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[distributeHorizontal].updated": (el)=>{
                            if (updates[el.id]) {
                                return {
                                    ...el,
                                    position: {
                                        ...el.position,
                                        x: updates[el.id].x
                                    }
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[distributeHorizontal].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[distributeHorizontal]"]);
        }
    }["EnhancedHTMLEditor.useCallback[distributeHorizontal]"], [
        selectedElementIds,
        elements,
        saveToHistory
    ]);
    // Distribute selected elements vertically with equal spacing
    const distributeVertical = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[distributeVertical]": ()=>{
            if (selectedElementIds.length < 3) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[distributeVertical].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[distributeVertical].selectedElements"]);
            // Sort by y position
            const sorted = [
                ...selectedElements
            ].sort({
                "EnhancedHTMLEditor.useCallback[distributeVertical].sorted": (a, b)=>a.position.y - b.position.y
            }["EnhancedHTMLEditor.useCallback[distributeVertical].sorted"]);
            const topMost = sorted[0].position.y;
            const bottomMost = sorted[sorted.length - 1].position.y + sorted[sorted.length - 1].size.height;
            const totalHeight = sorted.reduce({
                "EnhancedHTMLEditor.useCallback[distributeVertical].totalHeight": (sum, el)=>sum + el.size.height
            }["EnhancedHTMLEditor.useCallback[distributeVertical].totalHeight"], 0);
            const spacing = (bottomMost - topMost - totalHeight) / (sorted.length - 1);
            let currentY = topMost;
            const updates = {};
            sorted.forEach({
                "EnhancedHTMLEditor.useCallback[distributeVertical]": (el)=>{
                    updates[el.id] = {
                        y: currentY
                    };
                    currentY += el.size.height + spacing;
                }
            }["EnhancedHTMLEditor.useCallback[distributeVertical]"]);
            setElements({
                "EnhancedHTMLEditor.useCallback[distributeVertical]": (prev)=>{
                    const updated = prev.map({
                        "EnhancedHTMLEditor.useCallback[distributeVertical].updated": (el)=>{
                            if (updates[el.id]) {
                                return {
                                    ...el,
                                    position: {
                                        ...el.position,
                                        y: updates[el.id].y
                                    }
                                };
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[distributeVertical].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[distributeVertical]"]);
        }
    }["EnhancedHTMLEditor.useCallback[distributeVertical]"], [
        selectedElementIds,
        elements,
        saveToHistory
    ]);
    // ============================================================================
    // Phase 6: Grouping Functions
    // ============================================================================
    // Create a group from selected elements
    const createGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[createGroup]": ()=>{
            if (selectedElementIds.length < 2) return;
            const selectedElements = elements.filter({
                "EnhancedHTMLEditor.useCallback[createGroup].selectedElements": (el)=>selectedElementIds.includes(el.id)
            }["EnhancedHTMLEditor.useCallback[createGroup].selectedElements"]);
            // Phase 7.2: Verify all elements are on the same page
            const pageIds = new Set(selectedElements.map({
                "EnhancedHTMLEditor.useCallback[createGroup]": (el)=>el.pageId
            }["EnhancedHTMLEditor.useCallback[createGroup]"]));
            if (pageIds.size > 1) {
                alert('لا يمكن تجميع عناصر من صفحات مختلفة');
                return;
            }
            // Calculate bounding box for the group
            const minX = Math.min(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[createGroup].minX": (el)=>el.position.x
            }["EnhancedHTMLEditor.useCallback[createGroup].minX"]));
            const minY = Math.min(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[createGroup].minY": (el)=>el.position.y
            }["EnhancedHTMLEditor.useCallback[createGroup].minY"]));
            const maxX = Math.max(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[createGroup].maxX": (el)=>el.position.x + el.size.width
            }["EnhancedHTMLEditor.useCallback[createGroup].maxX"]));
            const maxY = Math.max(...selectedElements.map({
                "EnhancedHTMLEditor.useCallback[createGroup].maxY": (el)=>el.position.y + el.size.height
            }["EnhancedHTMLEditor.useCallback[createGroup].maxY"]));
            const groupId = `group-${Date.now()}`;
            const newGroup = {
                id: groupId,
                type: 'group',
                name: `مجموعة ${Date.now()}`,
                elementIds: selectedElementIds,
                pageId: currentPageId,
                position: {
                    x: minX,
                    y: minY
                },
                size: {
                    width: maxX - minX,
                    height: maxY - minY
                },
                visible: true,
                locked: false,
                zIndex: Math.max(...selectedElements.map({
                    "EnhancedHTMLEditor.useCallback[createGroup]": (el)=>el.zIndex
                }["EnhancedHTMLEditor.useCallback[createGroup]"])) + 1,
                transform: DEFAULT_TRANSFORM
            };
            setElements({
                "EnhancedHTMLEditor.useCallback[createGroup]": (prev)=>{
                    const updated = [
                        ...prev,
                        newGroup
                    ];
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[createGroup]"]);
            // Select the new group
            setSelectedElementIds([
                groupId
            ]);
        }
    }["EnhancedHTMLEditor.useCallback[createGroup]"], [
        selectedElementIds,
        elements,
        saveToHistory,
        currentPageId
    ]);
    // Ungroup a group element
    const ungroupGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[ungroupGroup]": (groupId)=>{
            const group = elements.find({
                "EnhancedHTMLEditor.useCallback[ungroupGroup].group": (el)=>el.id === groupId && el.type === 'group'
            }["EnhancedHTMLEditor.useCallback[ungroupGroup].group"]);
            if (!group) return;
            // Remove the group and select its child elements
            setElements({
                "EnhancedHTMLEditor.useCallback[ungroupGroup]": (prev)=>{
                    const updated = prev.filter({
                        "EnhancedHTMLEditor.useCallback[ungroupGroup].updated": (el)=>el.id !== groupId
                    }["EnhancedHTMLEditor.useCallback[ungroupGroup].updated"]);
                    saveToHistory(updated);
                    return updated;
                }
            }["EnhancedHTMLEditor.useCallback[ungroupGroup]"]);
            // Select the elements that were in the group
            setSelectedElementIds(group.elementIds);
        }
    }["EnhancedHTMLEditor.useCallback[ungroupGroup]"], [
        elements,
        saveToHistory
    ]);
    // Check if an element is part of a group
    const getElementGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[getElementGroup]": (elementId)=>{
            const group = elements.find({
                "EnhancedHTMLEditor.useCallback[getElementGroup].group": (el)=>el.type === 'group' && el.elementIds.includes(elementId)
            }["EnhancedHTMLEditor.useCallback[getElementGroup].group"]);
            return group || null;
        }
    }["EnhancedHTMLEditor.useCallback[getElementGroup]"], [
        elements
    ]);
    // ============================================================================
    // Table Title Link/Unlink
    // ============================================================================
    const handleToggleTableTitleLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink]": (titleId, currentLinkedTableId)=>{
            setElements({
                "EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink]": (prev)=>{
                    return prev.map({
                        "EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink]": (el)=>{
                            if (el.id === titleId && el.type === 'table-title') {
                                const titleElement = el;
                                // Toggle link: if linked, unlink; if unlinked, try to find nearest table
                                if (currentLinkedTableId) {
                                    // Unlink
                                    return {
                                        ...titleElement,
                                        linkedTableId: null
                                    };
                                } else {
                                    // Link to nearest table
                                    const tables = prev.filter({
                                        "EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink].tables": (e)=>e.type === 'table'
                                    }["EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink].tables"]);
                                    if (tables.length === 0) return el;
                                    // Find nearest table by distance
                                    let nearestTable = tables[0];
                                    let minDistance = Infinity;
                                    tables.forEach({
                                        "EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink]": (table)=>{
                                            const distance = Math.sqrt(Math.pow(table.position.x - titleElement.position.x, 2) + Math.pow(table.position.y - titleElement.position.y, 2));
                                            if (distance < minDistance) {
                                                minDistance = distance;
                                                nearestTable = table;
                                            }
                                        }
                                    }["EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink]"]);
                                    return {
                                        ...titleElement,
                                        linkedTableId: nearestTable.id
                                    };
                                }
                            }
                            return el;
                        }
                    }["EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink]"]);
                }
            }["EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink]"]);
        }
    }["EnhancedHTMLEditor.useCallback[handleToggleTableTitleLink]"], []);
    // ============================================================================
    // Alignment Guides (Phase 2)
    // ============================================================================
    const SNAP_DISTANCE = 5; // Distance in pixels to snap to guides
    const calculateAlignmentGuides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[calculateAlignmentGuides]": (draggedElement, currentX, currentY)=>{
            const guides = {
                vertical: [],
                horizontal: []
            };
            // Calculate dragged element bounds
            const draggedLeft = currentX;
            const draggedRight = currentX + draggedElement.size.width;
            const draggedTop = currentY;
            const draggedBottom = currentY + draggedElement.size.height;
            const draggedCenterX = currentX + draggedElement.size.width / 2;
            const draggedCenterY = currentY + draggedElement.size.height / 2;
            // Page center and edges
            const pageCenterX = pageWidth / 2;
            const pageCenterY = pageHeight / 2;
            // Check alignment with page center
            if (Math.abs(draggedCenterX - pageCenterX) < SNAP_DISTANCE) {
                guides.vertical.push(pageCenterX);
            }
            if (Math.abs(draggedCenterY - pageCenterY) < SNAP_DISTANCE) {
                guides.horizontal.push(pageCenterY);
            }
            // Check alignment with page edges and margins
            if (Math.abs(draggedLeft - margins.left) < SNAP_DISTANCE) {
                guides.vertical.push(margins.left);
            }
            if (Math.abs(draggedRight - (pageWidth - margins.right)) < SNAP_DISTANCE) {
                guides.vertical.push(pageWidth - margins.right);
            }
            if (Math.abs(draggedTop - margins.top) < SNAP_DISTANCE) {
                guides.horizontal.push(margins.top);
            }
            if (Math.abs(draggedBottom - (pageHeight - margins.bottom)) < SNAP_DISTANCE) {
                guides.horizontal.push(pageHeight - margins.bottom);
            }
            // Check alignment with other elements
            elements.forEach({
                "EnhancedHTMLEditor.useCallback[calculateAlignmentGuides]": (element)=>{
                    if (element.id === draggedElement.id || !element.visible) return;
                    const elLeft = element.position.x;
                    const elRight = element.position.x + element.size.width;
                    const elTop = element.position.y;
                    const elBottom = element.position.y + element.size.height;
                    const elCenterX = element.position.x + element.size.width / 2;
                    const elCenterY = element.position.y + element.size.height / 2;
                    // Vertical alignment (left, center, right)
                    if (Math.abs(draggedLeft - elLeft) < SNAP_DISTANCE) {
                        guides.vertical.push(elLeft);
                    }
                    if (Math.abs(draggedRight - elRight) < SNAP_DISTANCE) {
                        guides.vertical.push(elRight);
                    }
                    if (Math.abs(draggedCenterX - elCenterX) < SNAP_DISTANCE) {
                        guides.vertical.push(elCenterX);
                    }
                    // Horizontal alignment (top, center, bottom)
                    if (Math.abs(draggedTop - elTop) < SNAP_DISTANCE) {
                        guides.horizontal.push(elTop);
                    }
                    if (Math.abs(draggedBottom - elBottom) < SNAP_DISTANCE) {
                        guides.horizontal.push(elBottom);
                    }
                    if (Math.abs(draggedCenterY - elCenterY) < SNAP_DISTANCE) {
                        guides.horizontal.push(elCenterY);
                    }
                }
            }["EnhancedHTMLEditor.useCallback[calculateAlignmentGuides]"]);
            return guides;
        }
    }["EnhancedHTMLEditor.useCallback[calculateAlignmentGuides]"], [
        elements,
        pageWidth,
        pageHeight,
        margins
    ]);
    // ============================================================================
    // Drag & Drop Handlers
    // ============================================================================
    const handleDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleDrag]": (elementId, e, data)=>{
            setIsDragging(true);
            const element = elements.find({
                "EnhancedHTMLEditor.useCallback[handleDrag].element": (el)=>el.id === elementId
            }["EnhancedHTMLEditor.useCallback[handleDrag].element"]);
            if (!element) return;
            // Auto-scroll when dragging near edges
            if (canvasRef.current) {
                const scrollContainer = canvasRef.current.parentElement;
                if (scrollContainer) {
                    const rect = scrollContainer.getBoundingClientRect();
                    const mouseY = e.clientY;
                    const mouseX = e.clientX;
                    const SCROLL_THRESHOLD = 50; // pixels from edge to trigger scroll
                    const SCROLL_SPEED = 10; // pixels to scroll per frame
                    // Scroll down when near bottom
                    if (mouseY > rect.bottom - SCROLL_THRESHOLD) {
                        scrollContainer.scrollTop += SCROLL_SPEED;
                    } else if (mouseY < rect.top + SCROLL_THRESHOLD) {
                        scrollContainer.scrollTop -= SCROLL_SPEED;
                    }
                    // Scroll right when near right edge
                    if (mouseX > rect.right - SCROLL_THRESHOLD) {
                        scrollContainer.scrollLeft += SCROLL_SPEED;
                    } else if (mouseX < rect.left + SCROLL_THRESHOLD) {
                        scrollContainer.scrollLeft -= SCROLL_SPEED;
                    }
                }
            }
            let snappedX = data.x;
            let snappedY = data.y;
            // Calculate dragged element bounds
            const draggedLeft = data.x;
            const draggedRight = data.x + element.size.width;
            const draggedTop = data.y;
            const draggedBottom = data.y + element.size.height;
            const draggedCenterX = data.x + element.size.width / 2;
            const draggedCenterY = data.y + element.size.height / 2;
            // Page center
            const pageCenterX = pageWidth / 2;
            const pageCenterY = pageHeight / 2;
            const guides = {
                vertical: [],
                horizontal: []
            };
            let alignType = '';
            // Snap to page center
            if (Math.abs(draggedCenterX - pageCenterX) < SNAP_DISTANCE) {
                snappedX = pageCenterX - element.size.width / 2;
                guides.vertical.push(pageCenterX);
                alignType = 'مركز الصفحة';
            }
            if (Math.abs(draggedCenterY - pageCenterY) < SNAP_DISTANCE) {
                snappedY = pageCenterY - element.size.height / 2;
                guides.horizontal.push(pageCenterY);
                alignType = alignType ? alignType + ' + مركز الصفحة' : 'مركز الصفحة';
            }
            // Snap to page edges and margins
            if (Math.abs(draggedLeft - margins.left) < SNAP_DISTANCE) {
                snappedX = margins.left;
                guides.vertical.push(margins.left);
                alignType = alignType || 'هامش الصفحة';
            }
            if (Math.abs(draggedRight - (pageWidth - margins.right)) < SNAP_DISTANCE) {
                snappedX = pageWidth - margins.right - element.size.width;
                guides.vertical.push(pageWidth - margins.right);
                alignType = alignType || 'هامش الصفحة';
            }
            if (Math.abs(draggedTop - margins.top) < SNAP_DISTANCE) {
                snappedY = margins.top;
                guides.horizontal.push(margins.top);
                alignType = alignType || 'هامش الصفحة';
            }
            if (Math.abs(draggedBottom - (pageHeight - margins.bottom)) < SNAP_DISTANCE) {
                snappedY = pageHeight - margins.bottom - element.size.height;
                guides.horizontal.push(pageHeight - margins.bottom);
                alignType = alignType || 'هامش الصفحة';
            }
            // Snap to other elements
            elements.forEach({
                "EnhancedHTMLEditor.useCallback[handleDrag]": (el)=>{
                    if (el.id === elementId || !el.visible) return;
                    const elLeft = el.position.x;
                    const elRight = el.position.x + el.size.width;
                    const elTop = el.position.y;
                    const elBottom = el.position.y + el.size.height;
                    const elCenterX = el.position.x + el.size.width / 2;
                    const elCenterY = el.position.y + el.size.height / 2;
                    // Vertical snapping
                    if (Math.abs(draggedLeft - elLeft) < SNAP_DISTANCE) {
                        snappedX = elLeft;
                        guides.vertical.push(elLeft);
                        alignType = alignType || 'محاذاة مع عنصر';
                    } else if (Math.abs(draggedRight - elRight) < SNAP_DISTANCE) {
                        snappedX = elRight - element.size.width;
                        guides.vertical.push(elRight);
                        alignType = alignType || 'محاذاة مع عنصر';
                    } else if (Math.abs(draggedCenterX - elCenterX) < SNAP_DISTANCE) {
                        snappedX = elCenterX - element.size.width / 2;
                        guides.vertical.push(elCenterX);
                        alignType = alignType || 'محاذاة مع عنصر';
                    }
                    // Horizontal snapping
                    if (Math.abs(draggedTop - elTop) < SNAP_DISTANCE) {
                        snappedY = elTop;
                        guides.horizontal.push(elTop);
                        alignType = alignType || 'محاذاة مع عنصر';
                    } else if (Math.abs(draggedBottom - elBottom) < SNAP_DISTANCE) {
                        snappedY = elBottom - element.size.height;
                        guides.horizontal.push(elBottom);
                        alignType = alignType || 'محاذاة مع عنصر';
                    } else if (Math.abs(draggedCenterY - elCenterY) < SNAP_DISTANCE) {
                        snappedY = elCenterY - element.size.height / 2;
                        guides.horizontal.push(elCenterY);
                        alignType = alignType || 'محاذاة مع عنصر';
                    }
                }
            }["EnhancedHTMLEditor.useCallback[handleDrag]"]);
            setAlignmentGuides(guides);
            setAlignmentType(alignType);
        // DON'T update element position during drag
        // Let Draggable handle the position internally
        // Position will be updated only in handleDragStop
        }
    }["EnhancedHTMLEditor.useCallback[handleDrag]"], [
        elements,
        pageWidth,
        pageHeight,
        margins
    ]);
    const handleDragStop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleDragStop]": (elementId, e, data)=>{
            setIsDragging(false);
            setAlignmentGuides({
                vertical: [],
                horizontal: []
            });
            setAlignmentType('');
            const element = elements.find({
                "EnhancedHTMLEditor.useCallback[handleDragStop].element": (el)=>el.id === elementId
            }["EnhancedHTMLEditor.useCallback[handleDragStop].element"]);
            if (!element) return;
            // Phase 6: Multi-Element Drag
            // If multiple elements are selected and this element is one of them, move all selected elements
            const isMultiDrag = selectedElementIds.length > 1 && selectedElementIds.includes(elementId);
            if (isMultiDrag) {
                // Calculate the delta (how much the dragged element moved)
                const deltaX = data.x - element.position.x;
                const deltaY = data.y - element.position.y;
                // Move all selected elements by the same delta
                setElements({
                    "EnhancedHTMLEditor.useCallback[handleDragStop]": (prev)=>{
                        const updated = prev.map({
                            "EnhancedHTMLEditor.useCallback[handleDragStop].updated": (el)=>{
                                if (selectedElementIds.includes(el.id)) {
                                    return {
                                        ...el,
                                        position: {
                                            x: el.position.x + deltaX,
                                            y: el.position.y + deltaY
                                        }
                                    };
                                }
                                return el;
                            }
                        }["EnhancedHTMLEditor.useCallback[handleDragStop].updated"]);
                        saveToHistory(updated);
                        return updated;
                    }
                }["EnhancedHTMLEditor.useCallback[handleDragStop]"]);
                return; // Exit early, no need for snapping in multi-drag
            }
            // Single element drag (original behavior with snapping)
            let finalX = data.x;
            let finalY = data.y;
            // Apply alignment snapping first (higher priority)
            const SNAP_DISTANCE = 5;
            // Calculate dragged element bounds
            const draggedLeft = data.x;
            const draggedRight = data.x + element.size.width;
            const draggedTop = data.y;
            const draggedBottom = data.y + element.size.height;
            const draggedCenterX = data.x + element.size.width / 2;
            const draggedCenterY = data.y + element.size.height / 2;
            // Page center
            const pageCenterX = pageWidth / 2;
            const pageCenterY = pageHeight / 2;
            // Snap to page center
            if (Math.abs(draggedCenterX - pageCenterX) < SNAP_DISTANCE) {
                finalX = pageCenterX - element.size.width / 2;
            }
            if (Math.abs(draggedCenterY - pageCenterY) < SNAP_DISTANCE) {
                finalY = pageCenterY - element.size.height / 2;
            }
            // Snap to page edges and margins
            if (Math.abs(draggedLeft - margins.left) < SNAP_DISTANCE) {
                finalX = margins.left;
            }
            if (Math.abs(draggedRight - (pageWidth - margins.right)) < SNAP_DISTANCE) {
                finalX = pageWidth - margins.right - element.size.width;
            }
            if (Math.abs(draggedTop - margins.top) < SNAP_DISTANCE) {
                finalY = margins.top;
            }
            if (Math.abs(draggedBottom - (pageHeight - margins.bottom)) < SNAP_DISTANCE) {
                finalY = pageHeight - margins.bottom - element.size.height;
            }
            // Snap to other elements
            elements.forEach({
                "EnhancedHTMLEditor.useCallback[handleDragStop]": (el)=>{
                    if (el.id === elementId || !el.visible) return;
                    const elLeft = el.position.x;
                    const elRight = el.position.x + el.size.width;
                    const elTop = el.position.y;
                    const elBottom = el.position.y + el.size.height;
                    const elCenterX = el.position.x + el.size.width / 2;
                    const elCenterY = el.position.y + el.size.height / 2;
                    // Vertical snapping
                    if (Math.abs(draggedLeft - elLeft) < SNAP_DISTANCE) {
                        finalX = elLeft;
                    } else if (Math.abs(draggedRight - elRight) < SNAP_DISTANCE) {
                        finalX = elRight - element.size.width;
                    } else if (Math.abs(draggedCenterX - elCenterX) < SNAP_DISTANCE) {
                        finalX = elCenterX - element.size.width / 2;
                    }
                    // Horizontal snapping
                    if (Math.abs(draggedTop - elTop) < SNAP_DISTANCE) {
                        finalY = elTop;
                    } else if (Math.abs(draggedBottom - elBottom) < SNAP_DISTANCE) {
                        finalY = elBottom - element.size.height;
                    } else if (Math.abs(draggedCenterY - elCenterY) < SNAP_DISTANCE) {
                        finalY = elCenterY - element.size.height / 2;
                    }
                }
            }["EnhancedHTMLEditor.useCallback[handleDragStop]"]);
            // Apply grid snapping if no alignment snapping occurred
            if (finalX === data.x) {
                finalX = snapToGrid(data.x);
            }
            if (finalY === data.y) {
                finalY = snapToGrid(data.y);
            }
            updateElement(elementId, {
                position: {
                    x: finalX,
                    y: finalY
                }
            });
        }
    }["EnhancedHTMLEditor.useCallback[handleDragStop]"], [
        elements,
        selectedElementIds,
        pageWidth,
        pageHeight,
        margins,
        snapToGrid,
        updateElement,
        saveToHistory
    ]);
    const handleResize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleResize]": (elementId, e, data)=>{
            // Apply grid snapping for smoother, faster resize (10px increments)
            const snappedWidth = Math.round(data.size.width / 10) * 10;
            const snappedHeight = Math.round(data.size.height / 10) * 10;
            // Update resizing state for real-time visual feedback
            setResizingElements({
                "EnhancedHTMLEditor.useCallback[handleResize]": (prev)=>({
                        ...prev,
                        [elementId]: {
                            width: snappedWidth,
                            height: snappedHeight
                        }
                    })
            }["EnhancedHTMLEditor.useCallback[handleResize]"]);
        }
    }["EnhancedHTMLEditor.useCallback[handleResize]"], []);
    const handleResizeStop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleResizeStop]": (elementId, e, data)=>{
            // Apply grid snapping to final size (10px increments)
            const snappedWidth = Math.round(data.size.width / 10) * 10;
            const snappedHeight = Math.round(data.size.height / 10) * 10;
            // Clear resizing state
            setResizingElements({
                "EnhancedHTMLEditor.useCallback[handleResizeStop]": (prev)=>{
                    const newState = {
                        ...prev
                    };
                    delete newState[elementId];
                    return newState;
                }
            }["EnhancedHTMLEditor.useCallback[handleResizeStop]"]);
            // Update element size with snapped values
            const updatedElements = elements.map({
                "EnhancedHTMLEditor.useCallback[handleResizeStop].updatedElements": (el)=>el.id === elementId ? {
                        ...el,
                        size: {
                            width: snappedWidth,
                            height: snappedHeight
                        }
                    } : el
            }["EnhancedHTMLEditor.useCallback[handleResizeStop].updatedElements"]);
            setElements(updatedElements);
            // Save to history for undo/redo
            saveToHistory(updatedElements);
        }
    }["EnhancedHTMLEditor.useCallback[handleResizeStop]"], [
        elements,
        saveToHistory
    ]);
    // ============================================================================
    // Export to PDF
    // ============================================================================
    const handleExport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EnhancedHTMLEditor.useCallback[handleExport]": async ()=>{
            if (!canvasRef.current) return;
            setIsExporting(true);
            try {
                // Step 1: Deselect all elements to hide UI controls
                const originalSelectedId = selectedElementId;
                setSelectedElementId(null);
                // Step 2: Temporarily disable grid
                const originalGridEnabled = gridEnabled;
                setGridEnabled(false);
                // Step 3: Temporarily set zoom to 1 for export
                const originalZoom = zoom;
                setZoom(1);
                // Step 4: Store current page
                const originalPageId = currentPageId;
                // Step 5: Wait for re-render (longer wait to ensure all changes applied)
                await new Promise({
                    "EnhancedHTMLEditor.useCallback[handleExport]": (resolve)=>setTimeout(resolve, 300)
                }["EnhancedHTMLEditor.useCallback[handleExport]"]);
                // Step 6: Create PDF
                const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                    orientation: editorSettings.page.orientation === 'landscape' ? 'landscape' : 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                // Step 7: Sort pages by order
                const sortedPages = [
                    ...pages
                ].sort({
                    "EnhancedHTMLEditor.useCallback[handleExport].sortedPages": (a, b)=>a.order - b.order
                }["EnhancedHTMLEditor.useCallback[handleExport].sortedPages"]);
                // Step 8: Loop through all pages and capture each one
                for(let i = 0; i < sortedPages.length; i++){
                    const page = sortedPages[i];
                    // Switch to this page
                    setCurrentPageId(page.id);
                    // Wait for page to render and fonts to load
                    await new Promise({
                        "EnhancedHTMLEditor.useCallback[handleExport]": (resolve)=>setTimeout(resolve, 500)
                    }["EnhancedHTMLEditor.useCallback[handleExport]"]);
                    // Ensure fonts are fully loaded before capture
                    if (document.fonts) {
                        await document.fonts.ready;
                    }
                    // Capture this page as image with enhanced quality
                    const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(canvasRef.current, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#ffffff',
                        logging: false,
                        imageTimeout: 0,
                        removeContainer: true,
                        scrollY: -window.scrollY,
                        scrollX: -window.scrollX,
                        windowWidth: canvasRef.current.scrollWidth,
                        windowHeight: canvasRef.current.scrollHeight,
                        foreignObjectRendering: false,
                        ignoreElements: {
                            "EnhancedHTMLEditor.useCallback[handleExport]": (element)=>{
                                // Ignore rotation handles, resize handles, and other UI elements
                                return element.classList.contains('rotation-handle') || element.classList.contains('react-resizable-handle') || element.classList.contains('selection-ring') || element.classList.contains('resize-tooltip');
                            }
                        }["EnhancedHTMLEditor.useCallback[handleExport]"],
                        onclone: {
                            "EnhancedHTMLEditor.useCallback[handleExport]": (clonedDoc)=>{
                                // Apply enhanced rendering to all elements in the cloned document
                                const allElements = clonedDoc.querySelectorAll('*');
                                allElements.forEach({
                                    "EnhancedHTMLEditor.useCallback[handleExport]": (el)=>{
                                        if (el instanceof HTMLElement && el.style) {
                                            // Enhanced text rendering for Arabic
                                            el.style.setProperty('text-rendering', 'optimizeLegibility', 'important');
                                            el.style.setProperty('-webkit-font-smoothing', 'antialiased', 'important');
                                            el.style.setProperty('-moz-osx-font-smoothing', 'grayscale', 'important');
                                            el.style.setProperty('font-smooth', 'always', 'important');
                                            // Critical: Ensure overflow is visible for Arabic text
                                            el.style.setProperty('overflow', 'visible', 'important');
                                            el.style.setProperty('contain', 'none', 'important');
                                            el.style.setProperty('clip-path', 'none', 'important');
                                            el.style.setProperty('mask', 'none', 'important');
                                            // Ensure proper letter spacing for Arabic
                                            el.style.setProperty('letter-spacing', 'normal', 'important');
                                            el.style.setProperty('word-spacing', 'normal', 'important');
                                        }
                                    }
                                }["EnhancedHTMLEditor.useCallback[handleExport]"]);
                                // Special handling for h1 elements (titles)
                                const titleElements = clonedDoc.querySelectorAll('h1');
                                titleElements.forEach({
                                    "EnhancedHTMLEditor.useCallback[handleExport]": (el)=>{
                                        if (el instanceof HTMLElement && el.style) {
                                            el.style.setProperty('line-height', '2.2', 'important');
                                            el.style.setProperty('padding-top', '0', 'important');
                                            el.style.setProperty('padding-bottom', '0', 'important');
                                            el.style.setProperty('margin-top', '0', 'important');
                                            el.style.setProperty('margin-bottom', '0', 'important');
                                            el.style.setProperty('overflow', 'visible', 'important');
                                            el.style.setProperty('contain', 'none', 'important');
                                            el.style.setProperty('box-sizing', 'content-box', 'important');
                                            el.style.setProperty('clip-path', 'none', 'important');
                                            el.style.setProperty('mask', 'none', 'important');
                                        }
                                    }
                                }["EnhancedHTMLEditor.useCallback[handleExport]"]);
                                // Remove height constraints from title containers
                                const titleContainers = clonedDoc.querySelectorAll('[class*="transition-all"]');
                                titleContainers.forEach({
                                    "EnhancedHTMLEditor.useCallback[handleExport]": (el)=>{
                                        if (el instanceof HTMLElement && el.style) {
                                            const currentHeight = el.style.height;
                                            if (currentHeight) {
                                                el.style.setProperty('min-height', currentHeight, 'important');
                                                el.style.setProperty('height', 'auto', 'important');
                                            }
                                        }
                                    }
                                }["EnhancedHTMLEditor.useCallback[handleExport]"]);
                            }
                        }["EnhancedHTMLEditor.useCallback[handleExport]"]
                    });
                    // Add page to PDF (add new page if not first)
                    if (i > 0) {
                        pdf.addPage();
                    }
                    const imgData = canvas.toDataURL('image/png');
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                }
                // Step 9: Download
                pdf.save(`${sampleData?.eventTitle || 'document'}-edited.pdf`);
                // Step 10: Restore original state
                setCurrentPageId(originalPageId);
                setZoom(originalZoom);
                setGridEnabled(originalGridEnabled);
                setSelectedElementId(originalSelectedId);
                if (onExport) {
                    const blob = pdf.output('blob');
                    onExport(blob);
                }
            } catch (error) {
                console.error('Export failed:', error);
                alert('فشل التصدير. يرجى المحاولة مرة أخرى.');
            } finally{
                setIsExporting(false);
            }
        }
    }["EnhancedHTMLEditor.useCallback[handleExport]"], [
        zoom,
        editorSettings,
        sampleData,
        onExport,
        selectedElementId,
        gridEnabled,
        currentPageId,
        pages,
        setSelectedElementId
    ]);
    // ============================================================================
    // Keyboard Shortcuts
    // ============================================================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EnhancedHTMLEditor.useEffect": ()=>{
            const handleKeyDown = {
                "EnhancedHTMLEditor.useEffect.handleKeyDown": (e)=>{
                    // Ignore if user is editing text in an input, textarea, or contentEditable element
                    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLElement && e.target.isContentEditable) {
                        return;
                    }
                    // Phase 4: Delete selected elements (single or multiple)
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                        if (selectedElementIds.length > 0) {
                            e.preventDefault();
                            deleteSelectedElements();
                        }
                    }
                    // Undo/Redo
                    if (e.ctrlKey || e.metaKey) {
                        if (e.key === 'z' && !e.shiftKey) {
                            e.preventDefault();
                            undo();
                        } else if (e.key === 'z' && e.shiftKey || e.key === 'y') {
                            e.preventDefault();
                            redo();
                        }
                    }
                    // Transform shortcuts (only when element is selected)
                    if (selectedElementId) {
                        // Use functional update to avoid dependency on elements
                        setElements({
                            "EnhancedHTMLEditor.useEffect.handleKeyDown": (prevElements)=>{
                                const selectedElement = prevElements.find({
                                    "EnhancedHTMLEditor.useEffect.handleKeyDown.selectedElement": (el)=>el.id === selectedElementId
                                }["EnhancedHTMLEditor.useEffect.handleKeyDown.selectedElement"]);
                                if (!selectedElement || !('transform' in selectedElement)) {
                                    return prevElements;
                                }
                                const element = selectedElement;
                                let newTransform = {
                                    ...element.transform
                                };
                                let shouldUpdate = false;
                                // R - Rotate 90° clockwise
                                if (e.key === 'r' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
                                    e.preventDefault();
                                    newTransform = {
                                        ...newTransform,
                                        rotation: (element.transform.rotation + 90) % 360
                                    };
                                    shouldUpdate = true;
                                }
                                // Shift+R - Rotate 90° counter-clockwise
                                if (e.key === 'R' && e.shiftKey && !e.ctrlKey && !e.metaKey) {
                                    e.preventDefault();
                                    newTransform = {
                                        ...newTransform,
                                        rotation: (element.transform.rotation - 90 + 360) % 360
                                    };
                                    shouldUpdate = true;
                                }
                                // H - Flip horizontal
                                if (e.key === 'h' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
                                    e.preventDefault();
                                    newTransform = {
                                        ...newTransform,
                                        flipHorizontal: !element.transform.flipHorizontal
                                    };
                                    shouldUpdate = true;
                                }
                                // V - Flip vertical
                                if (e.key === 'v' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
                                    e.preventDefault();
                                    newTransform = {
                                        ...newTransform,
                                        flipVertical: !element.transform.flipVertical
                                    };
                                    shouldUpdate = true;
                                }
                                if (!shouldUpdate) {
                                    return prevElements;
                                }
                                const newElements = prevElements.map({
                                    "EnhancedHTMLEditor.useEffect.handleKeyDown.newElements": (el)=>el.id === selectedElementId ? {
                                            ...el,
                                            transform: newTransform
                                        } : el
                                }["EnhancedHTMLEditor.useEffect.handleKeyDown.newElements"]);
                                // Save to history
                                saveToHistory(newElements);
                                return newElements;
                            }
                        }["EnhancedHTMLEditor.useEffect.handleKeyDown"]);
                    }
                }
            }["EnhancedHTMLEditor.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "EnhancedHTMLEditor.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["EnhancedHTMLEditor.useEffect"];
        }
    }["EnhancedHTMLEditor.useEffect"], [
        selectedElementId,
        selectedElementIds,
        deleteSelectedElements,
        undo,
        redo,
        saveToHistory
    ]);
    // ============================================================================
    // Phase 4: Multi-Selection Keyboard Shortcuts
    // ============================================================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EnhancedHTMLEditor.useEffect": ()=>{
            const handleMultiSelectionKeyDown = {
                "EnhancedHTMLEditor.useEffect.handleMultiSelectionKeyDown": (e)=>{
                    // Ignore if user is typing in an input
                    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                        return;
                    }
                    // Ctrl+C: Copy
                    if (e.ctrlKey && e.key === 'c' && selectedElementIds.length > 0) {
                        e.preventDefault();
                        copySelectedElements();
                    }
                    // Ctrl+V: Paste
                    if (e.ctrlKey && e.key === 'v' && clipboard.length > 0) {
                        e.preventDefault();
                        pasteElements();
                    }
                    // Ctrl+X: Cut
                    if (e.ctrlKey && e.key === 'x' && selectedElementIds.length > 0) {
                        e.preventDefault();
                        copySelectedElements();
                        deleteSelectedElements();
                    }
                    // Ctrl+A: Select All
                    if (e.ctrlKey && e.key === 'a') {
                        e.preventDefault();
                        selectAll();
                    }
                    // Escape: Clear selection
                    if (e.key === 'Escape' && selectedElementIds.length > 0) {
                        e.preventDefault();
                        clearSelection();
                    }
                }
            }["EnhancedHTMLEditor.useEffect.handleMultiSelectionKeyDown"];
            window.addEventListener('keydown', handleMultiSelectionKeyDown);
            return ({
                "EnhancedHTMLEditor.useEffect": ()=>window.removeEventListener('keydown', handleMultiSelectionKeyDown)
            })["EnhancedHTMLEditor.useEffect"];
        }
    }["EnhancedHTMLEditor.useEffect"], [
        selectedElementIds,
        clipboard,
        copySelectedElements,
        pasteElements,
        deleteSelectedElements,
        selectAll,
        clearSelection
    ]);
    // ============================================================================
    // Render
    // ============================================================================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-b",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2 flex items-center gap-1 flex-wrap",
                    children: [
                        onBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onBack,
                            variant: "outline",
                            size: "sm",
                            className: "gap-2 border-purple-200 text-purple-700 hover:bg-purple-50",
                            title: "العودة للمعاينة",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline",
                                    children: "العودة للمعاينة"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3224,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3216,
                            columnNumber: 11
                        }, this),
                        onBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                            orientation: "vertical",
                            className: "h-6 mx-0.5"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3228,
                            columnNumber: 20
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleExport,
                            disabled: isExporting,
                            size: "sm",
                            className: "bg-blue-600 hover:bg-blue-700 text-white",
                            title: "تصدير PDF",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 3238,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3231,
                            columnNumber: 9
                        }, this),
                        elements.some((el)=>isElementOutOfBounds(el) || isElementOutOfPrintArea(el)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            onClick: fitAllElementsToPage,
                            className: "border-yellow-500 text-yellow-700 hover:bg-yellow-50",
                            title: "إرجاع جميع العناصر داخل حدود الطباعة",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 3250,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                            orientation: "vertical",
                            className: "h-6 mx-0.5"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3254,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "gap-1 min-w-[70px]",
                                        title: "التكبير/التصغير",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3260,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs",
                                                children: [
                                                    Math.round(zoom * 100),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3261,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3259,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3258,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                    align: "start",
                                    className: "w-[180px] p-2 bg-white opacity-100 border shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: handleZoomOut,
                                                disabled: zoom <= 0.1,
                                                className: "justify-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3273,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "تصغير"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3274,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3266,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: handleZoomIn,
                                                disabled: zoom >= 2.0,
                                                className: "justify-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3283,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "تكبير"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3284,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3276,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3286,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: handleZoomFit,
                                                className: "justify-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3293,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "ملء الشاشة"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3294,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3287,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: handleZoomReset,
                                                className: "justify-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3302,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "إعادة تعيين (100%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3303,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3296,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3265,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3264,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3257,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                            orientation: "vertical",
                            className: "h-6 mx-0.5"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3309,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "gap-1 min-w-[60px]",
                                        title: "الصفحات",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3315,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs",
                                                children: [
                                                    pages.findIndex((p)=>p.id === currentPageId) + 1,
                                                    "/",
                                                    pages.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3316,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3314,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3313,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                    align: "start",
                                    className: "w-[200px] p-2 bg-white opacity-100 border shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        onClick: ()=>{
                                                            const currentIndex = pages.findIndex((p)=>p.id === currentPageId);
                                                            if (currentIndex > 0) {
                                                                goToPage(pages[currentIndex - 1].id);
                                                            }
                                                        },
                                                        disabled: pages.findIndex((p)=>p.id === currentPageId) === 0,
                                                        className: "flex-1",
                                                        title: "الصفحة السابقة",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3335,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3322,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        onClick: ()=>{
                                                            const currentIndex = pages.findIndex((p)=>p.id === currentPageId);
                                                            if (currentIndex < pages.length - 1) {
                                                                goToPage(pages[currentIndex + 1].id);
                                                            }
                                                        },
                                                        disabled: pages.findIndex((p)=>p.id === currentPageId) === pages.length - 1,
                                                        className: "flex-1",
                                                        title: "الصفحة التالية",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3350,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3337,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3321,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3353,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: addPage,
                                                className: "justify-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3360,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "إضافة صفحة"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3361,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3354,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ()=>deletePage(currentPageId),
                                                disabled: pages.length === 1,
                                                className: "justify-start gap-2 text-red-500 hover:text-red-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3370,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "حذف الصفحة"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3371,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3363,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3320,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3319,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3312,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                            orientation: "vertical",
                            className: "h-6 mx-0.5"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3377,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "gap-1",
                                        title: "إضافة عنصر",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3383,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs",
                                                children: "إضافة"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3384,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3382,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3381,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                    align: "start",
                                    className: "w-[160px] p-2 bg-white opacity-100 border shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ()=>{
                                                    const titleElement = elements.find((el)=>el.type === 'title');
                                                    const startY = titleElement ? titleElement.position.y + titleElement.size.height + 80 : margins.top + 80;
                                                    const newTextElement = {
                                                        id: `text-${Date.now()}`,
                                                        type: 'text',
                                                        content: 'انقر مرتين للتحرير',
                                                        position: {
                                                            x: margins.left + 50,
                                                            y: startY
                                                        },
                                                        size: {
                                                            width: 200,
                                                            height: 100
                                                        },
                                                        fontSize: 16,
                                                        color: '#000000',
                                                        fontWeight: 'normal',
                                                        fontStyle: 'normal',
                                                        textDecoration: 'none',
                                                        textAlign: 'right',
                                                        visible: true,
                                                        locked: false,
                                                        zIndex: elements.length,
                                                        transform: {
                                                            ...DEFAULT_TRANSFORM
                                                        },
                                                        pageId: currentPageId
                                                    };
                                                    setElements((prev)=>{
                                                        const updated = [
                                                            ...prev,
                                                            newTextElement
                                                        ];
                                                        saveToHistory(updated);
                                                        return updated;
                                                    });
                                                },
                                                className: "justify-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3424,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "نص"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3425,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3389,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ()=>{
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.accept = 'image/*';
                                                    input.onchange = (e)=>{
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = (event)=>{
                                                                const titleElement = elements.find((el)=>el.type === 'title');
                                                                const startY = titleElement ? titleElement.position.y + titleElement.size.height + 80 : margins.top + 80;
                                                                const newImageElement = {
                                                                    id: `image-${Date.now()}`,
                                                                    type: 'image',
                                                                    src: event.target?.result,
                                                                    position: {
                                                                        x: margins.left + 100,
                                                                        y: startY
                                                                    },
                                                                    size: {
                                                                        width: 200,
                                                                        height: 200
                                                                    },
                                                                    visible: true,
                                                                    locked: false,
                                                                    zIndex: elements.length,
                                                                    transform: {
                                                                        ...DEFAULT_TRANSFORM
                                                                    },
                                                                    pageId: currentPageId
                                                                };
                                                                setElements((prev)=>{
                                                                    const updated = [
                                                                        ...prev,
                                                                        newImageElement
                                                                    ];
                                                                    saveToHistory(updated);
                                                                    return updated;
                                                                });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    };
                                                    input.click();
                                                },
                                                className: "justify-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3470,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "صورة"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3471,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3428,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3388,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3387,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3380,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                            orientation: "vertical",
                            className: "h-6 mx-0.5"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3477,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: gridEnabled ? "default" : "ghost",
                                    size: "sm",
                                    onClick: ()=>setGridEnabled(!gridEnabled),
                                    title: "شبكة",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__["Grid3x3"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3487,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3481,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: snapEnabled ? "default" : "ghost",
                                    size: "sm",
                                    onClick: ()=>setSnapEnabled(!snapEnabled),
                                    title: "التصاق",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$magnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Magnet$3e$__["Magnet"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3496,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3490,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3480,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                            orientation: "vertical",
                            className: "h-6 mx-0.5"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3500,
                            columnNumber: 9
                        }, this),
                        selectedElementId && elements.find((el)=>el.id === selectedElementId && el.type === 'text') && (()=>{
                            const textElement = elements.find((el)=>el.id === selectedElementId && el.type === 'text');
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "gap-1",
                                                    title: "تنسيق النص",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3511,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs",
                                                            children: "نص"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3512,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 3510,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3509,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                align: "start",
                                                className: "w-[300px] p-4 bg-white opacity-100 border shadow-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                                        className: "text-sm font-semibold mb-2",
                                                        children: "تنسيق النص"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3516,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3517,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-600 mb-2",
                                                                children: "حجم الخط"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 3521,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                fontSize: Math.max(8, textElement.fontSize - 2)
                                                                            });
                                                                        },
                                                                        title: "تصغير الخط",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                            className: "w-3 h-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3533,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3523,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 py-1.5 text-sm font-medium min-w-[50px] text-center bg-gray-100 rounded",
                                                                        children: [
                                                                            textElement.fontSize,
                                                                            "px"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3536,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                fontSize: Math.min(72, textElement.fontSize + 2)
                                                                            });
                                                                        },
                                                                        title: "تكبير الخط",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                            className: "w-3 h-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3550,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3540,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 3522,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3520,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3555,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-600 mb-2",
                                                                children: "نمط النص"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 3559,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: textElement.fontWeight === 'bold' ? "default" : "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                fontWeight: textElement.fontWeight === 'bold' ? 'normal' : 'bold'
                                                                            });
                                                                        },
                                                                        title: "عريض",
                                                                        className: "flex-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__["Bold"], {
                                                                                className: "w-4 h-4 mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3572,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs",
                                                                                children: "عريض"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3573,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3561,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: textElement.fontStyle === 'italic' ? "default" : "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                fontStyle: textElement.fontStyle === 'italic' ? 'normal' : 'italic'
                                                                            });
                                                                        },
                                                                        title: "مائل",
                                                                        className: "flex-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__["Italic"], {
                                                                                className: "w-4 h-4 mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3587,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs",
                                                                                children: "مائل"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3588,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3576,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: textElement.textDecoration === 'underline' ? "default" : "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                textDecoration: textElement.textDecoration === 'underline' ? 'none' : 'underline'
                                                                            });
                                                                        },
                                                                        title: "تسطير",
                                                                        className: "flex-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__["Underline"], {
                                                                                className: "w-4 h-4 mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3602,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs",
                                                                                children: "تسطير"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3603,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3591,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 3560,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3558,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3608,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-600 mb-2",
                                                                children: "المحاذاة"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 3612,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-4 gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: textElement.textAlign === 'left' ? "default" : "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                textAlign: 'left'
                                                                            });
                                                                        },
                                                                        title: "محاذاة لليسار",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3622,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3614,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: textElement.textAlign === 'center' ? "default" : "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                textAlign: 'center'
                                                                            });
                                                                        },
                                                                        title: "محاذاة للوسط",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__["AlignCenter"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3633,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3625,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: textElement.textAlign === 'right' ? "default" : "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                textAlign: 'right'
                                                                            });
                                                                        },
                                                                        title: "محاذاة لليمين",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__["AlignRight"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3644,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3636,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: textElement.textAlign === 'justify' ? "default" : "outline",
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            updateElement(selectedElementId, {
                                                                                textAlign: 'justify'
                                                                            });
                                                                        },
                                                                        title: "ضبط",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$justify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignJustify$3e$__["AlignJustify"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3655,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 3647,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 3613,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3611,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3660,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-600 mb-2",
                                                                children: "لون النص"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 3664,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "color",
                                                                value: textElement.color,
                                                                onChange: (e)=>{
                                                                    updateElement(selectedElementId, {
                                                                        color: e.target.value
                                                                    });
                                                                },
                                                                className: "w-full h-10 rounded cursor-pointer border-2 border-gray-300",
                                                                title: "لون النص"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 3665,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3663,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3515,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3508,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                        orientation: "vertical",
                                        className: "h-6 mx-0.5"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3678,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true);
                        })(),
                        selectedElementIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: copySelectedElements,
                                            title: "نسخ (Ctrl+C)",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3693,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 3687,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: pasteElements,
                                            disabled: clipboard.length === 0,
                                            title: "لصق (Ctrl+V)",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__["Clipboard"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3703,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 3696,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: deleteSelectedElements,
                                            title: "حذف (Delete)",
                                            className: "text-red-500 hover:text-red-700",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3713,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 3706,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3686,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                    orientation: "vertical",
                                    className: "h-6 mx-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3717,
                                    columnNumber: 13
                                }, this),
                                selectedElementIds.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: createGroup,
                                    title: "تجميع العناصر المحددة",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$group$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Group$3e$__["Group"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3727,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3721,
                                    columnNumber: 15
                                }, this),
                                selectedElementIds.length === 1 && elements.find((el)=>el.id === selectedElementIds[0])?.type === 'group' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>ungroupGroup(selectedElementIds[0]),
                                    title: "فك تجميع المجموعة",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ungroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ungroup$3e$__["Ungroup"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3739,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3733,
                                    columnNumber: 15
                                }, this),
                                selectedElementIds.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        className: "gap-1",
                                                        title: "المحاذاة",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$justify$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalJustifyCenter$3e$__["AlignHorizontalJustifyCenter"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3749,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3748,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 3747,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                    align: "start",
                                                    className: "w-[280px] p-3 bg-white opacity-100 border shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                                            className: "text-sm font-semibold mb-2",
                                                            children: "المحاذاة والتوزيع"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3753,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3754,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "py-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-600 mb-2",
                                                                    children: "المحاذاة الأفقية"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3758,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-3 gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            size: "sm",
                                                                            onClick: alignLeft,
                                                                            title: "محاذاة لليسار",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$justify$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalJustifyStart$3e$__["AlignHorizontalJustifyStart"], {
                                                                                className: "w-4 h-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3766,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3760,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            size: "sm",
                                                                            onClick: alignCenterHorizontal,
                                                                            title: "محاذاة للوسط أفقياً",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$justify$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalJustifyCenter$3e$__["AlignHorizontalJustifyCenter"], {
                                                                                className: "w-4 h-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3775,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3769,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            size: "sm",
                                                                            onClick: alignRight,
                                                                            title: "محاذاة لليمين",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$justify$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalJustifyEnd$3e$__["AlignHorizontalJustifyEnd"], {
                                                                                className: "w-4 h-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3784,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3778,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3759,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3757,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3789,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "py-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-600 mb-2",
                                                                    children: "المحاذاة العمودية"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3793,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-3 gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            size: "sm",
                                                                            onClick: alignTop,
                                                                            title: "محاذاة للأعلى",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyStart$3e$__["AlignVerticalJustifyStart"], {
                                                                                className: "w-4 h-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3801,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3795,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            size: "sm",
                                                                            onClick: alignMiddleVertical,
                                                                            title: "محاذاة للوسط عمودياً",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyCenter$3e$__["AlignVerticalJustifyCenter"], {
                                                                                className: "w-4 h-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3810,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3804,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            size: "sm",
                                                                            onClick: alignBottom,
                                                                            title: "محاذاة للأسفل",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyEnd$3e$__["AlignVerticalJustifyEnd"], {
                                                                                className: "w-4 h-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                lineNumber: 3819,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3813,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3794,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3792,
                                                            columnNumber: 21
                                                        }, this),
                                                        selectedElementIds.length >= 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3827,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "py-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-gray-600 mb-2",
                                                                            children: "التوزيع"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3829,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "grid grid-cols-2 gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    variant: "outline",
                                                                                    size: "sm",
                                                                                    onClick: distributeHorizontal,
                                                                                    title: "توزيع أفقي متساوي",
                                                                                    className: "gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__["ArrowLeftRight"], {
                                                                                            className: "w-4 h-4"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                            lineNumber: 3838,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-xs",
                                                                                            children: "أفقي"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                            lineNumber: 3839,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                    lineNumber: 3831,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    variant: "outline",
                                                                                    size: "sm",
                                                                                    onClick: distributeVertical,
                                                                                    title: "توزيع عمودي متساوي",
                                                                                    className: "gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                                                                            className: "w-4 h-4"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                            lineNumber: 3849,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-xs",
                                                                                            children: "عمودي"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                            lineNumber: 3850,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                                    lineNumber: 3842,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 3830,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3828,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 3752,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 3746,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                            orientation: "vertical",
                                            className: "h-6 mx-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 3859,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] px-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: selectedElementIds.length
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3866,
                                                columnNumber: 17
                                            }, this),
                                            selectedElementIds.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-600 text-[9px] bg-blue-50 px-1 py-0.5 rounded",
                                                children: "متعدد"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3868,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3865,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3864,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                    orientation: "vertical",
                                    className: "h-6 mx-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 3875,
                                    columnNumber: 13
                                }, this),
                                selectedElementIds.length > 0 && pages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "text-[10px] border rounded px-1.5 py-0.5 bg-white hover:bg-gray-50 cursor-pointer",
                                            value: "",
                                            onChange: (e)=>{
                                                if (e.target.value) {
                                                    moveElementsToPage(selectedElementIds, e.target.value);
                                                }
                                            },
                                            title: "نقل إلى صفحة",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "نقل..."
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 3890,
                                                    columnNumber: 19
                                                }, this),
                                                pages.filter((p)=>p.id !== currentPageId).sort((a, b)=>a.order - b.order).map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: page.id,
                                                        children: page.name
                                                    }, page.id, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3895,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 3880,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                            orientation: "vertical",
                                            className: "h-6 mx-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 3901,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            onClick: undo,
                            disabled: !canUndo,
                            title: "تراجع (Ctrl+Z)",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 3915,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3908,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            onClick: redo,
                            disabled: !canRedo,
                            title: "إعادة (Ctrl+Y)",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__["Redo2"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 3925,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3918,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                            orientation: "vertical",
                            className: "h-6 mx-0.5"
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 3928,
                            columnNumber: 9
                        }, this),
                        selectedElementId && (()=>{
                            const selectedElement = elements.find((el)=>el.id === selectedElementId);
                            if (!selectedElement || !('transform' in selectedElement)) return null;
                            const element = selectedElement;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "gap-1",
                                                    title: "التحويلات",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3942,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 3941,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3940,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                align: "start",
                                                className: "w-[250px] p-3 bg-white opacity-100 border shadow-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                                        className: "text-sm font-semibold mb-2",
                                                        children: "التحويلات"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3946,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3947,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: element.transform.flipHorizontal ? "default" : "outline",
                                                            size: "sm",
                                                            onClick: ()=>{
                                                                updateElement(element.id, {
                                                                    transform: {
                                                                        ...element.transform,
                                                                        flipHorizontal: !element.transform.flipHorizontal
                                                                    }
                                                                });
                                                            },
                                                            className: "w-full justify-start gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipHorizontal$3e$__["FlipHorizontal"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3964,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "قلب أفقي"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3965,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3951,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3950,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3969,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            onClick: ()=>setShowTransformPanel(!showTransformPanel),
                                                            className: "w-full justify-start gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3979,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "إعدادات التحويلات المتقدمة"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 3980,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 3973,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 3972,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 3945,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3939,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                        orientation: "vertical",
                                        className: "h-6 mx-0.5"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3986,
                                        columnNumber: 15
                                    }, this),
                                    element.type === 'table' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        title: "تغيير لون الجدول",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 3995,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 3990,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true);
                        })(),
                        selectedElementId === 'event-title' && (()=>{
                            const titleElement = elements.find((el)=>el.id === 'event-title');
                            if (!titleElement) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: showBackgroundPanel ? "default" : "ghost",
                                                size: "sm",
                                                onClick: ()=>setShowBackgroundPanel(!showBackgroundPanel),
                                                title: "إعدادات الخلفية",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4016,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 4010,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "color",
                                                value: titleElement.style.color,
                                                onChange: (e)=>{
                                                    updateElement('event-title', {
                                                        style: {
                                                            ...titleElement.style,
                                                            color: e.target.value
                                                        }
                                                    });
                                                },
                                                className: "w-8 h-8 rounded cursor-pointer",
                                                title: "لون النص"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 4019,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4009,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                        orientation: "vertical",
                                        className: "h-8"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4035,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true);
                        })(),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: showLayers ? "default" : "ghost",
                            size: "sm",
                            onClick: ()=>setShowLayers(!showLayers),
                            title: "الطبقات",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4047,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 4041,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 3213,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                lineNumber: 3212,
                columnNumber: 7
            }, this),
            showBackgroundPanel && selectedElementId === 'event-title' && (()=>{
                const titleElement = elements.find((el)=>el.id === 'event-title');
                if (!titleElement) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$pdf$2f$canvas$2d$editor$2f$BackgroundSettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackgroundSettingsPanel"], {
                    background: titleElement.style.background,
                    onUpdate: (background)=>{
                        updateElement('event-title', {
                            style: {
                                ...titleElement.style,
                                background
                            }
                        });
                    },
                    onClose: ()=>setShowBackgroundPanel(false),
                    tableHeaderColor: editorSettings.colors.headerBg
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 4058,
                    columnNumber: 11
                }, this);
            })(),
            showTransformPanel && selectedElementId && (()=>{
                const selectedElement = elements.find((el)=>el.id === selectedElementId);
                if (!selectedElement || !('transform' in selectedElement)) return null;
                const element = selectedElement;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$pdf$2f$canvas$2d$editor$2f$TransformControlPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransformControlPanel"], {
                    position: element.position,
                    size: element.size,
                    transform: element.transform,
                    onUpdatePosition: (position)=>{
                        updateElement(element.id, {
                            position
                        });
                    },
                    onUpdateSize: (size)=>{
                        updateElement(element.id, {
                            size
                        });
                    },
                    onUpdateTransform: (transform)=>{
                        updateElement(element.id, {
                            transform: {
                                ...element.transform,
                                ...transform
                            }
                        });
                    },
                    onClose: ()=>setShowTransformPanel(false)
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                    lineNumber: 4082,
                    columnNumber: 11
                }, this);
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex relative",
                dir: "ltr",
                style: {
                    minHeight: 0,
                    minWidth: 0
                },
                children: [
                    showLayers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:flex w-64 border-r bg-white overflow-hidden flex-col shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-b",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-sm",
                                    children: "الطبقات (الصفحة الحالية)"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 4108,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4107,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 space-y-1",
                                    children: getCurrentPageElements().length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 text-center py-4",
                                        children: "لا توجد طبقات في هذه الصفحة"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4114,
                                        columnNumber: 19
                                    }, this) : getCurrentPageElements().sort((a, b)=>b.zIndex - a.zIndex).map((element)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors", selectedElementIds.includes(element.id) && "bg-blue-100 hover:bg-blue-200"),
                                            onClick: (e)=>handleElementSelect(element.id, e.ctrlKey),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Move$3e$__["Move"], {
                                                    className: "w-4 h-4 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4129,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-medium truncate",
                                                        children: [
                                                            element.type === 'title' && '🎯 عنوان الحدث',
                                                            element.type === 'table-title' && `📝 ${element.content}`,
                                                            element.type === 'table' && '📊 جدول',
                                                            element.type === 'text' && 'نص حر',
                                                            element.type === 'image' && 'صورة',
                                                            element.type === 'group' && '📦 مجموعة'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4132,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4131,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "sm",
                                                            className: "h-6 w-6 p-0 hover:bg-blue-100",
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                bringForward(element.id);
                                                            },
                                                            title: "رفع طبقة للأعلى",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4154,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4144,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "sm",
                                                            className: "h-6 w-6 p-0 hover:bg-blue-100",
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                sendBackward(element.id);
                                                            },
                                                            title: "إنزال طبقة للأسفل",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4166,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4156,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4143,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    className: "h-6 w-6 p-0",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        toggleElementVisibility(element.id);
                                                    },
                                                    title: element.visible ? "إخفاء" : "إظهار",
                                                    children: element.visible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4181,
                                                        columnNumber: 29
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4183,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4170,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    className: "h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        deleteElement(element.id);
                                                    },
                                                    title: "حذف",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4197,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4187,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, element.id, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 4121,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 4112,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 4106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:flex w-48 border-r bg-white overflow-hidden flex-col shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-b",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-sm",
                                    children: "الصفحات"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 4210,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 space-y-2",
                                    children: pages.sort((a, b)=>a.order - b.order).map((page)=>{
                                        const pageElements = elements.filter((el)=>el.pageId === page.id);
                                        const isCurrentPage = page.id === currentPageId;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border rounded-lg p-2 cursor-pointer transition-all hover:shadow-md", isCurrentPage ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"),
                                            onClick: ()=>goToPage(page.id),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full aspect-[794/1122] bg-white border rounded mb-2 flex items-center justify-center", isCurrentPage ? "border-blue-400" : "border-gray-300"),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8", isCurrentPage ? "text-blue-500" : "text-gray-400")
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4233,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4229,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium mb-1", isCurrentPage ? "text-blue-700" : "text-gray-700"),
                                                            children: page.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4241,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-gray-500",
                                                            children: [
                                                                pageElements.length,
                                                                " عنصر"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4247,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4240,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, page.id, true, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 4220,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                    lineNumber: 4214,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4213,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 4208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 relative bg-gray-100 scrollbar-visible",
                        style: {
                            overflow: 'scroll',
                            scrollbarWidth: 'auto',
                            scrollbarColor: '#a0a0a0 #f0f0f0',
                            minHeight: 0,
                            minWidth: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: `${Math.max(pageWidth * zoom + 64, 100)}px`,
                                height: `${Math.max(pageHeight * zoom + 64, 100)}px`,
                                padding: '32px',
                                boxSizing: 'border-box',
                                display: 'inline-block'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: canvasRef,
                                className: "relative bg-white shadow-2xl rounded-lg",
                                style: {
                                    width: `${pageWidth}px`,
                                    height: `${pageHeight}px`,
                                    transform: `scale(${zoom})`,
                                    transformOrigin: 'top left',
                                    border: '2px solid #e5e7eb'
                                },
                                onClick: ()=>setSelectedElementId(null),
                                children: [
                                    gridEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 pointer-events-none",
                                        style: {
                                            backgroundImage: `
                    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                  `,
                                            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4292,
                                        columnNumber: 15
                                    }, this),
                                    !isExporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute pointer-events-none border-2 border-dashed border-green-400 opacity-30",
                                        style: {
                                            left: `${margins.left}px`,
                                            top: `${margins.top}px`,
                                            width: `${pageWidth - margins.left - margins.right}px`,
                                            height: `${pageHeight - margins.top - margins.bottom}px`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4306,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0",
                                        children: [
                                            elements.map((element)=>{
                                                // Phase 7: Only render elements on current page
                                                if (!element.visible || element.pageId !== currentPageId) return null;
                                                // Phase 4: Check if element is in multi-selection
                                                const isSelected = selectedElementIds.includes(element.id);
                                                const isOutOfBounds = isElementOutOfBounds(element);
                                                const isOutOfPrintArea = isElementOutOfPrintArea(element);
                                                // Render Title Element
                                                if (element.type === 'title') {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DraggableTitle, {
                                                        element: element,
                                                        isSelected: isSelected,
                                                        isExporting: isExporting,
                                                        snapEnabled: snapEnabled,
                                                        GRID_SIZE: GRID_SIZE,
                                                        pageWidth: pageWidth,
                                                        pageHeight: pageHeight,
                                                        margins: margins,
                                                        onDrag: handleDrag,
                                                        onDragStop: handleDragStop,
                                                        onResizeStop: handleResizeStop,
                                                        onSelect: handleElementSelect,
                                                        onUpdateElement: updateElement,
                                                        isOutOfBounds: isOutOfBounds,
                                                        isOutOfPrintArea: isOutOfPrintArea
                                                    }, element.id, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4332,
                                                        columnNumber: 21
                                                    }, this);
                                                }
                                                // Render Table Title Element
                                                if (element.type === 'table-title') {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DraggableTableTitle, {
                                                        element: element,
                                                        isSelected: isSelected,
                                                        isExporting: isExporting,
                                                        editorSettings: editorSettings,
                                                        snapEnabled: snapEnabled,
                                                        GRID_SIZE: GRID_SIZE,
                                                        pageWidth: pageWidth,
                                                        pageHeight: pageHeight,
                                                        margins: margins,
                                                        onDrag: handleDrag,
                                                        onDragStop: handleDragStop,
                                                        onResizeStop: handleResizeStop,
                                                        onSelect: handleElementSelect,
                                                        onUpdateElement: updateElement,
                                                        onToggleLink: handleToggleTableTitleLink,
                                                        isOutOfBounds: isOutOfBounds,
                                                        isOutOfPrintArea: isOutOfPrintArea
                                                    }, element.id, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4356,
                                                        columnNumber: 21
                                                    }, this);
                                                }
                                                // Render Table Element (Optimized)
                                                if (element.type === 'table') {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DraggableTable, {
                                                        element: element,
                                                        isSelected: isSelected,
                                                        isExporting: isExporting,
                                                        editorSettings: editorSettings,
                                                        snapEnabled: snapEnabled,
                                                        GRID_SIZE: GRID_SIZE,
                                                        pageWidth: pageWidth,
                                                        pageHeight: pageHeight,
                                                        margins: margins,
                                                        onDrag: handleDrag,
                                                        onDragStop: handleDragStop,
                                                        onResizeStop: handleResizeStop,
                                                        onSelect: handleElementSelect,
                                                        onUpdateElement: updateElement,
                                                        isOutOfBounds: isOutOfBounds,
                                                        isOutOfPrintArea: isOutOfPrintArea
                                                    }, element.id, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4382,
                                                        columnNumber: 21
                                                    }, this);
                                                }
                                                // Render Text Element - With Resize Handles for Font Size Control
                                                if (element.type === 'text') {
                                                    const textElement = element;
                                                    const textNodeRef = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"])();
                                                    const isEditing = editingTextElementId === element.id;
                                                    const isEmpty = !textElement.content || textElement.content.trim() === '' || textElement.content === 'انقر مرتين للتحرير';
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$draggable$2f$build$2f$cjs$2f$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        nodeRef: textNodeRef,
                                                        defaultPosition: element.position,
                                                        onDrag: (e, data)=>handleDrag(element.id, e, data),
                                                        onStop: (e, data)=>handleDragStop(element.id, e, data),
                                                        bounds: "parent",
                                                        disabled: element.locked || isEditing,
                                                        grid: snapEnabled ? [
                                                            GRID_SIZE,
                                                            GRID_SIZE
                                                        ] : undefined,
                                                        cancel: ".react-resizable-handle",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: textNodeRef,
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute", isSelected && !isExporting && "element-selected"),
                                                            style: {
                                                                zIndex: element.zIndex
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$resizable$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Resizable"], {
                                                                width: resizingElements[element.id]?.width ?? element.size.width,
                                                                height: resizingElements[element.id]?.height ?? element.size.height,
                                                                onResizeStart: (e, { size })=>{
                                                                    // Store original font size and width at the start of resize
                                                                    setResizingElements((prev)=>({
                                                                            ...prev,
                                                                            [element.id]: {
                                                                                width: size.width,
                                                                                height: size.height,
                                                                                originalFontSize: textElement.fontSize,
                                                                                originalWidth: size.width
                                                                            }
                                                                        }));
                                                                },
                                                                onResize: (e, { size })=>{
                                                                    // Get the original values from resizingElements
                                                                    const resizeData = resizingElements[element.id];
                                                                    const originalFontSize = resizeData?.originalFontSize ?? textElement.fontSize;
                                                                    const originalWidth = resizeData?.originalWidth ?? element.size.width;
                                                                    // Calculate new font size based on original values
                                                                    const scaleFactor = size.width / originalWidth;
                                                                    const newFontSize = Math.round(originalFontSize * scaleFactor);
                                                                    const clampedFontSize = Math.max(12, Math.min(72, newFontSize));
                                                                    handleResize(element.id, e, {
                                                                        size: {
                                                                            width: size.width,
                                                                            height: size.height
                                                                        },
                                                                        node: e.target,
                                                                        handle: 'se'
                                                                    });
                                                                    // ✅ Update font size immediately during resize for smooth feedback
                                                                    setElements((prev)=>prev.map((el)=>el.id === element.id && el.type === 'text' ? {
                                                                                ...el,
                                                                                fontSize: clampedFontSize
                                                                            } : el));
                                                                },
                                                                onResizeStop: (e, data)=>{
                                                                    // Get the original values from resizingElements
                                                                    const resizeData = resizingElements[element.id];
                                                                    const originalFontSize = resizeData?.originalFontSize ?? textElement.fontSize;
                                                                    const originalWidth = resizeData?.originalWidth ?? element.size.width;
                                                                    // Calculate final font size based on original values
                                                                    const scaleFactor = data.size.width / originalWidth;
                                                                    const newFontSize = Math.round(originalFontSize * scaleFactor);
                                                                    const clampedFontSize = Math.max(12, Math.min(72, newFontSize));
                                                                    handleResizeStop(element.id, e, data);
                                                                    // Update font size and keep the new size (don't reset!)
                                                                    setElements((prev)=>prev.map((el)=>el.id === element.id && el.type === 'text' ? {
                                                                                ...el,
                                                                                fontSize: clampedFontSize,
                                                                                size: data.size // Keep the new size instead of resetting
                                                                            } : el));
                                                                    // Clear resizing data
                                                                    setResizingElements((prev)=>{
                                                                        const newState = {
                                                                            ...prev
                                                                        };
                                                                        delete newState[element.id];
                                                                        return newState;
                                                                    });
                                                                },
                                                                resizeHandles: [
                                                                    'se',
                                                                    'sw',
                                                                    'ne',
                                                                    'nw'
                                                                ],
                                                                minConstraints: [
                                                                    100,
                                                                    24
                                                                ],
                                                                maxConstraints: [
                                                                    600,
                                                                    400
                                                                ],
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'inline-block',
                                                                        border: isSelected ? '2px solid #8b5cf6' : '2px solid transparent',
                                                                        borderRadius: '2px',
                                                                        padding: '8px',
                                                                        background: 'transparent',
                                                                        transition: 'border-color 0.15s ease',
                                                                        cursor: isEditing ? 'text' : 'move'
                                                                    },
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        if (!isSelected) {
                                                                            setSelectedElementId(element.id);
                                                                        }
                                                                    },
                                                                    onDoubleClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        const target = e.currentTarget;
                                                                        setEditingTextElementId(element.id);
                                                                        requestAnimationFrame(()=>{
                                                                            const editableDiv = target?.querySelector('.text-content-editable');
                                                                            if (editableDiv) {
                                                                                editableDiv.focus();
                                                                                if (isEmpty) {
                                                                                    try {
                                                                                        const range = document.createRange();
                                                                                        range.selectNodeContents(editableDiv);
                                                                                        const sel = window.getSelection();
                                                                                        sel?.removeAllRanges();
                                                                                        sel?.addRange(range);
                                                                                    } catch  {
                                                                                    // Ignore selection errors
                                                                                    }
                                                                                }
                                                                            }
                                                                        });
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-content-editable",
                                                                        contentEditable: isEditing,
                                                                        suppressContentEditableWarning: true,
                                                                        style: {
                                                                            minWidth: '100px',
                                                                            maxWidth: '600px',
                                                                            fontSize: `${textElement.fontSize}px`,
                                                                            color: isEmpty && !isEditing ? '#9ca3af' : textElement.color,
                                                                            fontWeight: textElement.fontWeight ?? 'normal',
                                                                            fontStyle: isEmpty && !isEditing ? 'italic' : textElement.fontStyle ?? 'normal',
                                                                            textDecoration: textElement.textDecoration ?? 'none',
                                                                            textAlign: textElement.textAlign ?? 'right',
                                                                            outline: 'none',
                                                                            wordWrap: 'break-word',
                                                                            whiteSpace: 'pre-wrap',
                                                                            minHeight: '24px',
                                                                            lineHeight: '1.5'
                                                                        },
                                                                        onFocus: (e)=>{
                                                                            setEditingTextElementId(element.id);
                                                                            if (isEmpty) {
                                                                                e.currentTarget.textContent = '';
                                                                            }
                                                                        },
                                                                        onBlur: (e)=>{
                                                                            setEditingTextElementId(null);
                                                                            const newContent = e.currentTarget.textContent?.trim() || '';
                                                                            setElements((prev)=>prev.map((el)=>el.id === element.id && el.type === 'text' ? {
                                                                                        ...el,
                                                                                        content: newContent || 'انقر مرتين للتحرير'
                                                                                    } : el));
                                                                            if (!newContent) {
                                                                                e.currentTarget.textContent = 'انقر مرتين للتحرير';
                                                                            }
                                                                        },
                                                                        onKeyDown: (e)=>{
                                                                            e.stopPropagation();
                                                                            if (e.key === 'Escape') {
                                                                                e.currentTarget.blur();
                                                                            }
                                                                        },
                                                                        children: isEmpty && !isEditing ? 'انقر مرتين للتحرير' : textElement.content
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 4549,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 4508,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4433,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4423,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, element.id, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4412,
                                                        columnNumber: 21
                                                    }, this);
                                                }
                                                // Render Image Element
                                                if (element.type === 'image') {
                                                    const imageElement = element;
                                                    const imageNodeRef = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"])();
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$draggable$2f$build$2f$cjs$2f$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        nodeRef: imageNodeRef,
                                                        defaultPosition: element.position,
                                                        onDrag: (e, data)=>handleDrag(element.id, e, data),
                                                        onStop: (e, data)=>handleDragStop(element.id, e, data),
                                                        bounds: "parent",
                                                        disabled: element.locked,
                                                        grid: snapEnabled ? [
                                                            GRID_SIZE,
                                                            GRID_SIZE
                                                        ] : undefined,
                                                        cancel: ".react-resizable-handle",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: imageNodeRef,
                                                            className: "absolute cursor-default",
                                                            style: {
                                                                zIndex: element.zIndex
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative transition-all duration-200", isSelected && "ring-4 ring-green-500 ring-offset-2 element-selected"),
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    setSelectedElementId(element.id);
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$resizable$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Resizable"], {
                                                                    width: resizingElements[element.id]?.width ?? element.size.width,
                                                                    height: resizingElements[element.id]?.height ?? element.size.height,
                                                                    onResize: (e, { size, node, handle })=>{
                                                                        // Apply grid snapping for smoother, faster resize (10px increments)
                                                                        const snappedWidth = Math.round(size.width / 10) * 10;
                                                                        const snappedHeight = Math.round(size.height / 10) * 10;
                                                                        handleResize(element.id, e, {
                                                                            node,
                                                                            size: {
                                                                                width: snappedWidth,
                                                                                height: snappedHeight
                                                                            },
                                                                            handle
                                                                        });
                                                                    },
                                                                    onResizeStop: (e, data)=>{
                                                                        // Apply grid snapping to final size
                                                                        const snappedWidth = Math.round(data.size.width / 10) * 10;
                                                                        const snappedHeight = Math.round(data.size.height / 10) * 10;
                                                                        handleResizeStop(element.id, e, {
                                                                            ...data,
                                                                            size: {
                                                                                width: snappedWidth,
                                                                                height: snappedHeight
                                                                            }
                                                                        });
                                                                    },
                                                                    resizeHandles: [
                                                                        'se',
                                                                        'sw',
                                                                        'ne',
                                                                        'nw'
                                                                    ],
                                                                    minConstraints: [
                                                                        50,
                                                                        50
                                                                    ],
                                                                    maxConstraints: [
                                                                        800,
                                                                        800
                                                                    ],
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: resizingElements[element.id]?.width ?? element.size.width,
                                                                            height: resizingElements[element.id]?.height ?? element.size.height
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: imageElement.src,
                                                                            alt: "Element",
                                                                            className: "w-full h-full object-contain"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                            lineNumber: 4658,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                        lineNumber: 4652,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 4633,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4623,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4621,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, element.id, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4610,
                                                        columnNumber: 21
                                                    }, this);
                                                }
                                                // Phase 6: Render Group Element
                                                if (element.type === 'group') {
                                                    const groupElement = element;
                                                    const groupNodeRef = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"])();
                                                    // Get all elements in the group
                                                    const groupElements = elements.filter((el)=>groupElement.elementIds.includes(el.id));
                                                    // Calculate bounding box
                                                    if (groupElements.length === 0) return null;
                                                    const minX = Math.min(...groupElements.map((el)=>el.position.x));
                                                    const minY = Math.min(...groupElements.map((el)=>el.position.y));
                                                    const maxX = Math.max(...groupElements.map((el)=>el.position.x + el.size.width));
                                                    const maxY = Math.max(...groupElements.map((el)=>el.position.y + el.size.height));
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$react$2d$draggable$2f$build$2f$cjs$2f$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        nodeRef: groupNodeRef,
                                                        defaultPosition: {
                                                            x: minX,
                                                            y: minY
                                                        },
                                                        onStop: (_e, data)=>{
                                                            // Calculate delta from original position
                                                            const deltaX = data.x - minX;
                                                            const deltaY = data.y - minY;
                                                            // Move all elements in the group
                                                            setElements((prev)=>{
                                                                const updated = prev.map((el)=>{
                                                                    if (groupElement.elementIds.includes(el.id)) {
                                                                        return {
                                                                            ...el,
                                                                            position: {
                                                                                x: el.position.x + deltaX,
                                                                                y: el.position.y + deltaY
                                                                            }
                                                                        };
                                                                    }
                                                                    return el;
                                                                });
                                                                saveToHistory(updated);
                                                                return updated;
                                                            });
                                                        },
                                                        bounds: "parent",
                                                        disabled: element.locked,
                                                        grid: snapEnabled ? [
                                                            GRID_SIZE,
                                                            GRID_SIZE
                                                        ] : undefined,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: groupNodeRef,
                                                            className: "absolute cursor-move",
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                handleElementSelect(element.id, e.ctrlKey);
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative border-2 border-dashed transition-all duration-200", isSelected ? "border-blue-500 bg-blue-50/10" : "border-gray-400 bg-gray-50/5"),
                                                                style: {
                                                                    width: maxX - minX,
                                                                    height: maxY - minY,
                                                                    pointerEvents: 'none'
                                                                },
                                                                children: !isExporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded shadow-sm pointer-events-auto",
                                                                    children: [
                                                                        groupElement.name,
                                                                        " (",
                                                                        groupElement.elementIds.length,
                                                                        " عناصر)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 4743,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4728,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4719,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, element.id, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4688,
                                                        columnNumber: 21
                                                    }, this);
                                                }
                                                return null;
                                            }),
                                            elements.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center h-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-400",
                                                    children: "لا توجد عناصر"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4759,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 4758,
                                                columnNumber: 17
                                            }, this),
                                            isDragging && !isExporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    alignmentType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-[10000]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg animate-in fade-in duration-150",
                                                            children: alignmentType
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4771,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                        lineNumber: 4768,
                                                        columnNumber: 21
                                                    }, this),
                                                    alignmentGuides.vertical.map((x, index)=>{
                                                        // Check if this is a center guide
                                                        const isCenter = Math.abs(x - pageWidth / 2) < 1;
                                                        const isMargin = Math.abs(x - margins.left) < 1 || Math.abs(x - (pageWidth - margins.right)) < 1;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-0 bottom-0 pointer-events-none animate-in fade-in duration-150",
                                                            style: {
                                                                left: `${x}px`,
                                                                width: isCenter ? '2px' : '1px',
                                                                backgroundColor: isCenter ? '#3b82f6' : isMargin ? '#10b981' : '#ef4444',
                                                                boxShadow: isCenter ? '0 0 8px rgba(59, 130, 246, 0.6)' : isMargin ? '0 0 6px rgba(16, 185, 129, 0.5)' : '0 0 4px rgba(239, 68, 68, 0.5)',
                                                                zIndex: 9999
                                                            }
                                                        }, `v-${index}`, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4784,
                                                            columnNumber: 23
                                                        }, this);
                                                    }),
                                                    alignmentGuides.horizontal.map((y, index)=>{
                                                        // Check if this is a center guide
                                                        const isCenter = Math.abs(y - pageHeight / 2) < 1;
                                                        const isMargin = Math.abs(y - margins.top) < 1 || Math.abs(y - (pageHeight - margins.bottom)) < 1;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute left-0 right-0 pointer-events-none animate-in fade-in duration-150",
                                                            style: {
                                                                top: `${y}px`,
                                                                height: isCenter ? '2px' : '1px',
                                                                backgroundColor: isCenter ? '#3b82f6' : isMargin ? '#10b981' : '#ef4444',
                                                                boxShadow: isCenter ? '0 0 8px rgba(59, 130, 246, 0.6)' : isMargin ? '0 0 6px rgba(16, 185, 129, 0.5)' : '0 0 4px rgba(239, 68, 68, 0.5)',
                                                                zIndex: 9999
                                                            }
                                                        }, `h-${index}`, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4809,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4318,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4278,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                            lineNumber: 4269,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 4259,
                        columnNumber: 9
                    }, this),
                    mobileLayersOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:hidden absolute inset-0 z-40 flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/30",
                                onClick: ()=>setMobileLayersOpen(false)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4837,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-72 max-w-[80vw] bg-white shadow-xl flex flex-col animate-in slide-in-from-left duration-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 border-b flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-sm",
                                                children: "الطبقات (الصفحة الحالية)"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 4844,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ()=>setMobileLayersOpen(false),
                                                className: "h-8 w-8 p-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4851,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 4845,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4843,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                        className: "flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2 space-y-1",
                                            children: getCurrentPageElements().length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 text-center py-4",
                                                children: "لا توجد طبقات في هذه الصفحة"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 4857,
                                                columnNumber: 21
                                            }, this) : getCurrentPageElements().sort((a, b)=>b.zIndex - a.zIndex).map((element)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors", selectedElementIds.includes(element.id) && "bg-blue-100 hover:bg-blue-200"),
                                                    onClick: (e)=>{
                                                        handleElementSelect(element.id, e.ctrlKey);
                                                        setMobileLayersOpen(false);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Move$3e$__["Move"], {
                                                            className: "w-4 h-4 text-gray-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4875,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-medium truncate",
                                                                children: [
                                                                    element.type === 'title' && '🎯 عنوان الحدث',
                                                                    element.type === 'table-title' && `📝 ${element.content}`,
                                                                    element.type === 'table' && '📊 جدول',
                                                                    element.type === 'text' && 'نص حر',
                                                                    element.type === 'image' && 'صورة',
                                                                    element.type === 'group' && '📦 مجموعة'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4877,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4876,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "sm",
                                                            className: "h-6 w-6 p-0",
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                toggleElementVisibility(element.id);
                                                            },
                                                            title: element.visible ? "إخفاء" : "إظهار",
                                                            children: element.visible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4896,
                                                                columnNumber: 48
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4896,
                                                                columnNumber: 78
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4886,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "sm",
                                                            className: "h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600",
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                deleteElement(element.id);
                                                            },
                                                            title: "حذف",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4908,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4898,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, element.id, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4864,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 4855,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4854,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4842,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 4835,
                        columnNumber: 11
                    }, this),
                    mobilePagesOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:hidden absolute inset-0 z-40 flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/30",
                                onClick: ()=>setMobilePagesOpen(false)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4923,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-56 max-w-[70vw] bg-white shadow-xl flex flex-col animate-in slide-in-from-left duration-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 border-b flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-sm",
                                                children: "الصفحات"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 4930,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ()=>setMobilePagesOpen(false),
                                                className: "h-8 w-8 p-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4937,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                lineNumber: 4931,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4929,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                        className: "flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2 space-y-2",
                                            children: pages.sort((a, b)=>a.order - b.order).map((page)=>{
                                                const pageElements = elements.filter((el)=>el.pageId === page.id);
                                                const isCurrentPage = page.id === currentPageId;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border rounded-lg p-2 cursor-pointer transition-all hover:shadow-md", isCurrentPage ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"),
                                                    onClick: ()=>{
                                                        goToPage(page.id);
                                                        setMobilePagesOpen(false);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full aspect-[794/1122] bg-white border rounded mb-2 flex items-center justify-center", isCurrentPage ? "border-blue-400" : "border-gray-300"),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8", isCurrentPage ? "text-blue-500" : "text-gray-400")
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                lineNumber: 4961,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4957,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium mb-1", isCurrentPage ? "text-blue-700" : "text-gray-700"),
                                                                    children: page.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 4967,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-gray-500",
                                                                    children: [
                                                                        pageElements.length,
                                                                        " عنصر"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                                    lineNumber: 4973,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                            lineNumber: 4966,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, page.id, true, {
                                                    fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                                    lineNumber: 4946,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                            lineNumber: 4941,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4940,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4928,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 4921,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:hidden absolute bottom-4 left-4 right-4 flex justify-center gap-3 z-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: mobileLayersOpen ? "default" : "secondary",
                                size: "sm",
                                onClick: ()=>{
                                    setMobileLayersOpen(!mobileLayersOpen);
                                    setMobilePagesOpen(false);
                                },
                                className: "shadow-lg gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 4997,
                                        columnNumber: 13
                                    }, this),
                                    "الطبقات"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 4988,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: mobilePagesOpen ? "default" : "secondary",
                                size: "sm",
                                onClick: ()=>{
                                    setMobilePagesOpen(!mobilePagesOpen);
                                    setMobileLayersOpen(false);
                                },
                                className: "shadow-lg gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileStack$3e$__["FileStack"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                        lineNumber: 5009,
                                        columnNumber: 13
                                    }, this),
                                    "الصفحات"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                                lineNumber: 5000,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                        lineNumber: 4987,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
                lineNumber: 4103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx",
        lineNumber: 3210,
        columnNumber: 5
    }, this);
}
_s3(EnhancedHTMLEditor, "Hz9KRxSzkeFbVdXjekARi3iexfg=");
_c3 = EnhancedHTMLEditor;
const __TURBOPACK__default__export__ = EnhancedHTMLEditor;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "DraggableTitle");
__turbopack_context__.k.register(_c1, "DraggableTableTitle");
__turbopack_context__.k.register(_c2, "DraggableTable");
__turbopack_context__.k.register(_c3, "EnhancedHTMLEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/event-meena/components/pdf/canvas-editor/EnhancedHTMLEditor.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=event-meena_components_pdf_canvas-editor_c53c6932._.js.map