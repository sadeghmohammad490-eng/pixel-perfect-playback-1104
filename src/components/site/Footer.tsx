import { Link } from "@tanstack/react-router";
import { Instagram, Send, Youtube, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { sections } from "@/lib/site";

const socialIcon = "rounded-full border border-primary/70 p-2 text-primary shadow-[0_0_16px_color-mix(in_oklab,var(--primary)_45%,transparent)] transition-colors hover:border-primary hover:shadow-[0_0_22px_color-mix(in_oklab,var(--primary)_70%,transparent)]";

export function Footer() {
  return (
    <footer className="site-footer mt-14 border-t border-border bg-surface lg:mt-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-14">
        <div className="min-w-0 space-y-4">
          <Logo size={72} />
          <p className="text-sm text-muted-foreground">آموزش تخصصی ترید، قیمت‌خوانی، مدیریت ریسک و روانشناسی معامله.</p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/khatir.trader?avpt=MjNyMDBybms5MTVt&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام"
              className={socialIcon}
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://t.me/KhatirTrader" target="_blank" rel="noopener noreferrer" aria-label="تلگرام" className={socialIcon}>
              <Send className="h-4 w-4" />
            </a>
            <a href="https://www.youtube.com/@Khatirtrader" target="_blank" rel="noopener noreferrer" aria-label="یوتیوب" className={socialIcon}>
              <Youtube className="h-4 w-4" />
            </a>
            <a href="mailto:khatir.trader.academy@gmail.com" aria-label="ایمیل" className={socialIcon}>
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-primary">دسترسی سریع</h3>
          <ul className="grid gap-1 text-sm text-muted-foreground">
            {sections.slice(0, 5).map((s) => <li key={s.to}><Link to={s.to} className="hover:text-primary">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-primary">حساب کاربری</h3>
          <ul className="grid gap-1 text-sm text-muted-foreground">
            {sections.slice(5).map((s) => <li key={s.to}><Link to={s.to} className="hover:text-primary">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-primary">اطلاعات حقوقی</h3>
          <ul className="grid gap-1 text-sm text-muted-foreground">
            <li><Link to="/legal/$page" params={{ page: "impressum" }} className="hover:text-primary">Impressum</Link></li>
            <li><Link to="/legal/$page" params={{ page: "datenschutz" }} className="hover:text-primary">Datenschutzerklärung</Link></li>
            <li><Link to="/legal/$page" params={{ page: "terms" }} className="hover:text-primary">قوانین و مقررات</Link></li>
            <li><Link to="/legal/$page" params={{ page: "widerruf" }} className="hover:text-primary">انصراف و محتوای دیجیتال</Link></li>
            <li><Link to="/legal/$page" params={{ page: "risk" }} className="hover:text-primary">هشدار ریسک مالی</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-6 text-center text-xs leading-6 text-muted-foreground">
        معامله در بازارهای مالی با ریسک بالای از دست دادن سرمایه همراه است. محتوای این وب‌سایت صرفاً آموزشی است.
        <div className="mt-2" dir="ltr">© {new Date().getFullYear()} KHATIRTRADER</div>
      </div>
    </footer>
  );
}
