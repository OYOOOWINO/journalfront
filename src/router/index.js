import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/feeds',
    name: 'feeds',
    component: () => import('../views/FeedsView.vue')
  },
  {
    path: '/journals',
    name: 'journal',
    component: () => import('../views/UserJournalsView.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/JournalView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
  ,
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
