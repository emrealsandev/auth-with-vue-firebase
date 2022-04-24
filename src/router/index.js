import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


import About from "@/pages/About"
import Homepage from "@/pages/Homepage"
import Auth from "@/pages/auth/Auth"


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component : Homepage,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next()
      }else{
        next("/auth")
      }
    }
  },
  {
    path: "/about",
    component : About,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next()
      }else{
        next("/auth")
      }
    }
  },
  {
    path: "/auth",
    component : Auth,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
