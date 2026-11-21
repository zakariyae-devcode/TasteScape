"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginFormSection() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedId = identifier.trim();

    if (!trimmedId || !password.trim()) {
      setStatus({
        type: "error",
        message: "يرجى إدخال البريد الإلكتروني أو اسم المستخدم وكلمة المرور.",
      });
      return;
    }

    if (password.length < 6) {
      setStatus({
        type: "error",
        message: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: `تم التحقق من بيانات الدخول لحساب "${trimmedId}" بنجاح. يمكنك الآن متابعة التصفح داخل مذاق المغرب.`,
    });
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col justify-center rounded-3xl border-2 border-amber-800/25 bg-[#f3e1c7]/60 p-6 shadow-sm dark:border-amber-500/25 dark:bg-[#24170f]/75 sm:p-8 lg:col-span-7"
    >
      <div className="mx-auto w-full max-w-lg">
        <div className="border-b border-amber-800/20 pb-5 dark:border-amber-500/20">
          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            الدخول إلى الحساب
          </span>
          <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50 sm:text-3xl">
            تسجيل الدخول
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            أدخل بيانات حسابك للوصول إلى وصفاتك وتفضيلاتك في مذاق المغرب.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="login-identifier"
              className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
            >
              البريد الإلكتروني أو اسم المستخدم
            </label>
            <input
              id="login-identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="مثال: name@domain.com أو اسم المستخدم"
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label
                htmlFor="login-password"
                className="block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
              >
                كلمة المرور
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-xs font-extrabold text-red-900 transition hover:underline dark:text-amber-300"
              >
                {showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              </button>
            </div>

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="inline-flex cursor-pointer items-center gap-2.5 text-xs font-extrabold text-stone-800 dark:text-stone-200 sm:text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-amber-800/40 accent-amber-700 dark:accent-amber-400"
              />
              <span>تذكرني على هذا الجهاز</span>
            </label>

            <Link
              href="/contact"
              className="text-xs font-extrabold text-emerald-900 transition hover:underline dark:text-emerald-300 sm:text-sm"
            >
              تحتاج مساعدة في الدخول؟
            </Link>
          </div>

          {status.message && (
            <div
              role="status"
              className={`rounded-2xl border p-4 text-xs font-extrabold leading-relaxed sm:text-sm ${
                status.type === "success"
                  ? "border-emerald-700/35 bg-emerald-800/10 text-emerald-950 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200"
                  : "border-red-700/35 bg-red-800/10 text-red-950 dark:border-red-400/35 dark:bg-red-500/15 dark:text-red-200"
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-3.5 text-sm font-black text-amber-50 shadow-xs transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}