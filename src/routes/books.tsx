import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, EmptyState } from "@/components/site/Page";

export const Route = createFileRoute("/books")({
  head: () => pageHead("کتاب", "کتابخانه و فروشگاه کتاب‌های آموزشی KHATIRTRADER."),
  component: () => (
    <>
      <PageHeader eyebrow="بخش پنج" title="کتاب" desc="کتاب‌های آموزشی در قالب دیجیتال و چاپی." />
      <Container>
        <EmptyState icon={BookOpen} title="به‌زودی" desc="نخستین کتاب در دست آماده‌سازی است. پس از انتشار، پیش‌نمایش، قالب و امکان خرید یا دانلود در اینجا فعال می‌شود." />
      </Container>
    </>
  ),
});
