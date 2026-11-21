import Link from "next/link";

const featuredRecipes = [
  {
    id: "tajine-lahm-barqoq",
    title: "طاجين اللحم بالبرقوق واللوز",
    category: "أطباق رئيسية وطواجن",
    duration: "75 دقيقة",
    rating: "4.9",
    summary:
      "لحم مغربي متبل بالزعفران الحر والزنجبيل والقرفة مع برقوق معسل وسمسم محمص.",
  },
  {
    id: "couscous-sept-legumes",
    title: "كسكس بالسبعة خضار والمرق الأصيل",
    category: "أطباق رئيسية وطواجن",
    duration: "90 دقيقة",
    rating: "4.8",
    summary:
      "حبات كسكس مفورة بعناية مع تشكيلة خضار موسمية ومرق غني بنكهة السمن والزعفران.",
  },
  {
    id: "briouates-amandes",
    title: "بريوات باللوز وماء الزهر والعسل",
    category: "حلويات مغربية",
    duration: "45 دقيقة",
    rating: "4.9",
    summary:
      "ورقة مقرمشة محشوة بعقدة اللوز المعطرة بماء الزهر والقرفة ومغموسة في العسل.",
  },
  {
    id: "zaalouk-fume",
    title: "زعلوك الباذنجان والطماطم بالتوابل",
    category: "سلطات ومقبلات",
    duration: "30 دقيقة",
    rating: "4.7",
    summary:
      "مقبلات مغربية غنية بالكمون والتحميرة والثوم وزيت الزيتون تقدم دافئة أو باردة.",
  },
];

export default function FeaturedRecipesSection() {
  return (
    <section
      dir="rtl"
      className="border-t border-amber-800/20 bg-[#f3e1c7]/45 py-12 dark:border-amber-500/20 dark:bg-[#24170f]/45 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-extrabold tracking-wide text-emerald-900 dark:text-emerald-300">
              مختارات المطبخ
            </span>
            <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50 sm:text-3xl">
              أحدث الوصفات المميزة
            </h2>
          </div>

          <Link
            href="/recipes"
            className="rounded-full border border-amber-800/35 bg-white/80 px-4 py-2 text-xs font-extrabold text-stone-900 transition hover:border-amber-700 hover:bg-white dark:border-amber-400/30 dark:bg-stone-900/80 dark:text-amber-200 dark:hover:border-amber-400 sm:text-sm"
          >
            كل الوصفات
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-800/25 bg-white/85 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-amber-700/60 dark:border-amber-500/25 dark:bg-[#24170f] dark:hover:border-amber-400/50"
            >
              <div>
                <div className="flex h-36 items-center justify-between bg-gradient-to-br from-red-800/15 via-amber-500/15 to-emerald-800/15 p-4 dark:from-red-900/30 dark:via-amber-600/20 dark:to-emerald-900/25">
                  <span className="self-start rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-red-900 dark:bg-stone-900/90 dark:text-amber-300">
                    {recipe.category}
                  </span>
                  <span className="self-end rounded-full bg-amber-600/20 px-2.5 py-1 text-xs font-black text-amber-950 dark:bg-amber-400/20 dark:text-amber-200">
                    ★ {recipe.rating}
                  </span>
                </div>

                <div className="space-y-2.5 p-5">
                  <h3 className="text-lg font-black leading-snug text-stone-950 dark:text-amber-50">
                    {recipe.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                    {recipe.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-amber-800/15 px-5 py-3.5 text-xs font-extrabold dark:border-amber-500/15">
                <span className="text-stone-700 dark:text-stone-300">
                  المدة: {recipe.duration}
                </span>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-red-800 underline-offset-4 hover:underline dark:text-amber-300"
                >
                  تفاصيل الوصفة ←
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}