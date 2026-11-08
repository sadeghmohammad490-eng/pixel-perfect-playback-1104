import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, MessageSquareQuote, PlayCircle, Target, ShieldCheck, Brain, LineChart } from "lucide-react";
import hero from "@/assets/hero-desk.jpg";
import { sections, pageHead } from "@/lib/site";
import { EmptyState, btnGold, btnOutline } from "@/components/site/Page";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => pageHead("آکادمی آموزش ترید", "آموزش تخصصی ترید، قیمت‌خوانی، مدیریت ریسک و کنترل ذهن در معاملات از سال ۲۰۱۹."),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="home-hero relative isolate overflow-hidden">
        <img src={hero} alt="میز کار حرفه‌ای معامله‌گری با نمودارها" fetchPriority="high" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover object-[35%_center] lg:object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-background via-background/85 to-background/30" />
        <div className="mx-auto flex min-h-[min(36rem,calc(100svh-8rem))] max-w-7xl flex-col justify-center px-4 py-10 sm:py-14 lg:min-h-[85vh] lg:py-24">
          <p className="mb-5 text-sm font-medium tracking-wide text-primary animate-in fade-in slide-in-from-bottom-2 duration-700">آکادمی KHATIRTRADER</p>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.5] sm:text-4xl lg:text-6xl lg:leading-[1.4] animate-in fade-in slide-in-from-bottom-4 duration-700">
            بازار را نمی‌توان کنترل کرد، <span className="text-gold-gradient">اما می‌توان معامله‌گری را آموخت.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg lg:mt-6">
            آموزش تخصصی ترید، قیمت‌خوانی، مدیریت ریسک و کنترل ذهن در معاملات، بر پایه تجربه عملی در بازارهای مالی از سال ۲۰۱۹.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap lg:mt-10">
            <Button asChild className={`h-auto ${btnGold}`}><Link to="/courses">مشاهده دوره‌ها</Link></Button>
            <Button asChild variant="outline" className={`h-auto ${btnOutline}`}><Link to="/about">آشنایی با آکادمی</Link></Button>
            <Button asChild variant="outline" className={`h-auto ${btnOutline}`}><Link to="/tools">دانلود ابزارها</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
        <SectionTitle eyebrow="دسترسی سریع" title="همه بخش‌های آکادمی در یک نگاه" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.to} to={s.to} className="card-lux group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 p-4 hover:-translate-y-1 sm:gap-4 sm:p-6">
              <span className="shrink-0 rounded-lg border border-primary/30 bg-accent p-3 transition-colors group-hover:bg-primary"><s.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" /></span>
              <span className="min-w-0">
                <span className="block text-lg font-bold">{s.title}</span>
                <span className="block text-sm text-muted-foreground">{s.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="دوره‌های ویژه" title="دوره‌ها در حال آماده‌سازی هستند" />
          <EmptyState icon={PlayCircle} title="هنوز دوره‌ای منتشر نشده است" desc="به‌محض انتشار نخستین دوره ضبط‌شده، اطلاعات کامل، سرفصل‌ها و قیمت در این بخش نمایش داده می‌شود.">
            <Link to="/courses" className={btnOutline}>کاتالوگ دوره‌ها</Link>
          </EmptyState>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="جلسات آنلاین" title="رفع اشکال زنده" />
        <EmptyState icon={CalendarClock} title="جلسه‌ای زمان‌بندی نشده است" desc="زمان جلسات آینده، شرایط شرکت و لینک ورود پس از اعلام در این بخش قرار می‌گیرد.">
          <Link to="/online-sessions" className={btnOutline}>درباره جلسات آنلاین</Link>
        </EmptyState>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm text-primary">درباره KhatirTrader</p>
            <h2 className="text-3xl font-extrabold">تجربه عملی، آموزش صادقانه</h2>
            <p className="mt-5 text-muted-foreground">
              فعالیت من در بازارهای مالی از سال ۲۰۱۹ آغاز شد و تمرکز اصلی‌ام بر معاملات کوتاه‌مدت و اسکالپینگ است. در آموزش‌ها به جای وعده سود، بر مهارت‌هایی تکیه می‌کنم که در عمل ماندگارند: قیمت‌خوانی، نظم معاملاتی، مدیریت ریسک و کنترل ذهن.
            </p>
            <Link to="/about" className={`${btnOutline} mt-8`}>بیشتر بخوانید</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { i: LineChart, t: "Price Action", d: "قیمت‌خوانی بدون پیچیدگی" },
              { i: ShieldCheck, t: "Risk Management", d: "حفظ سرمایه در اولویت" },
              { i: Brain, t: "روانشناسی معامله", d: "کنترل هیجان و تصمیم" },
              { i: Target, t: "نظم معاملاتی", d: "برنامه، اجرا، بازبینی" },
            ].map((x) => (
              <div key={x.t} className="card-lux p-5"><x.i className="mb-2 h-6 w-6 text-primary" /><div className="font-bold">{x.t}</div><div className="text-sm text-muted-foreground">{x.d}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="نظرات دانشجویان" title="تجربه‌های واقعی" />
        <EmptyState icon={MessageSquareQuote} title="به‌زودی" desc="فقط نظرات واقعی و تأییدشده دانشجویان، با رضایت خودشان، در اینجا منتشر خواهد شد." />
      </section>

      <section className="mx-auto max-w-4xl px-4">
        <div className="card-lux p-5 text-center sm:p-8 md:p-12">
          <h2 className="text-2xl font-extrabold">خبرنامه آموزشی</h2>
          <p className="mt-2 text-muted-foreground">از انتشار دوره‌ها و ابزارهای جدید باخبر شوید.</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6 lg:mb-10">
      <p className="mb-2 text-sm text-primary">{eyebrow}</p>
      <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
      <div className="gold-rule mt-4 w-32" />
    </div>
  );
}
