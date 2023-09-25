<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/settings/organization' }" replace
        >Organization List</el-breadcrumb-item
      >
      <el-breadcrumb-item replace>{{ orgName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <RouterView
    :orgList="orgList"
    @update="fetchOrgList"
    :inited="inited"
  ></RouterView>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getOrgList } from '@/api/org';
import { IOrgList } from '@/types/org';

const route = useRoute();
const orgName = computed(() => route.params.name);
const orgList = ref<IOrgList>([]);
const inited = ref(false);

const fetchOrgList = async () => {
  orgList.value = await getOrgList();
  inited.value = true;
};
fetchOrgList();
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #666;
  padding: 10px 0;
}
</style>
@/api/org
