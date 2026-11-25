import logo from "@/assets/khatirtrader-header-logo.png";

export function Logo({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <img
      src={logo}
      alt="KHATIRTRADER"
      style={className ? undefined : { height: size, width: "auto" }}
      className={className ?? "block"}
    />
  );
}
