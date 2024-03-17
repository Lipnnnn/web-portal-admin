import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
  },
  // plugins: [createPersistedState()],
})
