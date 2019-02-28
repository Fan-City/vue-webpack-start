import { login1,login2 } from '@/api/login';

const user = {
  state: {
    token: 'user',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },

  actions: {
    // 登录
    Login1({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login1(username, userInfo.password).then(response => {
          commit('SET_TOKEN', response.data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Login2({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login2(username, userInfo.password).then(response => {
          commit('SET_TOKEN', response.data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user
