<template>
  <div class="list-header">
    <el-button
      @click="createOrgDialogVisible = true"
      type="text"
      v-show="orgList.length > 0"
      >New Organization</el-button
    >
  </div>
  <div
    class="org-item"
    v-for="org in orgList"
    :key="org.id"
    @click="toOrgDetail(org.name)"
  >
    <div class="info">
      <span :orgList="orgList">
        {{ org.name }}
      </span>
      <el-tag :type="getTagTypeByRole(org.role)">{{
        getRoleLabelByBalue(org.role)
      }}</el-tag>
    </div>
    <div class="operates">
      <el-button
        type="primary"
        @click.stop="handleClick(org)"
        v-show="org.role === ROLE.Owner"
        >Delete</el-button
      >
    </div>
  </div>
  <el-empty v-if="orgList.length === 0 && inited" description="No organization">
    <el-button @click="createOrgDialogVisible = true" type="primary"
      >New Organization</el-button
    >
  </el-empty>

  <el-dialog
    v-model="createOrgDialogVisible"
    title="New Organization"
    :width="modalStore.width"
  >
    <el-form-item label="Organization name">
      <el-input v-model="name" />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="createOrgDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onCreateConfirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible" title="Warning" :width="modalStore.width">
    <div>确定删除【{{ currentOrg.name }}】?</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click.stop="onConfirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { IOrgList, IOrgItem } from '@/types/org';
import { ROLE } from '@/constants/org';
import { createOrg, deleteOrg } from '@/api/org';
import { getRoleLabelByBalue, getTagTypeByRole } from '@/utils/tools';
import { useModalStore } from '@/store/modal';

defineProps<{
  orgList: IOrgList;
  inited: boolean;
}>();

const emit = defineEmits(['update']);

const router = useRouter();
const toOrgDetail = (name: string) => {
  router.push(`/settings/organization/${name}`);
};

const createOrgDialogVisible = ref(false);
const modalStore = useModalStore();
const name = ref('');
const onCreateConfirm = () => {
  createOrg(name.value).then(() => {
    createOrgDialogVisible.value = false;
    name.value = '';
    emit('update');
  });
};

const currentOrg = reactive<IOrgItem>({
  id: 0,
  name: '',
  creatorId: 0,
  role: ROLE.Member,
});

const dialogVisible = ref(false);
const handleClick = (org: IOrgItem) => {
  Object.assign(currentOrg, org);
  dialogVisible.value = true;
};

const onConfirm = () => {
  if (!currentOrg.id) return;
  deleteOrg(currentOrg.id).then(() => {
    dialogVisible.value = false;
    emit('update');
  });
};
</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}

.org-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  transition: 0.3s;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: rgba($color: #000000, $alpha: 0.1);
  }

  .info {
    display: flex;
    gap: 10px;
    align-items: center;
    font-weight: bold;

    a {
      color: black;
    }
  }
}
</style>
