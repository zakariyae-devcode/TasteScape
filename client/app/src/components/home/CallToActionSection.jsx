import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section dir="rtl" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-amber-800/30 bg-gradient-to-l from-[#f3e1c7] via-[#f3e1c7]/90 to-amber-500/15 p-7 shadow-sm dark:border-amber-500/30 dark:from-[#24170f] dark:via-[#24170f] dark:to-amber-900/20 sm:p-10 lg:p-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block rounded-full bg-emerald-800/15 px-3.5 py-1 text-xs font-extrabold text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-300">
                شاركنا شغف الطبخ
              </span>

              <h2 className="text-2xl font-black leading-snug text-stone-950 dark:text-amber-50 sm:text-3xl">
                هل لديك وصفة مغربية مميزة أو اقتراح لطبق جديد؟
              </h2>

              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
                تواصل مع فريق **مذاق المغرب** لمشاركة وصفات العائلة أو اقتراح
                أطباق تحب أن تراها مضافة إلى مكتبة الوصفات.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-3 text-sm font-extrabold text-amber-50 shadow-sm transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
              >
                تواصل معنا
              </Link>

              <Link
                href="/recipes"
                className="rounded-full border border-amber-800/35 bg-white/85 px-6 py-3 text-sm font-extrabold text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/85 dark:text-amber-200 dark:hover:border-amber-400"
              >
                استكشف الوصفات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}