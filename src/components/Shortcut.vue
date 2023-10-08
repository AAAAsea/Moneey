<template>
  <el-button
    type="text"
    v-for="item in shortcutList"
    @click="onShortcutClick(item)"
  >
    {{ item.content }}
  </el-button>
  <el-button type="text" @click="clear"> 清空记录 </el-button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useShortcutStore } from '@/store/shortcut';
import { IShortcutItem } from '@/types/shortcut';

const emit = defineEmits(['select']);

const shortcutStore = useShortcutStore();
const shortcutList = computed(() => shortcutStore.shortcutList);

const onShortcutClick = (item: IShortcutItem) => {
  emit('select', item);
};
const clear = () => {
  shortcutStore.clear();
};
</script>

<style scoped></style>
