<template>
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
</template>

<script type='text/ecmascript-6'>
import Tab from 'base/tab/tab'

export default {
  data() {
    return {
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
  methods: {
    changePlan(index) {
      this.current = index
    }
  },
  components: {
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
</style>
