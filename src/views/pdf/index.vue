<template>
	<div class="form-container">
		<h2>个人信息</h2>
		<form>
			<div class="form-group">
				<label for="name">姓名：</label>
				<input type="text" id="name" name="name" required />
			</div>
			<div class="form-group">
				<label for="email">邮箱：</label>
				<input type="email" id="email" name="email" required />
			</div>
			<div class="form-group">
				<label for="gender">性别：</label>
				<select id="gender" name="gender">
					<option value="male">男</option>
					<option value="female">女</option>
				</select>
			</div>
			<div class="form-group">
				<label for="message">留言：</label>
				<textarea id="message" name="message"></textarea>
			</div>
			<div class="form-group">
				<button type="submit">提交</button>
			</div>
			<div class="form-group">
				<label for="message">留言：</label>
				<textarea id="message" name="message"></textarea>
			</div>
			<div class="form-group">
				<button type="submit">提交</button>
			</div>
			<div class="form-group">
				<label for="message">留言：</label>
				<textarea id="message" name="message"></textarea>
			</div>
			<div class="form-group">
				<button type="submit">提交</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
// import {} from ''
// const boxRef = ref()
onMounted(() => {
	const domElement = document.querySelector('.form-container')
	const w = domElement.offsetWidth
	const h = domElement.offsetHeight
	console.log(w, h)

	html2canvas(domElement, {
		// onclone: (document) => {
		// 	document.getElementById('print-button').style.visibility = 'hidden'
		// }
	}).then((canvas) => {
		console.log(canvas)

		const img = canvas.toDataURL('image/png')
		const pdf = new jsPdf()
		pdf.addImage(img, 'JPEG', 0, 0, w, h)
		pdf.save('your-filename.pdf')
	})
})
</script>

<style>
.form-container {
	width: 400px;
	margin: 0 auto;
	padding: 20px;
	background-color: #f2f2f2;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.form-group {
	margin-bottom: 15px;
}

.form-group label {
	display: block;
	font-weight: bold;
	margin-bottom: 5px;
}

.form-group input[type='text'],
.form-group input[type='email'],
.form-group select {
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
}

.form-group textarea {
	width: 100%;
	height: 80px;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	resize: vertical;
}

.form-group button {
	padding: 8px 12px;
	background-color: #4caf50;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>
