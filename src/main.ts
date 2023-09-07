import { createApp } from 'vue';
import './style.scss';
import pinia from './store';
import App from './App.vue';
import i18n from './local';
import { router } from './router/Index';

createApp(App).use(pinia).use(i18n).use(router).mount('#app');
