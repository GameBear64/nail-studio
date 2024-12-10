import { reactive } from 'vue';

import translations from '../../translations.json';

const locales = ['bg', 'de', 'jp'];

export const useTranslationStore = () => {
  const state = reactive({
    locale: 'bg',
    missingTranslations: {},
  });

  const t = (key) => {
    const translation = translations[key]?.[locales.indexOf(state.locale)];
    if (!translation && state.locale !== 'en') {
      handleMissingTranslation(key, state);
    }
    return translation || key;
  };

  const setLocale = (locale) => {
    state.locale = locales.includes(locale) ? locale : 'en';
  };

  const handleMissingTranslation = (text) => {
    if (!window?.missingTranslations) {
      window.missingTranslations = {};
      // eslint-disable-next-line no-console
      console.log(
        'Missing translations detected, "window.missingTranslations" was created and it will be filled with strings in the current translation format as you explore the website.',
      );
    }

    window.missingTranslations[text] = locales;

    return text;
  };

  return { t, setLocale, state };
};

export const i18nDirective = {
  beforeMount(el) {
    const { t } = useTranslationStore();

    const text = el.innerText.trim();
    el.originalText = text;
    el.innerText = t(text);
  },
  updated(el) {
    const { t } = useTranslationStore();
    el.innerText = t(el.originalText);
  },
};
