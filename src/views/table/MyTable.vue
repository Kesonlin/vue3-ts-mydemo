<template>
	<main id="my-table">
		<table width="100%" border="1" cellspacing="0">
			<thead>
				<tr v-for="header in finalHeaders" :key="index">
					<th v-for="item in header" :colspan="item.colspan" :rowspan="item.rowspan">
						{{ item.text }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in datas">
					<th v-for="value in headerVals">{{ item[value.value] }}</th>
				</tr>
			</tbody>
		</table>
	</main>
	<footer>
		<div @click="nextPage">下一页</div>
	</footer>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { originHeads, tableData } from './data'

// 就散高度
const getDepth = (headerTrees: headerType[]): number => {
	if (!headerTrees) return 0

	let max = 0
	headerTrees.forEach((value) => {
		max = Math.max(getDepth(value.children), max)
	})

	return max + 1
}

// 计算每一层的高度
const getWidth = (headerTrees: headerType[]): number => {
	if (!headerTrees) return 1
	let max = 0
	headerTrees.forEach((value) => {
		max += Math.max(1, getWidth(value.children))
	})

	return max
}

type headerType = {
	text: string
	value?: string
	colspan: number
	rowspan: number
	children?: headerType[] | undefined
}

const handleHeaders = (headerTrees: any[]) => {
	if (!headerTrees) return
	const depth = getDepth(headerTrees)
	const headers: headerType[] = []

	headerTrees.forEach((value, index) => {
		headers[index] = {}
		headers[index].text = value.text

		if (value.children) {
			headers[index].children = handleHeaders(value.children)
		} else {
			headers[index].value = value.value
			headerVals.push(value)
		}
		// rowspan
		headers[index].rowspan = depth - getDepth(value.children)
		headers[index].colspan = getWidth(headers[index].children)
	})

	return headers
}

const flattenHeaders = (headerTrees: any[]) => {
	const ans: any[] = []
	const queue = [...headerTrees]

	while (queue.length) {
		const size = queue.length
		const t = []
		for (let i = 0; i < size; i++) {
			const node = queue.shift()
			t.push(node)
			node.children && queue.push(...node.children)
		}
		ans.push(t)
	}

	return ans
}

const nextPage = () => {
	nowPage.value = (nowPage.value + 1) % tableData.length
	// datas = tableData[nowPage.value]
}

const headerVals = reactive([])
let nowPage = ref(0)
let datas = computed(() => tableData[nowPage.value])

const temp = handleHeaders(originHeads)

const finalHeaders = reactive(flattenHeaders(temp))

console.log(headerVals)
console.log(tableData)
console.log(finalHeaders)
</script>

<style lang="scss" scoped>
#my-table {
	// width: 100%;
	height: 550px;
	list-style: none;
	overflow: scroll;
	// border: 1px solid red;

	table thead {
		height: 170px;
	}

	tbody {
		height: 550px;
		overflow: scroll hidden;
	}
}

footer {
	overflow: hidden;
	width: 100%;
	height: 50px;
	background-color: rgba(88, 192, 240, 0.4);

	div {
		margin: 5px auto;
		width: 70px;
		height: 40px;
		color: aqua;
		line-height: 40px;
		text-align: center;
		border-radius: 50%;
		background-color: rgb(152, 89, 224);

		&:hover {
			cursor: pointer;
		}
	}
}
</style>
