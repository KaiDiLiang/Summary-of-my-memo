import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import ShopCart from '@/pages/ShopCart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ShopCart',
      name: 'ShopCart',
      component: ShopCart
    }
  ]
})
