function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function isiphoneX() {
  const isIphoneX = window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && testUA('iPhone')
  if (isIphoneX) {
    check()
  }else{
    document.body.classList.remove('fix-iphonex-bottom')
  }

  function check () {
    // 处理lib-flexible放大viewport的情况
    const scale = window.innerWidth / window.screen.width
    // 部分浏览器在滚动页面时会显示/隐藏工具栏，影响视口高度。在有底部工具栏的情况下，不做iPhoneX的fix。100为经验值
    if (window.screen.height - window.innerHeight / scale < 100) {
      document.body.classList.add('fix-iphonex-bottom')
    } else {
      document.body.classList.remove('fix-iphonex-bottom')
    }
  }

  function testUA (str) {
    return navigator.userAgent.indexOf(str) > -1
  }
}

export function getRootPath(){
  const strFullPath = window.document.location.href//当前地址
  const strPath = window.document.location.pathname
  const pos = strFullPath.indexOf(strPath)
  const prePath = strFullPath.substring(0,pos)//上下文根之前
  const postPath = strPath.substring(0,strPath.substr(1).indexOf('/')+1)//上下文根
  
  return prePath + '/sales'
}

export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "")
}

/*
 * 获取url指定的参数 @param name-指定的参数
 */
export function getQueryUrlParamVal (name) {
  // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
  if (location.href.indexOf("?") === -1 || location.href.indexOf(name + '=') === -1) {
    return ''
  }
  // 获取链接中参数部分
  let queryString = location.href.substring(location.href.indexOf("?") + 1)
  queryString = decodeURI(queryString)
   
  // 分离参数对 ?key=value&key2=value2
  let parameters = queryString.split("&")
  let pos, paraName, paraValue
  for (let i = 0; i < parameters.length; i++) {
    // 获取等号位置
    pos = parameters[i].indexOf('=')
    if (pos === -1) { continue }
      // 获取name 和 value
      paraName = parameters[i].substring(0, pos)
      paraValue = parameters[i].substring(pos + 1)
      // 如果查询的name等于当前name，就返回当前值，同时，将链接中的+号还原成空格
    if (paraName == name) {
      return unescape(paraValue.replace(/\+/g, " "))
    }
  }
  return ''
}


/***
scroll: cube-scroll的id
roll：cube-scroll的第一个元素的id
id：需要在中间显示的元素的id
*/ 
export function scrollTopError(scroll, roll, id){
  let domScroll = document.getElementById(scroll)
  let domRoll = document.getElementById(roll)
  let dom = document.getElementById(id)
  let scrollHeight = domScroll.offsetHeight
  let rollHeight = domRoll.offsetHeight
  let top = dom.offsetTop
  let domHeight = dom.offsetHeight
  let mid = top + domHeight/2
  let res = rollHeight - mid

  if(mid < scrollHeight/2){
    return 0
  }else{
    if (res > scrollHeight/2){
      return -(mid - scrollHeight/2)
    }else{
      return -(rollHeight - scrollHeight)
    }
  }
}


