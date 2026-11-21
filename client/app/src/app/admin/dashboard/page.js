"use client";

import { useState } from "react";
import AdminOverviewHeader from "@/components/admin/AdminOverviewHeader";
import AdminManagementWorkspace from "@/components/admin/AdminManagementWorkspace";

const initialRecipes = [
  {
    id: "tajine-lahem-barqoq",
    title: "طاجين اللحم بالبرقوق واللوز",
    category: "طواجن مغربية",
    duration: "ساعتان",
    status: "منشورة",
  },
  {
    id: "couscous-7-khodar",
    title: "كسكس بالسبع خضار",
    category: "أطباق رئيسية",
    duration: "ساعة و45 دقيقة",
    status: "منشورة",
  },
  {
    id: "pastilla-poulet-amandes",
    title: "بسطيلة الدجاج واللوز",
    category: "مخبوزات ومملحات",
    duration: "ساعة و30 دقيقة",
    status: "مسودة",
  },
];

const initialAccounts = [
  {
    id: "acc-1",
    name: "ياسين الفاسي",
    username: "yassine_chef",
    city: "فاس",
    savedCount: 7,
    status: "نشط",
  },
  {
    id: "acc-2",
    name: "سلمى المراكشية",
    username: "salma_marrakech",
    city: "مراكش",
    savedCount: 12,
    status: "نشط",
  },
  {
    id: "acc-3",
    name: "طارق الشرقاوي",
    username: "tariq_east",
    city: "وجدة",
    savedCount: 3,
    status: "مغلق",
  },
];

const initialComments = [
  {
    id: "cmt-1",
    author: "سلمى المراكشية",
    recipeTitle: "طاجين اللحم بالبرقوق واللوز",
    content: "وصفة ممتازة جداً، المقادير مضبوطة والنتيجة رائعة على المائدة.",
    isPoor: false,
  },
  {
    id: "cmt-2",
    author: "زائر_99",
    recipeTitle: "كسكس بالسبع خضار",
    content: "تعليق غير مفيد ومسيء يخرج عن سياق الوصفة ولا يضيف أي فائدة للقراء.",
    isPoor: true,
  },
  {
    id: "cmt-3",
    author: "مستخدم_مزعج",
    recipeTitle: "بسطيلة الدجاج واللوز",
    content: "محتوى دعائي مزعج وتعليق غير لائق يستوجب الحذف الفوري.",
    isPoor: true,
  },
];

export default function AdminDashboardPage() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [comments, setComments] = useState(initialComments);

  function handleAddRecipe(newRecipe) {
    setRecipes((prev) => [newRecipe, ...prev]);
  }

  function handleToggleRecipeStatus(recipeId) {
    setRecipes((prev) =>
      prev.map((item) =>
        item.id === recipeId
          ? {
              ...item,
              status: item.status === "منشورة" ? "مسودة" : "منشورة",
            }
          : item
      )
    );
  }

  function handleDeleteRecipe(recipeId) {
    setRecipes((prev) => prev.filter((item) => item.id !== recipeId));
  }

  function handleToggleAccountStatus(accountId) {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId
          ? {
              ...acc,
              status: acc.status === "نشط" ? "مغلق" : "نشط",
            }
          : acc
      )
    );
  }

  function handleDeleteAccount(accountId) {
    setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
  }

  function handleDeleteComment(commentId) {
    setComments((prev) => prev.filter((cmt) => cmt.id !== commentId));
  }

  const publishedRecipes = recipes.filter((r) => r.status === "منشورة").length;
  const draftRecipes = recipes.length - publishedRecipes;
  const activeAccounts = accounts.filter((a) => a.status === "نشط").length;
  const closedAccounts = accounts.length - activeAccounts;
  const flaggedComments = comments.filter((c) => c.isPoor).length;

  const stats = {
    totalRecipes: recipes.length,
    publishedRecipes,
    draftRecipes,
    totalAccounts: accounts.length,
    activeAccounts,
    closedAccounts,
    totalComments: comments.length,
    flaggedComments,
  };

  return (
    <section
      dir="rtl"
      className="min-h-screen bg-[#faf4ea] py-12 text-stone-900 dark:bg-[#17110c] dark:text-amber-50 sm:py-16"
    >
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <AdminOverviewHeader stats={stats} />
        <AdminManagementWorkspace
          recipes={recipes}
          onAddRecipe={handleAddRecipe}
          onToggleRecipeStatus={handleToggleRecipeStatus}
          onDeleteRecipe={handleDeleteRecipe}
          accounts={accounts}
          onToggleAccountStatus={handleToggleAccountStatus}
          onDeleteAccount={handleDeleteAccount}
          comments={comments}
          onDeleteComment={handleDeleteComment}
        />
      </div>
    </section>
  );
}