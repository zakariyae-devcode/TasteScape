import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "الوصفات", href: "/recipes" },
    { label: "من نحن", href: "/about" },
    { label: "تواصل معنا", href: "/contact" },
  ];

  return (
    <footer
      dir="rtl"
      className="border-t-2 border-amber-800/30 bg-[#f3e1c7] text-stone-900 dark:border-amber-500/30 dark:bg-[#24170f] dark:text-amber-50"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* الأقسام الرئيسية الثلاثة */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 1. هوية المنصة (اليمين) */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-600/50 bg-gradient-to-b from-red-800 via-orange-700 to-amber-700 text-amber-100 shadow-sm dark:from-amber-600 dark:via-orange-700 dark:to-red-900 dark:text-amber-50">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="5.5" r="1.5" fill="currentColor" />
                  <path
                    d="M12 7C8.6 7 6 10.2 6 14H18C18 10.2 15.4 7 12 7Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.5 16.5H19.5C19 18.5 17.2 19.5 12 19.5C6.8 19.5 5 18.5 4.5 16.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-stone-950 dark:text-amber-50">
                  مذاق المغرب
                </span>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  أطباق وتوابل من المطبخ المغربي
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              منصة مغربية تجمع عشاق الطبخ الأصيل لاكتشاف ومشاركة أشهى الوصفات
              التقليدية والعصرية بروح الضيافة المغربية.
            </p>
          </div>

          {/* 2. روابط سريعة (الوسط) */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-red-950 dark:text-amber-300">
              روابط سريعة
            </h3>
            <ul className="space-y-2 text-sm font-bold">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-stone-800 transition hover:text-red-800 dark:text-stone-200 dark:hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. الحساب والتواصل (اليسار) */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-red-950 dark:text-amber-300">
              الحساب والإدارة
            </h3>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <Link
                  href="/login"
                  className="text-stone-800 transition hover:text-red-800 dark:text-stone-200 dark:hover:text-amber-300"
                >
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 text-emerald-950 transition hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  <span className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-300" />
                  <span>فضاء الإدارة</span>
                </Link>
              </li>
            </ul>

            {/* أيقونات تواصل بسيطة */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#"
                aria-label="إنستغرام"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-800/30 bg-white/70 text-xs font-extrabold text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/80 dark:text-amber-200"
              >
                IG
              </a>
              <a
                href="#"
                aria-label="فيسبوك"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-800/30 bg-white/70 text-xs font-extrabold text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/80 dark:text-amber-200"
              >
                FB
              </a>
              <a
                href="#"
                aria-label="يوتيوب"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-800/30 bg-white/70 text-xs font-extrabold text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/80 dark:text-amber-200"
              >
                YT
              </a>
            </div>
          </div>
        </div>

        {/* الشريط السفلي لحقوق النشر */}
        <div className="mt-8 border-t border-amber-800/25 pt-5 text-center text-xs font-bold text-stone-700 dark:border-amber-500/25 dark:text-stone-300">
          © 2026 مذاق المغرب — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}