import type { EventTemplate } from "./templates";

export const additionalTemplates: EventTemplate[] = [
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
      showResultsImmediately: false,
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
            type: "short_text" as const,
            label: "الاسم الكامل",
            placeholder: "أدخل اسمك الكامل",
            required: true,
            order: 0,
            settings: {},
          },
          {
            id: "q2",
            type: "short_text" as const,
            label: "البريد الإلكتروني",
            placeholder: "example@email.com",
            required: true,
            order: 1,
            settings: {},
          },
          {
            id: "q3",
            type: "short_text" as const,
            label: "رقم الهاتف",
            placeholder: "+966 5XX XXX XXX",
            required: true,
            order: 2,
            settings: {},
          },
          {
            id: "q4",
            type: "single_choice" as const,
            label: "الجنس",
            placeholder: "",
            required: true,
            order: 3,
            settings: {
              options: [
                { id: "gender1", label: "ذكر", order: 0 },
                { id: "gender2", label: "أنثى", order: 1 },
              ],
            },
          },
        ],
      },
      {
        id: "section-2",
        title: "معلومات إضافية",
        description: "معلومات تساعدنا في تنظيم الحدث",
        order: 1,
        components: [
          {
            id: "q5",
            type: "single_choice" as const,
            label: "كيف سمعت عن هذا الحدث؟",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "source1", label: "وسائل التواصل الاجتماعي", order: 0 },
                { id: "source2", label: "صديق أو زميل", order: 1 },
                { id: "source3", label: "البريد الإلكتروني", order: 2 },
                { id: "source4", label: "موقع الويب", order: 3 },
                { id: "source5", label: "أخرى", order: 4 },
              ],
            },
          },
          {
            id: "q6",
            type: "multiple_choice" as const,
            label: "ما هي اهتماماتك؟ (يمكن اختيار أكثر من إجابة)",
            placeholder: "",
            required: false,
            order: 1,
            settings: {
              options: [
                { id: "int1", label: "التكنولوجيا", order: 0 },
                { id: "int2", label: "الأعمال", order: 1 },
                { id: "int3", label: "التعليم", order: 2 },
                { id: "int4", label: "الصحة", order: 3 },
                { id: "int5", label: "الفنون", order: 4 },
              ],
            },
          },
          {
            id: "q7",
            type: "long_text" as const,
            label: "ملاحظات أو متطلبات خاصة",
            placeholder: "اكتب أي ملاحظات أو متطلبات خاصة...",
            required: false,
            order: 2,
            settings: {},
          },
        ],
      },
      {
        id: "section-3",
        title: "الموافقة والشروط",
        description: "يرجى قراءة الشروط والموافقة عليها",
        order: 2,
        components: [
          {
            id: "q8",
            type: "single_choice" as const,
            label: "أوافق على الشروط والأحكام",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "agree1", label: "نعم، أوافق", order: 0 },
                { id: "agree2", label: "لا أوافق", order: 1 },
              ],
            },
          },
          {
            id: "q9",
            type: "single_choice" as const,
            label: "أوافق على تلقي رسائل بريد إلكتروني حول الأحداث القادمة",
            placeholder: "",
            required: false,
            order: 1,
            settings: {
              options: [
                { id: "email1", label: "نعم", order: 0 },
                { id: "email2", label: "لا", order: 1 },
              ],
            },
          },
        ],
      },
    ],
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
      showResultsImmediately: false,
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
            type: "single_choice" as const,
            label: "كيف تقيّم تجربتك الإجمالية معنا؟",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "exp1", label: "⭐⭐⭐⭐⭐ ممتازة", order: 0 },
                { id: "exp2", label: "⭐⭐⭐⭐ جيدة جداً", order: 1 },
                { id: "exp3", label: "⭐⭐⭐ جيدة", order: 2 },
                { id: "exp4", label: "⭐⭐ مقبولة", order: 3 },
                { id: "exp5", label: "⭐ سيئة", order: 4 },
              ],
            },
          },
          {
            id: "q2",
            type: "single_choice" as const,
            label: "هل تلبي منتجاتنا/خدماتنا توقعاتك؟",
            placeholder: "",
            required: true,
            order: 1,
            settings: {
              options: [
                { id: "meet1", label: "تتجاوز التوقعات", order: 0 },
                { id: "meet2", label: "تلبي التوقعات", order: 1 },
                { id: "meet3", label: "أقل من التوقعات", order: 2 },
                { id: "meet4", label: "أقل بكثير من التوقعات", order: 3 },
              ],
            },
          },
        ],
      },
      {
        id: "section-2",
        title: "تقييم تفصيلي",
        description: "قيّم جوانب محددة من خدماتنا",
        order: 1,
        components: [
          {
            id: "q3",
            type: "single_choice" as const,
            label: "جودة المنتج/الخدمة",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "qual1", label: "⭐⭐⭐⭐⭐ ممتازة", order: 0 },
                { id: "qual2", label: "⭐⭐⭐⭐ جيدة", order: 1 },
                { id: "qual3", label: "⭐⭐⭐ متوسطة", order: 2 },
                { id: "qual4", label: "⭐⭐ ضعيفة", order: 3 },
                { id: "qual5", label: "⭐ سيئة جداً", order: 4 },
              ],
            },
          },
          {
            id: "q4",
            type: "single_choice" as const,
            label: "القيمة مقابل السعر",
            placeholder: "",
            required: true,
            order: 1,
            settings: {
              options: [
                { id: "value1", label: "⭐⭐⭐⭐⭐ ممتازة", order: 0 },
                { id: "value2", label: "⭐⭐⭐⭐ جيدة", order: 1 },
                { id: "value3", label: "⭐⭐⭐ متوسطة", order: 2 },
                { id: "value4", label: "⭐⭐ ضعيفة", order: 3 },
                { id: "value5", label: "⭐ سيئة", order: 4 },
              ],
            },
          },
          {
            id: "q5",
            type: "single_choice" as const,
            label: "خدمة العملاء",
            placeholder: "",
            required: true,
            order: 2,
            settings: {
              options: [
                { id: "serv1", label: "⭐⭐⭐⭐⭐ ممتازة", order: 0 },
                { id: "serv2", label: "⭐⭐⭐⭐ جيدة", order: 1 },
                { id: "serv3", label: "⭐⭐⭐ متوسطة", order: 2 },
                { id: "serv4", label: "⭐⭐ ضعيفة", order: 3 },
                { id: "serv5", label: "⭐ سيئة", order: 4 },
              ],
            },
          },
          {
            id: "q6",
            type: "single_choice" as const,
            label: "سهولة الاستخدام",
            placeholder: "",
            required: true,
            order: 3,
            settings: {
              options: [
                { id: "ease1", label: "⭐⭐⭐⭐⭐ سهل جداً", order: 0 },
                { id: "ease2", label: "⭐⭐⭐⭐ سهل", order: 1 },
                { id: "ease3", label: "⭐⭐⭐ متوسط", order: 2 },
                { id: "ease4", label: "⭐⭐ صعب", order: 3 },
                { id: "ease5", label: "⭐ صعب جداً", order: 4 },
              ],
            },
          },
        ],
      },
      {
        id: "section-3",
        title: "الاقتراحات والتحسينات",
        description: "ساعدنا في تحسين خدماتنا",
        order: 2,
        components: [
          {
            id: "q7",
            type: "long_text" as const,
            label: "ما الذي أعجبك أكثر في تجربتك معنا؟",
            placeholder: "اكتب رأيك هنا...",
            required: false,
            order: 0,
            settings: {},
          },
          {
            id: "q8",
            type: "long_text" as const,
            label: "ما الذي يمكننا تحسينه؟",
            placeholder: "اكتب اقتراحاتك هنا...",
            required: false,
            order: 1,
            settings: {},
          },
        ],
      },
      {
        id: "section-4",
        title: "التوصية والولاء",
        description: "مدى احتمالية توصيتك بنا",
        order: 3,
        components: [
          {
            id: "q9",
            type: "single_choice" as const,
            label: "ما مدى احتمالية أن توصي بنا لأصدقائك أو عائلتك؟",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "nps1", label: "10 - بالتأكيد سأوصي", order: 0 },
                { id: "nps2", label: "9 - على الأرجح سأوصي", order: 1 },
                { id: "nps3", label: "8 - ربما سأوصي", order: 2 },
                { id: "nps4", label: "7 - محايد", order: 3 },
                { id: "nps5", label: "6 أو أقل - لن أوصي", order: 4 },
              ],
            },
          },
          {
            id: "q10",
            type: "single_choice" as const,
            label: "هل ستستخدم خدماتنا مرة أخرى؟",
            placeholder: "",
            required: true,
            order: 1,
            settings: {
              options: [
                { id: "return1", label: "بالتأكيد نعم", order: 0 },
                { id: "return2", label: "على الأرجح نعم", order: 1 },
                { id: "return3", label: "ربما", order: 2 },
                { id: "return4", label: "على الأرجح لا", order: 3 },
                { id: "return5", label: "بالتأكيد لا", order: 4 },
              ],
            },
          },
        ],
      },
    ],
  },
];

