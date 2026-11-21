import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      dir="rtl"
      className="border-b border-amber-800/20 bg-gradient-to-b from-[#f3e1c7]/70 to-[#faf4ea] py-12 dark:border-amber-500/20 dark:from-[#24170f] dark:to-[#17110c] sm:py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* النص الرئيسي وأزرار الانتقال */}
        <div className="space-y-6 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-600/10 px-4 py-1.5 text-xs font-extrabold text-red-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
            <span className="h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            <span>أصالة المذاق المغربي في كل طبق</span>
          </div>

          <h1 className="text-3xl font-black leading-tight text-stone-950 dark:text-amber-50 sm:text-4xl lg:text-5xl">
            اكتشف أشهى وصفات{" "}
            <span className="text-red-800 dark:text-amber-400">
              المطبخ المغربي
            </span>{" "}
            بلمسة تجمع بين الأصالة والبساطة
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-stone-700 dark:text-stone-300 sm:text-lg">
            من الطواجن العريقة والكسكس اليومي إلى الحلويات المغربية والشاي
            بالنعناع، نجمع لك وصفات واضحة ومجربة لتعيش دفء المائدة المغربية في
            بيتك.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Link
              href="/recipes"
              className="rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-3 text-sm font-extrabold text-amber-50 shadow-sm transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
            >
              تصفح الوصفات
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-amber-800/35 bg-white/80 px-6 py-3 text-sm font-extrabold text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/80 dark:text-amber-200 dark:hover:border-amber-400"
            >
              من نحن
            </Link>
          </div>
        </div>

        {/* بطاقة وصفة اليوم الجانبية */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border-2 border-amber-800/25 bg-[#f3e1c7] p-6 shadow-md dark:border-amber-500/25 dark:bg-[#24170f]">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-emerald-800/15 px-3 py-1 text-xs font-extrabold text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-300">
                وصفة اليوم
              </span>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                مدة التحضير: 75 دقيقة
              </span>
            </div>

            <div className="mb-5 flex h-44 items-center justify-center rounded-2xl border border-amber-700/20 bg-gradient-to-br from-red-800/15 via-amber-500/15 to-emerald-800/15 text-center dark:border-amber-400/20">
              <div className="space-y-1 px-4">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-amber-300">
                  أطباق رئيسية وطواجن
                </p>
                <p className="text-2xl font-black text-stone-950 dark:text-amber-50">
                  طاجين اللحم بالبرقوق واللوز
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              لحم طري متبل بالزعفران والقرفة والزنجبيل، يعلوه البرقوق المعسل
              واللوز المحمر لقوام غني ونكهة مغربية متوازنة.
            </p>

            <div className="flex items-center justify-between border-t border-amber-800/20 pt-4 dark:border-amber-500/20">
              <span className="text-xs font-extrabold text-stone-800 dark:text-amber-200">
                المستوى: متوسط
              </span>
              <Link
                href="/recipes"
                className="text-sm font-extrabold text-red-800 underline-offset-4 hover:underline dark:text-amber-300"
              >
                عرض الوصفة ←
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}