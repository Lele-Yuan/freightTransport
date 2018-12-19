import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let operate = h5config;

var routeDomin = operate.OP_ROUTER
var routes = [
	{
		path: routeDomin + '/',
		component: () => import('../views/index'),
		meta: {headerTitle: "国际货代专家"}
	},
	{
		path: routeDomin + '/price',
		component: () => import('../views/price/index'),
		meta: {headerTitle: "国际货代专家"}
	},
	{
		path: routeDomin + '/service',
		component: () => import('../views/service/index'),
		meta: {headerTitle: "国际货代专家"}
	},
	{
		path: routeDomin + '/trace',
		component: () => import('../views/trace/index'),
		meta: {headerTitle: "国际货代专家"}
	},
	{
		path: routeDomin + '/news',
		component: () => import('../views/news/index'),
		meta: {headerTitle: "国际货代专家"}
	},
	{
		path: routeDomin + '/circle',
		component: () => import('../views/circle/index'),
		meta: {headerTitle: "国际货代专家"}
	},
	{
		path: routeDomin + '/exchange',
		component: () => import('../views/exchange/index'),
		meta: {headerTitle: "国际货代专家"}
	},
	{
		path: routeDomin + '/account',
		component: () => import('../views/account/index'),
		meta: {headerTitle: "国际货代专家"}
	}
]

const router = new Router({
	mode: 'history',
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {x: 0, y: 0}
	}
})

export default router
