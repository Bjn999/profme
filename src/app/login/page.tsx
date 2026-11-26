"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { loginAction, type AuthActionState } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

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
            <CardTitle className="text-xl font-bold">تسجيل الدخول</CardTitle>
            <CardDescription>
              أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  placeholder="name@example.com"
                  className="text-left"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  dir="ltr"
                  placeholder="••••••••"
                  className="text-left"
                  autoComplete="current-password"
                  required
                />
              </div>

              {state.error && (
                <p className="rounded-lg bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
                  {state.error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="h-10 w-full font-semibold"
              >
                {isPending ? "جاري تسجيل الدخول..." : "دخول"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              ليس لديك حساب بعد؟{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                أنشئ حساباً جديداً
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
