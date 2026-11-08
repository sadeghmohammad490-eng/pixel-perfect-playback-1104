import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, EmptyState, btnGold } from "@/components/site/Page";

export const Route = createFileRoute("/my-courses")({
  head: () => pageHead("دوره‌های من", "داشبورد شخصی دانشجو: دوره‌ها، پیشرفت و منابع."),
  component: () => (
    <>
      <PageHeader eyebrow="بخش هشت" title="دوره‌های من" desc="دوره‌های خریداری‌شده، پیشرفت درس‌ها و منابع قابل دانلود." />
      <Container>
        <EmptyState icon={GraduationCap} title="برای مشاهده دوره‌ها وارد شوید" desc="این بخش خصوصی است و فقط دوره‌هایی که به آن‌ها دسترسی دارید نمایش داده می‌شود.">
          <Link to="/auth" className={btnGold}>ورود / ثبت‌نام</Link>
        </EmptyState>
      </Container>
    </>
  ),
});
