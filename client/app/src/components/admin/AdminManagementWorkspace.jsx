"use client";

import { useState } from "react";

export default function AdminManagementWorkspace({
  recipes,
  onAddRecipe,
  onToggleRecipeStatus,
  onDeleteRecipe,
  accounts,
  onToggleAccountStatus,
  onDeleteAccount,
  comments,
  onDeleteComment,
}) {
  const [activeTab, setActiveTab] = useState("recipes");
  const [notice, setNotice] = useState("");

  // حالة إدارة الوصفات
  const [recipeSearch, setRecipeSearch] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("طواجن مغربية");
  const [recipeDuration, setRecipeDuration] = useState("ساعة و30 دقيقة");
  const [recipeStatus, setRecipeStatus] = useState("منشورة");

  // حالة إدارة التعليقات
  const [commentFilter, setCommentFilter] = useState("all");

  function showNotice(text) {
    setNotice(text);
  }

  function handleCreateRecipe(e) {
    e.preventDefault();
    const cleanTitle = recipeTitle.trim();
    if (!cleanTitle) {
      showNotice("يرجى إدخال عنوان الوصفة قبل الإضافة.");
      return;
    }

    onAddRecipe({
      id: `recipe-${Date.now()}`,
      title: cleanTitle,
      category: recipeCategory,
      duration: recipeDuration.trim() || "ساعة",
      status: recipeStatus,
    });

    setRecipeTitle("");
    showNotice(`تمت إضافة الوصفة "${cleanTitle}" إلى قائمة الوصفات.`);
  }

  const filteredRecipes = recipes.filter((item) => {
    const q = recipeSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const filteredComments = comments.filter((comment) => {
    if (commentFilter === "poor") return comment.isPoor;
    if (commentFilter === "good") return !comment.isPoor;
    return true;
  });

  const poorCommentsCount = comments.filter((c) => c.isPoor).length;

  return (
    <div
      dir="rtl"
      className="rounded-3xl border-2 border-amber-800/30 bg-[#f3e1c7]/65 p-6 shadow-sm dark:border-amber-500/30 dark:bg-[#24170f]/80 sm:p-8"
    >
      {/* شريط التبويبات الرئيسية */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-800/20 pb-5 dark:border-amber-500/20">
        <div>
          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            أدوات التحكم الإدارية
          </span>
          <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50">
            {activeTab === "recipes" && "إدارة الوصفات"}
            {activeTab === "accounts" && "إدارة الحسابات"}
            {activeTab === "comments" && "إدارة التعليقات"}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 rounded-2xl border border-amber-800/25 bg-white/80 p-1.5 dark:border-amber-500/25 dark:bg-stone-900/80">
          <button
            type="button"
            onClick={() => {
              setActiveTab("recipes");
              setNotice("");
            }}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition sm:text-sm ${
              activeTab === "recipes"
                ? "bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
                : "text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-amber-100"
            }`}
          >
            الوصفات ({recipes.length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("accounts");
              setNotice("");
            }}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition sm:text-sm ${
              activeTab === "accounts"
                ? "bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
                : "text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-amber-100"
            }`}
          >
            الحسابات ({accounts.length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("comments");
              setNotice("");
            }}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition sm:text-sm ${
              activeTab === "comments"
                ? "bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
                : "text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-amber-100"
            }`}
          >
            التعليقات ({comments.length})
          </button>
        </div>
      </div>

      {/* إشعار الإجراءات الإدارية */}
      {notice && (
        <div
          role="status"
          className="mt-5 rounded-2xl border border-emerald-700/35 bg-emerald-800/10 p-3.5 text-xs font-extrabold text-emerald-950 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200 sm:text-sm"
        >
          {notice}
        </div>
      )}

      {/* 1. قسم إدارة الوصفات */}
      {activeTab === "recipes" && (
        <div className="mt-6 space-y-6">
          <form
            onSubmit={handleCreateRecipe}
            className="grid grid-cols-1 gap-4 rounded-2xl border border-amber-800/20 bg-white/80 p-5 dark:border-amber-500/20 dark:bg-stone-900/70 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <label
                htmlFor="new-recipe-title"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                عنوان الوصفة الجديدة
              </label>
              <input
                id="new-recipe-title"
                type="text"
                value={recipeTitle}
                onChange={(e) => setRecipeTitle(e.target.value)}
                placeholder="مثال: رفاسة الدجاج البلدي"
                className="w-full rounded-xl border border-amber-800/25 bg-white px-3.5 py-2.5 text-sm font-bold text-stone-950 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-950/70 dark:text-amber-50"
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="new-recipe-category"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                التصنيف
              </label>
              <select
                id="new-recipe-category"
                value={recipeCategory}
                onChange={(e) => setRecipeCategory(e.target.value)}
                className="w-full rounded-xl border border-amber-800/25 bg-white px-3.5 py-2.5 text-sm font-bold text-stone-950 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-950/70 dark:text-amber-50"
              >
                <option value="طواجن مغربية">طواجن مغربية</option>
                <option value="أطباق رئيسية">أطباق رئيسية</option>
                <option value="مخبوزات ومملحات">مخبوزات ومملحات</option>
                <option value="حلويات وشاي">حلويات وشاي</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="new-recipe-duration"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                المدة
              </label>
              <input
                id="new-recipe-duration"
                type="text"
                value={recipeDuration}
                onChange={(e) => setRecipeDuration(e.target.value)}
                className="w-full rounded-xl border border-amber-800/25 bg-white px-3.5 py-2.5 text-sm font-bold text-stone-950 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-950/70 dark:text-amber-50"
              />
            </div>

            <div className="md:col-span-3 flex flex-col justify-end">
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="new-recipe-status"
                  className="text-xs font-extrabold text-stone-800 dark:text-amber-200"
                >
                  الحالة
                </label>
                <select
                  id="new-recipe-status"
                  value={recipeStatus}
                  onChange={(e) => setRecipeStatus(e.target.value)}
                  className="rounded-lg border border-amber-800/25 bg-white px-2 py-1 text-xs font-bold text-stone-900 dark:border-amber-500/25 dark:bg-stone-950 dark:text-amber-100"
                >
                  <option value="منشورة">منشورة</option>
                  <option value="مسودة">مسودة</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-4 py-2.5 text-xs font-black text-amber-50 transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950 sm:text-sm"
              >
                + إضافة وصفة
              </button>
            </div>
          </form>

          <div>
            <input
              type="text"
              value={recipeSearch}
              onChange={(e) => setRecipeSearch(e.target.value)}
              placeholder="ابحث عن وصفة بالعنوان أو التصنيف..."
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50"
            />
          </div>

          <div className="space-y-3">
            {filteredRecipes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-amber-800/30 bg-white/75 p-6 text-center text-sm font-bold text-stone-700 dark:border-amber-500/30 dark:bg-stone-900/65 dark:text-stone-300">
                لا توجد وصفات مطابقة للبحث الحالي.
              </div>
            ) : (
              filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-800/20 bg-white/85 p-4 dark:border-amber-500/20 dark:bg-stone-900/75"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-black text-stone-950 dark:text-amber-50">
                        {recipe.title}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-0.5 text-[11px] font-extrabold ${
                          recipe.status === "منشورة"
                            ? "bg-emerald-800/15 text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-200"
                            : "bg-amber-600/20 text-amber-950 dark:bg-amber-500/20 dark:text-amber-200"
                        }`}
                      >
                        {recipe.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-stone-600 dark:text-stone-400">
                      {recipe.category} • مدة التحضير: {recipe.duration}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onToggleRecipeStatus(recipe.id);
                        showNotice(`تم تحديث حالة الوصفة "${recipe.title}".`);
                      }}
                      className="rounded-full border border-amber-800/25 px-3.5 py-1.5 text-xs font-extrabold text-stone-800 transition hover:bg-amber-500/15 dark:border-amber-500/25 dark:text-amber-200"
                    >
                      {recipe.status === "منشورة" ? "تحويل لمسودة" : "نشر الوصفة"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onDeleteRecipe(recipe.id);
                        showNotice(`تم حذف الوصفة "${recipe.title}".`);
                      }}
                      className="rounded-full border border-red-800/25 px-3.5 py-1.5 text-xs font-extrabold text-red-800 transition hover:bg-red-800/10 dark:border-red-400/25 dark:text-red-300"
                    >
                      حذف الوصفة
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 2. قسم إدارة الحسابات (إغلاق الحساب أو حذفه) */}
      {activeTab === "accounts" && (
        <div className="mt-6 space-y-3">
          {accounts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-amber-800/30 bg-white/75 p-6 text-center text-sm font-bold text-stone-700 dark:border-amber-500/30 dark:bg-stone-900/65 dark:text-stone-300">
              لا توجد حسابات أعضاء مسجلة حالياً.
            </div>
          ) : (
            accounts.map((account) => {
              const isClosed = account.status === "مغلق";
              return (
                <div
                  key={account.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-800/20 bg-white/85 p-4 dark:border-amber-500/20 dark:bg-stone-900/75"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-black text-stone-950 dark:text-amber-50">
                        {account.name}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-0.5 text-[11px] font-extrabold ${
                          isClosed
                            ? "bg-red-800/15 text-red-900 dark:bg-red-500/20 dark:text-red-200"
                            : "bg-emerald-800/15 text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-200"
                        }`}
                      >
                        {account.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-stone-600 dark:text-stone-400">
                      @{account.username} • {account.city} • {account.savedCount} وصفات محفوظة
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onToggleAccountStatus(account.id);
                        showNotice(
                          isClosed
                            ? `تم إعادة فتح حساب "${account.name}".`
                            : `تم إغلاق حساب "${account.name}".`
                        );
                      }}
                      className="rounded-full border border-amber-800/25 px-3.5 py-1.5 text-xs font-extrabold text-stone-800 transition hover:bg-amber-500/15 dark:border-amber-500/25 dark:text-amber-200"
                    >
                      {isClosed ? "إعادة فتح الحساب" : "إغلاق الحساب"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onDeleteAccount(account.id);
                        showNotice(`تم حذف حساب "${account.name}" نهائياً.`);
                      }}
                      className="rounded-full border border-red-800/30 bg-red-800/10 px-3.5 py-1.5 text-xs font-extrabold text-red-900 transition hover:bg-red-800/20 dark:border-red-400/30 dark:bg-red-500/15 dark:text-red-200"
                    >
                      حذف الحساب
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 3. قسم إدارة التعليقات (خصوصاً حذف التعليقات غير الجيدة) */}
      {activeTab === "comments" && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCommentFilter("all")}
                className={`rounded-full px-4 py-1.5 text-xs font-extrabold transition ${
                  commentFilter === "all"
                    ? "bg-stone-900 text-amber-50 dark:bg-amber-400 dark:text-stone-950"
                    : "border border-amber-800/25 bg-white/80 text-stone-700 dark:border-amber-500/25 dark:bg-stone-900/70 dark:text-stone-300"
                }`}
              >
                الكل ({comments.length})
              </button>

              <button
                type="button"
                onClick={() => setCommentFilter("poor")}
                className={`rounded-full px-4 py-1.5 text-xs font-extrabold transition ${
                  commentFilter === "poor"
                    ? "bg-red-800 text-amber-50 dark:bg-red-500 dark:text-white"
                    : "border border-red-800/25 bg-white/80 text-red-900 dark:border-red-400/25 dark:bg-stone-900/70 dark:text-red-300"
                }`}
              >
                تعليقات غير جيدة ({poorCommentsCount})
              </button>

              <button
                type="button"
                onClick={() => setCommentFilter("good")}
                className={`rounded-full px-4 py-1.5 text-xs font-extrabold transition ${
                  commentFilter === "good"
                    ? "bg-emerald-900 text-amber-50 dark:bg-emerald-500 dark:text-stone-950"
                    : "border border-emerald-800/25 bg-white/80 text-emerald-900 dark:border-emerald-400/25 dark:bg-stone-900/70 dark:text-emerald-300"
                }`}
              >
                تعليقات إيجابية ({comments.length - poorCommentsCount})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredComments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-amber-800/30 bg-white/75 p-6 text-center text-sm font-bold text-stone-700 dark:border-amber-500/30 dark:bg-stone-900/65 dark:text-stone-300">
                لا توجد تعليقات في هذا التصنيف حالياً.
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`flex flex-wrap items-start justify-between gap-4 rounded-2xl border p-4 ${
                    comment.isPoor
                      ? "border-red-800/35 bg-red-800/10 dark:border-red-400/35 dark:bg-red-500/15"
                      : "border-amber-800/20 bg-white/85 dark:border-amber-500/20 dark:bg-stone-900/75"
                  }`}
                >
                  <div className="max-w-2xl space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-black text-stone-950 dark:text-amber-50">
                        {comment.author}
                      </span>
                      <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
                        على وصفة: {comment.recipeTitle}
                      </span>
                      {comment.isPoor && (
                        <span className="rounded-full bg-red-800 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-50 dark:bg-red-500 dark:text-white">
                          تعليق غير جيد
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                      “{comment.content}”
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onDeleteComment(comment.id);
                      showNotice(
                        comment.isPoor
                          ? `تم حذف التعليق غير الجيد للعضو "${comment.author}".`
                          : `تم حذف تعليق العضو "${comment.author}".`
                      );
                    }}
                    className="rounded-full bg-red-800 px-4 py-2 text-xs font-black text-amber-50 transition hover:bg-red-900 dark:bg-red-600 dark:hover:bg-red-500"
                  >
                    {comment.isPoor ? "حذف التعليق غير الجيد" : "حذف التعليق"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}