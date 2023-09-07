import zhCN from './lang/zh-CN.ts';
import { createI18n } from 'vue-i18n';
import { useSettingsStore } from '@/store/settings.ts';

const i18n = createI18n({
  locale: 'zh-CN',
  messages: {
    // en,
    'zh-CN': zhCN,
    // 'zh-TW': zhTW,
    // tr,
  },
  silentTranslationWarn: true,
});

export default i18n;
