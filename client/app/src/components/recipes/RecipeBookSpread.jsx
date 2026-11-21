import Link from "next/link";

export default function RecipeBookSpread({
  recipe,
  averageRating,
  reviewsCount,
}) {
  if (!recipe) {
    return (
      <div
        dir="rtl"
        className="rounded-3xl border-2 border-dashed border-amber-800/30 bg-[#f3e1c7]/60 p-10 text-center dark:border-amber-500/30 dark:bg-[#24170f]/60"
      >
        <p className="text-lg font-black text-stone-900 dark:text-amber-50">
          لا توجد وصفات مطابقة لبحثك في هذا الفصل حالياً
        </p>
        <p className="mt-2 text-sm text-stone-700 dark:text-stone-300">
          جرّب كلمة بحث أخرى أو اختر «كل الفصول» لتصفح باقي صفحات الدفتر.
        </p>
      </div>
    );
  }

  return (
    <section dir="rtl" aria-label="صفحات الكتاب المفتوح">
      <div className="relative grid grid-cols-1 overflow-hidden rounded-3xl border-2 border-amber-900/25 bg-[#f3e1c7] shadow-lg dark:border-amber-500/25 dark:bg-[#24170f] lg:grid-cols-2">
        {/* خط التجليد الأوسط في الشاشات الكبيرة */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-4 -translate-x-1/2 bg-gradient-to-r from-amber-950/20 via-amber-800/35 to-amber-950/20 dark:from-black/50 dark:via-amber-500/20 dark:to-black/50 lg:block"
        />

        {/* الصفحة اليمنى: بيانات الطبق والمكونات */}
        <div className="border-b-2 border-amber-900/15 p-6 dark:border-amber-500/15 sm:p-8 lg:border-b-0 lg:border-l lg:pl-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-red-800/15 px-3.5 py-1 text-xs font-extrabold text-red-950 dark:bg-red-500/20 dark:text-red-200">
              {recipe.categoryLabel}
            </span>
            <span className="rounded-full bg-amber-600/20 px-3 py-1 text-xs font-black text-amber-950 dark:bg-amber-400/20 dark:text-amber-200">
              ★ {averageRating} ({reviewsCount} مراجعة)
            </span>
          </div>

          {/* لوحة الطبق */}
          <div className="mt-5 flex h-44 flex-col justify-between rounded-2xl border border-amber-800/20 bg-gradient-to-br from-red-800/15 via-amber-500/15 to-emerald-800/15 p-5 dark:border-amber-400/20 dark:from-red-900/30 dark:via-amber-600/20 dark:to-emerald-900/25">
            <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
              صفحة من دفتر المطبخ المغربي
            </span>
            <h2 className="text-2xl font-black leading-snug text-stone-950 dark:text-amber-50 sm:text-3xl">
              {recipe.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-extrabold text-stone-800 dark:text-amber-100">
              <span>المدة: {recipe.duration}</span>
              <span>•</span>
              <span>المستوى: {recipe.difficulty}</span>
            </div>
          </div>

          {/* قائمة المكونات */}
          <div className="mt-6">
            <h3 className="flex items-center gap-2 text-lg font-black text-red-950 dark:text-amber-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
              <span>المكونات</span>
            </h3>

            <ul className="mt-3.5 space-y-2.5">
              {recipe.ingredients.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-amber-800/15 bg-white/70 px-3.5 py-2 text-sm font-bold text-stone-800 dark:border-amber-500/15 dark:bg-stone-900/60 dark:text-stone-200"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700 dark:bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* الصفحة اليسرى: النبذة وخطوات التحضير */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:pr-10">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
                في رحاب الوصفة
              </span>
              <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
                {recipe.summary}
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-black text-red-950 dark:text-amber-300">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                <span>خطوات التحضير</span>
              </h3>

              <ol className="mt-4 space-y-3">
                {recipe.steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-xl border border-amber-800/15 bg-white/75 p-3.5 text-sm leading-relaxed text-stone-800 dark:border-amber-500/15 dark:bg-stone-900/65 dark:text-stone-200"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-800 text-xs font-black text-amber-50 dark:bg-amber-500 dark:text-stone-950">
                      {index + 1}
                    </span>
                    <span className="font-semibold">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-amber-800/20 pt-4 dark:border-amber-500/20">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
              مذاق المغرب — وصفات مجربة
            </span>
            <Link
              href={`/recipes/${recipe.id}`}
              className="text-sm font-extrabold text-red-800 underline-offset-4 hover:underline dark:text-amber-300"
            >
              فتح الصفحة الكاملة للوصفة ←
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}