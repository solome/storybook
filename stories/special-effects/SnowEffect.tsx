import * as THREE from 'three'
import * as React from 'react'

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min

/**
 * 雪花函数
 * @param container
 * @param options
 * @returns 销毁函数：@todo 内存销毁尚不干净
 */
export function snow(container: HTMLDivElement, { amount = 360, fallSpeed = 2 }) {
	const width = container.clientWidth
	const height = container.clientHeight
	const state = {
		frame: true,
		width,
		height,
		aspect: width / height,
		halfX: width / 2,
		halfY: height / 2,
	}

	const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, state.aspect, 1, 2000)
	camera.position.z = 100
	const scene = new THREE.Scene()
	const textureLoader = new THREE.TextureLoader()
	// const map = textureLoader.load('//s3.bmp.ovh/imgs/2021/08/e4d9fa8c911362fa.png')
  	const map = textureLoader.load('//solome.js.org/static/snow.png')

	const material = new THREE.SpriteMaterial({ map })

	let mouseX = 0
	let mouseY = 0
	const particles: THREE.Sprite[] = []

	for (let i = 0; i < amount; i++) {
		const particle = new THREE.Sprite(material)
		const randomScale = randomRange(10, 20)
		particle.position.x = randomRange(-1000, 1000)
		particle.position.y = randomRange(-1000, 1000)
		particle.position.z = randomRange(-1000, 1000)
		particle.scale.x = particle.scale.y = particle.scale.z = randomScale
		particle.userData.v = new THREE.Vector3(0, -fallSpeed, 0)
		particle.userData.v.z = 1 * randomRange(-1, 1)
		particle.userData.v.x = 1 * randomRange(-1, 1)
		particles.push(particle)
		scene.add(particle)
	}

	const renderer = new THREE.WebGLRenderer({ alpha: true })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(state.width, state.height)
	container.appendChild(renderer.domElement)

	const resizeObserver = new ResizeObserver((entries) => {
		const entry = entries[0]
		const width = entry.contentRect.width
		const height = entry.contentRect.height
		Object.assign(state, {
			frame: true,
			width,
			height,
			aspect: width / height,
			halfX: width / 2,
			halfY: height / 2,
		})
		camera.aspect = state.aspect
		camera.updateProjectionMatrix()
		renderer.setSize(state.width, state.height)
	})
	resizeObserver.observe(container)

	const mouseHandler = (e: MouseEvent) => {
		mouseX = e.clientX - state.halfX
		mouseY = e.clientY - state.halfY
	}
	const touchHandler = (e: TouchEvent) => {
		e.preventDefault()
		mouseX = e.touches[0].pageX - state.halfX
		mouseY = e.touches[0].pageY - state.halfY
	}

	document.addEventListener('mousemove', mouseHandler, false)
	document.addEventListener('touchstart', touchHandler, false)
	document.addEventListener('touchmove', touchHandler, false)

	const render = () => {
		for (const particle of particles) {
			const pp = particle.position
			pp.add(particle.userData.v)
			if (pp.y < -1000) {
				pp.y = 1000
			}
			if (pp.x > 1000) {
				pp.x = -1000
			} else if (pp.x < -1000) {
				pp.x = 1000
			}
			if (pp.z > 1000) {
				pp.z = -1000
			} else if (pp.z < -1000) {
				pp.z = 1000
			}
		}

		camera.position.x += (mouseX - camera.position.x) * 0.0005
		camera.position.y += (-mouseY - camera.position.y) * 0.0005
		camera.lookAt(scene.position)

		renderer.render(scene, camera)
	}

	const animate = () => {
		if (state.frame) {
			requestAnimationFrame(animate)
			render()
		}
	}

	animate()

	return () => {
		state.frame = false
	}
}

export interface SnowEffectProps {
	/**
	 * 雪花密度
	 */
	amount?: number
	/**
	 * 雪花坠落速度
	 */
	fallSpeed?: number
}

/**
 * Three 雪花效果：天空飘落雪花。
 */
export default function SnowEffect(props: SnowEffectProps) {
	const ref = React.useRef<HTMLDivElement>(null)
	React.useEffect(() => {
		ref.current && snow(ref.current, { amount: props.amount || 360, fallSpeed: props.fallSpeed || 2 })
	})
	return (
		<div
			ref={ref}
			style={{ position: 'absolute', pointerEvents: 'none', top: '0', left: '0', width: '100%', height: '100%' }}></div>
	)
}