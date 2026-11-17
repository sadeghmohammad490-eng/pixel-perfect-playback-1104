import spikeTradingPdf from "./book-files/spike-trading.pdf?inline";
import pullbackTradingPdf from "./book-files/pullback-trading.pdf?inline";
import breakoutTradingPdf from "./book-files/breakout-trading.pdf?inline";
import retestTradingPdf from "./book-files/retest-trading.pdf?inline";
import reversalTradingPdf from "./book-files/reversal-trading.pdf?inline";
import trendFollowingTradingPdf from "./book-files/trend-following-trading.pdf?inline";
import counterTrendTradingPdf from "./book-files/counter-trend-trading.pdf?inline";
import rangeTradingPdf from "./book-files/range-trading.pdf?inline";
import momentumTradingPdf from "./book-files/momentum-trading.pdf?inline";
import traderEntryMethodsPdf from "./book-files/trader-entry-methods.pdf?inline";
import tradingGlossaryPdf from "./book-files/trading-glossary.pdf?inline";
import brooksPriceActionTrendsPdf from "./book-files/brooks-price-action-trends.pdf?inline";
import momentumMastersPdf from "./book-files/momentum-masters.pdf?inline";
import grimesTechnicalAnalysisPdf from "./book-files/grimes-technical-analysis.pdf?inline";
import kathyLienCurrencyMarketPdf from "./book-files/kathy-lien-currency-market.pdf?inline";

const sources: Record<string, string> = {
  "spike-trading": spikeTradingPdf,
  "pullback-trading": pullbackTradingPdf,
  "breakout-trading": breakoutTradingPdf,
  "retest-trading": retestTradingPdf,
  "reversal-trading": reversalTradingPdf,
  "trend-following-trading": trendFollowingTradingPdf,
  "counter-trend-trading": counterTrendTradingPdf,
  "range-trading": rangeTradingPdf,
  "momentum-trading": momentumTradingPdf,
  "trader-entry-methods": traderEntryMethodsPdf,
  "trading-glossary": tradingGlossaryPdf,
  "brooks-price-action-trends": brooksPriceActionTrendsPdf,
  "momentum-masters": momentumMastersPdf,
  "grimes-technical-analysis": grimesTechnicalAnalysisPdf,
  "kathy-lien-currency-market": kathyLienCurrencyMarketPdf,
};

const cache = new Map<string, Uint8Array>();

export function readBookBytes(id: string): Uint8Array | null {
  const cached = cache.get(id);
  if (cached) return cached;

  const dataUrl = sources[id];
  if (!dataUrl) return null;
  const comma = dataUrl.indexOf(",");
  if (comma < 0) return null;

  const binary = atob(dataUrl.slice(comma + 1));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  cache.set(id, bytes);
  return bytes;
}
