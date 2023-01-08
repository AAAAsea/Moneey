import store from '@/store'
import zhCN from './lang/zh-CN.js';
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: store.state.settings.lang,
  messages: {
    // en,
    'zh-CN': zhCN,
    // 'zh-TW': zhTW,
    // tr,
  },
  silentTranslationWarn: true,
});

export default i18n;