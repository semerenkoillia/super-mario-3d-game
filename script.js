import * as THREE from './libs/three.module.min.js';

let scene, camera, renderer, player, difficulty;

function startGame(level) {
  difficulty = level;
  document.getElementById('menu').style.display = 'none';
  init();
  animate();
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  camera.position.y = 2;

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  player = new THREE.Mesh(geometry, material);
  player.position.y = 1;
  scene.add(player);

  const floorGeometry = new THREE.BoxGeometry(20, 1, 20);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  scene.add(floor);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  document.addEventListener('keydown', onKeyDown);
}

function onKeyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      player.position.x -= 0.2;
      break;
    case 'ArrowRight':
    case 'd':
      player.position.x += 0.2;
      break;
    case 'ArrowUp':
    case 'w':
      player.position.z -= 0.2;
      break;
    case 'ArrowDown':
    case 's':
      player.position.z += 0.2;
      break;
  }
}

function animate() {
  requestAnimationFrame(animate);
  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 5;
  camera.lookAt(player.position);
  renderer.render(scene, camera);
}
