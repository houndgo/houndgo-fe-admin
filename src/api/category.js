import request from '@/utils/request'

export function CategoryListGet(params) {
  return request({
    url: '/category',
    method: 'get',
    params
  })
}

export function CategoryUpdate(data) {
  return request({
    url: '/admin/a/category',
    method: 'put',
    data
  })
}
