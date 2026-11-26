"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type ContactActionState = {
  error?: string;
  success?: string;
};

export async function submitContactMessage(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      error: "يرجى تعبئة الاسم والبريد الإلكتروني ونص الرسالة.",
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return {
      error: "يرجى إدخال بريد إلكتروني صحيح.",
    };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        subject: subject || "استفسار عام",
        message,
      });

      if (error) {
        return {
          error: "تعذر إرسال رسالتك حالياً. يرجى المحاولة مرة أخرى بعد قليل.",
        };
      }
    } catch {
      return {
        error: "حدث خطأ غير متوقع أثناء الإرسال. يرجى المحاولة مجدداً.",
      };
    }
  }

  return {
    success: "شكراً لتواصلك معنا! تم استلام رسالتك وسنرد عليك في أقرب وقت.",
  };
}
