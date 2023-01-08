import axios from 'axios'
import store from '@/store'

axios.defaults.retry = 3;
async function request(url, options) {
  // 创建 axios 实例
  const service = axios.create({
    baseURL: "/list", // api base_url
    timeout: 6000 // 请求超时时间 
  });
  // 请求拦截
  service.interceptors.request.use(config => {
    // 这里可设置请求头等信息
    if (options && options.body) {
      config.data = options.body;
    }
    const token = store.state.user.token;
    config.headers.Authorization = token;
    return config;
  });
  // 返回拦截
  service.interceptors.response.use(response => {
    // 这里可进行返回数据的格式化等操作
    return response.data;
  });
  return service(url, options);
}
export default request;
