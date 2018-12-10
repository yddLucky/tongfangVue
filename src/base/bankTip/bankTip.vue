<template>
  <div class="bankCardTip">
    <div class="bankCardTipSj"></div>
    <div class="des">该保险需开通自动续期服务，从您填写的银行卡扣除续期保费，有任何疑问可拨打客服电话<a href="tel:95105768">95105768</a>进行咨询</div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .bankCardTip
    margin: 8px 0 5px
    padding: 12px 0
    background: #F7F8FA
    width: 100%
    font-size: 12px
    color: #5D667A
    letter-spacing: 0
    line-height: 18px
    position: relative
    box-sizing: border-box
    .bankCardTipSj
      position: absolute
      left: 11px
      top: -4px
      width: 7px
      height: 7px
      background-color: #F7F8FA
      transform: rotateZ(45deg)
    .des
      width: 100%
      box-sizing: border-box
      padding: 0 10px
      a
        outline: 0
        cursor: pointer
        text-decoration: none
        color: #397BE6
</style>
