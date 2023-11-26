<template>
	<div id="container">
		<h1>虚拟列表</h1>
		<div ref="platformRef" class="content" @scroll="handleScroll">
			<div class="platform" :style="{ height: totalHeight + 'px' }"></div>
			<div class="data" :style="{ transform: `translate(0, ${translateY}px)` }">
				<div v-for="item in renderData" ref="itemsRef" :id="String(item.index)">
					{{ item.value }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUpdated, nextTick } from 'vue'
import { mockData } from './data'

interface positionType {
	index: number
	top: number
	bottom: number
	height: number
	value: string
}

const originData = reactive<Array<positionType>>([])
const apiData = reactive(mockData(1000))
// const totalHeight = ref<number>(0)
const platformRef = ref(null)

// 预估高度，解决动态高度
const estimatedItemSize = ref(10)
// 渲染数据的索引
let startIdx = ref<number>()
// let endTdx = ref(10)
const itemsRef = ref<any>([])
const renderHeight = 500
// 缓存的数目
const cacheNum = 30

//
const totalHeight = computed(() => originData[originData.length - 1]?.bottom)
const renderData = computed(() => originData.slice(startIdx.value, endIdx.value))
const translateY = computed(() => originData[startIdx.value || 0]?.top || 0)
// 通过计算高度，算出最后一个索引
const endIdx = computed(() => {
	// if(!originData)
	console.log(originData)

	let start = startIdx.value || 0
	let curHeight = 0
	for (let i = start; i < originData.length; i++) {
		console.log(i, originData[i])

		const h = originData[i].height
		curHeight += h
		start++
		if (curHeight >= renderHeight) {
			break
		}
	}
	console.log(Math.min(start + cacheNum, originData.length))

	return Math.min(start + cacheNum, originData.length)
})

const findStartIdx = (scrollTop: number) => {
	const item = originData.find((item) => item && item.bottom > scrollTop)
	if (item) {
		startIdx.value = Math.max(item.index - cacheNum, 0)
	}
}

const handleScroll = () => {
	const scrollTop = platformRef?.value?.scrollTop
	// console.log(scroll)
	findStartIdx(scrollTop)
}

const init = () => {
	originData.push(
		...apiData.map((item, index) => {
			return {
				index,
				top: estimatedItemSize.value * index,
				height: estimatedItemSize.value,
				bottom: (index + 1) * estimatedItemSize.value,
				value: item
			}
		})
	)

	// nextTick(() => {
	handleScroll()
	// })
}

onMounted(() => {
	init()
})

// 视图更新的时候更新数据高度
onUpdated(() => {
	console.log(itemsRef.value)
	const nodes = itemsRef.value
	nodes.forEach((node: Element) => {
		const rect = node.getBoundingClientRect()
		const { height } = rect
		const index = +node.id
		console.log('index', index)

		const oldHeight = originData[index].height
		const dValue = oldHeight - height
		if (dValue) {
			originData[index].height = height
			originData[index].bottom -= dValue
			for (let i = index + 1; i < originData.length; i++) {
				originData[i].top = originData[i - 1].bottom
				originData[i].bottom = originData[i - 1].top + originData[i].height
			}
		}
		// console.log(rect, index)
	})
})
</script>

<style lang="scss">
#container {
	text-align: center;
}

.content {
	position: relative;
	margin: 0 auto;
	width: 500px;
	height: 500px;
	overflow: hidden scroll;
	background-color: pink;
}

.data {
	position: absolute;
	top: 0;
	width: 500px;
}

.data div:nth-child(odd) {
	background-color: skyblue;
}
</style>
