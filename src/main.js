import './style.css';
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.186.1/three.tsl.js";

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true; // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

const texture = new THREE.TextureLoader().load('src/assets/purple.jpg');
scene.background = texture;



const light = new THREE.PointLight( 0xffffff, 10000, 10000 );
const a_light = new THREE.AmbientLight( 0xfff000, .1, 1 );
light.position.set( 0, 100, -95 );
scene.add(a_light);
scene.add( light );
light.castShadow = true;

const loader = new GLTFLoader();
console.log(1);
const gltf = await loader.loadAsync( 'src/assets/board.glb' );
console.log(2);
const model = gltf.scene;
model.castShadow = true;

model.scale.set(3, 3, 3)
model.position.set(0, -100, -100);
scene.add( model );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 200, 0 );
controls.update();

let angle = 0;

import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer';
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(labelRenderer.domElement);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
const note_wrapper = document.createElement('wrapper');
note_wrapper.className = 'note_wrapper';
const firstNote = document.createElement('textarea');
const secondNote = document.createElement('textarea');
const thirdNote = document.createElement('textarea');
firstNote.className = 'note';
secondNote.className = 'note';
thirdNote.className = 'note';
firstNote.id = 'note_1';
secondNote.id = 'note_2';
thirdNote.id = 'note_3';
firstNote.readOnly = true;
secondNote.readOnly = true;
thirdNote.readOnly = true;
note_wrapper.appendChild(firstNote);
note_wrapper.appendChild(secondNote);
note_wrapper.appendChild(thirdNote);
const note_wrapperObject = new CSS2DObject(note_wrapper);

firstNote.value = "Christopher Columbus was responsible for the widespread exploration of the Americas.";
secondNote.value = "Akhenaten was the leader of the Achaemenid Empire.";
thirdNote.value = "Leonardo Da Vinci was a polymath with a burning curiosity for the inner workings of the world.";

note_wrapperObject.position.x = 0;
note_wrapperObject.position.z = 80;


const name_wrapper = document.createElement('wrapper');
name_wrapper.className = 'name_wrapper';

const full_name = document.createElement("a");
full_name.setAttribute("href", "https://www.linkedin.com/in/mohnish-nanthakumar-396783286/");
full_name.className = 'name_link';
full_name.innerHTML = "Mohnish Nanthakumar";
name_wrapper.appendChild(full_name);

const name_wrapperObject = new CSS2DObject(name_wrapper);
name_wrapperObject.position.x = -150;
name_wrapperObject.position.z = -170;


const tab_wrapper = document.createElement('wrapper');
tab_wrapper.className = 'tab_wrapper';

const tab_resume = document.createElement('p');
tab_resume.innerHTML = "RESUME";
tab_resume.className = 'tab';
tab_wrapper.appendChild(tab_resume);

const tab_about = document.createElement('p');
tab_about.innerHTML = "ABOUT";
tab_about.className = 'tab';
tab_wrapper.appendChild(tab_about);

const tab_home = document.createElement('p');
tab_home.innerHTML = "HOME";
tab_home.className = 'tab';
tab_wrapper.appendChild(tab_home);

const tab_wrapperObject = new CSS2DObject(tab_wrapper);
tab_wrapperObject.position.x = 150;
tab_wrapperObject.position.z = -120;

scene.add(note_wrapperObject);
scene.add(name_wrapperObject);
scene.add(tab_wrapperObject);

function animate() {
  // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render( scene, camera );
  model.rotation.set(Math.PI/4, 0, -Math.PI/2 + angle);
  angle += (Math.PI / 800);
  labelRenderer.render(scene, camera);
}

renderer.setAnimationLoop( animate );

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  labelRenderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setSize(window.innerWidth, window.innerHeight);
});
