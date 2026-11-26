"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/35 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            ب
          </div>
          <span className="text-lg font-bold text-foreground">بروفمي</span>
        </Link>

        <Card className="border-border/80 bg-card shadow-xs">
          <CardContent className="px-6 py-10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <AlertTriangle className="size-7" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-foreground">
              حدثت مشكلة أثناء تحميل الصفحة
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              نعتذر عن هذا الخلل المؤقت. يمكنك إعادة المحاولة الآن أو العودة إلى
              الصفحة الرئيسية.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Button
                type="button"
                onClick={() => reset()}
                className="h-10 gap-2 px-5"
              >
                <RefreshCw className="size-4" />
                إعادة المحاولة
              </Button>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "h-10 px-5"
                )}
              >
                الصفحة الرئيسية
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
