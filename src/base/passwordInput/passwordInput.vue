<template>
  <transition name="password">
    <div class="mark" v-if="show">
      <div class="password-inputer">
        <div class="title">
          <span class="close-btn-wrapper" @click="closeMark">
            <span class="close-btn"></span>
          </span>
          <h2>验证手机号</h2>
          <div class="desc">
            <p class="icon">短信验证码发送至{{phone}}</p>
          </div>
        </div>
        <div class="inputer-wrapper">
          <div class="inputers">
            <div ref="inputers" class="inputers-container">
              <span 
                v-for="(item, index) in [1,2,3,4,5,6]" 
                class="inputer border-bottom" 
                :class="{
                          'current': index === currentIndex,
                          'inputed': index < currentIndex
                        }"
                ></span>
            </div>
            <div class='inputer-tips'>
              <span class="inputer-error-tip" v-show="status === 0">验证码输入错误，请重新输入</span>
              <span class="inputer-info-tip" v-show="status !== 0">
                <span v-show="t !== 0">
                  <span>{{t}}</span>s 后重新发送
                </span>
                <span v-show="t === 0" @click="resend">重新发送短信</span>
              </span>
            </div>
          </div>
          <table class="keyboard">
            <tr v-for="item in keyboard">
              <td 
                v-for="keyboardNum in item" 
                :class="{'grey': (!keyboardNum && keyboardNum !== 0) || keyboardNum < 0}" 
                @click="keydown(keyboardNum)"
              >
                <span v-if="(keyboardNum && keyboardNum > 0) || keyboardNum === 0 ">{{keyboardNum}}</span>
                <span v-if="keyboardNum && keyboardNum < 0" class="backspace-icon"></span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  import { prefixStyle } from 'common/js/dom'
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    props: {
      phone: {
        type: String,
        default: '182******68'
      },
      show: {
        type: Boolean,
        default: false
      },
      t: {
        type: Number,
        default: 59
      }
    },
    data() {
      return {
        keyboard: [
          [1,2,3],
          [4,5,6],
          [7,8,9],
          ["",0,-1]
        ],
        code: [],
        status: 1,
        currentIndex: 0
      }
    },
    methods: {
      init() {
        this.code = []
        this.currentIndex = 0
        for(let i = 0; i < 6; i++) {
          this.$refs.inputers.children[i].innerHTML = ''
        }
      },
      resend() {
        this.init()
        this.$emit('resend')
      },
      addErr() {
        this.status = 0
        this.$refs.inputers.classList.add('error')
      },
      removeErr() {
        this.status = 1
        this.$refs.inputers.classList.remove('error')
      },
      closeMark() {
        this.$emit('hide')
      },
      keydown(num) {
        const l = this.code.length
        if(this.currentIndex < 6) {
          if(num || num === 0) {
            if(num !== -1) {
              this.code.push(num)
              this.currentIndex += 1
              this.$refs.inputers.children[l].innerHTML = this.code[l]
              if(this.currentIndex === 6) {
                const res = this.code.join('')
                // 输入完成
                this.$emit('complete', res)
              }
            }else{
              this.code.pop()
              const clear = l - 1 < 0 ? 0 : l - 1
              this.$refs.inputers.children[clear].innerHTML = ''
              this.currentIndex -= 1
              if(this.currentIndex < 0) {
                this.currentIndex = 0
              }
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/base.styl'

  .mark
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0,0,0,.5)
    z-index: 1000
    &.password-enter-active,&.password-leave-active
      transition: all 0.4s
      .password-inputer
        transition: all 0.4s
    &.password-enter,&.password-leave-to
      opacity: 0
      .password-inputer
        transform: translate3d(0, 200%, 0)
    .password-inputer
      position: fixed
      bottom: 0
      left: 0
      width: 100%
      font-size: 16px
      background-color: #fff
      transform: translate3d(0, 0, 0)
      .title
        position: relative
        padding: 17px 15px 0
        text-align: center
        .close-btn-wrapper
          position: absolute
          right: 5px
          top: 9px
          display: inline-block
          padding: 10px
          .close-btn
            display: block
            width: 13px
            height: 13px
            background: url(payclose.png) center no-repeat
            background-size: contain
        h2
          font-size: 23px
          line-height: 23px
          color: #394259
          font-weight: normal
          margin: 0
        .desc
          text-align: center
          .icon
            background-size: contain
            padding-left: 14px
            display: inline-block
            font-size: 14px
            line-height: 14px
            color: #5d667a
            margin: 1em 0
      .inputer-wrapper
        .inputers
          padding: 5px 0 20px
          text-align: center
          &:before, &:after
            display: table
            content: " "
          &:after
            clear: both
          .inputers-container
            width: 289px
            margin: 0 auto
            display: inline-block
            &.error
              .inputer
                &.inputed
                  animation: none
                  color: #e63617
              .border-bottom:after
                background-color: #e63617
            .inputer
              box-sizing: border-box
              width: 13.5%
              height: 50px
              font-size: 27px
              line-height: 50px
              float: left
              position: relative
              &.inputed
                color: #868e9e
                animation: color-gradient 0.8s 1
              &.current:after
                background-color: #394259
              &.current:before
                content: ''
                position: absolute
                left: 50%
                top: 50%
                margin-top: -9px
                margin-left: -1px
                width: 1px
                height: 18px
                background: #394259
                animation: fake-pointer 1.2s infinite
            .inputer + .inputer
              margin-left: 3.8%
          .inputer-tips
            display: inline-block
            width: 100%
            margin-top: 15px
            font-size: 12px
            .inputer-error-tip
              color: #e63617
            .inputer-info-tip
              color: #868e9e
            .help
              color: #397be6
              margin-left: 15px 
        .keyboard
          width: 100%
          border-collapse: collapse
          td
            display: table-cell
            vertical-align: middle
            width: 33.33%
            height: 54px
            border: 1px solid #ccc
            border-width: 1px 1px 0 0
            font-size: 28px
            text-align: center
            box-sizing: border-box
            color: #000
            &.grey
              background-color: #e5e7eb
              .backspace-icon
                display: inline-block
                width: 23px
                height: 17px
                background: url(smsdel.png) left top no-repeat
                background-size: 23px 17px
          td:nth-child(3n+3)
            border-right-width: 0


  @keyframes fake-pointer {
      0% {
          opacity: 1
      }
      10% {
          opacity: 1
      }
      50% {
          opacity: 1
      }
      60% {
          opacity: 0
      }
      90% {
          opacity: 0
      }
      100% {
          opacity: 0
      }
  }

  @keyframes color-gradient{
      0% {
          color: #394259;
      }
      25% {
          color: #394259;
      }
      50% {
          color: #394259;
      }
      75% {
          color: #868e9e;
      }
      100% {
          color: #868e9e;
      }
  }

</style>
