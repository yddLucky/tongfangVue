<template>
  <div id="app">
    <m-head :backFlag="backFlag" :title='tit'></m-head>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHead from 'components/m-header/m-header'
  import {isiphoneX} from 'common/js/util'
  import {title} from 'common/js/config'

  export default {
    data(){
      return {
        backFlag: true,
        tit: '同方全球'
      }
    },
    components: {
      MHead
    },
    mounted() {
      // 解决安卓手机输入框被遮挡问题
      if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
          if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            window.setTimeout(function () {
                document.activeElement.scrollIntoViewIfNeeded()
            }, 0)
          }
        })
      }
    },
    watch:{
      $route(to,from){
        if(to.path === '/premium') {
          this.backFlag = false
        }else{
          this.backFlag = true
        }
        this.tit = title[to.path]
        isiphoneX()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>