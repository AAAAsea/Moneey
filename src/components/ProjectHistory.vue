<template>
  <el-dialog
    v-model="store.state.model.historyModelFlag"
    title="更新记录"
    :width="store.state.model.modelWidth"
  >
    <div
      id="tree"
      style="height: 60vh; overflow: auto"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-dialog>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const activities = [
  {
    content: "添加时，标签和类型默认为上一次的内容，时间默认是今天",
    timestamp: "2023-8-16",
    size: "large",
    type: "primary",
  },
  {
    content: "增加总金额，添加滚动数字动画，增加快捷键Alt+Q，以及回车监听",
    timestamp: "2023-1-8",
    size: "large",
    type: "primary",
  },
  {
    content: "修复日期排序问题、优化动画",
    timestamp: "2023-1-3",
    size: "large",
    type: "primary",
  },
  {
    content: "完善主题，第一版正式上线",
    timestamp: "2022-12-29",
    size: "large",
    type: "primary",
  },
  {
    content: "写了一堆",
    timestamp: "2022-12-29",
    size: "large",
    type: "primary",
  },
  {
    content: "初始化",
    timestamp: "2022-12-26",
    size: "large",
    type: "primary",
  },
];
</script>

<style scoped>
/*滚动条样式*/
#tree::-webkit-scrollbar {
  width: 6px;
  /*height: 4px;*/
}
#tree::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(145, 145, 145, 0.2); */
  background: rgba(147, 147, 147, 0.2);
}
#tree::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 5px rgba(149, 149, 149, 0.2); */
  border-radius: 0;
  background: rgba(174, 174, 174, 0.1);
}
</style>