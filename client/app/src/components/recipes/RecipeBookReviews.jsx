"use client";

import { useState } from "react";

export default function RecipeBookReviews({
  recipeTitle,
  reviews,
  averageRating,
  onAddReview,
}) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedComment = comment.trim();

    if (!trimmedAuthor || !trimmedComment) {
      setError("يرجى كتابة الاسم وملاحظتك أو تقييمك للوصفة.");
      return;
    }

    onAddReview({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      author: trimmedAuthor,
      rating,
      comment: trimmedComment,
      date: "الآن",
    });

    setAuthor("");
    setRating(5);
    setComment("");
    setError("");
  }

  return (
    <section
      dir="rtl"
      aria-label="تقييمات ومراجعات الوصفة في الكتاب"
      className="mt-8 rounded-3xl border-2 border-amber-900/20 bg-[#f3e1c7]/65 p-6 shadow-sm dark:border-amber-500/20 dark:bg-[#24170f]/75 sm:p-8"
    >
      {/* رأس قسم المراجعات */}
      <div className="flex flex-col justify-between gap-4 border-b border-amber-800/20 pb-5 dark:border-amber-500/20 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            هوامش القراء والطهاة
          </span>
          <h3 className="mt-1 text-xl font-black text-stone-950 dark:text-amber-50 sm:text-2xl">
            تقييمات ومراجعات: {recipeTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start rounded-2xl border border-amber-800/25 bg-white/85 px-4 py-2 dark:border-amber-500/25 dark:bg-stone-900/85 sm:self-auto">
          <span className="text-base font-black text-amber-600 dark:text-amber-400">
            ★ {averageRating}
          </span>
          <span className="text-xs font-extrabold text-stone-700 dark:text-stone-300">
            ({reviews.length} {reviews.length === 1 ? "مراجعة" : "مراجعات"})
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* قائمة المراجعات المسجلة في هامش الكتاب */}
        <div className="space-y-4 lg:col-span-7">
          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-amber-800/25 bg-white/60 p-6 text-center text-sm font-bold text-stone-700 dark:border-amber-500/25 dark:bg-stone-900/50 dark:text-stone-300">
              لا توجد مراجعات لهذه الوصفة بعد. كن أول من يدوّن ملاحظته في هذا
              الدفتر!
            </div>
          ) : (
            reviews.map((rev) => (
              <article
                key={rev.id}
                className="rounded-2xl border border-amber-800/20 bg-white/80 p-4 shadow-2xs dark:border-amber-500/20 dark:bg-stone-900/75"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-800/15 text-xs font-black text-red-950 dark:bg-amber-500/20 dark:text-amber-300">
                      {rev.author.slice(0, 1)}
                    </span>
                    <div>
                      <p className="text-sm font-black text-stone-950 dark:text-amber-50">
                        {rev.author}
                      </p>
                      <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                        {rev.date}
                      </p>
                    </div>
                  </div>

                  <div
                    aria-label={`التقييم ${rev.rating} من 5`}
                    className="rounded-full bg-amber-600/15 px-3 py-1 text-xs font-black text-amber-900 dark:bg-amber-400/15 dark:text-amber-300"
                  >
                    {"★".repeat(rev.rating)}
                    <span className="opacity-35">{"★".repeat(5 - rev.rating)}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {rev.comment}
                </p>
              </article>
            ))
          )}
        </div>

        {/* نموذج إضافة مراجعة جديدة */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-amber-800/25 bg-white/85 p-5 dark:border-amber-500/25 dark:bg-stone-900/85"
          >
            <h4 className="text-base font-black text-stone-950 dark:text-amber-50">
              أضف ملاحظتك أو تقييمك
            </h4>

            <div>
              <label
                htmlFor="reviewer-name"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                الاسم
              </label>
              <input
                id="reviewer-name"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="مثال: سلمى، أم ياسين..."
                className="w-full rounded-xl border border-amber-800/25 bg-[#faf4ea] px-3.5 py-2 text-sm font-bold text-stone-900 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-[#17110c] dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
              />
            </div>

            <div>
              <span className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200">
                التقييم بالنجوم
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const active = starValue <= rating;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      aria-label={`${starValue} نجوم`}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border text-base transition ${
                        active
                          ? "border-amber-600 bg-amber-500/20 text-amber-700 dark:border-amber-400 dark:bg-amber-400/20 dark:text-amber-300"
                          : "border-amber-800/20 bg-transparent text-stone-400 hover:border-amber-700/40 dark:border-amber-500/20 dark:text-stone-500"
                      }`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="review-comment"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                ملاحظتك أو تجربتك مع الوصفة
              </label>
              <textarea
                id="review-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="شاركنا رأيك في النكهات أو نصيحة للتحضير..."
                className="w-full rounded-xl border border-amber-800/25 bg-[#faf4ea] px-3.5 py-2 text-sm font-semibold text-stone-900 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-[#17110c] dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
              />
            </div>

            {error && (
              <p className="text-xs font-extrabold text-red-700 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-5 py-2.5 text-sm font-extrabold text-amber-50 shadow-xs transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
            >
              تثبيت المراجعة في الدفتر
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}