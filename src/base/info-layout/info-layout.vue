<template>
  <div class="info-layout border-bottom">
    <label>{{tit}}</label>
    <div ref="text">{{text}}</div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    tit: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    addHeightLight() {
      this.$refs.text.classList.add('height-light')
    },
    removeHeightLight() {
      this.$refs.text.classList.remove('height-light')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .info-layout
    position: relative
    width: 100%
    height: 68px
    line-height: 21px
    label
      position: absolute
      top: 15px
      font-size: 12px
      line-height: 12px
      color: #5d667a
    div
      width: 100%
      height: 100%
      padding: 32px 21px 15px 0
      border: none
      outline: none
      color: #121c32
      font: inherit
      box-sizing: border-box
      &.height-light
        color: #bec2cc
</style>
