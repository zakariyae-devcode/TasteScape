"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLoginFormSection() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedId = adminId.trim();
    const trimmedCode = securityCode.trim();

    if (!trimmedId || !password.trim() || !trimmedCode) {
      setStatus({
        type: "error",
        message: "يرجى إدخال معرّف المشرف وكلمة المرور ورمز التحقق الإداري.",
      });
      return;
    }

    if (password.length < 8) {
      setStatus({
        type: "error",
        message: "يجب أن تتكون كلمة المرور الإدارية من 8 أحرف على الأقل.",
      });
      return;
    }

    if (!/^\d{6}$/.test(trimmedCode)) {
      setStatus({
        type: "error",
        message: "يجب أن يتكون رمز التحقق الإداري من 6 أرقام صحيحة.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: `تم التحقق من بيانات المشرف "${trimmedId}" بنجاح. يمكنك الآن الانتقال إلى لوحة الإدارة.`,
    });
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col justify-center rounded-3xl border-2 border-amber-800/30 bg-[#f3e1c7]/65 p-6 shadow-sm dark:border-amber-500/30 dark:bg-[#24170f]/80 sm:p-8 lg:col-span-7"
    >
      <div className="mx-auto w-full max-w-lg">
        <div className="border-b border-amber-800/20 pb-5 dark:border-amber-500/20">
          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            تحقق الهوية الإدارية
          </span>
          <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50 sm:text-3xl">
            بيانات دخول المشرف
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            أدخل بيانات الحساب الإداري ورمز التحقق للوصول إلى لوحة إدارة مذاق المغرب.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="admin-identifier"
              className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
            >
              معرّف المشرف أو البريد الإداري
            </label>
            <input
              id="admin-identifier"
              type="text"
              autoComplete="username"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="مثال: admin أو اسم المستخدم الإداري"
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label
                htmlFor="admin-password"
                className="block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
              >
                كلمة المرور الإدارية
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
              id="admin-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8 أحرف على الأقل"
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
          </div>

          <div>
            <label
              htmlFor="admin-security-code"
              className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
            >
              رمز التحقق الإداري (6 أرقام)
            </label>
            <input
              id="admin-security-code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              placeholder="000000"
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-black tracking-widest text-stone-950 placeholder:text-stone-500 placeholder:tracking-normal focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
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
              <p>{status.message}</p>
              {status.type === "success" && (
                <Link
                  href="/admin"
                  className="mt-2.5 inline-block text-xs font-black underline sm:text-sm"
                >
                  الدخول إلى لوحة الإدارة ←
                </Link>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-3.5 text-sm font-black text-amber-50 shadow-xs transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
          >
            دخول لوحة الإدارة
          </button>
        </form>
      </div>
    </div>
  );
}