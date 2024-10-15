import * as React from 'react'
import * as THREE from 'three'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

const defaultWidth = 200
const defaultHeight = 540

/**
 * Three.js 的坐标建模体系也适用于 CSS3 `transform()`，如果你的交互采用 DOM 实现，但又想复用 Three.js 中的相机来决定位置，
 * [CSS3DRenderer](https://threejs.org/examples/?q=css3d#css3d_sandbox) 是个很合适的解决方案。
 *
 * ```jsx
 * import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
 *
 * // 场景
 * const css3DScene = new THREE.Scene()
 * // 相机
 * const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
 * camera.position.set(200, 200, 200)
 * // 渲染器
 * const renderer = new CSS3DRenderer()
 * renderer.setSize(width, height)
 * // 塞入 DOM
 * container.appendChild(renderer.domElement)
 *
 * // 物品
 * const object = new CSS3DObject(element)
 * css3DScene.add(object)
 *
 * // 渲染
 * renderer.render(css3DScene, camera)
 * ```
 *
 * **CSS3 `transform()` 强大到可爱**。
 */
export function CSS3DRendererView() {
	const ref = React.useRef<HTMLDivElement>(null)
	const animRef = React.useRef<boolean>(false)
	const fixedHeightRef = React.useRef<boolean>(false)
	const cameraRef = React.useRef<THREE.PerspectiveCamera>()
	const rendererRef = React.useRef<CSS3DRenderer>()
	const [wh, setWH] = React.useState({ width: defaultWidth, height: defaultHeight })

	// 初始化场景、相机等模组
	React.useEffect(() => {
		if (!ref.current) return
		const width = defaultWidth
		const height = defaultHeight

		const css3DScene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
		camera.position.set(200, 200, 200)

		cameraRef.current = camera
		const renderer = new CSS3DRenderer()
		rendererRef.current = renderer
		renderer.setSize(width, height)
		ref.current.appendChild(renderer.domElement)

		const controls = new TrackballControls(camera, renderer.domElement)

		for (let i = 0; i < 10; i++) {
			const element = document.createElement('div')
			element.style.width = '60px'
			element.style.height = '60px'
			element.style.opacity = i < 5 ? '0.5' : '1'
			element.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle()

			const object = new CSS3DObject(element)
			object.position.x = Math.random() * 200 - 100
			object.position.y = Math.random() * 200 - 100
			object.position.z = Math.random() * 200 - 100
			object.rotation.x = Math.random()
			object.rotation.y = Math.random()
			object.rotation.z = Math.random()
			object.scale.x = Math.random() + 0.5
			object.scale.y = Math.random() + 0.5
			css3DScene.add(object)
		}
		const render = () => {
			controls.update()
			renderer.render(css3DScene, camera)
			if (animRef.current) {
				requestAnimationFrame(render)
			}
		}

		animRef.current = true
		render()
		return () => {
			animRef.current = false
		}
	}, [])

	// 宽高自适应
	React.useEffect(() => {
		if (!cameraRef.current || !rendererRef.current) return

		rendererRef.current.setSize(wh.width, wh.height)
		cameraRef.current.aspect = wh.width / wh.height
	}, [wh.height, wh.width])

	// 监听DOM变动
	const resizeObserverRef = React.useRef<ResizeObserver>(
		new ResizeObserver((entries) => {
			const entry = entries[0]
			const width = entry.contentRect.width
			const height = fixedHeightRef.current ? wh.height : entry.contentRect.height
			if (!ref.current) return
			if (!resizeObserverRef.current) return
			setWH({ width, height: height })
		}),
	)

	// 监听宽高
	React.useEffect(() => {
		if (!ref.current) return
		if (!resizeObserverRef.current) return
		const rootNd = document.querySelector('#root')
		if (rootNd && rootNd.getAttribute('hidden') === 'true') {
			fixedHeightRef.current = true
		}
		const parentElement = ref.current.parentElement
		if (parentElement) resizeObserverRef.current.observe(parentElement)
	}, [])

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<div ref={ref} style={{ width: wh.width, height: wh.height }}></div>
		</div>
	)
}