import logoAsset from "@/assets/khatirtrader-logo.jpg.asset.json";

// Official KHATIRTRADER logo, shown unmodified.
export function Logo({ size = 48 }: { size?: number }) {
  return (
    <img
      src={logoAsset.url}
      alt="KHATIRTRADER"
      style={{ height: size, width: "auto" }}
      className="block"
    />
  );
}
