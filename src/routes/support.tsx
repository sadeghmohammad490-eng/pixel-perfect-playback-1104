import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, EmptyState, btnGold } from "@/components/site/Page";

const cats = ["مشکل ورود", "مشکل پرداخت", "مشکل دسترسی به دوره", "مشکل پخش ویدیو", "مشکل دانلود ابزار", "مشکلات فنی سایت", "سایر مشکلات"];
const statuses = ["جدید", "در حال بررسی", "پاسخ داده‌شده", "بسته‌شده"];

export const Route = createFileRoute("/support")({
  head: () => pageHead("پشتیبانی و تیکت", "ثبت و پیگیری تیکت پشتیبانی برای دانشجویان KHATIRTRADER."),
  component: () => (
    <>
      <PageHeader eyebrow="بخش نه" title="پشتیبانی و تیکت" desc="مشکل خود را ثبت کنید و وضعیت پاسخ را پیگیری کنید. تیکت‌ها کاملاً خصوصی هستند." />
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EmptyState icon={LifeBuoy} title="برای ثبت تیکت وارد شوید" desc="پس از ورود می‌توانید تیکت جدید بسازید، تصویر پیوست کنید و تاریخچه تیکت‌های خود را ببینید.">
              <Link to="/auth" className={btnGold}>ورود / ثبت‌نام</Link>
            </EmptyState>
          </div>
          <div className="space-y-4">
            <div className="card-lux p-5"><h2 className="mb-3 font-bold">دسته‌بندی‌ها</h2><ul className="grid gap-1 text-sm text-muted-foreground">{cats.map((c) => <li key={c}>• {c}</li>)}</ul></div>
            <div className="card-lux p-5"><h2 className="mb-3 font-bold">وضعیت تیکت</h2><div className="flex flex-wrap gap-2">{statuses.map((s) => <span key={s} className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">{s}</span>)}</div></div>
          </div>
        </div>
      </Container>
    </>
  ),
});
