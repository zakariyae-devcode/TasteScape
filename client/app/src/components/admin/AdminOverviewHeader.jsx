import Link from "next/link";

export default function AdminOverviewHeader({ stats }) {
  const cards = [
    {
      label: "إجمالي الوصفات",
      value: stats.totalRecipes,
      hint: `${stats.publishedRecipes} منشورة • ${stats.draftRecipes} مسودة`,
      accent: "text-red-800 dark:text-amber-400",
    },
    {
      label: "حسابات الأعضاء",
      value: stats.totalAccounts,
      hint: `${stats.activeAccounts} نشط • ${stats.closedAccounts} مغلق`,
      accent: "text-emerald-900 dark:text-emerald-300",
    },
    {
      label: "التعليقات والمراجعات",
      value: stats.totalComments,
      hint: `${stats.flaggedComments} غير جيد / مبلّغ عنه`,
      accent: "text-amber-900 dark:text-amber-300",
    },
  ];

  return (
    <div
      dir="rtl"
      className="rounded-3xl border-2 border-amber-800/30 bg-gradient-to-b from-[#f3e1c7]/90 to-[#f3e1c7]/55 p-6 shadow-xs dark:border-amber-500/30 dark:from-[#24170f] dark:to-[#24170f]/75 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-800/20 pb-6 dark:border-amber-500/20">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-800/30 bg-red-800/10 px-4 py-1 text-xs font-extrabold text-red-950 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
              <span className="h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
              <span>لوحة تحكم الإدارة — مذاق المغرب</span>
            </span>
            <span className="text-xs font-extrabold text-stone-700 dark:text-stone-300">
              إدارة المحتوى والحسابات والتعليقات
            </span>
          </div>

          <h1 className="text-2xl font-black text-stone-950 dark:text-amber-50 sm:text-3xl lg:text-4xl">
            مركز إدارة{" "}
            <span className="text-red-800 dark:text-amber-400">مذاق المغرب</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/recipes"
            className="rounded-full border border-amber-800/25 bg-white/85 px-4 py-2 text-xs font-extrabold text-stone-800 transition hover:bg-white dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-200 dark:hover:bg-stone-900 sm:text-sm"
          >
            دفتر الوصفات
          </Link>

          <Link
            href="/admin/login"
            className="rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-4 py-2 text-xs font-black text-amber-50 transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950 sm:text-sm"
          >
            تسجيل الخروج
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-amber-800/20 bg-white/85 p-5 dark:border-amber-500/20 dark:bg-stone-900/75"
          >
            <span className="text-xs font-extrabold text-stone-700 dark:text-stone-300 sm:text-sm">
              {card.label}
            </span>
            <p className={`mt-2 text-3xl font-black ${card.accent}`}>
              {card.value}
            </p>
            <p className="mt-1.5 text-xs font-bold text-stone-600 dark:text-stone-400">
              {card.hint}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}