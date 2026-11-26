function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "بروفمي",
  url: stripTrailingSlash(rawSiteUrl),
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@profme.sa",
  contactPhone:
    process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "+966 50 000 0000",
  contactLocation:
    process.env.NEXT_PUBLIC_CONTACT_LOCATION?.trim() ||
    "الرياض، المملكة العربية السعودية",
  workingHours:
    process.env.NEXT_PUBLIC_WORKING_HOURS?.trim() ||
    "الأحد – الخميس، 9:00 ص – 6:00 م",
} as const;

export function getPublicSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return stripTrailingSlash(configured);
  }
  return "http://localhost:3000";
}

export function getAuthCallbackUrl(): string {
  return `${getPublicSiteUrl()}/auth/callback`;
}

export function getProfilePublicUrl(slug: string): string {
  return `${getPublicSiteUrl()}/p/${slug}`;
}

export function getSiteHostLabel(): string {
  try {
    return new URL(getPublicSiteUrl()).host;
  } catch {
    return "profme.sa";
  }
}
