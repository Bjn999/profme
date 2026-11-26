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

export function ExecutiveDossierTheme({
  data,
}: {
  data: AdaptedProfileSections;
}) {
  const { profile, social } = data;

  return (
    <div className="min-h-full bg-[#F8F8F7]">
      {/* Dark Executive Masthead */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex size-18 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-2xl font-bold text-white sm:size-20">
                {profile.full_name.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium tracking-wide text-slate-400">
                    {data.accountBadge}
                  </p>
                  {data.secondaryBadge && (
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-slate-200">
                      {data.secondaryBadge}
                    </span>
                  )}
                </div>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {profile.full_name}
                </h1>
                {profile.headline && (
                  <p className="mt-1 text-sm font-medium text-slate-300 sm:text-base">
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
                  "h-10 w-fit gap-2 rounded-lg bg-white px-5 text-slate-900 hover:bg-slate-100"
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
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-slate-300 sm:text-sm">
              {data.metrics.map((metric) => (
                <span key={metric.label} className="inline-flex items-center gap-1.5">
                  <span className="text-slate-400">{metric.label}:</span>
                  <span className="font-medium text-white">{metric.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Dossier Body */}
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        {profile.bio && (
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {data.aboutTitle}
            </h2>
            <p className="mt-3 whitespace-pre-line border-r-3 border-slate-900 pr-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              {profile.bio}
            </p>
          </section>
        )}

        {data.vision && (
          <section className="rounded-xl border border-slate-200 bg-slate-100/70 p-6">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Compass className="size-4 text-slate-700" />
              رؤيتنا ورسالتنا
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {data.vision}
            </p>
          </section>
        )}

        {/* Vertical Career Timeline */}
        {data.timeline.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Briefcase className="size-5 text-slate-700" />
              {data.timelineTitle}
            </h2>

            <div className="relative space-y-5 border-r-2 border-slate-200 pr-6">
              {data.timeline.map((exp, idx) => (
                <div key={`${exp.role}-${idx}`} className="relative">
                  <span className="absolute -right-[31px] top-5 flex size-3.5 items-center justify-center rounded-full border-2 border-slate-900 bg-white" />
                  <Card className="border-slate-200/90 bg-white shadow-none">
                    <CardContent className="p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            {exp.role}
                          </h3>
                          {exp.company && (
                            <p className="mt-0.5 text-sm font-medium text-slate-600">
                              {exp.company}
                            </p>
                          )}
                        </div>
                        {exp.period && (
                          <Badge
                            variant="outline"
                            className="border-slate-300 bg-slate-50 text-xs font-medium text-slate-700"
                          >
                            {exp.period}
                          </Badge>
                        )}
                      </div>
                      {exp.summary && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                          {exp.summary}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Showcase / Projects */}
        {data.showcase.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <FolderKanban className="size-5 text-slate-700" />
              {data.showcaseTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.showcase.map((item, idx) => (
                <Card key={`${item.title}-${idx}`} className="border-slate-200 bg-white shadow-none">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      {item.category ? (
                        <Badge variant="outline" className="text-xs text-slate-600">
                          {item.category}
                        </Badge>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      )}
                      {item.link && (
                        <a
                          href={formatExternalUrl(item.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:underline"
                        >
                          استعراض
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </div>
                    <h3 className="mt-2.5 text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {item.description}
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
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Layers className="size-5 text-slate-700" />
              {data.servicesTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.services.map((srv, idx) => (
                <Card key={`${srv.title}-${idx}`} className="border-slate-200 bg-white shadow-none">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {srv.title}
                      </h3>
                      {srv.price && (
                        <Badge className="bg-slate-900 text-white">
                          {srv.price}
                        </Badge>
                      )}
                    </div>
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

        {/* Highlights */}
        {data.highlights.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <CheckCircle2 className="size-5 text-slate-700" />
              {data.highlightsTitle}
            </h2>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {data.highlights.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Certifications */}
        {(data.skills.length > 0 || data.certificates.length > 0) && (
          <div className="grid gap-5 md:grid-cols-2">
            {data.skills.length > 0 && (
              <Card className="border-slate-200 bg-white shadow-none">
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-slate-900">
                    {data.skillsTitle}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.skills.map((skill, idx) => (
                      <span
                        key={`${skill}-${idx}`}
                        className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {data.certificates.length > 0 && (
              <Card className="border-slate-200 bg-white shadow-none">
                <CardContent className="p-6">
                  <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <Award className="size-4 text-slate-700" />
                    {data.certificatesTitle}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {data.certificates.map((cert, idx) => (
                      <li
                        key={`${cert}-${idx}`}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Award className="mt-0.5 size-4 shrink-0 text-slate-500" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Branches */}
        {data.branches.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <MapPin className="size-5 text-slate-700" />
              الفروع ومواقع العمل
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.branches.map((branch, idx) => {
                const branchContact = branch.contact?.trim();
                const branchHref = branchContact
                  ? getBranchContactHref(branchContact)
                  : null;
                return (
                  <Card key={`${branch.city}-${idx}`} className="border-slate-200 bg-white shadow-none">
                    <CardContent className="p-5">
                      <h3 className="text-base font-bold text-slate-900">
                        {branch.city}
                      </h3>
                      {branch.address && (
                        <p className="mt-1 text-sm text-slate-600">{branch.address}</p>
                      )}
                      <div className="mt-3 space-y-1.5">
                        {branch.hours && (
                          <p className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                            <Clock className="size-3.5 text-slate-500" />
                            {branch.hours}
                          </p>
                        )}
                        {branchContact && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-900">
                            <Phone className="size-3.5 shrink-0 text-slate-600" />
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
          <section
            id="profile-contact"
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <p className="text-xs font-semibold text-slate-500">
              {data.contactEyebrow}
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {data.contactTitle}
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {data.contactSubtitle}
            </p>
            <div className="mt-5">
              <SocialLinksBar social={social} websiteUrl={profile.website_url} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
