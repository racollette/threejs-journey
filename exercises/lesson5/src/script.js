import * as THREE from 'three'
import gsap from 'gsap'
// import { GLTFLoader } from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const gltfLoader = new GLTFLoader();
console.log(gltfLoader);

gltfLoader.load('./raptor-walk-sleepy.gltf.glb', () => { console.log("success") })

/**
 * Base
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()
    // Render
    mesh.position.x = Math.cos(elapsedTime)
    mesh.position.y = Math.sin(elapsedTime)
    mesh.rotation.x = elapsedTime

    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()