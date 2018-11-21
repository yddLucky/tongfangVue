<template>
  <div @click='showAddressPicker' class="area-occupation-age border-bottom">
    <div class="tit">投保人职业</div>
    <div class="select">
      <span :class="{'primary': selectedText === '请选择' }" ref="selected">{{selectedText}}</span><i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import {getOccupation} from 'api/occupation'
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
      'occupation'
    ])
  },
  mounted() {
    this.getOccupation()
  },
  methods: {
    getOccupation() {
      if(this.$refs.selected.offsetHeight > 16) {
        this.$refs.selected.classList.add('left')
      }
      getOccupation().then((res) => {
        const data = res[0]
        this.firstAreaList = data.level1
        this.secondAreaList = data.level2
        this.thirdAreaList = data.level3
        this.addressData = []
        if(this.firstAreaList) {
          this.firstAreaList.forEach((item1,index) => {
            if(this.occupation.province) {
              if(this.occupation.province === item1.code) {
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
                if(this.occupation.city) {
                  if(this.occupation.city === item2.code) {
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
                      if(this.occupation.distinct) {
                        if(this.occupation.distinct === item3.code) {
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
            this.selectedText = selectedTextArr.join("/")
          }
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
        title: '请选择职业',
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
      this.selectedText = selectedText.join("/")
      this.setOccupation({
        occupationMediumCode: selectedVal[0],
        occupationSmallCode: selectedVal[1],
        occupationCode: selectedVal[2]
      })
    },
    cancelHandle() {
    },
    ...mapMutations({
      setOccupation: 'SET_OCCUPATION'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
