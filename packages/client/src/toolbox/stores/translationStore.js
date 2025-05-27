import { computed, reactive, watchEffect } from 'vue';

import { useStorage } from '@vueuse/core';

import { data, readAllTranslations } from '../../api/translations';
import translations from '../../translations.json';

readAllTranslations();

export const locales = ['bg'];
export const locale = useStorage('locale', 'bg');

export const extraTranslations = reactive({});

export const bgEnToggle = () => {
  locale.value = locale.value == 'bg' ? 'en' : 'bg';
};

const mergedTranslations = computed(() => ({
  ...Object.fromEntries(data.value.map(({ english, bulgarian }) => [english, [bulgarian]])),
  ...translations,
}));

export const t = (key) => {
  const translation = mergedTranslations.value[key]?.[locales.indexOf(locale.value)];

  if (!translation && locale.value !== 'en') {
    handleMissingTranslation(key);
  }
  return translation ?? key;
};

export const i18nDirective = {
  beforeMount(el) {
    el.originalText = el.innerText.trim();
  },
  mounted(el) {
    watchEffect(() => {
      el.innerText = t(el.originalText);
    });
  },
  updated(el) {
    el.originalText = el.innerText.trim();
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
