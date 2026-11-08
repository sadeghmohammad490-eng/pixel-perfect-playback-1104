import { createFileRoute, Link } from "@tanstack/react-router";
import { LineChart, ShieldCheck, Brain, Timer } from "lucide-react";
import { pageHead } from "@/lib/site";
import { PageHeader, Container, Feature, btnGold } from "@/components/site/Page";

export const Route = createFileRoute("/about")({
  head: () => pageHead("درباره من", "آشنایی با KhatirTrader؛ فعال در بازارهای مالی از سال ۲۰۱۹ با تمرکز بر اسکالپینگ و مدیریت ریسک."),
  component: () => (
    <>
      <PageHeader eyebrow="درباره من" title="KhatirTrader" desc="معامله‌گر و مدرس بازارهای مالی، فعال از سال ۲۰۱۹ با تمرکز بر معاملات کوتاه‌مدت و اسکالپینگ." />
      <Container>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-5 text-muted-foreground lg:col-span-2">
            <p>مسیر من در بازارهای مالی از سال ۲۰۱۹ شروع شد. در این سال‌ها بیشترین تمرکزم بر معاملات کوتاه‌مدت و اسکالپینگ بوده؛ سبکی که بیش از هر چیز به نظم، سرعت تصمیم‌گیری و مدیریت دقیق ریسک نیاز دارد.</p>
            <p>هدف آکادمی KHATIRTRADER آموزش مهارت است، نه فروش رؤیا. در آموزش‌ها روی قیمت‌خوانی، ساختن برنامه معاملاتی، کنترل ریسک و مهم‌تر از همه، شناخت ذهن معامله‌گر کار می‌کنیم.</p>
            <p className="rounded-lg border border-border bg-surface p-4 text-sm">معامله در بازارهای مالی با ریسک از دست دادن سرمایه همراه است و هیچ آموزشی تضمین‌کننده سود نیست.</p>
            <Link to="/courses" className={btnGold}>مشاهده دوره‌ها</Link>
          </div>
          <div className="grid gap-4">
            <Feature icon={Timer} title="اسکالپینگ" desc="معاملات کوتاه‌مدت با برنامه مشخص" />
            <Feature icon={LineChart} title="قیمت‌خوانی" desc="Price Action و ساختار بازار" />
            <Feature icon={ShieldCheck} title="مدیریت ریسک" desc="حفظ سرمایه پیش از هر سود" />
            <Feature icon={Brain} title="روانشناسی معامله" desc="نظم و کنترل هیجان" />
          </div>
        </div>
      </Container>
    </>
  ),
});
