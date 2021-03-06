import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password,
      type: 1
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/a/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/a/user/logout',
    method: 'post'
  })
}
