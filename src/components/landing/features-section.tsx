import {
  FileText,
  Layers,
  Link2,
  Lock,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Layers,
    title: "قوالب متخصصة ومنظمة",
    description:
      "كل نوع حساب يحصل على تخطيط وأقسام تناسب طبيعته، سواء كانت لعرض الخبرات أو الخدمات أو تعريف الشركة.",
  },
  {
    icon: Link2,
    title: "رابط واحد سهل المشاركة",
    description:
      "اختر رابطاً مخصصاً باسمك أو اسم شركتك لمشاركته في الرسائل، البطاقات التعريفية، ومنصات التواصل.",
  },
  {
    icon: RefreshCw,
    title: "تعديل فوري في أي وقت",
    description:
      "أضف مشروعاً جديداً، حدّث مسماك الوظيفي، أو عدّل قائمة خدماتك خلال ثوانٍ لتظهر التغييرات مباشرة.",
  },
  {
    icon: Smartphone,
    title: "تجربة سلسة على كل الشاشات",
    description:
      "تظهر صفحتك بوضوح وتنسيق متوازن على الهواتف الذكية والأجهزة اللوحية وأجهزة الحاسوب.",
  },
  {
    icon: FileText,
    title: "عرض احترافي للخدمات والأعمال",
    description:
      "قدّم نبذتك، خدماتك، ومعرض أعمالك بشكل مرتب يساعد الزائر على فهم ما تقدمه واتخاذ قرار التواصل سريعاً.",
  },
  {
    icon: Lock,
    title: "تحكم كامل بخصوصية صفحتك",
    description:
      "يمكنك تجهيز صفحتك كمسودة وتعديلها بحرية، ثم نشرها أو إخفاؤها متى شئت من لوحة التحكم.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">مميزات المنصة</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            كل ما تحتاجه لتقديم نفسك أو شركتك بأفضل صورة
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            أدوات عملية وواضحة تركز على إبراز محتواك دون تعقيد.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-border/80 bg-card transition-colors hover:border-primary/35"
              >
                <CardContent className="p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
