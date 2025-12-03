// lib/grading.ts
// نظام حساب الدرجات والتصحيح التلقائي

import { Event } from "@/types/event";
import { ComponentAnswer, ResponseScore } from "@/types/response";

/**
 * حساب درجة الاختبار بناءً على الإجابات
 */
export function calculateScore(
  event: Event,
  answers: ComponentAnswer[]
): ResponseScore {
  let totalPoints = 0;
  let earnedPoints = 0;
  let correctAnswersCount = 0;
  let totalQuestionsWithGrading = 0;

  // المرور على جميع الأقسام والمكونات
  event.sections.forEach((section) => {
    section.components.forEach((component) => {
      const settings = component.settings as any;

      // تحقق من وجود تصحيح تلقائي (points محددة)
      if (settings.points !== undefined && settings.points > 0) {
        totalQuestionsWithGrading++;
        totalPoints += settings.points;

        // البحث عن إجابة المشارك لهذا المكون
        const answer = answers.find((a) => a.componentId === component.id);

        if (answer) {
          // تحقق من صحة الإجابة بناءً على نوع السؤال
          const isCorrect = checkAnswer(
            settings.questionType,
            answer.answer,
            settings.correctAnswer
          );

          if (isCorrect) {
            earnedPoints += settings.points;
            correctAnswersCount++;
          }

          // تحديث معلومات الإجابة
          answer.isCorrect = isCorrect;
          answer.pointsEarned = isCorrect ? settings.points : 0;
        }
      }
    });
  });

  // حساب النسبة المئوية
  const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

  // تحديد حالة النجاح (يمكن تخصيصها لاحقاً)
  const passed = percentage >= 50; // النجاح إذا كانت النسبة 50% أو أكثر

  // تحديد الدرجة (Grade)
  const grade = getGrade(percentage);

  return {
    totalPoints,
    earnedPoints,
    percentage: Math.round(percentage * 100) / 100, // تقريب لرقمين عشريين
    grade,
    passed,
  };
}

/**
 * التحقق من صحة الإجابة بناءً على نوع السؤال
 */
function checkAnswer(
  questionType: string,
  userAnswer: any,
  correctAnswer: any
): boolean {
  if (!correctAnswer || userAnswer === undefined || userAnswer === null) {
    return false;
  }

  switch (questionType) {
    case "single_choice":
    case "yes_no":
      // مقارنة مباشرة
      return String(userAnswer).toLowerCase() === String(correctAnswer).toLowerCase();

    case "multiple_choice":
      // مقارنة المصفوفات
      if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) {
        return false;
      }
      // يجب أن تكون نفس الطول ونفس العناصر
      if (userAnswer.length !== correctAnswer.length) {
        return false;
      }
      // ترتيب المصفوفات ومقارنتها
      const sortedUser = [...userAnswer].sort();
      const sortedCorrect = [...correctAnswer].sort();
      return sortedUser.every((val, idx) => 
        String(val).toLowerCase() === String(sortedCorrect[idx]).toLowerCase()
      );

    case "short_text":
    case "long_text":
      // مقارنة النصوص (case-insensitive وإزالة المسافات الزائدة)
      const userText = String(userAnswer).trim().toLowerCase();
      const correctText = String(correctAnswer).trim().toLowerCase();
      return userText === correctText;

    case "number":
      // مقارنة الأرقام
      return Number(userAnswer) === Number(correctAnswer);

    default:
      return false;
  }
}

/**
 * تحديد الدرجة (Grade) بناءً على النسبة المئوية
 */
function getGrade(percentage: number): string {
  if (percentage >= 95) return "A+";
  if (percentage >= 90) return "A";
  if (percentage >= 85) return "B+";
  if (percentage >= 80) return "B";
  if (percentage >= 75) return "C+";
  if (percentage >= 70) return "C";
  if (percentage >= 65) return "D+";
  if (percentage >= 60) return "D";
  if (percentage >= 50) return "E";
  return "F";
}

/**
 * الحصول على رسالة بناءً على النسبة المئوية
 */
export function getScoreMessage(percentage: number): {
  title: string;
  message: string;
  emoji: string;
} {
  if (percentage >= 95) {
    return {
      title: "ممتاز جداً! 🌟",
      message: "أداء رائع! لقد حققت نتيجة استثنائية.",
      emoji: "🎉",
    };
  }
  if (percentage >= 85) {
    return {
      title: "ممتاز! 🎯",
      message: "أداء رائع! استمر في التميز.",
      emoji: "✨",
    };
  }
  if (percentage >= 75) {
    return {
      title: "جيد جداً! 👏",
      message: "أداء جيد! أنت على الطريق الصحيح.",
      emoji: "💪",
    };
  }
  if (percentage >= 65) {
    return {
      title: "جيد! 👍",
      message: "أداء مقبول، يمكنك تحسينه أكثر.",
      emoji: "📈",
    };
  }
  if (percentage >= 50) {
    return {
      title: "مقبول 📝",
      message: "لقد نجحت، لكن هناك مجال للتحسين.",
      emoji: "💡",
    };
  }
  return {
    title: "يحتاج إلى تحسين 📚",
    message: "لا تقلق، يمكنك المحاولة مرة أخرى والتحسن.",
    emoji: "🔄",
  };
}

/**
 * حساب إحصائيات تفصيلية للاختبار
 */
export function calculateDetailedStats(
  event: Event,
  answers: ComponentAnswer[]
): {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
} {
  let totalQuestions = 0;
  let answeredQuestions = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  event.sections.forEach((section) => {
    section.components.forEach((component) => {
      const settings = component.settings as any;

      // عد الأسئلة التي لها تصحيح تلقائي فقط
      if (settings.points !== undefined && settings.points > 0) {
        totalQuestions++;

        const answer = answers.find((a) => a.componentId === component.id);

        if (answer && answer.answer !== undefined && answer.answer !== null && answer.answer !== "") {
          answeredQuestions++;

          if (answer.isCorrect) {
            correctAnswers++;
          } else {
            incorrectAnswers++;
          }
        }
      }
    });
  });

  const skippedQuestions = totalQuestions - answeredQuestions;

  return {
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    incorrectAnswers,
    skippedQuestions,
  };
}

