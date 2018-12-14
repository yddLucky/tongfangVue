<template>
  <div 
    id="app" 
    v-loading.fullscreen.lock="showloading"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <m-head :backFlag="backFlag" :title='tit'></m-head>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {bus} from 'common/js/ajax-loading'
  import MHead from 'components/m-header/m-header'
  import {isiphoneX} from 'common/js/util'
  import {title} from 'common/js/config'
  import { mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        backFlag: true,
        tit: '同方全球',
        showloading: true
      }
    },
    created() {
      let _this = this
      bus.$on('showloading',function() {
        _this.showloading = true    // loading出现
      })
      bus.$on('closeLoading',function() {
        _this.showloading = false   // loading消失
      })
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
      window.addEventListener('resize', function() {
        isiphoneX()
      })
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