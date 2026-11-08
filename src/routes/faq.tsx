import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, btnOutline } from "@/components/site/Page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const cats = ["همه", "آموزش ترید", "دوره‌ها", "ابزارها", "مدیریت ریسک", "حساب کاربری", "سوالات عمومی"];
const faqs = [
  { c: "سوالات عمومی", q: "آیا آموزش‌ها سود را تضمین می‌کنند؟", a: "خیر. معامله در بازارهای مالی همواره با ریسک همراه است. هدف آموزش‌ها افزایش مهارت، نظم و درک بازار است و هیچ نتیجه مالی مشخصی تضمین نمی‌شود." },
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
      <PageHeader eyebrow="بخش یک" title="سوال و پاسخ" desc="پاسخ پرسش‌های پرتکرار را جست‌وجو کنید. سوالات کاربران پس از بررسی و تأیید منتشر می‌شوند." />
      <Container>
        <div className="relative mb-6">
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <input aria-label="جست‌وجو" value={q} onChange={(e) => setQ(e.target.value)} placeholder="جست‌وجو در سوالات..." className="w-full rounded-xl border border-input bg-card py-3 pl-4 pr-12 outline-none focus:border-primary" />
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <Button variant="ghost" aria-pressed={cat === c} key={c} onClick={() => setCat(c)} className={`h-auto min-h-11 rounded-full border px-4 py-1.5 text-sm font-normal transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary"}`}>{c}</Button>
          ))}
        </div>
        {list.length ? (
          <Accordion type="single" collapsible className="card-lux px-4 sm:px-6">
            {list.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-right">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground"><span className="mb-2 block text-xs text-primary">{f.c}</span>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : <p className="text-center text-muted-foreground">نتیجه‌ای یافت نشد.</p>}
        <div className="card-lux mt-10 grid grid-cols-1 items-center gap-4 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0"><h2 className="font-bold">سوال شما اینجا نیست؟</h2><p className="text-sm text-muted-foreground">برای ثبت سوال وارد حساب کاربری شوید. سوالات عمومی پس از تأیید منتشر می‌شوند.</p></div>
          <Button asChild variant="outline" className={`h-auto ${btnOutline}`}><Link to="/auth">ثبت سوال</Link></Button>
        </div>
      </Container>
    </>
  );
}
