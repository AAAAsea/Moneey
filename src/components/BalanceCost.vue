<template>
  <el-card
    v-if="transitionList && transitionList?.length > 0 && organizationName"
  >
    <div class="header">
      <h2>算钱啦</h2>
      <el-button type="primary" @click="balanceCost" :disabled="disabled"
        >结账</el-button
      >
    </div>
    <div v-for="item in transitionList">
      <span class="user">@{{ item.from }}</span> 应转给
      <span class="user">@{{ item.to }}</span> {{ item.cost.toFixed(2) }} 元
    </div>
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    title="确定算好了？"
    :width="modalStore.width"
  >
    <div>确定要对【{{ organizationName }}】进行结账?</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">算了</el-button>
        <el-button type="primary" @click.stop="onConfirm" :disabled="disabled">
          给我结！
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Transaction } from '@/types/data';
import { useRoute } from 'vue-router';
import { orgBilling } from '@/api/org';
import { useModalStore } from '@/store/modal';
import { ElMessage } from 'element-plus';

defineProps<{
  transitionList?: Transaction[];
}>();
const route = useRoute();
const organizationName = route.params.organizationName;

const emit = defineEmits(['refresh']);

const disabled = ref(false);
const balanceCost = () => {
  dialogVisible.value = true;
};

const dialogVisible = ref(false);
const modalStore = useModalStore();
const onConfirm = () => {
  disabled.value = true;
  orgBilling(organizationName as string)
    .then(() => {
      emit('refresh');
      ElMessage.success('💐好样的！！');
    })
    .finally(() => {
      disabled.value = false;
      dialogVisible.value = false;
    });
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user {
  color: var(--color-primary);
}
</style>
