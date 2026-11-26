import type { ProfileType } from "@/types/profile";

export type TemplateKey =
  | "academic-bento"
  | "executive-dossier"
  | "creative-studio"
  | "corporate-emerald"
  | "obsidian-luxe"
  | "editorial-minimal";

export interface TemplateMeta {
  key: TemplateKey;
  name: string;
  description: string;
  defaultFor?: ProfileType;
  isNew?: boolean;
  swatch: {
    bg: string;
    header: string;
    accent: string;
    card: string;
  };
}

export const PROFILE_TEMPLATES: TemplateMeta[] = [
  {
    key: "academic-bento",
    name: "بينتو عصري",
    description: "توزيع شبكي مرن بألوان نيلية هادئة وبطاقة ملخص جانبية.",
    defaultFor: "student",
    swatch: {
      bg: "#F7F9FC",
      header: "#4F46E5",
      accent: "#6366F1",
      card: "#FFFFFF",
    },
  },
  {
    key: "executive-dossier",
    name: "تنفيذي رسمي",
    description: "ترويسة داكنة فخمة وتنسيق تحريري منظم يبرز الخبرات والمسار.",
    defaultFor: "employee",
    swatch: {
      bg: "#F8F8F7",
      header: "#0F172A",
      accent: "#334155",
      card: "#FFFFFF",
    },
  },
  {
    key: "creative-studio",
    name: "استوديو إبداعي",
    description: "طابع دافئ وجذاب يبرز الأعمال والخدمات بوضوح مع ختام تفاعلي.",
    defaultFor: "freelancer",
    swatch: {
      bg: "#FAF7F2",
      header: "#292524",
      accent: "#D97706",
      card: "#FFFFFF",
    },
  },
  {
    key: "corporate-emerald",
    name: "مؤسسي زمردي",
    description: "واجهة أعمال واسعة بشريط مؤشرات وأقسام مرتبة للخدمات والفروع.",
    defaultFor: "company",
    swatch: {
      bg: "#F5F7F6",
      header: "#165B4B",
      accent: "#1F7A65",
      card: "#FFFFFF",
    },
  },
  {
    key: "obsidian-luxe",
    name: "أوبسيديان داكن",
    description: "تصميم ليلي فاخر بخلفية داكنة عميقة ولمسات ذهبية راقية.",
    isNew: true,
    swatch: {
      bg: "#0B0F17",
      header: "#131926",
      accent: "#E5B95C",
      card: "#141B29",
    },
  },
  {
    key: "editorial-minimal",
    name: "تحريري راقٍ",
    description: "أسلوب مجلّاتي بسيط بخطوط واضحة ومساحات مريحة ولمسة طينية.",
    isNew: true,
    swatch: {
      bg: "#FCFCFA",
      header: "#18181B",
      accent: "#C2410C",
      card: "#FFFFFF",
    },
  },
];

export const VALID_TEMPLATE_KEYS: TemplateKey[] = PROFILE_TEMPLATES.map(
  (t) => t.key
);

export function getDefaultTemplateForAccountType(
  accountType: ProfileType
): TemplateKey {
  switch (accountType) {
    case "student":
      return "academic-bento";
    case "employee":
      return "executive-dossier";
    case "freelancer":
      return "creative-studio";
    case "company":
      return "corporate-emerald";
    default:
      return "academic-bento";
  }
}

export function resolveTemplateKey(
  templateKey: string | null | undefined,
  accountType: ProfileType
): TemplateKey {
  if (
    templateKey &&
    VALID_TEMPLATE_KEYS.includes(templateKey as TemplateKey)
  ) {
    return templateKey as TemplateKey;
  }
  return getDefaultTemplateForAccountType(accountType);
}
