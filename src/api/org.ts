import { IOrgInfo, IOrgList, IOrgMemberList } from '@/types/org';
import request from '../utils/request';

/**
 * 创建
 * @param organizationName
 */
export function createOrg(organizationName: string) {
  return request({
    url: `/organization`,
    method: 'post',
    data: {
      organizationName,
    },
  });
}

/**
 * 删除
 * @param id
 */
export function deleteOrg(id: number) {
  return request({
    url: `/organization/${id}`,
    method: 'delete',
  });
}

/**
 * 获取组织列表
 */
export function getOrgList(): Promise<IOrgList> {
  return request({
    url: `/organization`,
    method: 'get',
  });
}

/**
 * 获取成员列表
 * @param id
 */
// export function getMemberList(name: string): Promise<IOrgMemberList> {
//   return request({
//     url: `/organization/${name}`,
//     method: 'get',
//   });
// }

/**
 * 获取组织详细信息
 * @param id
 */
export function getOrgInfo(name: string): Promise<IOrgInfo> {
  return request({
    url: `/organization/${name}`,
    method: 'get',
  });
}

/**
 * 添加成员
 * @param name
 */
export function addMember(userId: number, organizationName: string) {
  return request({
    url: `/organization/join`,
    method: 'post',
    data: {
      userId,
      organizationName,
    },
  });
}
