import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mainMap',
      name: 'mainMap',
      component: () => import('./views/MainMap'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home'),
    },
    {
      path: '/',
      name: 'SignUp',
      component: () => import('./views/SignUp'),
    },
  ]
})
