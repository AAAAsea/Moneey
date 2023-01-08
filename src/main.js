import { createApp } from 'vue'
import './style.scss'
import store from './store'
import App from './App.vue'
import i18n from './local'
createApp(App).use(store).use(i18n).mount('#app')
