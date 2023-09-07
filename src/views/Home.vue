<template>
  <div class="home">
    <h2>个人账户</h2>
    <el-card shadow="hover"> 我的账户 </el-card>
    <h2>我的组织</h2>
    <div class="organizations">
      <el-card shadow="hover" v-for="organization in user.organizations">
        {{ organization.name }}
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getUserInfo } from '@/api/auth';
import { useUserStore } from '@/store/user';

const user = useUserStore();
const initUserInfo = async () => {
  const userInfo = await getUserInfo();
  Object.assign(user, userInfo);
  user.isLogin = true;
};
initUserInfo();
</script>

<style lang="scss" scoped>
.home {
  padding: 0 20px;
  min-height: 100vh;

  .organizations {
    display: flex;
    gap: 20px;
  }
}
</style>
