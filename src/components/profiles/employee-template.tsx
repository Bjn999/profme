import {
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  hasAnyContactLinks,
  SocialLinksBar,
} from "@/components/profiles/social-links-bar";
import { cn } from "cn";
import type { EmployeeData, ProfileRecord, SocialLinks } from "@/types/profile";

export function EmployeeTemplate({
  profile,
  data,
  social,
}: {
  profile: ProfileRecord;
  data: EmployeeData;
  social: SocialLinks;
}) {
  const showContact = hasAnyContactLinks(social, profile.website_url);

  return (
    <div className="min-h-full bg-[#F8F8F7]">
      {/* Executive Dark Masthead */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex size-18 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-2xl font-bold text-white sm:size-20">
                {profile.full_name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-slate-400">
                  ملف تنفيذي ومهني
                </p>
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

            {data.cvUrl && (
              <a
                href={
                  data.cvUrl.startsWith("http")
                    ? data.cvUrl
                    : `https://${data.cvUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "h-10 w-fit gap-2 rounded-lg bg-white px-5 text-slate-900 hover:bg-slate-100"
                )}
              >
                <FileText className="size-4" />
                تحميل السيرة الذاتية
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-slate-300 sm:text-sm">
            {data.currentCompany && (
              <span className="inline-flex items-center gap-2">
                <Building2 className="size-4 text-slate-400" />
                {data.currentCompany}
              </span>
            )}
            {data.yearsOfExperience && (
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-slate-400" />
                خبرة {data.yearsOfExperience}
              </span>
            )}
            {profile.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-slate-400" />
                {profile.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Dossier Body */}
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        {/* Executive Summary */}
        {profile.bio && (
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              الملخص المهني
            </h2>
            <p className="mt-3 whitespace-pre-line border-r-3 border-slate-900 pr-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              {profile.bio}
            </p>
          </section>
        )}

        {/* Vertical Career Timeline */}
        {data.experiences.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Briefcase className="size-5 text-slate-700" />
              المسار الوظيفي والخبرات
            </h2>

            <div className="relative space-y-5 border-r-2 border-slate-200 pr-6">
              {data.experiences.map((exp, idx) => (
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

        {/* Key Achievements */}
        {data.achievements.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <CheckCircle2 className="size-5 text-slate-700" />
              أبرز الإنجازات المهنية
            </h2>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {data.achievements.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Certifications */}
        {(data.skills.length > 0 || data.certifications.length > 0) && (
          <div className="grid gap-5 md:grid-cols-2">
            {data.skills.length > 0 && (
              <Card className="border-slate-200 bg-white shadow-none">
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-slate-900">
                    الكفاءات والمهارات
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

            {data.certifications.length > 0 && (
              <Card className="border-slate-200 bg-white shadow-none">
                <CardContent className="p-6">
                  <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <Award className="size-4 text-slate-700" />
                    الشهادات المهنية
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {data.certifications.map((cert, idx) => (
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

        {/* Bottom Professional Contact Section */}
        {showContact && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  قنوات التواصل المهنية
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  للتواصل المباشر أو الاستشارات والفرص المهنية.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <SocialLinksBar
                social={social}
                websiteUrl={profile.website_url}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
