import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/peopleHome',
    name: 'peopleHome',
    component: () => import('../views/peopleHome.vue')
  },
  {
    path: '/activityList',
    name: 'activityList',
    component: () => import('../views/activityList.vue')
  },
  {
    path: '/activitySign',
    name: 'activitySign',
    component: () => import('../views/activitySign.vue')
  },
  {
    path: '/retrieve',
    name: 'retrieve',
    component: () => import('../views/retrieve.vue')
  },
  {
    path: '/templateList',
    name: 'templateList',
    component: () => import('../views/templateList.vue')
  },
  {
    path: '/activePro',
    name: 'activePro',
    component: () => import('../views/activePro.vue')
  },
  {
    path: '/activeDev',
    name: 'activeDev',
    component: () => import('../views/activeDev.vue')
  },
  {
    path: '/addBar',
    name: 'addBar',
    component: () => import('../views/addBar.vue')
  },
  {
    path: '/userMgr',
    name: 'userMgr',
    component: () => import('../views/userMgr.vue')
  },
  {
    path: '/bargainDev',
    name: 'bargainDev',
    component: () => import('../views/bargainDev.vue')
  },
  {
    path: '/bargainPro',
    name: 'bargainPro',
    component: () => import('../views/bargainPro.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/mapInit.vue')
  },
  {
    path: '/jizanDev',
    name: 'jizanDev',
    component: () => import('../views/jizanDev.vue')
  },
  {
    path: '/jizanPro',
    name: 'jizanPro',
    component: () => import('../views/jizanPro.vue')
  },
  {
    path: '/zhuliDev',
    name: 'zhuliDev',
    component: () => import('../views/zhuliDev.vue')
  },
  {
    path: '/zhuliPro',
    name: 'zhuliPro',
    component: () => import('../views/zhuliPro.vue')
  },
  {
    path: '/pingtuanDev',
    name: 'pingtuanDev',
    component: () => import('../views/pingtuanDev.vue')
  },
  {
    path: '/qianggouDev',
    name: 'qianggouDev',
    component: () => import('../views/qianggouDev.vue')
  },
  {
    path: '/qianggouPro',
    name: 'qianggouPro',
    component: () => import('../views/qianggouPro.vue')
  },
  {
    path: '/pingtuanPro',
    name: 'pingtuanPro',
    component: () => import('../views/pingtuanPro.vue')
  },
  {
    path: '/',
    nredirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
