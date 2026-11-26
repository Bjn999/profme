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
import { SocialLinksBar } from "@/components/profiles/social-links-bar";
import {
  formatExternalUrl,
  getBranchContactHref,
  type AdaptedProfileSections,
} from "@/lib/profile-sections";

export function ObsidianLuxeTheme({
  data,
}: {
  data: AdaptedProfileSections;
}) {
  const { profile, social } = data;

  return (
    <div className="min-h-full bg-[#0B0F17] text-slate-100">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 sm:py-16">
        {/* Luxury Obsidian Hero */}
        <section className="rounded-3xl border border-white/10 bg-[#121826] p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#E5B95C]/35 bg-[#E5B95C]/10 px-3.5 py-1 text-xs font-semibold text-[#E5B95C]">
                {data.accountBadge}
              </span>
              {data.secondaryBadge && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {data.secondaryBadge}
                </span>
              )}
            </div>

            {profile.location && (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="size-3.5 text-[#E5B95C]" />
                {profile.location}
              </span>
            )}
          </div>

          <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex size-18 shrink-0 items-center justify-center rounded-2xl border border-[#E5B95C]/30 bg-gradient-to-br from-[#E5B95C]/20 to-transparent text-2xl font-bold text-[#E5B95C] sm:size-22 sm:text-3xl">
                {profile.full_name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {profile.full_name}
                </h1>
                {profile.headline && (
                  <p className="mt-2 text-base font-medium text-[#E5B95C]/90 sm:text-lg">
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
                className="inline-flex h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E5B95C] px-6 text-sm font-bold text-[#0B0F17] transition-colors hover:bg-[#efc874]"
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

          {profile.bio && (
            <p className="mt-7 whitespace-pre-line border-t border-white/10 pt-6 text-sm leading-relaxed text-slate-300 sm:text-base">
              {profile.bio}
            </p>
          )}

          {data.metrics.length > 0 && (
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {data.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5"
                >
                  <p className="text-[11px] text-slate-400">{metric.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Vision */}
        {data.vision && (
          <section className="rounded-2xl border border-[#E5B95C]/25 bg-gradient-to-l from-[#E5B95C]/10 to-transparent p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#E5B95C]">
              <Compass className="size-4" />
              رؤيتنا ورسالتنا
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-200 sm:text-base">
              {data.vision}
            </p>
          </section>
        )}

        {/* Timeline */}
        {data.timeline.length > 0 && (
          <section className="space-y-5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <Briefcase className="size-5 text-[#E5B95C]" />
              {data.timelineTitle}
            </h2>
            <div className="space-y-4">
              {data.timeline.map((exp, idx) => (
                <div
                  key={`${exp.role}-${idx}`}
                  className="rounded-2xl border border-white/10 bg-[#121826] p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {exp.role}
                      </h3>
                      {exp.company && (
                        <p className="mt-0.5 text-sm font-medium text-[#E5B95C]">
                          {exp.company}
                        </p>
                      )}
                    </div>
                    {exp.period && (
                      <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {exp.period}
                      </span>
                    )}
                  </div>
                  {exp.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {exp.summary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Showcase / Projects */}
        {data.showcase.length > 0 && (
          <section className="space-y-5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <Layers className="size-5 text-[#E5B95C]" />
              {data.showcaseTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {data.showcase.map((item, idx) => (
                <div
                  key={`${item.title}-${idx}`}
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121826] p-6 transition-colors hover:border-[#E5B95C]/40"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold tracking-widest text-[#E5B95C]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {item.category && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.link && (
                    <a
                      href={formatExternalUrl(item.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-[#E5B95C] hover:underline"
                    >
                      عرض التفاصيل
                      <ArrowUpLeft className="size-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        {data.services.length > 0 && (
          <section className="space-y-5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <Layers className="size-5 text-[#E5B95C]" />
              {data.servicesTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((srv, idx) => (
                <div
                  key={`${srv.title}-${idx}`}
                  className="rounded-2xl border border-white/10 bg-[#121826] p-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#E5B95C]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {srv.price && (
                      <span className="rounded-md bg-[#E5B95C]/15 px-2.5 py-1 text-xs font-semibold text-[#E5B95C]">
                        {srv.price}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">
                    {srv.title}
                  </h3>
                  {srv.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
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
          <section className="rounded-2xl border border-white/10 bg-[#121826] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white">
              {data.highlightsTitle}
            </h2>
            <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {data.highlights.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm text-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#E5B95C]" />
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
              <div className="rounded-2xl border border-white/10 bg-[#121826] p-6">
                <h2 className="text-base font-bold text-white">
                  {data.skillsTitle}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <span
                      key={`${skill}-${idx}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.certificates.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#121826] p-6">
                <h2 className="flex items-center gap-2 text-base font-bold text-white">
                  <Award className="size-4 text-[#E5B95C]" />
                  {data.certificatesTitle}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {data.certificates.map((cert, idx) => (
                    <li
                      key={`${cert}-${idx}`}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <Award className="mt-0.5 size-4 shrink-0 text-[#E5B95C]" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Branches */}
        {data.branches.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <MapPin className="size-5 text-[#E5B95C]" />
              الفروع ومواقع العمل
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.branches.map((branch, idx) => {
                const branchContact = branch.contact?.trim();
                const branchHref = branchContact
                  ? getBranchContactHref(branchContact)
                  : null;
                return (
                  <div
                    key={`${branch.city}-${idx}`}
                    className="rounded-2xl border border-white/10 bg-[#121826] p-5"
                  >
                    <h3 className="text-base font-bold text-white">
                      {branch.city}
                    </h3>
                    {branch.address && (
                      <p className="mt-1 text-sm text-slate-400">
                        {branch.address}
                      </p>
                    )}
                    <div className="mt-3 space-y-1.5">
                      {branch.hours && (
                        <p className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                          <Clock className="size-3.5 text-[#E5B95C]" />
                          {branch.hours}
                        </p>
                      )}
                      {branchContact && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#E5B95C]">
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
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Contact */}
        {data.hasContactLinks && (
          <section
            id="profile-contact"
            className="rounded-3xl border border-[#E5B95C]/25 bg-[#121826] p-7 text-center sm:p-10"
          >
            <p className="text-xs font-semibold text-[#E5B95C]">
              {data.contactEyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold text-white">
              {data.contactTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
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
