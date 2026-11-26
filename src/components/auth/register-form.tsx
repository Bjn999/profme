"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import { signupAction, type AuthActionState } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";

const initialState: AuthActionState = {};

const accountTypes = [
  { value: "student", label: "طالب", icon: GraduationCap },
  { value: "employee", label: "موظف", icon: Briefcase },
  { value: "freelancer", label: "مستقل", icon: Palette },
  { value: "company", label: "شركة", icon: Building2 },
] as const;

export function RegisterForm({ defaultType = "student" }: { defaultType?: string }) {
  const validInitial = accountTypes.some((t) => t.value === defaultType)
    ? defaultType
    : "student";
  const [selectedType, setSelectedType] = useState<string>(validInitial);
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    } else if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label>نوع الصفحة</Label>
        <input type="hidden" name="accountType" value={selectedType} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {accountTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setSelectedType(type.value)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors",
                  isSelected
                    ? "border-primary bg-secondary text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">
          {selectedType === "company" ? "اسم الشركة أو المؤسسة" : "الاسم الكامل"}
        </Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder={
            selectedType === "company"
              ? "مثال: شركة أفق للاستشارات"
              : "أدخل اسمك الكامل"
          }
          required
        />
      </div>

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
          placeholder="8 أحرف على الأقل"
          className="text-left"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
          {state.error}
        </p>
      )}

      {state.success && (
        <p className="rounded-lg bg-secondary px-3.5 py-2.5 text-sm font-medium text-primary">
          {state.success}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="h-10 w-full font-semibold"
      >
        {isPending ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
      </Button>

      <p className="pt-2 text-center text-sm text-muted-foreground">
        لديك حساب بالفعل؟{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          سجّل دخولك
        </Link>
      </p>
    </form>
  );
}
