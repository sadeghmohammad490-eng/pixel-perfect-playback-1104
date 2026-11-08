import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, EmptyState } from "@/components/site/Page";

const cats = ["اندیکاتورها", "اسیلاتورها", "ابزارهای متاتریدر", "ابزارهای مدیریت ریسک", "فایل‌های آموزشی"];

export const Route = createFileRoute("/tools")({
  head: () => pageHead("ابزارهای ترید", "کتابخانه اندیکاتورها و ابزارهای MetaTrader 5 و مدیریت ریسک."),
  component: () => (
    <>
      <PageHeader eyebrow="بخش چهار" title="ابزارهای ترید" desc="اندیکاتورها، اسیلاتورها و ابزارهای کاربردی MetaTrader همراه با راهنمای نصب و نسخه‌ها." />
      <Container>
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => <span key={c} className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">{c}</span>)}
        </div>
        <EmptyState icon={Wrench} title="هنوز ابزاری منتشر نشده است" desc="هر ابزار با توضیحات، تصویر، سازگاری پلتفرم، نسخه، راهنمای نصب و یادداشت انتشار در اینجا قرار می‌گیرد." />
      </Container>
    </>
  ),
});
