import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDataStore = defineStore('data', () => {
  const tags = ref<string[]>([]);
  const categories = ref<string[]>([]);
  const defaultTag = ref<string>('');
  const defaultCategory = ref<string>('');

  return { tags, categories, defaultCategory, defaultTag };
});
