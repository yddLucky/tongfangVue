<template>
  <div class="selectBar border-bottom">
    <div class="tit">{{tit}}</div>
    <div class="select">
      <span class="cloud" ref="cloud"></span>
      <ul ref="list">
        <li v-for="(item, index) in data" @click="check(item.value, index)">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { prefixStyle } from 'common/js/dom'

const transform = prefixStyle('transform')

export default {
  props: {
    tit: {
      type: String,
      default: '请输入tit'
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    checked: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this._initCloud()
  },
  methods: {
    _initCloud() {
      this.data.forEach((item, index) => {
        if (item.value === this.checked) {
          this._move(index, 0)
        }
      })
    },
    _move(index, duration) {
      let that = this
      const dom = that.$refs.list.children[index]
      const domLeft = dom.offsetLeft
      const domWidth = dom.offsetWidth
      let cloud = that.$refs.cloud
      cloud.style.width = domWidth + 'px'
      cloud.style.transition = `all ${duration}`
      cloud.style[transform] = `translate3d(${domLeft}px,0,0)`
    },
    check(v, index) {
      if(v !== this.checked) {
        this._move(index, '0.4s')
        this.$emit('checked', v)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.selectBar
  .tit
    flex: 1 1 auto
  .select
    position: relative
    flex: 1 1 auto
    .cloud
      position: absolute
      z-index: 3
      display: block
      height: 22px
      border-radius: 20px
      background-color: #c8ebff
    ul
      position: relative
      z-index: 4
      display: flex
      align-items: center
      align-content: center
      flex-wrap: wrap
      justify-content: flex-end
      width: 100%
    li
      flex: 0 0 auto
      height: 16px
      line-height: 16px
      padding: 0 20px
      box-sizing: border-box
</style>
