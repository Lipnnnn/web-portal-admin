import { createStore } from 'vuex'

export default createStore({
  state: {
    isGetterRoutes: false
  },
  getters: {
  },
  mutations: {
    changeGetterRoutes(state,value){
      state.isGetterRoutes = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
