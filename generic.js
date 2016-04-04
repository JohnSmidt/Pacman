var camera, scene, renderer;
var windowScale;
var cameraControls;
var clock = new THREE.Clock();
var headlight;

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
    light.position.set(25, 50, -25);
    scene.add(light);
	
	var lightSphere2 = new THREE.Mesh( new THREE.SphereGeometry(3, 25, 25), new THREE.MeshBasicMaterial() );
	lightSphere2.position.copy(light.position);
	scene.add(lightSphere2);
	
	headlight = new THREE.PointLight(0xFFFFFF, .5);
    //scene.add(headlight);
	
	spotlight = new THREE.SpotLight( 0xFFFFFF, 1.0 );
	spotlight.position.set(100, 150, 100);
	spotlight.angle = 20 * Math.PI / 180;
	spotlight.exponent = 1;
	spotlight.target.position.set( 0, 200, 0 );
	spotlight.castShadow = true;
	scene.add( spotlight );

	var lightSphere = new THREE.Mesh( new THREE.SphereGeometry(3, 25, 25), new THREE.MeshBasicMaterial() );
	lightSphere.position.copy( spotlight.position );

	scene.add( lightSphere );
	

	// RENDERER
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(scene.fog.color, 1);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);
	
	// CAMERA
	camera = new THREE.PerspectiveCamera(45, canvasRatio, 1, 1000 );
	camera.position.set(175, 200, 300);
	camera.lookAt(scene.position);
	
	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls.target.set(0,0,0);
}

function showMatrix(matrix) {
	for (var i = 0; i < 4; i++) {
		console.log(matrix[i] + "," + matrix[i + 4] + "," + matrix[i + 8] + "," + matrix[i + 12]);
	}
}

function draw() {
	var sphereGeometry = new THREE.SphereGeometry(30, 50, 50);
	var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x4C0099});
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.set(25, 50, 25);
	sphere.castShadow = true;
	sphere.receiveShadow = true;
	scene.add(sphere);
	
	var sphere2Geometry = new THREE.SphereGeometry(5, 50, 50);
	var sphere2Material = new THREE.MeshPhongMaterial({color: 0xFF0000});
	var sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
	sphere2.position.set(5, 10, 5);
	sphere2.castShadow = true;
	sphere2.receiveShadow = true;
	scene.add(sphere2);
}

function drawPlane() {
	var planeGeometry = new THREE.PlaneGeometry(200, 200, 1);
	var planeMaterial = new THREE.MeshBasicMaterial({color: 0xA4A4C1, side: THREE.DoubleSide});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = (-Math.PI / 2);
	
	scene.add(plane);
}

function drawGrid() {
	var newLineMaterial = new THREE.LineBasicMaterial({color: 0x000000});
	var newLineGeometry = new THREE.Geometry();
	
	for (var i = -10; i < 11; i = i + 2) {
		if (i != 0) {
			newLineGeometry = new THREE.Geometry();
		
			newLineGeometry.vertices.push(
				new THREE.Vector3(-100, 0, i * 10),
				new THREE.Vector3(100, 0, i * 10)
			);
		
			scene.add(new THREE.Line(newLineGeometry, newLineMaterial));
			
			newLineGeometry = new THREE.Geometry();
		
			newLineGeometry.vertices.push(
				new THREE.Vector3(i * 10, 0, -100),
				new THREE.Vector3(i * 10, 0, 100)
			);
		
			var line = new THREE.Line(newLineGeometry, newLineMaterial)
			line.position.z = 2;
		
			scene.add(line);
		}
	}
}

function buildAxis(src, dst, colorHex, dashed) {
	var geom = new THREE.Geometry(), mat;
	var dashGap = 8;
	
	
	if (dashed) {
		mat = new THREE.LineDashedMaterial({linewidth: 3, color: colorHex, dashSize: dashGap, gapSize: dashGap});
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
	headlight.position.copy(camera.position);
	
	renderer.render(scene, camera);
}

init();
draw();
scene.add(buildAxes(100));
drawPlane();
animate();