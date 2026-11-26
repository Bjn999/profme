import {
  Globe,
  Mail,
  MessageCircle,
  Phone,
  ExternalLink,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import type { SocialLinks } from "@/types/profile";

function formatUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function formatWhatsApp(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export function hasAnyContactLinks(
  social: SocialLinks,
  websiteUrl?: string | null
) {
  return Boolean(
    social.email ||
      social.phone ||
      social.whatsapp ||
      websiteUrl ||
      social.linkedin ||
      social.x ||
      social.instagram ||
      social.behance ||
      social.github
  );
}

export function SocialLinksBar({
  social,
  websiteUrl,
  centered = false,
  inverted = false,
}: {
  social: SocialLinks;
  websiteUrl?: string | null;
  centered?: boolean;
  inverted?: boolean;
}) {
  const items: {
    label: string;
    href: string;
    external?: boolean;
    icon: "mail" | "phone" | "wa" | "globe" | "link";
  }[] = [];

  if (social.email) {
    items.push({
      label: "البريد الإلكتروني",
      href: `mailto:${social.email}`,
      icon: "mail",
    });
  }
  if (social.phone) {
    items.push({
      label: "اتصال هاتفي",
      href: `tel:${social.phone}`,
      icon: "phone",
    });
  }
  if (social.whatsapp) {
    const wa = formatWhatsApp(social.whatsapp);
    if (wa)
      items.push({ label: "واتساب", href: wa, external: true, icon: "wa" });
  }
  if (websiteUrl) {
    items.push({
      label: "الموقع الإلكتروني",
      href: formatUrl(websiteUrl),
      external: true,
      icon: "globe",
    });
  }
  if (social.linkedin) {
    items.push({
      label: "لينكدإن",
      href: formatUrl(social.linkedin),
      external: true,
      icon: "link",
    });
  }
  if (social.x) {
    items.push({
      label: "إكس (X)",
      href: formatUrl(social.x),
      external: true,
      icon: "link",
    });
  }
  if (social.instagram) {
    items.push({
      label: "إنستغرام",
      href: formatUrl(social.instagram),
      external: true,
      icon: "link",
    });
  }
  if (social.behance) {
    items.push({
      label: "بيهانس",
      href: formatUrl(social.behance),
      external: true,
      icon: "link",
    });
  }
  if (social.github) {
    items.push({
      label: "جيت هب",
      href: formatUrl(social.github),
      external: true,
      icon: "link",
    });
  }

  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2.5", centered && "justify-center")}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "h-10 gap-2 rounded-xl px-4 text-xs font-medium sm:text-sm transition-all",
            inverted
              ? "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              : "bg-background hover:border-primary/40"
          )}
        >
          {item.icon === "mail" && (
            <Mail className={cn("size-4", inverted ? "text-white" : "text-primary")} />
          )}
          {item.icon === "phone" && (
            <Phone className={cn("size-4", inverted ? "text-white" : "text-primary")} />
          )}
          {item.icon === "wa" && (
            <MessageCircle
              className={cn("size-4", inverted ? "text-white" : "text-primary")}
            />
          )}
          {item.icon === "globe" && (
            <Globe className={cn("size-4", inverted ? "text-white" : "text-primary")} />
          )}
          {item.icon === "link" && (
            <ExternalLink
              className={cn("size-3.5", inverted ? "text-white" : "text-primary")}
            />
          )}
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  );
}
