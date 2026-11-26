"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Link2, Lock, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";

const emptySubscribe = () => () => {};

export function ProfileLinkCard({
  slug,
  isPublished,
}: {
  slug: string;
  isPublished: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(
    /\/+$/,
    ""
  );

  const clientOrigin = useSyncExternalStore(
    emptySubscribe,
    () => window.location.origin,
    () => ""
  );

  const relativePath = `/p/${slug}`;
  const baseUrl = configuredSiteUrl || clientOrigin;
  const fullUrl = baseUrl ? `${baseUrl}${relativePath}` : relativePath;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("تم نسخ رابط صفحتك بنجاح");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      toast.success("تم نسخ رابط صفحتك بنجاح");
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Card className="border-border/80 bg-card shadow-xs">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Link2 className="size-4" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-bold text-foreground">
                  رابط صفحتك الخاص
                </h2>
                <Badge
                  variant={isPublished ? "secondary" : "outline"}
                  className="text-[11px]"
                >
                  {isPublished ? "منشورة للعامة" : "مسودة خاصة"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                شارك هذا الرابط مع العملاء أو جهات التوظيف لاستعراض صفحتك.
              </p>
            </div>
          </div>

          <Link
            href={relativePath}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "h-8 w-fit gap-1.5 text-xs"
            )}
          >
            <ExternalLink className="size-3.5" />
            معاينة الصفحة
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div
            dir="ltr"
            className="flex-1 truncate rounded-lg border border-border bg-muted/45 px-3.5 py-2 text-left text-xs font-medium text-foreground sm:text-sm"
          >
            {fullUrl}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleCopy}
              className="h-9 gap-1.5 px-3 text-xs font-medium"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  نسخ
                </>
              )}
            </Button>

            <div className="inline-flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled
                aria-disabled="true"
                className="h-9 gap-1.5 px-3 text-xs opacity-65"
              >
                <Lock className="size-3" />
                <Pencil className="size-3" />
                تعديل
              </Button>
              <Badge
                variant="secondary"
                className="rounded-md px-2 py-0.5 text-[11px] font-medium"
              >
                قريباً
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
