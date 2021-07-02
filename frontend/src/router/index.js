import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/api/session',
    name: 'Session',
    component: () => import(/* webpackChunkName: "about" */ '../views/Session.vue')
  },
  {
    path: '/api/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/api/signupWorked',
    name: 'SignupWorked',
    component: () => import(/* webpackChunkName: "signup" */ '../components/SignupWorked.vue')
  },
  {
    path: '/api/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "signin" */ '../views/Login.vue')
  },
  {
    path: '/api/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "signin" */ '../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
