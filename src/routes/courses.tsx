import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle, ListTree, BarChart3, Lock, Eye, type LucideIcon } from "lucide-react";
import heading from "@/assets/courses-heading.png";
import { pageHead } from "@/lib/site";
import { Container } from "@/components/site/Page";

const courseFeatures: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ListTree, title: "سرفصل فصل‌بندی‌شده", desc: "فصل‌ها و درس‌های منظم و قابل پیگیری" },
  { icon: Eye, title: "درس‌های پیش‌نمایش", desc: "پیش از خرید، بخشی از دوره را ببینید" },
  { icon: BarChart3, title: "پیگیری پیشرفت", desc: "ذخیره درس‌های تکمیل‌شده و ادامه یادگیری" },
  { icon: Lock, title: "دسترسی امن", desc: "پخش ویدیو فقط برای دانشجویان مجاز" },
];

export const Route = createFileRoute("/courses")({
  head: () => pageHead("دوره‌های آفلاین", "کاتالوگ دوره‌های ضبط‌شده آموزش ترید با سرفصل، درس‌های پیش‌نمایش و پیگیری پیشرفت."),
  component: () => (
    <>
      <section className="border-b border-border bg-surface">
        <h1 className="mx-auto max-w-4xl px-4 py-2 sm:py-3">
          <img
            src={heading}
            alt="دوره‌های آفلاین. دوره‌های آموزشی کامل برای مطالعه و یادگیری در زمان دلخواه."
            width={1400}
            height={270}
            className="h-auto w-full"
          />
        </h1>
      </section>
      <Container>
        <div className="card-lux flex flex-col items-center border-primary/50 px-6 py-12 text-center shadow-[0_0_48px_color-mix(in_oklab,var(--primary)_22%,transparent)] sm:px-10 sm:py-16">
          <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/80 bg-accent shadow-[0_0_32px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
            <PlayCircle className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </span>
          <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">نخستین دوره در حال آماده‌سازی است</h2>
          <div className="mt-5 flex w-full max-w-xs items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-primary" />
            <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-primary" />
          </div>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">پس از انتشار، سرفصل‌ها، مدت زمان، درس‌های پیش‌نمایش و قیمت هر دوره در اینجا نمایش داده می‌شود.</p>
        </div>
        <h2 className="mb-6 mt-14 text-center text-2xl font-bold">آنچه در هر دوره خواهید داشت</h2>
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {courseFeatures.map((item) => (
            <article key={item.title} className="card-lux flex aspect-square min-w-0 flex-col items-center justify-center p-3 text-center sm:p-5">
              <span className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/70 bg-accent shadow-[0_0_22px_color-mix(in_oklab,var(--primary)_55%,transparent)] sm:mb-4 sm:h-16 sm:w-16">
                <item.icon className="h-6 w-6 text-primary sm:h-8 sm:w-8" strokeWidth={1.75} />
              </span>
              <h3 className="break-words text-base font-extrabold leading-7 sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{item.desc}</p>
            </article>
          ))}
        </div>
      </Container>
    </>
  ),
});
