import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DetailCountry from '../components/DetailCountry'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
      path: '/country/:name',
      name: 'DetailCountry',
      component: DetailCountry,
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
