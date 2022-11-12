import axios, { type AxiosResponse } from 'axios'

const baseURL = 'http://127.0.0.1'

const instance = axios.create({
	baseURL
})

const map = new Map()

instance.interceptors.request.use((config) => {
	console.log(config)
	// const source = axios.CancelToken.source()
	// config.cancelToken = source.token

	// setTimeout(() => {
	// 	source.cancel('111')
	// }, 2000)
	return config
})

instance.interceptors.response.use((response: AxiosResponse) => {
	console.log(response)
	const cancelToken = response.config.cancelToken
	if (cancelToken) {
		map.delete(cancelToken)
	}
	console.log(map)
})

export function request(config, source: any) {
	if (source) {
		map.set(config.cancelToken, source)
	}
	return instance(config)
}

export function abortReq() {
	console.log(map)

	for (const [CancelToken, source] of map.entries()) {
		console.log(CancelToken)
		console.log(source)

		source.cancel('取消请求')
	}
}
