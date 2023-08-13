<template>
  <div class="main">
    <div class="left no-scroll">
      <div class="global-total">
        <span
          ><count-up
            :end-val="total"
            decimalPlaces="2"
            duration="1.5"
            prefix="￥"
            :options="{ separator: ',', prefix: '￥' }"
          >
          </count-up
        ></span>
      </div>
      <Transition name="el-fade-in">
        <h3 class="intro" v-show="data.length === 0">
          {{ tip }}
        </h3>
      </Transition>
      <TransitionGroup name="fade">
        <div class="year" v-for="year in data" :key="year.year">
          <div
            class="year-title"
            @click="
              () => {
                year.hidden = !year.hidden;
              }
            "
          >
            <div class="title-content">
              <h2>{{ year.year }}</h2>
              <span class="total">
                <count-up
                  :end-val="year.total"
                  decimalPlaces="2"
                  duration="1.5"
                  prefix="￥"
                  :options="{ separator: ',', prefix: '￥' }"
                >
                </count-up>
              </span>
            </div>
            <el-icon
              :style="{
                transform: year.hidden ? 'rotate(90deg)' : '',
                transition: '.3s',
              }"
              ><ArrowDownBold
            /></el-icon>
          </div>
          <el-collapse-transition>
            <div v-show="!year.hidden">
              <TransitionGroup name="fade">
                <div
                  class="month"
                  v-for="month in year.children"
                  :key="month.month"
                >
                  <div
                    class="month-title"
                    @click="
                      () => {
                        month.hidden = !month.hidden;
                      }
                    "
                  >
                    <div class="title-content">
                      <h4>{{ month.month }}月</h4>
                      <span class="total"
                        ><count-up
                          :end-val="month.total"
                          decimalPlaces="2"
                          duration="1.5"
                          prefix="￥"
                          :options="{ separator: ',', prefix: '￥' }"
                        >
                        </count-up
                      ></span>
                    </div>
                    <el-icon
                      :style="{
                        transform:
                          (month.hidden ? 'rotate(90deg)' : '') + ' scale(0.8)',
                        transition: '.3s',
                      }"
                      ><ArrowDownBold
                    /></el-icon>
                  </div>
                  <el-collapse-transition>
                    <div v-show="!month.hidden">
                      <TransitionGroup name="fade">
                        <div
                          class="day"
                          v-for="day in month.children"
                          :key="day.day"
                        >
                          <div class="day-title">
                            <span class="day-title-left">{{
                              month.month + '-' + day.day
                            }}</span>
                            <span class="day-title-right">
                              <count-up
                                :end-val="day.total"
                                decimalPlaces="2"
                                duration="1.5"
                                prefix="￥"
                                :options="{ separator: ',', prefix: '￥' }"
                              >
                              </count-up
                            ></span>
                          </div>
                          <ul>
                            <TransitionGroup name="fade">
                              <li
                                class="item-container"
                                v-for="item in day.children"
                                :key="item.id"
                              >
                                <el-popconfirm
                                  title="是否删除？"
                                  @confirm="deleteItem(item.id)"
                                >
                                  <template #reference>
                                    <div class="item">
                                      <div class="icon">
                                        <el-avatar
                                          class="avatar"
                                          shape="square"
                                          :style="{
                                            backgroundColor: getColorByWord(
                                              dark === 'light'
                                                ? vintageTheme.color
                                                : darkTheme.color,
                                              item.type[0]
                                            ),
                                          }"
                                        >
                                          {{ item.type }}
                                        </el-avatar>
                                      </div>
                                      <div class="content-container">
                                        <div class="content-desc">
                                          <span class="content">{{
                                            item.content
                                          }}</span>
                                          <span>
                                            <el-tag
                                              class="tag"
                                              type="info"
                                              effect="dark"
                                              size="small"
                                              v-show="item.name.trim() !== ''"
                                            >
                                              {{ item.name }}
                                            </el-tag>
                                          </span>
                                        </div>
                                        <div class="cost">
                                          ￥{{ item.cost.toFixed(2) }}
                                        </div>
                                      </div>
                                    </div>
                                  </template>
                                </el-popconfirm>
                              </li>
                            </TransitionGroup>
                          </ul>
                        </div>
                      </TransitionGroup>
                    </div>
                  </el-collapse-transition>
                </div>
              </TransitionGroup>
            </div>
          </el-collapse-transition>
        </div>
      </TransitionGroup>
    </div>
    <div class="right">
      <div class="calendar-container no-scroll" ref="calendarContainerRef">
        <div id="calendar-chart" ref="calendarChartRef"></div>
      </div>
      <div id="line-chart" ref="lineChartRef"></div>
      <div id="pie-chart">
        <div id="pie-chart-type" ref="pieChartLeftRef"></div>
        <div id="pie-chart-tag" ref="pieChartRightRef"></div>
      </div>
    </div>
  </div>
  <form-model :initData="initData" />
  <el-button
    type="warning"
    :icon="Plus"
    size="large"
    circle
    id="add-button"
    @click="handleClick"
    :color="dark === 'light' ? '#d87c7c' : '#dd6b66'"
  />
</template>

<script setup>
import { getList, deleteList } from '@/api/list.js';
import { computed, nextTick, reactive, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { useStore } from 'vuex';
import darkTheme from '@/themes/dark.json';
import vintageTheme from '@/themes/vintage.json';
import { getColorByWord } from '@/utils/tools.js';
import { Plus, ArrowDownBold } from '@element-plus/icons-vue';
import CountUp from 'vue-countup-v3';

const store = useStore();

echarts.registerTheme('dark2', darkTheme);
echarts.registerTheme('vintage', vintageTheme);

const data = reactive([]);
const lineChartRef = ref();
const pieChartLeftRef = ref();
const pieChartRightRef = ref();
const calendarChartRef = ref();
const calendarContainerRef = ref();
const lineEchartData = reactive({
  x: [],
  y: [],
});
const pieEchartLeftData = reactive([]);
const pieEchartRightData = reactive([]);
const dayCostData = reactive({});
const days = reactive([]);
const types = reactive(new Set());
const tags = reactive(new Set());
const echartsInstances = reactive([]);
const total = ref(0);
const tagTotal = ref(0);

const dark = computed(() => store.state.settings.theme);
watch(dark, (old, newValue) => {
  initEchart(old === 'light' ? 'vintage' : 'dark2');
});

const isLoggedIn = computed(() => store.state.user.isLogin);
watch(isLoggedIn, (newValue, oldValue) => {
  if (!newValue) {
    resetData();
    initEchart();
  } else {
    initData();
  }
});

const tip = ref(isLoggedIn.value ? '🐢数据拉取中...' : '请先登录');

const handleClick = () => {
  store.state.model.formModelFlag = true;
};
const resetData = () => {
  // console.log("resetData");
  data.splice(0);
  days.splice(0);
  lineEchartData.x.splice(0);
  lineEchartData.y.splice(0);
  pieEchartLeftData.splice(0);
  pieEchartRightData.splice(0);
  total.value = 0;
  tagTotal.value = 0;
  for (let key in dayCostData) {
    delete dayCostData[key];
  }
  tip.value = '🐢数据拉取中...';
};
const initData = () => {
  if (!isLoggedIn.value) {
    store.commit('showToast', {
      type: 'warning',
      message: '请先登录',
    });
    return;
  }
  getList()
    .then((res) => {
      tip.value = '点击右下角的加号添加记录吧😋';
      resetData();

      data.push(...res.data);
      // console.log(res.data);

      res.data.forEach((year) => {
        total.value += year.total;
        year.children.forEach((month) => {
          month.children.forEach((day) => {
            const date = echarts.time.parse(
              year.year + '-' + month.month + '-' + day.day
            );
            days.push(date);
            dayCostData[echarts.time.format(date, '{yyyy}-{MM}-{dd}', false)] =
              day.total;
            day.children.forEach((item) => {
              types.add(item.type);
              tags.add(item.name);
              tagTotal.value += item.cost;

              const current = pieEchartLeftData.find(
                (e) => e.name === item.type
              );
              if (!current) {
                pieEchartLeftData.push({
                  name: item.type,
                  value: item.cost,
                });
              } else {
                current.value += item.cost;
              }

              const current2 = pieEchartRightData.find(
                (e) =>
                  e.name === (item.name.trim() !== '' ? item.name : '无标签')
              );
              if (!current2) {
                pieEchartRightData.push({
                  name: item.name.trim() !== '' ? item.name : '无标签',
                  value: item.cost,
                });
              } else {
                current2.value += item.cost;
              }
            });
          });
        });
      });
      formatLineEchartData();
      // globalTotal.update(total.value);
      store.commit('updateData', {
        key: 'types',
        value: [...types],
      });

      store.commit('updateData', {
        key: 'tags',
        value: [...tags],
      });
    })
    .catch(() => {
      tip.value = '😭拉取失败...';
    })
    .finally(() => {
      nextTick(initEchart);
    });
};

const deleteItem = (id) => {
  deleteList(id).then((res) => {
    if (res.code === 20000) {
      store.commit('showToast', {
        type: 'success',
        message: '删除成功',
      });
      initData();
    } else {
      store.commit('showToast', {
        type: 'error',
        message: res.msg,
      });
    }
  });
};

const formatCalendarEchartData = () => {
  const leatestYear = data[0]?.year ?? new Date().getFullYear();
  const date = +echarts.time.parse(leatestYear + '-01-01');
  const end = +echarts.time.parse(+leatestYear + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const tempData = [];
  for (let time = date; time < end; time += dayTime) {
    const timeString = echarts.time.format(time, '{yyyy}-{MM}-{dd}', false);
    const cost = dayCostData[timeString] ?? 0;
    tempData.push([timeString, cost]);
  }
  return tempData;
};

const formatLineEchartData = () => {
  const dayTime = 3600 * 24 * 1000;
  let firstDay = +days[days.length - 1] ?? new Date() - dayTime * 10;
  const end = +new Date();

  while (firstDay < end) {
    const timeString = echarts.time.format(firstDay, '{yyyy}-{MM}-{dd}', false);
    lineEchartData.x.push(timeString);
    lineEchartData.y.push(dayCostData[timeString] ?? 0);
    firstDay = firstDay + dayTime;
  }
};

initData();

const initEchart = (theme) => {
  if (!theme) theme = dark.value === 'light' ? 'vintage' : 'dark2';
  // 销毁
  echartsInstances.forEach((e) => e.dispose());

  // 初始化
  const lineEchart = echarts.init(lineChartRef.value, theme);
  lineEchart.setOption({
    backgroundColor: 'transparent',
    title: {
      text: '近期花销统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (val) => '￥' + (Math.round(val * 100) / 100 ?? ''),
    },
    dataZoom: [
      {
        startValue: lineEchartData.x[lineEchartData.x.length - 7],
      },
      {
        type: 'inside',
      },
    ],
    xAxis: {
      type: 'category',
      data: lineEchartData.x,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: lineEchartData.y,
        type: 'line',
        smooth: true,
        symbolSize: 10,
        symbol: 'rect',
        label: {
          show: true,
          formatter: (params) =>
            '￥' + (Math.round(params.value * 100) / 100 ?? ''),
          // fontStyle: "oblique",
          // borderColor: "#fff",
          // borderWidth: "0px",
          // borderType: "dashed",
          // shadowColor: "transparent",
          // shadowBlur: "0px",
          textBorderColor: 'transparent',
        },
        areaStyle: {
          color: dark.value === 'light' ? '#d87c7c' : '#dd6b66',
        },
      },
    ],
    darkMode: true,
  });

  const calendarEchart = echarts.init(
    calendarChartRef.value,
    theme === 'vintage' ? 'vintage' : 'dark'
  );
  calendarEchart.setOption({
    tooltip: {
      formatter: (params) =>
        params.value[0] + '  ￥' + Math.round(params.value[1] * 100) / 100,
    },
    backgroundColor: 'transparent',
    gradientColor: ['#6d6868', '#dd6b66'],
    visualMap: {
      min: 1,
      max: Math.max(Math.min(data[0] ? data[0].max : 20, 500), 5),
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
      },
    ],
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: formatCalendarEchartData(),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });

  const pieEchartLeft = echarts.init(pieChartLeftRef.value, theme);
  pieEchartLeft.setOption({
    backgroundColor: 'transparent',
    title: {
      text: '分类统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      valueFormatter: (val) =>
        Math.round(val * 100) / 100 +
        ' | ' +
        Math.round((val / total.value) * 100 * 100) / 100 +
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
        data: pieEchartLeftData,
      },
    ],
    darkMode: true,
  });

  const pieEchartRight = echarts.init(pieChartRightRef.value, theme);
  pieEchartRight.setOption({
    backgroundColor: 'transparent',
    title: {
      text: '标签统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      valueFormatter: (val) =>
        Math.round(val * 100) / 100 +
        ' | ' +
        Math.round((val / tagTotal.value) * 100 * 100) / 100 +
        '%',
    },
    legend: {
      top: '5%',
      left: 'right',
      orient: 'vertical',
    },
    series: [
      {
        name: '标签统计',
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
        data: pieEchartRightData,
      },
    ],
    darkMode: true,
  });

  echartsInstances.splice(0);
  echartsInstances.push(
    lineEchart,
    calendarEchart,
    pieEchartLeft,
    pieEchartRight
  );

  calendarContainerRef.value.scrollLeft =
    ((new Date().getMonth() + 1) / 12) *
    (calendarContainerRef.value.scrollWidth -
      calendarContainerRef.value.offsetWidth);
};

const adjustEcharts = () => {
  let time = new Date();
  return () => {
    if (new Date() - time > 1000) {
      echartsInstances.forEach((e) => e.resize());
      time = new Date();
    }
  };
};
window.addEventListener('resize', adjustEcharts());
window.addEventListener('keydown', (e) => {
  // 适配一下mac
  if (e.altKey && (e.key === 'q' || e.key === 'œ')) {
    handleClick();
  }
});
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  display: flex;
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
  max-height: 90vh;
  position: sticky;
  top: 5px;
  overflow-x: hidden;
  .intro {
    text-align: center;
  }
  .global-total {
    display: flex;
    justify-content: flex-end;
    font-size: 0.5em;
    opacity: 0.8;
  }
  .year {
    position: relative;
    .year-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      h2 {
        transition: 0.3s;
      }
      &:hover {
        h2 {
          color: var(--color-primary);
        }
      }
    }
  }
  .title-content {
    display: flex;
    gap: 10px;
    align-items: baseline;

    .total {
      font-size: 0.5em;
      opacity: 0.8;
    }
  }
  .month {
    position: relative;
    .month-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 20px 0;
      h4 {
        margin: 0;
        transition: 0.3s;
        border-left: 3px solid var(--color-primary);
        padding-left: 10px;
      }
      &:hover {
        h4 {
          border-left: 3px solid var(--color-primary);
          color: var(--color-primary);
        }
      }
    }
  }
  .day {
    position: relative;

    .day-title {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      opacity: 0.6;
      padding: 0 5px;
      margin-bottom: -10px;
    }
    ul {
      .item-container {
        width: 100%;
      }
    }
    .item {
      position: relative;

      display: flex;
      align-items: center;
      border-radius: 5px;
      gap: 10px;
      cursor: pointer;
      transition: 0.3s;
      padding: 10px;
      background: var(--color-secondary-background);
      margin: 10px 0;
      &:hover {
        background: var(--color-secondary-background-hover);
      }
      .icon {
        .avatar {
          // color: var(--color-background);
          // background: red;
        }
      }
      .content-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .content-desc {
          display: flex;
          flex-direction: column;
          gap: 5px;
          .content {
            font-weight: bold;
          }
          .tag {
            color: var(--font-color);
            opacity: 0.8;
          }
        }
        .cost {
          font-weight: bold;
        }
      }
    }
    ul {
      margin: 0;
      position: relative;
    }
  }
}

.right {
  flex: 4;
  display: flex;
  flex-direction: column;
  gap: 50px;
  box-sizing: border-box;
  transition: 0.3s;

  #line-chart {
    width: 100%;
    height: 300px;
  }
  .calendar-container {
    width: 100%;
    height: 220px;
    overflow-x: auto;
  }
  #calendar-chart {
    margin-left: 15px;
    width: 90%;
    height: 100%;
  }
  #pie-chart {
    height: 400px;
    display: flex;
    justify-content: space-around;
    // border: 1px solid pink;
    align-items: center;
    width: 90%;

    #pie-chart-type {
      flex: 1;
      height: 100%;
      // border: 1px solid blue;
    }
    #pie-chart-tag {
      flex: 1;
      height: 100%;

      // width: 100%;
      // aspect-ratio: 1;
    }
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
    #calendar-chart {
      width: 1000px;
    }
    #pie-chart {
      flex-direction: column;
      #pie-chart-type {
        width: 100%;
        aspect-ratio: 1;
      }
      #pie-chart-tag {
        width: 100%;
        aspect-ratio: 1;
      }
    }
  }
}

// .list-animation-move, /* 对移动中的元素应用的过渡 */
//   .list-animation-enter-active,
//   .list-animation-leave-active {
//   transition: all 0.5s ease;
// }

// .list-animation-enter-from,
// .list-animation-leave-to {
//   opacity: 0;
//   transform: translateY(-10px) translateX(-10px);
// }

// /* 确保将离开的元素从布局流中删除
//     以便能够正确地计算移动的动画。 */
// .list-animation-leave-active {
//   position: absolute;
//   width: 100%;
// }

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
