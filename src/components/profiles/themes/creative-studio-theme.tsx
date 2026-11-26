import {
  ArrowUpLeft,
  Award,
  Briefcase,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SocialLinksBar } from "@/components/profiles/social-links-bar";
import {
  formatExternalUrl,
  getBranchContactHref,
  type AdaptedProfileSections,
} from "@/lib/profile-sections";
import { cn } from "cn";

export function CreativeStudioTheme({
  data,
}: {
  data: AdaptedProfileSections;
}) {
  const { profile, social } = data;

  return (
    <div className="min-h-full bg-[#FAF7F2]">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
        {/* Studio Hero */}
        <section className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-xs sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border-0 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-100">
                {data.accountBadge}
              </Badge>
              {data.secondaryBadge && (
                <Badge
                  variant="outline"
                  className="rounded-full border-stone-300 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700"
                >
                  {data.secondaryBadge}
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

            {data.primaryCta && (
              <a
                href={data.primaryCta.href}
                target={data.primaryCta.external ? "_blank" : undefined}
                rel={data.primaryCta.external ? "noopener noreferrer" : undefined}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 shrink-0 gap-2 rounded-2xl bg-stone-900 px-6 text-sm font-semibold text-white hover:bg-stone-800"
                )}
              >
                {data.primaryCta.kind === "cv" ? (
                  <FileText className="size-4" />
                ) : (
                  <MessageCircle className="size-4" />
                )}
                {data.primaryCta.label}
              </a>
            )}
          </div>

          {data.metrics.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3 border-t border-stone-100 pt-5">
              {data.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl bg-stone-50 px-3.5 py-2 text-xs"
                >
                  <span className="text-stone-500">{m.label}: </span>
                  <span className="font-semibold text-stone-900">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Vision */}
        {data.vision && (
          <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-stone-900">
              <Compass className="size-4 text-amber-800" />
              رؤيتنا ورسالتنا
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-700">
              {data.vision}
            </p>
          </section>
        )}

        {/* Showcase / Portfolio FIRST */}
        {data.showcase.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-amber-700">
                  نماذج مختارة
                </p>
                <h2 className="mt-0.5 flex items-center gap-2 text-xl font-bold text-stone-900 sm:text-2xl">
                  <Layers className="size-5 text-amber-700" />
                  {data.showcaseTitle}
                </h2>
              </div>
              <span className="text-xs font-medium text-stone-500">
                {data.showcase.length} عناصر
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {data.showcase.map((item, idx) => (
                <Card
                  key={`${item.title}-${idx}`}
                  className="overflow-hidden rounded-2xl border-stone-200/90 bg-white transition-all hover:border-amber-400/70 hover:shadow-sm"
                >
                  <div className="flex h-24 items-end justify-between bg-gradient-to-l from-stone-900 via-stone-800 to-amber-950 p-5 text-white">
                    {item.category ? (
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-amber-100">
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
                        href={formatExternalUrl(item.link)}
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

        {/* Timeline (Employee) */}
        {data.timeline.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900">
              <Briefcase className="size-5 text-amber-700" />
              {data.timelineTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.timeline.map((exp, idx) => (
                <Card key={`${exp.role}-${idx}`} className="rounded-2xl border-stone-200/90 bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-stone-900">
                          {exp.role}
                        </h3>
                        {exp.company && (
                          <p className="text-sm font-medium text-amber-800">
                            {exp.company}
                          </p>
                        )}
                      </div>
                      {exp.period && (
                        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900">
                          {exp.period}
                        </span>
                      )}
                    </div>
                    {exp.summary && (
                      <p className="mt-2.5 text-sm leading-relaxed text-stone-600">
                        {exp.summary}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        {data.services.length > 0 && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-amber-700">
                كيف يمكننا مساعدتك؟
              </p>
              <h2 className="mt-0.5 flex items-center gap-2 text-xl font-bold text-stone-900 sm:text-2xl">
                <Briefcase className="size-5 text-amber-700" />
                {data.servicesTitle}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((service, idx) => (
                <Card
                  key={`${service.title}-${idx}`}
                  className="rounded-2xl border-stone-200/90 bg-white"
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

        {/* Highlights */}
        {data.highlights.length > 0 && (
          <section className="rounded-2xl border border-stone-200/90 bg-white p-6">
            <h2 className="text-base font-bold text-stone-900">
              {data.highlightsTitle}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {data.highlights.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-start gap-2.5 rounded-xl bg-stone-50 p-3.5 text-sm text-stone-800"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-700" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="rounded-2xl border border-stone-200/90 bg-white p-6">
            <h2 className="text-sm font-bold text-stone-900">
              {data.skillsTitle}
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

        {/* Certificates */}
        {data.certificates.length > 0 && (
          <section className="rounded-2xl border border-stone-200/90 bg-white p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-stone-900">
              <Award className="size-4 text-amber-700" />
              {data.certificatesTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {data.certificates.map((cert, idx) => (
                <li
                  key={`${cert}-${idx}`}
                  className="flex items-start gap-2.5 text-sm text-stone-700"
                >
                  <Award className="mt-0.5 size-4 shrink-0 text-amber-700" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Branches */}
        {data.branches.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900">
              <MapPin className="size-5 text-amber-700" />
              الفروع ومواقع العمل
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.branches.map((branch, idx) => {
                const branchContact = branch.contact?.trim();
                const branchHref = branchContact
                  ? getBranchContactHref(branchContact)
                  : null;
                return (
                  <Card key={`${branch.city}-${idx}`} className="rounded-2xl border-stone-200/90 bg-white">
                    <CardContent className="p-5">
                      <h3 className="text-base font-bold text-stone-900">
                        {branch.city}
                      </h3>
                      {branch.address && (
                        <p className="mt-1 text-sm text-stone-600">{branch.address}</p>
                      )}
                      <div className="mt-3 space-y-1.5">
                        {branch.hours && (
                          <p className="inline-flex items-center gap-1.5 text-xs text-stone-600">
                            <Clock className="size-3.5 text-amber-700" />
                            {branch.hours}
                          </p>
                        )}
                        {branchContact && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-800">
                            <Phone className="size-3.5 shrink-0" />
                            {branchHref ? (
                              <a href={branchHref} dir="ltr" className="hover:underline">
                                {branchContact}
                              </a>
                            ) : (
                              <span>{branchContact}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Closing Contact Banner */}
        {data.hasContactLinks && (
          <section
            id="profile-contact"
            className="rounded-3xl bg-stone-900 p-7 text-center text-white sm:p-10"
          >
            <p className="text-xs font-semibold text-amber-300">
              {data.contactEyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold text-white">
              {data.contactTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-stone-300">
              {data.contactSubtitle}
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
