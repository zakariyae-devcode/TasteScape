const values = [
  {
    title: "الأصالة والهوية",
    description:
      "نحرص على إبراز نكهات المطبخ المغربي وتفاصيله التراثية من الزعفران والكمون والنعناع الطازج دون تكلف.",
    badge: "تراث مغربي",
  },
  {
    title: "الوضوح والبساطة",
    description:
      "نقدم الوصفات بترتيب واضح وخطوات عملية يسهل اتباعها سواء كنت مبتدئاً أو ذا خبرة في المطبخ.",
    badge: "تجربة سهلة",
  },
  {
    title: "الضيافة والمشاركة",
    description:
      "نحتفي بروح المائدة المغربية التي تجمع العائلة والأصدقاء، ونفتح الباب لاقتراح ومشاركة الأطباق المفضلة.",
    badge: "روح الضيافة",
  },
];

export default function AboutValuesSection() {
  return (
    <section dir="rtl" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            ما الذي يميزنا
          </span>
          <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50 sm:text-3xl">
            القيم التي نبني عليها تجربتنا
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/55 p-6 shadow-xs dark:border-amber-500/25 dark:bg-[#24170f]/65"
            >
              <div className="space-y-3">
                <span className="inline-block rounded-full bg-amber-600/15 px-3 py-1 text-xs font-extrabold text-amber-950 dark:bg-amber-400/15 dark:text-amber-200">
                  {item.badge}
                </span>
                <h3 className="text-xl font-black text-stone-950 dark:text-amber-50">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}