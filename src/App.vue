<script setup lang="ts">
import TopNav from '@/components/TopNav.vue';
import ProjectHistory from '@/components/ProjectHistory.vue';
import Footer from '@/components/Footer.vue';
// import { useStore } from 'vuex';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useModalStore } from './store/modal';

const modalStore = useModalStore();
function adjustModelWidth() {
  if (window.innerWidth > 800) {
    modalStore.width = '40%';
  } else {
    modalStore.width = '95vw';
  }
}
adjustModelWidth();
window.addEventListener('resize', adjustModelWidth);

// const logOut = () => {
//   store.commit('updateUser', {
//     key: 'isLogin',
//     value: false,
//   });
//   store.commit('updateUser', {
//     key: 'nickName',
//     value: '',
//   });
//   store.commit('showToast', {
//     type: 'success',
//     message: '已退出登录',
//   });
// };

// const logIn = () => {
//   store.commit('updateUser', {
//     key: 'isLogin',
//     value: true,
//   });
// };
</script>

<template>
  <el-config-provider :locale="zhCn">
    <TopNav />
    <!-- <ProjectHistory /> -->
    <RouterView />
    <Footer class="footer" />
  </el-config-provider>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  position: absolute;
  bottom: 10px;
}
</style>
./store/modal
