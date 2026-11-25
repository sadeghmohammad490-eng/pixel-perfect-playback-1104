import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import heading from "@/assets/faq-heading.png";
import { pageHead } from "@/lib/site";
import { Container, btnGold } from "@/components/site/Page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const cats = ["همه", "آموزش ترید", "دوره‌ها", "ابزارها", "مدیریت ریسک", "حساب کاربری", "سوالات عمومی"];
const faqs = [
  { c: "دوره‌ها", q: "پس از خرید، دوره را کجا ببینم؟", a: "پس از تأیید پرداخت، دوره در بخش «دوره‌های من» در دسترس قرار می‌گیرد." },
  { c: "مدیریت ریسک", q: "چرا مدیریت ریسک اولویت اول است؟", a: "چون حفظ سرمایه شرط ادامه حضور در بازار است. بدون کنترل ریسک، حتی یک روش خوب هم می‌تواند به زیان سنگین منجر شود." },
  { c: "ابزارها", q: "ابزارها با چه پلتفرمی سازگارند؟", a: "سازگاری هر ابزار در صفحه همان ابزار ذکر می‌شود. تمرکز اصلی بر MetaTrader 5 است." },
  { c: "حساب کاربری", q: "رمز عبورم را فراموش کرده‌ام.", a: "از صفحه ورود گزینه «فراموشی رمز عبور» را انتخاب کنید یا در بخش پشتیبانی تیکت ثبت کنید." },
];

export const Route = createFileRoute("/faq")({
  head: () => pageHead("سوال و پاسخ", "پرسش‌های پرتکرار درباره آموزش ترید، دوره‌ها، ابزارها و حساب کاربری."),
  component: Faq,
});

function Faq() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("همه");
  const list = useMemo(() => faqs.filter((f) => (cat === "همه" || f.c === cat) && (f.q + f.a).includes(q.trim())), [q, cat]);
  return (
    <>
      <section className="border-b border-border bg-surface">
        <h1 className="mx-auto max-w-4xl px-4 py-2 sm:py-3">
          <img
            src={heading}
            alt="سوال و پاسخ. پاسخ پرسش‌های پرتکرار را جست‌وجو کنید. سوالات کاربران پس از بررسی و تأیید منتشر می‌شوند."
            width={1400}
            height={270}
            className="h-auto w-full"
          />
        </h1>
      </section>
      <Container>
        <div className="relative mb-6">
          <Search className="absolute right-4 top-4 h-5 w-5 text-primary" />
          <input
            aria-label="جست‌وجو"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جست‌وجو در سوالات..."
            className="w-full rounded-2xl border border-primary/50 bg-card py-4 pl-4 pr-12 text-base outline-none shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_14%,transparent)] focus:border-primary focus:shadow-[0_0_32px_color-mix(in_oklab,var(--primary)_40%,transparent)] sm:text-lg"
          />
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <Button
              variant="ghost"
              aria-pressed={cat === c}
              key={c}
              onClick={() => setCat(c)}
              className={`h-auto min-h-11 rounded-full border px-5 py-2 text-base font-bold transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground shadow-gold hover:bg-primary hover:text-primary-foreground" : "border-primary/45 text-primary hover:border-primary hover:bg-accent"}`}
            >
              {c}
            </Button>
          ))}
        </div>
        {list.length ? (
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {list.map((f) => (
              <AccordionItem
                key={f.q}
                value={f.q}
                className="card-lux border-primary/45 px-4 data-[state=open]:border-primary/80 data-[state=open]:shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_28%,transparent)] sm:px-6"
              >
                <AccordionTrigger className="py-5 text-right text-base font-extrabold hover:no-underline sm:text-lg [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-primary">
                  <span className="flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base leading-8 text-muted-foreground sm:text-lg">
                  <span className="mb-3 inline-flex rounded-full border border-primary/50 px-3 py-1 text-sm font-medium text-primary">{f.c}</span>
                  <p>{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="card-lux border-primary/45 px-6 py-10 text-center text-lg font-bold text-primary">نتیجه‌ای یافت نشد.</p>
        )}
        <div className="card-lux mt-10 flex flex-col items-center border-primary/50 px-6 py-10 text-center shadow-[0_0_48px_color-mix(in_oklab,var(--primary)_22%,transparent)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">سوال شما اینجا نیست؟</h2>
          <div className="mt-5 flex w-full max-w-xs items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-primary" />
            <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-primary" />
          </div>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">برای ثبت سوال وارد حساب کاربری شوید. سوالات عمومی پس از تأیید منتشر می‌شوند.</p>
          <Button asChild className={`mt-6 h-auto ${btnGold}`}><Link to="/auth">ثبت سوال</Link></Button>
        </div>
      </Container>
    </>
  );
}
