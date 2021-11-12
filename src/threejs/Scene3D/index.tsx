import * as React from 'react'
import * as THREE from 'three'
import { THREEContainer, useThreeRender, useThreeScene } from '../../components/THREEContainer'

function SpotLight() {
	const scene = useThreeScene()

	React.useEffect(() => {
		const spotLight = new THREE.SpotLight(0xffffff)
		spotLight.position.set(-40, 60, -10)
		scene.add(spotLight)

		return () => {
			scene.remove(spotLight)
		}
	}, [scene])

	return <></>
}

function Sphere() {
	const scene = useThreeScene()
	React.useEffect(() => {
		const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
		const sphereMaterial = new THREE.MeshLambertMaterial({
			wireframe: true,
			color: 0x7777ff,
		})

		const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
		scene.add(sphereMesh)

		return () => {
			scene.remove(sphereMesh)
		}
	}, [scene])
	return <></>
}

function Box() {
	const scene = useThreeScene()

	React.useEffect(() => {
		const boxGeometry = new THREE.BoxGeometry(4, 4, 4)
		const boxMaterial = new THREE.MeshLambertMaterial({ color: 0x8d0c0c })

		const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
		boxMesh.position.x = -4
		boxMesh.position.y = 3
		boxMesh.position.z = 0
		scene.add(boxMesh)

		return () => {
			scene.remove(boxMesh)
		}
	}, [scene])

	return <></>
}

/**
 * 使用 Three.js  创建三维场景。
 * @returns
 */
export function Scene3D() {
	const scene = useThreeScene()
	const render = useThreeRender()
	React.useEffect(() => {
		const axesHelper = new THREE.AxesHelper(20)
		scene.add(axesHelper)

		const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
		const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x2bb8aa })
		const plane = new THREE.Mesh(planeGeometry, planeMaterial)

		plane.rotation.x = -0.5 * Math.PI
		plane.position.x = 15
		plane.position.y = 0
		plane.position.z = 0

		scene.add(plane)

		render()
	}, [render, scene])

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
