<template>
  <div class="list-header">
    <h3>{{ name }}</h3>
    <el-button
      @click="dialogVisible = true"
      v-show="orgInfo.role !== ROLE.Member"
      >+ New Member</el-button
    >
  </div>
  <div class="member-container">
    <div class="member-item" v-for="member in orgInfo.members" :key="member.id">
      <div class="info">
        <span>{{ member.name }}</span>
        <el-tag :type="getTagTypeByRole(member.role)">{{
          getRoleLabelByBalue(member.role)
        }}</el-tag>
      </div>
      <div class="operates">
        <!-- <el-button type="warning" v-show="member.role === ROLE.Member"
          >设为管理</el-button
        > -->
        <el-button
          type="primary"
          v-show="member.role !== ROLE.Owner"
          :icon="Delete"
          circle
          disabled
        ></el-button>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="New Member"
    :width="modalStore.width"
  >
    <el-form-item label="username">
      <el-autocomplete
        fullwidth
        v-model="userItem.username"
        :fetch-suggestions="fetchUserList"
        @select="handleSelect"
        hide-loading
      >
        <template #suffix>
          <el-icon>
            <user />
          </el-icon>
        </template>
        <template #default="{ item }">
          <div class="select-item">
            <span class="nickname">{{ item.nickname }}</span>
            <span class="username">{{ item.username }}</span>
          </div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onConfirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getOrgInfo, addMember } from '@/api/org';
import { getListByUserName } from '@/api/user';
import { IOrgInfo } from '@/types/org';
import { IBaseUserInfo, IBaseUserList } from '@/types/user';
import { getRoleLabelByBalue, getTagTypeByRole } from '@/utils/tools';
import { ROLE } from '@/constants/org';
import { useModalStore } from '@/store/modal';
import { Delete } from '@element-plus/icons-vue';

const route = useRoute();
const { name } = route.params;

const orgInfo = reactive<IOrgInfo>({
  id: 0,
  name: '',
  role: ROLE.Member,
  creatorId: 0,
  members: [],
});

const fetChOrgMemberList = () => {
  getOrgInfo(name as string).then((res) => {
    Object.assign(orgInfo, res);
  });
};

fetChOrgMemberList();

const dialogVisible = ref(false);
const modalStore = useModalStore();
const userItem = reactive({
  username: '',
  userId: 0,
});
const fetchUserList = (
  queryString: string,
  cb: (arg: IBaseUserList) => void
) => {
  if (queryString.trim() === '') {
    return;
  }
  getListByUserName(queryString.trim()).then((res) => {
    cb(res);
  });
};
const handleSelect = (item: IBaseUserInfo) => {
  userItem.username = item.username;
  userItem.userId = item.userId;
};

const onConfirm = () => {
  if (userItem.userId === 0) {
    return;
  }
  addMember(userItem.userId, name as string)
    .then(() => fetChOrgMemberList())
    .then(() => {
      dialogVisible.value = false;
      userItem.username = '';
      userItem.userId = 0;
    });
};
</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select-item {
  display: flex;
  gap: 10px;

  .username {
    opacity: 0.4;
  }
}
.member-container {
  background: rgba($color: #000000, $alpha: 0.1);
  border-radius: 5px;
  padding: 10px;
}
.member-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  }

  .info {
    display: flex;
    gap: 10px;
  }

  .operates {
    display: flex;
    align-items: center;

    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
