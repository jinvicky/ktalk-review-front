import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '@/translations/json/en.json';
import koTranslations from '@/translations/json/ko.json';
import jpTranslations from '@/translations/json/jp.json';

i18next
    .use(initReactI18next)
    .init({
        lng: 'ko',
        fallbackLng: 'ja',
        resources: {
            en: {
                translation: enTranslations,
            },
            ko: {
                translation: koTranslations,
            },
            jp: {
                translation: jpTranslations,
            }
        },
        interpolation: {
            escapeValue: false, // xss 보호를 위해서 escape 설정을 한다.
        },
    });

export default i18next;