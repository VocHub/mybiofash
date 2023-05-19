import i18next from "i18next";
import common_es from "../translations/es/common.json";
import common_en from "../translations/en/common.json";

// Initialize transalion service
const translator = i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
    en: {
      common: common_en
    },
    es: {
      common: common_es
    },
  },
});

export default translator;
