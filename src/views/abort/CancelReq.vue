<template>
	<button @click="fn(1)">请求1</button>
	<button @click="fn(2)">请求2</button>
	<button @click="fn(3)">请求3</button>
	<button>取消请求</button>
</template>

<script setup lang="ts">
import { request } from '../../network/request'

const fn = (i) => {
	const req = [
		'http://127.0.0.1:9999/abort1',
		'http://127.0.0.1:9999/abort2',
		'http://127.0.0.1:9999/abort3'
	]
	request({
		url: req[i - 1],
		method: 'get'
		// params: {
		// 	t: Date.now()
		// }
	})
}
</script>

<style lang="scss"></style>
