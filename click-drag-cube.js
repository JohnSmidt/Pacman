 ////////////////////////////////////////////////////////////////////////////////
// Diffuse material exercise
////////////////////////////////////////////////////////////////////////////////
/*global THREE, window, document*/
var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var ambientLight, light;

function init() {
	var canvasWidth = 846;
	var canvasHeight = 494;
	var canvasRatio = canvasWidth / canvasHeight;

	// CAMERA
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 80000 );
	camera.position.set( -300, 300, -1000 );
	camera.lookAt(0,0,0);
	
	// LIGHTS
	ambientLight = new THREE.AmbientLight( 0xffffff );
	light = new THREE.DirectionalLight( 0xffffff, 0.7 );
	light.position.set( -800, 900, 300 );
	
	// RENDERER
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0xAAAAAA, 1.0); // original: renderer.setClearColorHex(); removed Hex
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement); //BUG
	cameraControls.target.set(0, 0, 0);
	
}

function createCube() {
	var cubeColor = 0x00ff00;

	var geometry = new THREE.BoxGeometry( 100, 100, 100);
	var material = new THREE.MeshLambertMaterial({color: cubeColor, wireframe: true} );
	var cube = new THREE.Mesh( geometry, material );
	return cube;
}

function fillScene() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x808080, 2000, 4000);
	scene.add(camera);

	// LIGHTS
	scene.add(ambientLight);
	scene.add(light);

	var cube = createCube();
	scene.add(cube);
}

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas'); // The last bug?
	if (canvas.length > 0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}

function animate() {
	window.requestAnimationFrame( animate );
	render();

}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);

	renderer.render( scene, camera );
}

function attempt() {
	try {
		init();
		fillScene();
		addToDOM();
		animate();
	} catch(e) {
		document.getElementById("errorReport").innerHTML = "Error: ".concat(e);
	}
}

window.addEventListener("load", attempt, false);