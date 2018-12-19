<template lang="html">
	<transition name="slider">
		<div class="slider-block" v-show="slider.show" @click="close" @touchmove="move">
			<div v-show="slider.isNeedMask" class="slider-mask-block" @click="close"></div>
			<div class="slider-container" :class="getAnimationDirect">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>
<script>
/*
*slider:{show,isNeedMask}
*show控制弹窗是否显示
*isNeedMask控制弹窗是否需要遮罩层
*animationDirect控制弹层弹出的方向
*z-bottomToTop：从下往上
*z-rightToLeft：从右往走
*/
import isBodyScroll from '@/service/isBodyScroll.js'
export default{
	props:{
		slider:{
	      type: Object,
	      default:{
	        show:false,
	        isNeedMask: false
	      }
	    },
	    animationDirect:{
	    	type: String,
      		default: '' 
	    },
	    // 是否需要点击关闭弹层
        isModalToClose: {
	      type: Boolean,
	      default: false
	    },
	    //当前slider的弹窗是否存在miniRefresh滚动
	    isIncludMiniRefresh: {
	    	type: Boolean,
	    	default: false
	    },
	    // 移动禁止，如果当前页面弹层里面不存在滚动得内容，该属性可是设置为true，背景图片就不会动
	    isTouchMovePrevent: {
	    	type: Boolean,
	    	default: false
	    }
	},
	computed:{
		getAnimationDirect(){
			var animation = ''
		    switch (this.animationDirect) {
		        case 'bottomToTop':
		          animation = 'z-bottomToTop'
		          break;
		        case 'rightToLeft':
		          animation = 'z-rightToLeft'
		          break;
		        default:
		          animation = ''
		    }
		    return animation
		}
	},
	methods:{
		close(){
			if (this.isModalToClose) {
				this.slider.show = false;
			}
			
		},
		move(e){
			if (this.isTouchMovePrevent) {
				e.preventDefault();
			}
		}
	},
	watch:{
		'slider.show': function(visible){
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			if (!this.isTouchMovePrevent) {
				
				if (visible) {
				
					if (this.isIncludMiniRefresh) {
						this.$store.state.miniRefresh.refreshOptions({down:{isLock: true},up:{isLock: true}});
					}else{
						isBodyScroll.setBodyScroll(true, scrollTop);
					}
				}else{
					
					if (this.isIncludMiniRefresh) {
						this.$store.state.miniRefresh.refreshOptions({down:{isLock: false},up:{isLock: false}});
					}else{
						isBodyScroll.setBodyScroll(false, scrollTop)
					}
				}
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.slider-block{
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity .3s ease;
}
.slider-mask-block{
	position: absolute;
	width: 100%;
	height: 100%;
	transition: opacity .3s ease;
	background-color: rgba(0, 0, 0,.7);
}
.slider-container{
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  margin: 0px auto;
	  transform-style: preserve-3d;
	  backface-visibility: hidden;
	  transition: all .3s ease;
}

/* vue transition animataion begin */

.slider-enter .slider-mask-block, .slider-leave-active .slider-mask-block{
	opacity:0
}
// x,y,z
.slider-enter .z-bottomToTop, .slider-leave-active .z-bottomToTop{
	transform: translate3d(0,100%,0);
}
.slider-enter .z-rightToLeft, .slider-leave-active .z-rightToLeft{
	transform: translate3d(100%,0,0);
}
.slider-enter, .slider-leave-active{
	opacity: 0
}
// .slider-enter .slider-container.z-rightToLeft,
// .slider-leave-active .slider-container.z-rightToLeft {
//   transform: translate3d(100%,0,0);
// }
/* vue transition animataion end */
</style>