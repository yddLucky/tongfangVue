<template>
  <div class="nav" :class="{'more': data.length > 3, 'white': type === 'white','gray': type === 'gray'}">
    <div class="nav-tabs" ref="tab">
      <div class="tabs">
        <div class="tab" v-for='(item, index) in data' :class="{'current': current === index}" @click="chooseTab(index)">
          <div class="text">
            <div>
              <div class="top" v-if="type === 'gray'">
                <span class="number">{{item.lowest}}</span>{{item.lowestDes}}
              </div>
              <div class="bottom">{{item.insurAmountDesc}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'

const leftPadding = 20

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    current: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'gray'
    }
  },
  mounted() {
    setTimeout(() => {
      this._initTab()
    }, 20)

    window.addEventListener('resize', () => {
      if(this.tab) {
        this.tab.refresh()
      }
    })
  },
  methods: {
    chooseTab(index) {
      this.$emit('chooseTab', index)
      this._scroll(index)
    },
    _initTab() {
      this.tab = new BScroll(this.$refs.tab, {
        scrollX: true,
        scrollY: false,
        click: true
      })
    },
    _scroll(index) {
      this.currentDom =  this.$refs.tab.children[0].children[index]
      const domWidth = this.currentDom.offsetWidth
      const windowWidth = document.body.clientWidth
      const windowLeft = this.currentDom.getBoundingClientRect().left
      const offsetLeft = this.currentDom.offsetLeft
      let scrollleft = offsetLeft + leftPadding + domWidth - windowWidth

      if(windowLeft - domWidth/2 < 0) {
        if(index > 0) {
          scrollleft = offsetLeft - domWidth/2
        }else{
          scrollleft = 0
        }
        this.tab.scrollTo(-scrollleft, 0, 300)
      }

      if(windowLeft + domWidth*3/2 > windowWidth) {
        if(index < this.data.length-1) {
          scrollleft = scrollleft + domWidth/2
        }else{
          scrollleft = scrollleft + leftPadding
        }
        this.tab.scrollTo(-scrollleft, 0, 300)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.nav
    &.gray
      position: relative
      color: #394259
      text-align: center
      .nav-tabs
        position: relative
        overflow: hidden
        padding: 5px 20px 0
        height: 75px
        box-sizing: border-box
        background: linear-gradient(to bottom, white, #f5f5f5)
        .tabs
          display: flex
          .tab
            flex: 1
            min-width: 105px
            height: 75px
            padding-top: 5px
            font-size: 14px
            line-height: 14px
            padding-right: 0
            &.current
              color: #fa9128
              .text
                position: relative
                color: #fa9128
                background-color: white
                box-shadow: 0 -1px 5px rgba(160, 160, 160, 0.5)
                &:before
                  content: ""
                  position: absolute
                  left: 0
                  top: 0
                  width: 100%
                  height: 3px
                  background-color: #fa9128
            .text
              display: table
              width: 95%
              margin: auto
              height: 100%
              background-color: #f7f8fa
              box-sizing: border-box
              & > div
                display: table-cell
                vertical-align: middle
              .number
                font-size: 700
                font-size: 20px
                line-height: 20px
              .bottom
                margin-top: 5px
      &.more
        .nav-tabs
          padding: 5px 28px 0 20px
          .tabs
            min-width: 100%
            display: inline-block
            white-space: nowrap
            box-sizing: border-box
            padding-right: 40px
            .tab
              display: inline-block
    &.white
      position: relative
      color: #394259
      text-align: center
      font-size: 16px
      .nav-tabs
        position: relative
        overflow: hidden
        padding-left: 20px
        .tabs
          min-width: 100%
          display: inline-block
          white-space: nowrap
          box-sizing: border-box
          .tab
            display: inline-block
            min-width: 50px
            width: auto
            height: 50px
            line-height: 55px
            padding-right: 15px
            position: relative
            box-sizing: border-box
            vertical-align: super
            &.current
              color: #fa9128
              .text:after
                content: ""
                position: absolute
                border-top: 3px solid #fa9128
                bottom: 5px
                width: 25px
                left: 50%
                margin-left: -20px
</style>
