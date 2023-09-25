import { defineStore } from 'pinia';
import { IUserState } from '@/types/user';

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    isLogin: false,
    token: '',
    nickname: '',
    username: '',
    userId: -1,
    organizations: [],
    cost: 0,
  }),
  persist: true,
});
