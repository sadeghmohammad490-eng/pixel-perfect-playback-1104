import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { pageHead } from "@/lib/site";
import { IntegrationNote } from "@/components/site/Page";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  head: () => pageHead("ورود / ثبت‌نام", "ورود یا ساخت حساب کاربری در آکادمی KHATIRTRADER."),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"in" | "up">("in");
  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-16">
      <div className="card-lux p-5 sm:p-8">
        <div className="mb-6 grid grid-cols-2 rounded-lg border border-border p-1">
          {(["in", "up"] as const).map((m) => (
            <Button variant="ghost" aria-pressed={mode === m} key={m} onClick={() => setMode(m)} className={`h-auto min-h-11 rounded-md py-2 text-sm ${mode === m ? "bg-gold-gradient font-bold text-primary-foreground" : "text-muted-foreground"}`}>
              {m === "in" ? "ورود" : "ثبت‌نام"}
            </Button>
          ))}
        </div>
        <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
          {mode === "up" && <Field id="name" label="نام و نام خانوادگی" />}
          <Field id="email" label="ایمیل" type="email" ltr />
          <Field id="password" label="رمز عبور" type="password" ltr />
          <Button type="submit" disabled className="h-auto min-h-12 rounded-lg bg-gold-gradient py-3 font-bold text-primary-foreground opacity-60">{mode === "in" ? "ورود" : "ساخت حساب"}</Button>
        </form>
        <div className="mt-6"><IntegrationNote>سیستم حساب کاربری در مرحله بعد فعال می‌شود.</IntegrationNote></div>
      </div>
    </div>
  );
}

function Field({ id, label, type = "text", ltr }: { id: string; label: string; type?: string; ltr?: boolean }) {
  return (
    <label htmlFor={id} className="grid gap-1 text-sm">
      {label}
      <input id={id} type={type} autoComplete={id === "name" ? "name" : id === "email" ? "email" : "current-password"} dir={ltr ? "ltr" : undefined} className="min-w-0 w-full rounded-lg border border-input bg-background px-4 py-3 text-base outline-none focus:border-primary sm:text-sm" />
    </label>
  );
}
