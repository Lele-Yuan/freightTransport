// 与业务无关，公共需要调用的辅助js文件

// 动态在页面中添加需要的js外链
function pageAddScript(url,isAsync=true) {
  var addScriptUrl = document.createElement('script');
  if(isAsync){
    addScriptUrl.async = 1
  }
  addScriptUrl.setAttribute('src', url);
  document.body.appendChild(addScriptUrl);
  return addScriptUrl
}
/**
 * 日期格式化
 * @param    {Date}     date 日期
 * @param    {String}   fmt  格式
 * @return   {String}
 * @Author   zhanglw
 * @DateTime 2017-09-19
 */
export function dateFormat(date,fmt){
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;
}
 //检查号码是否符合规范，包括长度，类型
export function isCard(card)
   {
   //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
   var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
   if(reg.test(card) === false)
   {
   return false;
   }
   return true;
   };

var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
       21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
       33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
       42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
       51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
       63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
       };
   //取身份证前两位,校验省份
export function checkProvince(card)
   {
   var province = card.substr(0,2);
   if(vcity[province] == undefined)
   {
   return false;
   }
   return true;
   };

   //检查生日是否正确
export function checkBirthday(card)
   {
   var len = card.length;
   //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
   if(len == '15')
   {
   var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
   var arr_data = card.match(re_fifteen);
   var year = arr_data[2];
   var month = arr_data[3];
   var day = arr_data[4];
   var birthday = new Date('19'+year+'/'+month+'/'+day);
   return verifyBirthday('19'+year,month,day,birthday);
   }
   //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
   if(len == '18')
   {
   var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
   var arr_data = card.match(re_eighteen);
   var year = arr_data[2];
   var month = arr_data[3];
   var day = arr_data[4];
   var birthday = new Date(year+'/'+month+'/'+day);
   return verifyBirthday(year,month,day,birthday);
   }
   return false;
   };

   //校验日期
export function verifyBirthday(year,month,day,birthday)
   {
   var now = new Date();
   var now_year = now.getFullYear();
   //年月日是否合理
   if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
   {
   //判断年份的范围（3岁到100岁之间)
   var time = now_year - year;
   if(time >= 3 && time <= 100)
   {
   return true;
   }
   return false;
   }
   return false;
   };

   //校验位的检测
export function checkParity(card)
   {
   //15位转18位
   card = changeFivteenToEighteen(card);
   var len = card.length;
   if(len == '18')
   {
   var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
   var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
   var cardTemp = 0, i, valnum;
   for(i = 0; i < 17; i ++)
   {
   cardTemp += card.substr(i, 1) * arrInt[i];
   }
   valnum = arrCh[cardTemp % 11];
   if (valnum == card.substr(17, 1))
   {
   return true;
   }
   return false;
   }
   return false;
   };

   //15位转18位身份证号
export function changeFivteenToEighteen (card)
   {
   if(card.length == '15')
   {
   var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
   var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
   var cardTemp = 0, i;
   card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
   for(i = 0; i < 17; i ++)
   {
   cardTemp += card.substr(i, 1) * arrInt[i];
   }
   card += arrCh[cardTemp % 11];
   return card;
   }
   return card;
   };  

// 身份证号验证 
export function isIdCard(code){
    var card =code.toUpperCase();
        //是否为空
        if(card === '')
        {
          return false;
        }
        //校验长度，类型
          if(isCard(card) === false)
        {
        return false;
        }
        //检查省份
          if(checkProvince(card) === false)
        {
        return false;
        }
        //校验生日
        /*if(checkBirthday(card) === false)
        {
        return false;
        }*/
        //检验位的检测
          if(checkParity(card) === false)
        {
        return false;
        }
        return true;
}
// 根据身份证Id 取生日
export function getBirthday(cardid) {
  return cardid.substr(6, 4) + "-" + cardid.substr(10, 2) + "-" + cardid.substr(12, 2);
}
// 根据身份证Id 取性别
export function getSex(cardid) {
  if (parseInt(cardid.substr(16, 1)) % 2 == 1) {
    return 1; // 男
  } else {
    return 2; // 女
  }
}
// 根据身份证Id 取年龄
// cardid 身份证id， insureTime 投保时间，jiedian 计算节点, flag 生日当天是前一岁还是后一岁
export function getAge(cardid, insureTime, jiedian, flag) {
  var year = cardid.substr(6, 4);
  var now2 = new Date();
  if (typeof insureTime == 'string' && jiedian == '1') {
    insureTime = insureTime.replace(/-/g, "/")
    now2 = new Date(insureTime)
  }
  if (flag == '1') { // 生日当天算前一天
    now2.setDate(now2.getDate() - 1)
  }
  var temp = now2.getFullYear() - parseInt(year);
  // console.log(temp,parseInt(now2.getFullYear() + cardid.substr(10, 4)),parseInt(dateFormat(now2, "yyyyMMdd")))
  if (parseInt(now2.getFullYear() + cardid.substr(10, 4))>parseInt(dateFormat(now2, "yyyyMMdd"))) {
      return temp - 1;
  } else {
      return temp;  
  }
}
export default{
  pageAddScript,
}