import * as XLSX from "xlsx";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Excel Export Configuration Interface
export interface ExcelExportConfig {
  // Layout
  layout: "single-sheet" | "separate-sheets";
  
  // Formatting
  headerBackgroundColor: string;
  headerTextColor: string;
  evenRowColor: string;
  oddRowColor: string;
  borderStyle: "none" | "light" | "medium" | "thick";
  fontSize: number;
  
  // Options
  freezeHeader: boolean;
  autoFilter: boolean;
  autoFitColumns: boolean;
  zebraStriping: boolean; // Alternate row colors
  
  // Content - Columns to include
  includeParticipantName: boolean;
  includeParticipantEmail: boolean;
  includeParticipationDate: boolean;
  includeTimeSpent: boolean;
  includeDevice: boolean;
  includeScore: boolean; // For quizzes only
  includeAllQuestions: boolean;
  
  // Additional Info
  includeStatisticsRow: boolean;
  includeSummarySheet: boolean;
  includeEventTitle: boolean;
  includeExportDate: boolean;
  includeParticipantCount: boolean;
  customFooter?: string;
}

// Default configuration
export const defaultExcelConfig: ExcelExportConfig = {
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
  includeParticipantCount: true,
};

// Helper function to convert hex color to Excel color object
const hexToExcelColor = (hex: string): { rgb: string } => {
  const cleanHex = hex.replace("#", "");
  return { rgb: cleanHex.toUpperCase() };
};

// Helper function to format time spent
const formatTimeSpent = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
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
const formatAnswer = (answer: any, component: any): string => {
  if (!answer || !answer.answer) return "لا توجد إجابة";

  const answerValue = answer.answer;

  // Handle different component types
  switch (component.type) {
    case "question":
      if (component.settings.questionType === "single_choice" || 
          component.settings.questionType === "multiple_choice") {
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

// Export to Excel - Single Sheet Layout
export const exportSingleSheetExcel = (
  eventTitle: string,
  responses: any[],
  components: any[],
  config: ExcelExportConfig
) => {
  const workbook = XLSX.utils.book_new();
  
  // Prepare data array
  const data: any[][] = [];
  
  // Add event info rows if enabled
  let headerRowIndex = 0;
  
  if (config.includeEventTitle) {
    data.push([eventTitle]);
    headerRowIndex++;
  }
  
  if (config.includeExportDate) {
    data.push([`تاريخ التصدير: ${format(new Date(), "PPP", { locale: ar })}`]);
    headerRowIndex++;
  }
  
  if (config.includeParticipantCount) {
    data.push([`عدد المشاركين: ${responses.length}`]);
    headerRowIndex++;
  }
  
  // Add empty row if we added info
  if (headerRowIndex > 0) {
    data.push([]);
    headerRowIndex++;
  }
  
  // Build header row
  const headers: string[] = [];
  
  if (config.includeParticipantName) headers.push("اسم المشارك");
  if (config.includeParticipantEmail) headers.push("البريد الإلكتروني");
  if (config.includeParticipationDate) headers.push("تاريخ المشاركة");
  if (config.includeTimeSpent) headers.push("الوقت المستغرق");
  if (config.includeDevice) headers.push("الجهاز");
  if (config.includeScore) headers.push("النتيجة");
  
  // Add question headers
  const questionComponents = components.filter(
    c => config.includeAllQuestions && (c.type === "question" || c.type === "rating")
  );
  
  questionComponents.forEach(component => {
    const label = component.settings?.label || "سؤال";
    headers.push(label);
  });
  
  data.push(headers);
  
  // Add data rows
  responses.forEach(response => {
    const row: any[] = [];
    
    if (config.includeParticipantName) {
      row.push(response.participant?.name || "مشارك مجهول");
    }
    if (config.includeParticipantEmail) {
      row.push(response.participant?.email || "");
    }
    if (config.includeParticipationDate) {
      const date = response.completedAt || response.startedAt;
      row.push(date ? format(new Date(date), "PPP", { locale: ar }) : "");
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
    questionComponents.forEach(component => {
      const answer = response.answers.find((a: any) => a.componentId === component.id);
      row.push(formatAnswer(answer, component));
    });
    
    data.push(row);
  });
  
  // Add statistics row if enabled
  if (config.includeStatisticsRow && responses.length > 0) {
    data.push([]); // Empty row
    const statsRow: any[] = ["الإحصائيات"];
    
    // Add empty cells for other columns
    for (let i = 1; i < headers.length; i++) {
      statsRow.push("");
    }
    
    data.push(statsRow);
  }
  
  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  
  // Apply styling (basic - XLSX has limited styling support)
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  
  // Set column widths
  if (config.autoFitColumns) {
    const colWidths = headers.map((header, i) => {
      const maxLength = Math.max(
        header.length,
        ...data.slice(headerRowIndex + 1).map(row => String(row[i] || "").length)
      );
      return { wch: Math.min(maxLength + 2, 50) };
    });
    worksheet['!cols'] = colWidths;
  }
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "النتائج");
  
  // Add summary sheet if enabled
  if (config.includeSummarySheet) {
    const summaryData = [
      ["ملخص النتائج"],
      [],
      ["عنوان الحدث", eventTitle],
      ["عدد المشاركين", responses.length],
      ["تاريخ التصدير", format(new Date(), "PPP", { locale: ar })],
    ];
    
    if (config.includeScore && responses.some(r => r.score)) {
      const scores = responses.filter(r => r.score).map(r => r.score.totalScore);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      
      summaryData.push(
        [],
        ["إحصائيات النتائج"],
        ["متوسط الدرجات", avgScore.toFixed(2)],
        ["أعلى درجة", maxScore],
        ["أقل درجة", minScore]
      );
    }
    
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "الملخص");
  }
  
  // Generate file and download
  const fileName = `${eventTitle.replace(/\s+/g, "-")}-results-${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

// Export to Excel - Separate Sheets Layout
export const exportSeparateSheetsExcel = (
  eventTitle: string,
  responses: any[],
  components: any[],
  config: ExcelExportConfig
) => {
  const workbook = XLSX.utils.book_new();
  
  responses.forEach((response, index) => {
    const data: any[][] = [];
    
    // Add participant info
    if (config.includeEventTitle) {
      data.push([eventTitle]);
    }
    
    if (config.includeParticipantName) {
      data.push([`المشارك: ${response.participant?.name || "مشارك مجهول"}`]);
    }
    
    if (config.includeParticipationDate) {
      const date = response.completedAt || response.startedAt;
      data.push([`التاريخ: ${date ? format(new Date(date), "PPP", { locale: ar }) : ""}`]);
    }
    
    data.push([]); // Empty row
    
    // Add questions and answers
    data.push(["السؤال", "الإجابة"]);
    
    const questionComponents = components.filter(
      c => config.includeAllQuestions && (c.type === "question" || c.type === "rating")
    );
    
    questionComponents.forEach(component => {
      const label = component.settings?.label || "سؤال";
      const answer = response.answers.find((a: any) => a.componentId === component.id);
      data.push([label, formatAnswer(answer, component)]);
    });
    
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    if (config.autoFitColumns) {
      worksheet['!cols'] = [
        { wch: 40 }, // Question column
        { wch: 60 }  // Answer column
      ];
    }
    
    // Add worksheet
    const sheetName = `مشارك ${index + 1}`;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });
  
  // Generate file and download
  const fileName = `${eventTitle.replace(/\s+/g, "-")}-results-${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

