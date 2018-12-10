<template>
  <div>
    <div class="tabTit">{{tit}}</div>
    <!-- 计划选择项 -->
    <tab :data="data" :current="plan" @chooseTab="changePlan" type="gray"></tab>
    <!-- 计划选择描述 -->
    <div class="tabDesSwiper">
      <div class="swiper-slide">
        <div class="border-bottom">
          <div class="dl" v-for="item in data[plan].des">
            <div class="dt">{{item.text}}</div>
            <div class="dd">{{item.value}}</div>
          </div>
          <div class="more">
            <router-link to="/planDes" class="morelink">查看保险详情<span class="el-icon-caret-right"></span></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Tab from 'base/tab/tab'
import { mapGetters, mapMutations} from 'vuex'

export default {
  props: {
    tit: {
      type: String,
      default: '保障计划'
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapGetters([
      'plan'
    ])
  },
  methods: {
    changePlan(index) {
      this.setPlan(index)
    },
    ...mapMutations({
      setPlan: 'SET_PLAN'
    })
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
