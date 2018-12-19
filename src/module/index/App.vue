<template>
	<div id="app">
		<!-- <kbHeader v-if="isShowHeader" :title="headerTitle"/> -->
		<!-- 如果是app内打开&&系统是iphonex&&使用app的头，需要上面空出24px -->
		<!-- <div v-else v-show='isAppOpen && isIphoneX' class="iphonex-css"></div> -->
    <!-- :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" -->
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import Vue from "vue"
	export default {
		name: "App",
		data() {
			return {}
		},
		components: {},
		computed: {
			...mapState({
				direction: state => state.direction,
			}),
			keepAlive () {
				return this.$store.getters.keepAlive
			}
		},
	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		-webkit-overflow-scrolling: touch;
		-webkit-tap-highlight-color: transparent;
		font-family: arial;
		-webkit-user-select: none;
	}

	html {
		font-family: arail;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		line-height: 1;
		font-size: 20px;
		height: 100%;
		overflow-x: hidden;
	}

	body {
		position: relative;
		overflow-x: hidden;
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	ul,
	ol {
		list-style: none;
	}

	a {
		text-decoration: none;
		outline: none;
	}

	.vux-pop-out-enter-active,
	.vux-pop-out-leave-active,
	.vux-pop-in-enter-active,
	.vux-pop-in-leave-active {
		will-change: transform;
		transition: all 0.3s;
		position: absolute;
		width: 100%;
		left: 0;
	}

	.vux-pop-out-enter {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}

	.vux-pop-out-leave-active {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}

	.vux-pop-in-enter {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}

	.vux-pop-in-leave-active {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}
</style>
