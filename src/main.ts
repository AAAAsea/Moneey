import { createApp } from 'vue'
import './style.scss'
import store from './store'
import App from './App.vue'
import i18n from './local'
import { router } from './router/Index'


createApp(App).use(store).use(i18n).use(router).mount('#app')
