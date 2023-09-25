<template>
  <div class="org-container">昵称：{{ userStore.nickname }}</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.org-container {
  font-size: 14px;
}
</style>
