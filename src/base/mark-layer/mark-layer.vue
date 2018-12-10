<template>
  <transition name="mark">
    <div v-show="show" class="mark">
      <div class="payMark">
        <div class="layer" @click="hideMark" @touchmove.prevent></div>
        <div class="payCont" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hideMark() {
        this.$emit('hide')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .fix-iphonex-bottom
    .mark
      .payMark
        .payCont
          padding-bottom: ($bottom + 0)px
  
  .mark
    &.mark-enter-active,&.mark-leave-active
      transition: all 0.2s
      .payMark
        .payCont
          transition: all 0.2s
    &.mark-enter,&.mark-leave-to
      opacity: 0
      .payMark
        .payCont
          transform: translate3d(0, 100%, 0)
    .payMark
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      pointer-events: auto
      z-index: 99
      .layer
        position: absolute
        left: 0
        top: 0
        z-index: 1
        width: 100%
        height: 100%
        background-color: rgba(0,0,0,.5)
      .payCont
        width: 100%
        padding-bottom: 0
        max-height: 520px
        overflow-y: auto
        overflow-x: hidden
        padding: 0 20px
        box-sizing: border-box
        position: absolute
        left: 0
        bottom: 0
        z-index: 2
        background-color: #fff
        backface-visibility: hidden
        transform: translate3d(0, 0, 0)  
</style>
