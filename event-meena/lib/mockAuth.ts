// Mock Authentication API
// محاكاة API المصادقة (بدون Backend)

import { LoginData, SignupData, AuthResponse, User } from "@/types/auth";

// تأخير لمحاكاة استدعاء API حقيقي
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// مفتاح LocalStorage
const USERS_KEY = "event_meena_users";
const CURRENT_USER_KEY = "event_meena_current_user";
const TOKEN_KEY = "event_meena_token";

// الحصول على جميع المستخدمين من LocalStorage
const getUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// حفظ المستخدمين في LocalStorage
const saveUsers = (users: User[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// حفظ المستخدم الحالي
const saveCurrentUser = (user: User, token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

// الحصول على المستخدم الحالي
export const getCurrentUser = (): { user: User; token: string } | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (user && token) {
    return { user: JSON.parse(user), token };
  }
  return null;
};

// مسح بيانات المستخدم الحالي
export const clearCurrentUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

// تسجيل الدخول
export const mockLogin = async (data: LoginData): Promise<AuthResponse> => {
  // محاكاة تأخير الشبكة
  await delay(1000);

  const users = getUsers();
  
  // البحث عن المستخدم
  const user = users.find((u) => u.email === data.email);
  
  if (!user) {
    throw new Error("البريد الإلكتروني غير مسجل");
  }

  // في الواقع، يجب التحقق من كلمة المرور المشفرة
  // لكن هنا نستخدم mock بسيط
  // نفترض أن كلمة المرور صحيحة إذا كان المستخدم موجود
  
  // توليد Token وهمي
  const token = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // حفظ المستخدم الحالي
  saveCurrentUser(user, token);

  return {
    success: true,
    user,
    token,
    message: "تم تسجيل الدخول بنجاح",
  };
};

// إنشاء حساب جديد
export const mockSignup = async (data: SignupData): Promise<AuthResponse> => {
  // محاكاة تأخير الشبكة
  await delay(1200);

  const users = getUsers();
  
  // التحقق من وجود البريد الإلكتروني
  const existingUser = users.find((u) => u.email === data.email);

  if (existingUser) {
    throw new Error("البريد الإلكتروني مسجل بالفعل");
  }

  // التحقق من وجود رقم الجوال
  const existingPhone = users.find((u) => u.phone === data.phone);

  if (existingPhone) {
    throw new Error("رقم الجوال مسجل بالفعل");
  }

  // إنشاء مستخدم جديد
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone, // ← إضافة رقم الجوال
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=1a56db&color=fff&size=200`,
    createdAt: new Date().toISOString(),
  };

  // إضافة المستخدم للقائمة
  users.push(newUser);
  saveUsers(users);

  // توليد Token
  const token = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // حفظ المستخدم الحالي
  saveCurrentUser(newUser, token);

  return {
    success: true,
    user: newUser,
    token,
    message: "تم إنشاء الحساب بنجاح",
  };
};

// تسجيل الخروج
export const mockLogout = async (): Promise<void> => {
  await delay(300);
  clearCurrentUser();
};

// التحقق من صحة Token
export const mockVerifyToken = async (token: string): Promise<User | null> => {
  await delay(500);
  
  const currentUser = getCurrentUser();
  
  if (currentUser && currentUser.token === token) {
    return currentUser.user;
  }
  
  return null;
};

// إضافة مستخدم تجريبي افتراضي (للاختبار)
export const initializeMockData = () => {
  if (typeof window === "undefined") return;
  
  const users = getUsers();
  
  // إذا لم يكن هناك مستخدمين، أضف مستخدم تجريبي
  if (users.length === 0) {
    const testUser: User = {
      id: "test-user-1",
      name: "محمد أحمد",
      email: "test@eventmeena.com",
      phone: "0501234567", // ← إضافة رقم الجوال
      avatar: "https://ui-avatars.com/api/?name=محمد+أحمد&background=1a56db&color=fff&size=200",
      createdAt: new Date().toISOString(),
    };

    saveUsers([testUser]);
  }
};

