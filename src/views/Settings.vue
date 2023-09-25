<template>
  <el-container class="settings">
    <el-aside class="side-bar">
      <RouterLink
        v-for="item in menuList"
        class="side-bar-item"
        :to="item.path"
        >{{ item.name }}</RouterLink
      >
    </el-aside>
    <el-main class="content">
      <RouterView></RouterView>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
const menuList = [
  {
    name: 'Profile',
    path: '/settings/profile',
  },
  {
    name: 'Organizations',
    path: '/settings/organization',
  },
];
</script>

<style lang="scss" scoped>
.settings {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;

  .side-bar {
    display: flex;
    flex-direction: column;

    .side-bar-item {
      border-radius: 5px;
      cursor: pointer;
      padding: 5px 10px;
      margin-right: 20px;
      margin-bottom: 2px;
      color: var(--second-color);
      transition: 0.3s;

      &.router-link-active,
      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.1);
      }
    }
  }

  .content {
    border-radius: 5px;
  }
}

@media screen and (max-width: 600px) {
  .settings {
    flex-direction: column;
  }
}
</style>
