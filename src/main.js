import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import Cube from 'cube-ui'
import { Icon, Button, Input, InputNumber } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'

import 'common/stylus/index.styl'
Vue.use(Cube)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
