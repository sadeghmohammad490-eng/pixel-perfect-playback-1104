import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/site";
import { AboutAcademy } from "@/components/site/AboutAcademy";

export const Route = createFileRoute("/about")({
  head: () => pageHead("درباره آکادمی", "آکادمی خطیر تریدر؛ آموزش اصولی معامله‌گری، مدیریت سرمایه و پرورش ذهنیت حرفه‌ای."),
  component: AboutAcademy,
});
