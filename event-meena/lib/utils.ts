import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * تحويل تاريخ من Backend إلى Date object
 * الـ Backend يُرسل DateTime بتوقيت UTC لكن بدون "Z" suffix
 * هذه الدالة تضيف "Z" إذا لم تكن موجودة لضمان التحويل الصحيح
 */
export function parseBackendDate(dateString: string): Date {
  if (!dateString) return new Date();
  // إذا كان التاريخ بدون timezone indicator، نفترض أنه UTC
  const normalized = dateString.endsWith("Z") ? dateString : dateString + "Z";
  return new Date(normalized);
}
