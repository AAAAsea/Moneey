<template>
  <div class="billing-list">
    <div class="global-total">
      <h1>{{ title }}</h1>
      <span>
        <count-up
          :end-val="total"
          decimalPlaces="2"
          duration="1.5"
          prefix="￥"
          :options="{ separator: ',', prefix: '￥' }"
        >
        </count-up>
      </span>
    </div>
    <el-empty v-show="recordList.length === 0 && inited"></el-empty>
    <TransitionGroup name="fade">
      <div class="year" v-for="year in recordList" :key="year.yearName">
        <div
          class="year-title"
          @click="
            () => {
              year.hidden = !year.hidden;
            }
          "
        >
          <div class="title-content">
            <h2>{{ year.yearName }}</h2>
            <span class="total">
              <count-up
                :end-val="year.yearTotal"
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
          >
            <ArrowDownBold />
          </el-icon>
        </div>
        <el-collapse-transition>
          <div v-show="!year.hidden">
            <TransitionGroup name="fade">
              <div
                class="month"
                v-for="month in year.yearData"
                :key="month.monthName"
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
                    <h4>{{ month.monthName }}月</h4>
                    <span class="total"
                      ><count-up
                        :end-val="month.monthTotal"
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
                  >
                    <ArrowDownBold />
                  </el-icon>
                </div>
                <el-collapse-transition>
                  <div v-show="!month.hidden">
                    <TransitionGroup name="fade">
                      <div
                        class="day"
                        v-for="day in month.monthData"
                        :key="day.dayName"
                      >
                        <div class="day-title">
                          <span class="day-title-left">{{
                            month.monthName + '-' + day.dayName
                          }}</span>
                          <span class="day-title-right">
                            <count-up
                              :end-val="day.dayTotal"
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
                              v-for="item in day.dayData"
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
                                            settingsStore.theme === 'light'
                                              ? vintageTheme.color
                                              : darkTheme.color,
                                            item.categoryName
                                          ),
                                        }"
                                      >
                                        {{ item.categoryName }}
                                      </el-avatar>
                                    </div>
                                    <div class="content-container">
                                      <div class="content-desc">
                                        <span class="content">{{
                                          item.content
                                        }}</span>

                                        <div class="tags-container">
                                          <el-tag
                                            class="tag"
                                            effect="dark"
                                            size="small"
                                            v-for="(tag, index) in item.tags"
                                            :key="index"
                                            v-show="item.tags.length > 0"
                                          >
                                            {{ tag }}
                                          </el-tag>
                                        </div>
                                      </div>
                                      <div class="cost-container">
                                        <span
                                          class="nickname"
                                          v-show="
                                            item.nickname && organizationName
                                          "
                                        >
                                          <el-icon><UserFilled /></el-icon>
                                          {{ item.nickname }}
                                        </span>
                                        <span class="cost"
                                          >￥{{ item.cost }}</span
                                        >
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
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { IYearData } from '@/types/data';
import { ArrowDownBold, UserFilled } from '@element-plus/icons-vue';
import { getColorByWord } from '@/utils/tools';
import { useSettingsStore } from '@/store/settings';
import darkTheme from '@/themes/dark.json';
import vintageTheme from '@/themes/vintage.json';
import CountUp from 'vue-countup-v3';
import { deleteRecord } from '@/api/list';

defineProps<{
  recordList: IYearData[];
  total: number;
  title: string;
  inited: boolean;
}>();

const emit = defineEmits(['deleted']);

const settingsStore = useSettingsStore();

const deleteItem = (id: number) => {
  deleteRecord(id).then(() => {
    emit('deleted');
  });
};

const organizationName = useRoute().params.organizationName;
</script>

<style lang="scss" scoped>
.billing-list {
  .intro {
    text-align: center;
    position: absolute;
  }
  .global-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
      list-style: none;
      padding: 0;
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
          .tags-container {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }
        }
        .cost-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .nickname {
            font-size: 10px;
            opacity: 0.8;
          }
          .cost {
            font-weight: bold;
          }
        }
      }
    }
    ul {
      margin: 0;
      position: relative;
    }
  }
}
</style>
