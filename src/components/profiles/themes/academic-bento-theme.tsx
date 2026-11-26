import {
  Award,
  Briefcase,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  FileText,
  FolderKanban,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Send,
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

export function AcademicBentoTheme({ data }: { data: AdaptedProfileSections }) {
  const { profile, social } = data;

  return (
    <div className="min-h-full bg-[#F7F9FC]">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
        {/* Bento Hero */}
        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="border-indigo-100 bg-white shadow-xs lg:col-span-8">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-18 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-xs sm:size-20 sm:text-3xl">
                    {profile.full_name.charAt(0)}
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <Badge className="border-0 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                        {data.accountBadge}
                      </Badge>
                      {data.secondaryBadge && (
                        <Badge variant="outline" className="border-indigo-200 text-indigo-800">
                          {data.secondaryBadge}
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {profile.full_name}
                    </h1>
                    {profile.headline && (
                      <p className="mt-1 text-sm font-medium text-slate-600 sm:text-base">
                        {profile.headline}
                      </p>
                    )}
                  </div>
                </div>

                {data.primaryCta && (
                  <a
                    href={data.primaryCta.href}
                    target={data.primaryCta.external ? "_blank" : undefined}
                    rel={data.primaryCta.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "h-10 gap-2 rounded-xl bg-indigo-600 px-4 text-white hover:bg-indigo-700"
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

              {profile.location && (
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 sm:text-sm">
                  <MapPin className="size-4 text-indigo-600" />
                  {profile.location}
                </p>
              )}

              {profile.bio && (
                <p className="mt-5 whitespace-pre-line border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {profile.bio}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Side Bento Info Tile */}
          <Card className="border-indigo-100 bg-indigo-600 text-white shadow-xs lg:col-span-4">
            <CardContent className="flex h-full flex-col justify-between p-6">
              <div>
                <p className="text-xs font-semibold text-indigo-200">
                  بطاقة الملخص
                </p>
                {data.metrics.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {data.metrics.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl bg-white/10 p-3"
                      >
                        <p className="text-[11px] text-indigo-200">
                          {stat.label}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-white">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-indigo-100">
                    صفحة تعريفية منظمة تبرز أبرز المعلومات والأعمال والخدمات.
                  </p>
                )}
              </div>

              {data.hasContactLinks && (
                <a
                  href="#profile-contact"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
                >
                  <Send className="size-3.5" />
                  التواصل والروابط
                </a>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Vision (Company) */}
        {data.vision && (
          <Card className="border-indigo-100 bg-indigo-50/70">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Compass className="size-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  رؤيتنا ورسالتنا
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {data.vision}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline (Employee) */}
        {data.timeline.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
              <Briefcase className="size-5 text-indigo-600" />
              {data.timelineTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.timeline.map((exp, idx) => (
                <Card key={`${exp.role}-${idx}`} className="border-slate-200/80 bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {exp.role}
                        </h3>
                        {exp.company && (
                          <p className="text-sm font-medium text-indigo-600">
                            {exp.company}
                          </p>
                        )}
                      </div>
                      {exp.period && (
                        <Badge variant="outline" className="text-xs">
                          {exp.period}
                        </Badge>
                      )}
                    </div>
                    {exp.summary && (
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                        {exp.summary}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Showcase / Projects / Portfolio */}
        {data.showcase.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
                <FolderKanban className="size-5 text-indigo-600" />
                {data.showcaseTitle}
              </h2>
              <span className="text-xs font-medium text-slate-500">
                {data.showcase.length} عناصر
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.showcase.map((item, idx) => (
                <Card
                  key={`${item.title}-${idx}`}
                  className="overflow-hidden border-slate-200/80 bg-white transition-all hover:border-indigo-300"
                >
                  <div className="h-1.5 bg-gradient-to-l from-indigo-600 to-sky-400" />
                  <CardContent className="flex h-full flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          {item.category && (
                            <Badge variant="outline" className="text-[11px]">
                              {item.category}
                            </Badge>
                          )}
                        </div>
                        {item.link && (
                          <a
                            href={formatExternalUrl(item.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
                          >
                            معاينة
                            <ExternalLink className="size-3.5" />
                          </a>
                        )}
                      </div>
                      <h3 className="mt-3 text-base font-bold text-slate-900">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Services (Freelancer / Company) */}
        {data.services.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
              <Layers className="size-5 text-indigo-600" />
              {data.servicesTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((srv, idx) => (
                <Card key={`${srv.title}-${idx}`} className="border-slate-200/80 bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {srv.price && (
                        <Badge className="border-0 bg-indigo-600 text-white">
                          {srv.price}
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-3 text-base font-bold text-slate-900">
                      {srv.title}
                    </h3>
                    {srv.description && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {srv.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Highlights (Employee / Company) */}
        {data.highlights.length > 0 && (
          <Card className="border-slate-200/80 bg-white">
            <CardContent className="p-6">
              <h2 className="text-base font-bold text-slate-900">
                {data.highlightsTitle}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {data.highlights.map((item, idx) => (
                  <div
                    key={`${item}-${idx}`}
                    className="flex items-start gap-2.5 rounded-xl bg-indigo-50/50 p-3.5 text-sm text-slate-800"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigo-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills & Certificates Bento Row */}
        {(data.skills.length > 0 || data.certificates.length > 0) && (
          <div className="grid gap-4 md:grid-cols-12">
            {data.skills.length > 0 && (
              <Card
                className={cn(
                  "border-slate-200/80 bg-white",
                  data.certificates.length > 0 ? "md:col-span-5" : "md:col-span-12"
                )}
              >
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-slate-900">
                    {data.skillsTitle}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.skills.map((skill, idx) => (
                      <span
                        key={`${skill}-${idx}`}
                        className="rounded-lg border border-indigo-100 bg-indigo-50/70 px-3 py-1.5 text-xs font-medium text-indigo-900 sm:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {data.certificates.length > 0 && (
              <Card
                className={cn(
                  "border-slate-200/80 bg-white",
                  data.skills.length > 0 ? "md:col-span-7" : "md:col-span-12"
                )}
              >
                <CardContent className="p-6">
                  <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <Award className="size-4 text-indigo-600" />
                    {data.certificatesTitle}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {data.certificates.map((cert, idx) => (
                      <li
                        key={`${cert}-${idx}`}
                        className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800"
                      >
                        <Award className="mt-0.5 size-4 shrink-0 text-indigo-600" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Branches (Company) */}
        {data.branches.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <MapPin className="size-5 text-indigo-600" />
              الفروع ومواقع العمل
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.branches.map((branch, idx) => {
                const branchContact = branch.contact?.trim();
                const branchHref = branchContact
                  ? getBranchContactHref(branchContact)
                  : null;
                return (
                  <Card key={`${branch.city}-${idx}`} className="border-slate-200/80 bg-white">
                    <CardContent className="p-5">
                      <h3 className="text-base font-bold text-slate-900">
                        {branch.city}
                      </h3>
                      {branch.address && (
                        <p className="mt-1 text-sm text-slate-600">
                          {branch.address}
                        </p>
                      )}
                      <div className="mt-3 space-y-1.5">
                        {branch.hours && (
                          <p className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                            <Clock className="size-3.5 text-indigo-600" />
                            {branch.hours}
                          </p>
                        )}
                        {branchContact && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-700">
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

        {/* Bottom Contact */}
        {data.hasContactLinks && (
          <Card id="profile-contact" className="border-indigo-100 bg-white shadow-xs">
            <CardContent className="p-6 text-center sm:p-8">
              <p className="text-xs font-semibold text-indigo-600">
                {data.contactEyebrow}
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                {data.contactTitle}
              </h2>
              <p className="mx-auto mt-1.5 max-w-md text-xs text-slate-500 sm:text-sm">
                {data.contactSubtitle}
              </p>
              <div className="mt-5">
                <SocialLinksBar
                  social={social}
                  websiteUrl={profile.website_url}
                  centered
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
