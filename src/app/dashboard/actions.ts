"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  resolveTemplateKey,
  type TemplateKey,
} from "@/lib/templates";
import {
  generateRandomSlug,
  type ProfileCustomData,
  type ProfileType,
  type SocialLinks,
} from "@/types/profile";

export interface UpdateProfilePayload {
  username?: string | null;
  template_key: TemplateKey;
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  website_url: string;
  is_published: boolean;
  social_links: SocialLinks;
  custom_sections: ProfileCustomData;
}

export interface UpdateProfileResult {
  error?: string;
  success?: string;
  username?: string;
}

export interface TogglePublishResult {
  error?: string;
  success?: string;
  is_published?: boolean;
  username?: string;
}

const VALID_TYPES: ProfileType[] = [
  "student",
  "employee",
  "freelancer",
  "company",
];

export async function togglePublishAction(
  nextPublished: boolean,
  fallbackUsername?: string | null
): Promise<TogglePublishResult> {
  if (!isSupabaseConfigured()) {
    return { error: "الخدمة غير مهيأة حالياً. يرجى المحاولة لاحقاً." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "انتهت جلستك. يرجى تسجيل الدخول مرة أخرى." };
  }

  const { data: currentRow } = await supabase
    .from("profiles")
    .select("username, full_name, account_type")
    .eq("id", user.id)
    .maybeSingle();

  const resolvedUsername =
    currentRow?.username?.trim().toLowerCase() ||
    fallbackUsername?.trim().toLowerCase() ||
    generateRandomSlug(8);

  const fallbackName =
    currentRow?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    "مستخدم جديد";

  const rawType =
    currentRow?.account_type ||
    (user.user_metadata?.account_type as ProfileType | undefined) ||
    "student";
  const safeType: ProfileType = VALID_TYPES.includes(rawType as ProfileType)
    ? (rawType as ProfileType)
    : "student";

  const { data: saved, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        username: resolvedUsername,
        full_name: fallbackName,
        account_type: safeType,
        is_published: Boolean(nextPublished),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
    .select("username, is_published")
    .single();

  if (error || !saved) {
    console.error("togglePublishAction error:", error);
    return {
      error: "تعذر تحديث حالة نشر الصفحة حالياً. يرجى المحاولة مرة أخرى.",
    };
  }

  revalidatePath("/dashboard");
  if (saved.username) {
    revalidatePath(`/p/${saved.username}`);
  }

  return {
    is_published: Boolean(saved.is_published),
    username: saved.username ?? resolvedUsername,
    success: saved.is_published
      ? "تم نشر صفحتك بنجاح وأصبحت متاحة للجميع عبر رابطك الخاص."
      : "تم تحويل صفحتك إلى مسودة خاصة.",
  };
}

export async function updateProfileAction(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResult> {
  if (!isSupabaseConfigured()) {
    return { error: "الخدمة غير مهيأة حالياً. يرجى المحاولة لاحقاً." };
  }

  const fullName = payload.full_name.trim();
  if (!fullName) {
    return { error: "يرجى إدخال الاسم أو اسم الشركة." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "انتهت جلستك. يرجى تسجيل الدخول مرة أخرى." };
  }

  const { data: currentRow } = await supabase
    .from("profiles")
    .select("username, account_type")
    .eq("id", user.id)
    .maybeSingle();

  // Preserve the user's registered account type (locked after signup)
  const rawType =
    currentRow?.account_type ||
    (user.user_metadata?.account_type as ProfileType | undefined) ||
    "student";
  const lockedAccountType: ProfileType = VALID_TYPES.includes(
    rawType as ProfileType
  )
    ? (rawType as ProfileType)
    : "student";

  const resolvedUsername =
    currentRow?.username?.trim().toLowerCase() ||
    payload.username?.trim().toLowerCase() ||
    generateRandomSlug(8);

  const resolvedTemplate = resolveTemplateKey(
    payload.template_key,
    lockedAccountType
  );

  const { data: saved, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        username: resolvedUsername,
        full_name: fullName,
        account_type: lockedAccountType,
        template_key: resolvedTemplate,
        headline: payload.headline.trim() || null,
        bio: payload.bio.trim() || null,
        location: payload.location.trim() || null,
        website_url: payload.website_url.trim() || null,
        is_published: Boolean(payload.is_published),
        social_links: payload.social_links ?? {},
        custom_sections: payload.custom_sections ?? {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
    .select("username")
    .single();

  if (error || !saved) {
    console.error("updateProfileAction error:", error);
    return {
      error: "تعذر حفظ التعديلات حالياً. يرجى المحاولة مرة أخرى.",
    };
  }

  revalidatePath("/dashboard");
  if (saved.username) {
    revalidatePath(`/p/${saved.username}`);
  }

  return {
    success: "تم حفظ تحديثات صفحتك وتطبيق القالب بنجاح.",
    username: saved.username ?? resolvedUsername,
  };
}
