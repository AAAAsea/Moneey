import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModelStore = defineStore('model', () => {
  const width = ref('40%');
  const projectHistory = ref(false);
  const form = ref(false);

  return { projectHistory, width, form };
});
