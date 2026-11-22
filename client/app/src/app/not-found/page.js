import Link from "next/link";

export default function NotFound() {
  return (
    <section
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#faf4ea] px-4 py-14 text-stone-900 dark:bg-[#17110c] dark:text-amber-50 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-2xl rounded-3xl border-2 border-amber-800/30 bg-gradient-to-b from-[#f3e1c7]/95 to-[#f3e1c7]/60 p-8 text-center shadow-xs dark:border-amber-500/30 dark:from-[#24170f] dark:to-[#24170f]/80 sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-red-800/30 bg-red-800/10 px-4 py-1.5 text-xs font-extrabold text-red-950 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
          <span className="h-2 w-2 rounded-full bg-red-800 dark:bg-amber-400" />
          <span>وصفة أو صفحة غير موجودة</span>
        </span>

        <p className="mt-6 bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 bg-clip-text text-7xl font-black tracking-tight text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-amber-200 sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-black text-stone-950 dark:text-amber-50 sm:text-3xl">
          يبدو أن هذه الصفحة غادرت المائدة
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
          الرابط الذي تبحث عنه غير متوفر حالياً أو تم نقله إلى مكان آخر في منصة{" "}
          <span className="font-extrabold text-red-900 dark:text-amber-300">
            مذاق المغرب
          </span>
          . يمكنك العودة إلى الصفحة الرئيسية أو استكشاف دفتر الوصفات المغربية.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-3 text-sm font-black text-amber-50 shadow-xs transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
          >
            العودة إلى الصفحة الرئيسية
          </Link>

          <Link
            href="/recipes"
            className="rounded-full border border-amber-800/25 bg-white/85 px-6 py-3 text-sm font-extrabold text-stone-800 transition hover:bg-white dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-200 dark:hover:bg-stone-900"
          >
            استعراض دفتر الوصفات
          </Link>
        </div>

        <div className="mt-8 border-t border-amber-800/20 pt-5 dark:border-amber-500/20">
          <p className="text-xs font-extrabold text-stone-600 dark:text-stone-400">
            روابط سريعة قد تهمك
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-extrabold text-red-900 dark:text-amber-300 sm:text-sm">
            <Link href="/about" className="hover:underline">
              من نحن
            </Link>
            <span className="text-stone-400 dark:text-stone-600">•</span>
            <Link href="/profile" className="hover:underline">
              الملف الشخصي
            </Link>
            <span className="text-stone-400 dark:text-stone-600">•</span>
            <Link href="/contact" className="hover:underline">
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}