"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PDFEditorSettings, CustomTextOverlay } from "@/types/pdf-editor";

// Type definitions for responses and components 
interface Participant {
  name?: string;
  email?: string;
  phone?: string;
}

interface SignatureAnswer {
  signatureData?: string;
}

interface Answer {
  componentId: string;
  answer: unknown | SignatureAnswer;
  signatureData?: string;
}

interface Response {
  id: string;
  participant?: Participant;
  answers: Answer[];
  submittedAt?: string;
  completedAt?: string;
}

interface ComponentSettings {
  label?: string;
  questionType?: string;
  maxRating?: number;
  minValue?: number;
  maxValue?: number;
  headerColor?: string;
  fontSize?: number;
  includeSerialNumber?: boolean;
  showHeader?: boolean;
  showTitle?: boolean;
}

interface Component {
  id: string;
  type: string;
  settings?: ComponentSettings;
}

// Custom Table Interface
export interface CustomTable {
  id: string;
  title: string;
  componentIds: string[];
  order: number;
  settings: {
    headerColor?: string;
    fontSize?: number;
    includeSerialNumber?: boolean;
    showHeader?: boolean;
    showTitle?: boolean;
  };
}

// PDF Export Configuration Interface
export interface PDFExportConfig {
  // Layout
  layout: "single-table" | "separate-tables" | "custom-tables";

  // Colors
  backgroundColor: string;
  backgroundImage?: string; // Base64 image data for background
  headerColor: string;
  textColor: string;

  // Font
  fontSize: number;
  fontFamily: string;

  // Logo
  logo?: {
    data: string;
    position: "top-right" | "top-left" | "center";
    size: "small" | "medium" | "large";
  };

  // Content
  includeParticipantName: boolean;
  includeParticipationDate: boolean;
  includeTextAnswers: boolean;
  includeChoices: boolean;
  includeRatings: boolean;

  // Additional Info
  includeEventTitle: boolean;
  includeExportDate: boolean;
  includeParticipantCount: boolean;
  customFooter?: string;

  // Component Selection (for single-table and separate-tables)
  selectedComponentIds?: string[]; // Array of component IDs to include (undefined = all)
  includeSerialNumber?: boolean; // Add serial number column

  // NEW: Custom Tables
  customTables?: CustomTable[];
  useCustomTables?: boolean; // Enable/disable custom tables mode
}

// Default configuration
export const defaultPDFConfig: PDFExportConfig = {
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
  includeEventTitle: true,
  includeExportDate: true,
  includeParticipantCount: true,
  selectedComponentIds: undefined, // undefined = all components
  includeSerialNumber: false,
  customTables: [],
  useCustomTables: false,
};

// Helper function to format answer based on type
export const formatAnswer = (answer: Answer, component: Component, config: PDFExportConfig): string => {
  const questionType = component.settings?.questionType || component.type;
  
  // Skip file uploads (images, PDFs, videos)
  if (["pdf_upload", "image_upload", "video_upload"].includes(component.type)) {
    return "[ملف مرفق - غير مضمن في PDF]";
  }
  
  // Handle signature separately (will be added as image)
  if (component.type === "signature") {
    return "[توقيع - انظر الصورة]";
  }
  
  // Text answers
  if (config.includeTextAnswers && 
      ["short_text", "long_text", "email", "phone", "number", "url"].includes(questionType)) {
    return String(answer.answer || "لا توجد إجابة");
  }
  
  // Choices
  if (config.includeChoices) {
    if (questionType === "single_choice" || questionType === "yes_no" || questionType === "dropdown") {
      return String(answer.answer || "لا توجد إجابة");
    }
    
    if (questionType === "multiple_choice") {
      const choices = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
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
 */
const addCustomTextOverlays = (
  container: HTMLElement,
  overlays: CustomTextOverlay[] | undefined,
  fontFamily: string
): void => {
  if (!overlays || overlays.length === 0) {
    return;
  }

  // Filter visible overlays
  const visibleOverlays = overlays.filter(overlay => overlay.visible !== false);

  if (visibleOverlays.length === 0) {
    return;
  }

  // Sort by zIndex (lower first, so higher zIndex appears on top)
  const sortedOverlays = [...visibleOverlays].sort((a, b) =>
    (a.zIndex || 0) - (b.zIndex || 0)
  );

  sortedOverlays.forEach(overlay => {
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

// Export to PDF - Single Table Layout (with Arabic support using HTML2Canvas)
export const exportSingleTablePDF = async (
  eventTitle: string,
  responses: Response[],
  components: Component[],
  config: PDFExportConfig
) => {
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

  // Prepare table data - filter by selected components if specified (including signature)
  let questionComponents = components.filter(c => c.type === "question" || c.type === "rating" || c.type === "signature");

  // Filter by selected component IDs if specified
  if (config.selectedComponentIds && config.selectedComponentIds.length > 0) {
    questionComponents = questionComponents.filter(c => config.selectedComponentIds!.includes(c.id));
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
  questionComponents.forEach((component) => {
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
  responses.forEach((response, index) => {
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
    questionComponents.forEach((component) => {
      const answer = response.answers.find((a) => a.componentId === component.id);
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
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    });

    // Create PDF
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // A4 landscape dimensions in mm
    const pageWidth = 297;
    const pageHeight = 210;

    // Calculate how the canvas fits into PDF pages
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    // Calculate number of pages needed
    const totalPages = Math.ceil(imgHeight / pageHeight);

    // Add pages to PDF
    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        doc.addPage();
      }

      // Calculate the portion of canvas for this page
      const sourceY = (page * pageHeight * canvas.width) / pageWidth;
      const sourceHeight = Math.min(
        (pageHeight * canvas.width) / pageWidth,
        canvas.height - sourceY
      );

      // Only add page if there's actual content
      if (sourceHeight > 0) {
        // Create temporary canvas for this page
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        const ctx = pageCanvas.getContext("2d");

        if (ctx) {
          // Draw the portion of the original canvas
          ctx.drawImage(
            canvas,
            0, sourceY, canvas.width, sourceHeight,
            0, 0, canvas.width, sourceHeight
          );

          // Convert to image and add to PDF
          const pageImgData = pageCanvas.toDataURL("image/png");
          const pageImgHeight = (sourceHeight * pageWidth) / canvas.width;
          doc.addImage(pageImgData, "PNG", 0, 0, pageWidth, pageImgHeight);
        }
      }
    }

    // Save PDF
    const fileName = `${eventTitle.replace(/\s+/g, "-")}-results-${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};

// Export to PDF - Separate Tables Layout (with Arabic support using HTML2Canvas)
export const exportSeparateTablesPDF = async (
  eventTitle: string,
  responses: Response[],
  components: Component[],
  config: PDFExportConfig
) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  for (let i = 0; i < responses.length; i++) {
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

    // Filter components by selected IDs if specified (including signature)
    let filteredComponents = components.filter(c => c.type === "question" || c.type === "rating" || c.type === "signature");
    if (config.selectedComponentIds && config.selectedComponentIds.length > 0) {
      filteredComponents = filteredComponents.filter(c => config.selectedComponentIds!.includes(c.id));
    }

    // Add rows
    filteredComponents.forEach((component, index) => {
      const answer = response.answers.find((a) => a.componentId === component.id);
      const questionLabel = component.settings?.label || "سؤال";
      const rowBg = index % 2 === 0 ? "#f9fafb" : "white";

      // Handle signature specially - display as image
      let answerContent = "";
      if (component.type === "signature") {
        answerContent = '<span style="color: #94a3b8; font-style: italic;">لا يوجد توقيع</span>';
        if (answer && typeof answer.answer === 'object' && answer.answer !== null) {
          const signatureAnswer = answer.answer as SignatureAnswer;
          const signatureData = signatureAnswer.signatureData;
          if (signatureData) {
            answerContent = `<img src="${signatureData}" style="max-width: 200px; max-height: 80px;" />`;
          }
        }
      } else {
        answerContent = answer ? formatAnswer(answer, component, config) : "لا توجد إجابة";
      }

      htmlContent += `
        <tr style="background-color: ${rowBg};">
          <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: ${config.textColor}; width: 40%;">
            ${questionLabel}
          </td>
          <td style="padding: 12px; border: 1px solid #ddd; color: ${config.textColor}; width: 60%;">
            ${answerContent}
          </td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
    `;

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
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      // A4 portrait dimensions in mm
      const pageWidth = 210;
      const pageHeight = 297;

      // Calculate how the canvas fits into PDF pages
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      // Calculate number of pages needed for this participant
      const totalPages = Math.ceil(imgHeight / pageHeight);

      // Add pages to PDF
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          doc.addPage();
        }

        // Calculate the portion of canvas for this page
        const sourceY = (page * pageHeight * canvas.width) / pageWidth;
        const sourceHeight = Math.min(
          (pageHeight * canvas.width) / pageWidth,
          canvas.height - sourceY
        );

        // Only add page if there's actual content
        if (sourceHeight > 0) {
          // Create temporary canvas for this page
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = sourceHeight;
          const ctx = pageCanvas.getContext("2d");

          if (ctx) {
            // Draw the portion of the original canvas
            ctx.drawImage(
              canvas,
              0, sourceY, canvas.width, sourceHeight,
              0, 0, canvas.width, sourceHeight
            );

            // Convert to image and add to PDF
            const pageImgData = pageCanvas.toDataURL("image/png");
            const pageImgHeight = (sourceHeight * pageWidth) / canvas.width;
            doc.addImage(pageImgData, "PNG", 0, 0, pageWidth, pageImgHeight);
          }
        }
      }
    } finally {
      // Clean up
      document.body.removeChild(container);
    }
  }

  // Save PDF
  const fileName = `${eventTitle.replace(/\s+/g, "-")}-results-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
};

/**
 * Export PDF with Custom Multiple Tables
 * Each table can have different components and settings
 * Uses HTML2Canvas for perfect Arabic text rendering
 * v8.0: Advanced PDF Editor integration with full customization
 */
export const exportCustomTablesPDF = async (
  eventTitle: string,
  responses: Response[],
  components: Component[],
  config: PDFExportConfig,
  editorSettings?: PDFEditorSettings // Optional: Advanced editor settings
) => {
  // Validate custom tables
  if (!config.customTables || config.customTables.length === 0) {
    throw new Error("لا توجد جداول مخصصة للتصدير");
  }

  // Sort tables by order
  const sortedTables = [...config.customTables].sort((a, b) => a.order - b.order);

  // Filter out empty tables
  const validTables = sortedTables.filter(table => table.componentIds.length > 0);

  if (validTables.length === 0) {
    throw new Error("جميع الجداول فارغة. يرجى إضافة مكونات إلى الجداول");
  }

  // Use editor settings if provided, otherwise use defaults
  const orientation = editorSettings?.page.orientation || "landscape";
  const format = editorSettings?.page.size || "a4";

  const doc = new jsPDF({
    orientation: orientation as "landscape" | "portrait",
    unit: "mm",
    format: format as "a4" | "a3" | "letter",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Track current Y position for continuous layout
  // Use editor settings for margins if provided
  const topMargin = editorSettings?.page.margins.top || 5;
  let currentY = topMargin; // Start with top margin
  let isFirstTable = true;

  // Process each table
  for (let tableIndex = 0; tableIndex < validTables.length; tableIndex++) {
    const table = validTables[tableIndex];

    // No automatic page breaks - we'll handle them intelligently based on content height

    // Filter components for this table (including signature)
    const tableComponents = components.filter(c =>
      table.componentIds.includes(c.id) && (c.type === "question" || c.type === "rating" || c.type === "signature")
    );

    // Sort components by the order in table.componentIds
    tableComponents.sort((a, b) => {
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
      const logoPosition = config.logo.position === "top-right" ? "flex-end" :
                          config.logo.position === "top-left" ? "flex-start" : "center";

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
      tableComponents.forEach((component) => {
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
    const zebraStriping = editorSettings?.table.zebraStriping !== undefined
      ? editorSettings.table.zebraStriping
      : true;

    responses.forEach((response, index) => {
      const rowBg = (zebraStriping && index % 2 === 1) ? alternateRowBg : "#ffffff";
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
      tableComponents.forEach((component) => {
        const answer = response.answers.find((a) => a.componentId === component.id);

        // Handle signature component specially - display as image
        if (component.type === "signature") {
          let signatureContent = '<span style="color: #94a3b8; font-style: italic;">لا يوجد توقيع</span>';

          if (answer && typeof answer.answer === 'object' && answer.answer !== null) {
            const signatureAnswer = answer.answer as SignatureAnswer;
            const signatureData = signatureAnswer.signatureData;
            if (signatureData) {
              signatureContent = `<img src="${signatureData}" style="max-width: 120px; max-height: 60px; display: block; margin: 0 auto;" />`;
            }
          }

          htmlContent += `
            <td style="
              padding: ${cellPaddingV}px ${cellPaddingH}px;
              border: none;
              border-bottom: 1px solid #e2e8f0;
              text-align: center;
              vertical-align: middle;
            ">${signatureContent}</td>
          `;
        } else {
          // Regular components - display as text
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
        }
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
      addCustomTextOverlays(
        container,
        editorSettings.customTextOverlays,
        fontFamily
      );
    }

    // Wait a bit for rendering
    await new Promise(resolve => setTimeout(resolve, 300));

    // Calculate dimensions for PDF
    // v8.0: Use editor settings for quality
    const quality = editorSettings?.advanced.quality || "high";
    const qualityScale = quality === "low" ? 1 : quality === "medium" ? 2 : 3;

    let canvas: HTMLCanvasElement;
    try {
      canvas = await html2canvas(container, {
        scale: qualityScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: backgroundColor,
        logging: false,
        width: 3500,
        windowWidth: 3500,
        imageTimeout: 0,
        removeContainer: false,
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
      console.error("Invalid canvas dimensions:", { width: canvas?.width, height: canvas?.height });
      throw new Error(`فشل في إنشاء الجدول ${tableIndex + 1}. أبعاد غير صالحة.`);
    }

    const imgWidth = pageWidth - leftMargin - rightMargin;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

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
      console.error("Invalid position values:", { leftMargin, currentY });
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
