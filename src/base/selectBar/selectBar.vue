<template>
  <div class="selectBar border-bottom">
    <div class="tit">{{data.tit}}</div>
    <div class="select">
      <select name="select" v-model="value" @change="_choose()" :class="{'primary': value === '请选择'}">
        <option value="请选择">请选择</option>
        <option v-for="(value, key, index) in data.options" :value="key">{{value}}</option>
      </select><i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    selected: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      value: this.selected
    }
  },
  methods: {
    _choose() {
      this.$emit('changeSelect', this.value)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"
@import '~common/stylus/base.styl'
@import '~common/stylus/mixin.styl'

.selectBar
  position: relative
  display: flex
  align-items: center
  padding: 20px 0
  font-size: 16px
  height: 16px
  line-height: 16px
  .tit
    flex: 1 1 25%
    color: $color-theme-head
    letter-spacing: 0
  .select
    flex: 1 1 75%
    text-align: right
    font-weight: 700
    select
      min-width: 30%
      height: 100%
      width: 90%
      direction: rtl
      appearance: none
      border: 0
      outline: none
      font-size: 14px
      background: #fff
      &.primary
        color: $color-theme-hold
      option
        font-size: 14px
</style>
