import {
  ArrowUpLeft,
  Briefcase,
  Layers,
  MapPin,
  MessageCircle,
  Palette,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  hasAnyContactLinks,
  SocialLinksBar,
} from "@/components/profiles/social-links-bar";
import { cn } from "cn";
import type { FreelancerData, ProfileRecord, SocialLinks } from "@/types/profile";

export function FreelancerTemplate({
  profile,
  data,
  social,
}: {
  profile: ProfileRecord;
  data: FreelancerData;
  social: SocialLinks;
}) {
  const showContact = hasAnyContactLinks(social, profile.website_url);
  const waDigits = social.whatsapp?.replace(/[^\d]/g, "");
  const primaryContactHref = waDigits
    ? `https://wa.me/${waDigits}`
    : social.email
      ? `mailto:${social.email}`
      : social.phone
        ? `tel:${social.phone}`
        : showContact
          ? "#freelancer-contact"
          : null;

  return (
    <div className="min-h-full bg-[#FAF7F2]">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
        {/* Studio Hero */}
        <section className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-xs sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border-0 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-100 gap-1.5">
                <Palette className="size-3.5" />
                مستقل
              </Badge>
              {data.availability && (
                <Badge
                  variant="outline"
                  className="rounded-full border-stone-300 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700"
                >
                  {data.availability}
                </Badge>
              )}
            </div>

            {profile.location && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <MapPin className="size-3.5 text-amber-700" />
                {profile.location}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                {profile.full_name}
              </h1>
              {profile.headline && (
                <p className="mt-2 text-lg font-medium text-amber-800 sm:text-xl">
                  {profile.headline}
                </p>
              )}
              {profile.bio && (
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-600 sm:text-base">
                  {profile.bio}
                </p>
              )}
            </div>

            {primaryContactHref && (
              <a
                href={primaryContactHref}
                target={waDigits ? "_blank" : undefined}
                rel={waDigits ? "noopener noreferrer" : undefined}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 shrink-0 gap-2 rounded-2xl bg-stone-900 px-6 text-sm font-semibold text-white hover:bg-stone-800"
                )}
              >
                <MessageCircle className="size-4" />
                اطلب خدمة الآن
              </a>
            )}
          </div>
        </section>

        {/* Portfolio Showcase FIRST (Work-first studio layout) */}
        {data.portfolio.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-amber-700">
                  نماذج مختارة
                </p>
                <h2 className="mt-0.5 flex items-center gap-2 text-xl font-bold text-stone-900 sm:text-2xl">
                  <Layers className="size-5 text-amber-700" />
                  معرض الأعمال
                </h2>
              </div>
              <span className="text-xs font-medium text-stone-500">
                {data.portfolio.length} أعمال
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {data.portfolio.map((item, idx) => (
                <Card
                  key={`${item.title}-${idx}`}
                  className="group overflow-hidden rounded-2xl border-stone-200/90 bg-white transition-all hover:border-amber-400/70 hover:shadow-sm"
                >
                  <div className="flex h-28 items-end justify-between bg-gradient-to-l from-stone-900 via-stone-800 to-amber-950 p-5 text-white">
                    {item.category ? (
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-amber-100 backdrop-blur-xs">
                        {item.category}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-2xl font-bold text-white/25">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <CardContent className="flex flex-col justify-between p-5">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-stone-600">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.link && (
                      <a
                        href={
                          item.link.startsWith("http")
                            ? item.link
                            : `https://${item.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-amber-800 hover:underline"
                      >
                        استعراض العمل
                        <ArrowUpLeft className="size-4" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Services & Packages */}
        {data.services.length > 0 && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-amber-700">
                كيف يمكنني مساعدتك؟
              </p>
              <h2 className="mt-0.5 flex items-center gap-2 text-xl font-bold text-stone-900 sm:text-2xl">
                <Briefcase className="size-5 text-amber-700" />
                الخدمات والباقات
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((service, idx) => (
                <Card
                  key={`${service.title}-${idx}`}
                  className="flex flex-col justify-between rounded-2xl border-stone-200/90 bg-white"
                >
                  <CardContent className="p-6">
                    {service.price && (
                      <span className="inline-block rounded-lg bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900">
                        {service.price}
                      </span>
                    )}
                    <h3 className="mt-3 text-base font-bold text-stone-900">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="mt-2 text-sm leading-relaxed text-stone-600">
                        {service.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Skills Strip */}
        {data.skills.length > 0 && (
          <section className="rounded-2xl border border-stone-200/90 bg-white p-6">
            <h2 className="text-sm font-bold text-stone-900">
              المهارات والتخصصات
            </h2>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1.5 text-xs font-medium text-stone-800 sm:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Closing Contact Banner at Bottom */}
        {showContact && (
          <section
            id="freelancer-contact"
            className="rounded-3xl bg-stone-900 p-7 text-center text-white sm:p-10"
          >
            <p className="text-xs font-semibold text-amber-300">لنعمل معاً</p>
            <h2 className="mt-1.5 text-2xl font-bold text-white">
              هل لديك مشروع في ذهنك؟
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-stone-300">
              تواصل معي عبر الوسيلة الأنسب لك لمناقشة تفاصيل مشروعك والحصول على
              عرض مناسب.
            </p>
            <div className="mt-6">
              <SocialLinksBar
                social={social}
                websiteUrl={profile.website_url}
                centered
                inverted
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
