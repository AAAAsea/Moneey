import request from '../utils/request'

/**
 * 注册
 */
export function signup({ username, password, code, nickName }) {
  return request({
    url: '/signup',
    method: 'post',
    data: {
      username,
      password,
      code,
      nickName
    },
  });
}

/**
 * 登录
 */
export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}


