import Link from "next/link";

export default function AboutCtaSection() {
  return (
    <section dir="rtl" className="pb-14 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border-2 border-amber-800/30 bg-[#f3e1c7] p-7 dark:border-amber-500/30 dark:bg-[#24170f] sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-black text-stone-950 dark:text-amber-50">
              جاهز لتجربة نكهات جديدة على مائدتك؟
            </h2>
            <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
              تصفح مكتبة الوصفات الآن أو تواصل معنا لاقتراح وصفة مغربية تحب
              إضافتها إلى المنصة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/recipes"
              className="rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-3 text-sm font-extrabold text-amber-50 shadow-sm transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
            >
              تصفح الوصفات
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-amber-800/35 bg-white/85 px-6 py-3 text-sm font-extrabold text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/85 dark:text-amber-200 dark:hover:border-amber-400"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}