import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "@/translations/json/en.json";
import koTranslations from "@/translations/json/ko.json";
import jaTranslations from "@/translations/json/ja.json";

const languageDetectorOptions = {
  order: [
    "navigator",
    "querystring",
    "cookie",
    "localStorage",
    "subdomain",
    "header",
  ],
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "ko",
    detection: languageDetectorOptions,
    fallbackLng: "ja",
    resources: {
      en: {
        translation: enTranslations,
      },
      ko: {
        translation: koTranslations,
      },
      ja: {
        translation: jaTranslations,
      },
    },
    interpolation: {
      escapeValue: false, // xss 보호를 위해서 escape 설정을 한다.
    },
  });

export default i18next;
