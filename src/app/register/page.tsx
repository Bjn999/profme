import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";

async function RegisterFormWithParams({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  return <RegisterForm defaultType={params.type ?? "student"} />;
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/35 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              ب
            </div>
            <span className="text-lg font-bold text-foreground">بروفمي</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="size-3.5" />
            العودة للرئيسية
          </Link>
        </div>

        <Card className="border-border/80 bg-card shadow-xs">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold">إنشاء حساب جديد</CardTitle>
            <CardDescription>
              اختر نوع صفحتك وأدخل بياناتك للبدء في بناء هويتك الرقمية.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<RegisterForm defaultType="student" />}>
              <RegisterFormWithParams searchParams={searchParams} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
