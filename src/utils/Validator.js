/**
 * validator模块提供正则校验规则
 * 错误的返回true 正确的返回false
 */
let Vd = {};

function isObject(value) {
	return value !== null && typeof value === 'object';
};
Vd.required = function (value) {// 非空
	if(!value || null == value || undefined == value || "" == value.trim()){
		return true;
	}
	return false;
};

Vd.integer = function integer(value) {
	var regex = /^-?\d*$/;
	if (!regex.test(value)) {
		return true;
	}
	return false;
};
Vd.float = function float(value) {
	var regex = /^[+|-]?\d*\.?\d*$/;
	if (!regex.test(value)) {
		return true;
	}
	return false;
};
Vd.number = function number(value) {//数字
	if (!isNaN(value)) {
		return false;
	}
	return true;
};
Vd.name = function name(value) {//中文名字
	var regex = /^[\u4E00-\u9FA5]{1,20}$/;
	if (!regex.test(value)) {
		return true;
	}
	return false;
};
Vd.email = function email(value) {// 邮箱
	var regex = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if (!regex.test(value)) {
		return true;
	}
	return false;
};
Vd.mobile = function mobile(value) {// 手机
	var regex = /^1\d{10}$/;
	if (!regex.test(value)) {
		return true;
	}
	return false;
};
Vd.mobileCode = function mobileCode(value) {//6位验证码
	var regex = /^\d{6}$/;
	if (!regex.test(value)) {
		return true;
	}
	return false;
};
Vd.password = function password(value) {// 密码
	var regex = /^[a-zA-Z0-9!@`~#$%^&*()_+-=\|;':",.<>?]{6,18}$/;
	if (!regex.test(value)) {
		return true;
	}
	return false;
};
Vd.idcard = function idcard(value) {// 身份证
	var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	if(!reg.test(value)) {
		return true;
	}
	return false;
};
Vd.equals = function (value, baseVal) {
	if (value != baseVal) {
		return true;
	}
	return false;
};
Vd.blank = function (value) {//校验是否含有空格
	var regex = /^(\s+)|(\\s+)$/g;
	if (!regex.test(value)) {
		return true;
	}
	return false;
};
Vd.ChineseChar = function ChineseChar(value) {//是否含有中文（也包含日文和韩文）
	var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
	return reg.test(value);
};
export default Vd;
