import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
// Loading
import { getToken } from '@/utils/token'

// 添加请求拦截器
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  withCredentials: true,
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log(config)
    if (store.getters.token) config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
    }
    // 500:非法的token; 512:其他客户端登录了;  514:Token 过期了;
    if (res.code === 500 || res.code === 512 || res.code === 514) {
      MessageBox.confirm(
        '获取信息失败，服务器连接出现错误',
        '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }

    return response
  },
  error => {
    if (error.stack.includes('timeout')) {
      Message({
        message: '服务器响应时间超时！请确保网络环境通畅后重试！',
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      Message({
        message: error.msg || error,
        type: 'error',
        duration: 3 * 1000
      })
    }
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

export default instance
