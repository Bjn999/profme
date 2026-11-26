import { Suspense } from "react";
import { connection } from "next/server";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { TemplatesSection } from "@/components/landing/templates-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ContactSection } from "@/components/landing/contact-section";
import { Footer } from "@/components/landing/footer";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

async function AuthNavbar() {
  await connection();
  let isAuthenticated = false;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      isAuthenticated = Boolean(user);
    } catch {
      isAuthenticated = false;
    }
  }

  return <Navbar isAuthenticated={isAuthenticated} />;
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<Navbar isAuthenticated={false} />}>
        <AuthNavbar />
      </Suspense>
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <TemplatesSection />
        <FeaturesSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
