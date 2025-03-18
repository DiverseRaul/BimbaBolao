import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import enUS from './locales/en-US.json'
import ptBR from './locales/pt-BR.json'

// Initialize Pinia store
const PINIA = createPinia()

// Initialize i18n
const I18N = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'pt-BR': ptBR
  }
})

// Create and mount the app
const APP = createApp(App)
APP.use(PINIA)
APP.use(router)
APP.use(I18N)
APP.mount('#app')
