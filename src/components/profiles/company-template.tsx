import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  hasAnyContactLinks,
  SocialLinksBar,
} from "@/components/profiles/social-links-bar";
import type { CompanyData, ProfileRecord, SocialLinks } from "@/types/profile";

function getBranchContactHref(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.includes("@") && !trimmed.includes(" ")) {
    return `mailto:${trimmed}`;
  }
  if (/^[+\d\s\-()]{6,}$/.test(trimmed)) {
    return `tel:${trimmed.replace(/\s+/g, "")}`;
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return null;
}

export function CompanyTemplate({
  profile,
  data,
  social,
}: {
  profile: ProfileRecord;
  data: CompanyData;
  social: SocialLinks;
}) {
  const showContact = hasAnyContactLinks(social, profile.website_url);

  const metrics = [
    data.foundedYear
      ? { label: "سنة التأسيس", value: data.foundedYear, icon: Calendar }
      : null,
    data.teamSize
      ? { label: "فريق العمل", value: data.teamSize, icon: Users }
      : null,
    profile.location
      ? { label: "المقر الرئيسي", value: profile.location, icon: MapPin }
      : null,
  ].filter(Boolean) as {
    label: string;
    value: string;
    icon: typeof Calendar;
  }[];

  return (
    <div className="min-h-full bg-[#F5F7F6]">
      {/* Corporate Hero Band */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex size-18 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-3xl font-bold text-white sm:size-20">
                {profile.full_name.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-white/15 text-white hover:bg-white/20 gap-1.5">
                    <Building2 className="size-3.5" />
                    ملف شركة
                  </Badge>
                  {data.industry && (
                    <Badge className="border-0 bg-black/15 text-white/95 hover:bg-black/20">
                      {data.industry}
                    </Badge>
                  )}
                </div>
                <h1 className="mt-2.5 text-2xl font-bold tracking-tight sm:text-4xl">
                  {profile.full_name}
                </h1>
                {profile.headline && (
                  <p className="mt-1.5 max-w-2xl text-sm text-primary-foreground/85 sm:text-base">
                    {profile.headline}
                  </p>
                )}
              </div>
            </div>

            {showContact && (
              <a
                href="#company-contact"
                className="inline-flex h-11 w-fit shrink-0 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
              >
                تواصل معنا
              </a>
            )}
          </div>

          {metrics.length > 0 && (
            <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3"
                  >
                    <Icon className="size-5 shrink-0 text-white/80" />
                    <div>
                      <p className="text-[11px] text-white/75">
                        {metric.label}
                      </p>
                      <p className="text-sm font-bold text-white">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
        {/* About & Vision Split */}
        {(profile.bio || data.vision) && (
          <section className="grid gap-5 lg:grid-cols-12">
            {profile.bio && (
              <Card
                className={
                  data.vision
                    ? "border-border/80 bg-white lg:col-span-7"
                    : "border-border/80 bg-white lg:col-span-12"
                }
              >
                <CardContent className="p-6 sm:p-8">
                  <p className="text-xs font-semibold text-primary">من نحن</p>
                  <h2 className="mt-1 text-xl font-bold text-foreground">
                    نبذة عن الشركة
                  </h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {profile.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {data.vision && (
              <Card
                className={
                  profile.bio
                    ? "border-primary/15 bg-secondary/50 lg:col-span-5"
                    : "border-primary/15 bg-secondary/50 lg:col-span-12"
                }
              >
                <CardContent className="flex h-full flex-col justify-center p-6 sm:p-8">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Compass className="size-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-foreground">
                    رؤيتنا ورسالتنا
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/85 sm:text-base">
                    {data.vision}
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        )}

        {/* Corporate Services Catalog */}
        {data.services.length > 0 && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-primary">
                ما نقدمه لعملائنا
              </p>
              <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
                <Layers className="size-5 text-primary" />
                خدماتنا وحلولنا
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((service, idx) => (
                <Card
                  key={`${service.title}-${idx}`}
                  className="border-border/80 bg-white transition-colors hover:border-primary/40"
                >
                  <CardContent className="p-6">
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-base font-bold text-foreground">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Why Us / Highlights */}
        {data.highlights.length > 0 && (
          <section className="rounded-2xl border border-border/80 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              ما يميزنا
            </h2>
            <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {data.highlights.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-start gap-3 rounded-xl bg-muted/45 p-4 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Branches & Locations (with optional per-branch contact) */}
        {data.branches.length > 0 && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-primary">تواجدنا</p>
              <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
                <MapPin className="size-5 text-primary" />
                الفروع ومواقع العمل
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.branches.map((branch, idx) => {
                const branchContact = branch.contact?.trim();
                const branchHref = branchContact
                  ? getBranchContactHref(branchContact)
                  : null;

                return (
                  <Card
                    key={`${branch.city}-${idx}`}
                    className="border-border/80 bg-white"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                          <MapPin className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-foreground">
                            {branch.city}
                          </h3>
                          {branch.address && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {branch.address}
                            </p>
                          )}

                          <div className="mt-3 flex flex-col gap-1.5">
                            {branch.hours && (
                              <p className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                                <Clock className="size-3.5 text-primary" />
                                {branch.hours}
                              </p>
                            )}

                            {branchContact && (
                              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                                <Phone className="size-3.5 shrink-0" />
                                {branchHref ? (
                                  <a
                                    href={branchHref}
                                    dir="ltr"
                                    className="hover:underline"
                                  >
                                    {branchContact}
                                  </a>
                                ) : (
                                  <span>{branchContact}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Official Contact Section */}
        {showContact && (
          <section
            id="company-contact"
            className="rounded-2xl border border-primary/20 bg-white p-6 text-center shadow-xs sm:p-10"
          >
            <p className="text-xs font-semibold text-primary">
              قنوات التواصل الرسمية
            </p>
            <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
              تواصل مع {profile.full_name}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
              يسعد فريقنا باستقبال استفساراتكم وطلبات التعاون عبر القنوات
              التالية.
            </p>
            <div className="mt-6">
              <SocialLinksBar
                social={social}
                websiteUrl={profile.website_url}
                centered
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
