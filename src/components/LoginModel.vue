<template>
  <!-- Form -->
  <el-dialog
    v-model="store.state.model.loginModelFlag"
    :title="type === 'login' ? '登录' : type === 'regist' ? '注册' : '找回密码'"
    class="dialog"
    :width="store.state.model.modelWidth"
  >
    <!-- 登录 -->
    <el-form
      v-if="type === 'login'"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="loginRules"
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
    <!-- 注册 -->
    <el-form
      v-else-if="type === 'regist'"
      :model="registRuleForm"
      :rules="registRules"
      class="rule-form"
      label-position="top"
      ref="registerRuleFormRef"
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
        :label="$t('login.nickName')"
        label-width="auto"
        prop="nickName"
      >
        <el-input
          v-model="registRuleForm.nickName"
          autocomplete="off"
          :placeholder="$t('login.nickNamePlace')"
        />
      </el-form-item>
      <!-- <el-form-item :label="$t('login.code')" label-width="auto" prop="code"  >
        <div class="code">
          <el-input v-model="registRuleForm.code" autocomplete="off"  :placeholder="$t('login.codePlace')" :style="{width:   '50%'}" />
          <el-button type="primary" @click="handleCodeClick" :disabled="sendCodeButtonFlag" style="backgroundColor:var(--primary-color); color: var(--main-bg); border: none;">发送{{sendCodeButtonFlag ? ' ' + codeWaitTime + 's' : ''}}</el-button>
        </div>
      </el-form-item> -->
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
    <!-- 忘记密码 -->
    <!-- <el-form 
      v-else
      :model="recoverRuleForm"
      :rules="recoverRules"
      class="rule-form"
      label-position="top"
      ref="recoverRuleFormRef"
    >
      <el-form-item :label="$t('login.account')" label-width="auto" prop="username" >
        <el-input v-model="recoverRuleForm.username" autocomplete="off"  :placeholder="$t('login.accountPlace')"/>
      </el-form-item>
      <el-form-item :label="$t('login.code')" label-width="auto" prop="code"  >
        <div class="code">
          <el-input v-model="recoverRuleForm.code" autocomplete="off"  :placeholder="$t('login.codePlace')" :style="{width:   '50%'}" />
          <el-button type="primary" @click="handleCodeClick" :disabled="sendRecoverCodeButtonFlag" style="backgroundColor:var(--primary-color); color: var(--main-bg); border: none;">发送{{sendRecoverCodeButtonFlag ? ' ' + codeRecoverWaitTime + 's' : ''}}</el-button>
        </div>
      </el-form-item>
      <el-form-item :label="$t('login.newPassword')" label-width="auto" prop="password" >
        <el-input v-model="recoverRuleForm.password"  autocomplete="off"  :placeholder="输入新密码" show-password/>
      </el-form-item>
      <el-form-item :label="$t('login.password2')" label-width="auto" prop="password2" >
        <el-input v-model="recoverRuleForm.password2"  autocomplete="off"  :placeholder="再次输入新密码" show-password/>
      </el-form-item>
    </el-form> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="text"
          @click="type = type === 'login' ? 'regist' : 'login'"
          style="cursor: pointer"
          >{{ type === "login" ? "前往注册" : "已有帐号，点击登录" }}</el-button
        >
        <!-- <el-button type="text" v-if="type === 'login'" @click="type='recoverPassword'" style="color:var(--primary-color);cursor:pointer;">{{'忘记密码？'}}</el-button> -->
        <el-button @click="store.state.model.loginModelFlag = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="
            submit(
              type === 'login'
                ? ruleFormRef
                : type === 'regist'
                ? registerRuleFormRef
                : recoverRuleFormRef
            )
          "
          style="backgroundcolor: var(--primary-color); border: none"
          >{{
            type === "login" ? "登录" : type === "regist" ? "注册" : "提交"
          }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["login"]);
const type = ref("login");
const store = useStore();
const canSubmit = ref(true);

// 登录
const ruleFormRef = ref("");
const ruleForm = reactive({
  account: "",
  password: "",
});
const loginRules = reactive({
  account: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { validator: validateMail, trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不可为空", trigger: "blur" },
    { min: 6, message: "最少6个字符", trigger: "blur" },
    { max: 15, message: "最多15个字符", trigger: "blur" },
  ],
});

// 注册
const registerRuleFormRef = ref("");
const sendCodeButtonFlag = ref(false);
const codeWaitTime = ref(0);
// 邮箱表单校验规则
const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
function validateMail(rule, value, callback) {
  if (value === "") {
    callback(new Error("邮箱不能为空"));
  } else if (!reg.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    // if (ruleForm.mail !== '') {
    //   if (!registerRuleFormRef.value) return
    //   registerRuleFormRef.value.validateField('mail', () => null)
    // }
    callback();
  }
}
function validatePassword2(rule, value, callback) {
  if (type.value === "regist" && value !== registRuleForm.password) {
    callback(new Error("两次密码不一致"));
  } else if (
    type.value === "recoverPassword" &&
    value !== recoverRuleForm.password
  ) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
}
const registRuleForm = reactive({
  username: "",
  code: "",
  password: "",
  nickName: "",
  password2: "",
});

const registRules = reactive({
  username: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { validator: validateMail, trigger: "blur" },
  ],
  code: [
    { required: true, message: "验证码不能为空", trigger: "blur" },
    { min: 6, max: 6, message: "六位数", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不可为空", trigger: "blur" },
    { min: 6, message: "最少6个字符", trigger: "blur" },
    { max: 15, message: "最多15个字符", trigger: "blur" },
  ],
  nickName: [
    { required: true, message: "昵称不能为空", trigger: "blur" },
    { min: 2, message: "最少2个字符", trigger: "blur" },
    { max: 10, message: "最多10个字符", trigger: "blur" },
  ],
  password2: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { validator: validatePassword2, trigger: "blur" },
  ],
});

// 找回密码
const recoverRuleFormRef = ref("");
const sendRecoverCodeButtonFlag = ref(false);
const codeRecoverWaitTime = ref(0);

const recoverRuleForm = reactive({
  username: "",
  code: "",
  password: "",
  password2: "",
});

const recoverRules = reactive({
  username: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { validator: validateMail, trigger: "blur" },
  ],
  code: [
    { required: true, message: "验证码不能为空", trigger: "blur" },
    { min: 6, max: 6, message: "六位数", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不可为空", trigger: "blur" },
    { min: 6, message: "最少6个字符", trigger: "blur" },
    { max: 15, message: "最多15个字符", trigger: "blur" },
  ],
  password2: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { validator: validatePassword2, trigger: "blur" },
  ],
});

// 提交
import { login, signup } from "@/api/auth";
// 处理验证码
function handleCodeClick() {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (
    !reg.test(
      type.value === "regist"
        ? registRuleForm.username
        : recoverRuleForm.username
    )
  ) {
    store.commit("showToast", {
      type: "warning",
      message: "邮箱格式不正确",
    });
    return;
  }
  if (type.value === "regist" && registRuleForm.nickName === "") {
    store.commit("showToast", {
      type: "warning",
      message: "昵称不可为空",
    });
    return;
  }
  if (type.value === "regist") {
    sendCodeButtonFlag.value = true;
    codeWaitTime.value = 60;
    const codeWaitTimeInterval = setInterval(() => {
      codeWaitTime.value--;
    }, 1000);
    setTimeout(() => {
      sendCodeButtonFlag.value = false;
      clearInterval(codeWaitTimeInterval);
    }, 60000);
    getMailCode(registRuleForm.username, registRuleForm.nickName).then(
      (res) => {
        // console.log(res)
        handleRes(
          res,
          () => {},
          () => {
            sendCodeButtonFlag.value = false;
            clearInterval(codeWaitTimeInterval);
          }
        );
      }
    );
  } else {
    sendRecoverCodeButtonFlag.value = true;
    codeRecoverWaitTime.value = 60;
    const codeRecoverWaitTimeInterval = setInterval(() => {
      codeRecoverWaitTime.value--;
    }, 1000);
    setTimeout(() => {
      sendRecoverCodeButtonFlag.value = false;
      clearInterval(codeRecoverWaitTimeInterval);
    }, 60000);
    getRecoverCode(recoverRuleForm.username).then((res) => {
      handleRes(
        res,
        () => {},
        () => {
          sendRecoverCodeButtonFlag.value = false;
          clearInterval(codeRecoverWaitTimeInterval);
        }
      );
    });
  }
}
// 回车提交
function handleFormClick(e) {
  if (store.state.model.loginModelFlag && e.key === "Enter") {
    submit(
      type.value === "login"
        ? ruleFormRef.value
        : type.value === "regist"
        ? registerRuleFormRef.value
        : recoverRuleFormRef.value
    );
  }
}
// 通用处理返回结果
function handleRes(res, successCallback = () => {}, errorCallback = () => {}) {
  if (res?.code === 20000) {
    store.commit("showToast", {
      type: "success",
      title: res.message,
    });
    successCallback();
  } else {
    // console.log(res)
    store.commit("showToast", {
      type: "error",
      title: res?.message ?? "发生错误",
    });
    errorCallback();
  }
}
// 提交
function submit(formEl) {
  if (!canSubmit.value) return; // 禁止连续提交
  canSubmit.value = false;
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 提交注册
      if (type.value === "regist") {
        signup(registRuleForm)
          .then((res) => {
            // console.log(res)
            canSubmit.value = true;
            handleRes(res, () => {
              type.value = "login";
            });
          })
          .catch(() => {
            store.commit("showToast", {
              type: "error",
              message: "系统异常",
            });
            canSubmit.value = true;
          });
      }
      // 提交登录
      else if (type.value === "login") {
        login(ruleForm.account, ruleForm.password)
          .then((res) => {
            canSubmit.value = true;
            handleRes(res, () => {
              store.commit("updateUser", { key: "isLogin", value: true });
              store.commit("updateUser", {
                key: "token",
                value: res.data.token,
              });
              store.commit("updateUser", {
                key: "nickName",
                value: res.data.nickName,
              });
              emit("login");
              store.state.model.loginModelFlag = false;
            });
          })
          .catch(() => {
            canSubmit.value = true;
          });
      } else {
        // 找回密码
        // console.log(recoverRuleForm)
        recoverPassword(recoverRuleForm)
          .then((res) => {
            canSubmit.value = true;
            handleRes(res, () => {
              type.value = "login";
            });
          })
          .catch(() => {
            store.commit("showToast", {
              type: "error",
              message: "系统异常",
            });
            canSubmit.value = true;
          });
      }
    }
  });
}
</script>

<style lang="scss" scoped>
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
