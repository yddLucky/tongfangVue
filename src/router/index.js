import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Premium = () => import('components/premium/premium')
const PlanDes = () => import('components/planDes/planDes')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/premium'
    },
    {
      path: '/premium',
      component: Premium
    },
    {
      path: '/planDes',
      component: PlanDes
    }
  ]
})
