import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'

    },
    {
      path: '/login',
      component: resolve => require(['@/components/Login/login.vue'], resolve)

    },
    // {
    //   path: "/",
    //   redirect: "/index"
    // },
    {
      path: "/main",
      component: resolve => require(["@/components/index.vue"], resolve),
      children: [{
          path: "/",
          redirect: "active"
        }, {
          path: "active",
          component: resolve => require(["@/components/publisher/index.vue"], resolve),
          children: [{
              path: "/",
              redirect: "all-active"
            },
            {
              path: "all-active",
              component: resolve => require(["@/components/Active/AllMyActive.vue"], resolve)
            },
            {
              path: 'add-active',
              component: resolve => require(["@/components/Active/createActive.vue"], resolve)
            },
            {
              path: 'details',
              name: 'active-details',
              component: resolve => require(['@/components/Active/MyActiveDetails.vue'], resolve)
            }
          ]
        },
        {
          path: "admin",
          component: resolve =>
            require(["@/components/Admin.vue"], resolve)
        },
        {
          path: '/StuDetails',
          name: 'StuDetails',
          component: resolve => require(["@/components/User/UserDetails.vue"], resolve)
        }
      ]
    },
    {
      path: '/404',
      component: resolve => require(['@/components/notFound404.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});
export default router;
