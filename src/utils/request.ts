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
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default service;
