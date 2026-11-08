import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Repeat, UserCheck, Mic, History } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, EmptyState, Feature, IntegrationNote } from "@/components/site/Page";

export const Route = createFileRoute("/online-sessions")({
  head: () => pageHead("رفع اشکال آنلاین", "جلسات زنده و هفتگی رفع اشکال آموزش ترید برای دانشجویان."),
  component: () => (
    <>
      <PageHeader eyebrow="بخش سه" title="رفع اشکال آنلاین" desc="جلسات زنده برای پرسش و پاسخ، بررسی اشکالات و تمرین گروهی." />
      <Container>
        <EmptyState icon={CalendarClock} title="جلسه‌ای زمان‌بندی نشده است" desc="جلسات آینده با تاریخ، ساعت و شرایط شرکت در اینجا اعلام می‌شوند." />
        <div className="my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={Repeat} title="جلسات هفتگی" desc="برنامه منظم پرسش و پاسخ" />
          <Feature icon={UserCheck} title="شرایط دسترسی" desc="ویژه دانشجویان واجد شرایط" />
          <Feature icon={Mic} title="نوبت پرسش" desc="امکان صحبت فردی در صورت پشتیبانی سرویس" />
          <Feature icon={History} title="تاریخچه جلسات" desc="آرشیو جلسات برگزارشده" />
        </div>
        <IntegrationNote>سرویس جلسه آنلاین (مانند Zoom یا Google Meet) هنوز متصل نشده است. پس از اتصال، دکمه ورود به جلسه فعال می‌شود.</IntegrationNote>
      </Container>
    </>
  ),
});
