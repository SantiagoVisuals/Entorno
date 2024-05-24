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
camera.position.set(0, 40, 0);
camera.rotation.set(Math.PI / 2, 0, -Math.PI / 2); 
// Configura la cámara estéreo
stereoEffect.eyeSeparation = 1;
stereoEffect.setSize(window.innerWidth, window.innerHeight);

// Inicializa los controles de órbita
//const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("gamepadconnected", (event) => {
    const gamepad = event.gamepad;
    console.log("Gamepad connected at index " + gamepad.index + ": " + gamepad.id);

    // Comienza a escuchar cambios en el estado del controlador
    requestAnimationFrame(checkGamepad);
});

// Función para verificar el estado del controlador
// Función para verificar el estado del controlador y lanzar el raycast cuando se presiona el botón "X"
window.addEventListener("gamepadconnected", (event) => {
    const gamepad = event.gamepad;
    console.log("Gamepad connected at index " + gamepad.index + ": " + gamepad.id);

    // Comienza a escuchar cambios en el estado del controlador
    requestAnimationFrame(checkGamepad);
});

// Función para verificar el estado del controlador
function checkGamepad() {
    const gamepad = navigator.getGamepads()[0]; // Obtén el primer controlador

    if (gamepad) {
        // Mapea los valores del joystick izquierdo a los cambios en la posición de la cámara
        const sensitivity = 0.3; // Sensibilidad del joystick
        const deltaX = -gamepad.axes[0] * sensitivity; // Movimiento en el eje x
        const deltaY = 0; // No hay movimiento vertical en este ejemplo
        const deltaZ = -gamepad.axes[1] * sensitivity; // Movimiento en el eje z

        // Actualiza la posición de la cámara solo si está dentro de los límites
        if ((camera.position.x + deltaX) <= 140 && (camera.position.x + deltaX) >= -140) {
            camera.position.x += deltaX;
        }
        if ((camera.position.z + deltaZ) <= 52 && (camera.position.z + deltaZ) >= -52) {
            camera.position.z += deltaZ;
        }
        if (gamepad.buttons[0].pressed) { // Botón "X" del controlador PS4
            // Crear un rayo desde la posición de la cámara hacia adelante
            const raycaster = new THREE.Raycaster();
            raycaster.set(camera.position, camera.getWorldDirection(new THREE.Vector3()));
        
            // Array para almacenar los objetos intersectados
            const intersects = raycaster.intersectObjects([pointIzquierda, pointDerecha, pointMedio]); // Agregar pointMedio
        
            // Verificar si el rayo intersecta con alguno de los objetos
            if (intersects.length > 0) {
                if (intersects[0].object === pointIzquierda) {
                    // Actualizar la posición de la cámara a la posición de pointIzquierda en x y z
                    camera.position.x = pointIzquierda.position.x;
                    camera.position.z = pointIzquierda.position.z;
                } else if (intersects[0].object === pointDerecha) {
                    // Actualizar la posición de la cámara a la posición de pointDerecha en x y z
                    camera.position.x = pointDerecha.position.x;
                    camera.position.z = pointDerecha.position.z;
                } else if (intersects[0].object === pointMedio) {
                    // Actualizar la posición de la cámara a la posición de pointMedio en x y z
                    camera.position.x = pointMedio.position.x;
                    camera.position.z = pointMedio.position.z;
                }
            }
        }

        // Lanzar rayo (raycast) al presionar el botón "X"
        // Función para cambiar la intensidad de la luz ambiental y la posición de la información al interactuar con los cuadros
function handleInteractionsWithCuadro(cuadro, informacion, originalPosition) {
    // Lanzar rayo (raycast) al presionar el botón "X"
    if (gamepad.buttons[0].pressed) { // Botón "X" del controlador PS4
        // Crear un rayo desde la posición del punto central hacia adelante
        const raycaster = new THREE.Raycaster();
        raycaster.set(pointCentral.position, pointCentral.getWorldDirection(new THREE.Vector3()));

        // Array para almacenar los objetos intersectados
        const intersects = raycaster.intersectObjects([cuadro]);

        // Verificar si el rayo intersecta con alguno de los objetos
        if (intersects.length > 0) {
            if (intersects[0].object === cuadro) {
                // Cambiar la intensidad de la luz ambiental
                ambientLight.intensity = 0.3;
                // Restaurar la posición original de la información
                informacion.position.copy(originalPosition);
            }
        }
    }

    // Cambiar la intensidad de la luz ambiental al presionar el botón "O"
    if (gamepad.buttons[1].pressed) { // Botón "O" del controlador PS4
        ambientLight.intensity = 0.7;
        // Establecer la posición de la información
        Informacion1.position.set(40, 36, 80);
        Informacion2.position.set(157, 36, 80);
        Informacion3.position.set(-77, 36, 80);
        Informacion4.position.set(-40, 36, -80);
        Informacion5.position.set(-157, 36, -80);
        Informacion6.position.set(77, 36, -80); // Establecer la posición de la información cuando se presiona "O"
    }
}

// Llamar a la función para cada cuadro e información
handleInteractionsWithCuadro(cuadro1, Informacion1, new THREE.Vector3(40, 36, 55)); // Pasar la posición original de Informacion1
handleInteractionsWithCuadro(cuadro2, Informacion2, new THREE.Vector3(157, 36, 55)); // Pasar la posición original de Informacion2
handleInteractionsWithCuadro(cuadro3, Informacion3, new THREE.Vector3(-77, 36, 55)); // Pasar la posición original de Informacion3
handleInteractionsWithCuadro(cuadro4, Informacion4, new THREE.Vector3(77, 36, -55)); // Pasar la posición original de Informacion4
handleInteractionsWithCuadro(cuadro5, Informacion5, new THREE.Vector3(-157, 36, -55)); // Pasar la posición original de Informacion5
handleInteractionsWithCuadro(cuadro6, Informacion6, new THREE.Vector3(-40, 36, -55)); // Pasar la posición original de Informacion6

    }

    // Sigue verificando el estado del controlador
    requestAnimationFrame(checkGamepad);
}


// Crear un elemento HTML para mostrar la información


// En la sección donde manejas el botón "X" del control de PS4



// Verifica si el dispositivo soporta la API de dispositivos de orientación
if (window.DeviceOrientationEvent) {
    // Agrega un event listener para el evento de orientación del dispositivo
    window.addEventListener('deviceorientation', handleOrientation, false);
} else {
    console.log("El dispositivo no soporta la API de dispositivos de orientación.");
}

// Función para manejar el evento de orientación del dispositivo
// Guarda la rotación inicial de la cámara
const initialRotation = new THREE.Quaternion().copy(camera.quaternion);

function handleOrientation(event) {
    // Obtén los datos de la orientación del dispositivo
    const alpha = THREE.MathUtils.degToRad(event.alpha); // Ángulo de rotación alrededor del eje z (en radianes)
    const beta = THREE.MathUtils.degToRad(event.beta);   // Ángulo de rotación alrededor del eje x (en radianes)
    const gamma = THREE.MathUtils.degToRad(event.gamma); // Ángulo de rotación alrededor del eje y (en radianes)

    // Calcula las cuaterniones de rotación
    const quaternion = new THREE.Quaternion();

    // Primero aplicamos la rotación alrededor del eje z (alpha)
    const qAlpha = new THREE.Quaternion();
    qAlpha.setFromAxisAngle(new THREE.Vector3(0, 1, 0), alpha);
    
    // Luego aplicamos la rotación alrededor del eje x (beta)
    const qBeta = new THREE.Quaternion();
    qBeta.setFromAxisAngle(new THREE.Vector3(1, 0, 0), beta);
    
    // Finalmente aplicamos la rotación alrededor del eje y (gamma)
    const qGamma = new THREE.Quaternion();
    qGamma.setFromAxisAngle(new THREE.Vector3(0, 0, 1), gamma- Math.PI);
    
    // Combina las rotaciones
    quaternion.multiply(qAlpha).multiply(qBeta).multiply(qGamma);

    // Aplica la rotación inicial como referencia
    quaternion.multiply(initialRotation);

    // Aplica la rotación a la cámara
    camera.quaternion.copy(quaternion);
}



const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);
cube.position.set(0, 90, 0);

const geometryCuadro = new THREE.BoxGeometry(50, 27, 0);
const materialCuadro = new THREE.MeshBasicMaterial({ color: 0xffffff,transparent: true, opacity: 0.01});
const materialCuadro2 = new THREE.MeshBasicMaterial({ color: 0xffff00,transparent: true, opacity: 1});
const cuadro1 = new THREE.Mesh(geometryCuadro, materialCuadro);
scene.add(cuadro1);
cuadro1.position.set(0, 36, 60);

const cuadro2 = new THREE.Mesh(geometryCuadro, materialCuadro);
scene.add(cuadro2);
cuadro2.position.set(117, 36, 60);

const cuadro3 = new THREE.Mesh(geometryCuadro, materialCuadro);
scene.add(cuadro3);
cuadro3.position.set(-117, 36, 60);

const cuadro4 = new THREE.Mesh(geometryCuadro, materialCuadro);
scene.add(cuadro4);
cuadro4.position.set(117, 36, -60);

const cuadro5 = new THREE.Mesh(geometryCuadro, materialCuadro);
scene.add(cuadro5);
cuadro5.position.set(-117, 36, -60);

const cuadro6 = new THREE.Mesh(geometryCuadro, materialCuadro);
scene.add(cuadro6);
cuadro6.position.set(0, 36, -60);

const geometryInformacion = new THREE.BoxGeometry(24, 27, 5);

// Textura para materialInformacion1
const textureInformacion1 = new THREE.TextureLoader().load("./images/Info1.png");
const materialInformacion1 = new THREE.MeshPhongMaterial({ color: 0x695138, map: textureInformacion1 });

// Textura para materialInformacion2
const textureInformacion2 = new THREE.TextureLoader().load("./images/Info2.png"); // Asumiendo que Info2.png es la textura para materialInformacion2
const materialInformacion2 = new THREE.MeshPhongMaterial({ color: 0x695138, map: textureInformacion2 });
const materialInformacion3 = new THREE.MeshPhongMaterial({ color: 0xff0000});


// Creación y configuración de los objetos Informacion con las texturas asignadas
const Informacion1 = new THREE.Mesh(geometryInformacion, materialInformacion1);
scene.add(Informacion1);
Informacion1.position.set(40, 36, 80);
Informacion1.rotation.set(0, 0.785398, 0);

const Informacion2 = new THREE.Mesh(geometryInformacion, materialInformacion2);
scene.add(Informacion2);
Informacion2.position.set(157, 36, 80);
Informacion2.rotation.set(0, 0.785398, 0);

const Informacion3 = new THREE.Mesh(geometryInformacion, materialInformacion1);
scene.add(Informacion3);
Informacion3.position.set(-77, 36, 80);
Informacion3.rotation.set(0, 0.785398, 0);

const Informacion4 = new THREE.Mesh(geometryInformacion, materialInformacion2);
scene.add(Informacion4);
Informacion4.position.set(-40, 36, -80);
Informacion4.rotation.set(0, 0.785398, 0);

const Informacion5 = new THREE.Mesh(geometryInformacion, materialInformacion1);
scene.add(Informacion5);
Informacion5.position.set(-157, 36, -80);
Informacion5.rotation.set(0, 0.785398, 0);

const Informacion6 = new THREE.Mesh(geometryInformacion, materialInformacion2);
scene.add(Informacion6);
Informacion6.position.set(77, 36, -80);
Informacion6.rotation.set(0, 0.785398, 0);


const geometryPoint = new THREE.ConeGeometry(5, 10, 32);
const materialPoint = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const pointMedio = new THREE.Mesh(geometryPoint, materialPoint);
scene.add(pointMedio);

pointMedio.position.set(0, 20, 0);
pointMedio.rotation.set(Math.PI, 0, 0);

const pointIzquierda = new THREE.Mesh(geometryPoint, materialPoint);
scene.add(pointIzquierda);

pointIzquierda.position.set(118, 20, 0);
pointIzquierda.rotation.set(Math.PI, 0, 0);

const pointDerecha = new THREE.Mesh(geometryPoint, materialPoint);
scene.add(pointDerecha);

pointDerecha.position.set(-118, 20, 0);
pointDerecha.rotation.set(Math.PI, 0, 0);

// Crea el loader y carga el objeto FBX
const loader = new FBXLoader();
loader.load('assets/VR Gallery/VR Gallery.fbx', function (object) {
    // Escala el objeto FBX
    object.scale.set(0.01, 0.01, 0.01);

    // Añade el objeto FBX a la escena
    scene.add(object);
    object.position.set(0, 0, 0);
    object.rotation.set(0,0,0);
});

// Crear un punto central
const geometryPointCentral = new THREE.SphereGeometry(0.06, 8, 8); // Cambiar la geometría a una esfera más pequeña
const materialPointCentral = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const pointCentral = new THREE.Mesh(geometryPointCentral, materialPointCentral);
scene.add(pointCentral);

// Función para actualizar la posición del punto central
function updateCentralPointPosition() {
    // Obtener la dirección de la cámara estéreo
    const direction = new THREE.Vector3(0, 0, -1);
    camera.getWorldDirection(direction);

    // Calcular la posición del punto central basada en la dirección de la cámara
    const distance = 10; // Puedes ajustar esta distancia según sea necesario
    const position = new THREE.Vector3();
    position.copy(camera.position).add(direction.multiplyScalar(distance));
    pointCentral.position.copy(position);
}




// Crea un esquema de luces sencillo
const ambientLight = new THREE.AmbientLight(0xFFF3C8, 0.7); // Luz ambiental

const directionalLight = new THREE.DirectionalLight(0xFFF3C8, 1); // Luz direccional
directionalLight.position.set(0, 90, 0); // Posición de la luz direccional
scene.add(ambientLight);
scene.add(directionalLight);

let color = 0xffffff;

// Crea luces SpotLight para cada objeto Informacion
const createSpotLight = (target, x, y, z,color) => {
    const spotLight = new THREE.SpotLight(color);
    spotLight.position.set(x, y, z);
    spotLight.target = target;
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;

    scene.add(spotLight);
    scene.add(spotLight.target);
};

// SpotLight para Informacion1
createSpotLight(Informacion1, 10, 50, 15, color);

// SpotLight para Informacion2
createSpotLight(Informacion2, 127, 50, 15, color);

// SpotLight para Informacion3
createSpotLight(Informacion3, -107, 50, 15, color);

// SpotLight para Informacion4
createSpotLight(Informacion4, -10, 50, -15, color);

// SpotLight para Informacion5
createSpotLight(Informacion5, -127, 50, -15, color);

// SpotLight para Informacion6
createSpotLight(Informacion6, 107, 50, -15, color);

// Crear elementos HTML para mostrar la información del juego para ambas cámaras
const infoTextLeft = document.createElement('div');
infoTextLeft.style.position = 'absolute';
infoTextLeft.style.top = '10px'; // Posición en la parte superior
infoTextLeft.style.left = '10px'; // Posición en la parte izquierda
infoTextLeft.style.color = 'white';
infoTextLeft.style.fontFamily = 'Arial';
infoTextLeft.style.padding = '10px'; // Añadir relleno alrededor del texto
infoTextLeft.style.background = 'rgba(0, 0, 0, 0.5)'; // Fondo semi-transparente
infoTextLeft.style.borderRadius = '10px'; // Bordes redondeados
infoTextLeft.style.maxWidth = '300px';
infoTextLeft.style.fontSize = '10px'; // Tamaño de fuente más pequeño
infoTextLeft.style.padding = '5px'; // Ancho máximo del contenedor
infoTextLeft.innerHTML = `
    <p style="margin-bottom: 10px;"><strong>¡Bienvenido a nuestra galería 3D!</strong></p>
    <ul style="list-style-type: none; padding-left: 0;">
        <li>&rarr; Es necesario un control de ps4 o xbox.</li>
        <li>&rarr; Acercate a los cuadros para interactuar.</li>
        <li>&rarr; Para obtener información sobre los cuadros, simplemente haz clic sobre ellos.</li>
        <li>&rarr; Si quieres desplazarte a una posición específica, haz clic sobre los conos amarillos.</li>
        <li>&rarr; Utiliza el joystick izquierdo para moverte dentro del entorno 3D.</li>
    </ul>
`;

const infoTextRight = infoTextLeft.cloneNode(true); // Clonar el elemento para la otra cámara
infoTextRight.style.left = ''; // Quitar la posición izquierda para que se ajuste automáticamente a la derecha
infoTextRight.style.right = '10px'; // Posición en la parte derecha
infoTextRight.style.textAlign = 'left'; // Alinear texto a la izquierda en el contenedor
infoTextRight.style.maxWidth = '300px'; // Ancho máximo del contenedor

// Agregar los elementos HTML al cuerpo del documento
document.body.appendChild(infoTextLeft);
document.body.appendChild(infoTextRight);

// Función para actualizar la posición de los elementos HTML en relación con la cámara izquierda
// Función para actualizar la posición de los elementos HTML en relación con la cámara izquierda
function updateInfoPositionLeft() {
    // Convertir la posición 3D de la cámara izquierda a la pantalla
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(camera.matrixWorld);
    vector.project(camera);

    // Obtener el tamaño de la ventana
    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;

    // Calcular la posición de los elementos HTML en relación con la cámara izquierda
    const x = (vector.x * widthHalf) + widthHalf;
    const y = -(vector.y * heightHalf) + heightHalf;

    // Actualizar la posición de los elementos HTML para la cámara izquierda
    infoTextLeft.style.left = x - infoTextLeft.offsetWidth + 'px'; // Restar el ancho del elemento para alinear desde el lado izquierdo
    infoTextLeft.style.top = y + 'px';
}



// Función para actualizar la posición de los elementos HTML en relación con la cámara derecha
// Función para actualizar la posición de los elementos HTML en relación con la cámara derecha
function updateInfoPositionRight() {
    // Convertir la posición 3D de la cámara derecha a la pantalla
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(camera.matrixWorld);
    vector.project(camera);

    // Obtener el tamaño de la ventana
    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;

    // Calcular la posición de los elementos HTML en relación con la cámara derecha
    const x = (vector.x * widthHalf) + widthHalf;
    const y = -(vector.y * heightHalf) + heightHalf;

    // Actualizar la posición de los elementos HTML para la cámara derecha
    infoTextRight.style.left = x - infoTextRight.offsetWidth + 'px'; // Restar el ancho del elemento para alinear desde el lado derecho
    infoTextRight.style.top = y + 'px';
}




// Llamar a las funciones para actualizar la posición inicialmente
updateInfoPositionLeft();
updateInfoPositionRight();

// Agregar un event listener para el evento 'resize' para actualizar la posición cuando se redimensiona la ventana
window.addEventListener('resize', () => {
    updateInfoPositionLeft();
    updateInfoPositionRight();
});


// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Actualiza la posición de pointMedio en el eje Y usando una función sinusoidal
    const amplitude = 1; // Amplitud de la oscilación
    const frequency = 0.003; // Frecuencia de la oscilación
    const offsetY = amplitude * Math.sin(frequency * Date.now());
    pointMedio.position.setY(offsetY + 20);
    pointDerecha.position.setY(offsetY + 20);
    pointIzquierda.position.setY(offsetY + 20);
    updateCentralPointPosition();
    // Renderiza la escena con el efecto estéreo
    stereoEffect.render(scene, camera);
}

// Inicia la animación
animate();
