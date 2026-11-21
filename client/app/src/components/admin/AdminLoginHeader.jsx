import Link from "next/link";

const adminDuties = [
  {
    title: "إدارة وتنظيم الوصفات",
    description: "إضافة الوصفات المغربية وتحديث مقاديرها وخطوات تحضيرها وتصنيفاتها.",
  },
  {
    title: "مراجعة التقييمات والملاحظات",
    description: "متابعة تقييمات الزوار وملاحظاتهم لضمان جودة المحتوى ومصداقيته.",
  },
  {
    title: "ضبط واجهة المنصة وحالتها",
    description: "تنسيق المحتوى المعروض والحفاظ على هوية مذاق المغرب المتكاملة.",
  },
];

export default function AdminLoginHeader() {
  return (
    <div
      dir="rtl"
      className="flex flex-col justify-between rounded-3xl border-2 border-amber-800/30 bg-gradient-to-b from-[#f3e1c7]/90 to-[#f3e1c7]/55 p-6 shadow-xs dark:border-amber-500/30 dark:from-[#24170f] dark:to-[#24170f]/75 sm:p-8 lg:col-span-5"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-800/30 bg-red-800/10 px-4 py-1.5 text-xs font-extrabold text-red-950 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
            <span className="h-2 w-2 rounded-full bg-red-700 dark:bg-amber-400" />
            <span>بوابة الإدارة — مذاق المغرب</span>
          </span>

          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            دخول مخول
          </span>
        </div>

        <h1 className="text-3xl font-black leading-tight text-stone-950 dark:text-amber-50 sm:text-4xl">
          تسجيل دخول{" "}
          <span className="text-red-800 dark:text-amber-400">الإدارة</span>
        </h1>

        <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
          مساحة مخصصة للمشرفين والمديرين لإدارة وصفات منصة مذاق المغرب ومتابعة
          التفاعل والمحتوى بشكل منظم.
        </p>

        <div className="rounded-2xl border border-amber-800/25 bg-white/85 p-4 text-xs font-bold leading-relaxed text-stone-800 dark:border-amber-500/25 dark:bg-stone-900/75 dark:text-stone-200">
          تنبيه إداري: هذا المسار مخصص للحسابات الإدارية المعتمدة فقط؛ إذا كنت
          عضواً عادياً يمكنك استخدام بوابة تسجيل الدخول العادية.
        </div>

        <div className="mt-5 space-y-3 pt-1">
          {adminDuties.map((duty) => (
            <div
              key={duty.title}
              className="rounded-2xl border border-amber-800/20 bg-white/75 p-4 dark:border-amber-500/20 dark:bg-stone-900/65"
            >
              <h2 className="text-sm font-black text-stone-950 dark:text-amber-50">
                {duty.title}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                {duty.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-amber-800/20 pt-5 dark:border-amber-500/20">
        <Link
          href="/login"
          className="text-xs font-extrabold text-red-900 transition hover:underline dark:text-amber-300 sm:text-sm"
        >
          دخول الأعضاء العاديين
        </Link>

        <Link
          href="/"
          className="text-xs font-extrabold text-emerald-900 transition hover:underline dark:text-emerald-300 sm:text-sm"
        >
          ← العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
}