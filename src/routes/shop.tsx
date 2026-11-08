import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Search } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, EmptyState, IntegrationNote, btnOutline } from "@/components/site/Page";

export const Route = createFileRoute("/shop")({
  head: () => pageHead("خرید دوره‌ها", "کاتالوگ و خرید دوره‌های آموزش ترید KHATIRTRADER."),
  component: () => (
    <>
      <PageHeader eyebrow="بخش شش" title="خرید دوره‌ها" desc="کاتالوگ دوره‌ها، قیمت‌ها، سفارش‌ها و وضعیت پرداخت." />
      <Container>
        <div className="relative mb-8">
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <input aria-label="جست‌وجوی دوره" disabled placeholder="جست‌وجو در دوره‌ها..." className="w-full rounded-xl border border-input bg-card py-3 pl-4 pr-12 opacity-60" />
        </div>
        <EmptyState icon={ShoppingBag} title="هنوز دوره‌ای برای فروش منتشر نشده است" desc="پس از انتشار، دوره‌ها با قیمت و جزئیات کامل اینجا قابل خرید خواهند بود.">
          <Link to="/my-courses" className={btnOutline}>تاریخچه سفارش‌ها</Link>
        </EmptyState>
        <div className="mt-8"><IntegrationNote>پرداخت آنلاین هنوز فعال نیست. دسترسی به دوره فقط پس از تأیید پرداخت در سمت سرور فعال خواهد شد.</IntegrationNote></div>
      </Container>
    </>
  ),
});
