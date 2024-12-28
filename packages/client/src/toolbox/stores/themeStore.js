import { reactive } from 'vue';

export const themes = reactive({
  theme: localStorage.getItem('theme') || 'light',
});
