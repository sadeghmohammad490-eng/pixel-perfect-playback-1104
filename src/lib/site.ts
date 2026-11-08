import {
  MessageCircleQuestion, PlayCircle, Video, Wrench, BookOpen, ShoppingBag,
  Award, GraduationCap, LifeBuoy, type LucideIcon,
} from "lucide-react";

export type SectionPath =
  | "/faq" | "/courses" | "/online-sessions" | "/tools" | "/books"
  | "/shop" | "/students" | "/my-courses" | "/support";

export const sections: { to: SectionPath; title: string; desc: string; icon: LucideIcon }[] = [
  { to: "/faq", title: "سوال و پاسخ", desc: "پرسش‌های پرتکرار و پاسخ‌های بررسی‌شده", icon: MessageCircleQuestion },
  { to: "/courses", title: "دوره‌های آفلاین", desc: "دوره‌های ضبط‌شده با پیگیری پیشرفت", icon: PlayCircle },
  { to: "/online-sessions", title: "رفع اشکال آنلاین", desc: "جلسات زنده و هفتگی پرسش و پاسخ", icon: Video },
  { to: "/tools", title: "ابزارهای ترید", desc: "اندیکاتورها و ابزارهای MetaTrader 5", icon: Wrench },
  { to: "/books", title: "کتاب", desc: "کتابخانه و انتشارات آموزشی", icon: BookOpen },
  { to: "/shop", title: "خرید دوره‌ها", desc: "کاتالوگ، قیمت‌ها و سفارش‌ها", icon: ShoppingBag },
  { to: "/students", title: "دانشجویان موفق", desc: "تجربه‌های واقعی و تأییدشده دانشجویان", icon: Award },
  { to: "/my-courses", title: "دوره‌های من", desc: "داشبورد شخصی و ادامه یادگیری", icon: GraduationCap },
  { to: "/support", title: "پشتیبانی و تیکت", desc: "ثبت و پیگیری درخواست پشتیبانی", icon: LifeBuoy },
];

export const navGroups = [
  { label: "آموزش", items: sections.filter((s) => ["/courses", "/online-sessions", "/books"].includes(s.to)) },
  { label: "منابع", items: sections.filter((s) => ["/tools", "/faq", "/students"].includes(s.to)) },
  { label: "حساب من", items: sections.filter((s) => ["/my-courses", "/support"].includes(s.to)) },
];

export function pageHead(title: string, description: string) {
  const t = `${title} | KHATIRTRADER`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
