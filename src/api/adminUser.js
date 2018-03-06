import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/a/user',
    method: 'get',
    params
  })
}
