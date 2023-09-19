import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Detail from '@/views/Detail.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Settings from '@/views/Settings.vue';
import Organization from '@/components/Organization.vue';

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
    {
      path: '/settings',
      component: Settings,
      children: [
        {
          path: 'organizations',
          component: Organization
        }
      ]
    },
  ],
});
