<template>
  <div class="selectBar border-bottom">
    <div class="tit">{{tit}}</div>
    <div class="select">
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    tit: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
