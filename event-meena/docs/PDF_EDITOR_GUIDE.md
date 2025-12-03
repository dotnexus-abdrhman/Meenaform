# 📄 دليل محرر PDF المتقدم

## نظرة عامة

محرر PDF المتقدم هو ميزة شاملة تتيح للمستخدمين تخصيص مظهر وتنسيق ملفات PDF المُصدّرة من نظام إدارة الفعاليات. يوفر المحرر واجهة سهلة الاستخدام مع معاينة مباشرة وإدارة قوالب متقدمة.

## 🎯 الميزات الرئيسية

### 1. **تخصيص شامل**
- إعدادات الصفحة (الاتجاه، الحجم، الهوامش، الخلفية)
- إعدادات الخطوط (النوع، الأحجام، الأوزان)
- إعدادات الألوان (11 لون قابل للتخصيص)
- إعدادات المسافات (الحشو، الهوامش، الفصل)
- إعدادات الجداول (الحدود، الأعمدة، الصفوف المتناوبة)

### 2. **معاينة مباشرة**
- تحديث تلقائي عند تغيير الإعدادات
- 6 مستويات تكبير (50% - 200%)
- وضع ملء الشاشة
- تحديث يدوي

### 3. **إدارة القوالب**
- حفظ القوالب المخصصة
- تحميل القوالب المحفوظة
- استيراد/تصدير القوالب (JSON)
- قوالب جاهزة (Professional، Modern، Minimal)

### 4. **الأداء والجودة**
- 3 مستويات جودة (منخفضة، متوسطة، عالية)
- Debouncing للمعاينة (800ms)
- Memoization للأداء
- Performance monitoring

## 📁 البنية

```
event-meena/
├── components/pdf/
│   ├── controls/
│   │   ├── ColorPicker.tsx       # منتقي الألوان
│   │   ├── SelectControl.tsx     # قائمة منسدلة
│   │   └── SliderControl.tsx     # شريط التمرير
│   ├── settings/
│   │   ├── PageSettings.tsx      # إعدادات الصفحة
│   │   ├── FontSettings.tsx      # إعدادات الخطوط
│   │   ├── ColorSettings.tsx     # إعدادات الألوان
│   │   ├── SpacingSettings.tsx   # إعدادات المسافات
│   │   ├── TableSettings.tsx     # إعدادات الجداول
│   │   └── TemplateSettings.tsx  # إدارة القوالب
│   ├── PDFSettingsPanel.tsx      # اللوحة الرئيسية
│   ├── PDFPreview.tsx            # المعاينة
│   ├── PDFEditorDialog.tsx       # الحوار الرئيسي
│   └── PDFErrorBoundary.tsx      # معالجة الأخطاء
├── contexts/
│   └── PDFEditorContext.tsx      # إدارة الحالة
├── hooks/
│   └── usePDFPreview.ts          # معاينة PDF
├── types/
│   └── pdf-editor.ts             # التعريفات
├── lib/
│   ├── pdf-export.ts             # تصدير PDF
│   ├── pdf-template-validator.ts # التحقق من القوالب
│   ├── pdf-performance.ts        # أدوات الأداء
│   └── pdf-test-utils.ts         # أدوات الاختبار
└── docs/
    └── PDF_EDITOR_GUIDE.md       # هذا الملف
```

## 🚀 الاستخدام

### 1. **فتح المحرر**

```tsx
import { PDFEditorDialog } from '@/components/pdf/PDFEditorDialog';

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  const handleExport = (settings) => {
    // تصدير PDF مع الإعدادات المخصصة
    exportCustomTablesPDF(
      eventTitle,
      responses,
      components,
      config,
      settings // إعدادات المحرر
    );
  };
  
  return (
    <PDFEditorDialog
      open={open}
      onOpenChange={setOpen}
      eventData={eventData}
      onExport={handleExport}
    />
  );
}
```

### 2. **استخدام Context**

```tsx
import { usePDFEditor } from '@/contexts/PDFEditorContext';

function MyComponent() {
  const { 
    state, 
    updatePageSettings,
    updateFontSettings,
    saveTemplate,
    loadTemplate 
  } = usePDFEditor();
  
  // تحديث إعدادات الصفحة
  updatePageSettings({
    orientation: 'landscape',
    size: 'a4',
  });
  
  // حفظ قالب
  saveTemplate('قالبي المخصص', 'وصف القالب');
}
```

### 3. **استيراد/تصدير القوالب**

```tsx
// تصدير قالب
const exportTemplate = () => {
  const dataStr = JSON.stringify(state.currentSettings, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'my-template.json';
  link.click();
};

// استيراد قالب
const importTemplate = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const settings = JSON.parse(e.target?.result as string);
    updateSettings(settings);
  };
  reader.readAsText(file);
};
```

## ⚙️ الإعدادات

### إعدادات الصفحة
```typescript
{
  orientation: 'landscape' | 'portrait',
  size: 'a4' | 'a3' | 'letter' | 'legal',
  margins: { top, right, bottom, left },
  backgroundColor: '#ffffff'
}
```

### إعدادات الخطوط
```typescript
{
  family: 'Arial' | 'Tahoma' | 'Cairo' | 'Amiri',
  sizes: {
    eventTitle: 58,
    tableTitle: 48,
    header: 26,
    content: 24,
    info: 20,
    footer: 18
  },
  weights: {
    eventTitle: 900,
    tableTitle: 900,
    header: 800,
    content: 400
  }
}
```

### إعدادات الألوان
```typescript
{
  primary: '#2563eb',
  secondary: '#64748b',
  text: '#1f2937',
  border: '#dee2e6',
  eventTitleBg: '#2563eb',
  eventTitleText: '#ffffff',
  tableTitleBg: '#2563eb',
  tableTitleText: '#ffffff',
  headerBg: '#2563eb',
  headerText: '#ffffff',
  alternateRowBg: '#f8f9fa'
}
```

## 🔧 التخصيص المتقدم

### إنشاء قالب مخصص

```typescript
import { PDFEditorSettings } from '@/types/pdf-editor';

const myCustomTemplate: PDFEditorSettings = {
  page: {
    orientation: 'landscape',
    size: 'a4',
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    backgroundColor: '#f0f9ff',
  },
  fonts: {
    family: 'Cairo',
    sizes: {
      eventTitle: 64,
      tableTitle: 52,
      header: 28,
      content: 26,
      info: 22,
      footer: 18,
    },
    weights: {
      eventTitle: 900,
      tableTitle: 800,
      header: 700,
      content: 400,
    },
  },
  colors: {
    primary: '#0ea5e9',
    secondary: '#38bdf8',
    text: '#0c4a6e',
    border: '#bae6fd',
    eventTitleBg: '#0ea5e9',
    eventTitleText: '#ffffff',
    tableTitleBg: '#38bdf8',
    tableTitleText: '#ffffff',
    headerBg: '#7dd3fc',
    headerText: '#0c4a6e',
    alternateRowBg: '#e0f2fe',
  },
  // ... باقي الإعدادات
};
```

## 🧪 الاختبار

### استخدام Test Utilities

```typescript
import { 
  SAMPLE_EVENT_DATA,
  SAMPLE_PREVIEW_DATA,
  TEST_SETTINGS_VARIATIONS,
  mockExportPDF 
} from '@/lib/pdf-test-utils';

// اختبار التصدير
const result = await mockExportPDF(
  settings,
  SAMPLE_EVENT_DATA
);

// اختبار إعدادات مختلفة
const darkThemeSettings = {
  ...DEFAULT_PDF_SETTINGS,
  ...TEST_SETTINGS_VARIATIONS.darkTheme
};
```

## 📊 مراقبة الأداء

```typescript
import { performanceMonitor } from '@/lib/pdf-performance';

// بدء القياس
performanceMonitor.start('my-operation');

// ... عملية ما

// إنهاء القياس
performanceMonitor.end('my-operation');

// قياس الذاكرة
performanceMonitor.measureMemory();
```

## 🐛 معالجة الأخطاء

```tsx
import { PDFErrorBoundary } from '@/components/pdf/PDFErrorBoundary';

function App() {
  return (
    <PDFErrorBoundary onReset={() => console.log('Reset')}>
      <PDFEditorDialog {...props} />
    </PDFErrorBoundary>
  );
}
```

## 💡 نصائح وأفضل الممارسات

1. **استخدم القوالب الجاهزة** كنقطة بداية
2. **احفظ القوالب المخصصة** لإعادة استخدامها
3. **استخدم المعاينة** للتحقق من التغييرات قبل التصدير
4. **صدّر القوالب** للمشاركة أو النسخ الاحتياطي
5. **استخدم جودة عالية** للتصدير النهائي
6. **راقب الأداء** في وضع التطوير

## 🔄 التحديثات المستقبلية

- [ ] دعم الصور المخصصة
- [ ] المزيد من القوالب الجاهزة
- [ ] تصدير إلى صيغ أخرى (Word، Excel)
- [ ] معاينة متعددة الصفحات
- [ ] تحرير مباشر في المعاينة

## 📞 الدعم

للمساعدة أو الإبلاغ عن مشاكل، يرجى التواصل مع فريق التطوير.

---

**الإصدار:** 1.0.0  
**التاريخ:** 2025-11-05  
**المطور:** Augment Agent

