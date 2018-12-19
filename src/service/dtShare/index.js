import appJs from './../appAccess.js'
import api from '@/api'
import helper from '@/utils/helper.js'
// h5分享参数：分享标题，分享描述，分享链接，分享图片
function h5ShareJs(share_title, share_desc, share_link, share_img, isNeedShareLink){

	helper.pageAddScript('https://res.wx.qq.com/open/js/jweixin-1.0.0.js');
	helper.pageAddScript('static/share/qqShare.js')

    let new_share_link = window.location.href;
	api.getShareAppid({'shareUrl':new_share_link},function(isSuccess,data,err){
		wx.config({
            debug: false,
            appId: data.body.appId,
            timestamp: data.body.timestamp,
            nonceStr: data.body.nonceStr,
            signature: data.body.sign,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
        });
        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
                success: function (res) {
                    var checkResult = res.checkResult;
                    if (!checkResult.onMenuShareTimeline || !checkResult.onMenuShareAppMessage) {
                        //alert("您当前浏览器不支持分享，请尝试其他浏览器打开");
                        //window.close();
                    }
                }
            });
            var funcObj = {
                title: share_title, // 分享标题
                desc: share_desc, // 分享描述
                link: isNeedShareLink ? share_link : window.location.href,
                imgUrl: share_img,
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '',
                success: function () {}
            };
            wx.onMenuShareTimeline(funcObj);
            wx.onMenuShareAppMessage(funcObj);
            wx.onMenuShareQQ(funcObj);
            wx.onMenuShareQZone(funcObj);
        });
        wx.error(function (res) {
            // alert(res)
        });
        //QQ分享
        setShareInfo({
            title: share_title,
            summary: share_desc, 
            url: isNeedShareLink ? share_link : window.location.href,
            pic: share_img
        });
	})
}

export default{
	showAppShareButton,
	h5ShareJs
}