import * as React from 'react'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 540

interface THREEContextScene {
	ready: boolean
	camera: THREE.PerspectiveCamera
	renderer: THREE.WebGLRenderer
	scene: THREE.Scene
}

const glThreeScene: THREEContextScene = {
	ready: false,
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(45, DEFAULT_WIDTH / DEFAULT_HEIGHT, 0.1, 1000),
	renderer: new THREE.WebGLRenderer(),
}

Object.assign(window, { $threeScene: glThreeScene })

export const THREEContext = React.createContext<THREEContextScene>(glThreeScene)

export function useThreeScene() {
	const { scene } = React.useContext(THREEContext)

	return scene
}

export function useThreeRenderer() {
	const { renderer } = React.useContext(THREEContext)

	return renderer
}

export function useThreeCamera() {
	const { camera } = React.useContext(THREEContext)

	return camera
}

export function useThreeRender() {
	const { scene, camera, renderer } = React.useContext(THREEContext)

	const render = React.useCallback(() => renderer.render(scene, camera), [camera, renderer, scene])
	return render
}

export function THREEContainer({ children }: { children?: string | JSX.Element }) {
	const [screen, setScreen] = React.useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
	const ref = React.useRef<HTMLDivElement>(null)
	const fixedHeightRef = React.useRef<boolean>(false)
	const animRef = React.useRef(false)

	// 监听DOM变动
	const resizeObserverRef = React.useRef<ResizeObserver>(
		new ResizeObserver((entries) => {
			const entry = entries[0]
			const width = entry.contentRect.width
			const height = fixedHeightRef.current ? screen.height : entry.contentRect.height
			if (!ref.current) return
			if (!resizeObserverRef.current) return
			setScreen({ width, height: height })
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

	const scene = useThreeScene()
	const camera = useThreeCamera()
	const renderer = useThreeRenderer()

	// 宽高自适应
	React.useEffect(() => {
		renderer.setSize(screen.width, screen.height)
		camera.aspect = screen.width / screen.height
	}, [camera, renderer, screen.height, screen.width])

	React.useEffect(() => {
		if (!ref.current) return

		renderer.setClearColor(0xeeeeee)
		camera.position.x = -40
		camera.position.y = 30
		camera.position.z = 40
		ref.current.append(renderer.domElement)
		camera.lookAt(scene.position)
		renderer.render(scene, camera)
		const controls = new TrackballControls(camera, renderer.domElement)

		const render = () => {
			controls.update()
			renderer.render(scene, camera)
			if (animRef.current) {
				requestAnimationFrame(render)
			}
		}

		animRef.current = true
		render()
		return () => {
			animRef.current = false
		}
	}, [camera, renderer, renderer.domElement, scene])

	return (
		<THREEContext.Provider value={glThreeScene}>
			<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div ref={ref} style={{ width: screen.width, height: screen.height }}></div>
				<div
					style={{
						width: screen.width,
						height: screen.height,
						position: 'absolute',
						left: 0,
						top: 0,
						pointerEvents: 'none',
					}}>
					{children}
				</div>
			</div>
		</THREEContext.Provider>
	)
}
