import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base">
                ب
              </div>
              <span className="text-lg font-bold text-foreground">بروفمي</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              منصة عربية لبناء وإدارة الصفحات التعريفية للأفراد والشركات بقوالب
              مخصصة تعكس طبيعة كل مجال باحترافية ووضوح.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-foreground">روابط سريعة</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-foreground">
                  عن المنصة
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-foreground">
                  القوالب والخدمات
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground">
                  المميزات
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-foreground">الحساب</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/register" className="hover:text-foreground">
                  إنشاء حساب جديد
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground">
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-foreground"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 بروفمي. جميع الحقوق محفوظة.</p>
          <p>صُممت بعناية لدعم حضورك المهني والتجاري.</p>
        </div>
      </div>
    </footer>
  );
}
