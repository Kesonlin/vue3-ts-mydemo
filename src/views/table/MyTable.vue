<template>
	<table border="1" width="100%" height="100%">
		<thead>
			<tr v-for="header in finalHeaders">
				<th v-for="item in header" :colspan="item.colspan" :rowspan="item.rowspan">
					{{ item.text }}
				</th>
			</tr>
		</thead>
	</table>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const originHeads = reactive([
	{
		text: '项目标号',
		value: 'projectId'
	},
	{
		text: '项目名称',
		value: 'projectName'
	},
	{ text: '项目建设地区', value: 'constructionArea' },
	{
		text: '全生命周期成本（万元）',
		children: [
			{
				text: '初始投资成本',
				value: 'initialCostLcc'
			},
			{ text: '运行成本', value: 'operatingCostLcc' },
			{
				text: '维护成本',
				value: 'maintenanceCostLcc'
			},
			{
				text: '退役成本',
				value: 'mainDecommissionCostLcc',
				children: [
					{
						text: '工程主体退役成本'
					},
					{
						text: '关联工程拆除费用',
						children: [
							{
								text: '项目名称',
								value: 'projectName',
								children: [
									{
										text: '项目名称',
										value: 'projectName',
										children: [
											{
												text: '项目名称',
												value: 'projectName'
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				text: '总LCC成本',
				value: 'maintenanceCostLcc'
			}
		]
	}
	// {
	// 	text: '缺供电量收益（万元）',
	// 	children: [
	// 		{ text: '总LCC成本', value: 'totalCostLcc' },
	// 		{ text: '社会效益', value: 'socialBenefits' },
	// 		{
	// 			text: '停电损失收益',
	// 			value: 'outageLossesBenefits'
	// 		},
	// 		{
	// 			text: '负荷报装收益',
	// 			value: 'loadDeclarationBenefits'
	// 		},
	// 		{
	// 			text: '总效益（不含社会效益）',
	// 			value: 'totalBenefitsN'
	// 		},
	// 		{
	// 			text: '总收益 （ 含社会效益）',
	// 			value: 'totalBenefitsY'
	// 		}
	// 	]
	// }
])

// 就散高度
const getDepth = (headerTrees: any[]): number => {
	if (!headerTrees) return 0

	let max = 0
	headerTrees.forEach((value) => {
		max = Math.max(getDepth(value.children), max)
	})

	return max + 1
}

// 计算每一层的高度
const getWidth = (headerTrees: any[]): number => {
	if (!headerTrees) return 1
	let max = 0
	headerTrees.forEach((value) => {
		max += Math.max(1, getWidth(value.children))
	})

	return max
}

console.log(getDepth(originHeads))
console.log(getWidth(originHeads))

type headerType = {
	text: string
	value?: string
	colspan: number
	children?: headerType[]
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

const temp = handleHeaders(originHeads)

const finalHeaders = reactive(flattenHeaders(temp))

console.log(finalHeaders)
</script>

<style lang="scss"></style>
