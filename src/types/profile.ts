export type ProfileType = "student" | "employee" | "freelancer" | "company";

export interface SocialLinks {
  email?: string;
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
  x?: string;
  instagram?: string;
  github?: string;
  behance?: string;
}

export interface StudentProject {
  title: string;
  description: string;
  link?: string;
}

export interface StudentData {
  university: string;
  major: string;
  graduationYear: string;
  gpa: string;
  cvUrl: string;
  skills: string[];
  projects: StudentProject[];
  certificates: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface EmployeeData {
  currentCompany: string;
  yearsOfExperience: string;
  cvUrl: string;
  skills: string[];
  experiences: WorkExperience[];
  achievements: string[];
  certifications: string[];
}

export interface FreelancerService {
  title: string;
  description: string;
  price?: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  link?: string;
}

export interface FreelancerData {
  availability: string;
  skills: string[];
  services: FreelancerService[];
  portfolio: PortfolioItem[];
}

export interface CompanyService {
  title: string;
  description: string;
}

export interface CompanyBranch {
  city: string;
  address: string;
  hours?: string;
  contact?: string;
}

export interface CompanyData {
  industry: string;
  foundedYear: string;
  teamSize: string;
  vision: string;
  services: CompanyService[];
  branches: CompanyBranch[];
  highlights: string[];
}

export interface ProfileCustomData {
  student?: StudentData;
  employee?: EmployeeData;
  freelancer?: FreelancerData;
  company?: CompanyData;
}

export interface ProfileRecord {
  id: string;
  username: string | null;
  full_name: string;
  account_type: ProfileType;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  template_key: string;
  location: string | null;
  website_url: string | null;
  social_links: SocialLinks | null;
  custom_sections: ProfileCustomData | unknown;
  is_published: boolean;
}

export const defaultStudentData: StudentData = {
  university: "",
  major: "",
  graduationYear: "",
  gpa: "",
  cvUrl: "",
  skills: [],
  projects: [],
  certificates: [],
};

export const defaultEmployeeData: EmployeeData = {
  currentCompany: "",
  yearsOfExperience: "",
  cvUrl: "",
  skills: [],
  experiences: [],
  achievements: [],
  certifications: [],
};

export const defaultFreelancerData: FreelancerData = {
  availability: "متاح للمشاريع الجديدة",
  skills: [],
  services: [],
  portfolio: [],
};

export const defaultCompanyData: CompanyData = {
  industry: "",
  foundedYear: "",
  teamSize: "",
  vision: "",
  services: [],
  branches: [],
  highlights: [],
};

export function normalizeCustomData(raw: unknown): ProfileCustomData {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }
  const obj = raw as Record<string, unknown>;
  return {
    student:
      obj.student && typeof obj.student === "object"
        ? { ...defaultStudentData, ...(obj.student as Partial<StudentData>) }
        : undefined,
    employee:
      obj.employee && typeof obj.employee === "object"
        ? { ...defaultEmployeeData, ...(obj.employee as Partial<EmployeeData>) }
        : undefined,
    freelancer:
      obj.freelancer && typeof obj.freelancer === "object"
        ? {
            ...defaultFreelancerData,
            ...(obj.freelancer as Partial<FreelancerData>),
          }
        : undefined,
    company:
      obj.company && typeof obj.company === "object"
        ? { ...defaultCompanyData, ...(obj.company as Partial<CompanyData>) }
        : undefined,
  };
}

export function normalizeSocialLinks(raw: unknown): SocialLinks {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }
  return raw as SocialLinks;
}

export function generateRandomSlug(length = 8): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const accountTypeLabels: Record<ProfileType, string> = {
  student: "طالب",
  employee: "موظف",
  freelancer: "مستقل",
  company: "شركة",
};
