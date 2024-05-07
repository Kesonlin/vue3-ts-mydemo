export const randomColor = () => {
	// 生成随机的 RGB 值
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)

	// 将 RGB 值转换成十六进制表示
	const hexR = r.toString(16).padStart(2, '0')
	const hexG = g.toString(16).padStart(2, '0')
	const hexB = b.toString(16).padStart(2, '0')

	// 返回十六进制表示的颜色
	return '#' + hexR + hexG + hexB
}

export const transformColor = (r: number, g: number, b: number) => {
	// 将10进制转化成16进制，注意有可能出现转化后只有1位的情况，这个时候需要补一个0
	const hexR = r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16)
	const hexG = g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16)
	const hexB = b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16)
	const color = `#${hexR}${hexG}${hexB}`
	return color
}
