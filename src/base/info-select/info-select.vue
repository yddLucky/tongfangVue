<template>
  <div class="info-select border-bottom" @click="selectBank">
    <div ref="info">
      <label>{{tit}}</label>
      <div class="selected">{{selectedText}}</div>
    </div><i class="el-icon-caret-right"></i>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      selected: {
        type: Number | String,
        default: ''
      }
    },
    data() {
      return {
        tit: '',
        selectedText: '',
        selectedIndex: [0]
      }
    },
    mounted() {
      this.initTit()
    },
    methods: {
      initText() {
        this.data.forEach((item, index) => {
          if(item.value === this.selected){
            this.selectedIndex[0] = index
            this.selectedText = item.text
          }
        })
      },
      initTit() {
        if(this.selected) {
          this.initText()
          this.tit = this.title
          this.$refs.info.classList.add('current')
        }else{
          this.tit = '请选择' + this.title
          this.$refs.info.classList.remove('current')
        }
      },
      selectBank() {
        this.tit = this.title
        this.$refs.info.classList.add('current')
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '请选择' + this.title,
            data: [this.data],
            selectedIndex: this.selectedIndex,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle,
            cancelTxt: '取消',
            confirmTxt: '确定'
          })
        }
        this.picker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.tit = this.title
        this.$refs.info.classList.add('current')

        this.selectedText = selectedText.join(' ')
        this.$emit('select', selectedVal.join(', '))
      },
      cancelHandle() {
        this.initTit()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .info-select
    position: relative
    width: 100%
    height: 68px
    line-height: 21px
    display: flex
    &>div
      flex: 1 1 100%
      &.current
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
      .selected
        width: 100%
        height: 100%
        padding: 32px 21px 15px 0
        border: none
        outline: none
        color: #121c32
        font: inherit
        box-sizing: border-box
    i
      line-height: 68px
      &:before
        color: #3f6db3
</style>
