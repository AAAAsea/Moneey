<template>
  <el-config-provider :locale="zhCn">
    <el-container>
      <el-header class="header">
        <TopNav />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import TopNav from "@/components/TopNav.vue";
import Footer from "@/components/Footer.vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { useModalStore } from "./store/modal";

const modalStore = useModalStore();
function adjustModelWidth() {
  if (window.innerWidth > 800) {
    modalStore.width = "40%";
  } else {
    modalStore.width = "95vw";
  }
}
adjustModelWidth();
window.addEventListener("resize", adjustModelWidth);
</script>

<style lang="scss" scoped></style>
