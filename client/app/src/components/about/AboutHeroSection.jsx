const highlights = [
  { label: "تصنيفات متنوعة", value: "+4 فئات" },
  { label: "وصفات مختارة", value: "+50 وصفة" },
  { label: "أطباق وتوابل", value: "تقليدي وعصري" },
];

export default function AboutHeroSection() {
  return (
    <section
      dir="rtl"
      className="border-b border-amber-800/20 bg-gradient-to-b from-[#f3e1c7]/75 to-transparent py-12 dark:border-amber-500/20 dark:from-[#24170f] sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-600/10 px-4 py-1.5 text-xs font-extrabold text-red-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
            <span className="h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            <span>عن منصة مذاق المغرب</span>
          </span>

          <h1 className="text-3xl font-black leading-tight text-stone-950 dark:text-amber-50 sm:text-4xl lg:text-5xl">
            حكاية وصفات تجمع دفء المطبخ المغربي في مكان واحد
          </h1>

          <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300 sm:text-lg">
            انطلقت <strong>مذاق المغرب</strong> لتكون مرجعاً عربياً أنيقاً
            ومباشراً لعشاق الطبخ المغربي؛ حيث تلتقي روائح التوابل والبهارات
            مع سهولة الوصول إلى وصفات مجربة تناسب المائدة اليومية والمناسبات
            الخاصة.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/80 p-5 dark:border-amber-500/25 dark:bg-[#24170f]/85"
            >
              <p className="text-2xl font-black text-red-800 dark:text-amber-400">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-bold text-stone-700 dark:text-stone-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}