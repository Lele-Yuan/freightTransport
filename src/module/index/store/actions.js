import urlHelper from '@/utils/urlHelper.js'
import api from '@/api'

/*
* 路由访问，全局控制的内容
* action类似于mutation，不同在于
* action提交的事mutation，而不是直接的变更状态
* action中可以包含任意异步操作
* author:lili
*/
var actions = {
	init({state,commit,getters}){
		commit('setUserId',urlHelper.queryString('userId'));
		commit('setToken',urlHelper.queryString('token')||urlHelper.queryString('Token'));		// 保存token
		commit('setHost',h5config);
	}
}

export default actions