import Link from "next/link";

export default function ProfileHeader({
  member,
  savedCount,
  reviewsCount,
}) {
  return (
    <div
      dir="rtl"
      className="flex flex-col justify-between rounded-3xl border-2 border-amber-800/25 bg-gradient-to-b from-[#f3e1c7]/85 to-[#f3e1c7]/50 p-6 shadow-xs dark:border-amber-500/25 dark:from-[#24170f] dark:to-[#24170f]/70 sm:p-8 lg:col-span-4"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-600/10 px-3.5 py-1 text-xs font-extrabold text-red-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
            <span className="h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            <span>الملف الشخصي</span>
          </span>

          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            {member.badge}
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-800/30 bg-gradient-to-br from-red-800 via-orange-700 to-amber-600 text-2xl font-black text-amber-50 shadow-xs dark:border-amber-400/35 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950">
            {member.initials}
          </div>

          <h1 className="mt-4 text-2xl font-black text-stone-950 dark:text-amber-50">
            {member.fullName}
          </h1>
          <p className="mt-1 text-xs font-bold text-stone-700 dark:text-stone-300 sm:text-sm">
            {member.city} — {member.favoriteStyle}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-stone-700 dark:text-stone-300 sm:text-sm">
            {member.bio}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-amber-800/20 pt-5 dark:border-amber-500/20">
          <div className="rounded-2xl border border-amber-800/20 bg-white/80 p-3.5 text-center dark:border-amber-500/20 dark:bg-stone-900/70">
            <span className="block text-xl font-black text-red-800 dark:text-amber-400">
              {savedCount}
            </span>
            <span className="mt-0.5 block text-xs font-extrabold text-stone-700 dark:text-stone-300">
              وصفات محفوظة
            </span>
          </div>

          <div className="rounded-2xl border border-amber-800/20 bg-white/80 p-3.5 text-center dark:border-amber-500/20 dark:bg-stone-900/70">
            <span className="block text-xl font-black text-emerald-900 dark:text-emerald-300">
              {reviewsCount}
            </span>
            <span className="mt-0.5 block text-xs font-extrabold text-stone-700 dark:text-stone-300">
              تقييمات وملاحظات
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-amber-800/20 pt-5 dark:border-amber-500/20">
        <Link
          href="/recipes"
          className="w-full rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-5 py-3 text-center text-xs font-black text-amber-50 transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950 sm:text-sm"
        >
          استعراض دفتر الوصفات
        </Link>

        <Link
          href="/login"
          className="w-full rounded-full border border-amber-800/25 bg-white/70 px-5 py-2.5 text-center text-xs font-extrabold text-stone-800 transition hover:bg-white dark:border-amber-500/25 dark:bg-stone-900/70 dark:text-amber-200 dark:hover:bg-stone-900 sm:text-sm"
        >
          تبديل الحساب أو تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}