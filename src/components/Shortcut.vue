<template>
  <div class="shortcut-wrapper" v-show="shortcutList.length > 0">
    <div class="btn-wrapper">
      <div class="shortcut-btn" v-for="(item, index) in shortcutList">
        <el-button type="text" @click="onShortcutClick(item)">
          {{ item.name }}
        </el-button>

        <el-icon
          class="delete-icon animate__animated animate__zoomIn"
          v-show="editable"
          @click="deleteItem(index)"
          color="var(--color-primary)"
          ><CloseBold
        /></el-icon>
      </div>
    </div>
    <el-button @click="edit" type="text">
      {{ editable ? '完成' : '编辑' }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useShortcutStore } from '@/store/shortcut';
import { IShortcutItem } from '@/types/shortcut';
import { CloseBold } from '@element-plus/icons-vue';

const emit = defineEmits(['select']);

const shortcutStore = useShortcutStore();
const shortcutList = computed(() => shortcutStore.shortcutList);

const onShortcutClick = (item: IShortcutItem) => {
  emit('select', item);
};

const editable = ref(false);
const edit = () => {
  editable.value = !editable.value;
};

const deleteItem = (index: number) => {
  shortcutStore.delete(index);
};
</script>

<style lang="scss" scoped>
.shortcut-wrapper {
  display: flex;
  justify-content: space-between;
  .btn-wrapper {
    flex: 1;
    display: flex;
    column-gap: 10px;
    margin: 0 10px;
    flex-wrap: wrap;
    align-items: center;
    .shortcut-btn {
      display: flex;
      align-items: center;

      .delete-icon {
        animation-duration: 0.3s;
        margin-left: 5px;
      }
    }
  }
}
</style>
