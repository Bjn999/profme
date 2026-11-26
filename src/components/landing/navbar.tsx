"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

const navLinks = [
  { href: "#about", label: "عن المنصة" },
  { href: "#templates", label: "القوالب والخدمات" },
  { href: "#features", label: "المميزات" },
  { href: "#faq", label: "الأسئلة الشائعة" },
  { href: "#contact", label: "تواصل معنا" },
];

export function Navbar({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base tracking-tight">
            ب
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-foreground">
              بروفمي
            </span>
            <span className="text-[11px] text-muted-foreground">
              هويتك المهنية والتجارية
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="التنقل الرئيسي">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ size: "default" }), "h-9 px-4")}
            >
              لوحة التحكم
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "h-9 px-4"
                )}
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className={cn(buttonVariants({ size: "default" }), "h-9 px-4")}
              >
                أنشئ صفحتك
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="فتح القائمة"
              className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[290px]">
              <SheetHeader className="text-right">
                <SheetTitle className="text-right font-bold">بروفمي</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-1 px-4">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2.5 px-4">
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ size: "lg" }), "w-full")}
                  >
                    لوحة التحكم
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ size: "lg" }), "w-full")}
                    >
                      أنشئ صفحتك الآن
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full"
                      )}
                    >
                      تسجيل الدخول
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
