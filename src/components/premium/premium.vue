<template>
  <div class="premium">
    <plan tit='请选择保障计划'></plan>
    <div class="information">
      <select-bar :data="dataSelect" :selected="selected" @changeSelect="changeSelect"></select-bar>
      <area-occupation
        tit="投保地区"
        type='area'
        :data="areaList"
        :selected="area"
        @select="selectedArea"
      >
      </area-occupation>
      <area-occupation
        tit="投保人职业"
        type='occupation'
        :data="occupationList"
        :selected="occupation"
        @select="selectedOccupation"
      >
      </area-occupation>
      <age 
        :age=appAge
        :birthday=appBirthday
        :maxAge='40' 
        :minAge='18' 
        :updateAge='30'
        @setBirthday='setAppBirthday'
        @setAge='setAppAge'
      >
      </age>
      <age 
        :age=insAge
        :birthday=insBirthday
        :maxAge='17' 
        :minAge='0' 
        :updateAge='10'
        @setBirthday='setInsBirthday'
        @setAge='setInsAge'
      >
      </age>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Plan from 'base/plan/plan'
import SelectBar from 'base/selectBar/selectBar'
import AreaOccupation from 'base/area1/area1'
import {getArea} from 'api/area'
import {getOccupation} from 'api/occupation'
import Age from 'base/age/age'
import { mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
      dataSelect: {
        tit: '保障期限',
        options: {
          '30': '30年',
          '70': '至70周岁',
          '105': '终身'
        }
      },
      selected: '请选择',
      areaList: {},
      occupationList: {}
    }
  },
  computed: {
    ...mapGetters([
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
    changeSelect(selected) {
      this.selected = selected
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
        text: res.text
      })
    },
    ...mapMutations({
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
    Age
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.premium
  .information
    padding: 0 20px
</style>
