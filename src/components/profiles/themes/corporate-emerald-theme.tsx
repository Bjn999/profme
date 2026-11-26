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
import { Card, CardContent } from "@/components/ui/card";
import { SocialLinksBar } from "@/components/profiles/social-links-bar";
import {
  formatExternalUrl,
  getBranchContactHref,
  type AdaptedProfileSections,
} from "@/lib/profile-sections";

export function CorporateEmeraldTheme({
  data,
}: {
  data: AdaptedProfileSections;
}) {
  const { profile, social } = data;

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
                  <Badge className="border-0 bg-white/15 text-white hover:bg-white/20">
                    {data.accountBadge}
                  </Badge>
                  {data.secondaryBadge && (
                    <Badge className="border-0 bg-black/15 text-white/95 hover:bg-black/20">
                      {data.secondaryBadge}
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

            {data.primaryCta && (
              <a
                href={data.primaryCta.href}
                target={data.primaryCta.external ? "_blank" : undefined}
                rel={data.primaryCta.external ? "noopener noreferrer" : undefined}
                className="inline-flex h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
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
            <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
              {data.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl bg-white/10 px-4 py-3"
                >
                  <p className="text-[11px] text-white/75">{metric.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
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
                  <p className="text-xs font-semibold text-primary">تعريف</p>
                  <h2 className="mt-1 text-xl font-bold text-foreground">
                    {data.aboutTitle}
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

        {/* Services */}
        {data.services.length > 0 && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-primary">ما نقدمه</p>
              <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
                <Layers className="size-5 text-primary" />
                {data.servicesTitle}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((service, idx) => (
                <Card
                  key={`${service.title}-${idx}`}
                  className="border-border/80 bg-white transition-colors hover:border-primary/40"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {service.price && (
                        <Badge variant="secondary">{service.price}</Badge>
                      )}
                    </div>
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

        {/* Showcase / Projects */}
        {data.showcase.length > 0 && (
          <section className="space-y-5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
              <FolderKanban className="size-5 text-primary" />
              {data.showcaseTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.showcase.map((item, idx) => (
                <Card key={`${item.title}-${idx}`} className="border-border/80 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {item.link && (
                        <a
                          href={formatExternalUrl(item.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          معاينة
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </div>
                    <h3 className="mt-3 text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Timeline */}
        {data.timeline.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Briefcase className="size-5 text-primary" />
              {data.timelineTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.timeline.map((exp, idx) => (
                <Card key={`${exp.role}-${idx}`} className="border-border/80 bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-foreground">
                          {exp.role}
                        </h3>
                        {exp.company && (
                          <p className="text-sm font-medium text-primary">
                            {exp.company}
                          </p>
                        )}
                      </div>
                      {exp.period && <Badge variant="outline">{exp.period}</Badge>}
                    </div>
                    {exp.summary && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {exp.summary}
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
          <section className="rounded-2xl border border-border/80 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              {data.highlightsTitle}
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

        {/* Skills & Certificates */}
        {(data.skills.length > 0 || data.certificates.length > 0) && (
          <div className="grid gap-5 md:grid-cols-2">
            {data.skills.length > 0 && (
              <Card className="border-border/80 bg-white">
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-foreground">
                    {data.skillsTitle}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.skills.map((skill, idx) => (
                      <Badge key={`${skill}-${idx}`} variant="secondary" className="px-3 py-1.5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {data.certificates.length > 0 && (
              <Card className="border-border/80 bg-white">
                <CardContent className="p-6">
                  <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                    <Award className="size-4 text-primary" />
                    {data.certificatesTitle}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {data.certificates.map((cert, idx) => (
                      <li key={`${cert}-${idx}`} className="flex items-start gap-2.5 text-sm text-foreground">
                        <Award className="mt-0.5 size-4 shrink-0 text-primary" />
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
                  <Card key={`${branch.city}-${idx}`} className="border-border/80 bg-white">
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
                                  <a href={branchHref} dir="ltr" className="hover:underline">
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

        {/* Bottom Contact */}
        {data.hasContactLinks && (
          <section
            id="profile-contact"
            className="rounded-2xl border border-primary/20 bg-white p-6 text-center shadow-xs sm:p-10"
          >
            <p className="text-xs font-semibold text-primary">
              {data.contactEyebrow}
            </p>
            <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
              {data.contactTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
              {data.contactSubtitle}
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
