"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Check,
  GraduationCap,
  Palette,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

type TemplateCategory = {
  id: string;
  label: string;
  icon: typeof GraduationCap;
  title: string;
  description: string;
  highlights: string[];
  preview: {
    name: string;
    role: string;
    tag: string;
    items: { title: string; subtitle: string }[];
  };
};

const categories: TemplateCategory[] = [
  {
    id: "student",
    label: "الطلاب والخريجون",
    icon: GraduationCap,
    title: "قالب يبرز شغفك الأكاديمي ومشاريعك الجامعية",
    description:
      "مصمم خصيصاً للطلاب وحديثي التخرج لتقديم أنفسهم لجهات التدريب التعاوني والتوظيف بصورة منظمة تتجاوز السيرة الذاتية الورقية.",
    highlights: [
      "عرض التخصص الجامعي، المعدل، والدورات التدريبية",
      "قسم مخصص لمشاريع التخرج والأنشطة الطلابية",
      "إبراز المهارات واللغات مع زر تحميل السيرة الذاتية",
      "روابط مباشرة للتواصل والبريد الجامعي",
    ],
    preview: {
      name: "عبدالله العتيبي",
      role: "طالب هندسة صناعية — السنة الأخيرة",
      tag: "ملف طالب",
      items: [
        {
          title: "مشروع تحسين خطوط الإنتاج",
          subtitle: "مشروع تخرج • تحليل سلاسل الإمداد",
        },
        {
          title: "عضو نادي الهندسة والتطوير",
          subtitle: "تنظيم 4 ورش عمل طلابية",
        },
      ],
    },
  },
  {
    id: "employee",
    label: "الموظفون والخبراء",
    icon: Briefcase,
    title: "ملف تنفيذي يعكس مسارك المهني وإنجازاتك",
    description:
      "مثالي للموظفين، المديرين، والمستشارين لبناء حضور مهني موثوق يسهل مشاركته في المؤتمرات، الاجتماعات، أو فرص التقدم الوظيفي.",
    highlights: [
      "تسلسل زمني واضح للخبرات والمناصب القيادية",
      "إبراز الشهادات المهنية وأبرز المنجزات بالأرقام",
      "بطاقة تواصل سريعة لجهات العمل والشركاء",
      "مظهر رسمي هادئ يعكس الاحترافية",
    ],
    preview: {
      name: "خالد المنصور",
      role: "مدير عمليات وتطوير أعمال",
      tag: "ملف موظف",
      items: [
        {
          title: "قيادة التوسع الإقليمي",
          subtitle: "رفع كفاءة التشغيل بنسبة 32% خلال عامين",
        },
        {
          title: "شهادة إدارة المشاريع الاحترافية",
          subtitle: "خبرة تتجاوز 8 سنوات في القطاع الخاص",
        },
      ],
    },
  },
  {
    id: "freelancer",
    label: "المستقلون",
    icon: Palette,
    title: "صفحة متكاملة لعرض خدماتك وتحويل الزوار إلى عملاء",
    description:
      "يمنح المستقلين في التصميم، التسويق، الكتابة، والتصوير مساحة مرتبة لعرض نماذج أعمالهم وباقاتهم واستقبال طلبات العمل بوضوح.",
    highlights: [
      "معرض أعمال منسق يبرز تفاصيل كل مشروع",
      "جدول خدمات واضح مع وصف لكل باقة",
      "آراء العملاء السابقين لتعزيز الثقة",
      "زر مباشر لطلب عرض سعر أو حجز استشارة",
    ],
    preview: {
      name: "نورة القحطاني",
      role: "كاتبة محتوى واستراتيجية تسويق رقمي",
      tag: "ملف مستقل",
      items: [
        {
          title: "إعداد خطط المحتوى الشهرية",
          subtitle: "للشركات الناشئة والمتاجر الإلكترونية",
        },
        {
          title: "كتابة صفحات الهبوط والحملات",
          subtitle: "أكثر من 45 مشروعاً منجزاً",
        },
      ],
    },
  },
  {
    id: "company",
    label: "الشركات والمؤسسات",
    icon: Building2,
    title: "صفحة تعريفية متكاملة تعكس هوية شركتك وخدماتها",
    description:
      "حل عملي للشركات والمكاتب والمؤسسات لتقديم نبذة واضحة عن الشركة، قائمة خدماتها، فريق العمل، والفروع ووسائل التواصل في رابط رسمي واحد.",
    highlights: [
      "نبذة تعريفية عن الشركة ورؤيتها ومجالات عملها",
      "عرض منظم للخدمات والمنتجات والحلول المقدمة",
      "قسم للفريق، العملاء، أو الشركاء الرئيسيين",
      "بيانات الفروع، أوقات العمل، ونموذج تواصل مباشر",
    ],
    preview: {
      name: "مجموعة أفق للاستشارات",
      role: "حلول استشارية وإدارية لقطاع الأعمال",
      tag: "ملف شركة",
      items: [
        {
          title: "الاستشارات التنظيمية والمالية",
          subtitle: "دعم نمو المنشآت الصغيرة والمتوسطة",
        },
        {
          title: "تطوير الهوية المؤسسية",
          subtitle: "فروعنا: الرياض • جدة • الدمام",
        },
      ],
    },
  },
];

export function TemplatesSection() {
  return (
    <section
      id="templates"
      className="border-y border-border/70 bg-muted/35 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">القوالب والخدمات</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            قالب مخصص لكل فئة يناسب طبيعة عملك
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            بدلاً من القوالب العامة المتشابهة، توفر لك بروفمي بنية وأقساماً
            مدروسة تتوافق مع أهدافك سواء كنت فرداً أو شركة.
          </p>
        </div>

        <Tabs defaultValue="student" className="mt-10 w-full gap-6 sm:gap-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-2 gap-2 rounded-xl bg-muted p-1.5 group-data-horizontal/tabs:h-auto sm:grid-cols-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="flex h-auto min-h-11 items-center justify-center gap-2 rounded-lg px-2.5 py-2.5 text-center text-xs font-medium leading-snug whitespace-normal sm:px-3 sm:text-sm sm:whitespace-nowrap"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{cat.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <div className="grid items-stretch gap-6 lg:grid-cols-12">
                <Card className="border-border/80 bg-card lg:col-span-7">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      {cat.label}
                    </Badge>
                    <CardTitle className="mt-2 text-xl font-bold leading-snug sm:text-2xl">
                      {cat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {cat.description}
                    </p>
                    <ul className="space-y-3">
                      {cat.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-foreground"
                        >
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                            <Check className="size-3.5" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2">
                      <Link
                        href={`/register?type=${cat.id}`}
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "h-10 px-5"
                        )}
                      >
                        ابدأ بهذا القالب
                        <ArrowLeft className="size-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex flex-col justify-between border-border/80 bg-card lg:col-span-5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{cat.preview.tag}</Badge>
                      <span className="text-xs text-muted-foreground">
                        معاينة نموذجية
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-3.5">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-primary">
                        {cat.preview.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground">
                          {cat.preview.name}
                        </h4>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          {cat.preview.role}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {cat.preview.items.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-xl border border-border/70 bg-muted/35 p-4"
                        >
                          <p className="text-sm font-semibold text-foreground">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.subtitle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
