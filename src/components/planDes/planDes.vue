 <template>
  <div>
    <tab type="white" :data="tabs" :current="current" @chooseTab="changePlan"></tab>
    <div class="detailCont">
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">重大疾病保险金</div>
          <div class="titC"><span class="quan">10</span>万</div>
        </div>
        <p>100种重疾，等待期后可一次性赔付<span class="quan">10</span>万</p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">轻症疾病保险金(3次)</div>
          <div class="titC"><span class="ban">2</span>万</div>
        </div>
        <p>50种轻症，不分组最多赔付3次，单次赔付<span class="ban">2</span>万 </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">身故保险金</div>
          <div class="titC"></div>
        </div>
        <p>18周岁前，赔付所交保费+附加险已交保费(可选)；18周岁后赔付<span class="quan">10</span>万+160%附加险已交保费(可选)</p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">轻症豁免保险费</div>
          <div class="titC">豁免剩余未交保险费</div>
        </div>
        <p>
            交费期间内，被保险人重大疾病或轻症，豁免后期应交保费
        </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit" style="font-size: 0.27rem;">附加险满期保险金</div>
          <div class="titC">可选</div>
        </div>
        <p>
            保障期至70周岁或终身可选附加险满期保险金；附加险满期保险金内容为若被保险人合同满期日的零时仍然生存时给付主附险100%已交保险费；保障期为至70周岁满期日为70岁、保障期为终身满期日为80周岁
        </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">健康资讯(首年)</div>
          <div class="titC">不限</div>
        </div>
        <p>
            健康资讯：首年内每日健康资讯
        </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">医生线上会诊(首年)</div>
          <div class="titC">不限</div>
        </div>
        <p>
            医生线上会诊：首年内提供最专业的免费分诊、导诊服务
        </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">电话咨询医生(首年)</div>
          <div class="titC">不限</div>
        </div>
        <p>
            电话咨询医生：首年内电话解答各种健康困惑
        </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">专家门诊特需号及普通号预约(首年)</div>
          <div class="titC">3次</div>
        </div>
        <p>
            因恶性肿瘤/重大疾病（疑似或确诊），协调安排在《合作医疗机构列表》范围内的专家特需门诊、普通门诊的预约服务，避免重复就医及延误诊断
        </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">陪诊(首年)</div>
          <div class="titC">3次</div>
        </div>
        <p>
           陪诊：首年内因恶性肿瘤/重大疾病（疑似或确诊），全程陪同您完成整个就医过程
        </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">国内专家二次诊断报告(首年)</div>
          <div class="titC">1次</div>
        </div>
        <p>
           国内专家二次诊断报告：首年内因恶性肿瘤/重大疾病（疑似或确诊），协助预约更好的医疗机构或者国内知名三甲医院副主任级以上专家会诊，出具二次诊断报告
        </p>
      </div>
      <div class="content-block">
        <div class="tabs-title">
          <div class="tit">住院安排(首年)</div>
          <div class="titC">1次</div>
        </div>
        <p>
           住院安排：首年内因恶性肿瘤/重大疾病（疑似或确诊），协调安排在《合作医疗机构列表》范围内的医疗机构进行住院治疗
        </p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Tab from 'base/tab/tab'
export default {
  data() {
    return {
      tabs: [
        {
          lowest: 101,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        },
        {
          lowest: 102,
          lowestDes: '元起',
          insurAmountDesc: '100万有社保'
        }
      ],
      current: 0
    }
  },
  methods: {
    changePlan(index) {
      this.current = index
      console.log(this.current)
    }
  },
  components: {
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.detailCont
  padding: 0 20px 30px
  .content-block
    margin-top: 15px
    padding: 15px
    background-color: #fff
    border: 1px solid #e6e9f0
    box-shadow: 0 3px 10px 0 rgba(209,213,222,0.15)
    .tabs-title
      font-size: 14px
      margin-bottom: 10px
      line-height: 16px
      font-weight: 700
      .tit
        color: #121c32
        display: inline-block
      .titC
        float: right
        color: #5d667a
    p
      margin: 0
      color: #5d667a
      font-size: 13px
      line-height: 21px
</style>
