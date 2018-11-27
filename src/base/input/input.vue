<template>
  <div ref="err" class='primary'>
    <div ref="inputBar" class="inputBar border-bottom" @click.stop.prevent="_focus">
      <label>{{title}}</label>
      <input ref="input" :type="type" @blur="blur" v-model="val" :maxlength="maxlength" @focus="focus">
      <transition name="fade">
        <i ref="del" v-show="showIcon" class="el-icon-circle-close" @click="_clear"></i>
      </transition>
    </div>
    <span class="errMsg">{{errMsg}}</span>
  </div>
</template>

<script type='text/ecmascript-6'>
import {trim} from 'common/js/util'
// 数据后台获取进来显示是否有问题待确认
const pre = '请输入'

export default {
  props: {
    tit: {
      type: String,
      default: '请传入tit'
    },
    data: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    maxlength: {
      type: Number,
      default: 50
    },
    errMsg: {
      type: String,
      default: '输入信息有误，请确认'
    }
  },
  data() {
    return {
      val: '',
      showIcon: false,
      title: ''
    }
  },
  mounted() {
    this._initAll()
  },
  methods: {
    _initAll() {
      this._initInput()
      this._initTitle(this.showIcon)
    },
    _initInput() {
      this.val = this.data
      if (this.val) {
        this.$refs.inputBar.classList.add('has')
      }else{
        this.$refs.inputBar.classList.remove('has')
      }
    },
    _initTitle(n) {
      if(!n) {
        if(this.val){
          this.title = this.tit
        }else{
          this.title = pre + this.tit
        }
      }else{
        this.title = this.tit
      }
    },
    addRequired() {
      this.$refs.err.classList.add('required')
    },
    removeRequired() {
      this.$refs.err.classList.remove('required')
    },
    addErr() {
      this.$refs.err.classList.add('err')
    },
    removeErr() {
      this.$refs.err.classList.remove('err')
    },
    addCurrent() {
      this.$refs.err.classList.add('current')
    },
    removeCurrent() {
      this.$refs.err.classList.remove('current')
    },
    _focus() {
      this.$refs.input.focus()
    },
    focus() {
      this.$refs.inputBar.classList.add('current')
      this.removeErr()
      this.removeRequired()
      this.showIcon = true
    },
    blur() {
      this.showIcon = false
      this.val = trim(this.val)
      this.$refs.inputBar.classList.remove('current')
      if (this.val !== '') {
        this.$refs.inputBar.classList.add('has')
      }else{
        this.$refs.inputBar.classList.remove('has')
      }
      this.$emit('blur', this.val)
    },
    _clear() {
      this.val = ''
    }
  },
  watch: {
    showIcon(n) {
      this._initTitle(n)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import '~common/stylus/base.styl'
.primary
  .inputBar
    position: relative
    display: flex
    padding: 32px 0 15px
    font-size: 16px
    height: 21px
    line-height: 21px
    &:after
      background-color: $color-input-border
    &.current
      &:after
        background-color: $color-input-border-l
      label
        top: 15px
        font-size: 12px
        line-height: 12px
        color: #5d667a
    &.has
      label
        top: 15px
        font-size: 12px
        line-height: 12px
        color: #5d667a
    label
      position: absolute
      top: 0
      color: #bec2cc
      line-height: 68px
      transform-origin: left top 0px
      transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms
      transform: scale(1) translate(0px, 0px)
      pointer-events: none
    input
      flex: 1 1 100%
      height: 100%
      border: none
      outline: none
      color: #121c32
      font: inherit
      box-sizing: border-box
    i
      position: relative
      color: #bec2cc
      height: 16px
      opacity: 1
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
      .fade-enter, .fade-leave-to{
        opacity: 0;
      }
      &:after
        content: ''
        position: absolute
        top: -10px
        left: -10px
        right: -10px
        bottom: -10px
  .errMsg
    display: none
    font-size: 12px
    line-height: 12px
    padding: 5px 0
    color: $color-input-border-e
  &.err
    .inputBar
       &:after
        background-color: $color-input-border-e
      input
        color: $color-input-border-e
    .errMsg
      display: block
  &.required
    .inputBar
      &:after
        background-color: $color-input-border-e
      label
        color: $color-input-border-e
</style>
