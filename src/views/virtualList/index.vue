<template>
	<div id="container">
		<h1>虚拟列表</h1>
		<div ref="platformRef" class="content" @scroll="handleScroll">
			<div class="platform" :style="{ height: totalHeight }"></div>
			<div class="data" :style="{ transform: `translate(0, ${translateY}px)` }">
				<div v-for="item in data">{{ item }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'

function mockData(num: number): Array {
	const res = []
	for (let i = 0; i < num; i++) {
		res.push(`这是第${i}条数据`)
	}

	return res
}

const originData = reactive(mockData(1000))
const data = reactive([])
const totalHeight = ref()
const platformRef = ref(null)
const translateY = ref(0)
const totalCount = 22
const eachSize = 10

const handleScroll = (event) => {
	// console.log(event)
	// console.log(platformRef)
	// console.log(platformRef.value.scrollTop)
	const scrollTop = platformRef.value.scrollTop
	// console.log(scroll)

	const startIdx = Math.floor(scrollTop / eachSize)
	// console.log();
	console.log(startIdx)
	translateY.value = startIdx * eachSize
	// translateY.value = 100
	const t = originData.slice(startIdx, startIdx + totalCount)
	console.log(t)
	data.splice(0)
	data.push(...t)
	// data.push(...originData.slice(startIdx, startIdx + totalCount))
	// data = originData.slice(startIdx, startIdx + totalCount)
}

const init = () => {
	totalHeight.value = originData.length * 10 + 'px'
	// 渲染200条数据
	const num = 200
	handleScroll()
}

onMounted(() => {
	init()
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
	overflow: scroll;
	background-color: pink;
}

.data {
	position: absolute;
	top: 0;
}
</style>
