import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader, Container, IntegrationNote } from "@/components/site/Page";

const pages: Record<string, { title: string; body: string }> = {
  impressum: { title: "Impressum", body: "اطلاعات قانونی ارائه‌دهنده خدمات (نام، نشانی، اطلاعات تماس و در صورت وجود شماره ثبت و شناسه مالیاتی) طبق § 5 DDG پس از دریافت اطلاعات واقعی تکمیل می‌شود." },
  datenschutz: { title: "Datenschutzerklärung", body: "این سیاست حریم خصوصی مطابق GDPR / DSGVO توضیح خواهد داد چه داده‌هایی جمع‌آوری، به چه منظوری پردازش و چه مدت نگهداری می‌شوند، و کاربران چه حقوقی دارند." },
  terms: { title: "قوانین و مقررات", body: "شرایط استفاده از وب‌سایت، خرید دوره‌ها، دسترسی به محتوا و مسئولیت‌ها پس از بازبینی حقوقی در این صفحه منتشر می‌شود." },
  widerruf: { title: "انصراف و محتوای دیجیتال", body: "اطلاعات مربوط به حق انصراف (Widerrufsrecht) و شرایط محتوای دیجیتال طبق قوانین آلمان و اتحادیه اروپا در این بخش تکمیل می‌شود." },
  risk: { title: "هشدار ریسک مالی", body: "معامله در بازارهای مالی، به‌ویژه با اهرم، با ریسک بالای از دست دادن تمام یا بخشی از سرمایه همراه است. محتوای KHATIRTRADER صرفاً آموزشی است، توصیه سرمایه‌گذاری محسوب نمی‌شود و هیچ تضمینی برای سودآوری ارائه نمی‌دهد. عملکرد گذشته نشان‌دهنده نتایج آینده نیست." },
};

export const Route = createFileRoute("/legal/$page")({
  loader: ({ params }) => {
    const p = pages[params.page];
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    const t = `${loaderData?.title ?? "اطلاعات حقوقی"} | KHATIRTRADER`;
    const d = loaderData?.body.slice(0, 150) ?? "اطلاعات حقوقی KHATIRTRADER";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
  },
  component: Legal,
});

function Legal() {
  const p = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow="اطلاعات حقوقی" title={p.title} />
      <Container>
        <div className="max-w-3xl space-y-6">
          <IntegrationNote>پیش‌نویس — این صفحه پیش از انتشار باید با اطلاعات واقعی کسب‌وکار تکمیل و از نظر حقوقی بازبینی شود.</IntegrationNote>
          <p className="text-muted-foreground">{p.body}</p>
        </div>
      </Container>
    </>
  );
}
