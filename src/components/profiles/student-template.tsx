import {
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  FolderKanban,
  GraduationCap,
  MapPin,
  Send,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  hasAnyContactLinks,
  SocialLinksBar,
} from "@/components/profiles/social-links-bar";
import { cn } from "cn";
import type { ProfileRecord, SocialLinks, StudentData } from "@/types/profile";

export function StudentTemplate({
  profile,
  data,
  social,
}: {
  profile: ProfileRecord;
  data: StudentData;
  social: SocialLinks;
}) {
  const showContact = hasAnyContactLinks(social, profile.website_url);
  const academicStats = [
    data.university
      ? { label: "الجامعة", value: data.university, icon: BookOpen }
      : null,
    data.major
      ? { label: "التخصص", value: data.major, icon: GraduationCap }
      : null,
    data.graduationYear
      ? { label: "سنة التخرج", value: data.graduationYear, icon: Calendar }
      : null,
    data.gpa ? { label: "المعدل التراكمي", value: data.gpa, icon: Star } : null,
  ].filter(Boolean) as {
    label: string;
    value: string;
    icon: typeof BookOpen;
  }[];

  return (
    <div className="min-h-full bg-[#F7F9FC]">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
        {/* Academic Bento Hero */}
        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="border-indigo-100 bg-white shadow-xs lg:col-span-8">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-18 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-xs sm:size-20 sm:text-3xl">
                    {profile.full_name.charAt(0)}
                  </div>
                  <div>
                    <Badge className="mb-2 border-0 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 gap-1.5">
                      <GraduationCap className="size-3.5" />
                      ملف طالب وخريج
                    </Badge>
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
                      "h-10 gap-2 rounded-xl bg-indigo-600 px-4 text-white hover:bg-indigo-700"
                    )}
                  >
                    <FileText className="size-4" />
                    السيرة الذاتية
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

          {/* Academic Info Bento Tile */}
          <Card className="border-indigo-100 bg-indigo-600 text-white shadow-xs lg:col-span-4">
            <CardContent className="flex h-full flex-col justify-between p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
                  البطاقة الأكاديمية
                </p>
                {academicStats.length > 0 ? (
                  <div className="mt-4 space-y-3.5">
                    {academicStats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className="flex items-start gap-3 rounded-xl bg-white/10 p-3"
                        >
                          <Icon className="mt-0.5 size-4 shrink-0 text-indigo-200" />
                          <div className="min-w-0">
                            <p className="text-[11px] text-indigo-200">
                              {stat.label}
                            </p>
                            <p className="truncate text-sm font-semibold text-white">
                              {stat.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-indigo-100">
                    مساحة مخصصة لعرض المسار الجامعي والمشاريع الأكاديمية.
                  </p>
                )}
              </div>

              {showContact && (
                <a
                  href="#student-contact"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
                >
                  <Send className="size-3.5" />
                  التواصل والروابط
                </a>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Academic Projects Showcase */}
        {data.projects.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
                <FolderKanban className="size-5 text-indigo-600" />
                المشاريع الجامعية والأعمال
              </h2>
              <span className="text-xs font-medium text-slate-500">
                {data.projects.length} مشاريع
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.projects.map((project, idx) => (
                <Card
                  key={`${project.title}-${idx}`}
                  className="group overflow-hidden border-slate-200/80 bg-white transition-all hover:border-indigo-300"
                >
                  <div className="h-1.5 bg-gradient-to-l from-indigo-600 to-sky-400" />
                  <CardContent className="flex h-full flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {project.link && (
                          <a
                            href={
                              project.link.startsWith("http")
                                ? project.link
                                : `https://${project.link}`
                            }
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
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Certificates Bento Row */}
        {(data.skills.length > 0 || data.certificates.length > 0) && (
          <div className="grid gap-4 md:grid-cols-12">
            {data.skills.length > 0 && (
              <Card
                className={cn(
                  "border-slate-200/80 bg-white",
                  data.certificates.length > 0
                    ? "md:col-span-5"
                    : "md:col-span-12"
                )}
              >
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-slate-900">
                    المهارات واللغات
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
                    الدورات والشهادات والأنشطة
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

        {/* Bottom Contact Section */}
        {showContact && (
          <Card
            id="student-contact"
            className="border-indigo-100 bg-white shadow-xs"
          >
            <CardContent className="p-6 text-center sm:p-8">
              <p className="text-xs font-semibold text-indigo-600">
                فرص التدريب والتوظيف
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                تواصل معي
              </h2>
              <p className="mx-auto mt-1.5 max-w-md text-xs text-slate-500 sm:text-sm">
                يسعدني التواصل بشأن فرص التدريب التعاوني أو العمل أو المشاريع
                المشتركة.
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
