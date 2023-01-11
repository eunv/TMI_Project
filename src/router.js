import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mainSideBar',
      name: 'mainSideBar',
      component: () => import('./components/MainSideBar'),
    },
    {
      path: '/mainMap',
      name: 'mainMap',
      component: () => import('./views/MainMap'),
    },
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home'),
    },
  ]
})
