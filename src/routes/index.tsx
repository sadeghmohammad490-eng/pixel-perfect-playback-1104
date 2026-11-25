import { createFileRoute, Link } from "@tanstack/react-router";
import { LineChart, MessageSquareQuote, PlayCircle, Video, type LucideIcon } from "lucide-react";
import { sections, pageHead, type SectionPath } from "@/lib/site";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { AboutProfile } from "@/components/site/AboutProfile";

const homeCards: { to: SectionPath | "/about"; title: string; desc: string; icon: LucideIcon }[] = [
  { to: "/courses", title: "دوره‌های ویژه", desc: "مشاهده دوره‌های آموزشی", icon: PlayCircle },
  { to: "/online-sessions", title: "رفع اشکال زنده", desc: "جلسات آنلاین و پرسش و پاسخ", icon: Video },
  { to: "/about", title: "تجربه عملی، آموزش صادقانه", desc: "آشنایی بیشتر با خطیر تریدر", icon: LineChart },
  { to: "/students", title: "نظرات دانشجویان", desc: "تجربه‌های واقعی دانشجویان", icon: MessageSquareQuote },
];

export const Route = createFileRoute("/")({
  head: () => pageHead("آکادمی آموزش ترید", "آموزش تخصصی ترید، قیمت‌خوانی، مدیریت ریسک و کنترل ذهن در معاملات از سال ۲۰۱۹."),
  component: Index,
});

function Index() {
  return (
    <>
      <AboutProfile />

      <section id="academy" className="mx-auto max-w-7xl scroll-mt-40 px-4 py-12 lg:py-20">
        <SectionTitle title="همه بخش‌های آکادمی در یک نگاه" />
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

      <section id="newsletter" className="mx-auto max-w-4xl scroll-mt-40 px-4">
        <div className="card-lux p-5 text-center sm:p-8 md:p-12">
          <h2 className="text-2xl font-extrabold text-primary">خبرنامه آموزشی</h2>
          <p className="mt-2 text-muted-foreground">از انتشار دوره‌ها و ابزارهای جدید باخبر شوید.</p>
          <NewsletterForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 pt-12 lg:pt-16">
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {homeCards.map((card) => (
            <Link key={card.to} to={card.to} className="card-lux flex aspect-square min-w-0 flex-col items-center justify-center p-3 text-center no-underline sm:p-5">
              <span className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/70 bg-accent shadow-[0_0_22px_color-mix(in_oklab,var(--primary)_55%,transparent)] sm:mb-4 sm:h-16 sm:w-16">
                <card.icon className="h-6 w-6 text-primary sm:h-8 sm:w-8" strokeWidth={1.75} />
              </span>
              <h2 className="break-words text-base font-extrabold leading-7 sm:text-xl">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-6 lg:mb-10">
      <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">{title}</h2>
      <div className="gold-rule mt-4 w-32" />
    </div>
  );
}
