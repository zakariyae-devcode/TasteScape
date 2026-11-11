# 🍳 TasteScape

[English](#english) | [العربية](#arabic)

---

<a name="english"></a>
## 🌐 English

**TasteScape** is a modern, full-stack recipe management platform designed for food enthusiasts to discover, create, share, and organize culinary creations. Built with performance and scalability in mind, the platform integrates a responsive **Next.js** frontend with a robust **Express.js** and **MongoDB** backend.

### 🚀 Key Features

* **🔐 User Authentication:** Secure JWT-based registration, login, and session management.
* **📖 Dynamic Recipe Creation:** Multi-section ingredient inputs, step-by-step instructions, and metadata management.
* **🖼️ Image Uploads:** Seamless media handling for high-quality dish photography via Cloudinary / Multer.
* **🔍 Search, Categories & Filtering:** Instant recipe discovery by kitchen type, dietary preferences, or ingredient lists.
* **⭐ Rating & Favorites:** Interactive user feedback, average rating computations, and personalized bookmarks.
* **📱 Fully Responsive UI:** Mobile-first user interface tailored for seamless kitchen usage.

### 🛠️ Tech Stack

#### **Frontend**
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **State & Data Fetching:** Axios / React Query (SWR)

#### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Authentication:** JSON Web Tokens (JWT) & bcrypt
* **File Storage:** Multer / Cloudinary

### 📁 Project Structure

```
TasteScape/
├── client/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/            # Next.js App Router / Pages
│   │   ├── components/     # Reusable UI Components
│   │   ├── services/       # API call handlers
│   │   └── utils/          # Helper functions & state management
│   └── public/             # Static Assets
│
└── server/                 # Express.js Backend Application
    ├── config/             # DB and Environment Setup
    ├── controllers/        # Business Logic & Controllers
    ├── middlewares/        # Auth, Validation & Upload Middlewares
    ├── models/             # MongoDB Schemas (User, Recipe)
    ├── routes/             # API Endpoints (/auth, /recipes)
    └── server.js           # Server Entry Point
```

### ⚡ Quick Start

#### **Prerequisites**
* Node.js (v18 or higher)
* MongoDB Instance (Local or MongoDB Atlas)
* npm or yarn package manager

#### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/TasteScape.git
cd TasteScape
```

#### **2. Setup & Run Backend**
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_URL=your_cloudinary_url
```

Start the server:
```bash
npm run dev
```

#### **3. Setup & Run Frontend**
```bash
cd ../client
npm install
```

Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the Next.js development server:
```bash
npm run dev
```

### 📌 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Authenticate user & get token | Public |
| **GET** | `/api/recipes` | Fetch recipes with search & filters | Public |
| **GET** | `/api/recipes/:id` | Fetch detailed single recipe | Public |
| **POST** | `/api/recipes` | Create recipe (with image upload) | Private |
| **PUT** | `/api/recipes/:id` | Update existing recipe | Private (Owner) |
| **DELETE** | `/api/recipes/:id` | Delete recipe | Private (Owner) |
| **POST** | `/api/recipes/:id/favorite` | Toggle recipe bookmark | Private |
| **POST** | `/api/recipes/:id/rate` | Submit rating & update average | Private |

---

<a name="arabic"></a>
## 🌐 العربية

**TasteScape** (تَايْسْتْ سْكِيبْ) هي منصة متكاملة حديثة لإدارة الوصفات، مصممة لعشاق الطهي لاكتشاف، إنشاء، مشاركة، وتنظيم الوجبات والوصفات. تم بناء المنصة مع التركيز على الأداء العالي والموثوقية، حيث تجمع بين واجهة أمامية تفاعلية باستخدام **Next.js** وخلفية برمجية قوية باستخدام **Express.js** و **MongoDB**.

### 🚀 المميزات الرئيسية

* **🔐 نظام مصادقة آمن:** تسجيل الحساب وتسجيل الدخول وتشفير كلسات المستخدم برمز (JWT).
* **📖 إنشاء ديناميكي للوصفات:** إضافة المكونات مقسمة، خطوات التحضير المتسلسلة، والمعلومات الأساسية للوجبة.
* **🖼️ رفع الصور:** معالجة ورفع صور الأطباق عالية الجودة عبر Cloudinary / Multer.
* **🔍 البحث، التصنيفات والفلترة:** استكشاف سريع للوصفات حسب نوع المطبخ، التفضيلات الغذائية، أو المكونات.
* **⭐ التقييمات والمفضلة:** تفاعل المستخدمين بالتقييم، حساب متوسط النجوم، وحفظ الوصفات في المفضلة الشخصية.
* **📱 واجهة متجاوبة بالكامل:** تصميم مخصص يعطي الأولوية للهواتف الذكية لسهولة الاستخدام أثناء الطهي.

### 🛠️ التقنيات المستخدمة

#### **الواجهة الأمامية (Frontend)**
* **إطار العمل:** Next.js (React)
* **التنسيق والتصميم:** Tailwind CSS
* **إدارة البيانات وطلبات الـ API:** Axios / React Query (SWR)

#### **الواجهة الخلفية (Backend)**
* **بيئة التشغيل:** Node.js
* **إطار العمل:** Express.js
* **قاعدة البيانات:** MongoDB (مكتبة Mongoose ORM)
* **المصادقة والتشفير:** JSON Web Tokens (JWT) & bcrypt
* **تخزين الملفات والصور:** Multer / Cloudinary

### 📁 هيكل المشروع

```
TasteScape/
├── client/                 # تطبيق الواجهة الأمامية (Next.js)
│   ├── src/
│   │   ├── app/            # صفحات ومسارات التطبيق
│   │   ├── components/     # عناصر الواجهة المباشرة
│   │   ├── services/       # ملفات الاتصال بالخلفية API
│   │   └── utils/          # وظائف مساعدة وإدارة الحالة
│   └── public/             # الملفات والصور الثابتة
│
└── server/                 # تطبيق الواجهة الخلفية (Express.js)
    ├── config/             # إعدادات البيئة وقاعدة البيانات
    ├── controllers/        # منطق المعالجة والأوامر
    ├── middlewares/        # البرمجيات الوسيطة (الحماية ورفع الصور)
    ├── models/             # نماذج قاعدة البيانات (المستخدم والوصفات)
    ├── routes/             # مسارات الـ API (/auth, /recipes)
    └── server.js           # ملف تشغيل الخادم الرئيسي
```

### ⚡ التشغيل السريع

#### **المتطلبات الأساسية**
* Node.js (إصدار 18 أو أحدث)
* قاعدة بيانات MongoDB (محلية أو عبر MongoDB Atlas)
* مدير الحزم npm أو yarn

#### **1. نسخ المستودع (Clone)**
```bash
git clone https://github.com/your-username/TasteScape.git
cd TasteScape
```

#### **2. إعداد وتشغيل الواجهة الخلفية (Backend)**
```bash
cd server
npm install
```

قم بإنشاء ملف `.env` داخل مجلد `server`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_URL=your_cloudinary_url
```

تشغيل خادم التطوير:
```bash
npm run dev
```

#### **3. إعداد وتشغيل الواجهة الأمامية (Frontend)**
```bash
cd ../client
npm install
```

قم بإنشاء ملف `.env.local` داخل مجلد `client`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

تشغيل تطبيق Next.js:
```bash
npm run dev
```

---

## 📄 License / الترخيص

Distributed under the MIT License. See `LICENSE` for more information.
