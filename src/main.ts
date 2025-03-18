import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import enMessages from './locales/en.json';
import ptMessages from './locales/pt.json';

// Create pinia store
const pinia = createPinia();

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages: {
    en: enMessages,
    pt: ptMessages
  }
});

// Create and mount the app
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');
