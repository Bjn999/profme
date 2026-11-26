"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getAuthCallbackUrl } from "@/lib/site-config";

export type AuthActionState = {
  error?: string;
  success?: string;
};

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return {
      error: "الخدمة غير مهيأة حالياً. يرجى المحاولة لاحقاً.",
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "يرجى إدخال البريد الإلكتروني وكلمة المرور." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signupAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return {
      error: "الخدمة غير مهيأة حالياً. يرجى المحاولة لاحقاً.",
    };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const accountType = String(formData.get("accountType") ?? "student");

  if (!fullName || !email || !password) {
    return { error: "يرجى تعبئة جميع الحقول المطلوبة." };
  }

  if (password.length < 8) {
    return { error: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل." };
  }

  const validTypes = ["student", "employee", "freelancer", "company"];
  const safeType = validTypes.includes(accountType) ? accountType : "student";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: getAuthCallbackUrl(),
      data: {
        full_name: fullName,
        account_type: safeType,
      },
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      return { error: "هذا البريد الإلكتروني مسجل مسبقاً." };
    }
    return {
      error: "تعذر إنشاء الحساب في الوقت الحالي. يرجى التحقق من البيانات والمحاولة مرة أخرى.",
    };
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return {
    success:
      "تم إنشاء حسابك بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب ثم تسجيل الدخول.",
  };
}

export async function logoutAction() {
  if (!isSupabaseConfigured()) {
    redirect("/");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
