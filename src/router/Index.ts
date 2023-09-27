import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/views/Home.vue');
const Detail = () => import('@/views/Detail.vue');
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Settings = () => import('@/views/Settings.vue');
const History = () => import('@/views/History.vue');
const Organization = () => import('@/components/Organization.vue');
const OrganizationList = () => import('@/components/OrganizationList.vue');
const OrganizationDetail = () => import('@/components/OrganizationDetail.vue');
const Profile = () => import('@/components/Profile.vue');

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
      path: '/detail/:organizationName',
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
          path: 'profile',
          component: Profile,
        },
        {
          path: '',
          redirect: '/settings/profile',
        },
        {
          path: 'organization',
          component: Organization,
          children: [
            {
              path: 'list',
              component: OrganizationList,
            },
            {
              path: '',
              redirect: '/settings/organization/list',
            },
            {
              path: ':name',
              component: OrganizationDetail,
            },
          ],
        },
      ],
    },
    {
      path: '/history',
      component: History,
    },
  ],
});
