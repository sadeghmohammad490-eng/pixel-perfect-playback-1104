import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navGroups, sections } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 lg:flex lg:justify-between">
        <Link to="/" className="flex h-18 min-w-0 items-center" aria-label="KHATIRTRADER — خانه">
          <Logo className="block h-18 w-auto max-w-full" />
        </Link>
        <nav aria-label="ناوبری اصلی" className="hidden items-center gap-1 lg:flex">
          <NavLink to="/">خانه</NavLink>
          {navGroups.map((g) => (
            <div key={g.label} className="group relative">
              <Button variant="ghost" className="flex h-auto items-center gap-1 rounded-md px-3 py-2 text-lg font-normal text-muted-foreground transition-colors hover:text-primary">
                {g.label} <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="invisible absolute right-0 top-full w-64 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-xl border border-border bg-popover p-2 shadow-gold">
                  {g.items.map((i) => (
                    <Link key={i.to} to={i.to} className="flex items-start gap-3 rounded-lg p-2 hover:bg-accent">
                      <i.icon className="mt-1 h-4 w-4 text-primary" />
                      <span>
                        <span className="block text-sm">{i.title}</span>
                        <span className="block text-xs text-muted-foreground">{i.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <NavLink to="/shop">خرید دوره‌ها</NavLink>
          <NavLink to="/about">درباره آکادمی</NavLink>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild className="hidden h-auto rounded-lg bg-gold-gradient px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex">
          <Link to="/auth">
            ورود / ثبت‌نام
          </Link>
          </Button>
          <Button ref={menuButton} variant="ghost" size="icon" aria-label={open ? "بستن منو" : "منو"} aria-expanded={open} aria-controls="mobile-navigation" className="h-11 w-11 shrink-0 rounded-md lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="ناوبری موبایل" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-border bg-surface px-4 py-4 lg:hidden">
          <div className="grid gap-1">
            <Link to="/" onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-md p-2 hover:bg-accent">خانه</Link>
            {sections.map((s) => (
              <Link key={s.to} to={s.to} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-2 rounded-md p-2 hover:bg-accent">
                <s.icon className="h-4 w-4 shrink-0 text-primary" /> {s.title}
              </Link>
            ))}
            <Link to="/about" onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-md p-2 hover:bg-accent">درباره آکادمی</Link>
            <Button asChild className="mt-2 h-auto min-h-11 rounded-lg bg-gold-gradient p-2 text-center font-bold text-primary-foreground"><Link to="/auth" onClick={() => setOpen(false)}>ورود / ثبت‌نام</Link></Button>
          </div>
        </nav>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: "/" | "/about" | "/shop"; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="rounded-md px-3 py-2 text-lg text-muted-foreground transition-colors hover:text-primary data-[status=active]:text-primary"
    >
      {children}
    </Link>
  );
}
