<template>
  <div>
    <div class="healthy">
      <div class="title">请阅读健康告知</div>
      <div class="read">请确认被保人健康状态是否符合投保条件</div>
      <div class="title-l">被保险人健康告知</div>
      <ul class="border-bottom">
        <li v-for="item in healthyInfo">{{item}}</li>
      </ul>
      <div class="advisory" @click="advisory">
        <img src="./kefu.png" alt=""><span>咨询客服</span>
      </div>
    </div>
    <div class="under-btn">
      <div>
        <div class="cancel border-top" @click="cancel">有部分情况</div>
        <el-button type="primary" @click="next">确认无以上问题</el-button>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {goods, number} from 'common/js/config'

  export default {
    data() {
      return {
        healthyInfo: goods[number].healthy
      }
    },
    methods: {
      advisory() {
        this.$createDialog({
          type: 'confirm',
          icon: '',
          title: '即将为您联系',
          content: '同方全球有限公司',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            window.location.href = 'tel:95105768'
          },
          onCancel: () => {
          }
        }).show()
      },
      cancel() {
        this.$createDialog({
          type: 'alert',
          title: '',
          content: '如有任意一项为“是”请转线下投保',
          icon: ''
        }).show()
      },
      next() {
        // 请求后台
        this.$router.push({
          path: '/infonmation'
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .fix-iphonex-bottom
    .healthy
      padding: 0 20px ($bottom + $under-btn-height)px
    .under-btn
      height: ($bottom + $under-btn-height)px

  .healthy
    width: 100%
    margin-top: 44px
    padding: 0 20px 48px
    overflow: scroll
    box-sizing: border-box
    .title
      font-size: 27px
      color: #121C32
      line-height: 27px
      padding: 20px 0 10px
      font-weight: 500
    .read
      font-size: 13px
      color: #394259
      line-height: 13px
    .title-l
      margin-top: 30px
      font-size: 19px
      color: #121C32
      line-height: 19px
    ul
      padding: 15px 0 10px
      li
        font-size: 14px
        color: #5D667A
        line-height: 24px
        margin-bottom: 10px
    .advisory
      width: 106px
      height: 29px
      border: 1px solid #5D667A
      border-radius: 29px
      font-size: 13px
      color: #394259
      text-align: center
      margin: 15px auto 35px
      img
        width: 16px
        height: 16px
        margin-right: 3px
        vertical-align: sub
      span
        line-height: 29px
  .under-btn
    position: fixed
    left: 0
    bottom: 0
    height: ($under-btn-height + 0)px
    font-size: 16px
    line-height: 48px
    width: 100%
    background-color: #fff
    &>div
      position: absolute
      top: 0
      left: 0
      width: 100%
      display: flex
      .cancel
        flex: 0 1 50%
        color: #394259
        text-align: center
      .el-button
        flex: 0 1 50%
        border-radius: 0
        background-color: $color-btn
        border-color: $color-btn
        font-size: 16px
</style>
