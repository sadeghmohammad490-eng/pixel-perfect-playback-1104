import { createFileRoute, Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, EmptyState, btnOutline } from "@/components/site/Page";

export const Route = createFileRoute("/students")({
  head: () => pageHead("دانشجویان موفق و نظرات", "تجربه‌ها و نظرات واقعی و تأییدشده دانشجویان KHATIRTRADER."),
  component: () => (
    <>
      <PageHeader eyebrow="بخش هفت" title="دانشجویان موفق و نظرات" desc="فقط نظرات واقعی، با رضایت صاحب نظر و پس از بررسی منتشر می‌شوند." />
      <Container>
        <EmptyState icon={Award} title="هنوز نظری منتشر نشده است" desc="اگر دانشجوی آکادمی هستید، می‌توانید پس از ورود تجربه خود را ثبت کنید.">
          <Link to="/auth" className={btnOutline}>ثبت تجربه</Link>
        </EmptyState>
      </Container>
    </>
  ),
});
