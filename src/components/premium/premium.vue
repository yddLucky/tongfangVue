<template>
  <div class="premium">
    <plan tit='请选择保障计划'></plan>
    <div class="information">
      <select-bar :data="dataSelect" :selected="selected" @changeSelect="changeSelect"></select-bar>
      <area-l></area-l>
      <occupation></occupation>
      <age 
          :age = appAge
          :birthday = appBirthday
          :maxAge = '40' 
          :minAge = '18' 
          :updateAge = '30'
          @setBirthday = 'setAppBirthday'
          @setAge = 'setAppAge'
          >
      </age>
      <age 
          :age = insAge
          :birthday = insBirthday
          :maxAge = '17' 
          :minAge = '0' 
          :updateAge = '10'
          @setBirthday = 'setInsBirthday'
          @setAge = 'setInsAge'
          >
      </age>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Plan from 'base/plan/plan'
import SelectBar from 'base/selectBar/selectBar'
import AreaL from 'base/area/area'
import Occupation from 'base/occupation/occupation'
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
      selected: '请选择'
    }
  },
  computed: {
    ...mapGetters([
      'appAge',
      'appBirthday',
      'insAge',
      'insBirthday'
    ])
  },
  methods: {
    changeSelect(selected) {
      this.selected = selected
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
    ...mapMutations({
      setAppAge: 'SET_APPAGE',
      setAppBirthday: 'SET_APPBIRTHDAY',
      setInsAge: 'SET_INSAGE',
      setInsBirthday: 'SET_INSBIRTHDAY'
    })
  },
  components: {
    Plan,
    SelectBar,
    AreaL,
    Occupation,
    Age
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.premium
  .information
    padding: 0 20px
</style>
