import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const lang = ref('zh-CN');
    const theme = ref('light');
    const autoFold = ref(true);
    const topSticky = ref(true);
    const autoHide = ref(false);

    return { lang, theme, autoFold, topSticky, autoHide };
  },
  { persist: true }
);
