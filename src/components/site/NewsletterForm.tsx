import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.string().trim().email().max(255);

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <form
      className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]"
      onSubmit={(e) => {
        e.preventDefault();
        const r = schema.safeParse(email);
        setMsg(r.success
          ? { ok: true, text: "ثبت شد. ارسال خبرنامه پس از راه‌اندازی سرویس ایمیل آغاز می‌شود." }
          : { ok: false, text: "لطفاً یک ایمیل معتبر وارد کنید." });
      }}
    >
      <label htmlFor="nl" className="sr-only">ایمیل</label>
      <input id="nl" dir="ltr" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
        autoComplete="email" className="min-w-0 w-full rounded-lg border border-input bg-background px-4 py-3 text-base outline-none focus:border-primary sm:text-sm" />
      <Button type="submit" className="h-auto min-h-12 rounded-lg bg-gold-gradient px-6 py-3 font-bold text-primary-foreground">عضویت</Button>
      {msg && <p role="status" className={`min-w-0 w-full text-sm sm:col-span-2 ${msg.ok ? "text-primary" : "text-destructive"}`}>{msg.text}</p>}
    </form>
  );
}
