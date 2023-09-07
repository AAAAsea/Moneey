import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Detail from '@/views/Detail.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/detail',
      component: Detail,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
  ],
});
