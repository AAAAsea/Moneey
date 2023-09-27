<template>
  <h2>Profile</h2>
  <div class="info-item" v-for="(item, index) in userInfoToShow" :key="index">
    <span class="label">{{ item.label }}：</span>
    <span class="value">{{ item.value }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
const user = useUserStore();
const userInfoToShow = [
  {
    label: '昵称',
    value: user.nickname,
  },
  {
    label: '用户名',
    value: user.username,
  },
  {
    label: '总金额',
    value: '￥' + user.cost,
  },
  {
    label: '组织数',
    value: user.organizations.length,

  }
]
</script>

<style lang="scss" scoped>
.info-item {
  font-size: 14px;
  .label{
    width: 80px;
    display: inline-block;
  }
}
</style>
