import request from '@/utils/request'

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post',
    params: {}
  })
}

export function queryMoments (params) {
  return request({
    url: '/',
    method: 'post',
    params
  })
}
