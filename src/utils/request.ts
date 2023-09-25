import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 6000, // 请求超时时间
});

// 请求拦截
service.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;
  config.headers.Authorization = token;
  return config;
});

// 返回拦截
service.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      ElMessage.success(response.data.message);
    }
    return response.data;
  },
  (error) => {
    console.log(error);
    if (error.response.data.message) {
      ElMessage.error(error.response.data.message);
    }
    if (error.response.status === 401) {
      location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default service;
