import { IBaseUserInfo, IRegisterParams, IUserProfile } from '@/types/user';
import request from '../utils/request';

/**
 * 注册
 */
export function register(data: IRegisterParams): Promise<IBaseUserInfo> {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  });
}

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export function login(username: string, password: string): Promise<IBaseUserInfo> {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

/**
 * 获取用户信息
 */
export function getUserInfo(): Promise<IUserProfile> {
  return request({
    url: '/user/profile',
    method: 'get',
  });
}
