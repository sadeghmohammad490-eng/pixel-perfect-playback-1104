export const bookObjectKeys: Record<string, string> = {
  "spike-trading": "New folder (3)/کتاب_آموزشی_اسپایک_تریدینگ_آکادمی_خطیر_تریدر_ویرایش_شده.pdf",
  "pullback-trading": "New folder (3)/New folder/اصلاح تریدینگ (Pullback Trading).pdf",
  "breakout-trading": "New folder (3)/ﺷﮑﺳت ﺗرﯾدﯾﻧﮓ )Breakout Trading(.pdf",
  "retest-trading": "New folder (3)/ری ﺗﺳت ﺗرﯾدﯾﻧﮓ )Retest Trading(.pdf",
  "reversal-trading": "New folder (3)/ﺑرﮔﺷﺗﯽ ﺗرﯾدﯾﻧﮓ )Reversal Trading(.pdf",
  "trend-following-trading": "New folder (3)/روﻧد ﺗرﯾدﯾﻧﮓ ﯾﺎ ﻣﻌﺎﻣﻠﮫ ﮔری در ﺟﮭت روﻧد )Trend-Following Trading(.pdf",
  "counter-trend-trading": "New folder (3)/ﺧﻼف روﻧد ﺗرﯾدﯾﻧﮓ )Counter-Trend Trading(.pdf",
  "range-trading": "New folder (3)/رﻧﺞ ﺗرﯾدﯾﻧﮓ )Range Trading(.pdf",
  "momentum-trading": "New folder (3)/ﻣوﻣﻧﺗوم ﺗرﯾدﯾﻧﮓ )Momentum Trading(.pdf",
  "trader-entry-methods": "New folder (3)/اﻧواع_ﺗرﯾدر_ﺑر_اﺳﺎس_روش_ورود_ﺑﮫ_ﻣﻌﺎﻣﻠﮫ.pdf",
  "trading-glossary": "New folder (3)/فرهنگ_جامع_اصطلاحات_تخصصی_ترید_—_نسخه_اصلاح_شده_—_آکادمی_خطیر_تریدر.pdf",
  "brooks-price-action-trends": "New folder (3)/بررسی_جامع_کتاب_Trading_Price_Action_Trends_اثر_ال_بروکس.pdf",
  "momentum-masters": "New folder (3)/بررسی_جامع_کتاب_استادان_مومنتوم_آکادمی_خطیر_تریدر.pdf",
  "grimes-technical-analysis": "New folder (3)/کتاب_آموزشی_آدام_گرایمز_آکادمی_خطیر_تریدر.pdf",
  "kathy-lien-currency-market": "New folder (3)/Kathy Lien Book Review.pdf",
};

export function bookObjectKey(id: string): string | null {
  return bookObjectKeys[id] ?? null;
}
