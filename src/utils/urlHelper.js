// 用于操作url的公共方法文件

// 根据key值，获取指定query的value
function queryString(key){
    return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
}

/* 
* url 目标url 
* arg 需要替换的参数名称 
* arg_val 替换后的参数的值 
* return url 参数替换后的url 
*/ 
function changeURLArg(url,arg,arg_val){ 
    var pattern=arg+'=([^&]*)'; 
    var replaceText=arg+'='+arg_val; 
    if(url.match(pattern)){ 
        var tmp='/('+ arg+'=)([^&]*)/gi'; 
        tmp=url.replace(eval(tmp),replaceText); 
        return tmp; 
    }else{ 
        if(url.match('[\?]')){ 
            return url+'&'+replaceText; 
        }else{ 
            return url+'?'+replaceText; 
        } 
    } 
    return url+'\n'+arg+'\n'+arg_val; 
}

//删除url参数
function delParam(url,paramKey){
    var urlParam = url.substr(url.indexOf("?")+1);
    var beforeUrl = url.substr(0,url.indexOf("?"));
    var nextUrl = "";
     
    var arr = new Array();
    if(urlParam!=""){
        var urlParamArr = urlParam.split("&");
      
        for(var i=0;i<urlParamArr.length;i++){
            var paramArr = urlParamArr[i].split("=");
            if(paramArr[0]!=paramKey){
                arr.push(urlParamArr[i]);
            }
        }
    }
     
    if(arr.length>0){
        nextUrl = "?"+arr.join("&");
    }
    url = beforeUrl+nextUrl;
    return url;
}

export default{
	queryString,
	changeURLArg,
	delParam
}