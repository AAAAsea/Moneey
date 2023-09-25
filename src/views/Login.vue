<template>
  <el-card class="login-card">
    <h2 class="title">登录</h2>
    <!-- 登录 -->
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="rule-form"
      label-position="top"
      @keyup="handleFormClick"
    >
      <el-form-item
        :label="$t('login.account')"
        label-width="auto"
        prop="account"
      >
        <el-input
          v-model="ruleForm.account"
          autocomplete="off"
          :placeholder="$t('login.accountPlace')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('login.password')"
        label-width="auto"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          autocomplete="off"
          :placeholder="$t('login.passwordPlace')"
          show-password
        />
      </el-form-item>
    </el-form>

    <div class="footer">
      <el-button type="text" style="cursor: pointer" @click="toRegister"
        >前往注册</el-button
      >
      <!-- <el-button
              type="text"
              v-if="type === 'login'"
              @click="type = 'recoverPassword'"
              style="color: var(--primary-color); cursor: pointer"
              >{{ '忘记密码？' }}</el-button
            > -->
      <el-button
        type="primary"
        @click="submit(ruleFormRef)"
        style="backgroundcolor: var(--primary-color); border: none"
        :disabled="!canSubmit"
        >登录</el-button
      >
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { login } from '@/api/auth';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { FormInstance } from 'element-plus';

const router = useRouter();
const user = useUserStore();

const canSubmit = ref(true);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  account: '',
  password: '',
});
const rules = reactive({
  account: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { validator: validateMail, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { min: 6, message: '最少6个字符', trigger: 'blur' },
    { max: 15, message: '最多15个字符', trigger: 'blur' },
  ],
});

// 邮箱表单校验规则
function validateMail(_rule: any, value: any, callback: any) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  if (value === '') {
    callback(new Error('邮箱不能为空'));
  } else if (!reg.test(value)) {
    callback(new Error('邮箱格式不正确'));
  } else {
    callback();
  }
}

// 回车提交
function handleFormClick(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    submit(ruleFormRef.value);
  }
}

// 提交
function submit(formEl: FormInstance | undefined) {
  if (!canSubmit.value) return; // 禁止连续提交
  canSubmit.value = false;

  console.log('login');

  if (!formEl) return;

  console.log('login');

  formEl.validate((valid: boolean) => {
    if (valid) {
      login(ruleForm.account, ruleForm.password)
        .then((res) => {
          canSubmit.value = true;
          router.push('/');
          user.isLogin = true;
          user.token = res.jwt;
        })
        .finally(() => {
          console.log('hhh');

          canSubmit.value = true;
        });
    }
  });
}

function toRegister() {
  router.push('/register');
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px;
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
