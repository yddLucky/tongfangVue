<template>
  <div class="premium">
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
</template>

<script type='text/ecmascript-6'>
import Plan from 'base/plan/plan'
import SelectBar from 'base/select/select'
import AreaOccupation from 'base/area/area'
import InputBar from 'base/input/input'
import CheckBox from 'base/checkbox/checkbox'
import {getArea} from 'api/area'
import {getOccupation} from 'api/occupation'
import Age from 'base/age/age'
import { sexList } from 'common/js/config'
import { mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
      sexList: sexList,
      areaList: {},
      occupationList: {}
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
    // let that = this
    this.getArea()
    this.getOccupation()
  },
  methods: {
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
    CheckBox
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.premium
  .information
    padding: 0 20px
</style>
