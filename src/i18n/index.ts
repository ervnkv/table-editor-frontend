// npm install react-i18next i18next --save
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { header_en, header_ru } from './locales/header';
import { buttons_en, buttons_ru } from './locales/buttons';
import { tables_en, tables_ru } from './locales/tables';
import { errors_en, errors_ru } from './locales/errors';


export const resources = {
    en: {
        header: header_en,
        buttons: buttons_en,
        tables: tables_en,
        errors: errors_en,
      },
    ru: {
        header: header_ru,
        buttons: buttons_ru,
        tables: tables_ru,
        errors: errors_ru,
    }
} as const;


i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,

    fallbackLng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;