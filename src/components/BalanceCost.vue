<template>
  <el-card
    v-if="transitionList && transitionList?.length > 0 && organizationName"
  >
    <h2>算钱啦</h2>
    <div v-for="item in transitionList">
      <span class="user">@{{ item.from }}</span> 应转给
      <span class="user">@{{ item.to }}</span> {{ item.cost.toFixed(2) }} 元
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Transaction } from '@/types/data';
import { useRoute } from 'vue-router';

defineProps<{
  transitionList?: Transaction[];
}>();
const route = useRoute();
const organizationName = route.params.organizationName;
</script>

<style scoped>
.user {
  color: var(--color-primary);
}
</style>
