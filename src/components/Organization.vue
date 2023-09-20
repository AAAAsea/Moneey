<template>
  <h2>Organizations</h2>
  <div class="org-container">
    <div class="org-item">
      <div class="info">
        <h3>Test</h3>
        <el-tag>OWNER</el-tag>
      </div>
      <div class="operates">
        <el-button type="primary">离开</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.org-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
</style>
