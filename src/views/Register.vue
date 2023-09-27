<template>
  <!-- Form -->
  <el-card class="register-card">
    <h2 class="title">注册</h2>
    <el-form
      :model="registRuleForm"
      :rules="registRules"
      class="rule-form"
      label-position="top"
      ref="registerRuleFormRef"
      @keyup="handleFormClick"
    >
      <el-form-item
        :label="$t('login.account')"
        label-width="auto"
        prop="username"
      >
        <el-input
          v-model="registRuleForm.username"
          autocomplete="off"
          :placeholder="$t('login.accountPlace')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('login.nickname')"
        label-width="auto"
        prop="nickname"
      >
        <el-input
          v-model="registRuleForm.nickname"
          autocomplete="off"
          :placeholder="$t('login.nicknamePlace')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('login.password')"
        label-width="auto"
        prop="password"
      >
        <el-input
          v-model="registRuleForm.password"
          autocomplete="off"
          :placeholder="$t('login.passwordPlace')"
          show-password
        />
      </el-form-item>
      <el-form-item
        :label="$t('login.password2')"
        label-width="auto"
        prop="password2"
      >
        <el-input
          v-model="registRuleForm.password2"
          autocomplete="off"
          :placeholder="$t('login.password2Place')"
          show-password
        />
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="text" style="cursor: pointer" @click="toLogin"
        >已有账号？去登录</el-button
      >
      <el-button
        type="primary"
        @click="submit(registerRuleFormRef)"
        style="backgroundcolor: var(--primary-color); border: none"
        >注册</el-button
      >
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { register } from '@/api/auth';
import { useRouter } from 'vue-router';
import { FormInstance } from 'element-plus';
const router = useRouter();

const canSubmit = ref(true);

// 注册
const registerRuleFormRef = ref<FormInstance>();

// 邮箱表单校验规则
const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
function validateMail(_rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('邮箱不能为空'));
  } else if (!reg.test(value)) {
    callback(new Error('邮箱格式不正确'));
  } else {
    callback();
  }
}
function validatePassword2(_rule: any, value: any, callback: any) {
  if (value !== registRuleForm.password) {
    callback(new Error('两次密码不一致'));
  } else {
    callback();
  }
}
const registRuleForm = reactive({
  username: '',
  code: '',
  password: '',
  nickname: '',
  password2: '',
});

const registRules = reactive({
  username: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { validator: validateMail, trigger: 'blur' },
  ],
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    { min: 6, max: 6, message: '六位数', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { min: 6, message: '最少6个字符', trigger: 'blur' },
    { max: 15, message: '最多15个字符', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 2, message: '最少2个字符', trigger: 'blur' },
    { max: 10, message: '最多10个字符', trigger: 'blur' },
  ],
  password2: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePassword2, trigger: 'blur' },
  ],
});

// 回车提交
function handleFormClick(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    submit(registerRuleFormRef.value);
  }
}

// 提交
function submit(formEl: FormInstance | undefined) {
  if (!canSubmit.value) return; // 禁止连续提交
  canSubmit.value = false;
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 提交注册
      register(registRuleForm)
        .then(() => {
          router.push('/login');
        })
        .finally(() => {
          canSubmit.value = true;
        });
    }
  });
}

function toLogin() {
  router.push('/login');
}
</script>

<style lang="scss" scoped>
.register-card {
  max-width: 400px;
  padding: 20px 20px 30px 20px;
  margin: auto;
  margin-top: 50px;
  text-align: center;

  .footer {
    padding: 30px;
    float: right;
  }
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.rule-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.code {
  width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>
