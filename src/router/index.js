import Vue from 'vue'
import Router from 'vue-router'
import Active from '@/components/activetiesTable'
Vue.use(Router)
var router = new Router(
    {
        routes: [
            {
                path: '/',
                redirect: '/active'//默认指向活动列表

            },
            {
                path: '/active',
                name:'active',
                component: Active,
                meta: {
                    role: []
                }
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
    }
)
export default router

