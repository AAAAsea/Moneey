<template>
  <el-card
    shadow="hover"
    class="account-card animate__animated animate__zoomIn"
  >
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tag :type="getTagTypeByRole(role)">{{
        getRoleLabelByBalue(role)
      }}</el-tag>
    </div>
    <div class="cost">￥ {{ cost }}</div>
    <div class="date" v-if="updateTime || createTime">
      {{
        friendlyTimeDisplay(updateTime ? updateTime : createTime as string)
      }} {{ updateTime ? '更新' : '创建' }}
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ROLE } from '@/constants/org';
import {
  friendlyTimeDisplay,
  getRoleLabelByBalue,
  getTagTypeByRole,
} from '@/utils/tools';

defineProps<{
  title: String;
  cost: Number;
  role: ROLE;
  createTime?: string;
  updateTime?: string;
}>();
</script>

<style lang="scss" scoped>
.account-card {
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 300px;

  .header {
    display: flex;
    gap: 10px;
    align-items: center;

    .title {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .cost {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 20px;
  }

  .date {
    text-align: right;
    opacity: 0.8;
    font-size: 14px;
  }
}
</style>
