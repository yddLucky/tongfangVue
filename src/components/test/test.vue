<template>
  <div class="scroll-list-wrap">
    <cube-input
      v-model="value2"
      placeholder="请输入内容1111"
      :clearable="clearable"
    ></cube-input>
    <cube-scroll 
      ref="scroll"
      :options="{
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        scrollbar: {
          fade: true,
          interactive: false
        }
      }"
    >
    <div>
      <cube-input
        v-model="value"
        placeholder="请输入内容1"
        :clearable="clearable"
      ></cube-input>
      <div style="height: 400px;background-color: red;margin-bottom: 30px"></div>
      <div style="height: 400px;background-color: red;margin-bottom: 30px"></div>
      <div style="height: 400px;background-color: red;margin-bottom: 30px"></div>
      <div style="height: 400px;background-color: red;margin-bottom: 30px"></div>
      <cube-input
        v-model="value1"
        placeholder="请输入内容2"
        :clearable="clearable"
      ></cube-input>
      <div style="height: 400px;background-color: red;margin-bottom: 30px"></div>
    </div>
    </cube-scroll>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      clearable: {
        visible: true,
        blurHidden: true
      }
    }
  },
  methods: {
    _scroll() {
      this.$refs.scroll.scrollTo(0, '-100')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.scroll-list-wrap
  height: 500px

</style>
