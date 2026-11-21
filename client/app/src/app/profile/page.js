"use client";

import { useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSavedSection from "@/components/profile/ProfileSavedSection";

const initialMember = {
  fullName: "عضو مذاق المغرب",
  initials: "م",
  city: "تاوريرت",
  favoriteStyle: "الطواجن والأطباق الأصيلة",
  badge: "عضو نشط",
  bio: "مهتم بتحضير الأطباق المغربية التقليدية وتجربة الوصفات الأصيلة وحفظ المفضلة للرجوع إليها وقت التحضير.",
};

const initialSavedRecipes = [
  {
    id: "tajine-lahem-barqoq",
    title: "طاجين اللحم بالبرقوق واللوز",
    categoryLabel: "طواجن مغربية",
    duration: "ساعتان",
    summary: "تناغم غني بين اللحم الطري والبرقوق المعسّل واللوز المحمّر مع لمسة الزعفران والقرفة.",
  },
  {
    id: "couscous-7-khodar",
    title: "كسكس بالسبع خضار",
    categoryLabel: "أطباق رئيسية",
    duration: "ساعة و45 دقيقة",
    summary: "طبق الجمعة المغربي الأصيل بمرق متوازن وخضار موسمية طازجة وسميد مفلفل بعناية.",
  },
];

export default function ProfilePage() {
  const [member, setMember] = useState(initialMember);
  const [savedRecipes, setSavedRecipes] = useState(initialSavedRecipes);

  function handleRemoveSaved(recipeId) {
    setSavedRecipes((prev) => prev.filter((item) => item.id !== recipeId));
  }

  function handleUpdateMember(updated) {
    const cleanName = updated.fullName || member.fullName;
    const firstChar = cleanName.trim().charAt(0) || "م";

    setMember((prev) => ({
      ...prev,
      ...updated,
      initials: firstChar,
    }));
  }

  return (
    <section
      dir="rtl"
      className="min-h-screen bg-[#faf4ea] py-12 text-stone-900 dark:bg-[#17110c] dark:text-amber-50 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          <ProfileHeader
            member={member}
            savedCount={savedRecipes.length}
            reviewsCount={3}
          />
          <ProfileSavedSection
            savedRecipes={savedRecipes}
            onRemoveSaved={handleRemoveSaved}
            member={member}
            onUpdateMember={handleUpdateMember}
          />
        </div>
      </div>
    </section>
  );
}