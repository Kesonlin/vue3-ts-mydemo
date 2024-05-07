import { randomColor, transformColor } from './utils'

interface HeaderOriginalType {
	width: number
	height: number
	fill: string
	stroke: string
	key: string
	content: string
}

interface SourceDataType {
	[index: string]: any
}

type Optional<T> = {
	[k in keyof T]?: T[k]
}

type HeaderType = Optional<HeaderOriginalType>

export class Ceil {
	public x: number
	public y: number
	public width: number
	public height: number
	public content: string
	private clickCbs: Function[] = []
	public color: string = ''

	constructor(x: number, y: number, width: number, height: number, content: string) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.content = content
	}

	addClickListener(cb: Function) {
		this.clickCbs.push(cb)
	}

	emitClickCbs() {
		this.clickCbs.forEach((cb) => cb(this))
	}
}

export class TableRender {
	private canvasRender
	private headerData: HeaderType[] = []
	private x: number = 0
	private y: number = 0
	private ceilWidth: number

	constructor(headerData: HeaderType[], sourceData: SourceDataType[], ceilWidth = 70) {
		this.ceilWidth = 70
		this.canvasRender = new CanvasRender()
		this.renderHeader(headerData)
		this.renderData(sourceData)
	}

	// 渲染头部
	renderHeader(data: HeaderType[]) {
		this.headerData = data
		const height = 45
		for (let d of data) {
			const width = d.width || 70
			// TODO: 根据当前列的最大高度设置当前列的高度

			const content = d.content || '示例'
			const ceil = this.canvasRender.renderCeil(this.x, this.y, width, height, content)
			ceil.addClickListener((c: any) => {
				console.log(c.content)
			})
			this.x += width
		}
		this.x = 0
		this.y += height
	}

	// 渲染数据
	renderData(data: SourceDataType[]) {
		const height = 45
		data.forEach((data) => {
			this.headerData.forEach((header) => {
				const width = header.width || 70
				if (header.key && data[header.key]) {
					const content = data[header.key]
					this.canvasRender.renderCeil(this.x, this.y, width, height, content)
				}
				this.x += width
			})
			this.x = 0
			this.y += height
		})
	}
}

export class CanvasRender {
	public offscreenCanvas
	public canvas
	public canvasCtx

	constructor() {
		this.offscreenCanvas = new OffscreenCanvas(800, 500)
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement
		// if (!this.canvas) return
		this.canvasCtx = this.canvas.getContext('2d') as CanvasRenderingContext2D
		this.initClickEvent()
	}

	initClickEvent() {
		this.canvas.addEventListener('click', (event) => {
			const { offsetX, offsetY } = event
			const ceil = this.offscreenCanvas.getGraphics(offsetX, offsetY)
			// console.log('click ceil', ceil)
			if (ceil) {
				ceil.emitClickCbs()
			}
		})
	}

	renderCeil(x: number, y: number, width: number, height: number, content: string) {
		this.canvasCtx.strokeRect(x, y, width, height)
		this.canvasCtx.font = '20px sans-serif'
		this.canvasCtx.fillText(content, x + 5, y + 28)
		const ceil = new Ceil(x, y, width, height, content)
		this.offscreenCanvas.renderRect(x, y, width, height, ceil)
		return ceil
	}
}

// 离屏canvas，用于碰撞检测
export class OffscreenCanvas {
	private canvas
	private canvasCtx
	private GraphicsMap

	constructor(width: number, height: number) {
		this.canvas = document.createElement('canvas')
		// document.querySelector('body')?.appendChild(this.canvas)
		this.canvas.width = width
		this.canvas.height = height
		this.canvasCtx = this.canvas.getContext('2d') as CanvasRenderingContext2D
		this.GraphicsMap = new Map()
	}

	setGraphics(color: string, graphis: any) {
		if (this.GraphicsMap.has(color)) {
			throw new Error('颜色已经存在')
		}
		this.GraphicsMap.set(color, graphis)
	}

	getGraphics(x: number, y: number) {
		// console.log('this.GraphicsMap', this.GraphicsMap)

		const color = this.getColor(x, y)
		return this.GraphicsMap.get(color)
	}

	// 根据坐标获取对应颜色
	getColor(x: number, y: number) {
		const [r, g, b] = this.canvasCtx.getImageData(x, y, 1, 1).data

		const color = transformColor(r, g, b)
		// console.log('getColor', this.canvasCtx.getImageData(x, y, 1, 1), r, g, b, color)
		return color
	}

	renderRect(x: number, y: number, width: number, height: number, ceil: any) {
		const color = randomColor()
		this.canvasCtx.fillStyle = color
		this.canvasCtx.fillRect(x, y, width, height)
		this.setGraphics(color, ceil)
		// this.canvasCtx.fillText(content, x + 5, y + 28)
	}
}
