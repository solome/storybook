import * as React from 'react'
import * as THREE from 'three'
import {
	THREEContainer,
	useTHREERenderCallback,
	useTHREERenderer,
	useTHREEScene,
} from '../../components/THREEContainer'

function SpotLight() {
	const scene = useTHREEScene()

	React.useEffect(() => {
		const spotLight = new THREE.SpotLight(0xffffff)
		spotLight.position.set(-40, 60, -10)
		spotLight.castShadow = true
		scene.add(spotLight)

		return () => {
			scene.remove(spotLight)
		}
	}, [scene])

	return <></>
}

function Sphere() {
	const scene = useTHREEScene()
	React.useEffect(() => {
		const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
		const sphereMaterial = new THREE.MeshLambertMaterial({
			wireframe: false,
			color: 0x7777ff,
		})

		const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
		sphereMesh.castShadow = true
		scene.add(sphereMesh)

		return () => {
			scene.remove(sphereMesh)
		}
	}, [scene])
	return <></>
}

function Box() {
	const scene = useTHREEScene()

	React.useEffect(() => {
		const boxGeometry = new THREE.BoxGeometry(4, 4, 4)
		const boxMaterial = new THREE.MeshLambertMaterial({ color: 0x8d0c0c })

		const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
		boxMesh.position.x = -4
		boxMesh.position.y = 3
		boxMesh.position.z = 0

		boxMesh.castShadow = true
		scene.add(boxMesh)

		return () => {
			scene.remove(boxMesh)
		}
	}, [scene])

	return <></>
}

/**
 * 使用 Three.js  创建三维场景。
 *
 * ## 渲染器
 *
 * - [WebGLRenderder]()
 * - [CSS2DRenderer]() & [CSS3DRenderer]()
 * - [SVGRenderer]()
 *
 * ## 相机
 *
 * - [PerspectiveCamera]()
 * - [OrthographicCamera]()
 *
 * ## Mesh 物品
 *
 * - Plane 平面
 * - Box 方块
 * - Sphere 球体
 * - Axes 座标轴
 *
 * ### 几何体
 *
 * > THREE 官方提供的几何体是相当齐全的，这里仅列举些自己常用的。
 *
 * - PlaneGeometry 平面
 * - BoxGeometry 立方体
 * - ConvexGeometry 凸面体
 * - ExtrudeGeometry 拉伸几何体
 *
 *
 * ### 材质
 *
 * ## 光源
 *
 * - [AmbientLight]() 环境光
 * - [PointLight]() 点光源
 * - [SpotLight]() 聚光灯光源
 * - [DirectionalLight]() 方向光
 *
 * @returns
 */
export function Scene3D() {
	const scene = useTHREEScene()
	const renderer = useTHREERenderer()
	const renderCallback = useTHREERenderCallback()
	React.useEffect(() => {
		const axesHelper = new THREE.AxesHelper(20)
		scene.add(axesHelper)

		const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
		const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x2bb8aa })
		const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

		planeMesh.rotation.x = -0.5 * Math.PI
		planeMesh.position.x = 15
		planeMesh.position.y = 0
		planeMesh.position.z = 0
		planeMesh.receiveShadow = true

		scene.add(planeMesh)

		renderer.shadowMap.enabled = true

		renderCallback()
	}, [renderCallback, renderer, scene])

	return (
		<THREEContainer>
			<>
				<Box />
				<Sphere />
				<SpotLight />
			</>
		</THREEContainer>
	)
}

export default Scene3D
