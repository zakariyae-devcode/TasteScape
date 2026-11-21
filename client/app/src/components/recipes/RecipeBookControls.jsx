"use client";

export default function RecipeBookControls({
  recipes,
  currentIndex,
  onPrevPage,
  onNextPage,
  onSelectPage,
}) {
  const totalPages = recipes.length;

  if (totalPages === 0) {
    return null;
  }

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalPages - 1;

  return (
    <nav
      dir="rtl"
      aria-label="أدوات تقليب صفحات الكتاب"
      className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/80 px-5 py-4 shadow-2xs dark:border-amber-500/25 dark:bg-[#24170f]/85 sm:flex-row"
    >
      {/* زر الصفحة السابقة (في RTL يعني الرجوع للخلف) */}
      <button
        type="button"
        onClick={onPrevPage}
        disabled={isFirst}
        className={`rounded-full px-5 py-2.5 text-xs font-extrabold transition sm:text-sm ${
          isFirst
            ? "cursor-not-allowed border border-amber-800/15 bg-white/40 text-stone-400 dark:border-amber-500/15 dark:bg-stone-900/30 dark:text-stone-600"
            : "border border-amber-800/35 bg-white/90 text-stone-900 hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/90 dark:text-amber-200 dark:hover:border-amber-400"
        }`}
      >
        ← الصفحة السابقة
      </button>

      {/* رقم الصفحة وقائمة الانتقال السريع */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="rounded-full bg-amber-600/15 px-3.5 py-1 text-xs font-black text-amber-950 dark:bg-amber-400/15 dark:text-amber-200">
          صفحة {currentIndex + 1} من {totalPages}
        </span>

        <label htmlFor="book-page-jump" className="sr-only">
          الانتقال المباشر إلى صفحة وصفة
        </label>
        <select
          id="book-page-jump"
          value={currentIndex}
          onChange={(e) => onSelectPage(Number(e.target.value))}
          className="rounded-xl border border-amber-800/30 bg-white/90 px-3 py-1.5 text-xs font-extrabold text-stone-900 focus:border-amber-700 focus:outline-none dark:border-amber-500/30 dark:bg-stone-900/90 dark:text-amber-100 dark:focus:border-amber-400 sm:text-sm"
        >
          {recipes.map((recipe, idx) => (
            <option key={recipe.id} value={idx}>
              صفحة {idx + 1}: {recipe.title}
            </option>
          ))}
        </select>
      </div>

      {/* زر الصفحة التالية */}
      <button
        type="button"
        onClick={onNextPage}
        disabled={isLast}
        className={`rounded-full px-5 py-2.5 text-xs font-extrabold transition sm:text-sm ${
          isLast
            ? "cursor-not-allowed border border-amber-800/15 bg-white/40 text-stone-400 dark:border-amber-500/15 dark:bg-stone-900/30 dark:text-stone-600"
            : "bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 text-amber-50 shadow-xs hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
        }`}
      >
        الصفحة التالية →
      </button>
    </nav>
  );
}