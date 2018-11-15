import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Preview = () => import('components/preview/preview')
const PlanDes = () => import('components/planDes/planDes')
const Premium = () => import('components/premium/premium')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/preview'
    },
    {
      path: '/preview',
      component: Preview
    },
    {
      path: '/planDes',
      component: PlanDes
    },
    {
      path: '/premium',
      component: Premium
    }
  ]
})
