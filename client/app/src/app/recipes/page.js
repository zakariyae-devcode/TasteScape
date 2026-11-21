"use client";

import { useMemo, useState } from "react";
import RecipeBookHeader from "@/components/recipes/RecipeBookHeader";
import RecipeBookSpread from "@/components/recipes/RecipeBookSpread";
import RecipeBookReviews from "@/components/recipes/RecipeBookReviews";
import RecipeBookControls from "@/components/recipes/RecipeBookControls";

const initialRecipes = [
  {
    id: "tajine-lahm-barqoq",
    title: "طاجين اللحم بالبرقوق واللوز",
    category: "mains",
    categoryLabel: "أطباق رئيسية وطواجن",
    duration: "75 دقيقة",
    difficulty: "متوسط",
    summary:
      "طبق مغربي عريق يجمع بين طراوة اللحم المتبل بالزعفران والزنجبيل وحلاوة البرقوق المعسل مع قرمشة اللوز المحمر.",
    ingredients: [
      "1 كغ لحم بقر أو غنم مقطع قطعاً متوسطة",
      "250 غ برقوق مجفف و100 غ لوز مقشر ومحمر",
      "بصلتان مفرومتان ناعماً وفصا ثوم مهروسان",
      "ملعقة صغيرة زعفران حر منقوع، زنجبيل، قرفة، كركم، وملح",
      "3 ملاعق زيت زيتون، ملعقتا عسل، وقليل من السمسم",
    ],
    steps: [
      "تُتبل قطع اللحم بالتوابل والزعفران والثوم والزيت ثم تُشوح على نار هادئة في الطاجين مع البصل حتى تكتسب لوناً ذهبياً.",
      "يُضاف قليل من الماء المغلي ويُغطى الطاجين بإحكام وتُترك المكونات لتنضج ببطء حتى يطرى اللحم وتتكثف المرقة.",
      "في قدر صغير، يُسلق البرقوق مع قليل من مرق الطاجين والقرفة والعسل حتى يتعسل ويلمع.",
      "يُقدم الطاجين ساخناً مزيناً بالبرقوق المعسل واللوز المحمر والسمسم.",
    ],
    initialReviews: [
      {
        id: "rev-1",
        author: "خديجة",
        rating: 5,
        comment:
          "توازن رائع بين التوابل وحلاوة البرقوق، جاء اللحم طرياً جداً والمرقة خفيفة وموزونة.",
        date: "منذ يومين",
      },
      {
        id: "rev-2",
        author: "يوسف",
        rating: 5,
        comment:
          "خطوات واضحة وسهلة حتى لمن يجرب الطاجين للمرة الأولى في المنزل.",
        date: "منذ أسبوع",
      },
    ],
  },
  {
    id: "couscous-sept-legumes",
    title: "كسكس بالسبعة خضار والمرق الأصيل",
    category: "mains",
    categoryLabel: "أطباق رئيسية وطواجن",
    duration: "90 دقيقة",
    difficulty: "متوسط",
    summary:
      "حبات كسكس خفيفة ومفورة بعناية تُقدم مع تشكيلة خضار مغربية ومرق عطري بالسمن والزعفران.",
    ingredients: [
      "500 غ كسكس متوسط الحبة",
      "جزر، لفت، قرع أحمر، كوسا، ملفوف، وطماطم مبشورة",
      "حمص منقوع مسبقاً وبصلة مفرومة",
      "زنجبيل، كركم، فلفل أسود، ملح، زيت زيتون، وملعقة سمن بلدي",
      "ربطة قزبر وبقدونس مفرومة",
    ],
    steps: [
      "يُطهى اللحم أو الحمص مع البصل والطماطم والتوابل والزيت في قاع قدر الكسكاس مع إضافة الماء الكافي.",
      "يُدهن الكسكس بقليل من الزيت والماء ويُبخر في الكسكاس على ثلاث تفويرات مع رشه بالماء بين كل مرحلة.",
      "تُضاف الخضار تدريجياً حسب سرعة نضجها حتى تكتمل حلاوة المرق وقوام الخضار.",
      "يُخلط الكسكس بالسمن ويُرتب في قصعة التقديم وتُوزع فوقه الخضار والمرق الساخن.",
    ],
    initialReviews: [
      {
        id: "rev-3",
        author: "أمينة",
        rating: 5,
        comment:
          "طريقة التفوير وشرح إضافة الخضار حسب وقت النضج جعلت حبات الكسكس متماسكة وخفيفة.",
        date: "منذ 4 أيام",
      },
    ],
  },
  {
    id: "briouates-amandes",
    title: "بريوات باللوز وماء الزهر والعسل",
    category: "sweets",
    categoryLabel: "حلويات مغربية",
    duration: "45 دقيقة",
    difficulty: "سهل",
    summary:
      "مثلثات مقرمشة من ورقة البسطيلة محشوة بعقدة اللوز المعطرة بماء الزهر والقرفة ومغموسة في العسل.",
    ingredients: [
      "500 غ لوز مقشر ومطحون ناعماً مع 120 غ سكر",
      "ورقة بسطيلة مقطعة شرائط متساوية",
      "ملعقة صغيرة قرفة مطحونة وملعقتان زبدة مذابة",
      "ملعقتان كبيرتان ماء زهر ومستكة مطحونة بقليل من السكر",
      "عسل دافئ للتغطية وزيت للقلي أو الخبز في الفرن",
    ],
    steps: [
      "تُخلط بودرة اللوز مع السكر والقرفة والزبدة وماء الزهر حتى تتكون عجينة متماسكة سهلة التشكيل.",
      "تُشكل كرات صغيرة من الحشوة وتُلف داخل شرائط الورقة على شكل مثلثات وتُثبت أطرافها بقليل من الدقيق والماء.",
      "تُقلى البريوات في زيت متوسط الحرارة أو تُدهن بالزبدة وتُخبز في الفرن حتى تكتسب لوناً ذهبياً.",
      "تُغمس مباشرة وهي ساخنة في العسل الدافئ وتُصفى جيداً قبل التقديم.",
    ],
    initialReviews: [
      {
        id: "rev-4",
        author: "سلمى",
        rating: 5,
        comment:
          "رائحة ماء الزهر مع القرفة لا تُقاوم، وتجربة خبزها في الفرن أعطت نتيجة خفيفة ومقرمشة.",
        date: "منذ 5 أيام",
      },
    ],
  },
  {
    id: "zaalouk-fume",
    title: "زعلوك الباذنجان والطماطم بالتوابل",
    category: "salads",
    categoryLabel: "سلطات ومقبلات",
    duration: "30 دقيقة",
    difficulty: "سهل",
    summary:
      "مقبلات مغربية غنية بنكهة الباذنجان والطماطم مع الكمون والتحميرة والثوم وزيت الزيتون.",
    ingredients: [
      "3 حبات باذنجان متوسطة و3 حبات طماطم ناضجة",
      "3 فصوص ثوم مفرومة وملعقتان كبيرتان قزبر وبقدونس",
      "ملعقة صغيرة كمون، ملعقة صغيرة تحميرة (بابريكا)، وملح",
      "رشة فلفل حار حسب الرغبة و4 ملاعق زيت زيتون",
    ],
    steps: [
      "يُشوى الباذنجان أو يُقشر ويُقطع مكعبات صغيرة مع تقشير الطماطم وفرمها.",
      "في مقلاة على نار متوسطة، يُشوح الثوم مع التوابل وزيت الزيتون لبضع ثوانٍ دون أن يحترق.",
      "تُضاف الطماطم والباذنجان وتُهرس المكونات جزئياً مع التحريك حتى تتبخر السوائل وتتركز النكهات.",
      "يُضاف القزبر والبقدونس في النهاية ويُقدم الزعلوك دافئاً أو بارداً مع الخبز.",
    ],
    initialReviews: [
      {
        id: "rev-5",
        author: "مراد",
        rating: 4,
        comment:
          "سريع التحضير ومرافق ممتاز لأطباق المشاوي والطواجن.",
        date: "منذ أسبوعين",
      },
    ],
  },
  {
    id: "atay-naanaa-maroc",
    title: "أتاي مغربي بالنعناع الطازج على أصوله",
    category: "drinks",
    categoryLabel: "شاي ومشروبات تقليدية",
    duration: "15 دقيقة",
    difficulty: "سهل",
    summary:
      "الشاي الأخضر المغربي برغوته المميزة ونفحات النعناع الطازج الذي يجمع بين الانتعاش والدفء.",
    ingredients: [
      "ملعقتان كبيرتان شاي أخضر حبوب (شينوة)",
      "باقة نعناع طازج مغسول جيداً",
      "سكر حسب الرغبة (أو بديل طبيعي مناسب)",
      "ماء مغلي نقي",
    ],
    steps: [
      "يُوضع الشاي الأخضر في الإبريق ويُضاف إليه قليل من الماء المغلي ثم يُحرك برفق ويُسكب الماء الأول لشطف أوراق الشاي.",
      "يُضاف السكر والماء المغلي ويُترك الإبريق على نار هادئة لبضع دقائق حتى ينعقد الشاي ويظهر لونه الكهرماني.",
      "يُضاف النعناع الطازج في النهاية ويُترك لدقيقتين لكي يحتفظ بنكهته المنعشة دون أن يذبل بشدة.",
      "يُسكب في الكؤوس من ارتفاع مناسب لتكوين رغوة خفيفة ويُقدم فوراً.",
    ],
    initialReviews: [
      {
        id: "rev-6",
        author: "إدريس",
        rating: 5,
        comment:
          "شطف الشاي أولاً وإضافة النعناع في آخر لحظة يحافظان على صفاء النكهة ورغوة الكأس.",
        date: "منذ 3 أيام",
      },
    ],
  },
];

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsByRecipe, setReviewsByRecipe] = useState(() => {
    const map = {};
    for (const r of initialRecipes) {
      map[r.id] = r.initialReviews;
    }
    return map;
  });

  const filteredRecipes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return initialRecipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === "all" || recipe.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const inTitle = recipe.title.toLowerCase().includes(q);
      const inSummary = recipe.summary.toLowerCase().includes(q);
      const inIngredients = recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(q)
      );
      return inTitle || inSummary || inIngredients;
    });
  }, [selectedCategory, searchQuery]);

  const safeIndex =
    filteredRecipes.length === 0
      ? 0
      : Math.min(currentIndex, filteredRecipes.length - 1);

  const currentRecipe = filteredRecipes[safeIndex] || null;

  const currentReviews = currentRecipe
    ? reviewsByRecipe[currentRecipe.id] || []
    : [];

  const averageRating = useMemo(() => {
    if (!currentReviews.length) return "5.0";
    const sum = currentReviews.reduce((acc, item) => acc + item.rating, 0);
    return (sum / currentReviews.length).toFixed(1);
  }, [currentReviews]);

  function handleSelectCategory(categoryId) {
    setSelectedCategory(categoryId);
    setCurrentIndex(0);
  }

  function handleSearchChange(value) {
    setSearchQuery(value);
    setCurrentIndex(0);
  }

  function handleAddReview(newReview) {
    if (!currentRecipe) return;
    setReviewsByRecipe((prev) => ({
      ...prev,
      [currentRecipe.id]: [newReview, ...(prev[currentRecipe.id] || [])],
    }));
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#faf4ea] pb-14 text-stone-900 dark:bg-[#17110c] dark:text-amber-50"
    >
      <RecipeBookHeader
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalCount={initialRecipes.length}
      />

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <RecipeBookSpread
          recipe={currentRecipe}
          averageRating={averageRating}
          reviewsCount={currentReviews.length}
        />

        <RecipeBookControls
          recipes={filteredRecipes}
          currentIndex={safeIndex}
          onPrevPage={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          onNextPage={() =>
            setCurrentIndex((prev) =>
              Math.min(filteredRecipes.length - 1, prev + 1)
            )
          }
          onSelectPage={(idx) => setCurrentIndex(idx)}
        />

        {currentRecipe && (
          <RecipeBookReviews
            recipeTitle={currentRecipe.title}
            reviews={currentReviews}
            averageRating={averageRating}
            onAddReview={handleAddReview}
          />
        )}
      </div>
    </div>
  );
}