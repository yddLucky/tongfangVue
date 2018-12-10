import axios from 'axios'
import wx from 'weixin-js-sdk'
import qs from 'qs'

const headers = {headers: {'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
const Base64 = require('js-base64').Base64

export function isWeiXin() {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') !== -1 && ua.indexOf('wxwork') === -1) {
    return true
  } else {
    return false
  }
}

export function isIos() {
  let u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
}

export function getConfig() {
    let url = getHost() + '/sales/customerSection/customerSection_getWeixinJS.action'
    let data = {
      url: location.href.split('#')[0]
    }
    data = qs.stringify(data)
    axios.post(url, data, headers).then(response => {
      response = response.data.wechatJsInfo
      wx.config({
        debug: false,
        appId: response.appid,
        timestamp: response.timestamp,
        nonceStr: response.noncestr,
        signature: response.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'hideMenuItems',
          'hideAllNonBaseMenuItem',
          'getNetworkType',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow'
        ]
      })
    }).catch(err => {
      alert(err)
    })
    
    wx.ready(function () {
      wx.showOptionMenu()
      wx.hideMenuItems({
        menuList: [
          'menuItem:editTag',
          'menuItem:delete',
          'menuItem:copyUrl',
          'menuItem:originPage',
          'menuItem:readMode',
          'menuItem:openWithQQBrowser',
          'menuItem:openWithSafari',
          'menuItem:share:email',
          'menuItem:share:brand',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:favorite',
          'menuItem:share:facebook',
          '/menuItem:share:QZone'
        ]
      })
    })
    wx.error(function (res) {
      res = res.data
      alert(res.errMsg)
    })
}

export function getHost() {
   return 'https://' + location.host
}

