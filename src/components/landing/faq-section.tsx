"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "هل أحتاج إلى خبرة في التصميم لإنشاء صفحتي؟",
    a: "لا على الإطلاق. كل ما عليك فعله هو اختيار نوع حسابك وإدخال بياناتك، وستتولى القوالب الجاهزة تنسيق صفحتك بشكل أنيق ومرتب.",
  },
  {
    q: "هل يمكنني تعديل محتوى صفحتي أو تغيير القالب لاحقاً؟",
    a: "نعم، يمكنك تحديث بياناتك وخبراتك وخدماتك أو التبديل بين القوالب المتاحة في أي وقت من خلال لوحة التحكم، دون أن يتغير رابط صفحتك.",
  },
  {
    q: "هل تناسب المنصة الشركات والمكاتب التجارية؟",
    a: "بالتأكيد. توفر بروفمي قوالب مخصصة للشركات تتيح عرض نبذة الشركة، قائمة الخدمات، فريق العمل، الفروع، ووسائل التواصل الرسمية في صفحة واحدة.",
  },
  {
    q: "كيف أشارك صفحتي مع العملاء أو جهات التوظيف؟",
    a: "بعد نشر صفحتك ستحصل على رابط خاص بك يمكنك نسخه وإضافته إلى سيرتك الذاتية، توقيع بريدك الإلكتروني، أو حساباتك في شبكات التواصل.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="border-y border-border/70 bg-muted/35 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">الأسئلة الشائعة</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            إجابات سريعة على أبرز الاستفسارات
          </h2>
        </div>

        <Accordion className="mt-10 rounded-2xl border border-border/80 bg-card px-6 py-2">
          {faqs.map((item, idx) => (
            <AccordionItem key={item.q} value={`faq-${idx}`}>
              <AccordionTrigger className="py-4 text-right text-sm font-semibold text-foreground hover:no-underline sm:text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
