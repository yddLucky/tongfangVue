<template>
  <div class="m-header border-bottom" @touchmove.prevent>
    <i class="el-icon-arrow-left" @click='back' v-if='backFlag'></i>
    <div class="icon"></div>
    <h1 class="text">{{title}}</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      backFlag: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '同方全球'
      }
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: fixed
    z-index: 99999
    left: 0
    top: 0
    width: 100%
    height: 44px
    text-align: center
    color: $color-theme-head
    font-size: 0
    background: #fff
    i
      font-size: 24px
      line-height: 44px
      position: absolute
      left: 20px
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 30px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 30px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
</style>