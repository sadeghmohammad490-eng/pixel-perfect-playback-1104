import { useState } from "react";
import { z } from "zod";

const schema = z.string().trim().email().max(255);

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <form
      className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
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
        className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
      <button className="rounded-lg bg-gold-gradient px-6 py-3 font-bold text-primary-foreground">عضویت</button>
      {msg && <p role="status" className={`w-full text-sm sm:absolute sm:mt-14 ${msg.ok ? "text-primary" : "text-destructive"}`}>{msg.text}</p>}
    </form>
  );
}
