"use client";
import Link from "next/link";

export default function RecipeDetailHeader({
  recipe,
  averageRating,
  reviewsCount,
}) {
  return (
    <header
      dir="rtl"
      className="border-b border-amber-800/20 bg-gradient-to-b from-[#f3e1c7]/80 to-[#faf4ea] py-10 dark:border-amber-500/20 dark:from-[#24170f] dark:to-[#17110c] sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 rounded-full border border-amber-800/30 bg-white/85 px-4 py-2 text-xs font-extrabold text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/85 dark:text-amber-200 dark:hover:border-amber-400"
          >
            <span>→ العودة إلى دفتر الوصفات</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-red-800/15 px-3.5 py-1 text-xs font-extrabold text-red-950 dark:bg-red-500/20 dark:text-red-200">
              {recipe.categoryLabel}
            </span>
            <span className="rounded-full bg-amber-600/20 px-3 py-1 text-xs font-black text-amber-950 dark:bg-amber-400/20 dark:text-amber-200">
              ★ {averageRating} ({reviewsCount} مراجعة)
            </span>
          </div>
        </div>

        <div className="max-w-4xl space-y-4">
          <h1 className="text-3xl font-black leading-tight text-stone-950 dark:text-amber-50 sm:text-4xl lg:text-5xl">
            {recipe.title}
          </h1>

          <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300 sm:text-lg">
            {recipe.summary}
          </p>
        </div>

        {/* بطاقات معلومات الوصفة */}
        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          <div className="rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/80 p-4 dark:border-amber-500/25 dark:bg-[#24170f]/85">
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400">
              مدة التحضير
            </p>
            <p className="mt-1 text-base font-black text-red-800 dark:text-amber-400 sm:text-lg">
              {recipe.duration}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/80 p-4 dark:border-amber-500/25 dark:bg-[#24170f]/85">
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400">
              مستوى الصعوبة
            </p>
            <p className="mt-1 text-base font-black text-stone-950 dark:text-amber-50 sm:text-lg">
              {recipe.difficulty}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/80 p-4 dark:border-amber-500/25 dark:bg-[#24170f]/85">
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400">
              عدد الحصص
            </p>
            <p className="mt-1 text-base font-black text-emerald-900 dark:text-emerald-300 sm:text-lg">
              {recipe.servings}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/80 p-4 dark:border-amber-500/25 dark:bg-[#24170f]/85">
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400">
              عدد المكونات
            </p>
            <p className="mt-1 text-base font-black text-stone-950 dark:text-amber-50 sm:text-lg">
              {recipe.ingredients.length} مكونات
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}