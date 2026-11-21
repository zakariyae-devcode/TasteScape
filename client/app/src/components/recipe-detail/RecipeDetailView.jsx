"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import RecipeDetailHeader from "@/components/recipe-detail/RecipeDetailHeader";
import RecipeDetailContent from "@/components/recipe-detail/RecipeDetailContent";
import RecipeDetailReviews from "@/components/recipe-detail/RecipeDetailReviews";

export default function RecipeDetailView({ recipe }) {
  const [reviews, setReviews] = useState(recipe ? recipe.initialReviews : []);

  const averageRating = useMemo(() => {
    if (!reviews.length) return "5.0";
    const total = reviews.reduce((acc, item) => acc + item.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  function handleAddReview(newReview) {
    setReviews((prev) => [newReview, ...prev]);
  }

  if (!recipe) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[60vh] items-center justify-center bg-[#faf4ea] px-4 py-16 text-center text-stone-900 dark:bg-[#17110c] dark:text-amber-50"
      >
        <div className="max-w-md space-y-4 rounded-3xl border-2 border-amber-800/25 bg-[#f3e1c7]/80 p-8 dark:border-amber-500/25 dark:bg-[#24170f]/85">
          <h1 className="text-2xl font-black">لم يتم العثور على الوصفة</h1>
          <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            يبدو أن رابط الوصفة غير متوفر حالياً. يمكنك العودة إلى دفتر
            الوصفات واستعراض الأطباق المتاحة.
          </p>
          <Link
            href="/recipes"
            className="inline-block rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-2.5 text-sm font-extrabold text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
          >
            العودة إلى الوصفات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#faf4ea] pb-16 text-stone-900 dark:bg-[#17110c] dark:text-amber-50"
    >
      <RecipeDetailHeader
        recipe={recipe}
        averageRating={averageRating}
        reviewsCount={reviews.length}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RecipeDetailContent recipe={recipe} />
        <RecipeDetailReviews
          recipeTitle={recipe.title}
          reviews={reviews}
          averageRating={averageRating}
          onAddReview={handleAddReview}
        />
      </div>
    </div>
  );
}