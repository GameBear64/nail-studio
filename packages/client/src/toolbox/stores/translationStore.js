import { watchEffect } from 'vue';

import { useStorage } from '@vueuse/core';

import translations from '../../translations.json';

export const locales = ['bg', 'de'];
export const locale = useStorage('locale', 'bg');

export const bgEnToggle = () => {
  locale.value = locale.value == 'bg' ? 'en' : 'bg';
};

export const t = (key) => {
  const translation = translations[key]?.[locales.indexOf(locale.value)];
  if (!translation && locale.value !== 'en') {
    handleMissingTranslation(key);
  }
  return translation || key;
};

export const i18nDirective = {
  beforeMount(el) {
    const text = el.innerText.trim();
    el.originalText = text;
    el.innerText = t(text);
  },
  mounted(el) {
    watchEffect(() => {
      el.innerText = t(el.originalText);
    });
  },
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
