<template>
  <div class="pie-chart" ref="echartRef"></div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch, onUnmounted } from 'vue';
import echarts from '@/common/initEcharts';
import { IPieChartData } from '@/types/data';

const props = defineProps<{
  data?: IPieChartData;
  theme: string;
  total: number;
}>();

const echartRef = ref();
const echartInstance = ref();

const initEchart = () => {
  if (!props.data) return;
  // 销毁
  if (echartInstance.value) {
    echartInstance.value.dispose();
  }
  // 初始化
  echartInstance.value = echarts.init(echartRef.value, props.theme);
  echartInstance.value.setOption({
    backgroundColor: 'transparent',
    title: {
      text: '分类统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      valueFormatter: (val: number) =>
        Math.round(val * 100) / 100 +
        ' | ' +
        Math.round((val / props.total) * 100 * 100) / 100 +
        '%',
    },

    legend: {
      top: '5%',
      left: 'right',
      orient: 'vertical',
    },
    series: [
      {
        name: '分类统计',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: props.data,
      },
    ],
    darkMode: true,
  });
};

watch(props, () => {
  nextTick(initEchart); // 初始化需要等到dom挂载完成
});

const resize = () => {
  echartInstance.value && echartInstance.value.resize();
};
window.addEventListener('resize', resize);

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>
<style lang="scss" scoped>
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>
