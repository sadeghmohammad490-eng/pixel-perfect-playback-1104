import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import heading from "@/assets/support-heading.png";
import { pageHead } from "@/lib/site";
import { Container, btnGold } from "@/components/site/Page";

const cats = ["مشکل ورود", "مشکل پرداخت", "مشکل دسترسی به دوره", "مشکل پخش ویدیو", "مشکل دانلود ابزار", "مشکلات فنی سایت", "سایر مشکلات"];
const statuses = ["جدید", "در حال بررسی", "پاسخ داده‌شده", "بسته‌شده"];

export const Route = createFileRoute("/support")({
  head: () => pageHead("پشتیبانی و تیکت", "ثبت و پیگیری تیکت پشتیبانی برای دانشجویان KHATIRTRADER."),
  component: () => (
    <>
      <section className="border-b border-border bg-surface">
        <h1 className="mx-auto max-w-4xl px-4 py-2 sm:py-3">
          <img
            src={heading}
            alt="پشتیبانی و تیکت. مشکل خود را ثبت کنید و وضعیت پاسخ را پیگیری کنید. تیکت‌ها کاملاً خصوصی هستند."
            width={1400}
            height={270}
            className="h-auto w-full"
          />
        </h1>
      </section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="card-lux flex h-full flex-col items-center justify-center border-primary/50 px-6 py-12 text-center shadow-[0_0_48px_color-mix(in_oklab,var(--primary)_22%,transparent)] sm:px-10 sm:py-16">
              <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/80 bg-accent shadow-[0_0_32px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
                <LifeBuoy className="h-10 w-10 text-primary" strokeWidth={1.5} />
              </span>
              <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">برای ثبت تیکت وارد شوید</h2>
              <div className="mt-5 flex w-full max-w-xs items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-primary" />
                <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
                <span className="h-px flex-1 bg-primary" />
              </div>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">پس از ورود می‌توانید تیکت جدید بسازید، تصویر پیوست کنید و تاریخچه تیکت‌های خود را ببینید.</p>
              <Link to="/auth" className={`${btnGold} mt-6`}>ورود / ثبت‌نام</Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card-lux border-primary/45 p-5 shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_16%,transparent)] sm:p-6">
              <h2 className="text-xl font-extrabold text-primary">دسته‌بندی‌ها</h2>
              <div className="mt-3 mb-4 flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-primary/70" />
                <span className="h-2 w-2 rotate-45 bg-primary" />
                <span className="h-px flex-1 bg-primary/70" />
              </div>
              <ul className="grid gap-2.5">
                {cats.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-base text-primary">
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-lux border-primary/45 p-5 shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_16%,transparent)] sm:p-6">
              <h2 className="text-xl font-extrabold text-primary">وضعیت تیکت</h2>
              <div className="mt-3 mb-4 flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-primary/70" />
                <span className="h-2 w-2 rotate-45 bg-primary" />
                <span className="h-px flex-1 bg-primary/70" />
              </div>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <span key={s} className="inline-flex min-h-10 items-center rounded-full border border-primary/50 px-4 py-1.5 text-sm font-bold text-primary">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  ),
});
