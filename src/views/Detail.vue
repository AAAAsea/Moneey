<template>
  <div
    class="main"
    v-loading="!inited"
    element-loading-background="var(--color-background)"
  >
    <div class="left no-scroll">
      <billing-list
        :title="organizationName || '个人账户'"
        :recordList="recordList"
        :total="total"
        :inited="inited"
        @deleted="initData"
      />
    </div>
    <div class="right">
      <div class="calendar-container no-scroll" ref="calendarChartRef">
        <CalendarChart
          class="calendar-chart"
          :theme="echartTheme"
          :data="calendarChartData || []"
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
      </div>
      <BalanceCost
        class="balance-cost"
        v-if="organizationName"
        :transitionList="transitionList"
      ></BalanceCost>
    </div>
    <form-modal
      :initData="initData"
      :visible.sync="modalVisible"
      @close="onModalClose"
      @submited="initData"
    />
    <el-button
      class="add-button animate__animated animate__zoomIn"
      v-show="inited"
      type="warning"
      :icon="Plus"
      size="large"
      circle
      @click="showModal"
      :color="settingsStore.theme === 'light' ? '#d87c7c' : '#dd6b66'"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  getList,
  getListPerCategory,
  getListPerDay,
  getListPerYear,
  getListPerTag,
  getListPerUser,
} from '@/api/list.js';
import CalendarChart from '@/components/CalendarChart.vue';
import FormModal from '@/components/FormModal.vue';
import LineChart from '@/components/LineChart.vue';
import PieChartByCategory from '@/components/PieChartByCategory.vue';
import PieChartByTag from '@/components/PieChartByTag.vue';
import BalanceCost from '@/components/BalanceCost.vue';
import { formatDate, balancePayment } from '@/utils/tools';
import {
  ILineChartData,
  IPieChartDataItem,
  IYearData,
  IUserRecordData,
  Transaction,
} from '@/types/data.ts';
import { Plus } from '@element-plus/icons-vue';
import { useSettingsStore } from '@/store/settings';

const settingsStore = useSettingsStore();

const calendarChartRef = ref<HTMLElement>();
onMounted(() => {
  const el = calendarChartRef.value;
  if (el)
    el.scrollLeft =
      (new Date().getMonth() / 12) * (el.scrollWidth - el.clientWidth); // scrollWidth = scrollLeft + clientWidth
  document.documentElement.scrollTop = 0;
});

const total = ref(0);
const recordList = ref<IYearData[]>([]);
const inited = ref(false);

const organizationName = useRoute().params.organizationName;
const initData = async () => {
  getList(organizationName as string).then((res) => {
    total.value = res.total;
    recordList.value = res.data;
    inited.value = true;
  });

  initBalanceData();
  initChartsData();
};

const modalVisible = ref(false);
const showModal = () => {
  modalVisible.value = true;
};
const onModalClose = () => {
  modalVisible.value = false;
};

const echartTheme = computed(() =>
  settingsStore.theme === 'light' ? 'vintage' : 'dark'
);

const calendarChartData = ref<[string, number][]>();
const lineChartData = ref<ILineChartData>();
const pieChartByCategoryData = ref<IPieChartDataItem[]>();
const pieChartByTagData = ref<IPieChartDataItem[]>();
const initChartsData = () => {
  getListPerYear(new Date().getFullYear(), organizationName as string).then(
    (data) => {
      const year = new Date().getFullYear();
      const date = new Date(year + '-01-01').getTime();
      const end = new Date(year + 1 + '-01-01').getTime();
      const dayTime = 3600 * 24 * 1000;

      const newData: [string, number][] = [];

      for (let time = date; time < end; time += dayTime) {
        const item = data.find((item) => new Date(item[0]).getTime() === time);
        newData.push([formatDate(time), item ? item[1] : 0]);
      }

      calendarChartData.value = newData;
    }
  );

  getListPerDay(organizationName as string).then((data) => {
    if (!data.length) return;

    const startTime = new Date(data[0].date).getTime();
    const endTime = new Date(data[data.length - 1].date).getTime();
    const newData: ILineChartData = { x: [], y: [] };

    for (let i = startTime; i <= endTime; i += 24 * 60 * 60 * 1000) {
      const date = new Date(i);
      const item = data.find((item) => item.date === date.toISOString());
      newData.x.push(formatDate(date));
      newData.y.push(item ? item.cost : 0);
    }

    lineChartData.value = newData;
  });

  getListPerCategory(organizationName as string).then((data) => {
    pieChartByCategoryData.value = data;
  });

  getListPerTag(organizationName as string).then((data) => {
    pieChartByTagData.value = data;
  });
};

const transitionList = ref<Transaction[]>();
const userCostList = ref<IUserRecordData>();
const initBalanceData = async () => {
  userCostList.value = await getListPerUser(organizationName as string);
  transitionList.value = balancePayment(userCostList.value);
};

initData();
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
  min-width: 300px;
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
  flex: 1;
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
    width: 95%;
    padding: 0 1%;
    box-sizing: border-box;
    scroll-behavior: smooth;

    .calendar-chart {
      margin-left: 15px;
      height: 100%;
    }
  }

  .balance-cost {
    width: 95%;
    margin: auto;
    height: fit-content;
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
.add-button {
  position: fixed;
  right: 20px;
  bottom: 40px;
  transform: scale(1.2);
  animation-duration: 0.3s;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
      overflow-x: auto;
      .calendar-chart {
        width: 1000px;
      }
    }
    .pie-chart {
      flex-direction: column;
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
