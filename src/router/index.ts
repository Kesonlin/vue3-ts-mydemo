import { createRouter, createWebHistory } from 'vue-router'

import MyTable from '../views/table/MyTable.vue'
const CancelReq = () => import('../views/abort/CancelReq.vue')
const virtualList = () => import('../views/virtualList/index.vue')

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
		}
	]
})

export default router
