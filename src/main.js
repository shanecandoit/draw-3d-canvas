import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// Grid
const gridSize = 100;
const gridDivisions = 100;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x2a2a2a);
gridHelper.rotation.x = 0; // Grid on the ground (XZ plane)
scene.add(gridHelper);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5; // Place cube on grid
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Camera - Top-down view
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 20, 0); // Directly above, looking down
camera.lookAt(0, 0, 0);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
});
renderer.setSize(sizes.width, sizes.height);

// Controls - Top-down 2D panning
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true; // Enable screen space panning for top-down
controls.enableRotate = false; // No rotation
controls.minDistance = 10; // Minimum zoom distance
controls.maxDistance = 50; // Maximum zoom distance
controls.maxPolarAngle = 0; // Lock to top-down
controls.minPolarAngle = 0; // Lock to top-down
controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,    // Left click to pan
    MIDDLE: THREE.MOUSE.DOLLY, // Middle click to zoom
    RIGHT: THREE.MOUSE.PAN     // Right click to pan
};

// Debug UI
const debugInfo = document.createElement('div');
debugInfo.style.position = 'absolute';
debugInfo.style.bottom = '10px';
debugInfo.style.left = '10px';
debugInfo.style.color = 'rgba(255, 255, 255, 0.5)';
debugInfo.style.fontFamily = 'monospace';
debugInfo.style.fontSize = '12px';
debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
debugInfo.style.padding = '8px';
debugInfo.style.borderRadius = '4px';
debugInfo.style.pointerEvents = 'none';
debugInfo.style.zIndex = '1000';
document.body.appendChild(debugInfo);

// Mouse tracking
const mouse = {
    x: 0,
    y: 0,
    screenX: 0,
    screenY: 0,
    worldX: 0,
    worldZ: 0
};

const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Horizontal plane at y=0

window.addEventListener('mousemove', (event) => {
    // Store screen coordinates
    mouse.screenX = event.clientX;
    mouse.screenY = event.clientY;
    
    // Normalized device coordinates
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    
    // World coordinates on the grid
    raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectPoint);
    
    if (intersectPoint) {
        mouse.worldX = intersectPoint.x;
        mouse.worldZ = intersectPoint.z;
    }
});

// FPS tracking
let lastTime = performance.now();
let frames = 0;
let fps = 0;

const tick = () => {
    const currentTime = performance.now();
    frames++;
    
    // Update FPS every second
    if (currentTime >= lastTime + 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime));
        frames = 0;
        lastTime = currentTime;
    }
    
    // Update debug info
    debugInfo.innerHTML = `
        FPS: ${fps}<br>
        Mouse: (${Math.round(mouse.worldX * 10) / 10}, ${Math.round(mouse.worldZ * 10) / 10})<br>
        Screen: (${mouse.screenX}, ${mouse.screenY})<br>
        Camera: (${Math.round(camera.position.x * 10) / 10}, ${Math.round(camera.position.y * 10) / 10}, ${Math.round(camera.position.z * 10) / 10})
    `;
    
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
