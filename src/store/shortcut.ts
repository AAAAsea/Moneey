import { defineStore } from 'pinia';
import { IShortcutState, IShortcutItem } from '@/types/shortcut';

export const useShortcutStore = defineStore('shortcut', {
  state: (): IShortcutState => ({
    shortcutList: [] as IShortcutItem[],
  }),
  actions: {
    addShortcut(shortcut: IShortcutItem) {
      this.shortcutList.push(shortcut);
    },
    clear() {
      this.shortcutList.splice(0);
    },
    delete(index: number) {
      this.shortcutList.splice(index, 1);
    },
  },
  persist: true,
});
