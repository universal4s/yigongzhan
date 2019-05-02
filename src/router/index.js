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
            require(["@/components/adminComponent/Admin.vue"], resolve),
          children: [{
              path: '/',
              redirect: 'volun'
            },
            {
              path: 'volun',
              name: 'volunadmin',
              component: resolve => require(['@/components/adminComponent/volunAdmin.vue'], resolve)
            },
            {
              path: 'public',
              name: 'pubadmin',
              component: resolve => require(['@/components/adminComponent/pubAdmin.vue'], resolve)
            },
            {
              path: 'add-volun',
              name: 'add-volun',
              component: resolve => require(['@/components/adminComponent/addVolun.vue'], resolve)
            },
            {
              path: 'add-public',
              name: 'add-public',
              component: resolve => require(['@/components/adminComponent/addPub.vue'], resolve)
            }, {
              path: 'StuDetails',
              name: 'StuDetails',
              component: resolve => require(["@/components/User/UserDetails.vue"], resolve)
            },
            {
              path: 'PubDetails',
              name: 'PubDetails',
              component: resolve => require(['@/components/User/publisherDetails'], resolve)
            }
          ]
        },

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
