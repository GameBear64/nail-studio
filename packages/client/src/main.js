import { createApp } from 'vue';

import { i18nDirective } from '@store/translationStore';

import App from './App.vue';
import router from './router';

import '../main.css';

const app = createApp(App);
app.directive('i18n', i18nDirective);
app.use(router);
app.mount('#app');
