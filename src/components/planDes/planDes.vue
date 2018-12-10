 <template>
  <div class="scroll-list-wrap">
    <cube-scroll 
      ref="scroll"
      :options="{
        click: false,
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
        <tab type="white" :data="details" :current="current" @chooseTab="changePlan"></tab>
        <div class="detailCont">
          <div class="content-block" v-for="item in details[current].des">
            <div class="tabs-title">
              <div class="tit">{{item.text}}</div>
              <div class="titC">{{item.value}}</div>
            </div>
            <p>{{item.p}}</p>
          </div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script type='text/ecmascript-6'>
import Tab from 'base/tab/tab'
import {goods, number} from 'common/js/config'

export default {
  data() {
    return {
      details: goods[number].planDes,
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
.scroll-list-wrap
  position: fixed
  width: 100%
  top: 44px
  bottom: 0
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
