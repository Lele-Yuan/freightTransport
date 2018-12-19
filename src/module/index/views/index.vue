<template>
	<div>
		<my-header></my-header>
		<el-carousel indicator-position="outside" :autoplay="false">
			<el-carousel-item v-for="item in 4" :key="item">
				<el-tabs type="border-card">
					<el-tab-pane label="空运跟踪">
						<div class="demo-input-suffix input-inner">
							<div>主单号</div>
							<el-input placeholder="主单号1" v-model="queryMainParam.input1" clearable></el-input>
							<el-input placeholder="主单号2" v-model="queryMainParam.input2" clearable></el-input>
							<el-button type="primary" @click="queryMain">查询</el-button>
						</div>
					</el-tab-pane>
					<el-tab-pane label="快递专线跟踪">快递专线跟踪</el-tab-pane>
					<el-tab-pane label="海运跟踪">海运跟踪</el-tab-pane>
					<el-tab-pane label="铁路跟踪">铁路跟踪</el-tab-pane>
					<el-tab-pane label="国际航线跟踪">国际航线跟踪</el-tab-pane>
				</el-tabs>
			</el-carousel-item>
		</el-carousel>

		<div class="row">
			<div class="col-md-6 newscard">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>航线特价</span>
						<el-button type="text" style="float: right; padding: 3px 0">更多</el-button>
					</div>
					<div v-for="o in 4" :key="o">
						航线特价+{{o}}
					</div>
				</el-card>
			</div>
			<div class="col-md-6 newscard">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>航线特价</span>
						<el-button type="text" style="float: right; padding: 3px 0">更多</el-button>
					</div>
					<div v-for="o in 4" :key="o">
						航线特价+{{o}}
					</div>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import MyHeader from '@/common/myHeader'
	import api from '@/api'

	export default {
		data(){
			return{
				queryMainParam:{
					input1: '',
					input2: ''
				}
			}
		},
		watch:{
			
		},
		created(){
			let _this = this;
			const loading = _this.$loading(true)
			api.getTest(function(success,data,err){
            	loading.close();
	            if(success) {
	                if(data.status == 200 && data.body) {
	                    _this.signIndexData = data.body;
	                }else{
	                	_this.$alertbox()
	                }
	            }
	        })
		},
		mounted(){
		},
		methods:{
			queryMain() {
				let _this = this;
				_this.$message(_this.queryMainParam.input1+'-'+_this.queryMainParam.input2)
			}
		},
		components: {MyHeader},
		computed:{
	    	...mapState({
		       userId: 'userId',
		       token: 'token',
		    }),
		},
	}
</script>

<style>
	.el-carousel__container{
		height: 2rem;
	}
	.input-inner .el-input{
		width: 3rem;
		margin-bottom: .1rem;
		padding: .15rem;
		border-radius: 
	}
	.newscard{
		margin-top: .15rem;
	}
</style>