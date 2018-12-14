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
              :maxAge='maxAge' 
              :minAge='minAge' 
              :updateAge='age'
              @setBirthday='setBirthday'
              @setAge='setAge'
            ></age>
            <check-box
              v-if="mark"
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
            <Layout tit="保险期间" :text="durationText"></Layout>
            <Layout tit="交费方式" text="年交"></Layout>
            <select-bar
              tit="交费期间"
              :data="paymentYearList" 
              :selected="paymentYear" 
              @select="selectedPaymentYear"
            ></select-bar>
            <check-box
              v-if="mark && additionShow"
              tit="附加险"
              :data="additionList"
              :checked=addition
              @checked="changeAddition"
            ></check-box>
            <Layout
              v-if="addition === 0"
              tit="附加险保障期限" 
              :text="additionDurationText"
            ></Layout>
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
  import {getConfig, isWeiXin} from 'api/wx'
  import Loading from 'base/loading/loading'
  import Plan from 'base/plan/plan'
  import Age from 'base/age/age'
  import { sexList, additionList, goods, number } from 'common/js/config'
  import CheckBox from 'base/checkbox/checkbox'
  import SelectBar from 'base/select/select'
  import Layout from 'base/layout/layout'
  import {getArea} from 'api/area'
  import AreaOccupation from 'base/area/area'
  import MarkLayer from 'base/mark-layer/mark-layer'
  import { mapGetters, mapMutations} from 'vuex'

  let touchstartY = 0
  const Base64 = require('js-base64').Base64
  const rateTable = goods[number].rateTable
  const rateTableB = goods[number].rateTableB
  const cityArr = ['110100','310100','440100','440300','320100','320500','320200','420100','130100','370200','370100','510100','350100','350200','120100']

  export default {
    data() {
      return {
        rules: goods[number],
        mark: false,
        areaList: {},
        sexList: sexList,
        amountList: [
          {
            text: '10万',
            value: '100000'
          },
          {
            text: '20万',
            value: '200000'
          },
          {
            text: '30万',
            value: '300000'
          },
          {
            text: '40万',
            value: '400000'
          },
          {
            text: '50万',
            value: '500000'
          }
        ],
        durationText: '',
        paymentYearList: [],
        paymentYear: '请选择',
        additionShow: false,
        additionList: additionList,
        addition: 0,
        additionDurationText: '',
        additionDuration: '',
        duration: 30,
        maxAge: 45,
        minAge: 0
      }
    },
    created() {
      this.getUrlParam()
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
        'premium',
        'plan'
      ])
    },
    methods: {
      getUrlParam() {
        if(this.$route.query.sourceFrom) {
          sessionStorage.sourceFrom = this.$route.query.sourceFrom
        }
        if(this.$route.query.sid) {
          sessionStorage.sid = this.$route.query.sid
        }
        
        if(this.$route.query.openid) {
          sessionStorage.openId = this.$route.query.openid
        }
        if (!sessionStorage.openId && isWeiXin()) {
          const link = window.location.href.split('?')[0]
          const baseLink = Base64.encode(link)
          if (link.indexOf("esalesd.aegonthtf.com") >= 0) { //生产
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe6f2b9f50c43534e&redirect_uri=http://cloud.aegonthtf.com/WEIXIN/getinfo/getNewOpenid.do%3Fother=" + baseLink + "&response_type=code&scope=snsapi_base&state=111&#wechat_redirect"
          } else {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cfad1fc7b158f54&redirect_uri=https://testcloud.aegonthtf.com/WEIXIN/getinfo/getNewOpenid.do%3Fother=" + baseLink + "&response_type=code&scope=snsapi_base&state=111&#wechat_redirect"
          }
        }
        getConfig()
      },
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
        this.mark = true
      },
      hidePremium() {
        this.mark = false
      },
      changeAddition(res) {
        this.addition = res
      },
      calculatePremium() {
        if(!this.birthday) {
          this.setPremium('--')
          return
        }
        if(this.paymentYear === '请选择') {
          this.setPremium('--')
          return
        }
        if(this.amount === '请选择') {
          this.setPremium('--')
          return
        }
        // 主险保费
        const primaryPremium = rateTable[this.duration][this.sex][this.paymentYear][this.age] *  this.amount/1000
        let additionPremium = 0
        if(this.addition === 0) {
          // 有附加险
          additionPremium = rateTableB[this.additionDuration][this.sex][this.paymentYear][this.age] * this.amount/1000
        }else{
          additionPremium = 0
        }
        const all = Math.round(primaryPremium + additionPremium)
        this.setPremium(all)
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
      selectedPaymentYear(res) {
        this.paymentYear = res
      },
      submitInfo() {
        // 数据校验并请求后台
        this.$router.push({
          path: '/healthy'
        })
      },
      changeAmountList(area, age) {
        if(!area.level2 || (area.level2 && cityArr.indexOf(area.level2) > -1)) {
          if(age >= 0 && age <= 40) {
            this.amountList = [
              {
                text: '10万',
                value: '100000'
              },
              {
                text: '20万',
                value: '200000'
              },
              {
                text: '30万',
                value: '300000'
              },
              {
                text: '40万',
                value: '400000'
              },
              {
                text: '50万',
                value: '500000'
              }
            ]
          }else if(age > 40 && age <= 45) {
            this.amountList = [
              {
                text: '10万',
                value: '100000'
              },
              {
                text: '20万',
                value: '200000'
              }
            ]
          }else if(age > 45) {
            this.amountList = [
              {
                text: '10万',
                value: '100000'
              }
            ]
            this.setAmount('100000')
          }
        }else{
          if(age >= 0 && age <= 17) {
            this.amountList = [
              {
                text: '10万',
                value: '100000'
              },
              {
                text: '20万',
                value: '200000'
              }
            ]
          }else if(age > 17 && age <= 40) {
            this.amountList = [
              {
                text: '10万',
                value: '100000'
              },
              {
                text: '20万',
                value: '200000'
              },
              {
                text: '30万',
                value: '300000'
              }
            ]
          }else if(age > 40 && age <= 45) {
            this.amountList = [
              {
                text: '10万',
                value: '100000'
              },
              {
                text: '20万',
                value: '200000'
              }
            ]
          }else if(age > 45) {
            this.amountList = [
              {
                text: '10万',
                value: '100000'
              }
            ]
            this.setAmount('100000')
          }
        }
        // 保障期间30年 30万起
        if(this.duration === 30) {
          if(!area.level2 || (area.level2 && cityArr.indexOf(area.level2) > -1)) {
            // A类城市 0-40 50万
            this.amountList = [
              {
                text: '30万',
                value: '300000'
              },
              {
                text: '40万',
                value: '400000'
              },
              {
                text: '50万',
                value: '500000'
              }
            ]
          }else{
            this.amountList = [
              {
                text: '30万',
                value: '300000'
              }
            ]
            this.setAmount('300000')
          }
        }

        if(this.amount < this.amountList[0].value || this.amount > this.amountList[this.amountList.length-1].value) {
          this.setAmount('请选择')
        }

      },
      ...mapMutations({
        setArea: 'SET_AREA',
        setAge: 'SET_AGE',
        setBirthday: 'SET_BIRTHDAY',
        setSex: 'SET_SEX',
        setAmount: 'SET_AMOUNT',
        setPremium: 'SET_PREMIUM'
      })
    },
    watch: {
      plan: {
        handler(n) {
          this.durationText = goods[number].plan[n].duration
          this.duration = goods[number].plan[n].value
          // 保障期限更改是否有附加险,年龄上下线控制 
          if(this.duration === 30) {
            this.additionShow = false
            this.addition = 1
            this.additionDurationText = ''
            this.additionDuration = ''
            if(!this.area.level2 || (this.area.level2 && cityArr.indexOf(this.area.level2) > -1)) {
              this.maxAge = 40
              this.minAge = 0
            }else{
              this.maxAge = 40
              this.minAge = 18
            }
          }else{
            this.additionShow = true
            if(this.duration === 70) {
              this.additionDurationText = '至70周岁'
              this.additionDuration = 70

              this.maxAge = 50
              this.minAge = 0
            }else{
              this.additionDurationText = '至80周岁'
              this.additionDuration = 80
              this.maxAge = 45
              this.minAge = 0
            }
          }

          if(this.age < this.minAge || this.age > this.maxAge) {
            this.setAge(this.minAge)
            this.setBirthday('')
          }

          // 更改交费期间
          if(this.duration === 30 || this.duration === 105) {
            this.paymentYearList = [
              {
                text: '30年',
                value: '30'
              }
            ]
            this.paymentYear = '30'
          }else{
            if(this.age > 40) {
              this.paymentYearList = [
                {
                  text: '至70周岁',
                  value: '70'
                }
              ]
              this.paymentYear = '70'
            }else{
              this.paymentYearList = [
                {
                  text: '30年',
                  value: '30'
                },
                {
                  text: '至70周岁',
                  value: '70'
                }
              ]
              this.paymentYear = '请选择'
            }
          }

          this.changeAmountList(this.area, this.age)

          this.calculatePremium()
        },
        immediate: true
      },
      age(n) {
        if(this.duration === 70) {
          if(n > 40) {
            this.paymentYearList = [
              {
                text: '至70周岁',
                value: '70'
              }
            ]
            this.paymentYear = '70'
          }else{
            this.paymentYearList = [
              {
                text: '30年',
                value: '30'
              },
              {
                text: '至70周岁',
                value: '70'
              }
            ]
          }
        }
        this.changeAmountList(this.area, n)

        this.calculatePremium()
      },
      area(n) {
        this.changeAmountList(n, this.age)

        this.calculatePremium()
      },
      sex() {
        this.calculatePremium()
      },
      amount() {
        this.calculatePremium()
      },
      paymentYear(n) {
        if(this.duration === 70) {
          if(n === 30) {
            this.maxAge = 40 
            this.minAge = 0
          }else{
            this.maxAge = 50 
            this.minAge = 0
          }
          if(this.age < this.minAge || this.age > this.maxAge) {
            this.setAge(this.minAge)
            this.setBirthday('')
            this.$createDialog({
              type: 'alert',
              title: '',
              content: '交费期间为30年时，最大年龄为40周岁，请重新选择年龄'
            }).show()
          }
        }
        
        this.calculatePremium()
      },
      addition() {
        this.calculatePremium()
      }
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
