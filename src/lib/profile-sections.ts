import {
  defaultCompanyData,
  defaultEmployeeData,
  defaultFreelancerData,
  defaultStudentData,
  normalizeCustomData,
  normalizeSocialLinks,
  type CompanyBranch,
  type ProfileRecord,
  type SocialLinks,
  type WorkExperience,
} from "@/types/profile";

export interface ProfileMetricItem {
  label: string;
  value: string;
}

export interface ProfileShowcaseItem {
  title: string;
  description: string;
  category?: string;
  link?: string;
}

export interface ProfileServiceItem {
  title: string;
  description: string;
  price?: string;
}

export interface ProfilePrimaryCta {
  label: string;
  href: string;
  external?: boolean;
  kind: "cv" | "contact";
}

export interface AdaptedProfileSections {
  profile: ProfileRecord;
  social: SocialLinks;
  accountBadge: string;
  secondaryBadge?: string;
  metrics: ProfileMetricItem[];
  primaryCta: ProfilePrimaryCta | null;
  aboutTitle: string;
  vision?: string;
  timelineTitle?: string;
  timeline: WorkExperience[];
  showcaseTitle?: string;
  showcase: ProfileShowcaseItem[];
  servicesTitle?: string;
  services: ProfileServiceItem[];
  highlightsTitle?: string;
  highlights: string[];
  skillsTitle?: string;
  skills: string[];
  certificatesTitle?: string;
  certificates: string[];
  branches: CompanyBranch[];
  contactEyebrow: string;
  contactTitle: string;
  contactSubtitle: string;
  hasContactLinks: boolean;
}

export function formatExternalUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getBranchContactHref(raw: string): string | null {
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

export function extractProfileSections(
  rawProfile: ProfileRecord
): AdaptedProfileSections {
  const profile: ProfileRecord = {
    ...rawProfile,
    full_name: rawProfile.full_name?.trim() || "مستخدم بروفمي",
  };
  const custom = normalizeCustomData(profile.custom_sections);
  const social = normalizeSocialLinks(profile.social_links);

  const hasContactLinks = Boolean(
    social.email ||
      social.phone ||
      social.whatsapp ||
      profile.website_url ||
      social.linkedin ||
      social.x ||
      social.instagram ||
      social.behance ||
      social.github
  );

  if (profile.account_type === "student") {
    const data = custom.student ?? defaultStudentData;
    const metrics: ProfileMetricItem[] = [
      data.university ? { label: "الجامعة", value: data.university } : null,
      data.major ? { label: "التخصص", value: data.major } : null,
      data.graduationYear
        ? { label: "سنة التخرج", value: data.graduationYear }
        : null,
      data.gpa ? { label: "المعدل التراكمي", value: data.gpa } : null,
    ].filter(Boolean) as ProfileMetricItem[];

    return {
      profile,
      social,
      accountBadge: "ملف طالب وخريج",
      metrics,
      primaryCta: data.cvUrl
        ? {
            label: "السيرة الذاتية",
            href: formatExternalUrl(data.cvUrl),
            external: true,
            kind: "cv",
          }
        : null,
      aboutTitle: "نبذة عني",
      timeline: [],
      showcaseTitle: "المشاريع الجامعية والأعمال",
      showcase: data.projects,
      services: [],
      highlights: [],
      skillsTitle: "المهارات واللغات",
      skills: data.skills,
      certificatesTitle: "الدورات والشهادات والأنشطة",
      certificates: data.certificates,
      branches: [],
      contactEyebrow: "فرص التدريب والتوظيف",
      contactTitle: "تواصل معي",
      contactSubtitle:
        "يسعدني التواصل بشأن فرص التدريب التعاوني أو العمل أو المشاريع المشتركة.",
      hasContactLinks,
    };
  }

  if (profile.account_type === "employee") {
    const data = custom.employee ?? defaultEmployeeData;
    const metrics: ProfileMetricItem[] = [
      data.currentCompany
        ? { label: "جهة العمل", value: data.currentCompany }
        : null,
      data.yearsOfExperience
        ? { label: "سنوات الخبرة", value: data.yearsOfExperience }
        : null,
      profile.location ? { label: "الموقع", value: profile.location } : null,
    ].filter(Boolean) as ProfileMetricItem[];

    return {
      profile,
      social,
      accountBadge: "ملف تنفيذي ومهني",
      metrics,
      primaryCta: data.cvUrl
        ? {
            label: "تحميل السيرة الذاتية",
            href: formatExternalUrl(data.cvUrl),
            external: true,
            kind: "cv",
          }
        : null,
      aboutTitle: "الملخص المهني",
      timelineTitle: "المسار الوظيفي والخبرات",
      timeline: data.experiences,
      showcase: [],
      services: [],
      highlightsTitle: "أبرز الإنجازات المهنية",
      highlights: data.achievements,
      skillsTitle: "الكفاءات والمهارات",
      skills: data.skills,
      certificatesTitle: "الشهادات المهنية",
      certificates: data.certifications,
      branches: [],
      contactEyebrow: "التواصل المهني",
      contactTitle: "قنوات التواصل المباشرة",
      contactSubtitle: "للتواصل المباشر أو الاستشارات والفرص المهنية.",
      hasContactLinks,
    };
  }

  if (profile.account_type === "freelancer") {
    const data = custom.freelancer ?? defaultFreelancerData;
    const waDigits = social.whatsapp?.replace(/[^\d]/g, "");
    const directHref = waDigits
      ? `https://wa.me/${waDigits}`
      : social.email
        ? `mailto:${social.email}`
        : social.phone
          ? `tel:${social.phone}`
          : hasContactLinks
            ? "#profile-contact"
            : null;

    const metrics: ProfileMetricItem[] = [
      data.availability
        ? { label: "حالة التوفر", value: data.availability }
        : null,
      profile.location ? { label: "الموقع", value: profile.location } : null,
      data.portfolio.length > 0
        ? { label: "الأعمال المعروضة", value: `${data.portfolio.length} أعمال` }
        : null,
    ].filter(Boolean) as ProfileMetricItem[];

    return {
      profile,
      social,
      accountBadge: "مستقل",
      secondaryBadge: data.availability || undefined,
      metrics,
      primaryCta: directHref
        ? {
            label: "اطلب خدمة الآن",
            href: directHref,
            external: Boolean(waDigits),
            kind: "contact",
          }
        : null,
      aboutTitle: "نبذة عني",
      timeline: [],
      showcaseTitle: "معرض الأعمال",
      showcase: data.portfolio,
      servicesTitle: "الخدمات والباقات",
      services: data.services,
      highlights: [],
      skillsTitle: "المهارات والتخصصات",
      skills: data.skills,
      certificates: [],
      branches: [],
      contactEyebrow: "لنعمل معاً",
      contactTitle: "هل لديك مشروع في ذهنك؟",
      contactSubtitle:
        "تواصل معي عبر الوسيلة الأنسب لك لمناقشة تفاصيل مشروعك والحصول على عرض مناسب.",
      hasContactLinks,
    };
  }

  // Company
  const data = custom.company ?? defaultCompanyData;
  const metrics: ProfileMetricItem[] = [
    data.foundedYear
      ? { label: "سنة التأسيس", value: data.foundedYear }
      : null,
    data.teamSize ? { label: "فريق العمل", value: data.teamSize } : null,
    profile.location
      ? { label: "المقر الرئيسي", value: profile.location }
      : null,
  ].filter(Boolean) as ProfileMetricItem[];

  return {
    profile,
    social,
    accountBadge: "ملف شركة",
    secondaryBadge: data.industry || undefined,
    metrics,
    primaryCta: hasContactLinks
      ? {
          label: "تواصل معنا",
          href: "#profile-contact",
          kind: "contact",
        }
      : null,
    aboutTitle: "نبذة عن الشركة",
    vision: data.vision || undefined,
    timeline: [],
    showcase: [],
    servicesTitle: "خدماتنا وحلولنا",
    services: data.services,
    highlightsTitle: "ما يميزنا",
    highlights: data.highlights,
    skills: [],
    certificates: [],
    branches: data.branches,
    contactEyebrow: "قنوات التواصل الرسمية",
    contactTitle: `تواصل مع ${profile.full_name}`,
    contactSubtitle:
      "يسعد فريقنا باستقبال استفساراتكم وطلبات التعاون عبر القنوات التالية.",
    hasContactLinks,
  };
}
