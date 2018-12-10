<template>
  <div>
    <div class="infonmation">
      <div class="title">请填写投保信息</div>
      <div class="read">您填写的信息已安全加密，仅用于投保使用</div>
      <!-- 投保人信息 -->
      <div class="title-l">投保人信息</div>
      <input-bar
        ref='appName'
        tit="投保人姓名"
        :data="appName"
        type="text"
        errMsg="请输入正确的投保人姓名"
        :maxlength="10"
        @blur="changeAppName"
      ></input-bar>
      <input-bar
        ref='appIdNo'
        tit="投保人身份证号"
        :data="appIdNo"
        type="text"
        errMsg="请输入正确的投保人身份证号"
        :maxlength="18"
        @blur="changeAppIdNo"
      ></input-bar>
      <area-occupation
        tit="投保人职业"
        type='occupation'
        :data="occupationList"
        :selected="occupation"
        @select="selectedOccupation"
      ></area-occupation>
      <input-bar
        ref='appAddress'
        tit="投保人通讯地址,仅需填写街道信息"
        :data="appAddress"
        type="text"
        errMsg="请输入正确的投保人通讯地址"
        :maxlength="20"
        @blur="changeAppAddress"
      ></input-bar>
      <input-bar
        ref='appZipcode'
        tit="投保人邮编"
        :data="appZipcode"
        type="number"
        errMsg="请输入正确的投保人邮编"
        :maxlength="6"
        @blur="changeAppZipcode"
      ></input-bar>
      <input-bar
        ref='appPhone'
        tit="投保人手机号码"
        :data="appPhone"
        type="tel"
        errMsg="请输入正确的投保人手机号码"
        :maxlength="11"
        @blur="changeAppPhone"
      ></input-bar>
      <input-bar
        ref='appEmail'
        tit="投保人电子邮箱,用于给您发送电子保单"
        :data="appEmail"
        type="text"
        errMsg="请输入正确的投保人电子邮箱"
        :maxlength="50"
        @blur="changeAppEmail"
      ></input-bar>
      <!-- 被保人信息 -->
      <div class="title-l">被保人信息</div>
      <info-layout 
        tit="投保人是被保人"
        text="父母"
      ></info-layout>
      <div v-if="tbRelation !== 0">
        <input-bar
          ref='insName'
          tit="被保人姓名"
          :data="insName"
          type="text"
          errMsg="请输入正确的被保人姓名"
          :maxlength="10"
          @blur="changeInsName"
        ></input-bar>
        <input-bar
          ref='insIdNo'
          tit="被保人身份证号"
          :data="insIdNo"
          type="text"
          errMsg="请输入正确的被保人身份证号"
          :maxlength="18"
          @blur="changeInsIdNo"
        ></input-bar>
      </div>
      <div class="shouyiren">*保险受益人为法定受益人</div>
      <!-- 银行卡信息 -->
      <div class="title-l">银行卡信息<span>(仅限投保人名下借记卡)</span></div>
      <bank-tip></bank-tip>
      <info-select
        title="续期缴费银行"
        :data="bankList"
        :selected="renewBankName"
        @select="changeRenewBankName"
      ></info-select>
      <info-select
        title="开户地（省）"
        :data="BankLocationList"
        :selected="renewBankLocation"
        @select="changeRenewBankLocation"
      ></info-select>
      <info-layout
        ref="appNameForBank"
        tit="续期缴费户名"
        :text="appNameForBank"
      ></info-layout>
      <input-bar
          ref='renewBankAccount'
          tit="续期缴费账号"
          :data="renewBankAccount"
          type="text"
          errMsg="请输入正确的续期缴费账号"
          :maxlength="23"
          @blur="changeRenewBankAccount"
      ></input-bar>
      <!-- 保单信息 -->
      <div class="title-l">保单信息</div>
      <div class="policyInfo">
        <div class="policyTit">同方全球「同佑e生」重大疾病保险</div>
        <div class="policyMsg border-bottom">该保单由同方全球人寿保险承保</div>
        <div class="policy_con">
          <div class="leftside">保障额度</div>
          <div class="rightside">10万</div>
        </div>
        <div class="policy_con">
          <div class="leftside">保障期限</div>
          <div class="rightside">终身</div>
        </div>
        <div class="policy_con">
          <div class="leftside">投保地区</div>
          <div class="rightside">北京市 东城区</div>
        </div>
        <div class="policy_con">
          <div class="leftside">缴费期限</div>
          <div class="rightside">10年缴</div>
        </div>
        <div class="policy_con">
          <div class="leftside">附加险</div>
          <div class="rightside">是</div>
        </div>
      </div>
      <!-- 温馨提示 -->
      <div class="agree">
        <cube-checkbox v-model="agree" shape="square" :hollow-style="true" class="tit">我已阅读理解并接受以下条款的全部内容：
        </cube-checkbox>
        <p>
          为了保障您的利益，请确认您理解并接受保险单上的<a href="../pdf/tbxz.html">《投保须知》</a><a href="../pdf/bxtk.html">《保险条款》</a><a href="../pdf/tbsms.html">《投保说明书》</a><a href="../pdf/tbtss.html">《投保提示书》</a><a href="../pdf/sqysm.html">《保险款项自动转账授权与声明》</a>的内容,了解并接受包括有关责任条款及免责条款，承保地域限制等约定
        </p>
      </div>
      <el-button type="primary" @click="next"><span>￥{{premium}}</span>支付完成投保</el-button>
    </div>
    <!-- 支付弹层 -->
    <mark-layer
      class="markLayer" 
      :show="payMark" 
      @hide="hidePayMark"
    >
      <div class="payTit">选择支付方式<i class="el-icon-close" @click="payMark = false"></i></div>
      <div class="payStyleBox">
        <div class="payStyle border-bottom" v-for="item in payStyleList">
          <img :src="item.src">
          <p>{{item.p}}<span v-if="item.des" class="des">{{item.des}}</span></p>
          <span class="check" :class="{'choose': item.value === payStyle}" @click="payStyle = item.value"></span>
        </div>
      </div>
      <el-button type="primary" @click="pay"><span>￥{{premium}}</span>去付款</el-button>
    </mark-layer>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {getConfig} from 'api/wx'
  import InputBar from 'base/input/input'
  import AreaOccupation from 'base/area/area'
  import SelectBar from 'base/select/select'
  import InfoLayout from 'base/info-layout/info-layout'
  import BankTip from 'base/bankTip/bankTip'
  import InfoSelect from 'base/info-select/info-select'
  import MarkLayer from 'base/mark-layer/mark-layer'
  import InfoOrder from 'components/info-order/info-order'
  import {getOccupation} from 'api/occupation'
  import {bankList, BankLocationList, payStyleList} from 'common/js/config'
  import { mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        occupationList: {},
        bankList: bankList,
        BankLocationList: BankLocationList,
        appNameForBank: '',
        agree: false,
        payMark: false,
        payStyleList: payStyleList,
        payStyle: 'bd'
      }
    },
    computed: {
      ...mapGetters([
        'appName',
        'appIdNo',
        'occupation',
        'appAddress',
        'appZipcode',
        'appPhone',
        'appEmail',
        'tbRelation',
        'insName',
        'insIdNo',
        'renewBankName',
        'renewBankLocation',
        'renewBankAccount',
        'premium'
      ])
    },
    mounted() {
      this.getOccupation()
      this.initAppNameForBank()
      getConfig()
    },
    methods: {
      hidePayMark() {
        this.payMark = false
      },
      pay() {

      },
      next() {
        this.payMark = true
      },
      getOccupation() {
        getOccupation().then((res) => {
          this.occupationList = res[0]
        }).catch((err) => {
          this.$createDialog({
            type: 'alert',
            title: '',
            content: '网络异常，请刷新重试',
            icon: ''
          }).show()
        })
      },
      selectedOccupation(res) {
        this.setOccupation({
          level1: res.val[0],
          level2: res.val[1],
          level3: res.val[2],
          text: res.vtext
        })
      },
      changeAppName(res) {
        if (res) {
          console.log(res)
          this.$refs.appName.addErr()
        }
        this.setAppName(res)
      },
      changeAppIdNo(res) {
        if (res) {
          console.log(res)
          this.$refs.appIdNo.addErr()
        }
        this.setAppIdNo(res)
      },
      changeAppAddress(res) {
        if (res) {
          console.log(res)
          this.$refs.appAddress.addErr()
        }
        this.setAppAddress(res)
      },
      changeAppZipcode(res) {
        if (res) {
          console.log(res)
          this.$refs.appZipcode.addErr()
        }
        this.setAppZipcode(res)
      },
      changeAppPhone(res) {
        if (res) {
          console.log(res)
          this.$refs.appPhone.addErr()
        }
        this.setAppPhone(res)
      },
      changeAppEmail(res) {
        if (res) {
          console.log(res)
          this.$refs.appEmail.addErr()
        }
        this.setAppEmail(res)
      },
      changeInsName(res) {
        if (res) {
          console.log(res)
          this.$refs.insName.addErr()
        }
        this.setInsName(res)
      },
      changeInsIdNo(res) {
        if (res) {
          console.log(res)
          this.$refs.insIdNo.addErr()
        }
        this.setInsIdNo(res)
      },
      changeRenewBankName(res) {
        this.setRenewBankName(res)
      },
      changeRenewBankLocation(res) {
        this.setRenewBankLocation(res)
      },
      initAppNameForBank() {
        if(this.appName) {
          this.appNameForBank = this.appName
          this.$refs.appNameForBank.removeHeightLight()
        }else{
          this.appNameForBank = '续期缴费户名'
          this.$refs.appNameForBank.addHeightLight()
        }
      },
      changeRenewBankAccount(res) {
        if (res) {
          console.log(res)
          this.$refs.renewBankAccount.addErr()
        }
        this.setRenewBankAccount(res)
      },
      ...mapMutations({
        setAppName: 'SET_APPNAME',
        setAppIdNo: 'SET_APPIDNO',
        setOccupation: 'SET_OCCUPATION',
        setAppAddress: 'SET_APPADDRESS',
        setAppZipcode: 'SET_APPZIPCODE',
        setAppPhone: 'SET_APPPHONE',
        setAppEmail: 'SET_APPEMAIL',
        setTbRelation: 'SET_TBRELATION',
        setInsName: 'SET_INSNAME',
        setInsIdNo: 'SET_INSIDNO',
        setRenewBankName: 'SET_RENEWBANKNAME',
        setRenewBankLocation: 'SET_RENEWBANKLOCATION',
        setRenewBankAccount: 'SET_RENEWBANKACCOUNT'
      })
    },
    watch: {
      appName(nV) {
        if(!nV) {
          this.appNameForBank = '续期缴费户名'
          this.$refs.appNameForBank.addHeightLight()
        }else{
          this.appNameForBank = this.appName
          this.$refs.appNameForBank.removeHeightLight()
        }
      }
    },
    components: {
      InputBar,
      AreaOccupation,
      SelectBar,
      InfoLayout,
      BankTip,
      InfoSelect,
      InfoOrder,
      MarkLayer
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .fix-iphonex-bottom
    .infonmation
      padding-bottom: ($bottom + 21)px

  .infonmation
    width: 100%
    padding: 0 20px 21px
    margin-top: 44px
    box-sizing: border-box
    overflow: scroll
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
      margin: 0
      color: #121C32
      letter-spacing: 0
      font-size: 19px
      line-height: 19px
      border-left: 3px solid $color-btn
      padding: 3px 10px
      margin-top: 22px
      margin-bottom: 5px
      span
        color: #868e9e
        font-size: 14px
    .shouyiren
      font-size: 14px
      color: $color-btn
      letter-spacing: 0
      line-height: 14px
      margin: 20px 0 0
    .policyInfo
      background-color: #F7F8FA
      margin-top: 15px
      margin-bottom: 15px
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
      .policy_con
        display: flex
        font-size: 12px
        line-height: 12px
        color: #5D667A
        margin-bottom: 12px
        .leftside
          flex: 0 1 68px
        .rightside
          font-weight: 600
    .agree
      .cube-checkbox
        padding: 0
        font-size: 12px
        color: #5D667A
        line-height: 12px
      p
        font-size: 12px
        color: #5D667A
        letter-spacing: 0
        line-height: 20px
        margin-top: -8px
        margin-bottom: 15px
        a
          color: #397be6
    .el-button
      width: 100%
      height: 48px
      border-radius: 48px
      background-color: $color-btn
      border-color: $color-btn
      font-size: 16px
      span
        span
          font-family: 'DINPro-Bold'
          font-size: 17px
          font-weight: 700
          margin-right: 8px
  .markLayer
    .payTit
      font-size: 17px
      color: #293040
      margin-top: 25px
      margin-bottom: 16px
      text-align: center
      position: relative
      i
        position: absolute
        right: 0
        &:after
          content: ''
          position: absolute
          top: -10px
          left: -10px
          right: -10px
          bottom: -10px
    .payStyleBox
      min-height: 200px
      .payStyle
        width: 100%
        display: flex
        height: 62px
        line-height: 62px
        align-items: center
        &:last-child
          &:after
            height: 0
        img
          flex: 0 0 30px
          width: 30px
          height: 30px
        p
          flex: 1 1 100%
          font-size: 16px
          color: #121C32
          padding-left: 10px
          box-sizing: border-box
          .des
            color: #868e9e
            font-size: 15px
        .check
          flex: 0 0 20px
          width: 20px
          height: 20px
          background: url(./check_no.png) 0 0 no-repeat
          background-size: cover
          &.choose
            background: url(./choose.png) 0 0 no-repeat
            background-size: cover
    .el-button
      width: 100%
      height: 48px
      border-radius: 48px
      background-color: $color-btn
      border-color: $color-btn
      font-size: 16px
      margin-top: 21px
      margin-bottom: 21px
      span
        span
          font-family: 'DINPro-Bold'
          font-size: 17px
          font-weight: 700
          margin-right: 8px
</style>
