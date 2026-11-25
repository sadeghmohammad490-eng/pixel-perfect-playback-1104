import { Link } from "@tanstack/react-router";
import portrait from "@/assets/about-portrait.jpg";
import wordmark from "@/assets/khatirtrader-wordmark.png";
import skillScalping from "@/assets/skills/scalping.png";
import skillPrice from "@/assets/skills/price.png";
import skillRisk from "@/assets/skills/risk.png";
import skillMind from "@/assets/skills/mind.png";
import skillDiscipline from "@/assets/skills/discipline.png";
import { books, faNum } from "@/lib/books";

type ProseSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
};

const proseSections = [
  {
    id: "intro",
    title: "معرفی",
    paragraphs: [
      "معامله‌گر و مدرس بازارهای مالی، فعال از سال ۲۰۱۹ با تمرکز بر معاملات کوتاه‌مدت و اسکالپینگ. مسیر من در بازارهای مالی از سال ۲۰۱۹ شروع شد. در این سال‌ها بیشترین تمرکزم بر معاملات کوتاه‌مدت و اسکالپینگ بوده؛ سبکی که بیش از هر چیز به نظم، سرعت تصمیم‌گیری و مدیریت دقیق ریسک نیاز دارد.",
    ],
  },
  {
    id: "philosophy",
    title: "فلسفه آموزشی",
    paragraphs: [
      "هدف آکادمی KHATIRTRADER آموزش مهارت است، نه فروش رؤیا. در آموزش‌ها روی قیمت‌خوانی، ساختن برنامه معاملاتی، کنترل ریسک و مهم‌تر از همه، شناخت ذهن معامله‌گر کار می‌کنیم.",
    ],
  },
  { id: "experience", title: "تجربیات معاملاتی" },
  { id: "courses", title: "دوره‌های آموزشی" },
  { id: "social", title: "شبکه‌های اجتماعی" },
] satisfies readonly ProseSection[];

const topics = [
  { title: "اسکالپینگ", image: skillScalping },
  { title: "قیمت‌خوانی", image: skillPrice },
  { title: "مدیریت ریسک", image: skillRisk },
  { title: "روانشناسی معامله", image: skillMind },
  { title: "نظم معاملاتی", image: skillDiscipline },
];

const visibleProse = proseSections.filter((section) => (section.paragraphs?.length ?? 0) > 0);

export function AboutProfile({ showBooks = true }: { showBooks?: boolean }) {
  const intro = visibleProse.find((section) => section.id === "intro");
  const philosophy = visibleProse.find((section) => section.id === "philosophy");

  return (
    <>
      <section id="intro" className="scroll-mt-40 border-b border-border bg-surface" aria-labelledby="about-heading">
        <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:gap-10">
          <div className="order-2 min-w-0 lg:order-1">
            <h1 id="about-heading" className="flex justify-center">
              <img src={wordmark} alt="KhatirTrader" width={1600} height={533} className="h-auto w-full max-w-md sm:max-w-lg" />
            </h1>
            <div className="mt-4 space-y-4 text-muted-foreground">
              {intro?.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {philosophy?.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <img
            src={portrait}
            alt="خطیر تریدر"
            width={768}
            height={1024}
            fetchPriority="high"
            decoding="async"
            className="order-1 aspect-[3/4] w-full max-w-sm justify-self-center rounded-2xl object-cover object-[center_18%] lg:order-2 lg:max-w-none"
          />
          <div className="order-3 mx-auto grid w-full max-w-3xl grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 lg:col-span-2 lg:max-w-4xl lg:grid-cols-5">
            {topics.map((topic) => (
              <img key={topic.title} src={topic.image} alt={topic.title} width={387} height={438} className="h-auto w-full max-w-56 sm:max-w-none" />
            ))}
          </div>
        </div>
      </section>

      {showBooks && (
        <section id="books" className="scroll-mt-40 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">کتاب‌ها و منابع آموزشی</h2>
            <div className="gold-rule mt-4 w-24" />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <Link
                  key={book.id}
                  to="/books/$bookId"
                  params={{ bookId: book.id }}
                  className="card-lux flex h-full min-w-0 flex-col p-3 no-underline"
                >
                  <img src={book.cover} alt="" width={1024} height={1024} loading="lazy" decoding="async" className="aspect-square w-full rounded-lg bg-white object-contain" />
                  <span className="mt-2 line-clamp-3 break-words text-sm font-bold leading-6">{book.title}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{faNum(book.pages)} صفحه</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
