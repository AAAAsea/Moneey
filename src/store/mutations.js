  import { ElMessage } from 'element-plus';
  import 'element-plus/theme-chalk/el-message.css'; // 需要单独引入

export default {
  updateData(state, { key, value }) {
    // console.log(key, value)
    state.data[key] = value;
  },
  updateUser(state, { key, value }) {
    // console.log(key, value)
    state.user[key] = value;
  },
  updateModel(state, { key, value }) {
    // console.log(key, value)
    state.model[key] = value;
  },
  updateSettings(state, { key, value }) {
    // console.log(key, value)
    state.settings[key] = value;
  },
  showToast(state, payload){
    payload.message = payload.message ?? payload.title
    ElMessage({
      'show-close': true,
      offset: 40,
      ...payload
    })
  },
}