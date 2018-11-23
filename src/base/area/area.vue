<template>
  <div @click='showAddressPicker' class="selectBar border-bottom">
    <div class="tit">{{tit}}</div>
    <div class="select">
      <span :class="{'primary': selectedText === '请选择' }" ref="selected">{{selectedText}}</span><i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import {trim} from 'common/js/util'

let selectedIndex = [0,0,0]
let selectedTextArr = []

export default {
  props: {
    type: {
      type: String,
      default: 'area'
    },
    tit: {
      type: String,
      default: '投保地区'
    },
    data: {
      type: Object,
      default: () => ({})
    },
    selected: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedText: '请选择'
    }
  },
  mounted() {
    this._initJoiner()
    this._initData()
  },
  methods: {
    _initJoiner() {
      this.joiner = this.type === 'area' ? ' ' : '/'
    },
    _changeSelected() {
      // 内容左右对齐样式修改
      setTimeout(()=> {
        if(this.$refs.selected && this.$refs.selected.offsetHeight > 16) {
          this.$refs.selected.classList.add('left')
        }else{
          this.$refs.selected.classList.remove('left')
        }
      }, 20)
    },
    _initData() {
      // 数据结构
        // [
        //   {
        //     value: '110000',
        //     text: '北京市',
        //     children: [
        //       {
        //         value: '110100',
        //         text: '北京市',
        //         children: [
        //           value: '110100',
        //           text: '北京市'
        //         ]
        //       }
        //     ]
        //   }
        // ]
      this.firstAreaList = this.data.level1
      this.secondAreaList = this.data.level2
      this.thirdAreaList = this.data.level3
      this.addressData = []
      if(this.firstAreaList) {
        this.firstAreaList.forEach((item1,index) => {
          if(this.selected.level1) {
            if(this.selected.level1 === item1.code) {
              selectedIndex[0] = index
              selectedTextArr[0] = trim(item1.name)
            }
          }
          let obj1 = {
            value: item1.code,
            text: trim(item1.name),
            children: []
          }
          this.addressData.push(obj1)
          if(this.secondAreaList) {
            this.secondAreaList.forEach((item2, index) => {
              if(this.selected.level2) {
                if(this.selected.level2 === item2.code) {
                  selectedIndex[1] = index
                  selectedTextArr[1] = trim(item2.name)
                }
              }
              if(item2.parentCode === item1.code) {
                let obj2 = {
                  value: item2.code,
                  text: trim(item2.name),
                  children: []
                }
                obj1.children.push(obj2)
                if(this.thirdAreaList) {
                  this.thirdAreaList.forEach((item3, index) => {
                    if(this.selected.level3) {
                      if(this.selected.level3 === item3.code) {
                        selectedIndex[2] = index
                        selectedTextArr[2] = trim(item3.name)
                      }
                    }
                    if(item3.parentCode === item2.code) {
                      let obj3 = {
                        value: item3.code,
                        text: trim(item3.name)
                      }
                      obj2.children.push(obj3)
                    }
                  })
                }
              }
            })
          }
        })
        if(selectedTextArr[0]){
          this.selectedText = selectedTextArr.join(this.joiner)
        }
        this._changeSelected()
      }else{
        return
      }
      this._initArea()
    },
    _initArea() {
      this.addressPicker = this.$createCascadePicker({
        title: '请选择'+ this.tit,
        data: this.addressData,
        swipeTime: 400,
        selectedIndex: selectedIndex,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
    },
    showAddressPicker() {
      if(this.addressPicker) {
        this.addressPicker.show()
      }
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.selectedText = selectedText.join(this.joiner)
      this.$emit('select', {val: selectedVal, text: this.selectedText})
      this._changeSelected()
    },
    cancelHandle() {
    }
  },
  watch: {
    data(newData) {
      this._initData()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
