"use client";

import { useState } from "react";

export default function RecipeDetailContent({ recipe }) {
  const [checkedIngredients, setCheckedIngredients] = useState({});

  function toggleIngredient(index) {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;

  return (
    <section dir="rtl" className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* عمود المكونات التفاعلية */}
      <div className="lg:col-span-5">
        <div className="rounded-3xl border-2 border-amber-800/25 bg-[#f3e1c7]/75 p-6 shadow-sm dark:border-amber-500/25 dark:bg-[#24170f]/80 sm:p-7">
          <div className="flex items-center justify-between gap-2 border-b border-amber-800/20 pb-4 dark:border-amber-500/20">
            <h2 className="flex items-center gap-2 text-xl font-black text-stone-950 dark:text-amber-50">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
              <span>المكونات</span>
            </h2>

            <span className="rounded-full bg-amber-600/15 px-3 py-1 text-xs font-extrabold text-amber-950 dark:bg-amber-400/15 dark:text-amber-200">
              تم تجهيز {checkedCount} من {recipe.ingredients.length}
            </span>
          </div>

          <ul className="mt-5 space-y-3">
            {recipe.ingredients.map((item, index) => {
              const isChecked = Boolean(checkedIngredients[index]);
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => toggleIngredient(index)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-right text-sm font-bold transition ${
                      isChecked
                        ? "border-emerald-700/35 bg-emerald-800/10 text-stone-500 line-through dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-stone-400"
                        : "border-amber-800/20 bg-white/85 text-stone-800 hover:border-amber-700/45 dark:border-amber-500/20 dark:bg-stone-900/75 dark:text-stone-200 dark:hover:border-amber-400/45"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-black ${
                        isChecked
                          ? "border-emerald-700 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-stone-950"
                          : "border-amber-800/40 bg-transparent dark:border-amber-400/40"
                      }`}
                    >
                      {isChecked ? "✓" : ""}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {recipe.tip && (
            <div className="mt-6 rounded-2xl border border-amber-700/30 bg-amber-500/15 p-4 dark:border-amber-400/30 dark:bg-amber-400/10">
              <p className="text-xs font-black text-red-900 dark:text-amber-300">
                لمسة المطبخ المغربي
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-stone-800 dark:text-stone-200 sm:text-sm">
                {recipe.tip}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* عمود خطوات التحضير */}
      <div className="lg:col-span-7">
        <div className="rounded-3xl border-2 border-amber-800/25 bg-[#f3e1c7]/55 p-6 shadow-sm dark:border-amber-500/25 dark:bg-[#24170f]/65 sm:p-7">
          <div className="border-b border-amber-800/20 pb-4 dark:border-amber-500/20">
            <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
              طريقة الإعداد خطوة بخطوة
            </span>
            <h2 className="mt-1 text-xl font-black text-stone-950 dark:text-amber-50 sm:text-2xl">
              خطوات التحضير
            </h2>
          </div>

          <ol className="mt-6 space-y-4">
            {recipe.steps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-2xl border border-amber-800/20 bg-white/85 p-4 shadow-2xs dark:border-amber-500/20 dark:bg-stone-900/75 sm:p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 text-sm font-black text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950">
                  {index + 1}
                </span>
                <p className="pt-0.5 text-sm font-semibold leading-relaxed text-stone-800 dark:text-stone-200 sm:text-base">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}