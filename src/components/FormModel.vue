<template>
  <el-dialog
    v-model="store.state.model.formModelFlag"
    title="记账"
    class="dialog"
    :width="store.state.model.modelWidth"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
      title="添加记录"
      ref="ruleFormRef"
      @keydown.enter="submitForm(ruleFormRef)"
    >
      <el-form-item label="日期" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              label="选择日期"
              placeholder="选择日期"
              style="width: 100%"
              value-format="YYYY-MM-DD"
              :disabled-date="judgeDateDisabled"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="金额" prop="cost">
        <el-input-number v-model="ruleForm.cost" />
      </el-form-item>

      <el-form-item label="分类" prop="type">
        <el-select
          v-model="ruleForm.type"
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

      <el-form-item label="标签" prop="name">
        <el-autocomplete
          v-model="ruleForm.name"
          placeholder="其它标签"
          clearable
          :fetch-suggestions="getTags"
          highlight-first-item
        />
      </el-form-item>

      <el-form-item :style="{ marginTop: '20px' }">
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { add } from '@/api/list.js';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
  initData: Function,
});
const ruleFormRef = ref();
const ruleForm = reactive({
  date: '',
  cost: 0,
  type: '',
  content: '',
  name: '',
});
const judgeDateDisabled = (date) => date > new Date();

const rules = {
  name: [
    {
      min: 1,
      max: 8,
      message: '最多8个字符',
      trigger: 'blur',
    },
  ],
  cost: [
    {
      required: true,
      message: '请选择花费',
      trigger: 'change',
    },
  ],
  type: [
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
  [...new Set(['饮食', '日用', '交通', '娱乐', ...store.state.data.types])].map(
    (e) => {
      return { label: e, value: e };
    }
  )
);
const tags = computed(() =>
  store.state.data.tags.map((e) => {
    return { value: e };
  })
);
const getTags = (queryString, callback) => {
  const results = queryString
    ? tags.value.filter((tag) =>
        tag.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : tags.value;
  callback(results);
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      add(ruleForm).then((e) => {
        formEl.resetFields();
        store.commit('showToast', {
          message: '提交成功',
          type: 'success',
        });
        props.initData();
        store.state.model.formModelFlag = false;
      });
    } else {
      store.commit('showToast', {
        message: '请输入正确的格式',
        type: 'error',
      });
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style></style>
