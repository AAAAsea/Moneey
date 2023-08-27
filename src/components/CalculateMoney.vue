<template>
  <el-dialog
    v-model="store.state.model.calculateMoneyModelFlag
"
    title="账单计算"
    :width="store.state.model.modelWidth"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.state.model.calculateMoneyModelFlag
 = false">Cancel</el-button>
        <el-button type="primary" @click="store.state.model.calculateMoneyModelFlag
 = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

</script>

<style scoped lang="less"></style>
