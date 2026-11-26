"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Check,
  Eye,
  EyeOff,
  Palette,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import {
  togglePublishAction,
  updateProfileAction,
} from "@/app/dashboard/actions";
import {
  PROFILE_TEMPLATES,
  resolveTemplateKey,
  type TemplateKey,
} from "@/lib/templates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";
import {
  accountTypeLabels,
  defaultCompanyData,
  defaultEmployeeData,
  defaultFreelancerData,
  defaultStudentData,
  normalizeCustomData,
  normalizeSocialLinks,
  type CompanyData,
  type EmployeeData,
  type FreelancerData,
  type ProfileRecord,
  type SocialLinks,
  type StudentData,
} from "@/types/profile";

function parseList(text: string): string[] {
  return text
    .split(/[\n،,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProfileEditor({
  initialProfile,
  activeSlug,
}: {
  initialProfile: ProfileRecord;
  activeSlug: string;
}) {
  const router = useRouter();
  const initialCustom = normalizeCustomData(initialProfile.custom_sections);
  const initialSocial = normalizeSocialLinks(initialProfile.social_links);

  const accountType = initialProfile.account_type;
  const [templateKey, setTemplateKey] = useState<TemplateKey>(() =>
    resolveTemplateKey(initialProfile.template_key, initialProfile.account_type)
  );
  const [fullName, setFullName] = useState(initialProfile.full_name ?? "");
  const [headline, setHeadline] = useState(initialProfile.headline ?? "");
  const [bio, setBio] = useState(initialProfile.bio ?? "");
  const [location, setLocation] = useState(initialProfile.location ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(
    initialProfile.website_url ?? ""
  );
  const [isPublished, setIsPublished] = useState(
    Boolean(initialProfile.is_published)
  );
  const [social, setSocial] = useState<SocialLinks>(initialSocial);

  // Type-specific states
  const [student, setStudent] = useState<StudentData>(
    initialCustom.student ?? defaultStudentData
  );
  const [studentSkillsText, setStudentSkillsText] = useState(
    (initialCustom.student?.skills ?? []).join("، ")
  );
  const [studentCertsText, setStudentCertsText] = useState(
    (initialCustom.student?.certificates ?? []).join("\n")
  );

  const [employee, setEmployee] = useState<EmployeeData>(
    initialCustom.employee ?? defaultEmployeeData
  );
  const [employeeSkillsText, setEmployeeSkillsText] = useState(
    (initialCustom.employee?.skills ?? []).join("، ")
  );
  const [employeeAchievementsText, setEmployeeAchievementsText] = useState(
    (initialCustom.employee?.achievements ?? []).join("\n")
  );
  const [employeeCertsText, setEmployeeCertsText] = useState(
    (initialCustom.employee?.certifications ?? []).join("\n")
  );

  const [freelancer, setFreelancer] = useState<FreelancerData>(
    initialCustom.freelancer ?? defaultFreelancerData
  );
  const [freelancerSkillsText, setFreelancerSkillsText] = useState(
    (initialCustom.freelancer?.skills ?? []).join("، ")
  );

  const [company, setCompany] = useState<CompanyData>(
    initialCustom.company ?? defaultCompanyData
  );
  const [companyHighlightsText, setCompanyHighlightsText] = useState(
    (initialCustom.company?.highlights ?? []).join("\n")
  );

  const [isPending, startTransition] = useTransition();
  const [isTogglingPublish, startPublishTransition] = useTransition();

  function handleTogglePublish() {
    const nextValue = !isPublished;

    startPublishTransition(async () => {
      const result = await togglePublishAction(nextValue, activeSlug);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      if (typeof result.is_published === "boolean") {
        setIsPublished(result.is_published);
      } else {
        setIsPublished(nextValue);
      }
      if (result.success) {
        toast.success(result.success);
      }
      router.refresh();
    });
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const preparedStudent: StudentData = {
      ...student,
      skills: parseList(studentSkillsText),
      certificates: studentCertsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      projects: student.projects.filter((p) => p.title.trim()),
    };

    const preparedEmployee: EmployeeData = {
      ...employee,
      skills: parseList(employeeSkillsText),
      achievements: employeeAchievementsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      certifications: employeeCertsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      experiences: employee.experiences.filter((exp) => exp.role.trim()),
    };

    const preparedFreelancer: FreelancerData = {
      ...freelancer,
      skills: parseList(freelancerSkillsText),
      services: freelancer.services.filter((s) => s.title.trim()),
      portfolio: freelancer.portfolio.filter((p) => p.title.trim()),
    };

    const preparedCompany: CompanyData = {
      ...company,
      highlights: companyHighlightsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      services: company.services.filter((s) => s.title.trim()),
      branches: company.branches.filter((b) => b.city.trim()),
    };

    startTransition(async () => {
      const result = await updateProfileAction({
        username: activeSlug,
        template_key: templateKey,
        full_name: fullName,
        headline,
        bio,
        location,
        website_url: websiteUrl,
        is_published: isPublished,
        social_links: social,
        custom_sections: {
          student: preparedStudent,
          employee: preparedEmployee,
          freelancer: preparedFreelancer,
          company: preparedCompany,
        },
      });

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Visual Template Picker & Publish Status */}
      <Card className="border-border/80 bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <Palette className="size-4 text-primary" />
                  شكل القالب وحالة النشر
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  حساب {accountTypeLabels[accountType]}
                </Badge>
              </div>
              <CardDescription className="mt-1">
                اختر التصميم الذي يناسب ذوقك؛ تتكيف جميع القوالب تلقائياً مع
                أقسام حسابك.
              </CardDescription>
            </div>
            <Button
              type="button"
              variant={isPublished ? "secondary" : "outline"}
              size="sm"
              disabled={isTogglingPublish}
              onClick={handleTogglePublish}
              className="h-9 gap-2 px-3.5 text-xs font-semibold"
            >
              {isTogglingPublish ? (
                <span>جاري التحديث...</span>
              ) : isPublished ? (
                <>
                  <Eye className="size-4 text-primary" />
                  الصفحة منشورة للعامة
                </>
              ) : (
                <>
                  <EyeOff className="size-4 text-muted-foreground" />
                  مسودة (اضغط للنشر)
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROFILE_TEMPLATES.map((tpl) => {
              const isSelected = templateKey === tpl.key;
              const isAccountDefault = tpl.defaultFor === accountType;

              return (
                <button
                  key={tpl.key}
                  type="button"
                  onClick={() => setTemplateKey(tpl.key)}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-xl border text-right transition-all",
                    isSelected
                      ? "border-primary ring-2 ring-primary/20 bg-secondary/30"
                      : "border-border bg-background hover:border-primary/40"
                  )}
                >
                  {/* Miniature visual layout preview */}
                  <div
                    className="h-20 w-full p-2.5 flex flex-col justify-between border-b border-border/50"
                    style={{ backgroundColor: tpl.swatch.bg }}
                  >
                    <div
                      className="h-5 w-full rounded-md flex items-center justify-between px-2"
                      style={{ backgroundColor: tpl.swatch.header }}
                    >
                      <span
                        className="h-1.5 w-10 rounded-full opacity-90"
                        style={{ backgroundColor: tpl.swatch.accent }}
                      />
                      <span className="size-2.5 rounded-full bg-white/40" />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div
                        className="col-span-2 h-7 rounded-md border border-black/5"
                        style={{ backgroundColor: tpl.swatch.card }}
                      />
                      <div
                        className="h-7 rounded-md opacity-85"
                        style={{ backgroundColor: tpl.swatch.accent }}
                      />
                    </div>
                  </div>

                  {/* Template info */}
                  <div className="flex flex-1 flex-col justify-between p-3.5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-foreground">
                          {tpl.name}
                        </span>
                        {isSelected && (
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="size-3" />
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {tpl.description}
                      </p>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {isAccountDefault && (
                        <Badge variant="secondary" className="text-[10px] px-2 py-0">
                          الافتراضي لحسابك
                        </Badge>
                      )}
                      {tpl.isNew && (
                        <Badge variant="outline" className="text-[10px] px-2 py-0 border-primary/40 text-primary">
                          جديد
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card className="border-border/80 bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">البيانات الأساسية</CardTitle>
          <CardDescription>
            المعلومات الرئيسية التي تظهر في أعلى صفحتك التعريفية.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">
                {accountType === "company"
                  ? "اسم الشركة أو المؤسسة"
                  : "الاسم الكامل"}
              </Label>
              <Input
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={
                  accountType === "company"
                    ? "مثال: مجموعة أفق للاستشارات"
                    : "مثال: سارة الحربي"
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">
                {accountType === "company"
                  ? "الوصف المختصر لنشاط الشركة"
                  : accountType === "student"
                    ? "التخصص أو الصفة الأكاديمية"
                    : "المسمى الوظيفي أو التخصص"}
              </Label>
              <Input
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder={
                  accountType === "company"
                    ? "حلول استشارية وإدارية لقطاع الأعمال"
                    : accountType === "student"
                      ? "طالب علوم حاسب — السنة الرابعة"
                      : "مصمم هوية بصرية وتجربة مستخدم"
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">المدينة / الدولة</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="الرياض، المملكة العربية السعودية"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website_url">الموقع الإلكتروني (اختياري)</Label>
              <Input
                id="website_url"
                dir="ltr"
                className="text-left"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">
              {accountType === "company" ? "نبذة عن الشركة" : "نبذة تعريفية عنك"}
            </Label>
            <Textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={
                accountType === "company"
                  ? "اكتب نبذة واضحة عن شركتك، مجالات عملها، والقيمة التي تقدمها للعملاء..."
                  : "اكتب نبذة مختصرة تعرّف بك وبأهدافك وأبرز مجالات اهتمامك..."
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* STUDENT SPECIFIC FIELDS */}
      {accountType === "student" && (
        <Card className="border-border/80 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg font-bold">
                  بيانات قالب الطالب
                </CardTitle>
                <CardDescription>
                  التفاصيل الأكاديمية، المشاريع الجامعية، والمهارات.
                </CardDescription>
              </div>
              <Badge variant="secondary">قالب الطالب</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>الجامعة / الكلية</Label>
                <Input
                  value={student.university}
                  onChange={(e) =>
                    setStudent({ ...student, university: e.target.value })
                  }
                  placeholder="مثال: جامعة الملك سعود"
                />
              </div>
              <div className="space-y-2">
                <Label>التخصص</Label>
                <Input
                  value={student.major}
                  onChange={(e) =>
                    setStudent({ ...student, major: e.target.value })
                  }
                  placeholder="مثال: هندسة البرمجيات"
                />
              </div>
              <div className="space-y-2">
                <Label>سنة التخرج المتوقعة</Label>
                <Input
                  value={student.graduationYear}
                  onChange={(e) =>
                    setStudent({ ...student, graduationYear: e.target.value })
                  }
                  placeholder="مثال: 2027"
                />
              </div>
              <div className="space-y-2">
                <Label>المعدل التراكمي (اختياري)</Label>
                <Input
                  value={student.gpa}
                  onChange={(e) =>
                    setStudent({ ...student, gpa: e.target.value })
                  }
                  placeholder="مثال: 4.75 / 5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>رابط السيرة الذاتية (اختياري)</Label>
              <Input
                dir="ltr"
                className="text-left"
                value={student.cvUrl}
                onChange={(e) =>
                  setStudent({ ...student, cvUrl: e.target.value })
                }
                placeholder="https://drive.google.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label>المهارات واللغات (افصل بينها بفاصلة)</Label>
              <Input
                value={studentSkillsText}
                onChange={(e) => setStudentSkillsText(e.target.value)}
                placeholder="تحليل البيانات، العرض والتقديم، اللغة الإنجليزية"
              />
            </div>

            {/* Academic Projects */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">
                  المشاريع الجامعية والأعمال
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setStudent({
                      ...student,
                      projects: [
                        ...student.projects,
                        { title: "", description: "", link: "" },
                      ],
                    })
                  }
                  className="h-8 gap-1.5 text-xs"
                >
                  <Plus className="size-3.5" />
                  إضافة مشروع
                </Button>
              </div>

              {student.projects.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  لم تضف مشاريع بعد. اضغط على «إضافة مشروع» لعرض مشاريعك الجامعية.
                </p>
              )}

              <div className="space-y-3">
                {student.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-xl border border-border/80 bg-muted/25 p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        مشروع #{idx + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          setStudent({
                            ...student,
                            projects: student.projects.filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        aria-label="حذف المشروع"
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        value={proj.title}
                        onChange={(e) => {
                          const next = [...student.projects];
                          next[idx] = { ...next[idx], title: e.target.value };
                          setStudent({ ...student, projects: next });
                        }}
                        placeholder="عنوان المشروع"
                      />
                      <Input
                        dir="ltr"
                        className="text-left"
                        value={proj.link ?? ""}
                        onChange={(e) => {
                          const next = [...student.projects];
                          next[idx] = { ...next[idx], link: e.target.value };
                          setStudent({ ...student, projects: next });
                        }}
                        placeholder="رابط المشروع (اختياري)"
                      />
                    </div>
                    <Textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const next = [...student.projects];
                        next[idx] = {
                          ...next[idx],
                          description: e.target.value,
                        };
                        setStudent({ ...student, projects: next });
                      }}
                      placeholder="وصف مختصر للمشروع ودورك فيه..."
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>الدورات والشهادات والأنشطة (كل عنصر في سطر)</Label>
              <Textarea
                rows={3}
                value={studentCertsText}
                onChange={(e) => setStudentCertsText(e.target.value)}
                placeholder={"عضو نادي الهندسة والتطوير\nشهادة أساسيات تحليل الأعمال"}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* EMPLOYEE SPECIFIC FIELDS */}
      {accountType === "employee" && (
        <Card className="border-border/80 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg font-bold">
                  بيانات قالب الموظف
                </CardTitle>
                <CardDescription>
                  مسارك الوظيفي، خبراتك، وإنجازاتك المهنية.
                </CardDescription>
              </div>
              <Badge variant="secondary">قالب الموظف</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>جهة العمل الحالية</Label>
                <Input
                  value={employee.currentCompany}
                  onChange={(e) =>
                    setEmployee({ ...employee, currentCompany: e.target.value })
                  }
                  placeholder="مثال: شركة المدار"
                />
              </div>
              <div className="space-y-2">
                <Label>سنوات الخبرة</Label>
                <Input
                  value={employee.yearsOfExperience}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      yearsOfExperience: e.target.value,
                    })
                  }
                  placeholder="مثال: 6 سنوات"
                />
              </div>
              <div className="space-y-2">
                <Label>رابط السيرة الذاتية</Label>
                <Input
                  dir="ltr"
                  className="text-left"
                  value={employee.cvUrl}
                  onChange={(e) =>
                    setEmployee({ ...employee, cvUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Work Experiences */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">
                  الخبرات والمناصب السابقة
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setEmployee({
                      ...employee,
                      experiences: [
                        ...employee.experiences,
                        { role: "", company: "", period: "", summary: "" },
                      ],
                    })
                  }
                  className="h-8 gap-1.5 text-xs"
                >
                  <Plus className="size-3.5" />
                  إضافة خبرة
                </Button>
              </div>

              {employee.experiences.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  اضغط على «إضافة خبرة» لبناء التسلسل الزمني لمسارك الوظيفي.
                </p>
              )}

              <div className="space-y-3">
                {employee.experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-xl border border-border/80 bg-muted/25 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">
                        خبرة #{idx + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          setEmployee({
                            ...employee,
                            experiences: employee.experiences.filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        aria-label="حذف الخبرة"
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Input
                        value={exp.role}
                        onChange={(e) => {
                          const next = [...employee.experiences];
                          next[idx] = { ...next[idx], role: e.target.value };
                          setEmployee({ ...employee, experiences: next });
                        }}
                        placeholder="المسمى الوظيفي"
                      />
                      <Input
                        value={exp.company}
                        onChange={(e) => {
                          const next = [...employee.experiences];
                          next[idx] = { ...next[idx], company: e.target.value };
                          setEmployee({ ...employee, experiences: next });
                        }}
                        placeholder="اسم الشركة"
                      />
                      <Input
                        value={exp.period}
                        onChange={(e) => {
                          const next = [...employee.experiences];
                          next[idx] = { ...next[idx], period: e.target.value };
                          setEmployee({ ...employee, experiences: next });
                        }}
                        placeholder="مثال: 2022 – الآن"
                      />
                    </div>
                    <Textarea
                      rows={2}
                      value={exp.summary}
                      onChange={(e) => {
                        const next = [...employee.experiences];
                        next[idx] = { ...next[idx], summary: e.target.value };
                        setEmployee({ ...employee, experiences: next });
                      }}
                      placeholder="أبرز المهام والمنجزات في هذا المنصب..."
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>أبرز الإنجازات (كل إنجاز في سطر)</Label>
              <Textarea
                rows={3}
                value={employeeAchievementsText}
                onChange={(e) => setEmployeeAchievementsText(e.target.value)}
                placeholder={"قيادة فريق من 12 موظفاً\nرفع كفاءة العمليات بنسبة 30%"}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>المهارات الأساسية (افصل بفاصلة)</Label>
                <Input
                  value={employeeSkillsText}
                  onChange={(e) => setEmployeeSkillsText(e.target.value)}
                  placeholder="إدارة المشاريع، التخطيط الاستراتيجي، القيادة"
                />
              </div>
              <div className="space-y-2">
                <Label>الشهادات المهنية (كل شهادة في سطر)</Label>
                <Textarea
                  rows={2}
                  value={employeeCertsText}
                  onChange={(e) => setEmployeeCertsText(e.target.value)}
                  placeholder={"PMP إدارة المشاريع الاحترافية"}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FREELANCER SPECIFIC FIELDS */}
      {accountType === "freelancer" && (
        <Card className="border-border/80 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg font-bold">
                  بيانات قالب المستقل
                </CardTitle>
                <CardDescription>
                  الخدمات التي تقدمها، باقاتك، ومعرض أعمالك.
                </CardDescription>
              </div>
              <Badge variant="secondary">قالب المستقل</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>حالة التوفر</Label>
                <Input
                  value={freelancer.availability}
                  onChange={(e) =>
                    setFreelancer({
                      ...freelancer,
                      availability: e.target.value,
                    })
                  }
                  placeholder="مثال: متاح للمشاريع الجديدة"
                />
              </div>
              <div className="space-y-2">
                <Label>المهارات والتخصصات (افصل بفاصلة)</Label>
                <Input
                  value={freelancerSkillsText}
                  onChange={(e) => setFreelancerSkillsText(e.target.value)}
                  placeholder="تصميم الهوية، كتابة المحتوى، إدارة الحملات"
                />
              </div>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">الخدمات المقدمة</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFreelancer({
                      ...freelancer,
                      services: [
                        ...freelancer.services,
                        { title: "", description: "", price: "" },
                      ],
                    })
                  }
                  className="h-8 gap-1.5 text-xs"
                >
                  <Plus className="size-3.5" />
                  إضافة خدمة
                </Button>
              </div>

              {freelancer.services.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  أضف خدماتك مع وصف واضح وسعر تقديري إن رغبت.
                </p>
              )}

              <div className="space-y-3">
                {freelancer.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-xl border border-border/80 bg-muted/25 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">
                        خدمة #{idx + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          setFreelancer({
                            ...freelancer,
                            services: freelancer.services.filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        aria-label="حذف الخدمة"
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        value={srv.title}
                        onChange={(e) => {
                          const next = [...freelancer.services];
                          next[idx] = { ...next[idx], title: e.target.value };
                          setFreelancer({ ...freelancer, services: next });
                        }}
                        placeholder="اسم الخدمة"
                      />
                      <Input
                        value={srv.price ?? ""}
                        onChange={(e) => {
                          const next = [...freelancer.services];
                          next[idx] = { ...next[idx], price: e.target.value };
                          setFreelancer({ ...freelancer, services: next });
                        }}
                        placeholder="مثال: تبدأ من 1500 ر.س (اختياري)"
                      />
                    </div>
                    <Textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) => {
                        const next = [...freelancer.services];
                        next[idx] = {
                          ...next[idx],
                          description: e.target.value,
                        };
                        setFreelancer({ ...freelancer, services: next });
                      }}
                      placeholder="تفاصيل الخدمة وما يحصل عليه العميل..."
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">معرض الأعمال</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFreelancer({
                      ...freelancer,
                      portfolio: [
                        ...freelancer.portfolio,
                        { title: "", category: "", description: "", link: "" },
                      ],
                    })
                  }
                  className="h-8 gap-1.5 text-xs"
                >
                  <Plus className="size-3.5" />
                  إضافة عمل
                </Button>
              </div>

              {freelancer.portfolio.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  اعرض نماذج من أعمالك السابقة لزيادة ثقة العملاء.
                </p>
              )}

              <div className="space-y-3">
                {freelancer.portfolio.map((item, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-xl border border-border/80 bg-muted/25 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">
                        عمل #{idx + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          setFreelancer({
                            ...freelancer,
                            portfolio: freelancer.portfolio.filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        aria-label="حذف العمل"
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const next = [...freelancer.portfolio];
                          next[idx] = { ...next[idx], title: e.target.value };
                          setFreelancer({ ...freelancer, portfolio: next });
                        }}
                        placeholder="عنوان العمل"
                      />
                      <Input
                        value={item.category}
                        onChange={(e) => {
                          const next = [...freelancer.portfolio];
                          next[idx] = {
                            ...next[idx],
                            category: e.target.value,
                          };
                          setFreelancer({ ...freelancer, portfolio: next });
                        }}
                        placeholder="التصنيف (مثال: هوية بصرية)"
                      />
                      <Input
                        dir="ltr"
                        className="text-left"
                        value={item.link ?? ""}
                        onChange={(e) => {
                          const next = [...freelancer.portfolio];
                          next[idx] = { ...next[idx], link: e.target.value };
                          setFreelancer({ ...freelancer, portfolio: next });
                        }}
                        placeholder="رابط المعاينة (اختياري)"
                      />
                    </div>
                    <Textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...freelancer.portfolio];
                        next[idx] = {
                          ...next[idx],
                          description: e.target.value,
                        };
                        setFreelancer({ ...freelancer, portfolio: next });
                      }}
                      placeholder="نبذة عن المشروع والنتيجة..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* COMPANY SPECIFIC FIELDS */}
      {accountType === "company" && (
        <Card className="border-border/80 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg font-bold">
                  بيانات قالب الشركة
                </CardTitle>
                <CardDescription>
                  قطاع العمل، الرؤية، الخدمات، والفروع الرسمية.
                </CardDescription>
              </div>
              <Badge variant="secondary">قالب الشركة</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>قطاع العمل</Label>
                <Input
                  value={company.industry}
                  onChange={(e) =>
                    setCompany({ ...company, industry: e.target.value })
                  }
                  placeholder="مثال: الاستشارات الإدارية"
                />
              </div>
              <div className="space-y-2">
                <Label>سنة التأسيس</Label>
                <Input
                  value={company.foundedYear}
                  onChange={(e) =>
                    setCompany({ ...company, foundedYear: e.target.value })
                  }
                  placeholder="مثال: 2019"
                />
              </div>
              <div className="space-y-2">
                <Label>حجم الفريق</Label>
                <Input
                  value={company.teamSize}
                  onChange={(e) =>
                    setCompany({ ...company, teamSize: e.target.value })
                  }
                  placeholder="مثال: 25+ متخصص"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>الرؤية والرسالة</Label>
              <Textarea
                rows={3}
                value={company.vision}
                onChange={(e) =>
                  setCompany({ ...company, vision: e.target.value })
                }
                placeholder="رؤية الشركة ورسالتها لعملائها وشركائها..."
              />
            </div>

            {/* Company Services */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">خدمات الشركة</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCompany({
                      ...company,
                      services: [
                        ...company.services,
                        { title: "", description: "" },
                      ],
                    })
                  }
                  className="h-8 gap-1.5 text-xs"
                >
                  <Plus className="size-3.5" />
                  إضافة خدمة
                </Button>
              </div>

              {company.services.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  أضف قائمة الخدمات أو الحلول التي تقدمها شركتك.
                </p>
              )}

              <div className="space-y-3">
                {company.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-xl border border-border/80 bg-muted/25 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">
                        خدمة #{idx + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          setCompany({
                            ...company,
                            services: company.services.filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        aria-label="حذف الخدمة"
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                    <Input
                      value={srv.title}
                      onChange={(e) => {
                        const next = [...company.services];
                        next[idx] = { ...next[idx], title: e.target.value };
                        setCompany({ ...company, services: next });
                      }}
                      placeholder="اسم الخدمة"
                    />
                    <Textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) => {
                        const next = [...company.services];
                        next[idx] = {
                          ...next[idx],
                          description: e.target.value,
                        };
                        setCompany({ ...company, services: next });
                      }}
                      placeholder="وصف مختصر للخدمة..."
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>ما يميز الشركة (كل نقطة في سطر)</Label>
              <Textarea
                rows={3}
                value={companyHighlightsText}
                onChange={(e) => setCompanyHighlightsText(e.target.value)}
                placeholder={"فريق استشاري معتمد\nأكثر من 120 عميلاً في المنطقة"}
              />
            </div>

            {/* Branches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">الفروع ومواقع العمل</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCompany({
                      ...company,
                      branches: [
                        ...company.branches,
                        { city: "", address: "", hours: "", contact: "" },
                      ],
                    })
                  }
                  className="h-8 gap-1.5 text-xs"
                >
                  <Plus className="size-3.5" />
                  إضافة فرع
                </Button>
              </div>

              <div className="space-y-3">
                {company.branches.map((branch, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-xl border border-border/80 bg-muted/25 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">
                        فرع #{idx + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          setCompany({
                            ...company,
                            branches: company.branches.filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        aria-label="حذف الفرع"
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        value={branch.city}
                        onChange={(e) => {
                          const next = [...company.branches];
                          next[idx] = { ...next[idx], city: e.target.value };
                          setCompany({ ...company, branches: next });
                        }}
                        placeholder="المدينة (مثال: الرياض)"
                      />
                      <Input
                        value={branch.address}
                        onChange={(e) => {
                          const next = [...company.branches];
                          next[idx] = { ...next[idx], address: e.target.value };
                          setCompany({ ...company, branches: next });
                        }}
                        placeholder="العنوان المختصر"
                      />
                      <Input
                        value={branch.hours ?? ""}
                        onChange={(e) => {
                          const next = [...company.branches];
                          next[idx] = { ...next[idx], hours: e.target.value };
                          setCompany({ ...company, branches: next });
                        }}
                        placeholder="أوقات العمل (اختياري)"
                      />
                      <Input
                        value={branch.contact ?? ""}
                        onChange={(e) => {
                          const next = [...company.branches];
                          next[idx] = { ...next[idx], contact: e.target.value };
                          setCompany({ ...company, branches: next });
                        }}
                        placeholder="طريقة التواصل بالفرع: هاتف أو بريد (اختياري)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact & Social Links */}
      <Card className="border-border/80 bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">
            بيانات التواصل والروابط
          </CardTitle>
          <CardDescription>
            الوسائل التي تظهر للزوار للتواصل معك أو متابعة حساباتك.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>البريد الإلكتروني للتواصل</Label>
            <Input
              dir="ltr"
              className="text-left"
              type="email"
              value={social.email ?? ""}
              onChange={(e) => setSocial({ ...social, email: e.target.value })}
              placeholder="contact@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>رقم الهاتف</Label>
            <Input
              dir="ltr"
              className="text-left"
              value={social.phone ?? ""}
              onChange={(e) => setSocial({ ...social, phone: e.target.value })}
              placeholder="+966 50 000 0000"
            />
          </div>
          <div className="space-y-2">
            <Label>رقم الواتساب (مع رمز الدولة)</Label>
            <Input
              dir="ltr"
              className="text-left"
              value={social.whatsapp ?? ""}
              onChange={(e) =>
                setSocial({ ...social, whatsapp: e.target.value })
              }
              placeholder="966500000000"
            />
          </div>
          <div className="space-y-2">
            <Label>لينكدإن (LinkedIn)</Label>
            <Input
              dir="ltr"
              className="text-left"
              value={social.linkedin ?? ""}
              onChange={(e) =>
                setSocial({ ...social, linkedin: e.target.value })
              }
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div className="space-y-2">
            <Label>إكس (X)</Label>
            <Input
              dir="ltr"
              className="text-left"
              value={social.x ?? ""}
              onChange={(e) => setSocial({ ...social, x: e.target.value })}
              placeholder="https://x.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label>إنستغرام (Instagram)</Label>
            <Input
              dir="ltr"
              className="text-left"
              value={social.instagram ?? ""}
              onChange={(e) =>
                setSocial({ ...social, instagram: e.target.value })
              }
              placeholder="https://instagram.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label>بيهانس (Behance)</Label>
            <Input
              dir="ltr"
              className="text-left"
              value={social.behance ?? ""}
              onChange={(e) =>
                setSocial({ ...social, behance: e.target.value })
              }
              placeholder="https://behance.net/..."
            />
          </div>
          <div className="space-y-2">
            <Label>جيت هب (GitHub)</Label>
            <Input
              dir="ltr"
              className="text-left"
              value={social.github ?? ""}
              onChange={(e) => setSocial({ ...social, github: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3 pb-8">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="h-11 w-full gap-2 px-8 font-semibold sm:w-auto"
        >
          <Save className="size-4" />
          {isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>
    </form>
  );
}
