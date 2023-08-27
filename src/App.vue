<script setup lang="ts">
import TopNav from "@/components/TopNav.vue";
import LoginModel from "@/components/LoginModel.vue";
import ProjectHistory from "@/components/ProjectHistory.vue";
import MainContent from "@/components/MainContent.vue";
import Footer from "@/components/Footer.vue";
import { useStore } from "vuex";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import CalculateMoney from "./components/CalculateMoney.vue";
const store = useStore();
function adjustModelWidth() {
  if (window.innerWidth > 800) {
    store.commit("updateModel", { key: "modelWidth", value: "40%" });
  } else {
    store.commit("updateModel", { key: "modelWidth", value: "95vw" });
  }
}
adjustModelWidth();
window.addEventListener("resize", adjustModelWidth);

const logOut = () => {
  store.commit("updateUser", {
    key: "isLogin",
    value: false,
  });
  store.commit("updateUser", {
    key: "nickName",
    value: "",
  });
  store.commit("showToast", {
    type: "success",
    message: "已退出登录",
  });
};

const logIn = () => {
  store.commit("updateUser", {
    key: "isLogin",
    value: true,
  });
};
</script>

<template>
  <el-config-provider :locale="zhCn">
    <top-nav @logout="logOut" />
    <login-model @login="logIn" />
    <project-history />
    <router-view />
    <!-- <main-content /> -->
    <CalculateMoney/>
    <Footer />
  </el-config-provider>
</template>

<style lang="scss" scoped>
</style>
