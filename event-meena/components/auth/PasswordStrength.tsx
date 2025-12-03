"use client";

import { PasswordStrength as PasswordStrengthType } from "@/types/auth";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

// المتطلبات الإجبارية (متوافقة مع Backend)
interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean; // اختياري لكن يعزز القوة
}

// التحقق من متطلبات كلمة المرور
const checkRequirements = (password: string): PasswordRequirements => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
};

// حساب قوة كلمة المرور
const calculatePasswordStrength = (password: string): {
  strength: PasswordStrengthType;
  score: number;
  feedback: string;
  requirements: PasswordRequirements;
  meetsMinimum: boolean;
} => {
  if (!password) {
    return {
      strength: "weak",
      score: 0,
      feedback: "",
      requirements: checkRequirements(""),
      meetsMinimum: false
    };
  }

  const requirements = checkRequirements(password);

  // المتطلبات الإجبارية للـ Backend
  const meetsMinimum =
    requirements.minLength &&
    requirements.hasUppercase &&
    requirements.hasLowercase &&
    requirements.hasNumber;

  let score = 0;

  // الطول
  if (requirements.minLength) score++;
  if (password.length >= 12) score++;

  // المتطلبات الإجبارية
  if (requirements.hasLowercase) score++;
  if (requirements.hasUppercase) score++;
  if (requirements.hasNumber) score++;

  // رموز خاصة (اختياري)
  if (requirements.hasSpecial) score++;

  // تحديد القوة - لا يمكن أن تكون "قوية" إذا لم تستوفِ المتطلبات الإجبارية
  let strength: PasswordStrengthType;
  let feedback: string;

  if (!meetsMinimum) {
    // لا تستوفي المتطلبات الإجبارية = ضعيفة أو متوسطة فقط
    if (score <= 2) {
      strength = "weak";
      feedback = "ضعيفة";
    } else {
      strength = "medium";
      feedback = "متوسطة - أكمل المتطلبات";
    }
  } else {
    // تستوفي المتطلبات الإجبارية
    if (score <= 3) {
      strength = "medium";
      feedback = "متوسطة";
    } else if (score <= 4) {
      strength = "strong";
      feedback = "قوية";
    } else {
      strength = "very-strong";
      feedback = "قوية جداً";
    }
  }

  return { strength, score, feedback, requirements, meetsMinimum };
};

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { strength, score, feedback, requirements, meetsMinimum } = calculatePasswordStrength(password);

  if (!password) return null;

  // الألوان حسب القوة
  const colors = {
    weak: "bg-red-500",
    medium: "bg-orange-500",
    strong: "bg-green-500",
    "very-strong": "bg-blue-600",
  };

  const textColors = {
    weak: "text-red-600",
    medium: "text-orange-600",
    strong: "text-green-600",
    "very-strong": "text-blue-700",
  };

  // عدد الأعمدة المملوءة (من 4)
  const filledBars = Math.ceil((score / 6) * 4);

  // قائمة المتطلبات مع حالتها
  const requirementsList = [
    { key: "minLength", label: "8 أحرف على الأقل", met: requirements.minLength, required: true },
    { key: "hasUppercase", label: "حرف كبير (A-Z)", met: requirements.hasUppercase, required: true },
    { key: "hasLowercase", label: "حرف صغير (a-z)", met: requirements.hasLowercase, required: true },
    { key: "hasNumber", label: "رقم (0-9)", met: requirements.hasNumber, required: true },
    { key: "hasSpecial", label: "رمز خاص (!@#$)", met: requirements.hasSpecial, required: false },
  ];

  return (
    <div className="space-y-2 mt-2">
      {/* شريط القوة */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              bar <= filledBars ? colors[strength] : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* النص */}
      <p className={`text-xs font-medium ${textColors[strength]}`}>
        قوة كلمة المرور: {feedback}
      </p>

      {/* قائمة المتطلبات - تظهر دائماً إذا لم تستوفِ الحد الأدنى */}
      {!meetsMinimum && (
        <ul className="text-xs space-y-1 mt-2 bg-gray-50 p-2 rounded-lg">
          {requirementsList.filter(r => r.required).map((req) => (
            <li
              key={req.key}
              className={`flex items-center gap-1.5 ${req.met ? "text-green-600" : "text-gray-600"}`}
            >
              {req.met ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <X className="w-3.5 h-3.5 text-red-400" />
              )}
              <span>{req.label}</span>
              {!req.met && <span className="text-red-500 text-[10px]">(مطلوب)</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

