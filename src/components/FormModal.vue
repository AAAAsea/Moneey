<template>
  <el-dialog
    v-model="dialogVisible"
    title="记账"
    class="dialog"
    :width="modalStore.width"
    @close="onClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      class="form"
      status-icon
      title="添加记录"
      ref="ruleFormRef"
      label-width="60px"
    >
      <el-form-item label="日期" required>
        <el-form-item prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
            label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
            value-format="YYYY-MM-DD"
            :disabled-date="judgeDateDisabled"
            :default-value="new Date()"
          />
        </el-form-item>
      </el-form-item>

      <el-form-item label="金额" prop="cost">
        <el-input-number v-model="ruleForm.cost" />
      </el-form-item>

      <el-form-item label="分类" prop="categoryName">
        <el-select
          v-model="ruleForm.categoryName"
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="选择花费分类"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="用途" prop="content">
        <el-input
          v-model="ruleForm.content"
          type="textarea"
          placeholder="拿钱干嘛了！"
        />
      </el-form-item>

      <el-form-item label="标签" prop="tags">
        <div class="tags-container">
          <el-tag
            v-for="tag in ruleForm.tags"
            :key="tag"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="tagInputVisible"
            ref="tagInputRef"
            v-model="tagInputValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="small"
            @click="showInput"
          >
            + 添加
          </el-button>
        </div>
      </el-form-item>

      <div class="shortcut-container">
        <shortcut @select="setForm"></shortcut>
      </div>

      <el-form-item :style="{ marginTop: '20px' }">
        <div class="btn-container">
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <el-button @click="saveForm(ruleFormRef)" type="warning"
            >保存</el-button
          >
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            :disabled="isSubmitDisabled"
            >提交</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { addRecord } from '@/api/list';
import { useRoute } from 'vue-router';
import { computed, reactive, ref, watchEffect, nextTick } from 'vue';
import { formatDate } from '@/utils/tools.ts';
import { useDataStore } from '@/store/data';
import { useModalStore } from '@/store/modal';
import { ElMessage, FormInstance, ElInput } from 'element-plus';
import { useShortcutStore } from '@/store/shortcut';
import Shortcut from './Shortcut.vue';
import { IShortcutItem } from '@/types/shortcut';

const props = defineProps({
  initData: Function,
  visible: Boolean,
});
const emit = defineEmits(['close', 'submited']);
const route = useRoute();

const dataStore = useDataStore();
const modalStore = useModalStore();
const ruleFormRef = ref();
const isSubmitDisabled = ref(false);
const dialogVisible = ref(false);

const ruleForm = reactive({
  date: formatDate(new Date()),
  cost: 0,
  categoryName: dataStore.defaultCategory,
  content: '',
  tags: [] as string[],
});
const judgeDateDisabled = (date: Date) => date > new Date();

const rules = {
  cost: [
    {
      required: true,
      message: '请选择花费',
      trigger: 'change',
    },
  ],
  categoryName: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change',
    },
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'change',
    },
    {
      min: 1,
      max: 30,
      message: '最多30个字符',
      trigger: 'change',
    },
  ],
};

const options = computed(() =>
  [...new Set(['饮食', '日用', '交通', '娱乐', ...dataStore.categories])].map(
    (e) => {
      return { label: e, value: e };
    }
  )
);

const tagInputVisible = ref(false);
const tagInputValue = ref('');
const tagInputRef = ref();

const handleClose = (tag: string) => {
  ruleForm.tags.splice(ruleForm.tags.indexOf(tag), 1);
};

const showInput = () => {
  tagInputVisible.value = true;
  nextTick(() => {
    tagInputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (tagInputValue.value) {
    ruleForm.tags.push(tagInputValue.value);
  }
  tagInputVisible.value = false;
  tagInputValue.value = '';
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  console.log('提交');

  await formEl.validate((valid: boolean) => {
    if (valid) {
      isSubmitDisabled.value = true;
      addRecord({
        ...ruleForm,
        organizationName: route.params.organizationName as string,
      }).then(() => {
        ElMessage({
          message: '提交成功',
          type: 'success',
        });

        emit('submited');
        onClose();

        isSubmitDisabled.value = false;

        dataStore.defaultCategory = ruleForm.categoryName;

        ruleForm.cost = 0;
        ruleForm.content = '';
      });
    } else {
      ElMessage({
        message: '请输入正确的格式',
        type: 'error',
      });
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const shortcutStore = useShortcutStore();
const saveForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean) => {
    if (valid) {
      console.log(shortcutStore);

      shortcutStore.addShortcut({
        ...ruleForm,
        organizationName: route.params.organizationName as string,
      });
      ElMessage({
        message: '保存成功',
        type: 'success',
      });
    } else {
      ElMessage({
        message: '请输入正确的格式',
        type: 'error',
      });
    }
  });
};
const setForm = (item: IShortcutItem) => {
  if (!item) return;
  ruleForm.categoryName = item.categoryName;
  ruleForm.content = item.content;
  ruleForm.cost = item.cost;
  ruleForm.tags = [...item.tags];
};

const onClose = () => {
  emit('close');
};

watchEffect(() => {
  dialogVisible.value = props.visible;
});
</script>

<style lang="scss" scoped>
.tags-container {
  width: 100%;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  .el-input {
    width: 60px;
  }
}
.form {
  padding: 0 20px;
  .btn-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
  }

  .shortcut-container {
    padding: 0 20px;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
}
</style>
