import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const width = ref('40%');
  const projectHistory = ref(false);
  const form = ref(false);

  return { projectHistory, width, form };
});
