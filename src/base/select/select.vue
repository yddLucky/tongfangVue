<template>
  <div class="selectBar border-bottom" @click="showPicker">
    <div class="tit">{{tit}}</div>
    <div class="select" v-if="data.length > 1">
      <span :class="{'primary': selectedText === '请选择' }" ref="selected">{{selectedText}}</span><i class="el-icon-caret-right"></i>
    </div>
    <div class="select" v-if="!(data.length > 1)">
      <span>{{selectedText}}</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
let selectedIndex = [0]

export default {
  props: {
    tit: {
      type: String,
      default: '保障期限' 
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    selected: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      selectedText: '请选择'
    }
  },
  mounted() {
    this._initPickerData()
  },
  methods: {
    _initPickerData() {
      this.data.forEach((item, index) => {
        if(item.value === this.selected){
          selectedIndex = index
          this.selectedText = item.text
        }
      })
    },
    showPicker() {
      if (!(this.data.length > 1)) {
        return
      }
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '请选择' + this.tit,
          data: [this.data],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
          cancelTxt: '取消',
          confirmTxt: '确定'
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.selectedText = selectedText.join(' ')
      this.$emit('select', selectedVal.join(', '))
    },
    cancelHandle() {
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
