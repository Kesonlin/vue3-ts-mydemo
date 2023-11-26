const mock = ['this is A', 'this is B', 'this C', 'D', 'app', 'blue', 'nice to meet you!!!']

export function mockData(num: number): Array<string> {
	const data = []
	for (let i = 0; i < num; i++) {
		const random = Math.random()
		const index = Math.min(mock.length - 1, Math.floor(random * 10))
		data.push(mock[index].repeat(Math.ceil(Math.random() * 10)))
	}

	return data
}

export function mockData1(num: number): Array<string> {
	const data = []
	for (let i = 0; i < num; i++) {
		data.push(`这是第${i}条数据`)
	}

	return data
}
