<template>
  <div @click='showDatePicker' class="selectBar border-bottom">
    <div class="tit">{{tit}}</div>
    <div class="select">
      <span :class="{'primary': selectedText === '请选择' }">{{selectedText}} <span v-show="selectedText !== '请选择'">({{age}}周岁)</span></span><i class="el-icon-caret-right"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>

export default {
  props: {
    tit: {
      type: String,
      default: '出生日期'
    },
    age: {
      type: Number,
      default: 0
    },
    birthday: {
      type: String,
      default: ''
    },
    maxAge: {
      type: Number,
      default: 50
    },
    minAge: {
      type: Number,
      default: 0
    },
    updateAge: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      selectedText: '请选择'
    }
  },
  mounted() {
    this.now = new Date()
    if (this.birthday) {
      this.selectedText = this.birthday
      this.now = new Date(this.birthday)
    }
  },
  methods: {
    createData(y){
      const newDate = new Date()
      const year = newDate.getFullYear()
      let month = newDate.getMonth() + 1
      if (parseInt(month) < 10) {
        month = "0" + month
      }
      let day = newDate.getDate()
      if (parseInt(day) < 10) {
        day = "0" + day
      }
      return (parseInt(year)-y)+"-"+month+"-"+day    
    },
    maxMinAge(max,min) {
      // max是最小年龄 min是最大年龄
      const newDate = new Date()
      const year = newDate.getFullYear()-min-1

      //插件会自己增加一个月不用+1
      const month = newDate.getMonth()+1
      const day = newDate.getDate()
      let mindate = new Date(year+"/"+month+"/"+day)
      mindate = new Date(mindate.getTime() + 24*60*60*1000)
      let maxdate
      if(max>0){
        let yearMax=newDate.getFullYear()-max
        maxdate = new Date(yearMax+"/"+month+"/"+day)
        maxdate=new Date(maxdate.getTime())
      }else{
        maxdate=new Date(newDate.getTime() - 30*24*60*60*1000)
      }
      return {
        mindate: mindate,
        maxdate: maxdate
      }
    },
    getAgeByBirth(birthday) {
      if (!(/^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(birthday))) {
        return ""
      }
      
      let age
      const year = birthday.substring(0,birthday.indexOf("-"))*1
      const month = birthday.substring(birthday.indexOf("-")+1,birthday.lastIndexOf("-"))*1
      const day = birthday.substring(birthday.lastIndexOf("-")+1)*1
      const date = new Date()
      const currentYear = date.getFullYear()
      const currentMonth = date.getMonth() + 1
      const cuttentDay = date.getDate()
      
      if (month > currentMonth) {
        age =  currentYear - year - 1
      } else if (month < currentMonth) {
        age = currentYear - year
      } else {
        if (day > cuttentDay) {
          age = currentYear - year - 1
        } else {
          age = currentYear - year
        }
      }
      return age > 0 ? age : 0
    },
    showDatePicker() {
      if (!this.datePicker) {
        const ageRange = this.maxMinAge(this.minAge, this.maxAge)

        this.datePicker = this.$createDatePicker({
          title: '请选择出生日期',
          min: ageRange.mindate,
          max: ageRange.maxdate,
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
      const updateValue = this.selectedText !== '请选择'? new Date(this.selectedText) : new Date(this.createData(this.updateAge))
      this.datePicker.$updateProps({
        value: updateValue
      })
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      let newText = []
      selectedVal.forEach(item => {
        if(parseInt(item) < 10) {
          item = '0' + item
        }
        newText.push(item.toString())
      })
      this.selectedText = newText.join('-')
      // 设置显示年龄2018-11-21
      this.$emit('setBirthday', this.selectedText)
      // 设置年龄数据18
      this.$emit('setAge', this.getAgeByBirth(this.selectedText))
    },
    cancelHandle() {
    }
  },
  watch: {
    maxAge() {
      this.datePicker = null
    },
    minAge() {
      this.datePicker = null
    },
    updateAge() {
      if(!this.birthday) {
        this.selectedText = '请选择'
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
