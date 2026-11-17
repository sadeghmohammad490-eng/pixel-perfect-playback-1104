import spikeCover from "@/assets/books/spike-trading-cover.jpg";
import pullbackCover from "@/assets/books/pullback-trading-cover.jpg";
import breakoutCover from "@/assets/books/breakout-trading-cover.jpg";
import retestCover from "@/assets/books/retest-trading-cover.jpg";
import reversalCover from "@/assets/books/reversal-trading-cover.jpg";
import trendFollowingCover from "@/assets/books/trend-following-trading-cover.jpg";
import counterTrendCover from "@/assets/books/counter-trend-trading-cover.jpg";
import rangeCover from "@/assets/books/range-trading-cover.jpg";
import momentumCover from "@/assets/books/momentum-trading-cover.jpg";
import traderEntryCover from "@/assets/books/trader-entry-methods-cover.jpg";
import glossaryCover from "@/assets/books/trading-glossary-cover.jpg";
import brooksCover from "@/assets/books/brooks-price-action-trends-cover.jpg";
import mastersCover from "@/assets/books/momentum-masters-cover.jpg";
import grimesCover from "@/assets/books/grimes-technical-analysis-cover.jpg";
import lienCover from "@/assets/books/kathy-lien-currency-market-cover.jpg";

export type Book = {
  id: string;
  title: string;
  pages: number;
  cover: string;
  description?: string;
  category?: string;
};

const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const books: Book[] = [
  {
    id: "spike-trading",
    title: "(Spike Trading) اسپایک تریدینگ",
    pages: 7,
    cover: spikeCover,
  },
  {
    id: "pullback-trading",
    title: "اصلاح تریدینگ (Pullback Trading)",
    pages: 9,
    cover: pullbackCover,
  },
  {
    id: "breakout-trading",
    title: "شکست تریدینگ (Breakout Trading)",
    pages: 12,
    cover: breakoutCover,
  },
  {
    id: "retest-trading",
    title: "ری تست تریدینگ (Retest Trading)",
    pages: 8,
    cover: retestCover,
  },
  {
    id: "reversal-trading",
    title: "برگشتی تریدینگ (Reversal Trading)",
    pages: 12,
    cover: reversalCover,
  },
  {
    id: "trend-following-trading",
    title: "روند تریدینگ یا معامله گری در جهت روند (Trend-Following Trading)",
    pages: 10,
    cover: trendFollowingCover,
  },
  {
    id: "counter-trend-trading",
    title: "خلاف روند تریدینگ (Counter-Trend Trading)",
    pages: 13,
    cover: counterTrendCover,
  },
  {
    id: "range-trading",
    title: "رنج تریدینگ (Range Trading)",
    pages: 13,
    cover: rangeCover,
  },
  {
    id: "momentum-trading",
    title: "مومنتوم تریدینگ (Momentum Trading)",
    pages: 12,
    cover: momentumCover,
  },
  {
    id: "trader-entry-methods",
    title: "انواع تریدر بر اساس روش ورود به معامله",
    pages: 5,
    cover: traderEntryCover,
  },
  {
    id: "trading-glossary",
    title: "فرهنگ جامع اصطلاحات تخصصی ترید",
    pages: 23,
    cover: glossaryCover,
  },
  {
    id: "brooks-price-action-trends",
    title: "اثر ال بروکس (Trading Price Action Trends)",
    pages: 7,
    cover: brooksCover,
  },
  {
    id: "momentum-masters",
    title: "بررسی جامع کتاب (Momentum Masters) (استادان مومنتوم)",
    pages: 6,
    cover: mastersCover,
  },
  {
    id: "grimes-technical-analysis",
    title: "معرفی و بررسی جامع کتاب (The Art and Science of Technical Analysis)",
    pages: 5,
    cover: grimesCover,
  },
  {
    id: "kathy-lien-currency-market",
    title: "معرفی، بررسی و خلاصه جامع کتاب (Day Trading and Swing Trading the Currency Market)",
    pages: 5,
    cover: lienCover,
  },
];

export function getBook(id: string) {
  return books.find((book) => book.id === id);
}

export function faNum(value: number) {
  return String(value).replace(/\d/g, (digit) => faDigits[Number(digit)] ?? digit);
}
