import Link from "next/link";

const contactChannels = [
  {
    title: "مشاركة الوصفات",
    detail: "نرحب بوصفات العائلات والأطباق الإقليمية المغربية لإضافتها إلى الدفتر.",
    badge: "دفتر الوصفات",
  },
  {
    title: "أوقات المتابعة والرد",
    detail: "من الإثنين إلى السبت، من الساعة 09:00 صباحاً حتى 06:00 مساءً.",
    badge: "خدمة القراء",
  },
  {
    title: "الرسائل والاستفسارات",
    detail: "تُراجع جميع الرسائل والمقترحات بعناية لضمان جودة المحتوى ووضوحه.",
    badge: "تواصل مباشر",
  },
];

export default function ContactInfoSection() {
  return (
    <aside dir="rtl" className="space-y-5 lg:col-span-5">
      {contactChannels.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/60 p-5 shadow-2xs dark:border-amber-500/25 dark:bg-[#24170f]/70"
        >
          <span className="inline-block rounded-full bg-amber-600/15 px-3 py-1 text-xs font-extrabold text-amber-950 dark:bg-amber-400/15 dark:text-amber-200">
            {item.badge}
          </span>
          <h3 className="mt-2.5 text-lg font-black text-stone-950 dark:text-amber-50">
            {item.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            {item.detail}
          </p>
        </div>
      ))}

      <div className="rounded-2xl border border-amber-800/25 bg-white/80 p-5 dark:border-amber-500/25 dark:bg-stone-900/75">
        <p className="text-sm font-black text-stone-950 dark:text-amber-50">
          هل تفضل تصفح الوصفات أولاً؟
        </p>
        <p className="mt-1 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
          انتقل إلى دفتر الوصفات التفاعلي واستعرض الأطباق والتقييمات.
        </p>
        <Link
          href="/recipes"
          className="mt-3.5 inline-block rounded-full border border-amber-800/35 bg-[#f3e1c7] px-4 py-2 text-xs font-extrabold text-stone-900 transition hover:border-amber-700 dark:border-amber-400/30 dark:bg-[#24170f] dark:text-amber-200"
        >
          الذهاب إلى الوصفات ←
        </Link>
      </div>
    </aside>
  );
}