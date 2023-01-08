import { createStore } from 'vuex'
import state from './state';
import actions from './actions';
import mutations from './mutations';
import saveToLocalStorage from './plugins/saveToLocalStorage';

// 插件
const plugins = [saveToLocalStorage]

export default createStore({
  state,
  mutations,
  actions,
  plugins
});
