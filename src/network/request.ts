import axios from 'axios'

const baseURL = 'http://127.0.0.1'

const instance = axios.create({
	baseURL
})

instance.interceptors.request.use((config) => {
	console.log(config)
	return config
})

export function request(config) {
	return instance(config)
}
