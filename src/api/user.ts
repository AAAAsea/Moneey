import { IBaseUserList } from '@/types/user';
import request from '../utils/request';

/**
 * 注册
 */
export function getListByUserName(username: string): Promise<IBaseUserList> {
  return request({
    url: `/user/${username}`,
    method: 'get',
  });
}
