(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/event-meena/components/events/participate/components/QuestionComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuestionComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/radio-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
"use client";
;
;
;
;
;
;
;
;
function QuestionComponent({ component, value, onChange, index, eventType }) {
    const settings = component.settings;
    const questionType = settings.questionType || "short_text";
    // Render based on question type
    const renderInput = ()=>{
        switch(questionType){
            case "short_text":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "text",
                    placeholder: settings.placeholder || "اكتب إجابتك هنا...",
                    value: value || "",
                    onChange: (e)=>onChange(e.target.value),
                    className: "text-lg",
                    required: settings.required
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this);
            case "long_text":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                    placeholder: settings.placeholder || "اكتب إجابتك هنا...",
                    value: value || "",
                    onChange: (e)=>onChange(e.target.value),
                    rows: 6,
                    className: "text-lg resize-none",
                    required: settings.required
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, this);
            case "number":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "number",
                    placeholder: settings.placeholder || "أدخل رقماً...",
                    value: value || "",
                    onChange: (e)=>onChange(e.target.value),
                    min: settings.minValue,
                    max: settings.maxValue,
                    className: "text-lg",
                    required: settings.required
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this);
            case "email":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "email",
                    placeholder: "example@email.com",
                    value: value || "",
                    onChange: (e)=>onChange(e.target.value),
                    className: "text-lg",
                    required: settings.required
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this);
            case "phone":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "tel",
                    placeholder: "05xxxxxxxx",
                    value: value || "",
                    onChange: (e)=>onChange(e.target.value),
                    className: "text-lg",
                    required: settings.required
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this);
            case "date":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "date",
                    value: value || "",
                    onChange: (e)=>onChange(e.target.value),
                    className: "text-lg",
                    required: settings.required
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 98,
                    columnNumber: 11
                }, this);
            case "time":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "time",
                    value: value || "",
                    onChange: (e)=>onChange(e.target.value),
                    className: "text-lg",
                    required: settings.required
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this);
            case "single_choice":
                // Support both choices (new format) and options (legacy format)
                const singleChoices = settings.choices || settings.options?.map((opt)=>({
                        label: opt,
                        value: opt
                    })) || [];
                const isQuiz = eventType === "quiz";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                    value: value || "",
                    onValueChange: onChange,
                    className: "space-y-3",
                    children: singleChoices.map((choice, idx)=>{
                        const choiceLabel = typeof choice === 'string' ? choice : choice.label;
                        const choiceValue = typeof choice === 'string' ? choice : choice.value || choice.label;
                        const isSelected = value === choiceValue;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `
                    flex items-center justify-between p-5 rounded-xl
                    border-2 transition-all duration-200 cursor-pointer group
                    ${isSelected ? isQuiz ? 'border-[#1a56db] bg-blue-50 shadow-md' : 'border-primary bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'}
                  `,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: `${component.id}-${idx}`,
                                    className: `
                      flex-1 cursor-pointer text-base font-medium leading-relaxed ml-4
                      ${isSelected ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}
                    `,
                                    children: choiceLabel
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 146,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                    value: choiceValue,
                                    id: `${component.id}-${idx}`,
                                    className: isSelected && isQuiz ? 'border-[#1a56db] text-[#1a56db]' : ''
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 155,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                            lineNumber: 133,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 123,
                    columnNumber: 11
                }, this);
            case "multiple_choice":
                const selectedValues = Array.isArray(value) ? value : [];
                // Support both choices (new format) and options (legacy format)
                const multipleChoices = settings.choices || settings.options?.map((opt)=>({
                        label: opt,
                        value: opt
                    })) || [];
                const isQuizMultiple = eventType === "quiz";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: multipleChoices.map((choice, idx)=>{
                        const choiceLabel = typeof choice === 'string' ? choice : choice.label;
                        const choiceValue = typeof choice === 'string' ? choice : choice.value || choice.label;
                        const isChecked = selectedValues.includes(choiceValue);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `
                    flex items-center justify-between p-5 rounded-xl
                    border-2 transition-all duration-200 cursor-pointer group
                    ${isChecked ? isQuizMultiple ? 'border-[#1a56db] bg-blue-50 shadow-md' : 'border-primary bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'}
                  `,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: `${component.id}-${idx}`,
                                    className: `
                      flex-1 cursor-pointer text-base font-medium leading-relaxed ml-4
                      ${isChecked ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}
                    `,
                                    children: choiceLabel
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 191,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                    id: `${component.id}-${idx}`,
                                    checked: isChecked,
                                    onCheckedChange: (checked)=>{
                                        if (checked) {
                                            onChange([
                                                ...selectedValues,
                                                choiceValue
                                            ]);
                                        } else {
                                            onChange(selectedValues.filter((v)=>v !== choiceValue));
                                        }
                                    },
                                    className: isChecked && isQuizMultiple ? 'border-[#1a56db] data-[state=checked]:bg-[#1a56db]' : ''
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 200,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                            lineNumber: 178,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 172,
                    columnNumber: 11
                }, this);
            case "yes_no":
                const isQuizYesNo = eventType === "quiz";
                const isYesSelected = value === "yes";
                const isNoSelected = value === "no";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                    value: value || "",
                    onValueChange: onChange,
                    className: "flex gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `
              flex items-center space-x-3 space-x-reverse p-5 rounded-xl
              border-2 transition-all duration-200 cursor-pointer flex-1
              ${isYesSelected ? isQuizYesNo ? 'border-[#1a56db] bg-blue-50 shadow-md' : 'border-primary bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'}
            `,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                    value: "yes",
                                    id: `${component.id}-yes`,
                                    className: isYesSelected && isQuizYesNo ? 'border-[#1a56db] text-[#1a56db]' : ''
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: `${component.id}-yes`,
                                    className: `
                  flex-1 cursor-pointer text-base font-medium text-center
                  ${isYesSelected ? 'text-gray-900' : 'text-gray-700'}
                `,
                                    children: "نعم"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                            lineNumber: 228,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `
              flex items-center space-x-3 space-x-reverse p-5 rounded-xl
              border-2 transition-all duration-200 cursor-pointer flex-1
              ${isNoSelected ? isQuizYesNo ? 'border-[#1a56db] bg-blue-50 shadow-md' : 'border-primary bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'}
            `,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                    value: "no",
                                    id: `${component.id}-no`,
                                    className: isNoSelected && isQuizYesNo ? 'border-[#1a56db] text-[#1a56db]' : ''
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: `${component.id}-no`,
                                    className: `
                  flex-1 cursor-pointer text-base font-medium text-center
                  ${isNoSelected ? 'text-gray-900' : 'text-gray-700'}
                `,
                                    children: "لا"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                            lineNumber: 253,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                }, this);
            case "linear_scale":
                const scaleMin = settings.scaleMin || 1;
                const scaleMax = settings.scaleMax || 5;
                const scaleMinLabel = settings.scaleMinLabel || "";
                const scaleMaxLabel = settings.scaleMaxLabel || "";
                const scaleValues = Array.from({
                    length: scaleMax - scaleMin + 1
                }, (_, i)=>scaleMin + i);
                const isQuizScale = eventType === "quiz";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2 flex-wrap",
                            children: scaleValues.map((num)=>{
                                const isSelected = value === num || value === String(num);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onChange(num),
                                    className: `
                      w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200
                      ${isSelected ? isQuizScale ? 'bg-[#1a56db] text-white shadow-lg scale-110' : 'bg-primary text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}
                    `,
                                    children: num
                                }, num, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 297,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                            lineNumber: 293,
                            columnNumber: 13
                        }, this),
                        (scaleMinLabel || scaleMaxLabel) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between text-sm text-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: scaleMinLabel
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 318,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: scaleMaxLabel
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 319,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                            lineNumber: 317,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 292,
                    columnNumber: 11
                }, this);
            case "dropdown":
                const dropdownChoices = settings.choices || settings.options?.map((opt)=>({
                        label: opt,
                        value: opt
                    })) || [];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                    value: value || "",
                    onValueChange: onChange,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                            className: "w-full text-lg h-14",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                placeholder: "اختر إجابة..."
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                lineNumber: 330,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                            lineNumber: 329,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                            children: dropdownChoices.map((choice, idx)=>{
                                const choiceLabel = typeof choice === 'string' ? choice : choice.label;
                                const choiceValue = typeof choice === 'string' ? choice : choice.value || choice.label;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                    value: choiceValue,
                                    className: "text-base py-3",
                                    children: choiceLabel
                                }, idx, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 337,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 328,
                    columnNumber: 11
                }, this);
            case "choice_grid":
                const gridRows = settings.rows || [];
                const gridColumns = settings.columns || [];
                const gridValue = value || {};
                const isQuizGrid = eventType === "quiz";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full border-collapse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-3 text-right bg-gray-50 border border-gray-200 min-w-[150px]"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                            lineNumber: 356,
                                            columnNumber: 19
                                        }, this),
                                        gridColumns.map((col, colIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-3 text-center bg-gray-50 border border-gray-200 font-medium text-gray-700 min-w-[100px]",
                                                children: col
                                            }, colIdx, false, {
                                                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                                lineNumber: 358,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                    lineNumber: 355,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                lineNumber: 354,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: gridRows.map((row, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-3 text-right bg-gray-50 border border-gray-200 font-medium text-gray-700",
                                                children: row
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                                lineNumber: 370,
                                                columnNumber: 21
                                            }, this),
                                            gridColumns.map((col, colIdx)=>{
                                                const cellValue = gridValue[row];
                                                const isSelected = cellValue === col;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-3 text-center border border-gray-200",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            onChange({
                                                                ...gridValue,
                                                                [row]: col
                                                            });
                                                        },
                                                        className: `
                              w-6 h-6 rounded-full border-2 transition-all duration-200 mx-auto
                              ${isSelected ? isQuizGrid ? 'bg-[#1a56db] border-[#1a56db]' : 'bg-primary border-primary' : 'bg-white border-gray-300 hover:border-gray-400'}
                            `,
                                                        children: isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 bg-white rounded-full mx-auto"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 31
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 27
                                                    }, this)
                                                }, colIdx, false, {
                                                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        ]
                                    }, rowIdx, true, {
                                        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                        lineNumber: 369,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                lineNumber: 367,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                        lineNumber: 353,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 352,
                    columnNumber: 11
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    type: "text",
                    placeholder: "اكتب إجابتك هنا...",
                    value: value || "",
                    onChange: (e)=>onChange(e.target.value),
                    className: "text-lg"
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                    lineNumber: 412,
                    columnNumber: 11
                }, this);
        }
    };
    const isQuizType = eventType === "quiz";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-sm
          ${isQuizType ? 'bg-gradient-to-br from-[#1a56db] to-[#0ea5e9] text-white' : 'bg-primary/10 text-primary'}
        `,
                        children: index + 1
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: `
            text-xl md:text-2xl font-bold leading-relaxed block
            ${isQuizType ? 'text-gray-900' : 'text-gray-900'}
          `,
                                children: [
                                    settings.label || settings.question || "سؤال",
                                    settings.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-500 mr-2",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                        lineNumber: 444,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                lineNumber: 439,
                                columnNumber: 11
                            }, this),
                            settings.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-3 text-base md:text-lg leading-relaxed",
                                children: settings.description
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                                lineNumber: 447,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                        lineNumber: 438,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pr-14",
                children: renderInput()
            }, void 0, false, {
                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                lineNumber: 455,
                columnNumber: 7
            }, this),
            eventType === "quiz" && settings.enableAutoGrading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pr-11 flex items-center gap-2 text-sm text-blue-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                        lineNumber: 460,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "هذا السؤال يتم تصحيحه تلقائياً (",
                            settings.points || 0,
                            " نقطة)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                        lineNumber: 461,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                lineNumber: 459,
                columnNumber: 9
            }, this),
            (questionType === "short_text" || questionType === "long_text") && settings.maxLength && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pr-11 text-sm text-gray-500 text-left",
                children: [
                    (value || "").length,
                    " / ",
                    settings.maxLength
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
                lineNumber: 468,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/events/participate/components/QuestionComponent.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
_c = QuestionComponent;
var _c;
__turbopack_context__.k.register(_c, "QuestionComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/events/participate/components/RatingComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RatingComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$meh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Meh$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/meh.js [app-client] (ecmascript) <export default as Meh>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$frown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Frown$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/frown.js [app-client] (ecmascript) <export default as Frown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function RatingComponent({ component, value, onChange, index }) {
    const settings = component.settings;
    const ratingType = settings.ratingType || "stars";
    const maxRating = settings.maxRating || 5;
    const renderRating = ()=>{
        switch(ratingType){
            case "stars":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: Array.from({
                        length: maxRating
                    }, (_, i)=>i + 1).map((rating)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onChange(rating),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-12 h-12 rounded-lg transition-all hover:scale-110", value >= rating ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                className: "w-full h-full",
                                fill: value >= rating ? "currentColor" : "none"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                lineNumber: 42,
                                columnNumber: 17
                            }, this)
                        }, rating, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                            lineNumber: 31,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this);
            case "numbers":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 flex-wrap",
                    children: Array.from({
                        length: maxRating
                    }, (_, i)=>i + 1).map((rating)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onChange(rating),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-14 h-14 rounded-lg border-2 font-bold text-lg transition-all hover:scale-105", value === rating ? "bg-primary text-white border-primary shadow-lg" : "bg-white text-gray-700 border-gray-300 hover:border-primary/50"),
                            children: rating
                        }, rating, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                            lineNumber: 55,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, this);
            case "emoji":
                const emojis = [
                    {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$frown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Frown$3e$__["Frown"],
                        label: "سيء جداً",
                        color: "text-red-500",
                        bg: "bg-red-50",
                        border: "border-red-200"
                    },
                    {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$meh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Meh$3e$__["Meh"],
                        label: "سيء",
                        color: "text-orange-500",
                        bg: "bg-orange-50",
                        border: "border-orange-200"
                    },
                    {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$meh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Meh$3e$__["Meh"],
                        label: "متوسط",
                        color: "text-yellow-500",
                        bg: "bg-yellow-50",
                        border: "border-yellow-200"
                    },
                    {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"],
                        label: "جيد",
                        color: "text-green-500",
                        bg: "bg-green-50",
                        border: "border-green-200"
                    },
                    {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"],
                        label: "ممتاز",
                        color: "text-blue-500",
                        bg: "bg-blue-50",
                        border: "border-blue-200"
                    }
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 flex-wrap",
                    children: emojis.slice(0, maxRating).map((emoji, idx)=>{
                        const rating = idx + 1;
                        const Icon = emoji.icon;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onChange(rating),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:scale-105", value === rating ? `${emoji.bg} ${emoji.border} shadow-lg` : "bg-white border-gray-200 hover:border-gray-300"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-10 h-10", value === rating ? emoji.color : "text-gray-400")
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                    lineNumber: 98,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-medium text-gray-600",
                                    children: emoji.label
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                    lineNumber: 104,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, rating, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                            lineNumber: 87,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this);
            case "scale":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: settings.minLabel || "الأدنى"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: settings.maxLabel || "الأعلى"
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: Array.from({
                                length: maxRating
                            }, (_, i)=>i + 1).map((rating)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onChange(rating),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 h-12 rounded-lg border-2 font-bold transition-all hover:scale-105", value === rating ? "bg-primary text-white border-primary shadow-lg" : "bg-white text-gray-700 border-gray-300 hover:border-primary/50"),
                                    children: rating
                                }, rating, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                    lineNumber: 122,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                    lineNumber: 115,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm",
                        children: index + 1
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xl font-semibold text-gray-900 leading-relaxed",
                                children: [
                                    settings.label || "تقييم",
                                    settings.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-500 mr-1",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                        lineNumber: 155,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            settings.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-2 text-base leading-relaxed",
                                children: settings.description
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pr-11",
                children: renderRating()
            }, void 0, false, {
                fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pr-11 text-sm text-gray-600",
                children: [
                    "التقييم المختار: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-primary",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                        lineNumber: 171,
                        columnNumber: 28
                    }, this),
                    " من ",
                    maxRating
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
                lineNumber: 170,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/events/participate/components/RatingComponent.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_c = RatingComponent;
var _c;
__turbopack_context__.k.register(_c, "RatingComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileUploadComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$filesService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/filesService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/progress.tsx [app-client] (ecmascript)");
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
function FileUploadComponent({ component, value, onChange, index }) {
    _s();
    const settings = component.settings;
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [uploadError, setUploadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isPdfOnly = component.type === "pdf_upload";
    const isImageOnly = component.type === "image_upload";
    const isVideoOnly = component.type === "video_upload";
    const allowMultiple = settings.allowMultiple || false;
    const maxFiles = settings.maxFiles || 1;
    const maxFileSize = settings.maxFileSize || 10; // MB
    const files = Array.isArray(value) ? value : value ? [
        value
    ] : [];
    // تحديد نوع الملف للـ API
    const getFileCategory = ()=>{
        if (isPdfOnly) return "pdf";
        if (isImageOnly) return "image";
        if (isVideoOnly) return "video";
        return "image"; // default
    };
    const handleFileSelect = async (selectedFiles)=>{
        if (!selectedFiles || selectedFiles.length === 0) return;
        const newFiles = Array.from(selectedFiles);
        // Validate file types
        if (isPdfOnly) {
            const invalidFiles = newFiles.filter((file)=>file.type !== "application/pdf");
            if (invalidFiles.length > 0) {
                setUploadError("يرجى رفع ملفات PDF فقط");
                return;
            }
        } else if (isImageOnly) {
            const invalidFiles = newFiles.filter((file)=>!file.type.startsWith("image/"));
            if (invalidFiles.length > 0) {
                setUploadError("يرجى رفع صور فقط");
                return;
            }
        } else if (isVideoOnly) {
            const invalidFiles = newFiles.filter((file)=>!file.type.startsWith("video/"));
            if (invalidFiles.length > 0) {
                setUploadError("يرجى رفع فيديوهات فقط");
                return;
            }
        }
        // Validate file sizes
        const oversizedFiles = newFiles.filter((file)=>file.size > maxFileSize * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            setUploadError(`حجم الملف يجب أن لا يتجاوز ${maxFileSize} ميجابايت`);
            return;
        }
        // Validate number of files
        if (allowMultiple) {
            const totalFiles = files.length + newFiles.length;
            if (totalFiles > maxFiles) {
                setUploadError(`يمكنك رفع ${maxFiles} ملفات كحد أقصى`);
                return;
            }
        }
        setUploadError(null);
        setIsUploading(true);
        setUploadProgress(0);
        try {
            // رفع الملفات إلى الخادم
            const uploadedFiles = await Promise.all(newFiles.map(async (file)=>{
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$filesService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filesService"].uploadFile(file, getFileCategory(), (progress)=>setUploadProgress(progress));
                return {
                    fileName: result.fileName,
                    fileSize: result.fileSize,
                    fileType: result.fileType,
                    fileUrl: result.fileUrl,
                    uploadedAt: result.uploadedAt
                };
            }));
            // تحديث القيمة
            if (allowMultiple) {
                onChange([
                    ...files,
                    ...uploadedFiles
                ]);
            } else {
                onChange(uploadedFiles[0]);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadError(error instanceof Error ? error.message : "فشل رفع الملف");
        } finally{
            setIsUploading(false);
            setUploadProgress(0);
        }
    };
    const handleRemoveFile = (index)=>{
        if (allowMultiple) {
            const newFiles = files.filter((_, i)=>i !== index);
            onChange(newFiles.length > 0 ? newFiles : null);
        } else {
            onChange(null);
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };
    const formatFileSize = (bytes)=>{
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };
    const getFileIcon = (file)=>{
        const fileType = file.fileType || file.type || "";
        if (fileType.startsWith("image/")) return __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"];
        if (fileType === "application/pdf") return __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
        return __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"];
    };
    const getFileName = (file)=>{
        return file.fileName || file.name || "ملف";
    };
    const getFileSize = (file)=>{
        return file.fileSize || file.size || 0;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm",
                        children: index + 1
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xl font-semibold text-gray-900 leading-relaxed",
                                children: [
                                    settings.label || "رفع ملف",
                                    settings.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-500 mr-1",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                        lineNumber: 187,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            settings.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-2 text-base leading-relaxed",
                                children: settings.description
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pr-11 space-y-4",
                children: [
                    uploadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg",
                        children: uploadError
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-4 h-4 animate-spin text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-primary font-medium",
                                        children: [
                                            "جاري رفع الملف... ",
                                            uploadProgress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                value: uploadProgress,
                                className: "h-2"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onDragOver: handleDragOver,
                        onDragLeave: handleDragLeave,
                        onDrop: handleDrop,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-2 border-dashed rounded-xl p-8 text-center transition-all", isUploading ? "pointer-events-none opacity-50" : "cursor-pointer", isDragging ? "border-primary bg-blue-50" : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"),
                        onClick: ()=>!isUploading && fileInputRef.current?.click(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center",
                                    children: isUploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-8 h-8 text-primary animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                        lineNumber: 236,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        className: "w-8 h-8 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                        lineNumber: 238,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-semibold text-gray-900 mb-1",
                                            children: isUploading ? "جاري الرفع..." : "اسحب الملفات هنا أو انقر للاختيار"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: [
                                                isPdfOnly ? "ملفات PDF فقط" : isImageOnly ? "صور فقط" : isVideoOnly ? "فيديوهات فقط" : "جميع أنواع الملفات",
                                                " • ",
                                                "حجم أقصى ",
                                                maxFileSize,
                                                " ميجابايت",
                                                allowMultiple && ` • حتى ${maxFiles} ملفات`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: isPdfOnly ? ".pdf" : isImageOnly ? "image/*" : isVideoOnly ? "video/*" : "*",
                        multiple: allowMultiple,
                        onChange: (e)=>handleFileSelect(e.target.files),
                        className: "hidden"
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: files.map((file, idx)=>{
                            const FileIcon = getFileIcon(file);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileIcon, {
                                            className: "w-5 h-5 text-gray-600"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                            lineNumber: 276,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                        lineNumber: 275,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-gray-900 truncate",
                                                children: getFileName(file)
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                                lineNumber: 279,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: formatFileSize(getFileSize(file))
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                                lineNumber: 282,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                        lineNumber: 278,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: ()=>handleRemoveFile(idx),
                                        className: "text-red-600 hover:text-red-700 hover:bg-red-50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                            lineNumber: 293,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                        lineNumber: 286,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                lineNumber: 271,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this),
                    allowMultiple && files.length > 0 && files.length < maxFiles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "outline",
                        onClick: ()=>fileInputRef.current?.click(),
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this),
                            "رفع ملف آخر (",
                            files.length,
                            "/",
                            maxFiles,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx",
        lineNumber: 178,
        columnNumber: 5
    }, this);
}
_s(FileUploadComponent, "f4dOqC1Ds5MNIhaOx8A1LX/dBn8=");
_c = FileUploadComponent;
var _c;
__turbopack_context__.k.register(_c, "FileUploadComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/events/participate/components/SignatureComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignatureComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Pen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$filesService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/lib/api/services/filesService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function SignatureComponent({ component, value, onChange, index }) {
    _s();
    const settings = component.settings;
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEmpty, setIsEmpty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadError, setUploadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignatureComponent.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Set canvas size
            canvas.width = canvas.offsetWidth;
            canvas.height = 200;
            // Set drawing style
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            // Load existing signature if any
            if (value) {
                const img = new Image();
                img.crossOrigin = "anonymous"; // منع خطأ Tainted Canvas
                img.onload = ({
                    "SignatureComponent.useEffect": ()=>{
                        ctx.drawImage(img, 0, 0);
                        setIsEmpty(false);
                    }
                })["SignatureComponent.useEffect"];
                img.onerror = ({
                    "SignatureComponent.useEffect": ()=>{
                        // في حالة فشل التحميل مع crossOrigin، نحاول بدونه (للـ base64)
                        const fallbackImg = new Image();
                        fallbackImg.onload = ({
                            "SignatureComponent.useEffect": ()=>{
                                ctx.drawImage(fallbackImg, 0, 0);
                                setIsEmpty(false);
                            }
                        })["SignatureComponent.useEffect"];
                        if (typeof value === "string" && value.startsWith("data:")) {
                            fallbackImg.src = value;
                        } else if (value.signatureData) {
                            fallbackImg.src = value.signatureData;
                        }
                    }
                })["SignatureComponent.useEffect"];
                // Handle different formats: URL (new), base64 (old), or object
                if (typeof value === "string") {
                    img.src = value.startsWith("data:") ? value : __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$filesService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filesService"].getFullFileUrl(value);
                } else if (value.signatureUrl) {
                    img.src = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$filesService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filesService"].getFullFileUrl(value.signatureUrl);
                } else if (value.signatureData) {
                    img.src = value.signatureData;
                }
            }
        }
    }["SignatureComponent.useEffect"], [
        value
    ]);
    const startDrawing = (e)=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        setIsDrawing(true);
        setIsEmpty(false);
        const rect = canvas.getBoundingClientRect();
        const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    const draw = (e)=>{
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
    };
    const stopDrawing = async ()=>{
        if (!isDrawing) return;
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (!canvas) return;
        // رفع التوقيع كملف صورة
        setIsUploading(true);
        setUploadError(null);
        try {
            const dataUrl = canvas.toDataURL("image/png");
            // تحويل Base64 إلى File
            const file = __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$filesService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filesService"].base64ToFile(dataUrl, `signature_${Date.now()}.png`, "image/png");
            // رفع الملف
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$lib$2f$api$2f$services$2f$filesService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filesService"].uploadFile(file, "signature");
            onChange({
                signatureUrl: result.fileUrl,
                signatureData: dataUrl,
                signedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error uploading signature:", error);
            setUploadError(error instanceof Error ? error.message : "فشل رفع التوقيع");
            // في حالة الفشل، نحفظ Base64 مؤقتاً
            const dataUrl = canvas.toDataURL("image/png");
            onChange({
                signatureData: dataUrl,
                signedAt: new Date().toISOString()
            });
        } finally{
            setIsUploading(false);
        }
    };
    const clearSignature = ()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsEmpty(true);
        setUploadError(null);
        onChange(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm",
                        children: index + 1
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xl font-semibold text-gray-900 leading-relaxed",
                                children: [
                                    settings.label || "التوقيع",
                                    settings.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-500 mr-1",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                        lineNumber: 181,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            settings.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-2 text-base leading-relaxed",
                                children: settings.description
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pr-11 space-y-3",
                children: [
                    uploadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm",
                        children: uploadError
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `border-2 border-gray-300 rounded-xl overflow-hidden bg-white relative ${isUploading ? 'opacity-50' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                onMouseDown: startDrawing,
                                onMouseMove: draw,
                                onMouseUp: stopDrawing,
                                onMouseLeave: stopDrawing,
                                onTouchStart: startDrawing,
                                onTouchMove: draw,
                                onTouchEnd: stopDrawing,
                                className: `w-full touch-none ${isUploading ? 'pointer-events-none' : 'cursor-crosshair'}`,
                                style: {
                                    height: "200px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center bg-white/50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-primary",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "w-5 h-5 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                            lineNumber: 217,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium",
                                            children: "جاري حفظ التوقيع..."
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm text-gray-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__["Pen"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "وقّع في المربع أعلاه"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            !isEmpty && !isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                onClick: clearSignature,
                                className: "text-red-600 hover:text-red-700 hover:bg-red-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    "مسح التوقيع"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/events/participate/components/SignatureComponent.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_s(SignatureComponent, "9dLZ/8pWTp+zfpcKzvEX2w6gdGQ=");
_c = SignatureComponent;
var _c;
__turbopack_context__.k.register(_c, "SignatureComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/events/participate/components/TableComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TableComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/table.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function TableComponent({ component, index }) {
    const settings = component.settings;
    const columns = settings.columns || [];
    const rowCount = settings.rowCount || 0;
    const tableData = settings.tableData || {};
    const tableType = settings.tableType || "simple";
    const calculations = settings.calculations || [];
    // حساب قيمة العملية الحسابية
    const calculateValue = (calc)=>{
        const values = [];
        for(let rowIndex = 0; rowIndex < rowCount; rowIndex++){
            const cellValue = tableData[rowIndex]?.[calc.columnId];
            if (cellValue !== undefined && cellValue !== "") {
                const num = parseFloat(cellValue);
                if (!isNaN(num)) {
                    values.push(num);
                }
            }
        }
        if (values.length === 0) return 0;
        switch(calc.type){
            case "sum":
                return values.reduce((sum, val)=>sum + val, 0);
            case "avg":
                return values.reduce((sum, val)=>sum + val, 0) / values.length;
            case "min":
                return Math.min(...values);
            case "max":
                return Math.max(...values);
            case "count":
                return values.length;
            default:
                return 0;
        }
    };
    // الحصول على قيمة الخلية
    const getCellValue = (rowIndex, columnId)=>{
        return tableData[rowIndex]?.[columnId] || "";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm",
                        children: index + 1
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-xl font-semibold text-gray-900 leading-relaxed",
                                children: settings.label || "جدول"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            settings.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-2 text-base leading-relaxed",
                                children: settings.description
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pr-11 overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border border-gray-200 rounded-lg overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    className: "bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            className: "font-bold text-gray-900 text-center w-16",
                                            children: "#"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this),
                                        columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                className: "font-bold text-gray-900 text-center",
                                                children: col.label
                                            }, col.id, false, {
                                                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                                lineNumber: 95,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                children: [
                                    Array.from({
                                        length: rowCount
                                    }).map((_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                            className: "hover:bg-gray-50/50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    className: "font-semibold text-gray-600 text-center bg-gray-50",
                                                    children: rowIndex + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 19
                                                }, this),
                                                columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-center text-gray-900",
                                                        children: getCellValue(rowIndex, col.id) || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-400",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, col.id, false, {
                                                        fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, rowIndex, true, {
                                            fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this)),
                                    tableType === "calculation" && calculations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: calculations.map((calc)=>{
                                            const column = columns.find((c)=>c.id === calc.columnId);
                                            if (!column) return null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                className: "bg-blue-50 font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                        className: "text-gray-900 text-center",
                                                        children: calc.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 25
                                                    }, this),
                                                    columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            className: "text-center",
                                                            children: col.id === calc.columnId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-700",
                                                                children: calculateValue(calc).toFixed(2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                                                lineNumber: 132,
                                                                columnNumber: 31
                                                            }, this) : ""
                                                        }, col.id, false, {
                                                            fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 27
                                                        }, this))
                                                ]
                                            }, calc.id, true, {
                                                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                                lineNumber: 125,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/events/participate/components/TableComponent.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_c = TableComponent;
var _c;
__turbopack_context__.k.register(_c, "TableComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/events/participate/components/DisplayComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DisplayComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/event-meena/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DisplayComponent({ component }) {
    const settings = component.settings;
    const renderContent = ()=>{
        // Handle different component types
        if (component.type === "text") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "prose prose-lg max-w-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-700 leading-relaxed",
                    dangerouslySetInnerHTML: {
                        __html: settings.content || ""
                    }
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                    lineNumber: 21,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this);
        }
        // For "display" type, check displayType setting
        const displayType = component.type === "display" ? settings.displayType : component.type;
        switch(displayType){
            case "image":
                const imageSettings = settings;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        imageSettings.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: imageSettings.imageUrl,
                                alt: imageSettings.altText || imageSettings.imageAlt || "صورة",
                                width: 800,
                                height: 600,
                                className: "w-full h-auto object-contain",
                                style: {
                                    maxHeight: "600px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                lineNumber: 39,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                            lineNumber: 38,
                            columnNumber: 15
                        }, this),
                        imageSettings.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-gray-600 text-sm italic",
                            children: imageSettings.caption
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                            lineNumber: 50,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this);
            case "video":
                const videoSettings = settings;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        videoSettings.videoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full rounded-xl overflow-hidden border border-gray-200 bg-black",
                            children: videoSettings.videoUrl.includes("youtube.com") || videoSettings.videoUrl.includes("youtu.be") ? // YouTube embed
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full",
                                style: {
                                    paddingBottom: "56.25%"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    src: getYouTubeEmbedUrl(videoSettings.videoUrl),
                                    className: "absolute top-0 left-0 w-full h-full",
                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                    allowFullScreen: true
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                    lineNumber: 67,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                lineNumber: 66,
                                columnNumber: 19
                            }, this) : // Direct video
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: videoSettings.videoUrl,
                                controls: true,
                                className: "w-full",
                                style: {
                                    maxHeight: "600px"
                                },
                                children: "متصفحك لا يدعم تشغيل الفيديو"
                            }, void 0, false, {
                                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                lineNumber: 76,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                            lineNumber: 62,
                            columnNumber: 15
                        }, this),
                        videoSettings.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-gray-600 text-sm italic",
                            children: videoSettings.caption
                        }, void 0, false, {
                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                            lineNumber: 88,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this);
            case "pdf":
                const pdfSettings = settings;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: pdfSettings.pdfUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-gray-200 rounded-xl p-6 bg-gray-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            className: "w-8 h-8 text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                            lineNumber: 103,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-gray-900 text-lg",
                                                children: pdfSettings.fileName || pdfSettings.pdfFileName || "ملف PDF"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                                lineNumber: 106,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 text-sm",
                                                children: pdfSettings.description || "اضغط لعرض أو تحميل الملف"
                                            }, void 0, false, {
                                                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                                lineNumber: 109,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                        lineNumber: 105,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                lineNumber: 101,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        asChild: true,
                                        className: "flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: pdfSettings.pdfUrl,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 23
                                                }, this),
                                                "عرض الملف"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                            lineNumber: 116,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                        lineNumber: 115,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        asChild: true,
                                        className: "flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: pdfSettings.pdfUrl,
                                            download: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 23
                                                }, this),
                                                "تحميل"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                            lineNumber: 126,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                        lineNumber: 125,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                lineNumber: 114,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                        lineNumber: 100,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                    lineNumber: 98,
                    columnNumber: 11
                }, this);
            case "link":
                const linkSettings = settings;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: (linkSettings.url || linkSettings.linkUrl) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-primary/20 rounded-xl p-6 bg-blue-50/50 hover:bg-blue-50 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        className: "w-6 h-6 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                        lineNumber: 145,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                    lineNumber: 144,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-gray-900 text-lg mb-1",
                                            children: linkSettings.linkText || "رابط خارجي"
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                            lineNumber: 148,
                                            columnNumber: 21
                                        }, this),
                                        linkSettings.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 text-sm mb-3",
                                            children: linkSettings.description
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                            lineNumber: 152,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: linkSettings.url || linkSettings.linkUrl,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "inline-flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                        className: "w-4 h-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 25
                                                    }, this),
                                                    "فتح الرابط"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                                lineNumber: 157,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                            lineNumber: 156,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                                    lineNumber: 147,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                            lineNumber: 143,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                        lineNumber: 142,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                    lineNumber: 140,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    const getYouTubeEmbedUrl = (url)=>{
        const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };
    const anySettings = settings;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            anySettings.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xl font-semibold text-gray-900 leading-relaxed",
                        children: anySettings.label
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    anySettings.description && component.type !== "link" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mt-2 text-base leading-relaxed",
                        children: anySettings.description
                    }, void 0, false, {
                        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                        lineNumber: 197,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: renderContent()
            }, void 0, false, {
                fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/event-meena/components/events/participate/components/DisplayComponent.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
_c = DisplayComponent;
var _c;
__turbopack_context__.k.register(_c, "DisplayComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/event-meena/components/events/participate/ComponentRenderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComponentRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$QuestionComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/events/participate/components/QuestionComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$RatingComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/events/participate/components/RatingComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$FileUploadComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/events/participate/components/FileUploadComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$SignatureComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/events/participate/components/SignatureComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$TableComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/events/participate/components/TableComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$DisplayComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/event-meena/components/events/participate/components/DisplayComponent.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ComponentRenderer({ component, value, onChange, index, eventType, isPreviewMode = false }) {
    // Render component based on type
    const renderComponent = ()=>{
        switch(component.type){
            case "question":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$QuestionComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    component: component,
                    value: value,
                    onChange: onChange,
                    index: index,
                    eventType: eventType
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
                    lineNumber: 34,
                    columnNumber: 11
                }, this);
            case "rating":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$RatingComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    component: component,
                    value: value,
                    onChange: onChange,
                    index: index
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, this);
            case "pdf_upload":
            case "image_upload":
            case "video_upload":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$FileUploadComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    component: component,
                    value: value,
                    onChange: onChange,
                    index: index
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this);
            case "signature":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$SignatureComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    component: component,
                    value: value,
                    onChange: onChange,
                    index: index
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this);
            case "table":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$TableComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    component: component,
                    value: value,
                    onChange: onChange,
                    index: index
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                }, this);
            case "display":
            case "text":
            case "link":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$components$2f$events$2f$participate$2f$components$2f$DisplayComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    component: component
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
                    lineNumber: 88,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-gray-50 rounded-lg border border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-sm",
                        children: [
                            "نوع المكون غير مدعوم: ",
                            component.type
                        ]
                    }, void 0, true, {
                        fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
                        lineNumber: 93,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$event$2d$meena$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "component-wrapper",
        children: renderComponent()
    }, void 0, false, {
        fileName: "[project]/event-meena/components/events/participate/ComponentRenderer.tsx",
        lineNumber: 101,
        columnNumber: 10
    }, this);
}
_c = ComponentRenderer;
var _c;
__turbopack_context__.k.register(_c, "ComponentRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=event-meena_components_events_participate_4e526162._.js.map