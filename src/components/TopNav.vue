<template>
  <div class="topnav">
    <div class="left">
      <!-- 账户 -->
      <el-avatar :size="30" :src="favicon" @click="toHome" class="avatar" />
      <el-popconfirm title="退出登录？" @confirm="logout">
        <template #reference>
          <span class="nickname baseline"> {{ user.nickname }} </span>
        </template>
      </el-popconfirm>
    </div>
    <div class="right">
      <!-- 结账 -->
      <!-- <span class="icon">
        <el-icon>
          <Money />
        </el-icon>
      </span> -->
      <!-- 主题 -->
      <span class="icon" @click="changeTheme">
        <el-icon>
          <Sunrise v-if="settings.theme !== 'light'" />
          <MoonNight v-else />
        </el-icon>
      </span>
      <!-- 更新记录 -->
      <span class="history icon" @click="toHistory">
        <el-icon>
          <Clock />
        </el-icon>
      </span>
      <!-- 设置 -->
      <span class="settings icon" @click="toSettings" v-show="user.isLogin">
        <el-icon>
          <Setting />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/settings';
import { useUserStore } from '@/store/user';
import {
  Clock,
  Setting,
  Sunrise,
  MoonNight,
  // Money,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import favicon from '@/assets/favicon.svg';

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

const router = useRouter();
const toSettings = () => {
  router.push('/settings');
};

const toHome = () => {
  user.isLogin ? router.push('/') : router.push('/login');
};

const toHistory = ()=>{
  router.push('/history')
}
</script>

<style scoped lang="scss">
.avatar {
  background: transparent;
}
.topnav {
  z-index: 20;
  background: radial-gradient(transparent 1px, var(--bg-transparant-color) 1px);
  backdrop-filter: saturate(100%) blur(10px);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  gap: 10px;
  align-items: center;
}
.right {
  display: flex;
  gap: 10px;
  align-items: center;
}
.nickname {
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
.baseline {
  position: relative;
}
.baseline::after {
  content: '';
  display: block;
  position: absolute;
  height: 2px;
  width: 0%;
  margin-top: 3px;
  background: var(--font-color);
  transition: 0.3s;
}
.baseline:hover::after {
  width: 100%;
}

.el-avatar {
  cursor: pointer;
}
</style>
