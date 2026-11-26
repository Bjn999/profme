import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { logoutAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileLinkCard } from "@/components/dashboard/profile-link-card";
import { ProfileEditor } from "@/components/dashboard/profile-editor";
import {
  generateRandomSlug,
  type ProfileRecord,
  type ProfileType,
} from "@/types/profile";

async function DashboardContent() {
  await connection();

  if (!isSupabaseConfigured()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: existing } = await supabase
    .from("profiles")
    .select(
      "id, username, full_name, account_type, headline, bio, avatar_url, cover_url, template_key, location, website_url, social_links, custom_sections, is_published"
    )
    .eq("id", user.id)
    .maybeSingle();

  let profile = existing as ProfileRecord | null;

  if (!profile) {
    const fallbackType =
      (user.user_metadata?.account_type as ProfileType | undefined) ??
      "student";
    const fallbackName =
      (user.user_metadata?.full_name as string | undefined) ?? "مستخدم جديد";
    const newSlug = generateRandomSlug(8);

    const { data: created } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        username: newSlug,
        full_name: fallbackName,
        account_type: fallbackType,
      })
      .select(
        "id, username, full_name, account_type, headline, bio, avatar_url, cover_url, template_key, location, website_url, social_links, custom_sections, is_published"
      )
      .single();

    profile = (created as ProfileRecord | null) ?? {
      id: user.id,
      username: newSlug,
      full_name: fallbackName,
      account_type: fallbackType,
      headline: null,
      bio: null,
      avatar_url: null,
      cover_url: null,
      template_key: "modern",
      location: null,
      website_url: null,
      social_links: {},
      custom_sections: {},
      is_published: false,
    };
  } else if (!profile.username) {
    const newSlug = generateRandomSlug(8);
    const { data: withSlug } = await supabase
      .from("profiles")
      .update({ username: newSlug })
      .eq("id", user.id)
      .select("username")
      .maybeSingle();

    profile = {
      ...profile,
      username: withSlug?.username ?? newSlug,
    };
  }

  const activeSlug = profile.username ?? generateRandomSlug(8);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          إدارة صفحتك التعريفية
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          حدّث بياناتك وخصّص محتوى القالب الخاص بك ثم شارك رابطك في أي مكان.
        </p>
      </div>

      <ProfileLinkCard
        slug={activeSlug}
        isPublished={Boolean(profile.is_published)}
      />

      <ProfileEditor initialProfile={profile} activeSlug={activeSlug} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/35">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              ب
            </div>
            <span className="text-lg font-bold text-foreground">بروفمي</span>
          </Link>

          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">
              <LogOut className="size-4" />
              تسجيل الخروج
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Suspense
          fallback={
            <Card className="border-border/80 bg-card">
              <CardContent className="p-6 text-sm text-muted-foreground">
                جاري تحميل بيانات صفحتك...
              </CardContent>
            </Card>
          }
        >
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  );
}
