import Vue from 'vue'
import Router from 'vue-router'
// import Active from '@/components/activetiesTable'
import Login from '@/components/Login/login'
Vue.use(Router)
var router = new Router({
  routes: [{
      path: '/',
      redirect: '/login' //默认指向活动列表

    },
    {
      path: '/login',
      component: Login
      // component: resolve => require(['@/components/Login/login.vue'], resolve)

    },
    {
      path: '/actives',
      component: resolve => require(['@/components/index.vue'], resolve),
      children: [{
        path: 'my-active',
        component: resolve => require(['@/components/Active/MyActive.vue'], resolve)

      }, ]

    },

    {
      path: '/404',
      name: '404',
      // component:()=>import('@/components/notFound404.vue')
      component: resolve => require(['@/components/notFound404.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
export default router
