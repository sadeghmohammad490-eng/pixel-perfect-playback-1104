// Temporary placeholder: replace with the official uploaded KHATIRTRADER logo file (unmodified).
export function Logo({ size = 44 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3" aria-label="KHATIRTRADER">
      <span
        style={{ width: size, height: size }}
        className="grid place-items-center rounded-full border border-dashed border-primary bg-background text-[9px] leading-tight text-primary text-center"
        title="جای لوگوی رسمی — فایل اصلی بارگذاری نشده است"
      >
        لوگو
      </span>
      <span dir="ltr" className="text-lg font-extrabold tracking-widest text-gold-gradient">
        KHATIRTRADER
      </span>
    </span>
  );
}
