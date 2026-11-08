import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 md:py-20">
        {eyebrow && <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p>}
        <h1 className="break-words text-2xl font-extrabold sm:text-3xl md:text-5xl text-gold-gradient leading-tight">{title}</h1>
        {desc && <p className="mt-4 max-w-2xl text-muted-foreground">{desc}</p>}
      </div>
      <div className="gold-rule absolute bottom-0 inset-x-0" />
    </section>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">{children}</div>;
}

export function EmptyState({ icon: Icon, title, desc, children }: { icon: LucideIcon; title: string; desc: string; children?: ReactNode }) {
  return (
    <div className="card-lux flex min-w-0 flex-col items-center px-4 py-9 text-center sm:px-6 sm:py-14">
      <span className="mb-4 rounded-full border border-primary/40 bg-accent p-4"><Icon className="h-7 w-7 text-primary" /></span>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{desc}</p>
      {children && <div className="mt-6 max-w-full">{children}</div>}
    </div>
  );
}

export function IntegrationNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-primary/50 bg-accent/40 p-4 text-sm text-accent-foreground">
      {children}
    </div>
  );
}

export function Feature({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="card-lux min-w-0 p-5 sm:p-6">
      <Icon className="mb-3 h-6 w-6 text-primary" />
      <h3 className="font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

export const btnGold = "inline-flex min-h-12 max-w-full items-center justify-center gap-2 whitespace-normal rounded-lg bg-gold-gradient px-6 py-3 text-center font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-gold";
export const btnOutline = "inline-flex min-h-12 max-w-full items-center justify-center gap-2 whitespace-normal rounded-lg border border-primary/60 px-6 py-3 text-center font-medium text-primary transition-colors hover:bg-accent";
