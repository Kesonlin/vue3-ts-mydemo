import { createRouter, createWebHistory } from 'vue-router'

import MyTable from '../views/table/MyTable.vue'
const CancelReq = () => import('../views/abort/CancelReq.vue')
const virtualList = () => import('../views/virtualList/index.vue')
const PdfCom = () => import('../views/pdf/index.vue')
const CanvasTable = () => import('../views/canvasTable/index')

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/table',
			name: 'table',
			component: MyTable
		},
		{
			path: '/abort',
			name: 'abort',
			component: CancelReq
		},
		{
			path: '/virtualList',
			name: 'virtualList',
			component: virtualList
		},
		{
			path: '/pdf',
			name: 'pdf',
			component: PdfCom
		},
		{
			path: '/canvasTable',
			name: 'CanvasTable',
			component: CanvasTable
		}
	]
})

export default router
