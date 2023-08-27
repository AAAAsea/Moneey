<template>
  <div class="topnav">
    <div class="left">
      <!-- 账户 -->
      <span
        class="header baseline"
        @click="openLoginModel"
        v-if="!store.state.user.isLogin"
      >
        登录
      </span>
      <el-popconfirm
        title="退出登录？"
        @confirm="emit('logout')"
        v-else
      >
        <template #reference>
          <span class="header baseline">
            {{ store.state.user.nickName }}
          </span>
        </template>
      </el-popconfirm>
    </div>
    <div class="right">

      <!-- 结账 -->
      <span
        class="icon"
        @click="calculateMoney"
      >
        <el-icon>
          <Money/>
        </el-icon>
      </span>
      <!-- 主题 -->
      <span
        class="icon"
        @click="changeTheme"
      >
        <el-icon>
          <Sunrise v-if="store.state.settings.theme !== 'light'" />
          <MoonNight v-else />
        </el-icon>
      </span>

      <!-- 更新记录 -->
      <span
        class="history icon"
        @click="openHisory"
      >
        <el-icon>
          <Clock />
        </el-icon>
      </span>
      <!-- 设置 -->
      <span
        class="settings icon"
        @click="
          store.state.model.settingsModelFlag =
            !store.state.model.settingsModelFlag
        "
      >
        <el-icon>
          <Setting />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Clock,
  Setting,
  Sunrise,
  MoonNight,
Money,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";

const emit = defineEmits(["logout"]);
const store = useStore();


const changeTheme = () => {
  const newTheme = store.state.settings.theme === "light" ? "dark" : "light";
  document.documentElement.className = newTheme;
  store.commit("updateSettings", {
    key: "theme",
    value: (store.state.settings.theme = newTheme),
  });
};
document.documentElement.className = store.state.settings.theme;

// 登录登出
function openLoginModel() {
  if (!store.state.user.isLogin) {
    store.state.model.loginModelFlag = !store.state.model.loginModelFlag;
  }
}

function openHisory() {
  store.commit("updateModel", { key: "historyModelFlag", value: true });
}

function calculateMoney(){
  store.commit("updateModel", { key: "calculateMoneyModelFlag", value: true });
}
</script>

<style scoped lang="scss">
.topnav {
  width: 100%;
  // position: fixed;
  top: 0;
  z-index: 20;
  background: radial-gradient(transparent 1px, var(--bg-transparant-color) 1px);
  backdrop-filter: saturate(100%) blur(10px);
  height: 50px;
}
.left {
  position: absolute;
  left: 20px;
  top: 12px;
  display: flex;
  gap: 10px;
}
.right {
  position: absolute;
  right: 20px;
  top: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.header {
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
}
.icon {
  font-size: 25px;
  transition: transform 0.3s;
  cursor: pointer;
}

.history,
.settings {
  .el-icon {
    transition: 0.3s;
  }
  .el-icon:hover {
    transform: rotate(180deg);
  }
}
.baseline::after {
  content: "";
  display: block;
  height: 2px;
  width: 0%;
  margin-top: 3px;
  background: var(--font-color);
  transition: 0.3s;
}
.baseline:hover::after {
  width: 100%;
}
</style>