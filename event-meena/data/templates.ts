import { additionalTemplates } from "./templates-additional";

// Template-specific types (simplified for templates)
export interface TemplateComponent {
  id: string;
  type: "short_text" | "long_text" | "single_choice" | "multiple_choice";
  label: string;
  placeholder: string;
  required: boolean;
  order: number;
  settings: {
    options?: Array<{ id: string; label: string; order: number }>;
    correctAnswer?: string | string[];
    correctAnswers?: string[];
    points?: number;
  };
}

export interface TemplateSection {
  id: string;
  title: string;
  description: string;
  order: number;
  components: TemplateComponent[];
}

export interface EventTemplate {
  id: string;
  name: string;
  description: string;
  category: "exam" | "survey" | "form" | "poll" | "feedback";
  icon: string;
  totalQuestions: number;
  totalSections: number;
  estimatedTime: string;
  sections: TemplateSection[];
  settings: {
    allowAnonymous: boolean;
    showProgressBar: boolean;
    shuffleQuestions: boolean;
    allowBackNavigation: boolean;
    showResultsImmediately: boolean;
  };
}

export const eventTemplates: EventTemplate[] = [
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
      showResultsImmediately: true,
    },
    sections: [
      {
        id: "section-1",
        title: "القسم الأول: أسئلة أساسية",
        description: "أسئلة اختيار من متعدد - 10 نقاط لكل سؤال",
        order: 0,
        components: Array.from({ length: 10 }, (_, i) => ({
          id: `q1-${i + 1}`,
          type: "single_choice" as const,
          label: `السؤال ${i + 1}: ما هي الإجابة الصحيحة؟`,
          placeholder: "",
          required: true,
          order: i,
          settings: {
            options: [
              { id: `opt-${i}-1`, label: "الخيار الأول", order: 0 },
              { id: `opt-${i}-2`, label: "الخيار الثاني", order: 1 },
              { id: `opt-${i}-3`, label: "الخيار الثالث", order: 2 },
              { id: `opt-${i}-4`, label: "الخيار الرابع", order: 3 },
            ],
            correctAnswer: `opt-${i}-1`,
            points: 10,
          },
        })),
      },
      {
        id: "section-2",
        title: "القسم الثاني: أسئلة متوسطة",
        description: "أسئلة اختيار من متعدد - 10 نقاط لكل سؤال",
        order: 1,
        components: Array.from({ length: 10 }, (_, i) => ({
          id: `q2-${i + 1}`,
          type: "single_choice" as const,
          label: `السؤال ${i + 11}: اختر الإجابة الصحيحة`,
          placeholder: "",
          required: true,
          order: i,
          settings: {
            options: [
              { id: `opt2-${i}-1`, label: "الخيار الأول", order: 0 },
              { id: `opt2-${i}-2`, label: "الخيار الثاني", order: 1 },
              { id: `opt2-${i}-3`, label: "الخيار الثالث", order: 2 },
              { id: `opt2-${i}-4`, label: "الخيار الرابع", order: 3 },
            ],
            correctAnswer: `opt2-${i}-1`,
            points: 10,
          },
        })),
      },
      {
        id: "section-3",
        title: "القسم الثالث: أسئلة متقدمة",
        description: "أسئلة اختيار من متعدد - 10 نقاط لكل سؤال",
        order: 2,
        components: Array.from({ length: 10 }, (_, i) => ({
          id: `q3-${i + 1}`,
          type: "single_choice" as const,
          label: `السؤال ${i + 21}: حدد الإجابة الصحيحة`,
          placeholder: "",
          required: true,
          order: i,
          settings: {
            options: [
              { id: `opt3-${i}-1`, label: "الخيار الأول", order: 0 },
              { id: `opt3-${i}-2`, label: "الخيار الثاني", order: 1 },
              { id: `opt3-${i}-3`, label: "الخيار الثالث", order: 2 },
              { id: `opt3-${i}-4`, label: "الخيار الرابع", order: 3 },
            ],
            correctAnswer: `opt3-${i}-1`,
            points: 10,
          },
        })),
      },
    ],
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
      showResultsImmediately: false,
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
            type: "short_text" as const,
            label: "ما هو اسمك؟ (اختياري)",
            placeholder: "أدخل اسمك",
            required: false,
            order: 0,
            settings: {},
          },
          {
            id: "q2",
            type: "single_choice" as const,
            label: "كم مرة استخدمت خدماتنا؟",
            placeholder: "",
            required: true,
            order: 1,
            settings: {
              options: [
                { id: "opt1", label: "المرة الأولى", order: 0 },
                { id: "opt2", label: "2-5 مرات", order: 1 },
                { id: "opt3", label: "6-10 مرات", order: 2 },
                { id: "opt4", label: "أكثر من 10 مرات", order: 3 },
              ],
            },
          },
        ],
      },
      {
        id: "section-2",
        title: "تقييم الخدمة",
        description: "قيّم جودة الخدمة المقدمة",
        order: 1,
        components: [
          {
            id: "q3",
            type: "single_choice" as const,
            label: "كيف تقيّم جودة الخدمة بشكل عام؟",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "rate1", label: "⭐ ضعيف جداً", order: 0 },
                { id: "rate2", label: "⭐⭐ ضعيف", order: 1 },
                { id: "rate3", label: "⭐⭐⭐ متوسط", order: 2 },
                { id: "rate4", label: "⭐⭐⭐⭐ جيد", order: 3 },
                { id: "rate5", label: "⭐⭐⭐⭐⭐ ممتاز", order: 4 },
              ],
            },
          },
          {
            id: "q4",
            type: "single_choice" as const,
            label: "كيف تقيّم سرعة الخدمة؟",
            placeholder: "",
            required: true,
            order: 1,
            settings: {
              options: [
                { id: "speed1", label: "⭐ بطيء جداً", order: 0 },
                { id: "speed2", label: "⭐⭐ بطيء", order: 1 },
                { id: "speed3", label: "⭐⭐⭐ متوسط", order: 2 },
                { id: "speed4", label: "⭐⭐⭐⭐ سريع", order: 3 },
                { id: "speed5", label: "⭐⭐⭐⭐⭐ سريع جداً", order: 4 },
              ],
            },
          },
          {
            id: "q5",
            type: "single_choice" as const,
            label: "كيف تقيّم التعامل مع فريق الدعم؟",
            placeholder: "",
            required: true,
            order: 2,
            settings: {
              options: [
                { id: "support1", label: "⭐ سيء جداً", order: 0 },
                { id: "support2", label: "⭐⭐ سيء", order: 1 },
                { id: "support3", label: "⭐⭐⭐ متوسط", order: 2 },
                { id: "support4", label: "⭐⭐⭐⭐ جيد", order: 3 },
                { id: "support5", label: "⭐⭐⭐⭐⭐ ممتاز", order: 4 },
              ],
            },
          },
        ],
      },
      {
        id: "section-3",
        title: "ملاحظات وتعليقات",
        description: "شاركنا رأيك وملاحظاتك",
        order: 2,
        components: [
          {
            id: "q6",
            type: "long_text" as const,
            label: "ما هي أكثر ميزة أعجبتك في خدماتنا؟",
            placeholder: "اكتب رأيك هنا...",
            required: false,
            order: 0,
            settings: {},
          },
          {
            id: "q7",
            type: "long_text" as const,
            label: "ما هي الأشياء التي تحتاج إلى تحسين؟",
            placeholder: "اكتب اقتراحاتك هنا...",
            required: false,
            order: 1,
            settings: {},
          },
        ],
      },
      {
        id: "section-4",
        title: "التوصية",
        description: "هل ستوصي بخدماتنا؟",
        order: 3,
        components: [
          {
            id: "q8",
            type: "single_choice" as const,
            label: "هل ستوصي بخدماتنا لأصدقائك؟",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "rec1", label: "بالتأكيد نعم", order: 0 },
                { id: "rec2", label: "ربما", order: 1 },
                { id: "rec3", label: "غير متأكد", order: 2 },
                { id: "rec4", label: "على الأرجح لا", order: 3 },
                { id: "rec5", label: "بالتأكيد لا", order: 4 },
              ],
            },
          },
        ],
      },
    ],
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
      showResultsImmediately: false,
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
            type: "single_choice" as const,
            label: "ما هو رأيك في الموضوع المطروح؟",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "op1", label: "موافق بشدة", order: 0 },
                { id: "op2", label: "موافق", order: 1 },
                { id: "op3", label: "محايد", order: 2 },
                { id: "op4", label: "غير موافق", order: 3 },
                { id: "op5", label: "غير موافق بشدة", order: 4 },
              ],
            },
          },
          {
            id: "q2",
            type: "multiple_choice" as const,
            label: "ما هي العوامل المؤثرة في رأيك؟ (يمكن اختيار أكثر من إجابة)",
            placeholder: "",
            required: true,
            order: 1,
            settings: {
              options: [
                { id: "fac1", label: "التجربة الشخصية", order: 0 },
                { id: "fac2", label: "آراء الآخرين", order: 1 },
                { id: "fac3", label: "المعلومات المتاحة", order: 2 },
                { id: "fac4", label: "الأخبار والإعلام", order: 3 },
                { id: "fac5", label: "أخرى", order: 4 },
              ],
            },
          },
          {
            id: "q3",
            type: "long_text" as const,
            label: "اشرح رأيك بالتفصيل",
            placeholder: "اكتب رأيك هنا...",
            required: false,
            order: 2,
            settings: {},
          },
        ],
      },
      {
        id: "section-2",
        title: "التفاصيل والاقتراحات",
        description: "نريد معرفة المزيد عن رأيك",
        order: 1,
        components: [
          {
            id: "q4",
            type: "single_choice" as const,
            label: "هل تعتقد أن هذا الموضوع مهم؟",
            placeholder: "",
            required: true,
            order: 0,
            settings: {
              options: [
                { id: "imp1", label: "مهم جداً", order: 0 },
                { id: "imp2", label: "مهم", order: 1 },
                { id: "imp3", label: "متوسط الأهمية", order: 2 },
                { id: "imp4", label: "غير مهم", order: 3 },
              ],
            },
          },
          {
            id: "q5",
            type: "long_text" as const,
            label: "ما هي اقتراحاتك للتحسين؟",
            placeholder: "اكتب اقتراحاتك هنا...",
            required: false,
            order: 1,
            settings: {},
          },
        ],
      },
      {
        id: "section-3",
        title: "معلومات ديموغرافية",
        description: "معلومات اختيارية لتحليل أفضل",
        order: 2,
        components: [
          {
            id: "q6",
            type: "single_choice" as const,
            label: "الفئة العمرية",
            placeholder: "",
            required: false,
            order: 0,
            settings: {
              options: [
                { id: "age1", label: "أقل من 18", order: 0 },
                { id: "age2", label: "18-25", order: 1 },
                { id: "age3", label: "26-35", order: 2 },
                { id: "age4", label: "36-50", order: 3 },
                { id: "age5", label: "أكثر من 50", order: 4 },
              ],
            },
          },
          {
            id: "q7",
            type: "single_choice" as const,
            label: "المستوى التعليمي",
            placeholder: "",
            required: false,
            order: 1,
            settings: {
              options: [
                { id: "edu1", label: "ثانوي أو أقل", order: 0 },
                { id: "edu2", label: "بكالوريوس", order: 1 },
                { id: "edu3", label: "ماجستير", order: 2 },
                { id: "edu4", label: "دكتوراه", order: 3 },
              ],
            },
          },
        ],
      },
    ],
  },
  ...additionalTemplates,
];