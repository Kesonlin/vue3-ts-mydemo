import { onMounted, defineComponent } from 'vue'
import './index.scss'
import { Ceil, TableRender } from './base'

export default defineComponent({
	name: 'canvasTable',
	setup() {
		onMounted(() => {
			const headerData = [
				{ width: 80, content: '姓名', key: 'name' },
				{ width: 80, content: '性别', key: 'sex' },
				{ width: 80, content: '年龄', key: 'age' },
				{ width: 150, content: '电话', key: 'phone' },
				{ width: 80, content: '备注', key: 'desc' }
			]

			const sourceData = [
				{
					name: '小明',
					sex: '男',
					age: '12',
					phone: '123121334211',
					desc: '大家好'
				},
				{
					name: '小红',
					sex: '女',
					age: '18',
					phone: '3211121111',
					desc: '大家好'
				},
				{
					name: '小明',
					sex: '男',
					age: '12',
					phone: '123121334211',
					desc: '大家好'
				},
				{
					name: '小东',
					sex: '男',
					age: 88,
					phone: '123121334211',
					desc: '大家好'
				},
				{
					name: '小明',
					sex: '男',
					age: '12',
					phone: '123121334211',
					desc: '大家好'
				}
			]
			new TableRender(headerData, sourceData)
		})

		return () => (
			<div>
				<div style="height:200px"></div>
				<canvas id="canvas" width="800" height="500"></canvas>
			</div>
		)
	}
})
