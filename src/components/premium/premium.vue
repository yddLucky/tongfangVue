<template>
  <div class="scroll-list-wrap">
    <cube-scroll 
      ref="scroll"
      :scrollEvents= "['before-scroll-start']"
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
      @before-scroll-start="blurInput"
    >
      <div>
        <plan tit='请选择保障计划'></plan>
        <div class="information">
          <select-bar
            tit="保障期限"
            :data="coverPeriod.selectList" 
            :selected="coverPeriod.selected" 
            @select="selectedCoverPeriod"
          ></select-bar>
          <select-bar
            tit="缴费期限"
            :data="paymentPeriod.selectList" 
            :selected="paymentPeriod.selected" 
            @select="selectedPaymentPeriod"
          ></select-bar>
          <div style="width: 100%;height: 56px;line-height: 56px;text-align: center" @click="showPassword" v-if="showYZM">显示验证码</div>
          <area-occupation
            tit="投保地区"
            type='area'
            :data="areaList"
            :selected="area"
            @select="selectedArea"
          ></area-occupation>
          <area-occupation
            tit="投保人职业"
            type='occupation'
            :data="occupationList"
            :selected="occupation"
            @select="selectedOccupation"
          ></area-occupation>
          <age 
            :age=appAge
            :birthday=appBirthday
            :maxAge='40' 
            :minAge='18' 
            :updateAge='30'
            @setBirthday='setAppBirthday'
            @setAge='setAppAge'
          ></age>
          <age 
            :age=insAge
            :birthday=insBirthday
            :maxAge='17' 
            :minAge='0' 
            :updateAge='10'
            @setBirthday='setInsBirthday'
            @setAge='setInsAge'
          ></age>
          <input-bar
            ref='appName'
            tit="投保人姓名"
            :data=appName
            type="text"
            errMsg="请输入正确的投保人姓名"
            :maxlength="10"
            @blur="changeAppName"
          ></input-bar>
          <check-box
            tit="性别"
            :data="sexList"
            :checked=appSex
            @checked="changeAppSex"
          ></check-box>
        </div>
      </div>
    </cube-scroll>
    <password-input
      ref="password"
      v-if="passwordShow"
      :show="passwordShow"
      :phone="phone"
      :t = "passwordTime"
      @hide="hidePassword"
      @resend="showPassword"
      @complete="checkPassword"
    ></password-input>
  </div>
</template>

<script type='text/ecmascript-6'>
import PasswordInput from 'base/passwordInput/passwordInput'
import Plan from 'base/plan/plan'
import SelectBar from 'base/select/select'
import AreaOccupation from 'base/area/area'
import InputBar from 'base/input/input'
import CheckBox from 'base/checkbox/checkbox'
import {getArea} from 'api/area'
import {getOccupation} from 'api/occupation'
import Age from 'base/age/age'
import { sexList } from 'common/js/config'
import { scrollTopError } from 'common/js/util'
import { mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
      sexList: sexList,
      areaList: {},
      occupationList: {},
      passwordShow: false,
      passwordTime: 0,
      phone: '150******46',
      showYZM: true
    }
  },
  computed: {
    ...mapGetters([
      'appName',
      'appSex',
      'coverPeriod',
      'paymentPeriod',
      'area',
      'occupation',
      'appAge',
      'appBirthday',
      'insAge',
      'insBirthday'
    ])
  },
  mounted() {
    this.getArea()
    this.getOccupation()
  },
  methods: {
    blurInput() {
      const scroll = this.$refs.scroll
      scroll && scroll.scroll.on('beforeScrollStart', () => {
        let activeElement = document.activeElement
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          activeElement.blur()
        }
      })
    },
    setTimer() {
      let that = this
      if(that.passwordTime === 0) {
        this.sendPassword()
        that.passwordTimer = setInterval(function(){
          if(that.passwordTime > 0) {
            that.passwordTime--
          }else{
            that.showYZM = true
            clearInterval(that.passwordTimer)
            that.passwordTime = 0
          }
        }, 1000)
      }
    },
    sendPassword() {
      this.passwordTime = 59
      // 请求验证码
      console.log("请求验证码")
    },
    showPassword() {
      this.passwordShow = true
      this.setTimer()
    },
    checkPassword(res) {
      console.log("验证完成")
      // 需要发送验证码请求后判定
      if(res === '222222') {
        let that = this
        this.$refs.password.addErr()
        const timer = setTimeout(function(){
          that.$refs.password.removeErr()
          that.$refs.password.init()
          clearTimeout(timer)
        }, 500)
      }else{
        this.passwordShow = false
        this.showYZM = false
      }
    },
    hidePassword() {
      this.passwordShow = false
    },
    changeAppSex(res) {
      this.setAppSex(res)
    },
    changeAppName(res) {
      if (res) {
        console.log(res)
        this.$refs.appName.addErr()
      }
      this.setAppName(res)
    },
    selectedCoverPeriod(res) {
      this.setCoverPeriod({
        selectList: this.coverPeriod.selectList,
        selected: res
      })
    },
    selectedPaymentPeriod(res) {
      this.setPaymentPeriod({
        selectList: this.paymentPeriod.selectList,
        selected: res
      })
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
    getOccupation() {
      getOccupation().then((res) => {
        this.occupationList = res[0]
      }).catch((err) => {
        this.$createDialog({
          type: 'alert',
          title: '',
          content: '网络异常，请刷新重试',
          icon: ''
        }).show()
      })
    },
    setAppBirthday(res) {
      this.setAppBirthday(res)
    },
    setAppAge(res) {
      this.setAppAge(res)
    },
    setInsBirthday(res) {
      this.setInsBirthday(res)
    },
    setInsAge(res) {
      this.setInsAge(res)
    },
    selectedArea(res) {
      this.setArea({
        level1: res.val[0],
        level2: res.val[1],
        level3: res.val[2],
        text: res.text
      })
    },
    selectedOccupation(res) {
      this.setOccupation({
        level1: res.val[0],
        level2: res.val[1],
        level3: res.val[2],
        text: res.vtext
      })
    },
    ...mapMutations({
      setAppName: 'SET_APPNAME',
      setAppSex: 'SET_APPSEX',
      setCoverPeriod: 'SET_COVERPERIOD',
      setPaymentPeriod: 'SET_PAYMENTPERIOD',
      setArea: 'SET_AREA',
      setOccupation: 'SET_OCCUPATION',
      setAppAge: 'SET_APPAGE',
      setAppBirthday: 'SET_APPBIRTHDAY',
      setInsAge: 'SET_INSAGE',
      setInsBirthday: 'SET_INSBIRTHDAY'
    })
  },
  components: {
    Plan,
    SelectBar,
    AreaOccupation,
    Age,
    InputBar,
    CheckBox,
    PasswordInput
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
  
  .fix-iphonex-bottom
    .scroll-list-wrap
      bottom: ($bottom + 0)px
  .scroll-list-wrap
    position: fixed
    width: 100%
    top: 44px
    bottom: 0
    .information
      padding: 0 20px 30px
</style>
