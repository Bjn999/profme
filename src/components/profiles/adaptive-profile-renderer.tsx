import { extractProfileSections } from "@/lib/profile-sections";
import { resolveTemplateKey } from "@/lib/templates";
import { AcademicBentoTheme } from "@/components/profiles/themes/academic-bento-theme";
import { ExecutiveDossierTheme } from "@/components/profiles/themes/executive-dossier-theme";
import { CreativeStudioTheme } from "@/components/profiles/themes/creative-studio-theme";
import { CorporateEmeraldTheme } from "@/components/profiles/themes/corporate-emerald-theme";
import { ObsidianLuxeTheme } from "@/components/profiles/themes/obsidian-luxe-theme";
import { EditorialMinimalTheme } from "@/components/profiles/themes/editorial-minimal-theme";
import type { ProfileRecord } from "@/types/profile";

export function AdaptiveProfileRenderer({
  profile,
}: {
  profile: ProfileRecord;
}) {
  const templateKey = resolveTemplateKey(
    profile.template_key,
    profile.account_type
  );
  const adapted = extractProfileSections(profile);

  switch (templateKey) {
    case "academic-bento":
      return <AcademicBentoTheme data={adapted} />;
    case "executive-dossier":
      return <ExecutiveDossierTheme data={adapted} />;
    case "creative-studio":
      return <CreativeStudioTheme data={adapted} />;
    case "corporate-emerald":
      return <CorporateEmeraldTheme data={adapted} />;
    case "obsidian-luxe":
      return <ObsidianLuxeTheme data={adapted} />;
    case "editorial-minimal":
      return <EditorialMinimalTheme data={adapted} />;
    default:
      return <AcademicBentoTheme data={adapted} />;
  }
}
