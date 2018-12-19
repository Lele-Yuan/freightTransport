<template lang="html">
	<div class="wrap">
		<header class="header">
			<div class="logo-wrap">
				<img src="../assets/images/common/logo.png">
				<div class="title">国际货代专家</div>
			</div>
			<div class="user">
				<div class="item login">登录</div>
				<div class="item register">注册</div>
				<div class="item en">English</div>
			</div>
		</header>
		<nav class="navbar navbar-default" role="navigation">
		    <div class="navbar-header">
		        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		        </button>
		    </div>
		    <div class="collapse navbar-collapse" id="example-navbar-collapse">
		        <ul class="nav navbar-nav">
					<li><router-link to="/" class="nav-item">网站首页</router-link></li>
					<li><router-link to="/price" class="nav-item">运价查询</router-link></li>
					<li><router-link to="/service" class="nav-item">服务工具</router-link></li>
					<li><router-link to="/trace" class="nav-item">货物跟踪</router-link></li>
					<li><router-link to="/news" class="nav-item">行业新闻</router-link></li>
					<li><router-link to="/circle" class="nav-item">货代圈</router-link></li>
					<li><router-link to="/exchange" class="nav-item">兑换中心</router-link></li>
					<li><router-link to="/account" class="nav-item">我的账户</router-link></li>
		        </ul>
		    </div>
		</nav>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import router from '../module/index/router/index'

export default{
	props:{
		title:[String],
	},
	data(){
		return{
			
		}
	},
	watch:{
		
	},
	created(){
	},
	mounted(){
	},
	computed:{
    	...mapState({
	       userId: 'userId',
	       token: 'token',
	    }),
	},
	methods:{
		
	}
}
</script>

<style  lang="scss">
$gray: #999;
.wrap{
	background: url(../assets/images/common/head_bg.png) no-repeat;
	background-size: cover;
	background-position: left top;
}
.header{
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: .15rem 0;
	.logo-wrap{
		display: flex;
		justify-content: center;
		align-items: flex-end;
		height: .5rem;
		img{
			height: .5rem;
			width: auto;
		}
		.title{
			margin-left: .1rem;
			color: $gray;
			font-size: .24rem;
		}
	}
	.user{
		display: flex;
		align-items: flex-end;
		font-size: .14rem;
		color: $gray;
		.item{
			float: left;
			padding: 0 .1rem;
			border-right: .01rem solid $gray;
			&:last-child{
				border-right: none;
			}
		}
	}
}
.navbar{
	border: none;
	background: transparent;
}
.navbar-toggle{
	background-size: $gray;
}
@media (min-width: 768px){
	.navbar{
		font-size: .2rem;
		display: flex;
		flex-wrap: wrap;
		height: .4rem;
		align-items: center;
		justify-content: flex-end;
	}
}
.nav>li>a{
	color: $gray;
}
.nav>li>a:focus, .nav>li>a:hover{
	background: transparent;
}
.nav>li>a.router-link-exact-active{
	color: #000;
	font-weight: bold;
}
</style>