// import Vue from 'vue'
import { createStore } from 'vuex'
import { getItem, setItem } from '@/utils/storage'

const TOKEN_KEY = 'TOUTIAO_USER'

// Vue.use( createStore )
export default createStore({
  state: {
    user:getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state,data){
      state.user = data
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
