<template>
  <div class="info-order">
    <div class="title-l">保单信息</div>
    <div class="policyInfo">
      <div class="policyTit">{{title}}</div>
      <div class="policyMsg border-bottom">该保单由同方全球人寿保险承保</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    title: {
      type: String,
      default: '同方全球「同佑e生」重大疾病保险'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/base"

  .info-order
    .title-l
      margin: 0
      color: #121C32
      letter-spacing: 0
      font-size: 19px
      line-height: 19px
      border-left: 3px solid $color-btn
      padding: 3px 10px
      margin-top: 22px
      margin-bottom: 5px
    .policyInfo
      background-color: #F7F8FA
      margin-top: 15px
      margin-bottom: 30px
      padding: 20px 20px 8px
      .policyTit
        font-weight: 500
        font-size: 15px
        color: #394259
        line-height: 16px
        margin-bottom: 10px
      .policyMsg
        font-size: 12px
        color: #5D667A
        padding-bottom: 15px
        margin-bottom: 15px
</style>
