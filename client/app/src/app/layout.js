
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Suspense } from "react";



import { Cairo } from "next/font/google";

import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata = {
  title: "مذاق المغرب — أطباق وتوابل من المطبخ المغربي",
  description:
    "منصة مغربية لاكتشاف ومشاركة أشهى الوصفات التقليدية والعصرية بروح الضيافة المغربية.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body
        className={`${cairo.className} flex min-h-full flex-col bg-[#faf4ea] text-stone-900 antialiased dark:bg-[#17110c] dark:text-amber-50`}
      >
        <Suspense
          fallback={
            <div className="h-16 w-full border-b border-amber-800/20 bg-[#f3e1c7]/80 dark:border-amber-500/20 dark:bg-[#24170f]" />
          }
        >
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}