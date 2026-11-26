import {
  ArrowUpLeft,
  Award,
  Clock,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SocialLinksBar } from "@/components/profiles/social-links-bar";
import {
  formatExternalUrl,
  getBranchContactHref,
  type AdaptedProfileSections,
} from "@/lib/profile-sections";

export function EditorialMinimalTheme({
  data,
}: {
  data: AdaptedProfileSections;
}) {
  const { profile, social } = data;

  return (
    <div className="min-h-full bg-[#FCFCFA] text-zinc-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Editorial Magazine Header */}
        <header className="border-b-2 border-zinc-900 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-[#C2410C]">
            <span>{data.accountBadge}</span>
            {data.secondaryBadge && (
              <span className="text-zinc-500">{data.secondaryBadge}</span>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
                {profile.full_name}
              </h1>
              {profile.headline && (
                <p className="mt-3 max-w-2xl text-lg font-normal text-zinc-600 sm:text-xl">
                  {profile.headline}
                </p>
              )}
            </div>

            {data.primaryCta && (
              <a
                href={data.primaryCta.href}
                target={data.primaryCta.external ? "_blank" : undefined}
                rel={data.primaryCta.external ? "noopener noreferrer" : undefined}
                className="inline-flex h-11 w-fit shrink-0 items-center gap-2 border border-zinc-900 bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-[#C2410C] hover:border-[#C2410C]"
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
            <div className="mt-8 grid gap-4 border-t border-zinc-200 pt-5 sm:grid-cols-3 lg:grid-cols-4">
              {data.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-[11px] font-medium text-zinc-400">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-zinc-900">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </header>

        <div className="divide-y divide-zinc-200">
          {/* About & Vision */}
          {(profile.bio || data.vision) && (
            <section className="grid gap-8 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C2410C]">
                  {data.aboutTitle}
                </h2>
              </div>
              <div className="space-y-5 md:col-span-8">
                {profile.bio && (
                  <p className="whitespace-pre-line text-base leading-relaxed text-zinc-700">
                    {profile.bio}
                  </p>
                )}
                {data.vision && (
                  <blockquote className="border-r-2 border-[#C2410C] pr-4 text-sm italic leading-relaxed text-zinc-600">
                    {data.vision}
                  </blockquote>
                )}
              </div>
            </section>
          )}

          {/* Timeline */}
          {data.timeline.length > 0 && (
            <section className="grid gap-8 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C2410C]">
                  {data.timelineTitle}
                </h2>
              </div>
              <div className="space-y-6 md:col-span-8">
                {data.timeline.map((exp, idx) => (
                  <div
                    key={`${exp.role}-${idx}`}
                    className="border-b border-zinc-100 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-zinc-950">
                        {exp.role}
                      </h3>
                      {exp.period && (
                        <span className="text-xs font-medium text-zinc-500">
                          {exp.period}
                        </span>
                      )}
                    </div>
                    {exp.company && (
                      <p className="mt-0.5 text-sm font-medium text-[#C2410C]">
                        {exp.company}
                      </p>
                    )}
                    {exp.summary && (
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                        {exp.summary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Showcase */}
          {data.showcase.length > 0 && (
            <section className="grid gap-8 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C2410C]">
                  {data.showcaseTitle}
                </h2>
              </div>
              <div className="space-y-6 md:col-span-8">
                {data.showcase.map((item, idx) => (
                  <div
                    key={`${item.title}-${idx}`}
                    className="group border-b border-zinc-100 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-semibold text-zinc-400">
                          {String(idx + 1).padStart(2, "0")}
                          {item.category ? ` — ${item.category}` : ""}
                        </span>
                        <h3 className="mt-1 text-lg font-bold text-zinc-950">
                          {item.title}
                        </h3>
                      </div>
                      {item.link && (
                        <a
                          href={formatExternalUrl(item.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#C2410C] hover:underline"
                        >
                          معاينة
                          <ArrowUpLeft className="size-4" />
                        </a>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Services */}
          {data.services.length > 0 && (
            <section className="grid gap-8 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C2410C]">
                  {data.servicesTitle}
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:col-span-8">
                {data.services.map((srv, idx) => (
                  <div
                    key={`${srv.title}-${idx}`}
                    className="border-t border-zinc-900 pt-4"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-zinc-950">
                        {srv.title}
                      </h3>
                      {srv.price && (
                        <span className="text-xs font-bold text-[#C2410C]">
                          {srv.price}
                        </span>
                      )}
                    </div>
                    {srv.description && (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                        {srv.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Highlights */}
          {data.highlights.length > 0 && (
            <section className="grid gap-8 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C2410C]">
                  {data.highlightsTitle}
                </h2>
              </div>
              <ul className="space-y-3 md:col-span-8">
                {data.highlights.map((item, idx) => (
                  <li
                    key={`${item}-${idx}`}
                    className="flex items-baseline gap-3 text-sm leading-relaxed text-zinc-800"
                  >
                    <span className="text-xs font-bold text-[#C2410C]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills & Certificates */}
          {(data.skills.length > 0 || data.certificates.length > 0) && (
            <section className="grid gap-8 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C2410C]">
                  {data.skills.length > 0 ? data.skillsTitle : data.certificatesTitle}
                </h2>
              </div>
              <div className="space-y-6 md:col-span-8">
                {data.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, idx) => (
                      <span
                        key={`${skill}-${idx}`}
                        className="border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {data.certificates.length > 0 && (
                  <ul className="space-y-2.5">
                    {data.certificates.map((cert, idx) => (
                      <li
                        key={`${cert}-${idx}`}
                        className="flex items-start gap-2 text-sm text-zinc-700"
                      >
                        <Award className="mt-0.5 size-4 shrink-0 text-[#C2410C]" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}

          {/* Branches */}
          {data.branches.length > 0 && (
            <section className="grid gap-8 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C2410C]">
                  الفروع ومواقع العمل
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:col-span-8">
                {data.branches.map((branch, idx) => {
                  const branchContact = branch.contact?.trim();
                  const branchHref = branchContact
                    ? getBranchContactHref(branchContact)
                    : null;
                  return (
                    <div
                      key={`${branch.city}-${idx}`}
                      className="border-t border-zinc-300 pt-4"
                    >
                      <h3 className="flex items-center gap-1.5 text-base font-bold text-zinc-950">
                        <MapPin className="size-4 text-[#C2410C]" />
                        {branch.city}
                      </h3>
                      {branch.address && (
                        <p className="mt-1 text-sm text-zinc-600">
                          {branch.address}
                        </p>
                      )}
                      {branch.hours && (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-zinc-500">
                          <Clock className="size-3.5" />
                          {branch.hours}
                        </p>
                      )}
                      {branchContact && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#C2410C]">
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
                  );
                })}
              </div>
            </section>
          )}

          {/* Bottom Contact Section */}
          {data.hasContactLinks && (
            <section id="profile-contact" className="py-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C2410C]">
                {data.contactEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-950">
                {data.contactTitle}
              </h2>
              <p className="mt-1.5 max-w-lg text-sm text-zinc-600">
                {data.contactSubtitle}
              </p>
              <div className="mt-6">
                <SocialLinksBar
                  social={social}
                  websiteUrl={profile.website_url}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
