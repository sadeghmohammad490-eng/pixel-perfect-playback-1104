import { Link } from "@tanstack/react-router";
import { Instagram, Send, Youtube, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { sections } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">آموزش تخصصی ترید، قیمت‌خوانی، مدیریت ریسک و روانشناسی معامله.</p>
          <div className="flex gap-3 text-muted-foreground">
            {[Instagram, Send, Youtube, Mail].map((I, k) => (
              <span key={k} className="rounded-full border border-border p-2" title="لینک شبکه اجتماعی پس از تکمیل اطلاعات فعال می‌شود"><I className="h-4 w-4" /></span>
            ))}
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
        معامله در بازارهای مالی با ریسک بالای از دست دادن سرمایه همراه است. محتوای این وب‌سایت صرفاً آموزشی است و هیچ‌گونه تضمینی برای سودآوری ارائه نمی‌دهد.
        <div className="mt-2" dir="ltr">© {new Date().getFullYear()} KHATIRTRADER</div>
      </div>
    </footer>
  );
}
