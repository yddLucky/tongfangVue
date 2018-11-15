<template>
  <div class="preview">
  	<scroll ref="scroll" class="preview-content">
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
        <div>
          <div class="tabTit">保障详情</div>
          <!-- 计划选择项 -->
          <tab :data="tabs" :current="current" @chooseTab="changePlan" type="gray"></tab>
          <!-- 计划选择描述 -->
          <div class="tabDesSwiper">
            <div class="swiper-slide">
              <div class="border-bottom">
                <div class="dl">
                  <div class="dt">重大疾病保险金</div>
                  <div class="dd">10万</div>
                </div>
                <div class="dl">
                  <div class="dt">轻症疾病保险金（3次）</div>
                  <div class="dd">2万</div>
                </div>
                <div class="dl">
                  <div class="dt">身故保险金</div>
                  <div class="dd">10万</div>
                </div>
                <div class="dl">
                  <div class="dt">轻症豁免保险费</div>
                  <div class="dd">豁免剩余未交保险</div>
                </div>
                <div class="dl">
                  <div class="dt">附加险满期保险金</div>
                  <div class="dd">可选</div>
                </div>
                <div class="more">
                  <router-link to="planDes" class="morelink">查看保险详情<span class="el-icon-caret-right"></span></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="description">
          <img src="https://esales.aegonthtf.com/sylifetime/tyimageL.jpg" @load="refresh">
        </div>
      </div>
    </scroll>
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
import Scroll from 'base/scroll/scroll'
import Tab from 'base/tab/tab'
import {isiphoneX} from 'common/js/util'

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
      ],
      tabs: [
        {
          lowest: 101,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        }
      ],
      current: 0
    }
  },
  mounted() {
    isiphoneX()
  },
  methods: {
    changePlan(index) {
      this.current = index
    },
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
    Scroll,
    Tab
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
      .tabTit
        font-size: 20px
        color: #121c32
        line-height: 20px
        padding: 15px 20px 10px
      .tabDesSwiper
        width: 100%
        background-color: #fff
        .swiper-slide
          width: 100%
          box-sizing: border-box
          padding: 0 20px
          font-size: 14px
          line-height: 14px
          letter-spacing: 0
          & > div
            width: 100%
            padding: 20px 0 30px
            .dl
              height: 28px
              color: #5D667A
              .dt
                float: left
              .dd
                float: right
                font-weight: 700
            .more
              margin: 6px 0 0 0
              .morelink
                display: block
                color: #FA9128
                width: 100%
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
