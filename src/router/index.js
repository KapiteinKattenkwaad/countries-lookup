import Vue from 'vue'
import VueRouter from 'vue-router'

import DetailCountry from '../components/DetailCountry'
import Quiz from '../components/QuizCapitals'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Quiz',
        component: Quiz
    },
    {
      path: '/country/:name',
      name: 'DetailCountry',
      component: DetailCountry,
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz,
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
