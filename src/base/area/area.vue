<template>
  <div @click='showAddressPicker' class="area-occupation-age border-bottom">
    <div class="tit">投保地区</div>
    <div class="select">
      <span :class="{'primary': selectedText === '请选择' }">{{selectedText}}</span><i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import {getArea} from 'api/area'
import {trim} from 'common/js/util'
import { mapGetters, mapMutations} from 'vuex'

let selectedIndex = [0,0,0]
let selectedTextArr = []

export default {
  data() {
    return {
      selectedText: '请选择'
    }
  },
  computed: {
    ...mapGetters([
      'area'
    ])
  },
  mounted() {
    this.getArea()
  },
  methods: {
    getArea() {
      getArea().then((res) => {
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
        const data = res[0]
        this.firstAreaList = data.level1
        this.secondAreaList = data.level2
        this.thirdAreaList = data.level3
        this.addressData = []
        if(this.firstAreaList) {
          this.firstAreaList.forEach((item1,index) => {
            if(this.area.province) {
              if(this.area.province === item1.code) {
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
                if(this.area.city) {
                  if(this.area.city === item2.code) {
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
                      if(this.area.distinct) {
                        if(this.area.distinct === item3.code) {
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
          this.selectedText = selectedTextArr.join(" ")
        }else{
          this.$createDialog({
            type: 'alert',
            title: '',
            content: '网络异常，请刷新重试',
            icon: ''
          }).show()
          return
        }
        this._initArea()
      }).catch((err) => {
        this.$createDialog({
          type: 'alert',
          title: '',
          content: '网络异常，请刷新重试',
          icon: ''
        }).show()
      })
    },
    _initArea() {
      this.addressPicker = this.$createCascadePicker({
        title: '请选择地区',
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
      this.selectedText = selectedText.join(' ')
      this.setArea({
        province: selectedVal[0],
        city: selectedVal[1],
        distinct: selectedVal[2]
      })
    },
    cancelHandle() {
    },
    ...mapMutations({
      setArea: 'SET_AREA'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
