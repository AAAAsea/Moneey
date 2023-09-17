<template>
  <div class="main">
    <div class="left no-scroll">
      <billing-list
        :recordList="recordList"
        :total="total"
        @deleted="initData"
      />
    </div>
    <div class="right">
      <div class="calendar-container no-scroll">
        <CalendarChart
          class="calendar-chart"
          :theme="echartTheme"
          :data="calendarChartData"
        ></CalendarChart>
      </div>
      <LineChart
        class="line-chart"
        :data="lineChartData"
        :theme="echartTheme"
      ></LineChart>
      <div class="pie-chart">
        <PieChartByCategory
          :data="pieChartByCategoryData"
          :theme="echartTheme"
          :total="total"
        ></PieChartByCategory>
        <PieChartByTag
          :data="pieChartByTagData"
          :theme="echartTheme"
          :total="total"
        ></PieChartByTag>
        <div id="pie-chart-tag" ref="pieChartRightRef"></div>
      </div>
    </div>
    <form-modal
      :initData="initData"
      :visible.sync="modalVisible"
      @close="onModalClose"
      @submited="initData"
    />
    <el-button
      type="warning"
      :icon="Plus"
      size="large"
      circle
      id="add-button"
      @click="showModal"
      :color="settingsStore.theme === 'light' ? '#d87c7c' : '#dd6b66'"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  getList,
  getListPerCategory,
  getListPerDay,
  getListPerYear,
  getListPerTag,
} from '@/api/list.js';
import { computed, ref } from 'vue';
import { ILineChartData, IPieChartDataItem, IYearData } from '@/types/data.ts';
import { Plus } from '@element-plus/icons-vue';
import { useSettingsStore } from '@/store/settings';
import CalendarChart from '@/components/CalendarChart.vue';
import FormModal from '@/components/FormModal.vue';
import LineChart from '@/components/LineChart.vue';
import PieChartByCategory from '@/components/PieChartByCategory.vue';
import PieChartByTag from '@/components/PieChartByTag.vue';
import { formatDate } from '@/utils/tools';

const settingsStore = useSettingsStore();

const total = ref(0);
const recordList = ref<IYearData[]>([]);

const initData = async () => {
  const res = await getList();
  total.value = res.total;
  recordList.value = res.data;
  initChartsData();
};
initData();

const modalVisible = ref(false);
const showModal = () => {
  modalVisible.value = true;
};
const onModalClose = () => {
  modalVisible.value = false;
};

const echartTheme = computed(() =>
  settingsStore.theme === 'light' ? 'vintage' : 'dark2'
);

const calendarChartData = ref<[string, number][]>();
const lineChartData = ref<ILineChartData>();
const pieChartByCategoryData = ref<IPieChartDataItem[]>();
const pieChartByTagData = ref<IPieChartDataItem[]>();

const initChartsData = async () => {
  calendarChartData.value = (
    await getListPerYear(new Date().getFullYear())
  ).map((item) => [formatDate(item[0]), item[1]]);

  lineChartData.value = (await getListPerDay()).reduce(
    (prev, cur) => {
      prev.x.push(formatDate(cur.date));
      prev.y.push(cur.cost);
      return prev;
    },
    { x: [] as string[], y: [] as number[] }
  );

  pieChartByCategoryData.value = await getListPerCategory();

  pieChartByTagData.value = await getListPerTag();
};
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  display: flex;
  padding-bottom: 30px;
}

.left {
  border-radius: 10px;
  flex-basis: 300px;
  min-width: 200px;
  flex: 1;
  background: var(--color-card);
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  height: calc(100vh - 50px);
  position: sticky;
  top: 5px;
  overflow-x: hidden;
}

.right {
  flex: 4;
  display: flex;
  flex-direction: column;
  gap: 50px;
  box-sizing: border-box;
  transition: 0.3s;
  overflow-x: auto;

  .line-chart {
    width: 100%;
    height: 300px;
  }
  .calendar-container {
    height: 220px;
    padding-right: 50px;
    overflow-x: auto;

    .calendar-chart {
      margin-left: 15px;
      height: 100%;
    }
  }

  .pie-chart {
    height: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
  }
}
ul {
  list-style: none;
  padding: 0;
}
#add-button {
  position: fixed;
  right: 20px;
  bottom: 40px;
  transform: scale(1.2);
}

@media screen and (max-width: 600px) {
  .main {
    flex-direction: column;
  }
  .left {
    position: static;
    max-height: 50vh;
  }
  .right {
    .calendar-container {
      .calendar-chart {
        width: 1000px;
      }
    }
    .pie-chart {
      flex-direction: column;
      .pie-chart-type {
        width: 100%;
        aspect-ratio: 1;
      }
      .pie-chart-tag {
        width: 100%;
        aspect-ratio: 1;
      }
    }
  }
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
        以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
