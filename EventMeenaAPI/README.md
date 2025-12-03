# 🎉 EventMeena API

<div dir="rtl">

## 📋 نظرة عامة

**EventMeena** هي منصة عربية متكاملة لإنشاء وإدارة الفعاليات التفاعلية، تشمل:
- 📊 **الاستبيانات** (Surveys)
- ❓ **الاختبارات** (Quizzes)
- 📝 **النماذج** (Forms)
- 🎪 **الفعاليات** (Events)

## 🏗️ هيكل المشروع (Clean Architecture)

```
EventMeenaAPI/
├── src/
│   ├── EventMeena.Domain/          # الكيانات والقيم
│   ├── EventMeena.Application/     # منطق الأعمال والخدمات
│   ├── EventMeena.Infrastructure/  # قاعدة البيانات والخدمات الخارجية
│   └── EventMeena.API/             # Controllers و Endpoints
```

## 🛠️ التقنيات المستخدمة

| التقنية | الإصدار | الوصف |
|---------|--------|-------|
| .NET | 9.0 | إطار العمل الأساسي |
| Entity Framework Core | 8.0 | ORM لقاعدة البيانات |
| SQL Server | - | قاعدة البيانات |
| JWT Bearer | 8.0 | المصادقة |
| AutoMapper | 12.0 | تحويل الكائنات |
| FluentValidation | 11.9 | التحقق من البيانات |
| SendGrid | 9.29 | خدمة البريد الإلكتروني |
| Swagger/OpenAPI | 6.5 | توثيق الـ API |

## 🚀 البدء السريع

### المتطلبات
- .NET 9.0 SDK
- SQL Server (أو LocalDB)
- Visual Studio 2022 / VS Code

### الخطوات

1. **استنساخ المشروع:**
```bash
git clone https://github.com/your-repo/EventMeenaAPI.git
cd EventMeenaAPI
```

2. **تحديث Connection String:**
```json
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=EventMeenaDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

3. **تطبيق الـ Migrations:**
```bash
dotnet ef database update --project src/EventMeena.Infrastructure --startup-project src/EventMeena.API
```

4. **تشغيل المشروع:**
```bash
dotnet run --project src/EventMeena.API
```

5. **فتح Swagger:**
```
https://localhost:5001/swagger
```

## 🔐 المصادقة (JWT Authentication)

### التسجيل
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "SecurePass123!"
}
```

### تسجيل الدخول
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "SecurePass123!"
}
```

**الرد:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "a1b2c3d4...",
    "expiresAt": "2024-01-15T12:00:00Z",
    "user": {
      "id": "...",
      "fullName": "أحمد محمد",
      "email": "ahmed@example.com"
    }
  }
}
```

### استخدام التوكن
```http
GET /api/events
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## 📡 نقاط النهاية (API Endpoints)

### 🔑 Auth (المصادقة)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| POST | `/api/auth/register` | تسجيل مستخدم جديد |
| POST | `/api/auth/login` | تسجيل الدخول |
| POST | `/api/auth/refresh-token` | تجديد التوكن |
| GET | `/api/auth/me` | بيانات المستخدم الحالي |

### 📅 Events (الفعاليات)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/events` | جميع فعاليات المستخدم |
| GET | `/api/events/{id}` | فعالية محددة |
| POST | `/api/events` | إنشاء فعالية جديدة |
| PUT | `/api/events/{id}` | تحديث فعالية |
| DELETE | `/api/events/{id}` | حذف فعالية |
| POST | `/api/events/{id}/publish` | نشر فعالية |
| POST | `/api/events/{id}/close` | إغلاق فعالية |

### 📑 Sections (الأقسام)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/sections/event/{eventId}` | أقسام فعالية |
| POST | `/api/sections` | إنشاء قسم |
| PUT | `/api/sections/{id}` | تحديث قسم |
| DELETE | `/api/sections/{id}` | حذف قسم |

### 🧩 Components (المكونات)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/components/section/{sectionId}` | مكونات قسم |
| POST | `/api/components` | إنشاء مكون |
| PUT | `/api/components/{id}` | تحديث مكون |
| DELETE | `/api/components/{id}` | حذف مكون |

### 👥 Contacts (جهات الاتصال)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/contacts` | جميع جهات الاتصال |
| POST | `/api/contacts` | إضافة جهة اتصال |
| PUT | `/api/contacts/{id}` | تحديث جهة اتصال |
| DELETE | `/api/contacts/{id}` | حذف جهة اتصال |

### 👨‍👩‍👧‍👦 Groups (المجموعات)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/groups` | جميع المجموعات |
| POST | `/api/groups` | إنشاء مجموعة |
| POST | `/api/groups/{id}/contacts` | إضافة جهات اتصال |

### 📊 Responses (الردود)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/responses/event/{eventId}` | ردود فعالية |
| GET | `/api/responses/event/{eventId}/stats` | إحصائيات الردود |
| POST | `/api/responses/start/{eventId}` | بدء الرد |
| POST | `/api/responses/{id}/submit` | إرسال إجابات |

### 📋 Templates (القوالب)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/templates` | قوالب المستخدم |
| GET | `/api/templates/public` | القوالب العامة |
| POST | `/api/templates` | إنشاء قالب |
| POST | `/api/templates/from-event/{eventId}` | إنشاء قالب من فعالية |

### 🌐 Public (عام - بدون مصادقة)
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/public/event/{shareCode}` | الفعالية برمز المشاركة |
| POST | `/api/public/event/{shareCode}/view` | تسجيل مشاهدة |
| GET | `/api/public/health` | حالة الـ API |

</div>

## ⚙️ إعدادات التكوين (appsettings.json)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=EventMeenaDB;..."
  },
  "JwtSettings": {
    "SecretKey": "your-secret-key-min-32-chars",
    "Issuer": "EventMeenaAPI",
    "Audience": "EventMeenaClient",
    "AccessTokenExpirationMinutes": 60,
    "RefreshTokenExpirationDays": 7
  },
  "EmailSettings": {
    "SendGridApiKey": "your-sendgrid-api-key",
    "FromEmail": "noreply@eventmeena.com",
    "FromName": "Event Meena"
  },
  "FrontendUrl": "http://localhost:3000"
}
```

## 📝 License

MIT License - راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

<div align="center">
  صنع بـ ❤️ بواسطة فريق Event Meena
</div>

