import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Preview = () => import('components/preview/preview')
const PlanDes = () => import('components/planDes/planDes')
const Premium = () => import('components/premium/premium')
const Healthy = () => import('components/healthy/healthy')
const Infonmation = () => import('components/infonmation/infonmation')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/premium'
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
    },
    {
      path: '/healthy',
      component: Healthy
    },
    {
      path: '/infonmation',
      component: Infonmation
    }
  ],
  scrollBehavior (to, from, savedPosition) { 
    if (savedPosition) {  
      return savedPosition 
    } else {  
      return { x: 0, y: 0 } 
    } 
  }
})
