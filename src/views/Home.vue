<template>
  <div class="home">
    <h2>个人账户</h2>
    <AccountCard title="我的账户" :cost="1000"></AccountCard>
    <h2>我的组织</h2>
    <div class="organizations">
      <AccountCard :title="organization.name" :cost="1000" v-for="organization in user.organizations"></AccountCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getUserInfo } from '@/api/auth';
import AccountCard from '@/components/AccountCard.vue';
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
  .account-card{
    height: 150px;
    width: 300px;
    cursor: pointer;
  }

  .organizations {
    display: flex;
    gap: 20px;
  }
}
</style>
