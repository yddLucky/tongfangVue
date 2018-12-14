import axios from 'axios'
import wx from 'weixin-js-sdk'
import qs from 'qs'
import {goods, number} from 'common/js/config'
import {getRootPath, getQueryUrlParamVal} from 'common/js/util'

const share = goods[number].share
const link = window.location.href
let shareUrl = ''
if(getQueryUrlParamVal("sourceFrom")){
  sessionStorage.sourceFrom = getQueryUrlParamVal("sourceFrom")
}
if(getQueryUrlParamVal("sid")){
  sessionStorage.sid = getQueryUrlParamVal("sid")
}

if(link.indexOf("esales.aegonthtf.com")>=0){
  shareUrl = "https://esales.aegonthtf.com/sales/baiduToe/preview/toyoesen/page/premium.html?sourceFrom="+sessionStorage.sourceFrom+"&sid="+sessionStorage.sid
}else{
  shareUrl = "https://esales-dev.aegonthtf.com/sales/baiduToe/preview/toyoesen/page/premium.html?sourceFrom="+sessionStorage.sourceFrom+"&sid="+sessionStorage.sid
}

const headers = {headers: {'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}}

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
    if(!isWeiXin()) {
      return
    }
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
      // 显示分享
      wx.showOptionMenu()

      // 发送给朋友
      wx.onMenuShareAppMessage({
        title: share.shareTitle_friend,
        desc: share.descContent_friend,
        link: shareUrl,
        imgUrl: share.imgUrl,
        trigger: function (res) {
          //alert('用户点击发送给朋友');
        },
        success: function (res) {
          //alert('已分享');
        },
        cancel: function (res) {
          //alert('已取消');
        },
        fail: function (res) {
          alert(JSON.stringify(res));
        }
      })
      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: share.shareTitle_timeLine,
        link: shareUrl,
        imgUrl: share.imgUrl,
        trigger: function (res) {
          //alert('用户点击分享到朋友圈');
        },
        success: function (res) {
          //alert('已分享');
        },
        cancel: function (res) {
          //alert('已取消');
        },
        fail: function (res) {
          alert(JSON.stringify(res));
        }
      })

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

