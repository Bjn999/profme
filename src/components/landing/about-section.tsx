import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "اختر نوع صفحتك",
    description:
      "حدد ما إذا كانت الصفحة لطالب، موظف، مستقل، أو شركة ليتم تجهيز الأقسام المناسبة لك تلقائياً.",
  },
  {
    number: "02",
    title: "أضف بياناتك وأعمالك",
    description:
      "أدخل نبذتك، خبراتك أو خدماتك، روابط التواصل، ومعرض أعمالك بواجهة تحرير بسيطة وواضحة.",
  },
  {
    number: "03",
    title: "شارك رابطك باحترافية",
    description:
      "احصل على رابط مخصص لصفحتك يمكنك إضافته إلى سيرتك الذاتية، بطاقتك الشخصية، أو حساباتك الاجتماعية.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">عن بروفمي</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            لماذا تشتّت حضورك في عدة روابط بينما يمكنك جمعه في مكان واحد؟
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            صُممت بروفمي لتغني الأفراد والشركات عن الملفات التقليدية غير القابلة
            للتحديث أو التكاليف المرتفعة لبناء مواقع تعريفية من الصفر. نمنحك
            حضوراً رقمياً مرتباً يعكس قيمتك الحقيقية أمام جهات التوظيف والعملاء
            والشركاء.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="border-border/80 bg-card transition-colors hover:border-primary/40"
            >
              <CardContent className="p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-primary">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
