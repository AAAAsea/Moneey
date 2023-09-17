import {
  IAddRecordParams,
  IBaseDayData,
  IPieChartDataItem,
  IRecordData,
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
export function getList(): Promise<IRecordData> {
  return request({
    url: '/record',
    method: 'get',
  });
}
/**
 * 查询某一年
 */
export function getListPerYear(year: number): Promise<[string, number][]> {
  return request({
    url: `/record/year/${year}`,
    method: 'get',
  });
}
/**
 * 查询每一天
 */
export function getListPerDay(): Promise<IBaseDayData[]> {
  return request({
    url: `/record/day`,
    method: 'get',
  });
}
/**
 * 根据类别分组查询
 */
export function getListPerCategory(): Promise<IPieChartDataItem[]> {
  return request({
    url: `/record/category`,
    method: 'get',
  });
}
/**
 * 根据tag分组查询
 */
export function getListPerTag(): Promise<IPieChartDataItem[]> {
  return request({
    url: `/record/tag`,
    method: 'get',
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
