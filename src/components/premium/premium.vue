<template>
  <div>
    <div class="premium">
      <!-- banner -->
      <div class="banner">
        <img :src="rules.banner.src">
      </div>
      <!-- 产品优势 -->
      <div class="advantage border-bottom">
        <div class="top">
          <div class="title">{{rules.banner.title}}</div>
          <span class="des">{{rules.banner.des}}</span>
        </div>
        <ul>
          <li  v-for="advantage in rules.banner.advantages">
            <span></span>
            {{advantage}}
          </li>
        </ul>
      </div>
      <plan :data="rules.plan"></plan>
      <div class="description">
        <img :src="rules.introduction">
      </div>
      
      <div class="under-btn">
        <div>
          <div class="service border-top">
            <a href='https://www.sobot.com/chat/h5/index.html?sysNum=526a27dcc2c64f808bf4b988e159e32e'>
              <img src="./kefu.png">
              <br>
              客服
            </a>
          </div>
          <el-button type="primary" @click='showPremium'>立即测算</el-button>
        </div>
      </div>

      <!-- 测算层 -->
      <mark-layer
        class="markLayer" 
        :show="mark"
        @hide="hidePremium"
      >
        <div class="selectBar border-bottom" @touchmove.prevent>
          <div class="tit font-weight">保费测算:</div>
          <div class="select">
            <div class="cancel" @click="hidePremium">取消</div>
          </div>
        </div>
        <div class="content" ref="content" @touchmove="touchScroll" @touchstart="touchScrollStart">
          <div ref="contentScroll">
            <area-occupation
              tit="投保地区"
              type='area'
              :data="areaList"
              :selected="area"
              @select="selectedArea"
            ></area-occupation>
            <age 
              :age=age
              :birthday=birthday
              :maxAge='45' 
              :minAge='0' 
              :updateAge='0'
              @setBirthday='setBirthday'
              @setAge='setAge'
            ></age>
            <check-box
              tit="性别"
              :data="sexList"
              :checked=sex
              @checked="changeSex"
            ></check-box>
            <select-bar
              tit="基本保额"
              :data="amountList" 
              :selected="amount" 
              @select="selectedAmount"
            ></select-bar>
            <Layout tit="保险期间" text="保至70周岁"></Layout>
            <Layout tit="交费方式" text="年交"></Layout>
            <select-bar
              tit="交费期间"
              :data="amountList" 
              :selected="amount" 
              @select="selectedAmount"
            ></select-bar>
            <check-box
              tit="性别"
              :data="sexList"
              :checked=sex
              @checked="changeSex"
            ></check-box>
          </div>
        </div>
        <div class="under-btn" @click.stop @touchmove.prevent>
          <div>
            <div class="pre border-top">
              年付保费
              <span class="premium font-weight">
                ￥{{premium}}
              </span>
            </div>
            <el-button type="primary" class="next" @click="submitInfo">立即购买</el-button>
          </div>
        </div>
      </mark-layer>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Loading from 'base/loading/loading'
  import Plan from 'base/plan/plan'
  import Age from 'base/age/age'
  import { sexList } from 'common/js/config'
  import CheckBox from 'base/checkbox/checkbox'
  import SelectBar from 'base/select/select'
  import Layout from 'base/layout/layout'
  import {getArea} from 'api/area'
  import AreaOccupation from 'base/area/area'
  import MarkLayer from 'base/mark-layer/mark-layer'
  import {goods, number} from 'common/js/config'
  import { mapGetters, mapMutations} from 'vuex'

  const amountList = goods[number].plan[0].amountList[0]
  let touchstartY = 0

  export default {
    data() {
      return {
        rules: goods[number],
        mark: false,
        areaList: {},
        sexList: sexList,
        amountList: amountList
      }
    },
    mounted() {
      this.getArea()
    },
    computed: {
      ...mapGetters([
        'area',
        'age',
        'birthday',
        'sex',
        'amount',
        'premium'
      ])
    },
    methods: {
      touchScrollStart(e) {
        touchstartY = e.targetTouches[0].pageY
      },
      touchScroll(e) {
        const top = this.$refs.content.scrollTop
        const boxH = this.$refs.content.offsetHeight
        const contH = this.$refs.contentScroll.offsetHeight
        // 边界判断
        if(top <= 0) {
            e.targetTouches[0].pageY > touchstartY && e.preventDefault() && e.stopPropagation()
        }
        if((top >= contH - boxH) && (e.targetTouches[0].pageY < touchstartY)){
          e.preventDefault()
          e.stopPropagation()
        }
      },
      showPremium() {
        console.log(1)
        this.mark = true
      },
      hidePremium() {
        this.mark = false
      },
      getArea() {
        getArea().then((res) => {
          this.areaList = res[0]
        }).catch((err) => {
          this.$createDialog({
            type: 'alert',
            title: '',
            content: '网络异常，请刷新重试',
            icon: ''
          }).show()
        })
      },
      selectedArea(res) {
        this.setArea({
          level1: res.val[0],
          level2: res.val[1],
          level3: res.val[2],
          text: res.text
        })
      },
      setBirthday(res) {
        this.setBirthday(res)
      },
      setAge(res) {
        this.setAge(res)
      },
      changeSex(res) {
        this.setSex(res)
      },
      selectedAmount(res) {
        this.setAmount(res)
      },
      submitInfo() {
        // 数据校验并请求后台
        this.$router.push({
          path: '/healthy'
        })
      },
      ...mapMutations({
        setArea: 'SET_AREA',
        setAge: 'SET_AGE',
        setBirthday: 'SET_BIRTHDAY',
        setSex: 'SET_SEX',
        setAmount: 'SET_AMOUNT'
      })
    },
    components: {
      Loading,
      Plan,
      AreaOccupation,
      Age,
      CheckBox,
      SelectBar,
      Layout,
      MarkLayer
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .fix-iphonex-bottom
    .premium
      margin-bottom: ($bottom + $under-btn-height)px
      .under-btn
        height: ($bottom + $under-btn-height)px

  .premium
    width: 100%
    margin-top: 44px
    margin-bottom: ($under-btn-height + 0)px
    .banner
      position: relative
      width: 100%
      font-size: 0
      z-index: -1
      img
        width: 100%
    .advantage
      width: 100%
      padding: 5px 20px
      box-sizing: border-box
      color: gray
      margin-top: -75px
      .top
        height: 75px
        background: rgba(255,255,255, 0)
        .title
          font-size: 26px
          margin-bottom: 10px
          no-wrap()
        .des
          font-size: 14px
      ul
        padding: 5px 0
        li
          font-size: 12px
          line-height: 18px
          span
            margin-top: 2px
            border-radius: 50%
            line-height: 18px
            width: 14px
            height: 14px
            vertical-align: top
            display: inline-block
            background: $color-btn
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
        position: absolute
        top: 0
        left: 0
        width: 100%
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
    .markLayer
      .selectBar
        .select
          .cancel
            extend-click()
            position: absolute
            color: $color-btn
            font-size: 14px
            right: 0
            bottom: 20px
      .content
        width: 100%
        max-height: 410px
        overflow-y: auto
        overflow-x: hidden
        box-sizing: border-box
        background: #fff
        &>div
          padding-bottom: 80px
        .selectBar:last-child
          &:after
            height: 0
      .under-btn
        z-index: 9
        .pre
          flex: 1 1 65%
          height: 48px
          line-height: 48px
          padding-left: 20px
          .premium
            color: $color-btn
            font-size: $font-size-large-x
        .next
          flex: 1 1 45%
     
</style>
