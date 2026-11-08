import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navGroups, sections } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/">خانه</NavLink>
          <NavLink to="/about">درباره من</NavLink>
          {navGroups.map((g) => (
            <div key={g.label} className="group relative">
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                {g.label} <ChevronDown className="h-4 w-4" />
              </button>
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
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth" className="hidden rounded-lg bg-gold-gradient px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-block">
            ورود / ثبت‌نام
          </Link>
          <button aria-label="منو" className="rounded-md p-2 lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-surface px-4 py-4 lg:hidden">
          <div className="grid gap-1">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-md p-2 hover:bg-accent">خانه</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="rounded-md p-2 hover:bg-accent">درباره من</Link>
            {sections.map((s) => (
              <Link key={s.to} to={s.to} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                <s.icon className="h-4 w-4 text-primary" /> {s.title}
              </Link>
            ))}
            <Link to="/auth" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-gold-gradient p-2 text-center font-bold text-primary-foreground">ورود / ثبت‌نام</Link>
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
      className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary data-[status=active]:text-primary"
    >
      {children}
    </Link>
  );
}
