import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { getPublicSiteUrl } from "@/lib/site-config";
import "./globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteUrl()),
  title: "بروفمي | منصتك لبناء الهوية المهنية وصفحات الشركات",
  description:
    "أنشئ صفحتك التعريفية الاحترافية كطالب، موظف، مستقل أو شركة عبر قوالب مخصصة تناسب طبيعة عملك وشاركها برابط واحد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-primary/15 selection:text-primary">
        {children}
        <Toaster
          dir="rtl"
          theme="light"
          position="bottom-left"
          richColors
          closeButton
          duration={3500}
          toastOptions={{
            className: "font-sans",
          }}
        />
      </body>
    </html>
  );
}
