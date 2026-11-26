import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";

export default function NotFound() {
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
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
              <AlertCircle className="size-7" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-foreground">
              تعذر العثور على الصفحة المطلوبة
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              يبدو أن هناك مشكلة في الرابط أو أن هذه الصفحة غير متوفرة حالياً.
              يمكنك التأكد من صحة الرابط أو العودة إلى الصفحة الرئيسية.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Link
                href="/"
                className={cn(buttonVariants({ size: "default" }), "h-10 px-5 gap-2")}
              >
                <ArrowRight className="size-4" />
                العودة للرئيسية
              </Link>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "h-10 px-5"
                )}
              >
                لوحة التحكم
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
