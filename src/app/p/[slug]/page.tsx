import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { AlertCircle, ArrowRight, EyeOff, Lock } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { resolveTemplateKey } from "@/lib/templates";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdaptiveProfileRenderer } from "@/components/profiles/adaptive-profile-renderer";
import { cn } from "cn";
import type { ProfileRecord } from "@/types/profile";

function ProfileIssueView({
  title,
  description,
  icon = "alert",
  showDashboardLink = false,
}: {
  title: string;
  description: string;
  icon?: "alert" | "lock";
  showDashboardLink?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/35 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            ب
          </div>
          <span className="text-lg font-bold text-foreground">بروفمي</span>
        </Link>

        <Card className="border-border/80 bg-card shadow-xs">
          <CardContent className="px-6 py-10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
              {icon === "lock" ? (
                <Lock className="size-7" />
              ) : (
                <AlertCircle className="size-7" />
              )}
            </div>

            <h1 className="mt-5 text-xl font-bold text-foreground">{title}</h1>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "h-10 gap-2 px-5"
                )}
              >
                <ArrowRight className="size-4" />
                العودة للرئيسية
              </Link>
              {showDashboardLink && (
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "h-10 px-5"
                  )}
                >
                  لوحة التحكم
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type ProfileFetchResult =
  | { status: "unconfigured" }
  | { status: "invalid_slug" }
  | { status: "error"; isLoggedIn: boolean }
  | { status: "not_found"; isLoggedIn: boolean }
  | { status: "unpublished" }
  | { status: "ready"; profile: ProfileRecord };

async function loadPublicProfile(slug: string): Promise<ProfileFetchResult> {
  const cleanSlug = decodeURIComponent(slug ?? "").trim().toLowerCase();

  if (!isSupabaseConfigured()) {
    return { status: "unconfigured" };
  }

  if (!cleanSlug) {
    return { status: "invalid_slug" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: profileData, error } = await supabase
      .from("profiles")
      .select(
        "id, username, full_name, account_type, headline, bio, avatar_url, cover_url, template_key, location, website_url, social_links, custom_sections, is_published"
      )
      .eq("username", cleanSlug)
      .maybeSingle();

    if (error) {
      console.error("PublicProfileContent query error:", error);
      return { status: "error", isLoggedIn: Boolean(user) };
    }

    if (!profileData) {
      return { status: "not_found", isLoggedIn: Boolean(user) };
    }

    const profile = profileData as ProfileRecord;

    if (!profile.is_published && (!user || user.id !== profile.id)) {
      return { status: "unpublished" };
    }

    return {
      status: "ready",
      profile: {
        ...profile,
        full_name: profile.full_name?.trim() || "مستخدم بروفمي",
      },
    };
  } catch (err) {
    console.error("PublicProfileContent unexpected error:", err);
    return { status: "error", isLoggedIn: false };
  }
}

async function PublicProfileContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const result = await loadPublicProfile(slug);

  if (result.status === "unconfigured") {
    return (
      <ProfileIssueView
        title="تعذر عرض الصفحة حالياً"
        description="الخدمة غير متاحة في الوقت الحالي. يرجى المحاولة مرة أخرى بعد قليل."
      />
    );
  }

  if (result.status === "invalid_slug") {
    return (
      <ProfileIssueView
        title="الرابط غير مكتمل"
        description="يبدو أن رابط الصفحة غير صحيح. يرجى التحقق من الرابط والمحاولة مرة أخرى."
      />
    );
  }

  if (result.status === "error") {
    return (
      <ProfileIssueView
        title="حدثت مشكلة أثناء تحميل الصفحة"
        description="تعذر جلب بيانات هذه الصفحة في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقاً."
        showDashboardLink={result.isLoggedIn}
      />
    );
  }

  if (result.status === "not_found") {
    return (
      <ProfileIssueView
        title="هذه الصفحة غير متوفرة حالياً"
        description="لم نتمكن من العثور على صفحة مطابقة لهذا الرابط، أو أنها غير منشورة للعامة بعد."
        showDashboardLink={result.isLoggedIn}
      />
    );
  }

  if (result.status === "unpublished") {
    return (
      <ProfileIssueView
        title="هذه الصفحة غير منشورة حالياً"
        description="صاحب هذه الصفحة لم يقم بنشرها للعامة بعد. يرجى المحاولة لاحقاً."
        icon="lock"
      />
    );
  }

  const { profile } = result;
  const activeTemplate = resolveTemplateKey(
    profile.template_key,
    profile.account_type
  );
  const isDarkTheme = activeTemplate === "obsidian-luxe";

  return (
    <div className="min-h-screen flex flex-col">
      {!profile.is_published && (
        <div className="border-b border-border bg-secondary/80 px-4 py-2.5 text-center text-xs font-medium text-secondary-foreground sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <EyeOff className="size-4" />
            وضع المعاينة الخاصة — هذه الصفحة غير منشورة للعامة بعد. يمكنك نشرها
            من{" "}
            <Link href="/dashboard" className="underline font-semibold">
              لوحة التحكم
            </Link>
            .
          </span>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        <AdaptiveProfileRenderer profile={profile} />
      </main>

      <footer
        className={cn(
          "border-t py-5 text-center text-xs",
          isDarkTheme
            ? "border-white/10 bg-[#0B0F17] text-slate-400"
            : "border-border/70 bg-background text-muted-foreground"
        )}
      >
        <Link
          href="/"
          className={cn(
            "transition-colors",
            isDarkTheme ? "hover:text-white" : "hover:text-foreground"
          )}
        >
          صفحة تعريفية عبر{" "}
          <span
            className={cn(
              "font-semibold",
              isDarkTheme ? "text-[#E5B95C]" : "text-primary"
            )}
          >
            بروفمي
          </span>
        </Link>
      </footer>
    </div>
  );
}

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-muted/30 text-sm text-muted-foreground">
          جاري تحميل الصفحة...
        </div>
      }
    >
      <PublicProfileContent params={params} />
    </Suspense>
  );
}
