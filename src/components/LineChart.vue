<template>
  <div class="line-chart" ref="echartRef"></div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch, onUnmounted, shallowRef } from 'vue';
import echarts from '@/common/initEcharts';
import { ILineChartData } from '@/types/data';

const props = defineProps<{
  data?: ILineChartData;
  theme: string;
}>();

const echartRef = ref();
const echartInstance = shallowRef(); // 解决dataZoom无法拖拽的问题

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
      text: '近期花销统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (val: number) =>
        '￥' + (Math.round(val * 100) / 100 ?? ''),
    },
    dataZoom: [
      {
        startValue: props.data.x[props.data.x.length - 7],
      },
      {
        type: 'inside',
      },
    ],
    xAxis: {
      type: 'category',
      data: props.data.x,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: props.data.y,
        type: 'line',
        smooth: true,
        symbolSize: 10,
        symbol: 'rect',
        label: {
          show: true,
          formatter: (params: any) =>
            '￥' + (Math.round(params.value * 100) / 100 ?? ''),
          textBorderColor: 'transparent',
        },
        areaStyle: {
          color: props.theme !== 'dark2' ? '#d87c7c' : '#dd6b66',
        },
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
.line-chart {
  width: 100%;
  height: 100%;
}
</style>
