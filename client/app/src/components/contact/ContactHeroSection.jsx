export default function ContactHeroSection() {
  return (
    <section
      dir="rtl"
      className="border-b border-amber-800/20 bg-gradient-to-b from-[#f3e1c7]/75 to-transparent py-12 dark:border-amber-500/20 dark:from-[#24170f] sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-600/10 px-4 py-1.5 text-xs font-extrabold text-red-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
            <span className="h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            <span>باب التواصل والضيافة</span>
          </span>

          <h1 className="text-3xl font-black leading-tight text-stone-950 dark:text-amber-50 sm:text-4xl lg:text-5xl">
            تواصل مع فريق{" "}
            <span className="text-red-800 dark:text-amber-400">
              مذاق المغرب
            </span>
          </h1>

          <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300 sm:text-lg">
            هل لديك وصفة مغربية عائلية تود مشاركتها في دفتر الوصفات، أو ملاحظة
            حول طبق جرّبته، أو اقتراح لتطوير المنصة؟ يسعدنا دائماً سماع صوتك.
          </p>
        </div>
      </div>
    </section>
  );
}