import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Repeat, UserCheck, Mic, History, type LucideIcon } from "lucide-react";
import heading from "@/assets/sessions-heading.png";
import { pageHead } from "@/lib/site";
import { Container, IntegrationNote } from "@/components/site/Page";

const sessionFeatures: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Repeat, title: "جلسات هفتگی", desc: "برنامه منظم پرسش و پاسخ" },
  { icon: UserCheck, title: "شرایط دسترسی", desc: "ویژه دانشجویان واجد شرایط" },
  { icon: Mic, title: "نوبت پرسش", desc: "امکان صحبت فردی در صورت پشتیبانی سرویس" },
  { icon: History, title: "تاریخچه جلسات", desc: "آرشیو جلسات برگزارشده" },
];

export const Route = createFileRoute("/online-sessions")({
  head: () => pageHead("رفع اشکال آنلاین", "جلسات زنده و هفتگی رفع اشکال آموزش ترید برای دانشجویان."),
  component: () => (
    <>
      <section className="border-b border-border bg-surface">
        <h1 className="mx-auto max-w-4xl px-4 py-2 sm:py-3">
          <img
            src={heading}
            alt="رفع اشکال آنلاین. جلسات زنده برای پرسش و پاسخ، بررسی اشکالات و تمرین گروهی."
            width={1400}
            height={270}
            className="h-auto w-full"
          />
        </h1>
      </section>
      <Container>
        <div className="card-lux flex flex-col items-center border-primary/50 px-6 py-12 text-center shadow-[0_0_48px_color-mix(in_oklab,var(--primary)_22%,transparent)] sm:px-10 sm:py-16">
          <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/80 bg-accent shadow-[0_0_32px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
            <CalendarClock className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </span>
          <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">جلسه‌ای زمان‌بندی نشده است</h2>
          <div className="mt-5 flex w-full max-w-xs items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-primary" />
            <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-primary" />
          </div>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">جلسات آینده با تاریخ، ساعت و شرایط شرکت در اینجا اعلام می‌شوند.</p>
        </div>
        <div className="my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sessionFeatures.map((item) => (
            <article key={item.title} className="card-lux flex min-w-0 flex-col items-center px-4 py-7 text-center sm:px-5">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/70 bg-accent shadow-[0_0_22px_color-mix(in_oklab,var(--primary)_55%,transparent)]">
                <item.icon className="h-7 w-7 text-primary" strokeWidth={1.75} />
              </span>
              <h3 className="text-lg font-extrabold sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-base leading-7 text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </div>
        <IntegrationNote>سرویس جلسه آنلاین (مانند Zoom یا Google Meet) هنوز متصل نشده است. پس از اتصال، دکمه ورود به جلسه فعال می‌شود.</IntegrationNote>
      </Container>
    </>
  ),
});
