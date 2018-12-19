/**
 * [getters description]
 * 动态往全局state中塞值
 * store计算属性，getters的返回值回根据他的依赖改变，重新计算
 * @type {Object}
 * author:lili
 */
import api from '@/api'
import urlHelper from '@/utils/urlHelper.js'

var getters = {
	// 判断是否登录
    isLogin:state=>{
    
	},
	keepAlive: state => state.keepAlive,
}

export default getters
