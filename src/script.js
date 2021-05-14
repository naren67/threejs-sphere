import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLight } from 'three'

//loading
const textureLoader = new THREE.TextureLoader()
//image path
const normalTexture = textureLoader.load('/textures/pattern/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5,64,64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights red

const pointLight = new THREE.PointLight(0xff0000, 0.1)
pointLight.position.x = -1.96
pointLight.position.y = 2.53
pointLight.position.z = -1.6
pointLight.intensity = 2
scene.add(pointLight)

gui.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
gui.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
gui.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
gui.add(pointLight, 'intensity').min(0).max(10).step(0.01)


// Lights blue

const pointLight1 = new THREE.PointLight(0xe1ff, 0.1)
pointLight1.position.x = 2.13
pointLight1.position.y = -3
pointLight1.position.z = -1.98
pointLight1.intensity = 100
scene.add(pointLight1)

const light2 = gui.addFolder('Light 2')
light2.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight1, 'intensity').min(0).max(10).step(0.01)

//color pallet
const lightColorChanger = {
    color : 0xff0000
}

light2.addColor(lightColorChanger, 'color')
.onChange(()=>{
    pointLight1.color.set(lightColorChanger.color)
})

//  const pointLightHelper = new THREE.pointLightHelper(pointLight1, 1)
//  scene.add(pointLightHelper)

             //light 2
// const pointLight2 = new THREE.PointLight(0xff0000, 0.2)
// // pointLight.position.x = 2
// // pointLight.position.y = 3
// // pointLight.position.z = 4
// pointLight2.position.set(1,1,1)
// PointLight2.intensity = 1
// scene.add(pointLight2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//..........................................................................
/**
 * Animate
 */

// document.addEventListener('mousemove', onDocumentMouseMove)

// let mouseX = 0
// let mouseY = 0

// let targetX = 0
// let targetY = 0

// const windowHalfWidth = window.innerWidth / 2
// const windowHalfHeight = window.innerHeight / 2

// onDocumentMouseMove = (e)=>{
//     mouseX = (e.clientX - windowHalfWidth)
//     mouseY = (e.clientY - windowHalfWidth)
// }


//parallex
const moveSphere = (e)=>{
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll',moveSphere)


const clock = new THREE.Clock()

const tick = () =>
{

    // targetX = mouseX * .001
    // targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.4 * elapsedTime

    // sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    // sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    // sphere.position.z += .5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()