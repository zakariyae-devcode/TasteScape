"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfileSavedSection({
  savedRecipes,
  onRemoveSaved,
  member,
  onUpdateMember,
}) {
  const [activeTab, setActiveTab] = useState("saved");
  const [fullName, setFullName] = useState(member.fullName);
  const [city, setCity] = useState(member.city);
  const [favoriteStyle, setFavoriteStyle] = useState(member.favoriteStyle);
  const [bio, setBio] = useState(member.bio);
  const [saveMessage, setSaveMessage] = useState("");

  function handleProfileSave(e) {
    e.preventDefault();
    if (!fullName.trim()) {
      setSaveMessage("يرجى إدخال الاسم الكامل قبل حفظ التعديلات.");
      return;
    }

    onUpdateMember({
      fullName: fullName.trim(),
      city: city.trim() || "المغرب",
      favoriteStyle: favoriteStyle.trim() || "أطباق مغربية أصيلة",
      bio: bio.trim(),
    });

    setSaveMessage("تم تحديث بيانات الملف الشخصي بنجاح.");
  }

  return (
    <div
      dir="rtl"
      className="rounded-3xl border-2 border-amber-800/25 bg-[#f3e1c7]/60 p-6 shadow-sm dark:border-amber-500/25 dark:bg-[#24170f]/75 sm:p-8 lg:col-span-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-800/20 pb-5 dark:border-amber-500/20">
        <div>
          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            مساحة العضو في مذاق المغرب
          </span>
          <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50">
            {activeTab === "saved" ? "الوصفات المحفوظة" : "تعديل بيانات الحساب"}
          </h2>
        </div>

        <div className="inline-flex rounded-full border border-amber-800/25 bg-white/80 p-1 dark:border-amber-500/25 dark:bg-stone-900/80">
          <button
            type="button"
            onClick={() => {
              setActiveTab("saved");
              setSaveMessage("");
            }}
            className={`rounded-full px-4 py-2 text-xs font-extrabold transition sm:text-sm ${
              activeTab === "saved"
                ? "bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
                : "text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-amber-100"
            }`}
          >
            الوصفات المحفوظة ({savedRecipes.length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("settings");
              setSaveMessage("");
            }}
            className={`rounded-full px-4 py-2 text-xs font-extrabold transition sm:text-sm ${
              activeTab === "settings"
                ? "bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
                : "text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-amber-100"
            }`}
          >
            إعدادات الحساب
          </button>
        </div>
      </div>

      {activeTab === "saved" ? (
        <div className="mt-6">
          {savedRecipes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-amber-800/30 bg-white/75 p-8 text-center dark:border-amber-500/30 dark:bg-stone-900/60">
              <p className="text-sm font-extrabold text-stone-800 dark:text-amber-100">
                لا توجد وصفات محفوظة في قائمتك حالياً.
              </p>
              <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400">
                تصفح دفتر الوصفات واختر الأطباق التي تود الرجوع إليها لاحقاً.
              </p>
              <Link
                href="/recipes"
                className="mt-4 inline-block rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-2.5 text-xs font-black text-amber-50 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
              >
                اكتشف الوصفات
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {savedRecipes.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-amber-800/20 bg-white/85 p-5 dark:border-amber-500/20 dark:bg-stone-900/75"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-amber-600/15 px-3 py-1 text-[11px] font-extrabold text-red-900 dark:bg-amber-500/15 dark:text-amber-300">
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
                        {item.duration}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-black text-stone-950 dark:text-amber-50">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-amber-800/15 pt-4 dark:border-amber-500/15">
                    <Link
                      href={`/recipes/${item.id}`}
                      className="text-xs font-extrabold text-emerald-900 transition hover:underline dark:text-emerald-300 sm:text-sm"
                    >
                      عرض الوصفة ←
                    </Link>

                    <button
                      type="button"
                      onClick={() => onRemoveSaved(item.id)}
                      className="rounded-full border border-red-800/25 px-3.5 py-1.5 text-xs font-extrabold text-red-800 transition hover:bg-red-800/10 dark:border-red-400/25 dark:text-red-300 dark:hover:bg-red-500/15"
                    >
                      إزالة من المحفوظات
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleProfileSave} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="profile-fullname"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
              >
                الاسم الكامل
              </label>
              <input
                id="profile-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:focus:border-amber-400"
              />
            </div>

            <div>
              <label
                htmlFor="profile-city"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
              >
                المدينة
              </label>
              <input
                id="profile-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="profile-style"
              className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
            >
              التصنيف المفضل في المطبخ المغربي
            </label>
            <input
              id="profile-style"
              type="text"
              value={favoriteStyle}
              onChange={(e) => setFavoriteStyle(e.target.value)}
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:focus:border-amber-400"
            />
          </div>

          <div>
            <label
              htmlFor="profile-bio"
              className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200 sm:text-sm"
            >
              نبذة تعريفية
            </label>
            <textarea
              id="profile-bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-2xl border border-amber-800/25 bg-white/90 px-4 py-3 text-sm font-bold text-stone-950 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/80 dark:text-amber-50 dark:focus:border-amber-400"
            />
          </div>

          {saveMessage && (
            <div
              role="status"
              className="rounded-2xl border border-emerald-700/35 bg-emerald-800/10 p-3.5 text-xs font-extrabold text-emerald-950 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200 sm:text-sm"
            >
              {saveMessage}
            </div>
          )}

          <button
            type="submit"
            className="rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-3 text-sm font-black text-amber-50 transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950"
          >
            حفظ التغييرات
          </button>
        </form>
      )}
    </div>
  );
}