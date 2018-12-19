import HttpRequest  from '@/utils/request.js'

 function KBRequest (){
   HttpRequest.call(this)
 }
 KBRequest.prototype = Object.create(HttpRequest.prototype)
 KBRequest.prototype.constructor = KBRequest
 //这里可以根据不同规则重写
 KBRequest.prototype.callbackHandle = function(isSuccess,res,error,callback){
   if(isSuccess){
     if(res.isSuccess){
       if(callback) callback(true,res.data)
     }
     else{
       if(callback) callback(false,null,{
         errorNo:res.errorNo,
         errorMsg:res.errorMsg
       })
     }
   }
   else{
     if(callback) callback(isSuccess,null,error)
   }
 }

export default KBRequest