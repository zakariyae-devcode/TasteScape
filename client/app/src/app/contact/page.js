import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";

export default function ContactPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#faf4ea] pb-16 text-stone-900 dark:bg-[#17110c] dark:text-amber-50"
    >
      <ContactHeroSection />

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <ContactFormSection />
          <ContactInfoSection />
        </div>
      </section>
    </div>
  );
}