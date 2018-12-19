<template>
	<div>
		<my-header></my-header>
		我的账户
		
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import MyHeader from '@/common/myHeader'
	import api from '@/api'

	export default {
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
		components: {MyHeader},
		computed:{
	    	...mapState({
		       userId: 'userId',
		       token: 'token',
		    }),
		},
	}
</script>

<style scoped>

</style>