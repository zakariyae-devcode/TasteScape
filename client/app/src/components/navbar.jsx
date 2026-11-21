"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("tastescape-theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setDarkMode(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("tastescape-theme", nextDark ? "dark" : "light");
  };

  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "الوصفات", href: "/recipes" },
    { label: "من نحن", href: "/about" },
    { label: "تواصل معنا", href: "/contact" },
  ];

  const linkClass = (href) => {
    const isActive = pathname === href;
    return `px-3.5 py-2 text-sm font-bold transition-all duration-200 border-b-2 ${
      isActive
        ? "border-red-800 text-red-950 dark:border-amber-400 dark:text-amber-300"
        : "border-transparent text-stone-800 hover:border-amber-700/60 hover:text-red-900 dark:text-stone-200 dark:hover:border-amber-400/50 dark:hover:text-amber-300"
    }`;
  };

  const adminBtnClass = () => {
    const isActive = pathname === "/admin";
    return `flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
      isActive
        ? "border-emerald-700 bg-emerald-800 text-amber-50 shadow-sm dark:border-emerald-400 dark:bg-emerald-600 dark:text-stone-950"
        : "border-emerald-800/40 bg-emerald-900/10 text-emerald-950 hover:border-emerald-700/70 hover:bg-emerald-900/20 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
    }`;
  };

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b-2 border-amber-800/30 bg-[#f3e1c7]/95 shadow-sm backdrop-blur-md dark:border-amber-500/30 dark:bg-[#24170f]/95"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* اليمين: شعار TasteScape بأيقونة الطاجين المغربي */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-600/50 bg-gradient-to-b from-red-800 via-orange-700 to-amber-700 text-amber-100 shadow-md transition-transform duration-200 group-hover:scale-105 dark:from-amber-600 dark:via-orange-700 dark:to-red-900 dark:text-amber-50">
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
              TasteScape
            </span>
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
              أطباق وتوابل من المطبخ المغربي
            </span>
          </div>
        </Link>

        {/* الوسط: روابط التنقل */}
        <nav
          aria-label="القائمة الرئيسية"
          className="hidden items-center gap-5 md:flex"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* اليسار: تبديل الوضع + فضاء الإدارة الخاص بالمسؤول + تسجيل الدخول */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="تبديل الوضع الليلي والنهاري"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-800/30 bg-white/70 text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/80 dark:text-amber-200"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <Link href="/admin" className={adminBtnClass()}>
            <span className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-300" />
            <span>فضاء الإدارة</span>
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-5 py-2.5 text-sm font-extrabold text-amber-50 shadow-sm transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
          >
            تسجيل الدخول
          </Link>
        </div>

        {/* أزرار الهاتف الذكي */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="تبديل الوضع الليلي والنهاري"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-800/30 bg-white/70 text-stone-900 dark:border-amber-400/30 dark:bg-stone-900/80 dark:text-amber-200"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="فتح القائمة"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-800/35 bg-white/60 text-lg font-bold text-stone-950 dark:border-amber-400/30 dark:bg-stone-900/80 dark:text-amber-100"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* القائمة المنسدلة للهاتف الذكي */}
      {mobileMenuOpen && (
        <div className="border-t border-amber-800/25 bg-[#f3e1c7] px-4 py-4 dark:border-amber-500/25 dark:bg-[#24170f] md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  pathname === item.href
                    ? "bg-red-900/15 text-red-950 dark:bg-amber-500/15 dark:text-amber-300"
                    : "text-stone-900 hover:bg-amber-800/10 dark:text-stone-200"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-2.5 border-t border-amber-800/25 pt-3 dark:border-amber-500/25">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`${adminBtnClass()} justify-center py-2.5`}
              >
                <span className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-300" />
                <span>فضاء الإدارة</span>
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-4 py-2.5 text-center text-sm font-extrabold text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
              >
                تسجيل الدخول
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}