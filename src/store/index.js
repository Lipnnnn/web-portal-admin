import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isGetterRoutes: false,
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    changeGetterRoutes(state,value){
      state.isGetterRoutes = value;
    },
    // 存储用户信息
    changeUserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    // 清空用户信息
    clearUserInfo(state,value){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  // 持久化配置
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return { 
        userInfo: val.userInfo  // 只储存state中的userInfo
      }
    }
  })]
})
