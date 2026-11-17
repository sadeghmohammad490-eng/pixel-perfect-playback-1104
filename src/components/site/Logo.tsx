import logo from "@/assets/khatirtrader-header-logo.png";

export function Logo({ size = 48 }: { size?: number }) {
  return (
    <img
      src={logo}
      alt="KHATIRTRADER"
      style={{ height: size, width: "auto" }}
      className="block"
    />
  );
}
