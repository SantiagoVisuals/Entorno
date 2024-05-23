// Importa las bibliotecas necesarias
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js";
import { StereoEffect } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/effects/StereoEffect.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crea la escena, la cámara y el renderizador
const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
    .setPath("./images/")
    .load([
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ]);

// Crea la cámara estéreo
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crea el efecto estéreo
const stereoEffect = new StereoEffect(renderer);
camera.position.set(0, 40, 0)
// Configura la cámara estéreo
stereoEffect.eyeSeparation = 1;
stereoEffect.setSize(window.innerWidth, window.innerHeight);

// Inicializa los controles de órbita
//const controls = new OrbitControls(camera, renderer.domElement);

// Verifica si el dispositivo soporta la API de dispositivos de orientación
if (window.DeviceOrientationEvent) {
    // Agrega un event listener para el evento de orientación del dispositivo
    window.addEventListener('deviceorientation', handleOrientation, false);
} else {
    console.log("El dispositivo no soporta la API de dispositivos de orientación.");
}

// Función para manejar el evento de orientación del dispositivo
function handleOrientation(event) {
    // Obtén los datos de la orientación del dispositivo
    const alpha = event.alpha; // Ángulo de rotación alrededor del eje z (en grados)
    const beta = event.beta;   // Ángulo de rotación alrededor del eje x (en grados)
    const gamma = event.gamma; // Ángulo de rotación alrededor del eje y (en grados)

    // Usa los datos de orientación para controlar la cámara
    // Por ejemplo, puedes rotar la cámara en función de estos ángulos
    camera.rotation.x = THREE.MathUtils.degToRad(beta);
    camera.rotation.y = THREE.MathUtils.degToRad(gamma);
    camera.rotation.z = THREE.MathUtils.degToRad(alpha);

    // Recuerda que debes tener una instancia de la cámara previamente definida en tu código
    // y adaptar la lógica de control según tus necesidades específicas
}

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );
cube.position.set(0,90,0);

const geometryPoint = new THREE.ConeGeometry( 5, 10, 32 ); 
const materialPoint = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const pointMedio = new THREE.Mesh(geometryPoint, materialPoint ); 
scene.add( pointMedio );

pointMedio.rotation.set(Math.PI ,0,0);

const pointIzquierda = new THREE.Mesh(geometryPoint, materialPoint ); 
scene.add( pointIzquierda );

pointIzquierda.position.set(118 ,20,0);
pointIzquierda.rotation.set(Math.PI ,0,0);

const pointDerecha = new THREE.Mesh(geometryPoint, materialPoint ); 
scene.add( pointDerecha );

pointDerecha.position.set(-118 ,20,0);
pointDerecha.rotation.set(Math.PI ,0,0);

// Crea el loader y carga el objeto FBX
const loader = new FBXLoader();
loader.load('assets/VR Gallery/VR Gallery.fbx', function (object) {
    // Escala el objeto FBX
    object.scale.set(0.01, 0.01, 0.01);

    // Añade el objeto FBX a la escena
    scene.add(object);
    object.position.set(0,0,0);
});


// Crea un esquema de luces sencillo
const ambientLight = new THREE.AmbientLight(0xFFF3C8 , 1); // Luz ambiental
const directionalLight = new THREE.DirectionalLight(0xFFF3C8, 0.7); // Luz direccional
directionalLight.position.set(0, 90, 0); // Posición de la luz direccional
scene.add(ambientLight, directionalLight);

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Actualiza la posición de pointMedio en el eje Y usando una función sinusoidal
    const amplitude = 1; // Amplitud de la oscilación
    const frequency = 0.003; // Frecuencia de la oscilación
    const offsetY = amplitude * Math.sin(frequency * Date.now());
    pointMedio.position.setY(offsetY+20);
    pointDerecha.position.setY(offsetY+20);
    pointIzquierda.position.setY(offsetY+20);

    // Renderiza la escena con el efecto estéreo
    stereoEffect.render(scene, camera);
}

// Inicia la animación
animate();
