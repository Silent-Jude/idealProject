import request from '@/utils/request'

export const login = ({ uname, upwd }) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      uname,
      upwd
    }
  })
}

export function logout (params) {
  return request({
    url: '/user/logout',
    method: 'get',
    params
  })
}

export function getInfo (params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}
