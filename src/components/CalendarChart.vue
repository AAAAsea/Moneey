<template>
  <div class="calendar-chart" ref="echartRef"></div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch, onUnmounted, shallowRef } from 'vue';
import echarts from '@/common/initEcharts';

const props = defineProps<{
  data: [string, number][];
  theme: string;
}>();

const echartRef = ref();
const calendarContainerRef = ref();
const echartInstance = shallowRef();

const initEchart = () => {
  // 销毁
  if (echartInstance.value) {
    echartInstance.value.dispose();
  }
  // 初始化
  echartInstance.value = echarts.init(echartRef.value, props.theme);
  echartInstance.value.setOption({
    darkMode: 'auto',
    tooltip: {
      formatter: (params: any) =>
        params.value[0] + '  ￥' + Math.round(params.value[1] * 100) / 100,
    },
    backgroundColor: 'transparent',
    gradientColor: ['#6d6868', '#dd6b66'],
    visualMap: {
      min: 1,
      max: props.data.reduce((pre, cur) => Math.max(pre, cur[1]), 5),
      show: false,
      type: 'piecewise',
      minOpen: true,
      maxOpen: true,
      splitNumber: 3,
    },
    calendar: [
      {
        range: new Date().getFullYear(),
        cellSize: ['auto', 20],
        yearLabel: {
          color: props.theme === 'dark' ? '#ccc' : '#000',
        },
        monthLabel: {
          color: props.theme === 'dark' ? '#ccc' : '#000',
        },
        dayLabel: {
          color: props.theme === 'dark' ? '#ccc' : '#000',
        },
      },
    ],
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
  if (calendarContainerRef.value) {
    calendarContainerRef.value.scrollLeft =
      ((new Date().getMonth() + 1) / 12) *
      (calendarContainerRef.value.scrollWidth -
        calendarContainerRef.value.offsetWidth);
  }
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
.echart-container {
  overflow: auto;
  height: 100%;
  padding-right: 100px;
  padding-left: 10px;
  box-sizing: border-box;

  .calendar-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
