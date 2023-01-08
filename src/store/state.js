export default {
  data: {
    types: [],
    tags: [],
    ...JSON.parse(localStorage.getItem('data'))

  },
  model: {
    loginModelFlag: false,
    historyModelFlag: false,
    settingsModelFlag: false,
    formModelFlag: false,
    modelWidth: '40%',
  },
  user: {
    isLogin: false,
    token: '',
    nickName: '',
    ...JSON.parse(localStorage.getItem('user'))
  },
  settings: {
    lang: 'zh-CN',
    theme: 'light',
    autoFold: true,
    topSticky: true,
    autoHide: false,
    shadow: true,
    ...JSON.parse(localStorage.getItem('settings'))
  },
}