import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Palette,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "cn";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy column */}
          <div className="lg:col-span-6">
            <Badge
              variant="secondary"
              className="mb-5 rounded-full px-3.5 py-1 text-xs font-medium text-secondary-foreground"
            >
              منصة متكاملة للصفحات التعريفية والأعمال
            </Badge>

            <h1 className="text-3xl font-bold leading-[1.25] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              هويتك المهنية والتجارية في صفحة واحدة تعبّر عنك باحترافية
            </h1>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              سواء كنت طالباً تبني مسيرتك، موظفاً تستعرض خبراتك، مستقلاً تقدم
              خدماتك، أو شركة تعرّف بأعمالها؛ تمنحك بروفمي قالباً مصمماً خصيصاً
              لطبيعة عملك، برابط واحد أنيق يسهل مشاركته وتحديثه في أي وقت.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 px-6 text-sm font-semibold"
                )}
              >
                ابدأ بإنشاء صفحتك
                <ArrowLeft className="size-4" />
              </Link>
              <a
                href="#templates"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-6 text-sm font-medium"
                )}
              >
                استعرض القوالب
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                إعداد سريع دون الحاجة لخبرة تصميم
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                قوالب مخصصة لكل فئة
              </span>
            </div>
          </div>

          {/* Visual preview column */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-border bg-muted/40 p-3 sm:p-4">
              <Card className="overflow-hidden border-border/80 shadow-sm">
                {/* Browser-like address bar */}
                <div className="flex items-center justify-between border-b border-border/70 bg-muted/50 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                  </div>
                  <div
                    dir="ltr"
                    className="rounded-md bg-background px-3 py-1 text-xs font-medium text-muted-foreground border border-border/70"
                  >
                    profme.sa/sara-alharbi
                  </div>
                  <Share2 className="size-4 text-muted-foreground" />
                </div>

                {/* Profile mockup body */}
                <CardContent className="p-0">
                  <div className="h-24 bg-gradient-to-l from-primary/90 via-primary/75 to-primary/60 px-6 pt-5" />
                  <div className="px-6 pb-6">
                    <div className="-mt-10 flex items-end justify-between gap-4">
                      <div className="flex size-20 items-center justify-center rounded-2xl border-4 border-card bg-secondary text-2xl font-bold text-primary shadow-xs">
                        س
                      </div>
                      <Badge variant="secondary" className="mb-1">
                        قالب المستقلين
                      </Badge>
                    </div>

                    <div className="mt-3">
                      <h2 className="text-lg font-bold text-foreground">
                        سارة الحربي
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        مصممة هوية بصرية وتجربة مستخدم
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          الرياض، السعودية
                        </span>
                        <span>•</span>
                        <span>متاحة للمشاريع الجديدة</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
                        <p className="text-xs font-semibold text-foreground">
                          تصميم الهوية التجارية
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          شعار، دليل استخدام، ومطبوعات رسمية
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
                        <p className="text-xs font-semibold text-foreground">
                          تصميم صفحات المنتجات
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          واجهات واضحة ترفع معدل التفاعل
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-2 pt-1">
                      <div className="flex flex-col items-center rounded-lg bg-muted/50 py-2 text-center">
                        <GraduationCap className="size-4 text-primary" />
                        <span className="mt-1 text-[11px] font-medium text-muted-foreground">
                          طلاب
                        </span>
                      </div>
                      <div className="flex flex-col items-center rounded-lg bg-muted/50 py-2 text-center">
                        <Briefcase className="size-4 text-primary" />
                        <span className="mt-1 text-[11px] font-medium text-muted-foreground">
                          موظفون
                        </span>
                      </div>
                      <div className="flex flex-col items-center rounded-lg bg-secondary py-2 text-center">
                        <Palette className="size-4 text-primary" />
                        <span className="mt-1 text-[11px] font-semibold text-primary">
                          مستقلون
                        </span>
                      </div>
                      <div className="flex flex-col items-center rounded-lg bg-muted/50 py-2 text-center">
                        <Building2 className="size-4 text-primary" />
                        <span className="mt-1 text-[11px] font-medium text-muted-foreground">
                          شركات
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
