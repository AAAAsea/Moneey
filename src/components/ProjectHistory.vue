<template>
  <el-card>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :type="activity.type"
        :size="activity.size"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script lang="ts" setup>

const activities = [
  {
    content: '史诗级重构上线，支持个人账户和多组织账户',
    timestamp: '2023-9-27',
    size: 'large',
    type: 'primary',
  },
  {
    content: '添加时，标签和类型默认为上一次的内容，时间默认是今天',
    timestamp: '2023-8-16',
    size: 'large',
    type: 'primary',
  },
  {
    content: '增加总金额，添加滚动数字动画，增加快捷键Alt+Q，以及回车监听',
    timestamp: '2023-1-8',
    size: 'large',
    type: 'primary',
  },
  {
    content: '修复日期排序问题、优化动画',
    timestamp: '2023-1-3',
    size: 'large',
    type: 'primary',
  },
  {
    content: '完善主题，第一版正式上线',
    timestamp: '2022-12-29',
    size: 'large',
    type: 'primary',
  },
  {
    content: '写了一堆',
    timestamp: '2022-12-29',
    size: 'large',
    type: 'primary',
  },
  {
    content: '初始化',
    timestamp: '2022-12-26',
    size: 'large',
    type: 'primary',
  },
];
</script>

<style scoped>

</style>