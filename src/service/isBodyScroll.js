// 弹窗点开后，禁止下面的body页面进行滚动
// 只需要点开时候把body的position设置为fixed即可
// 关闭弹窗的时候打开即可
function setBodyScroll(isbodyScroll, scrollTop){
	if (isbodyScroll) {
		document.body.style.cssText += 'position:fixed;top:-'+scrollTop+'px;left:0;right:0;';
	}else{
		var body = document.body;
		body.style.position = '';
		var top = body.style.top;
		document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
		body.style.top = '';
	}
}

export default{
	setBodyScroll,
}