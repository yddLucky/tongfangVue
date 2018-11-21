<template>
  <div @click='showDatePicker' class="area-occupation-age border-bottom">
    <div class="tit">出生日期</div>
    <div class="select">
      <span :class="{'primary': selectedText === '请选择' }">{{selectedText}}</span><i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
      selectedText: '请选择'
    }
  },
  computed: {
    ...mapGetters([
      'appAge'
    ])
  },
  mounted() {
    this.now = new Date()
    if (this.appAge) {
      this.selectedText = this.appAge
      this.now = new Date(this.appAge)
    }
  },
  methods: {
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '请选择出生日期',
          min: new Date(1786, 8, 8),
          max: new Date(2020, 9, 20),
          value: this.now,
          format: {
            year: 'YYYY年',
            month: 'MM月',
            date: 'DD日'
          },
          swipeTime: 400,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker.$updateProps({
        value: new Date(this.selectedText)
      })
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.$createDialog({
        type: 'warn',
        content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
        icon: 'cubeic-alert'
      }).show()
      
      let newText = []
      selectedVal.forEach(item => {
        if(parseInt(item) < 10) {
          item = '0' + item
        }
        newText.push(item.toString())
      })
      this.selectedText = newText.join('-')
      this.setAppAge(this.selectedText)
    },
    cancelHandle() {
    },
    ...mapMutations({
      setAppAge: 'SET_APPAGE'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
