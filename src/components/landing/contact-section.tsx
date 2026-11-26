"use client";

import { useActionState, useEffect } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import {
  submitContactMessage,
  type ContactActionState,
} from "@/app/actions/contact";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactActionState = {};

const contactMethods = [
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
    dir: "ltr" as const,
  },
  {
    icon: Phone,
    label: "الهاتف والواتساب",
    value: siteConfig.contactPhone,
    href: `tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`,
    dir: "ltr" as const,
  },
  {
    icon: Clock,
    label: "ساعات العمل",
    value: siteConfig.workingHours,
  },
  {
    icon: MapPin,
    label: "المقر الرئيسي",
    value: siteConfig.contactLocation,
  },
];

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(
    submitContactMessage,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    } else if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Direct contact info */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-primary">تواصل معنا</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              نسعد بالإجابة عن استفساراتك ومقترحاتك
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              هل لديك سؤال حول باقات الشركات، أو ترغب في المساعدة لاختيار القالب
              الأنسب؟ تواصل معنا مباشرة عبر القنوات التالية أو أرسل رسالتك عبر
              النموذج.
            </p>

            <div className="mt-8 space-y-4">
              {contactMethods.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-xl border border-border/80 bg-card p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          dir={item.dir}
                          className="mt-0.5 inline-block text-sm font-semibold text-foreground hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-semibold text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <Card className="border-border/80 bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold">أرسل لنا رسالة</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={formAction} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">الاسم الكامل</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="أدخل اسمك"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">البريد الإلكتروني</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        dir="ltr"
                        placeholder="name@example.com"
                        className="text-left"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">الموضوع</Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      placeholder="مثال: استفسار عن صفحة شركة"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">الرسالة</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="اكتب تفاصيل استفسارك هنا..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="h-11 w-full sm:w-auto sm:px-8"
                  >
                    <Send className="size-4" />
                    {isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
