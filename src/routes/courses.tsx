import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle, ListTree, Download, BarChart3, Lock, Eye } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, EmptyState, Feature } from "@/components/site/Page";

export const Route = createFileRoute("/courses")({
  head: () => pageHead("دوره‌های آفلاین", "کاتالوگ دوره‌های ضبط‌شده آموزش ترید با سرفصل، درس‌های پیش‌نمایش و پیگیری پیشرفت."),
  component: () => (
    <>
      <PageHeader eyebrow="بخش دو" title="دوره‌های آفلاین" desc="دوره‌های ضبط‌شده با سرفصل منظم، درس‌های ویدیویی و پیگیری پیشرفت." />
      <Container>
        <EmptyState icon={PlayCircle} title="نخستین دوره در حال آماده‌سازی است" desc="پس از انتشار، سرفصل‌ها، مدت زمان، درس‌های پیش‌نمایش و قیمت هر دوره در اینجا نمایش داده می‌شود." />
        <h2 className="mb-6 mt-14 text-2xl font-bold">آنچه در هر دوره خواهید داشت</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon={ListTree} title="سرفصل فصل‌بندی‌شده" desc="فصل‌ها و درس‌های منظم و قابل پیگیری" />
          <Feature icon={Eye} title="درس‌های پیش‌نمایش" desc="پیش از خرید، بخشی از دوره را ببینید" />
          <Feature icon={BarChart3} title="پیگیری پیشرفت" desc="ذخیره درس‌های تکمیل‌شده و ادامه یادگیری" />
          <Feature icon={Download} title="فایل‌های پیوست" desc="منابع قابل دانلود در صورت مجاز بودن" />
          <Feature icon={Lock} title="دسترسی امن" desc="پخش ویدیو فقط برای دانشجویان مجاز" />
        </div>
      </Container>
    </>
  ),
});
