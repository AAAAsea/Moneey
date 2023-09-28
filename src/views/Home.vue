<template>
  <div
    class="home"
    v-loading="!inited"
    element-loading-background="var(--color-background)"
  >
    <h2>个人账户</h2>
    <AccountCard
      :role="ROLE.Owner"
      title="我的账户"
      @click="toDetail"
      :cost="user.cost"
    ></AccountCard>
    <h2>我的组织</h2>
    <div class="organizations">
      <AccountCard
        :role="organization.role"
        :title="organization.name"
        :cost="organization.cost"
        :date="organization.createTime"
        @click="toOrgDetail(organization.name)"
        v-for="organization in user.organizations"
      ></AccountCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfo } from '@/api/auth';
import { useUserStore } from '@/store/user';
import AccountCard from '@/components/AccountCard.vue';
import { ROLE } from '@/constants/org';

const inited = ref(false);
const user = useUserStore();
const initUserInfo = () => {
  getUserInfo()
    .then((userInfo) => {
      Object.assign(user, userInfo);
      user.isLogin = true;
      inited.value = true;
    })
    .catch(() => {
      user.isLogin = false;
      router.push('/login');
    });
};
initUserInfo();

const router = useRouter();
const toDetail = () => {
  router.push('/detail');
};
const toOrgDetail = (name: string) => {
  router.push(`/detail/${name}`);
};
</script>

<style lang="scss" scoped>
.home {
  padding: 0 20px;
  min-height: 100vh;
  .organizations {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
