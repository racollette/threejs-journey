import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const woodColorTexture = textureLoader.load('/textures/wood/Wood_025_basecolor.jpg')
woodColorTexture.colorSpace = THREE.SRGBColorSpace
const woodAmbientOcclusionTexture = textureLoader.load('/textures/wood/Wood_025_ambientOcclusion.jpg')
const woodNormalTexture = textureLoader.load('/textures/wood/Wood_025_normal.jpg')
const woodRoughnessTexture = textureLoader.load('/textures/wood/Wood_025_roughness.jpg')
const woodHeightTexture = textureLoader.load('/textures/wood/Wood_025_height.png')

// woodColorTexture.repeat.set(8, 8)
// woodAmbientOcclusionTexture.repeat.set(8, 8)
// woodNormalTexture.repeat.set(8, 8)
// woodRoughnessTexture.repeat.set(8, 8)

const snowColorTexture = textureLoader.load('/textures/snow/Snow_001_COLOR.jpg')
snowColorTexture.colorSpace = THREE.SRGBColorSpace
const snowAmbientOcclusionTexture = textureLoader.load('/textures/snow/Snow_001_OCC.jpg')
const snowNormalTexture = textureLoader.load('/textures/snow/Snow_001_NORM.jpg')
const snowRoughnessTexture = textureLoader.load('/textures/snow/Snow_001_ROUGH.jpg')

snowColorTexture.repeat.set(8, 8)
snowAmbientOcclusionTexture.repeat.set(8, 8)
snowNormalTexture.repeat.set(8, 8)
snowRoughnessTexture.repeat.set(8, 8)

snowColorTexture.wrapS = THREE.RepeatWrapping
snowAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
snowNormalTexture.wrapS = THREE.RepeatWrapping
snowRoughnessTexture.wrapS = THREE.RepeatWrapping

snowColorTexture.wrapT = THREE.RepeatWrapping
snowAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
snowNormalTexture.wrapT = THREE.RepeatWrapping
snowRoughnessTexture.wrapT = THREE.RepeatWrapping

// Particles
const particlesTexture = textureLoader.load('/textures/star_01.png')
const particlesGeometry = new THREE.BufferGeometry()
const count = 10000

const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

for (let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 100 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values

const particlesMaterial = new THREE.PointsMaterial({
})
particlesMaterial.size = 0.4
particlesMaterial.sizeAttenuation = true
particlesMaterial.alphaMap = particlesTexture
particlesMaterial.color = new THREE.Color('#fff')
particlesMaterial.transparent = true
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false


const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// particles.position.y = 2.5
scene.add(particles)

/**
 * House
 */
// House container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(12, 2.5, 4, 100, 100),
    new THREE.MeshStandardMaterial({
        map: woodColorTexture,
        aoMap: woodAmbientOcclusionTexture,
        normalMap: woodNormalTexture,
        roughnessMap: woodRoughnessTexture,
        // displacementMap: woodHeightTexture,
        // displacementScale: 0.05,
        wireframe: false
    })
)

walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
// house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
// scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.castShadow = true

    // Position
    grave.position.set(x, 0.3, z)

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: snowColorTexture,
        aoMap: snowAmbientOcclusionTexture,
        normalMap: snowNormalTexture,
        roughnessMap: snowRoughnessTexture
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#fff', 0.8)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const sunLight = new THREE.DirectionalLight('#fff', 5)
sunLight.position.set(4, 9, 7)
gui.add(sunLight, 'intensity').min(0).max(5).step(0.001)
gui.add(sunLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(sunLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(sunLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(sunLight)

// const sunLightHelper = new THREE.DirectionalLightHelper(sunLight, 1)
// scene.add(sunLightHelper)

// Door light
const doorLight = new THREE.PointLight('#fff', 3, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

/**
 * Fog
 */
const fog = new THREE.Fog('#262837', 1, 15)
// scene.fog = fog

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 6, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 6, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 6, 3)
scene.add(ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setClearColor('#262837')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true

sunLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

sunLight.shadow.mapSize.width = 256
sunLight.shadow.mapSize.height = 256
sunLight.shadow.camera.far = 15

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()