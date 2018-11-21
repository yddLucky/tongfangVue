<template>
  <div class="premium">
    <plan tit='请选择保障计划'></plan>
    <div class="information">
      <select-bar :data="dataSelect" :selected="selected" @changeSelect="changeSelect"></select-bar>
      <area-l></area-l>
      <occupation></occupation>
      <age></age>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Plan from 'base/plan/plan'
import SelectBar from 'base/selectBar/selectBar'
import AreaL from 'base/area/area'
import Occupation from 'base/occupation/occupation'
import Age from 'base/age/age'

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
  methods: {
    changeSelect(selected) {
      this.selected = selected
    }
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
