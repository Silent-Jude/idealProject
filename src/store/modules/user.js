import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/token'

const user = {
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USERINFO (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登陆
    async Login ({ commit }, userInfo) {
      try {
        const res = await login(userInfo)
        setToken(res.data.token)
        commit('SET_TOKEN', res.data.token)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取用户信息
    async GetInfo ({ commit, state }) {
      try {
        const res = await getInfo(state.token)
        commit('SET_USERINFO', res.data)
      } catch (err) {
        console.log(err)
      }
    },
    // 接口登出
    async LogOut ({ commit, state }) {
      try {
        await logout(state.token)
        commit('SET_TOKEN', '')
        removeToken()
      } catch (err) {
        console.log(err)
      }
    },
    // 前端登出
    async FedLogOut ({ commit }) {
      commit('SET_TOKEN', '')
      removeToken()
    }

  }
}

export default user
