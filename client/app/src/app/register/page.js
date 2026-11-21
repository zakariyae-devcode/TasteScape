import RegisterHeader from "@/components/register/RegisterHeader";
import RegisterFormSection from "@/components/register/RegisterFormSection";

export default function RegisterPage() {
  return (
    <section
      dir="rtl"
      className="min-h-screen bg-[#faf4ea] py-12 text-stone-900 dark:bg-[#17110c] dark:text-amber-50 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          <RegisterHeader />
          <RegisterFormSection />
        </div>
      </div>
    </section>
  );
}