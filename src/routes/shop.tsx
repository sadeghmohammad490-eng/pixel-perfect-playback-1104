import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Search } from "lucide-react";
import heading from "@/assets/shop-heading.png";
import { pageHead } from "@/lib/site";
import { Container, btnGold } from "@/components/site/Page";

export const Route = createFileRoute("/shop")({
  head: () => pageHead("خرید دوره‌ها", "کاتالوگ و خرید دوره‌های آموزش ترید KHATIRTRADER."),
  component: () => (
    <>
      <section className="border-b border-border bg-surface">
        <h1 className="mx-auto max-w-4xl px-4 py-2 sm:py-3">
          <img
            src={heading}
            alt="خرید دوره‌ها. کاتالوگ دوره‌ها، قیمت‌ها، سفارش‌ها و وضعیت پرداخت."
            width={1400}
            height={270}
            className="h-auto w-full"
          />
        </h1>
      </section>
      <Container>
        <div className="relative mb-8">
          <Search className="absolute right-4 top-4 h-5 w-5 text-primary" />
          <input
            aria-label="جست‌وجوی دوره"
            disabled
            placeholder="جست‌وجو در دوره‌ها..."
            className="w-full cursor-not-allowed rounded-2xl border border-primary/50 bg-card py-4 pl-4 pr-12 text-base text-foreground shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_14%,transparent)] placeholder:text-primary/70 sm:text-lg"
          />
        </div>
        <div className="card-lux flex flex-col items-center border-primary/50 px-6 py-12 text-center shadow-[0_0_48px_color-mix(in_oklab,var(--primary)_22%,transparent)] sm:px-10 sm:py-16">
          <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/80 bg-accent shadow-[0_0_32px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
            <ShoppingBag className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </span>
          <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">هنوز دوره‌ای برای فروش منتشر نشده است</h2>
          <div className="mt-5 flex w-full max-w-xs items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-primary" />
            <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-primary" />
          </div>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">پس از انتشار، دوره‌ها با قیمت و جزئیات کامل اینجا قابل خرید خواهند بود.</p>
          <Link to="/my-courses" className={`${btnGold} mt-6`}>تاریخچه سفارش‌ها</Link>
        </div>
        <p className="card-lux mt-8 border-primary/45 px-6 py-5 text-center text-base leading-8 text-primary shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_16%,transparent)] sm:text-lg">پرداخت آنلاین هنوز فعال نیست. دسترسی به دوره فقط پس از تأیید پرداخت در سمت سرور فعال خواهد شد.</p>
      </Container>
    </>
  ),
});
