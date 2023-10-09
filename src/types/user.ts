import { ROLE } from '@/constants/org';

export interface IBaseUserInfo {
  userId: number;
  nickname: string;
  username: string;
}

export interface IOrganization {
  id: number;
  name: string;
  createTime: string;
  cost: number;
  role: ROLE;
  updateTime: string;
}

export type Organizations = IOrganization[];

export interface IUserState extends IBaseUserInfo {
  isLogin: boolean;
  token: string;
  organizations: Organizations;
  cost: number;
  updateTime: string;
}

export interface IUserProfile extends IBaseUserInfo {
  cost: number;
  updateTime: string;
  organizations: Organizations;
}

export interface IRegisterParams {
  username: string;
  password: string;
  nickname: string;
}

export type IBaseUserList = IBaseUserInfo[];
