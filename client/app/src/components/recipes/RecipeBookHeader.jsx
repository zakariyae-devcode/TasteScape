"use client";

const categories = [
  { id: "all", label: "كل الفصول" },
  { id: "mains", label: "أطباق رئيسية وطواجن" },
  { id: "salads", label: "سلطات ومقبلات" },
  { id: "sweets", label: "حلويات مغربية" },
  { id: "drinks", label: "شاي ومشروبات تقليدية" },
];

export default function RecipeBookHeader({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
}) {
  return (
    <header
      dir="rtl"
      className="border-b border-amber-800/20 bg-gradient-to-b from-[#f3e1c7]/80 to-[#faf4ea] py-9 dark:border-amber-500/20 dark:from-[#24170f] dark:to-[#17110c]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-600/10 px-3.5 py-1 text-xs font-extrabold text-red-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
              <span>دفتر الوصفات التفاعلي</span>
              <span>•</span>
              <span>{totalCount} وصفة متاحة</span>
            </span>

            <h1 className="text-3xl font-black text-stone-950 dark:text-amber-50 sm:text-4xl">
              كتاب وصفات{" "}
              <span className="text-red-800 dark:text-amber-400">
                مذاق المغرب
              </span>
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
              قلّب صفحات الدفتر واستعرض المقادير والخطوات وملاحظات الطهاة وكأنك
              تفتح كتاب وصفات عائلياً أصيلاً.
            </p>
          </div>

          {/* بحث سريع داخل الدفتر */}
          <div className="w-full lg:w-80">
            <label htmlFor="book-search" className="sr-only">
              ابحث عن وصفة أو مكون
            </label>
            <input
              id="book-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث باسم الطبق أو مكون..."
              className="w-full rounded-2xl border border-amber-800/30 bg-white/90 px-4 py-2.5 text-sm font-bold text-stone-900 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/30 dark:bg-stone-900/85 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
          </div>
        </div>

        {/* فهرس الفصول / التصنيفات */}
        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-extrabold transition sm:text-sm ${
                  isActive
                    ? "bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 text-amber-50 shadow-xs dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
                    : "border border-amber-800/25 bg-[#f3e1c7]/70 text-stone-800 hover:border-amber-700/50 hover:bg-[#f3e1c7] dark:border-amber-500/25 dark:bg-[#24170f]/75 dark:text-amber-100 dark:hover:border-amber-400/50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}