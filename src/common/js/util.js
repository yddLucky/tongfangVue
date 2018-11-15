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
