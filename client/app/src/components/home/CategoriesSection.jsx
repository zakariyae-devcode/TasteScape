import Link from "next/link";

const categories = [
  {
    title: "أطباق رئيسية وطواجن",
    description: "طواجن متنوعة، كسكس يومي، وأطباق مغربية غنية بالتوابل.",
    count: "18 وصفة",
    href: "/recipes?category=mains",
    badgeClass:
      "bg-red-800/15 text-red-950 dark:bg-red-500/20 dark:text-red-200",
  },
  {
    title: "سلطات ومقبلات",
    description: "زعلوك، تكتوكة، وسلطات مغربية منعشة تفتح الشهية.",
    count: "12 وصفة",
    href: "/recipes?category=salads",
    badgeClass:
      "bg-emerald-800/15 text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-200",
  },
  {
    title: "حلويات مغربية",
    description: "شباكية، بريوات باللوز، وحلويات المناسبات والضيافة.",
    count: "15 وصفة",
    href: "/recipes?category=sweets",
    badgeClass:
      "bg-amber-600/20 text-amber-950 dark:bg-amber-400/20 dark:text-amber-200",
  },
  {
    title: "شاي ومشروبات تقليدية",
    description: "أتاي بالنعناع والشيبة ومشروبات مغربية أصيلة لكل وقت.",
    count: "8 وصفات",
    href: "/recipes?category=drinks",
    badgeClass:
      "bg-orange-700/15 text-orange-950 dark:bg-orange-400/20 dark:text-orange-200",
  },
];

export default function CategoriesSection() {
  return (
    <section
      dir="rtl"
      className="py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-extrabold tracking-wide text-red-800 dark:text-amber-400">
              استكشف حسب النوع
            </span>
            <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50 sm:text-3xl">
              تصنيفات المطبخ المغربي
            </h2>
          </div>

          <Link
            href="/recipes"
            className="text-sm font-extrabold text-emerald-900 underline-offset-4 hover:underline dark:text-emerald-300"
          >
            عرض كل التصنيفات ←
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex flex-col justify-between rounded-2xl border border-amber-800/25 bg-[#f3e1c7]/75 p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-amber-700/60 hover:bg-[#f3e1c7] dark:border-amber-500/25 dark:bg-[#24170f]/80 dark:hover:border-amber-400/50 dark:hover:bg-[#24170f]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-extrabold ${category.badgeClass}`}
                  >
                    {category.count}
                  </span>
                  <span className="text-sm font-bold text-amber-800 transition-transform duration-200 group-hover:-translate-x-1 dark:text-amber-300">
                    ←
                  </span>
                </div>

                <h3 className="text-lg font-black text-stone-950 dark:text-amber-50">
                  {category.title}
                </h3>

                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}