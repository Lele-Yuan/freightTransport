/*
* 访问接口存放位置
*/
import KBRequest from './kbRequest.js';
import HttpRequest from '@/utils/request.js';

let operate = h5config;


let apiData = {
	test: '/mock/test.json',


}
//http是重写过的规则；
//原始规则在httpRequest中
let http = new KBRequest()
let httpRequest = new HttpRequest()

function test(params, callback){
	httpRequest.postRequest(apiData.test, params, callback)
}
function getTest(callback) {
	httpRequest.getRequest(apiData.test, null, callback)
}
export default {
	apiData,
	getTest,
}
