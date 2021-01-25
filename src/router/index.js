import Vue from 'vue'
import VueRouter from 'vue-router'

import DetailCountry from '../components/DetailCountry'
import QuizCapitals from '../components/QuizCapitals'
import QuizFlags from '../components/QuizFlags'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'QuizCapitals',
        component: QuizCapitals
    },
    {
        path: '/quiz-flags',
        name: 'QuizFlags',
        component: QuizFlags
    },
    {
      path: '/country/:name',
      name: 'DetailCountry',
      component: DetailCountry,
    },
    {
      path: '/quiz',
        name: 'QuizCapitals',
        component: QuizCapitals
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
