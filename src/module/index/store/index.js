import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    host: '',
    headerTitle: ' ',
    userId: "",       //用户登录标志
    token: "",        // token
  },
  getters,
  mutations,
  actions
})

export default store