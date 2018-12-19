/**
 * [mutations description]
 * 更改store中状态的唯一方法就是提交mutation
 * @type {Object}
 */
import getters from './getters'
import urlHelper from '@/utils/urlHelper.js'
const UPDATE_DIRECTION = 'UPDATE_DIRECTION' /*更新路由方向*/
const mutations = {
  setHeaderTitle(state,title){
    state.headerTitle = title
  },
  setHost(state,data){
    state.host = data
  },
  setUserId(state,data){
  	state.userId = data
  },
  setToken(state,data){
    state.token = data
  },
}

export default mutations