/****************************************************************************
*	Class for Clyde
*
*	Author: Paden Jones, John Smidt
*	Date: 2/27/2016
*****************************************************************************/

function Clyde(x, z, width, height, depth) {
	this.geometry = new THREE.SphereGeometry(.5, 25, 25);
	this.material = new THREE.MeshBasicMaterial({color: 0xFF0000});
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.position.set(wrap3DX(x), wrap3DY(x), z + .5);
	this.mesh.rotation.z = Math.PI / 2;
	this.mesh.rotation.x = Math.PI;
	
	this.internalX = (x * width);
	this.internalY = (height / 2);
	this.internalZ = (z * depth);
	
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.x = x * width;
	this.y = height / 2;
	this.z = z * depth;
	this.time = 60;

	this.positionY = 20;
	this.positionX = 20;

	this.movement = []

	
	this.direction = 1;
	this.currentDirection = 1;
	this.interrupt = false;
	this.tweenSpeed = .08;
	var ghostCapsuleMaterial = new THREE.MeshBasicMaterial( { color:0xFF0000, transparent: true, opacity: 0 } );

	this.blinkyCapsule = new createCapsule( ghostCapsuleMaterial, 
		7.16,
		new THREE.Vector3( 0, 0, 47 ),
		new THREE.Vector3( 0, 0, 0 ), 
		100, false, false );
	scene.add( this.blinkyCapsule );
	blinkyCapsule.add(this.mesh);

	
}

Clyde.prototype.setInternal = function(x, y, z) {
	this.internalX = x;
	this.internalY = y;
	this.internalZ = z;
}

// Returns the mesh for adding to scene
Clyde.prototype.getMesh = function() {
	return this.mesh;
}

// Called by game loop on keyboard input.
Clyde.prototype.setDirection = function(direction) {
	this.interrupt = false;

	//console.log("INSIDE THE MOVEMemnt");
	
	// if (direction == "z+"){
	// 	this.direction = 1;
		
	// 	if (this.currentDirection == 3 || this.currentDirection == 0) {
	// 		this.interrupt = true;
	// 	}
	// }
	// if (direction == "x+"){
	// 	this.direction = 2;
		
	// 	if (this.currentDirection == 4) {
	// 		this.interrupt = true;
	// 	}
	// }
	// if (direction == "z-"){
	// 	this.direction = 3;
		
	// 	if (this.currentDirection == 1) {
	// 		this.interrupt = true;
	// 	}
	// }
	// if (direction == "x-"){
	// 	this.direction = 4;
		
	// 	if (this.currentDirection == 2) {
	// 		this.interrupt = true;
	// 	}
	// }
}

// Updated animation method, similar to the Tween.js library
// returns 0 -> 1 in intervals of .01
Clyde.prototype.tweener = function(clear) {
	(clear) ? this.tween = 0 : 0;
	
	if (this.tween < 1) {
		this.tween += this.tweenSpeed;
		return this.tween;
	} else {
		this.tween = 0;
		return this.tween;
	}
}

// Similar to tweener, if movement is interrupted
// this will decrement the tween until we get back to
// zero.
Clyde.prototype.interruptTweener = function() {
	if (this.tween > 0) {
		this.tween -= this.tweenSpeed;
		return this.tween;
	} else {
		this.tween = 0;
		this.interrupt = false;
		return this.tween;		
	}
}

// Determines if the  blocks next to pacman are set or not. When we implement
// pellets and whatnot this will need to be modified.
Clyde.prototype.validMove = function(direction) {
	switch (direction) {
		case 1:
			return !map[this.z - 1][this.x];
		case 2:
			return !map[this.z][this.x + 1];
		case 3:
			return !map[this.z + 1][this.x];
		case 4:
			return !map[this.z][this.x - 1];
		default:
			return false;
	}
}

// Move pacman smoothly, the smoothess is determined by the tweener method.
Clyde.prototype.smoothMove = function() {
	var newPosition;

	// If we aren't moving we don't want to increment tweener.
	if (this.currentDirection) {
		if (!this.interrupt) {
			newPosition = this.tweener();
		} else {
			newPosition = this.interruptTweener();
		}
	}

	// Sets intermediate values for Pacman's coordinates
	if (newPosition) {
		switch(this.currentDirection) {
			case 1:
				this.setInternal(this.x, this.y, this.z - newPosition);
				break;
			case 2:
				this.setInternal(this.x + newPosition, this.y, this.z);
				break;
			case 3:
				this.setInternal(this.x, this.y, this.z + newPosition);
				break;
			case 4:
				this.setInternal(this.x - newPosition, this.y, this.z);
				break;
		}
		
		translate3d(this.mesh, this.internalX, this.internalZ, true);
		
	// TODO: There is a slight delay when we hit this which causes the game to not look smooth,
	//       maybe find a way to implement this inline (like when tween = 1, still move it but do
	//       all of this stuff too)
	} else {
		this.x = Math.round(this.internalX);
		this.z = Math.round(this.internalZ);

		//console.log("(" + this.x + "," + this.z + ")");

		// If the current direction is still a valid move keep going that way otherwise direction = 0.
		if (this.validMove(this.direction)) {
			this.currentDirection = this.direction;
		} else if (!this.validMove(this.currentDirection)) {
			this.currentDirection = 0;
		}
	}
}

Clyde.prototype.ghostAI = function() {
	var valid = true;
	var movement = [];
	var initialDirection = [1, 2, 4, 8];
	var key = initialDirection.indexOf(this.direction);
	var switchDirection =  [2, 1, 8, 4];
	//console.log(this.positionY);
	//console.log(mazeMovement[this.positionY][this.positionX]);
	//thinking done here
	
	switch(mazeMovement[this.positionY][this.positionX]){
		case 0:
			valid = false;								//1 r   2 l   4 u   8 d     
			break;
			//First four choices are only a "one-way" for the ghosts, no logic should be done.										
		case 1:
			this.direction = switchDirection[key];
			this.direction = 9 - this.direction;
			valid = false;
			break;
		case 2:
			this.direction = switchDirection[key];
			this.direction = 10 - this.direction;
			valid = false;
			break;
		case 3:
			//console.log(this.direction);
			this.direction = switchDirection[key];
			this.direction = 5 - this.direction;
			//console.log(this.direction);
			valid = false;
			break;
		case 4:
			this.direction = switchDirection[key];
			this.direction = 6 - this.direction;
			valid = false;
			break;
			//The next choices should implement a sort of logic to find shortest path, or something like that.
		case 5:
			 movement = [1, 4, 8];
			// if (test1 > this.positionY && this.direction !== 4) {
			// 	this.direction = 8;
			// }
			// if (test1 < this.positionY && this.direction !== 8) {
			// 	this.direction = 4;
			// }

			
			break;
		case 6:
			movement = [8, 2, 4];
			
			break;
		case 7:
			movement = [8, 2, 1];
			
			break;
		case 8:
			movement = [4, 2, 1];
			
			break;
		case 9:
			movement = [8, 2, 1, 4];
			
			break;
		default:
			valid = false;
			break;
	}

if(valid) {
	var proximity = Math.sqrt(Math.pow(test2 - this.positionX, 2) + Math.pow(test1 - this.positionY, 2));
		if (proximity < 10) {
		 clyde.beDumb(movement)
		}
		else {
	clyde.seek(movement, this.positionX, this.positionY);
	}
	// //console.log(this.direction);
	// switch(this.direction){
	// 	case 0:
	// 		this.direction = 4;
	// 		break;
	// 	case 1:
	// 		break;
	// 	case 2:
	// 		this.direction = 8;
	// 		break;
	// 	case 3:
	// 		this.direction = 2;
	// 		break;
	// 	default:
	// 		console.log("shouldn't get here");
	// 		break;
	// }

}
}

Clyde.prototype.beDumb = function(movement) {

		var chosen = getRandomInt(0, movement.length - 1);
		//console.log(this.movement[chosen])
		//console.log(chosen)
 		this.direction = movement[chosen];

}

Clyde.prototype.seek = function(movement, x, y) {
	var distances = [];   // 0 up   1 right   2 down   3 left
	var valid = true;
	var direction = 5;

	// NOTE: Be sure to check the math if this thing does not work. especially the "test2, test1" stuff.

		for(var i = 0; i < 4; i++) {
			var tempDist = 0;
			switch(i) {
				case 0:  //test2
					if (map[y - 1][x] != 1) {
						direction = 0;
						tempDist = Math.sqrt(Math.pow(test2 - x, 2) + Math.pow(test1 - (y - 1), 2));
						distances.push({direction: direction, distance: tempDist});
					}
					break;
				case 1:  //test2
					if (map[y][x + 1] != 1) {
						direction = 1;
						tempDist = Math.sqrt(Math.pow(test2 - (x + 1), 2) + Math.pow(test1 - y, 2));
						distances.push({direction: direction, distance: tempDist});
					}
					break;
				case 2:  //test2
					if (map[y + 1][x] != 1) {
						direction = 2;
						tempDist = Math.sqrt(Math.pow(test2 -  x, 2) + Math.pow(test1 - (y + 1), 2));
						distances.push({direction: direction, distance: tempDist});
					}
					break;
				case 3:  //test2
				if (map[y][x - 1] != 1) {
						direction = 3;
						tempDist = Math.sqrt(Math.pow(test2 - (x - 1), 2) + Math.pow(test1 - y, 2));
						distances.push({direction: direction, distance: tempDist});
					}
					break;
				default:
					console.log("The program did a dumb");
					break;
			}
		}
	//console.log(distances);
	distances.sort(function(a, b) {
    return parseFloat(a.distance) - parseFloat(b.distance);
});
	// console.log(distances);

	// for (var i = 0; i < distances.length; i++){
	// 	if (distances[i]["distance"] <= 0)
	// }

	// console.log(distances);
this.direction = distances[0]["direction"]
	//console.log(this.direction);
	switch(this.direction){
		case 0:
			this.direction = 4;
			break;
		case 1:
			break;
		case 2:
			this.direction = 8;
			break;
		case 3:
			this.direction = 2;
			break;
		default:
			console.log("shouldn't get here");
			break;
	}
	//return distances[0]["direction"];
					//organize, and find the shortest, valid distance

}



// Update
Clyde.prototype.update = function() {
	// this.smoothMove();

	//clyde.translateZ( -1 );



	
this.time--;
	if (this.time <= 0) { 

		clyde.ghostAI();
		
		this.time = 10;
		
		 console.log(this.direction);

		

		switch(this.direction){
			case 1:
				if(this.positionX >= 44)
					this.positionX = -1;
				this.positionX = this.positionX + 1;

				//console.log("here");
				this.mesh.translateX(0, wrap3DY(this.x - 1), 0);
				
				clydeCapsule.rotation.z -= (8 * Math.PI/180);
				break;
			case 4:
				this.positionY = this.positionY - 1;
				//clyde.setDirection("z-");
				this.mesh.translateZ( 1 );
				//clyde.translateZ( -1 );
				break;
			case 2:
				if(this.positionX <= 0)
					this.positionX = 45;
				this.positionX = this.positionX - 1;
				//clyde.setDirection("x-");
				clydeCapsule.rotation.z += (8 * Math.PI/180);
				break;
			case 8:
				this.positionY = this.positionY + 1;
				//clyde.setDirection("z+");
				this.mesh.translateZ( -1 );
				//clyde.translateZ( 1 );
				break;
			default:
				console.log("broken")
				break;

		}
	}
}

// Stat
Clyde.prototype.stat = function() {
	//console.log("x: " + this.x + " | z: " + this.z + "   " + this.direction + "   " + this.frameDirection);
}