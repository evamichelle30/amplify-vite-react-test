import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInFrench from './resources/fr/translation.json';
import translationsInGerman from './resources/de/translation.json';
// the translations
const resources = {
  fr: {
    translation: translationsInFrench
  },
  de: {
    translation: translationsInGerman
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources, // resources are important to load translations for the languages.
    lng: "fr", // It acts as default language. When the site loads, content is shown in this language.  
    debug: true,
    fallbackLng: "de", // use de if selected language is not available
    interpolation: {
      escapeValue: false
    },
    ns: "translation", // namespaces help to divide huge translations into multiple small files.
    defaultNS: "translation"
  });

export default i18n;