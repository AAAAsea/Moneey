import { createApp } from 'vue';
import './style.scss';
import pinia from './store';
import App from './App.vue';
import i18n from './local';
import { router } from './router/Index';
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/dark/css-vars.css';

createApp(App).use(pinia).use(i18n).use(router).mount('#app');
