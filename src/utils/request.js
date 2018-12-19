const axios = require('axios');
let HttpRequest = function (){}
HttpRequest.prototype.postRequest = function(url,data,callback,header,timeout){
  if (!header) {header = {}}
  if (timeout) {
    axios.defaults.timeout = timeout
  } else {
    axios.defaults.timeout =  100000;
  }
  this.httpHandle(url,data,callback,header,'post')
}

HttpRequest.prototype.getRequest = function(url,data,callback,header,timeout){
  if (!header) {header = {}}
  if (timeout) {
    axios.defaults.timeout = timeout
  } else {
    axios.defaults.timeout =  100000;
  }
  this.httpHandle(url,data,callback,header,'get')
}

//中间件处理
HttpRequest.prototype.callbackHandle = function(isSuccess,res,error,callback){
  callback(isSuccess,res,error)
}

HttpRequest.prototype.httpHandle = function(url,data,callback,header,type){
  this.http(url,data,(isSuccess,data,error)=>{
    this.callbackHandle(isSuccess,data,error,callback)
  },header,type)
}

HttpRequest.prototype.http = function(url,params,callback,header,type){
  console.log('http:',url,params)
  
  axios({ method: type, url: url, headers:header, data: params})
    .then(res=>{
      console.log('http-callback',url,res)
      if(callback) callback(true,res.data)
    }).catch(err=>{
        console.log('http-post-callback error',url,err)
        if(callback) callback(false,null,{errorNo:-1,errorMsg:err.message})
    })
}
// this.$store.state.requests.push(source)
export default HttpRequest