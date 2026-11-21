"use client";

import { useState } from "react";

const initialForm = {
  fullName: "",
  email: "",
  topic: "recipe",
  subject: "",
  message: "",
};

export default function ContactFormSection() {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!fullName || !email || !subject || !message) {
      setError("يرجى تعبئة جميع الحقول المطلوبة قبل إرسال رسالتك.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("يرجى إدخال عنوان بريد إلكتروني صحيح.");
      return;
    }

    setError("");
    setSubmittedMessage({
      fullName,
      topic: formData.topic,
      subject,
    });
    setFormData(initialForm);
  }

  return (
    <div dir="rtl" className="lg:col-span-7">
      <div className="rounded-3xl border-2 border-amber-800/25 bg-[#f3e1c7]/70 p-6 shadow-sm dark:border-amber-500/25 dark:bg-[#24170f]/75 sm:p-8">
        <div className="mb-6">
          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
            أرسل رسالتك
          </span>
          <h2 className="mt-1 text-2xl font-black text-stone-950 dark:text-amber-50">
            اكتب لنا وصفة أو استفساراً
          </h2>
        </div>

        {submittedMessage && (
          <div
            role="status"
            className="mb-6 rounded-2xl border border-emerald-700/35 bg-emerald-800/10 p-4 text-sm font-bold text-emerald-950 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200"
          >
            شكراً لك يا {submittedMessage.fullName}، تم استلام رسالتك بعنوان «
            {submittedMessage.subject}» بنجاح وسيتواصل معك فريق مذاق المغرب قريباً.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-fullname"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                الاسم الكامل *
              </label>
              <input
                id="contact-fullname"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="مثال: سعاد العلوي"
                className="w-full rounded-xl border border-amber-800/25 bg-white/90 px-4 py-2.5 text-sm font-bold text-stone-900 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/85 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                البريد الإلكتروني *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-amber-800/25 bg-white/90 px-4 py-2.5 text-sm font-bold text-stone-900 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/85 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-topic"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                نوع الرسالة
              </label>
              <select
                id="contact-topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full rounded-xl border border-amber-800/25 bg-white/90 px-4 py-2.5 text-sm font-bold text-stone-900 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/85 dark:text-amber-50 dark:focus:border-amber-400"
              >
                <option value="recipe">اقتراح أو إرسال وصفة</option>
                <option value="feedback">ملاحظة أو مراجعة لوصفة</option>
                <option value="collaboration">تعاون أو شراكة</option>
                <option value="general">استفسار عام</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
              >
                عنوان الرسالة *
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="مثال: وصفة رفيسة تقليدية"
                className="w-full rounded-xl border border-amber-800/25 bg-white/90 px-4 py-2.5 text-sm font-bold text-stone-900 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/85 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block text-xs font-extrabold text-stone-800 dark:text-amber-200"
            >
              تفاصيل الرسالة أو الوصفة *
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="اكتب المكونات والخطوات أو رسالتك هنا بكل وضوح..."
              className="w-full rounded-xl border border-amber-800/25 bg-white/90 px-4 py-2.5 text-sm font-semibold text-stone-900 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none dark:border-amber-500/25 dark:bg-stone-900/85 dark:text-amber-50 dark:placeholder:text-stone-400 dark:focus:border-amber-400"
            />
          </div>

          {error && (
            <p className="text-xs font-extrabold text-red-700 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-l from-red-800 via-orange-700 to-amber-600 px-6 py-3 text-sm font-extrabold text-amber-50 shadow-sm transition hover:brightness-110 dark:from-amber-500 dark:to-orange-600 dark:text-stone-950 sm:w-auto"
          >
            إرسال الرسالة
          </button>
        </form>
      </div>
    </div>
  );
}