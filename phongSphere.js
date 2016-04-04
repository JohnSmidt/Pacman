var camera, scene, renderer;
var windowScale;
var cameraControls;
var clock = new THREE.Clock();

function init() {
	var canvasWidth = 846;
	var canvasHeight = 494;
	
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;
	
	// SCENE
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );
	
	// LIGHTS
	var light = new THREE.PointLight(0xFFFFFF, 1);
    light.position.set(200, 200, 200);
    scene.add(light);

	// RENDERER
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(scene.fog.color, 1);

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);
	
	// CAMERA
	camera = new THREE.PerspectiveCamera(45, canvasRatio, 1, 1000 );
	camera.position.set(250, 100, 250);
	camera.lookAt(scene.position);
	
	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls.target.set(0,0,0);
}


function draw() {
	var geometry = new THREE.SphereGeometry( 50, 32, 32 );
	var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
	var sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );
}

function buildAxis(src, dst, colorHex, dashed) {
	var geom = new THREE.Geometry(), mat;
	
	if (dashed) {
		mat = new THREE.LineDashedMaterial({linewidth: 3, color: colorHex, dashSize: 1, gapSize: 1});
	} else {
		mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
	}
	
	geom.vertices.push( src.clone());
    geom.vertices.push( dst.clone());
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line(geom, mat, THREE.LineSegment);

    return axis;
}

function buildAxes(length) {
	var axes = new THREE.Object3D();
	
	axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFFFF00, false)); // +X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

	return axes;
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	renderer.render(scene, camera);
}

init();
draw();
scene.add(buildAxes(100));
animate();