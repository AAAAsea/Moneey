<template>
  <div class="topnav">
    <div class="left">
      <!-- 账户 -->
      <el-popconfirm title="退出登录？" @confirm="logout">
        <template #reference>
          <span class="header baseline">
            {{ user.nickname }}
          </span>
        </template>
      </el-popconfirm>
    </div>
    <div class="right">
      <!-- 结账 -->
      <span class="icon">
        <el-icon>
          <Money />
        </el-icon>
      </span>
      <!-- 主题 -->
      <span class="icon" @click="changeTheme">
        <el-icon>
          <Sunrise v-if="settings.theme !== 'light'" />
          <MoonNight v-else />
        </el-icon>
      </span>
      <!-- 更新记录 -->
      <span class="history icon">
        <el-icon>
          <Clock />
        </el-icon>
      </span>
      <!-- 设置 -->
      <span class="settings icon" @click="toSettings">
        <el-icon>
          <Setting />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from '@/router/Index';
import { useSettingsStore } from '@/store/settings';
import { useUserStore } from '@/store/user';
import {
  Clock,
  Setting,
  Sunrise,
  MoonNight,
  Money,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const settings = useSettingsStore();
const user = useUserStore();

const changeTheme = () => {
  const newTheme = settings.theme === 'light' ? 'dark' : 'light';
  document.documentElement.className = newTheme;
  settings.theme = newTheme;
};
document.documentElement.className = settings.theme;

const logout = () => {
  user.$reset();
  router.push('/login');
};

const router = useRouter()
const toSettings = ()=>{
  router.push('/settings')
}
</script>

<style scoped lang="scss">
.topnav {
  width: 100%;
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
  content: '';
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
