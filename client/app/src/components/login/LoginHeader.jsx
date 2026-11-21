import Link from "next/link";

const perks = [
  {
    title: "حفظ الوصفات المفضلة",
    description: "ارجع بسهولة إلى الطواجن والحلويات والمقبلات التي تعتمدها باستمرار.",
  },
  {
    title: "مشاركة التقييمات والملاحظات",
    description: "دوّن تجربتك بعد تحضير الوصفة وشارك لمساتك مع مجتمع الطبخ.",
  },
  {
    title: "إدارة وتطوير المحتوى",
    description: "وصول منظم للأدوار المخولة لمتابعة الوصفات والمراجعات بكل سلاسة.",
  },
];

export default function LoginHeader() {
  return (
    <div
      dir="rtl"
      className="flex flex-col justify-between rounded-3xl border-2 border-amber-800/25 bg-gradient-to-b from-[#f3e1c7]/85 to-[#f3e1c7]/50 p-6 shadow-xs dark:border-amber-500/25 dark:from-[#24170f] dark:to-[#24170f]/70 sm:p-8 lg:col-span-5"
    >
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-600/10 px-4 py-1.5 text-xs font-extrabold text-red-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
          <span className="h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
          <span>بوابة الحساب — مذاق المغرب</span>
        </span>

        <h1 className="text-3xl font-black leading-tight text-stone-950 dark:text-amber-50 sm:text-4xl">
          مرحباً بك مجدداً في{" "}
          <span className="text-red-800 dark:text-amber-400">مذاق المغرب</span>
        </h1>

        <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
          سجّل دخولك لمتابعة وصفاتك المفضلة، وتقييم الأطباق بعد تجربتها،
          والبقاء على تواصل دائم مع دفتر الوصفات المغربية.
        </p>

        <div className="mt-6 space-y-3.5 pt-2">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="rounded-2xl border border-amber-800/20 bg-white/80 p-4 dark:border-amber-500/20 dark:bg-stone-900/70"
            >
              <h2 className="text-sm font-black text-stone-950 dark:text-amber-50">
                {perk.title}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-amber-800/20 pt-5 dark:border-amber-500/20">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-red-900 transition hover:underline dark:text-amber-300 sm:text-sm"
        >
          <span>← تصفح دفتر الوصفات دون تسجيل دخول</span>
        </Link>
      </div>
    </div>
  );
}