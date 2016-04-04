var camera, scene, renderer, blinky;
var windowScale;
var cameraControls;
var clock = new THREE.Clock();
var headlight;

var pacman;

var keyboard = new KeyboardState();
var controls;
var test1 = 25;
var test2 = 22;

var gameStart = 120;

var position1 = 8;
var position2 = 7;

var testTime = 60;
var direction = 1; //right = 1; up = 2; left = 3; down = 4;


var container, scene, camera, renderer, controls, stats;

//variable to count the pellets once
var countPellets = true;

//variable to see the score of the game
var pelletCount = 0;

//total pelet count
var totalPelletCount = 0;

function init() {

	var canvasWidth = 1000;
	var canvasHeight = 600;


	
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;
	
	// SCENE
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x0000003, 2000, 4000 );
	
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
	spotlight.position.set(-100, -150, -100);
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
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	var capsuleMaterial = new THREE.MeshBasicMaterial( { color: 0x030303 } );
	var ghostCapsuleMaterial = new THREE.MeshBasicMaterial( { color:0xFF0000, transparent: true, opacity: 0 } );
	var ghostCapsuleMaterial2 = new THREE.MeshBasicMaterial( { color:0xFF0000, transparent: true, opacity: 1 } );

	//var cylBleu = new THREE.MeshNormalMaterial( { transparent: true, opacity: 0.5 } );
	//var cylGeom2 = new THREE.CylinderGeometry( 7.16, 7.16, 50, 100, 1, 1 );

		// cylinder = new THREE.Mesh(new THREE.CylinderGeometry( 120, 120, 390, 32 ), cylinderMaterial);

		// cylinder.rotation.z = 70 * Math.PI/180;
		// cylinder.position.x = 0;	// (20+32) - half of width (20+64+110)/2
		// cylinder.position.y = (0);	// half of height
		// cylinder.position.z = -50;	// offset 77 + half of depth 6/2
		// scene.add( cylinder);

		capsule = new createCapsule( capsuleMaterial, 
		7.16,
		new THREE.Vector3( 0, 0, 47 ),
		new THREE.Vector3( 0, 0, 0 ), 
		100, false, false );
	scene.add( capsule );
	blinkyCapsule = new createCapsule( ghostCapsuleMaterial, 
		7.16,
		new THREE.Vector3( 0, 0, 47 ),
		new THREE.Vector3( 0, 0, 0 ), 
		100, false, false );
	scene.add( blinkyCapsule );
	pinkyCapsule = new createCapsule( ghostCapsuleMaterial, 
		7.16,
		new THREE.Vector3( 0, 0, 47 ),
		new THREE.Vector3( 0, 0, 0 ), 
		100, false, false );
	scene.add( pinkyCapsule );
	inkyCapsule = new createCapsule( ghostCapsuleMaterial, 
		7.16,
		new THREE.Vector3( 0, 0, 47 ),
		new THREE.Vector3( 0, 0, 0 ), 
		100, false, false );
	scene.add( inkyCapsule );
	frankyCapsule = new createCapsule( ghostCapsuleMaterial, 
		7.16,
		new THREE.Vector3( 0, 0, 47 ),
		new THREE.Vector3( 0, 0, 0 ), 
		100, false, false );
	scene.add( frankyCapsule );
	clydeCapsule = new createCapsule( ghostCapsuleMaterial, 
		7.16,
		new THREE.Vector3( 0, 0, 47 ),
		new THREE.Vector3( 0, 0, 0 ), 
		100, false, false );
	scene.add( clydeCapsule );
	//scene.add( cylGeom2 );

	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild(stats.domElement);

	// CAMERA
	camera = new THREE.PerspectiveCamera(30, canvasRatio, 1, 1000 );
	camera.position.set(0, 100, 0);
	//camera.lookAt( pacman );
	camera.lookAt(capsule);
	
	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls.target.set(0,0,0);
}

function showMatrix(matrix) {
	for (var i = 0; i < 4; i++) {
		//console.log(matrix[i] + "," + matrix[i + 4] + "," + matrix[i + 8] + "," + matrix[i + 12]);
	}
}

function buildMap() {
	var mapWidth = 45;
	var mapHeight = 47;

	var cubeHeight = 0.75;
	 cubeWidth = 1;
	 cubeDepth = 1;

	var wallGeometry = new THREE.CubeGeometry(cubeWidth, cubeHeight, cubeDepth);
	var pelletGeometry = new THREE.SphereGeometry(.5, 25, 25);
	var jailGeometry = new THREE.SphereGeometry(.5, 25, 25);
	var enemySpawnGeometry = new THREE.SphereGeometry(.5, 25, 25);
	var pacmanGeometry = new THREE.SphereGeometry(.5, 25, 25);

	var wallMaterial = new THREE.MeshBasicMaterial({color: 0x023F56});
	var pelletMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
	var jailMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
	//var enemySpawnMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
	var pacmanMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00});

	//create smaller squares for the pacman to eat. We want these 2D squares
	var smallSquareGeometry = new THREE.CubeGeometry(.2, .2, .2);
	//small pellet material
	
//This function builds the map that you see on the screen
	//small pellet material
	var smallSquareMaterial = new THREE.MeshBasicMaterial({color: 0x7FFF33});
	var cube;

	//replacement stuff for pellets
	var replaceGeometry = new THREE.CubeGeometry(.2, .2, .2);
	var replaceMaterial = new THREE.MeshBasicMaterial({color: 0x030303});
//This function builds the map that you see on the screen
	
	var cube;
	
	for (var y = 0; y < mapHeight; y++) {
		for (var x = 0; x < mapWidth; x++) {
			switch (map[y][x]) {
				case 1:
					// if(x > 20 && x < 40){
					// 	wallMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
					// }
					// else
					// {
					// 	wallMaterial = new THREE.MeshBasicMaterial({color: 0x0202aa});
					// }
					currentMaterial = wallMaterial;
					currentGeometry = wallGeometry;
					break;
				case 2:
					currentMaterial = pelletMaterial;
					currentGeometry = pelletGeometry;
					break;
				case 3:
					currentMaterial = jailMaterial;
					currentGeometry = jailGeometry;
					break;
				// case 4:
				// 	currentMaterial = enemySpawnMaterial;
				// 	currentGeometry = enemySpawnGeometry;
				// 	break;
				case 5:
					currentMaterial = pacmanMaterial;
					currentGeometry = pacmanGeometry;
					break;
				case 0:
					currentMaterial = smallSquareMaterial;
					currentGeometry = smallSquareGeometry;
					if (countPellets == true){
						totalPelletCount ++;
							
					}
					
					break;
				default:
					
					break;
			}

			if (currentMaterial && map[y][x] != 5 && map[y][x] != 4 && map[y][x] != 6 && map[y][x] != 7 && map[y][x] != 8 && map[y][x] != 9) {
				cube = new THREE.Mesh(currentGeometry, currentMaterial);
				//cube.position.set((x + (cubeWidth / 2)) * cubeWidth, (cubeHeight / 2), (y + (cubeDepth / 2)) * cubeDepth);
				//capsule.add(cube);
				//console.log(capsule.children);

				cube.position.set((((Math.cos(x * 0.14) * 7.16)) * cubeWidth), ((Math.sin(x * 0.14) * 7.16)), (y + (cubeDepth / 2)) * cubeDepth);
				cube.rotation.z = x * (8 * Math.PI/180) + (90 * Math.PI/180);

				//cube.rotation.x = 50 + x;
				scene.add(cube);
			} else if (map[y][x] == 5) {
				pacman = new THREE.Mesh(pacmanGeometry, pacmanMaterial);
				capsule.add(pacman);
				pacman.position.set((((Math.cos(x * 0.14) * 7.16)) * cubeWidth), ((Math.sin(x * 0.14) * 7.16)), (y + (cubeDepth / 2)) * cubeDepth);
				//var mesh1 = new THREE.Mesh( geometry, material );
				//scene.add(pacman);
			}
			else if (map[y][x] == 4) {
				blinky = new Blinky(x, y, cubeWidth, cubeHeight, cubeDepth);
				scene.add(blinky.getMesh());
				blinkyCapsule.add(blinky.getMesh());
				//blinky.position.set((((Math.cos(x * 0.14) * 7.16)) * cubeWidth), ((Math.sin(x * 0.14) * 7.16)), (y + (cubeDepth / 2)) * cubeDepth);
				//var mesh1 = new THREE.Mesh( geometry, material );
				//scene.add(pacman);
			}
			else if (map[y][x] == 6) {
				pinky = new Pinky(x, y, cubeWidth, cubeHeight, cubeDepth);
				pinky.material.color.setHex(0xFF00ff);
				scene.add(pinky.getMesh());
				pinkyCapsule.add(pinky.getMesh());
				//blinky.position.set((((Math.cos(x * 0.14) * 7.16)) * cubeWidth), ((Math.sin(x * 0.14) * 7.16)), (y + (cubeDepth / 2)) * cubeDepth);
				//var mesh1 = new THREE.Mesh( geometry, material );
				//scene.add(pacman);
			}
			else if (map[y][x] == 7) {
				franky = new Franky(x, y, cubeWidth, cubeHeight, cubeDepth);
				franky.material.color.setHex(0x00ff00);
				scene.add(franky.getMesh());
				frankyCapsule.add(franky.getMesh());
				//blinky.position.set((((Math.cos(x * 0.14) * 7.16)) * cubeWidth), ((Math.sin(x * 0.14) * 7.16)), (y + (cubeDepth / 2)) * cubeDepth);
				//var mesh1 = new THREE.Mesh( geometry, material );
				//scene.add(pacman);
			}
			else if (map[y][x] == 8) {
				inky = new Inky(x, y, cubeWidth, cubeHeight, cubeDepth);
				inky.material.color.setHex(0x00ff99);
				scene.add(inky.getMesh());
				inkyCapsule.add(inky.getMesh());
				//blinky.position.set((((Math.cos(x * 0.14) * 7.16)) * cubeWidth), ((Math.sin(x * 0.14) * 7.16)), (y + (cubeDepth / 2)) * cubeDepth);
				//var mesh1 = new THREE.Mesh( geometry, material );
				//scene.add(pacman);
			}
			else if (map[y][x] == 9) {
				clyde = new Clyde(x, y, cubeWidth, cubeHeight, cubeDepth);
				clyde.material.color.setHex(0xff5500);
				scene.add(clyde.getMesh());
				clydeCapsule.add(clyde.getMesh());
				//blinky.position.set((((Math.cos(x * 0.14) * 7.16)) * cubeWidth), ((Math.sin(x * 0.14) * 7.16)), (y + (cubeDepth / 2)) * cubeDepth);
				//var mesh1 = new THREE.Mesh( geometry, material );
				//scene.add(pacman);
			}
		}
	}
	
	scene.position.set(0, 0, -23.5);
	//document.getElementById("total").innerHTML = totalPelletCount;
	//document.getElementById("demo").innerHTML = pelletCount;
	//countPellets = false;
}

function buildMap2(){
	var mapWidth = 45;
	var mapHeight = 47;

	var cubeHeight = 0.75;
	 cubeWidth = 1;
	 cubeDepth = 1;
	pelletCount = 0;

	var replaceGeometry = new THREE.CubeGeometry(.2, .2, .2);
	var replaceMaterial = new THREE.MeshBasicMaterial({color: 0x030303});

	for (var y = 0; y < mapHeight; y++) {
		for (var x = 0; x < mapWidth; x++) {
			switch (map[y][x]) {
				case 6:
					//var a = scene.getObjectByName('pelletGeometry');
					//scene.remove(a);
					currentMaterial = replaceMaterial; 
					currentGeometry = replaceGeometry;
					pelletCount ++;
					//document.getElementById("demo").innerHTML = pelletCount;
					//pelletCount ++;
					//document.getElementById("demo").innerHTML = pelletCount;
					break;
				default:
					currentMaterial = 0; 
					currentGeometry = 0;
					break;
			}
			// if (currentMaterial && map[y][x] != 5) {
			// 	cube = new THREE.Mesh(currentGeometry, currentMaterial);
			// 	cube.position.set((x + (cubeWidth / 2)) * cubeWidth, (cubeHeight / 2), (y + (cubeDepth / 2)) * cubeDepth);
			// 	scene.add(cube);
			// } else if (map[y][x] == 5) {
			// 	pacman = new THREE.Mesh(pacmanGeometry, pacmanMaterial);
			// 	pacman.position.set((x + (cubeWidth / 2)) * cubeWidth, (cubeHeight / 2), (y + (cubeDepth / 2)) * cubeDepth);
			// 	scene.add(pacman);
			// }
		}
	}
	if(pelletCount >= 1086){
		alert("Winner, Winner, Chicken Dinner!!!!");
	}
	//scene.position.set(-22.5, 0, -23.5);
}


function drawPlane() {
	var planeGeometry = new THREE.PlaneGeometry(45, 47, 1);
	var planeMaterial = new THREE.MeshBasicMaterial({color: 0xA4A4C1, side: THREE.DoubleSide});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = (-Math.PI / 2);
	plane.position.set(22.5, 0, 23.5);
	
	scene.add(plane);
}

function createCapsule( material, radius, top, bottom, segmentsWidth, openTop, openBottom )
{
	// defaults
	var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xAD6E00 } );
	segmentsWidth = (segmentsWidth === undefined) ? 32 : segmentsWidth;
	openTop = (openTop === undefined) ? false : openTop;
	openBottom = (openBottom === undefined) ? false : openBottom;

	// get cylinder height
	var cylAxis = new THREE.Vector3();
	cylAxis.subVectors( top, bottom );
	var length = cylAxis.length();
	
	// get cylinder center for translation
	var center = new THREE.Vector3();
	center.addVectors( top, bottom );
	center.divideScalar( 2.0 );

	// always open-ended
	var cylGeom = new THREE.CylinderGeometry( radius, radius, length, segmentsWidth, 1, 1 );
	var cyl = new THREE.Mesh( cylGeom, material );
	
	// pass in the cylinder itself, its desired axis, and the place to move the center.
	makeLengthAngleAxisTransform( cyl, cylAxis, center );

	// YOUR CODE HERE
	// Here's a sphere's geometry. Use it to cap the cylinder if
	// openTop and/or openBottom is false. Bonus points: use instancing!
	var capsule = new THREE.Object3D();
capsule.add( cyl );
if ( !openTop || !openBottom ) {
    // instance geometry
    var sphGeom = new THREE.SphereGeometry( radius, segmentsWidth, segmentsWidth/2 );
    if ( !openTop ) {
        var sphTop = new THREE.Mesh( sphGeom, sphereMaterial );
        sphTop.position.set( top.x, top.y, top.z );
        capsule.add( sphTop );
    }
    if ( !openBottom ) {
        var sphBottom = new THREE.Mesh( sphGeom, sphereMaterial );
        sphBottom.position.set( bottom.x, bottom.y, bottom.z );
        capsule.add( sphBottom );
    }
}
return capsule;
	
}

function makeLengthAngleAxisTransform( cyl, cylAxis, center )
{
	cyl.matrixAutoUpdate = false;
	
	// From left to right using frames: translate, then rotate; TR.
	// So translate is first.
	cyl.matrix.makeTranslation( center.x, center.y, center.z );

	// take cross product of cylAxis and up vector to get axis of rotation
	var yAxis = new THREE.Vector3(0,1,0);
	// Needed later for dot product, just do it now;
	// a little lazy, should really copy it to a local Vector3.
	cylAxis.normalize();
	var rotationAxis = new THREE.Vector3();
	rotationAxis.crossVectors( cylAxis, yAxis );
	if ( rotationAxis.length() < 0.000001 )
	{
		// Special case: if rotationAxis is just about zero, set to X axis,
		// so that the angle can be given as 0 or PI. This works ONLY
		// because we know one of the two axes is +Y.
		rotationAxis.set( 0, 0, 0 );
	}
	rotationAxis.normalize();
	
	// take dot product of cylAxis and up vector to get cosine of angle of rotation
	var theta = -Math.acos( cylAxis.dot( yAxis ) );
	//cyl.matrix.makeRotationAxis( rotationAxis, theta );
	var rotMatrix = new THREE.Matrix4();
	rotMatrix.makeRotationAxis( rotationAxis, theta );
	cyl.matrix.multiply( rotMatrix );
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

// function ghostAI() {
// 	var valid = true;
// 	var movement = [];
// 	var initialDirection = [1, 2, 4, 8];
// 	var key = initialDirection.indexOf(direction);
// 	var switchDirection =  [2, 1, 8, 4];
// 	console.log("we are here");
// 	console.log(mazeMovement[test1][test2]);
// 	//thinking done here
	
// 	switch(mazeMovement[test1][test2]){
// 		case 0:
// 			valid = false;								//1 r   2 l   4 u   8 d     
// 			break;
// 			//First four choices are only a "one-way" for the ghosts, no logic should be done.										
// 		case 1:
// 			direction = switchDirection[key];
// 			direction = 9 - direction;
// 			valid = false;
// 			break;
// 		case 2:
// 			direction = switchDirection[key];
// 			direction = 10 - direction;
// 			valid = false;
// 			break;
// 		case 3:
// 			console.log(direction);
// 			direction = switchDirection[key];
// 			direction = 5 - direction;
// 			console.log(direction);
// 			valid = false;
// 			break;
// 		case 4:
// 			direction = switchDirection[key];
// 			direction = 6 - direction;
// 			valid = false;
// 			break;
// 			//The next choices should implement a sort of logic to find shortest path, or something like that.
// 		case 5:
// 			movement = [1, 4, 8];
// 			if (position1 > test1 && direction !== 4) {
// 				direction = 8;
// 			}
// 			if (position1 < test1 && direction !== 8) {
// 				direction = 4;
// 			}
// 			break;
// 		case 6:
// 			movement = [8, 2, 4];
// 			if (position1 > test1 && direction !== 4) {
// 				direction = 8;
// 				valid = false;
// 			}
// 			if (position1 < test1 && direction !== 8) {
// 				direction = 4;
// 				valid = false;
// 			}
// 			break;
// 		case 7:
// 			movement = [8, 2, 1];
// 			if (position2 > test2 && direction !== 2) {
// 				direction = 1;
// 				valid = false;
// 			}
// 			if (position2 < test2 && direction !== 1) {
// 				direction = 2;
// 				valid = false;
// 			}
// 			break;
// 		case 8:
// 			movement = [4, 2, 1];
// 			if (position2 > test2 && direction !== 2) {
// 				direction = 1;
// 				valid = false;
// 			}
// 			if (position2 < test2 && direction !== 1) {
// 				direction = 2;
// 				valid = false;
// 			}
// 			break;
// 		case 9:
// 			movement = [8, 2, 1, 4];
// 			if (position1 > test1 && direction !== 4) {
// 				direction = 8;
// 				valid = false;
// 			}
// 			if (position1 < test1 && direction !== 8) {
// 				direction = 4;
// 				valid = false;
// 			}
// 			if (position2 > test2 && direction !== 2) {
// 				direction = 1;
// 				valid = false;
// 			}
// 			if (position2 < test2 && direction !== 1) {
// 				direction = 2;
// 				valid = false;
// 			}
// 			break;
// 		default:
// 			valid = false;
// 			break;
// 	}

// if(valid) {
// 	var chosen = getRandomInt(0, movement.length - 1);
// 	direction = movement[chosen];
// 	console.log(movement[chosen]);
// }



//right = 1; up = 2; left = 3; down = 4;
	
// var t1= new Array(); // This is the key for the maze movement array.
//     t1[0]= 0;
//     t1[1]= 9; // rd (right and down)
//     t1[2]=10; // ld
//     t1[3]= 5; // ru
//     t1[4]= 6; // lu
//     t1[5]=13; // rdu
//     t1[6]=14; // ldu
//     t1[7]=11; // rld
//     t1[8]= 7; // rlu
//     t1[9]=15; // rlud

// movement = getRandomInt(1,3);
// 			direction = 2;

//}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function basicTurn(movement) {
	return movement - direction;

}

function wrap3DX(x) {
	return (((Math.cos(x * 0.14) * 7.16)) * cubeWidth);
}

function wrap3DY(x) {
	return ((Math.sin(x * 0.14) * 7.16));
}

function wrap3DRotation(x) {
	return (x * (8 * Math.PI/180) + (90 * Math.PI/180));
}

function update()
{

	if (gameStart > 0) {
		gameStart--;
	}
	else
	{
	keyboard.update();
	blinky.update();
	inky.update();
	 pinky.update();
	 clyde.update();
	 franky.update();

	var moveDistance = 50 * clock.getDelta(); 


	
	

	function keyboardListener()
{
	keyboard.update();

	if (keyboard.pressed("left")) {
		blinky.setDirection("x-");
	}

	if (keyboard.pressed("right")) {
		blinky.setDirection("x+");
	}

	if (keyboard.pressed("up")) {
		blinky.setDirection("z-");
	}

	if (keyboard.pressed("down")) {
		blinky.setDirection("z+");
	}
}

	

	if (keyboard.down("left") && map[test1 - 1][test2] != 1) {
		pacman.translateZ( -1 );
		test1 = test1 - 1;
		//console.log(mazeMovement[test1][test2]);
		map[test1][test2] = 6;
			
			//call build map to update the pellet material
			buildMap2();
	}

	if (keyboard.down("right") && map[test1 + 1][test2] != 1 ) {
		pacman.translateZ(  1 );
		test1 = test1 + 1;
		//console.log(mazeMovement[test1][test2]);
		map[test1][test2] = 6;
			
			//call build map to update the pellet material
			buildMap2();
		//console.log(test);
		
}

	if (keyboard.down("up") && map[test1][test2 + 1] != 1) { 
	// 	pacman.translateX((Math.cos(1/8) * 8));
	// pacman.translateY((Math.sin(1/8) * 8));
	capsule.rotation.z -= (8 * Math.PI/180);
	if(test2 >= 44)
		test2 = -1;
	test2 = test2 + 1;
		//console.log(mazeMovement[test1][test2]);
		map[test1][test2] = 6;
			
			//call build map to update the pellet material
			buildMap2();
}

	//((((Math.cos(x/8) * 8)) * cubeWidth) + 22, ((Math.sin(x/8) * 8)), (y + (cubeDepth / 2)) * cubeDepth);

	if (keyboard.down("down")  && map[test1][test2 - 1] != 1) {
		//pacman.translateZ(  1 );
	capsule.rotation.z += (8 * Math.PI/180);
	if(test2 <= 0)
		test2 = 45;
	test2 = test2 - 1;
		//console.log(mazeMovement[test1][test2]);
		map[test1][test2] = 6;
			
			//call build map to update the pellet material
			buildMap2();
}
	
		}
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	headlight.position.copy(camera.position);

	
	
	update();
	
	renderer.render(scene, camera);
}

init();
buildMap();
//drawPlane();
animate();