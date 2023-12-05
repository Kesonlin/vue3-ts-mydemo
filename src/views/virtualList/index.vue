<template>
	<div>
		<Table :source-data="data" />
	</div>
</template>

<script setup lang="ts">
import { mockData } from './data'
import Table from './table.vue'

const data = mockData(1000)
</script>

<style lang="scss"></style>
