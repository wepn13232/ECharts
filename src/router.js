import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Hospital from "@/views/Hospital";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/Hospital',
      name:'医院商户专题',
      component: Hospital
    }

  ]
})
