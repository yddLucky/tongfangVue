# 组件的使用

### base/tab组件

必须传入参数：[datas]数据  [type]选择的样式

点击返回[chooseTab]函数，携带的参数是点击元素的下标[index]


# 开发问题汇总

## pc端禁止图片,a标签拖拽

img标签加上[draggable="false"]

a标签添加ondragstart="return false"

# vue 问题

## prop数据默认类型

`age: {
	type: Number,
	default: 18
},
name: {
	type: String,
	default: '小明'
},
loading: {
	type: Boolean,
	default: false
},
data: {
	type: Array,
	default: () => {
		return []
	}
},
fun: {
	type: Function,
	default: () => () => {}
},
obj: {
	type: Object,
	default: () => ({})
}`

[type]支持多个数据格式，用|分隔

`obj: {
	type: Object | Boolean,
	default: () => ({})
}`

##父组件传值

如果是固定的boolean或者数值，不想在data里面定义的参数，props里面又设置了默认的type，需要使用[:]来绑定

`<scroll :click="true"></scroll>`


##better-scroll

###初始化使用

html

`<div class="premium">
    <scroll class="preview-content">
    </scroll>
</div>`

css

`.premium
  position: fixed
  width: 100%
  top: 44px
  bottom: 0
  .preview-content
    height: 100%
    overflow: hidden`

[注意]：其中[top]和[bottom]将盒子的大小给限定住了，这个参数都是必须的


### mouseWheel 滚轮滚动配置

### scrollbar 滚动条配置

### 层级问题

如果有需要遮盖的文字，如该项目的单选，需要给遮盖层的[z-index]设置成-1,不然在手机端滚动时，会有文字被遮挡的情况产生，电脑上没有问题



##获取元素对于浏览器的位子

`getBoundingClientRect().left | right | top | bottom`

### 点击穿透

`pointer-events: none`

### input 清除功能

图标需要在input内部，用padding挤开，点击需要隐藏图标，同时使input获得焦点，不隐藏会触发input的blur事件，键盘会有抖动的效果。

#cube-ui

## input,text-area不要放在better-scroll里面

##scroll的scrollTo()

传入的x，y不带单位

## 安卓手机input获得焦点点击scroll区域input不丢失焦点

`
<cube-scroll 
      ref="scroll"
      :scrollEvents= "['before-scroll-start']"
      :options="{
        click: true,
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
      @before-scroll-start="blurInput"
></cube-scroll>

methods: {
    blurInput() {
      const scroll = this.$refs.scroll
      scroll && scroll.scroll.on('beforeScrollStart', () => {
        let activeElement = document.activeElement
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          activeElement.blur()
        }
      })
    }
}
`


