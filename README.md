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
}

##获取元素对于浏览器的位子

`getBoundingClientRect().left | right | top | bottom`

### 点击穿透

`pointer-events: none`



