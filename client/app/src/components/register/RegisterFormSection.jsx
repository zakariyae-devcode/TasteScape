"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterFormSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setStatus({
        type: "error",
        message: "يرجى تعبئة جميع الحقول المطلوبة لإتمام إنشاء الحساب.",
      });
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setStatus({
        type: "error",
        message: "يرجى إدخال عنوان بريد إلكتروني صحيح.",
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

    if (password !== confirmPassword) {
      setStatus({
        type: "error",
        message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين.",
      });
      return;
    }

    if (!acceptTerms) {
      setStatus({
        type: "error",
        message: "يرجى الموافقة على شروط الاستخدام والخصوصية للمتابعة.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: `مرحباً بك "${trimmedName}" في مذاق المغرب! تم تسجيل بيانات حسابك بنجاح.`,
    });

    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col justify-center rounded-3xl border-2 border-amber-800/25 bg-[#f3e1c7]/60 p-6 shadow-sm dark:border-amber-500/25 dark:bg-[#24170f]/75 sm:p-8 lg:col-span-7"
    >
      <div className="mx-auto w-full max-w-lg">
        <div className="border-b border-amber-800/20 pb-5 dark:border-amber-500/20">
          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            إنشاء حساب جديد
          </span>
          <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50 sm:text-3xl">
            تسجيل مستخدم جديد
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            أدخل معلوماتك الأساسية لبدء استخدام حسابك في مذاق المغرب.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="register-name"
              className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
            >
              الاسم الكامل
            </label>
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="اكتب اسمك الكامل..."
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
            >
              البريد الإلكتروني
            </label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label
                  htmlFor="register-password"
                  className="block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
                >
                  كلمة المرور
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-[11px] font-extrabold text-red-900 transition hover:underline dark:text-amber-300"
                >
                  {showPassword ? "إخفاء" : "إظهار"}
                </button>
              </div>
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6 أحرف على الأقل"
                className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
              />
            </div>

            <div>
              <label
                htmlFor="register-confirm-password"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
              >
                تأكيد كلمة المرور
              </label>
              <input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="أعد كتابة كلمة المرور"
                className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
              />
            </div>
          </div>

          <div className="pt-1">
            <label className="inline-flex cursor-pointer items-start gap-2.5 text-xs font-bold leading-relaxed text-stone-800 dark:text-stone-200 sm:text-sm">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-amber-800/40 accent-amber-700 dark:accent-amber-400"
              />
              <span>
                أوافق على{" "}
                <Link
                  href="/about"
                  className="font-extrabold text-red-900 underline dark:text-amber-300"
                >
                  شروط الاستخدام
                </Link>{" "}
                وسياسة الخصوصية في منصة مذاق المغرب.
              </span>
            </label>
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
            إنشاء الحساب
          </button>
        </form>
      </div>
    </div>
  );
}