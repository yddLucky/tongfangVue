<template>
  <div class="preview">
  	<cube-scroll
      ref="scroll"
      class="preview-content"
      :options="{
        click: true,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        scrollbar: {
          fade: true,
          interactive: false
        }
      }"
    >
      <div>
        <!-- banner -->
        <div class="banner">
          <img src="./banner.jpg" draggable="false" @load="refresh">
        </div>
        <!-- 产品优势 -->
        <div class="advantage border-bottom">
          <div class="clearfix">
            <span class="advantage-list" v-for="advantage in advantages">
              <i class="el-icon-circle-check-outline"></i>{{advantage}}
            </span>
          </div>
        </div>
        <plan></plan>
        <div class="description">
          <img src="https://esales.aegonthtf.com/sylifetime/tyimageL.jpg" @load="refresh">
        </div>
      </div>
    </cube-scroll>
    <div class="under-btn">
      <div>
        <div class="service border-top">
          <a href='https://www.sobot.com/chat/h5/index.html?sysNum=526a27dcc2c64f808bf4b988e159e32e'>
            <img src="./kefu.png">
            <br>
            客服
          </a>
        </div>
        <el-button type="primary" @click='forPremium'>立即投保</el-button>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Loading from 'base/loading/loading'
import Plan from 'base/plan/plan'

export default {
  data() {
    return {
      value: '',
      advantages: [
        '70、80周岁可返回',
        '70、80周岁可返回',
        '70、80周岁可返回',
        '70、80周岁可返回',
        '70、80周岁可返回'
      ]
    }
  },
  methods: {
    forPremium() {
      this.$router.push({
        path: '/premium'
      })
    },
    refresh() {
      this.$refs.scroll.refresh()
    }
  },
  components: {
    Loading,
    Plan
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .fix-iphonex-bottom
    .preview
      bottom: ($bottom + $under-btn-height)px
      .under-btn
        bottom: ($bottom + 0)px
  .preview
    position: fixed
    width: 100%
    top: 44px
    bottom: ($under-btn-height + 0)px
    .preview-content
      height: 100%
      overflow: hidden
      .banner
        position: relative
        width: 100%
        font-size: 0
        img
          width: 100%
      .advantage
        position: relative
        margin: 0 $padding-left
        padding: 10px 0
        color: $color-theme-text
        font-size: $font-size-medium
        line-height: 20px
        text-align: center
        .advantage-list
          width: 50%
          float: left
          i
            margin-right: 5px
      .description
        padding: 10px 20px 30px
        img
          width: 100%
    .under-btn
      position: fixed
      left: 0
      bottom: 0
      height: ($under-btn-height + 0)px
      font-size: 16px
      width: 100%
      background-color: #fff
      &>div
        display: flex
        .service
          flex: 0 1 30%
          box-sizing: border-box
          height: ($under-btn-height + 0)px
          line-height: 20px
          text-align: center
          a
            display: block
            width: 100%
            height: 100%
            text-align: center
            img
              vertical-align: middle
              width: 16px
              height: 16px
              padding-top: 5px
              padding-left: 4px
        .el-button
          flex: 0 1 70%
          border-radius: 0
          background-color: $color-btn
          border-color: $color-btn
          font-size: 16px
</style>
