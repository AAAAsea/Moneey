import {
  IAddRecordParams,
  IBaseDayData,
  IPieChartDataItem,
  IRecordData,
  IUserRecordData,
} from '@/types/data';
import request from '../utils/request';
/**
 * 新增
 */
export function addRecord(data: IAddRecordParams) {
  return request({
    url: '/record',
    method: 'post',
    data,
  });
}

/**
 * 查询
 */
export function getList(organizationName?: string): Promise<IRecordData> {
  return request({
    url: '/record',
    method: 'get',
    params: {
      organizationName,
    },
  });
}

/**
 * 查询某一年
 */
export function getListPerYear(
  year: number,
  organizationName?: string
): Promise<[string, number][]> {
  return request({
    url: `/record/year/${year}`,
    method: 'get',
    params: {
      organizationName,
    },
  });
}
/**
 * 查询每一天
 */
export function getListPerDay(
  organizationName: string
): Promise<IBaseDayData[]> {
  return request({
    url: `/record/day`,
    method: 'get',
    params: {
      organizationName,
    },
  });
}
/**
 * 根据类别分组查询
 */
export function getListPerCategory(
  organizationName?: string
): Promise<IPieChartDataItem[]> {
  return request({
    url: `/record/category`,
    method: 'get',
    params: {
      organizationName,
    },
  });
}
/**
 * 根据tag分组查询
 */
export function getListPerTag(
  organizationName: string
): Promise<IPieChartDataItem[]> {
  return request({
    url: `/record/tag`,
    method: 'get',
    params: {
      organizationName,
    },
  });
}
/**
 * 根据user分组查询
 */
export function getListPerUser(
  organizationName: string
): Promise<IUserRecordData> {
  return request({
    url: `/record/person`,
    method: 'get',
    params: {
      organizationName,
    },
  });
}
/**
 * 删除
 */
export function deleteRecord(id: number) {
  return request({
    url: `/record/${id}`,
    method: 'delete',
  });
}
