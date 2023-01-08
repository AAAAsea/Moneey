import request from '../utils/request'
/**
 * 新增
 */
export function add({ name, date, cost, type, content }) {
  return request({
    url: '/add',
    method: 'post',
    data: {
      name,
      date,
      cost,
      type,
      content
    },
  });
}

/**
 * 查询
 */
export function getList() {
  return request({
    url: '/',
    method: 'get',
    data: {
    },
  });
}

/**
 * 删除
 */
export function deleteList(id) {
  return request({
    url: '/delete',
    method: 'post',
    data: {
      id
    },
  });
}