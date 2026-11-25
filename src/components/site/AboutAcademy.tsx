import { Link } from "@tanstack/react-router";
import hall from "@/assets/about-academy-hall.jpg";
import mark from "@/assets/about-academy-mark.png";
import valueVision from "@/assets/about-value-vision.png";
import valueMission from "@/assets/about-value-mission.png";
import valuePrinciples from "@/assets/about-value-values.png";
import valuePhilosophy from "@/assets/about-value-philosophy.png";
import topicRisk from "@/assets/about-topic-risk.png";
import topicPrice from "@/assets/about-topic-price.png";
import topicScalping from "@/assets/about-topic-scalping.png";
import topicStrategy from "@/assets/about-topic-strategy.png";
import topicDiscipline from "@/assets/about-topic-discipline.png";
import topicMind from "@/assets/about-topic-mind.png";
import serviceCourses from "@/assets/about-service-courses.png";
import serviceSessions from "@/assets/about-service-sessions.png";
import serviceLibrary from "@/assets/about-service-library.png";
import serviceTools from "@/assets/about-service-tools.png";
import serviceFaq from "@/assets/about-service-faq.png";
import serviceSupport from "@/assets/about-service-support.png";
import { btnGold } from "@/components/site/Page";

const values = [
  { title: "چشم‌انداز آکادمی", text: "پرورش معامله‌گران مستقل و آگاه", image: valueVision },
  { title: "رسالت آکادمی", text: "آموزش مهارت به جای فروش رؤیا", image: valueMission },
  { title: "ارزش‌های آکادمی", text: "صداقت، نظم و مسئولیت‌پذیری", image: valuePrinciples },
  { title: "فلسفه آموزشی", text: "یادگیری، تمرین و تجربه عملی", image: valuePhilosophy },
];

const topics = [
  { title: "مدیریت ریسک", image: topicRisk },
  { title: "قیمت‌خوانی", image: topicPrice },
  { title: "اسکالپینگ", image: topicScalping },
  { title: "تدوین استراتژی", image: topicStrategy },
  { title: "نظم معاملاتی", image: topicDiscipline },
  { title: "روانشناسی معامله", image: topicMind },
];

const steps = [
  "شناخت اصول و ساختار بازار",
  "یادگیری سبک و استراتژی معاملاتی",
  "بک‌تست و تمرین عملی",
  "مدیریت ریسک و کنترل هیجانات",
  "ارزیابی و بهبود عملکرد معاملاتی",
];

const services = [
  { title: "دوره‌های تخصصی", image: serviceCourses },
  { title: "جلسات رفع اشکال آنلاین", image: serviceSessions },
  { title: "کتابخانه دیجیتال", image: serviceLibrary },
  { title: "ابزارهای معامله‌گری", image: serviceTools },
  { title: "پرسش و پاسخ", image: serviceFaq },
  { title: "پشتیبانی آموزشی", image: serviceSupport },
];

function Heading({ children }: { children: string }) {
  return <h2 className="text-center text-xl font-bold text-primary sm:text-2xl">{children}</h2>;
}

function Rule() {
  return <div className="gold-rule" />;
}

export function AboutAcademy() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:py-12">
      <section className="rounded-2xl border border-primary/30 bg-card px-4 py-8 sm:px-8 sm:py-10">
        <h1 className="mx-auto max-w-3xl">
          <img
            src={mark}
            alt="آکادمی خطیر تریدر. آموزش تخصصی، تفکر حرفه‌ای، معامله‌گری آگاهانه"
            width={1600}
            height={533}
            className="h-auto w-full"
          />
        </h1>
        <img
          src={hall}
          alt="سالن آموزش آکادمی با نمایشگرهای تحلیل بازار"
          width={842}
          height={348}
          className="mt-8 w-full rounded-2xl object-cover"
        />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <Heading>درباره آکادمی</Heading>
          <p className="mt-4 leading-8 text-muted-foreground">
            آکادمی خطیر تریدر با هدف آموزش اصولی و کاربردی معامله‌گری در بازارهای مالی فعالیت می‌کند. تمرکز ما بر توسعه مهارت، شناخت بازار، مدیریت سرمایه و پرورش ذهنیت حرفه‌ای معامله‌گران است.
          </p>
        </div>
      </section>

      <section aria-label="اصول آکادمی" className="grid gap-4 sm:grid-cols-2">
        {values.map((item) => (
          <img key={item.title} src={item.image} alt={`${item.title}. ${item.text}`} width={900} height={295} className="h-auto w-full" />
        ))}
      </section>

      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="text-center text-xl font-bold text-primary sm:text-2xl">محورهای تخصصی آموزش</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((item) => (
            <li key={item.title}>
              <img src={item.image} alt={item.title} width={690} height={315} className="h-auto w-full" />
            </li>
          ))}
        </ul>
      </section>

      <Rule />

      <section aria-labelledby="path-heading">
        <h2 id="path-heading" className="text-center text-xl font-bold text-primary sm:text-2xl">مسیر یادگیری در آکادمی</h2>
        <ol className="mx-auto mt-8 w-full max-w-2xl">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-4 border-b border-primary/35 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary text-base font-bold text-primary shadow-[0_0_16px_color-mix(in_oklab,var(--primary)_55%,transparent)]">{index + 1}</span>
              <span className="h-2 w-2 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
              <span className="flex-1 text-right text-lg font-bold text-primary">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <Rule />

      <section aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-center text-xl font-bold text-primary sm:text-2xl">خدمات آموزشی آکادمی</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map((item) => (
            <li key={item.title}>
              <img src={item.image} alt={item.title} width={900} height={262} className="h-auto w-full" />
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center">
        <p className="text-lg font-bold text-primary sm:text-xl">معامله‌گری یک مهارت است، نه یک وعده ثروت.</p>
        <Link to="/courses" className={`${btnGold} mt-5`}>مشاهده دوره‌های آموزشی</Link>
      </section>

      <Rule />
    </div>
  );
}
