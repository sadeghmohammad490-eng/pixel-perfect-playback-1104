import { createFileRoute, Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import heading from "@/assets/students-heading.png";
import { pageHead } from "@/lib/site";
import { Container, btnGold } from "@/components/site/Page";

export const Route = createFileRoute("/students")({
  head: () => pageHead("دانشجویان موفق و نظرات", "تجربه‌ها و نظرات واقعی و تأییدشده دانشجویان KHATIRTRADER."),
  component: () => (
    <>
      <section className="border-b border-border bg-surface">
        <h1 className="mx-auto max-w-4xl px-4 py-2 sm:py-3">
          <img
            src={heading}
            alt="دانشجویان موفق و نظرات. فقط نظرات واقعی، با رضایت صاحب نظر و پس از بررسی منتشر می‌شوند."
            width={1400}
            height={270}
            className="h-auto w-full"
          />
        </h1>
      </section>
      <Container>
        <div className="card-lux flex flex-col items-center border-primary/50 px-6 py-12 text-center shadow-[0_0_48px_color-mix(in_oklab,var(--primary)_22%,transparent)] sm:px-10 sm:py-16">
          <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/80 bg-accent shadow-[0_0_32px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
            <Award className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </span>
          <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">هنوز نظری منتشر نشده است</h2>
          <div className="mt-5 flex w-full max-w-xs items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-primary" />
            <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-primary" />
          </div>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">اگر دانشجوی آکادمی هستید، می‌توانید پس از ورود تجربه خود را ثبت کنید.</p>
          <Link to="/auth" className={`${btnGold} mt-6`}>ثبت تجربه</Link>
        </div>
      </Container>
    </>
  ),
});
