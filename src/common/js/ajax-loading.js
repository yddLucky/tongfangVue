import Vue from 'vue'
import axios from 'axios'
let _bus = new Vue()  // 创建一个事件总线
let num = 0

axios.interceptors.request.use(config => {  //在请求发出之前进行一些操作
  num++
  _bus.$emit('showloading')
  return config
}, function(error) {
  judge()
  //请求错误时做些事
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  judge()
  return response
}, function(error) {
  judge()
  //请求错误时做些事
  return Promise.reject(error)
})

// 接受请求后num--，判断请求所有请求是否完成
function judge() {
  num--
  if (num <= 0) {
    _bus.$emit('closeLoading')      
  } else {
    _bus.$emit('showloading')      
  }
}

export const bus = _bus   //暴露事件总线
