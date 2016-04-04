/****************************************************************************
*	Class for Blinky
*
*	Author: Paden Jones, John Smidt
*	Date: 2/27/2016
*****************************************************************************/

function Blinky(x, z, width, height, depth) {
	this.geometry = new THREE.SphereGeometry(.5, 25, 25);
	this.material = new THREE.MeshLambertMaterial({color: 0xFF0000});
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.position.set((((Math.cos(x * 0.14) * 7.16)) ), ((Math.sin(x * 0.14) * 7.16)), (y + (1 / 2)));
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
	
	this.direction = 0;
	this.currentDirection = 0;
	this.interrupt = false;
	this.tweenSpeed = .08;

	this.mesh.add(camera);
}

Blinky.prototype.setInternal = function(x, y, z) {
	this.internalX = x;
	this.internalY = y;
	this.internalZ = z;
}

// Returns the mesh for adding to scene
Blinky.prototype.getMesh = function() {
	return this.mesh;
}

// Called by game loop on keyboard input.
Blinky.prototype.setDirection = function(direction) {
	this.interrupt = false;
	
	if (direction == "z+"){
		this.direction = 1;
		
		if (this.currentDirection == 3 || this.currentDirection == 0) {
			this.interrupt = true;
		}
	}
	if (direction == "x+"){
		this.direction = 2;
		
		if (this.currentDirection == 4) {
			this.interrupt = true;
		}
	}
	if (direction == "z-"){
		this.direction = 3;
		
		if (this.currentDirection == 1) {
			this.interrupt = true;
		}
	}
	if (direction == "x-"){
		this.direction = 4;
		
		if (this.currentDirection == 2) {
			this.interrupt = true;
		}
	}
}

// Updated animation method, similar to the Tween.js library
// returns 0 -> 1 in intervals of .01
Blinky.prototype.tweener = function(clear) {
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
Blinky.prototype.interruptTweener = function() {
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
Blinky.prototype.validMove = function(direction) {
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
Blinky.prototype.smoothMove = function() {
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

		console.log("(" + this.x + "," + this.z + ")");

		// If the current direction is still a valid move keep going that way otherwise direction = 0.
		if (this.validMove(this.direction)) {
			this.currentDirection = this.direction;
		} else if (!this.validMove(this.currentDirection)) {
			this.currentDirection = 0;
		}
	}
}

Blinky.prototype.ghostAI = function() {
	var valid = true;
	var movement = [];
	var initialDirection = [1, 2, 4, 8];
	var key = initialDirection.indexOf(direction);
	var switchDirection =  [2, 1, 8, 4];
	console.log("we are here");
	console.log(mazeMovement[test1][test2]);
	//thinking done here
	
	switch(mazeMovement[test1][test2]){
		case 0:
			valid = false;								//1 r   2 l   4 u   8 d     
			break;
			//First four choices are only a "one-way" for the ghosts, no logic should be done.										
		case 1:
			direction = switchDirection[key];
			direction = 9 - direction;
			valid = false;
			break;
		case 2:
			direction = switchDirection[key];
			direction = 10 - direction;
			valid = false;
			break;
		case 3:
			console.log(direction);
			direction = switchDirection[key];
			direction = 5 - direction;
			console.log(direction);
			valid = false;
			break;
		case 4:
			direction = switchDirection[key];
			direction = 6 - direction;
			valid = false;
			break;
			//The next choices should implement a sort of logic to find shortest path, or something like that.
		case 5:
			movement = [1, 4, 8];
			if (position1 > test1 && direction !== 4) {
				direction = 8;
			}
			if (position1 < test1 && direction !== 8) {
				direction = 4;
			}
			break;
		case 6:
			movement = [8, 2, 4];
			if (position1 > test1 && direction !== 4) {
				direction = 8;
				valid = false;
			}
			if (position1 < test1 && direction !== 8) {
				direction = 4;
				valid = false;
			}
			break;
		case 7:
			movement = [8, 2, 1];
			if (position2 > test2 && direction !== 2) {
				direction = 1;
				valid = false;
			}
			if (position2 < test2 && direction !== 1) {
				direction = 2;
				valid = false;
			}
			break;
		case 8:
			movement = [4, 2, 1];
			if (position2 > test2 && direction !== 2) {
				direction = 1;
				valid = false;
			}
			if (position2 < test2 && direction !== 1) {
				direction = 2;
				valid = false;
			}
			break;
		case 9:
			movement = [8, 2, 1, 4];
			if (position1 > test1 && direction !== 4) {
				direction = 8;
				valid = false;
			}
			if (position1 < test1 && direction !== 8) {
				direction = 4;
				valid = false;
			}
			if (position2 > test2 && direction !== 2) {
				direction = 1;
				valid = false;
			}
			if (position2 < test2 && direction !== 1) {
				direction = 2;
				valid = false;
			}
			break;
		default:
			valid = false;
			break;
	}

if(valid) {
	var chosen = getRandomInt(0, movement.length - 1);
	direction = movement[chosen];
	console.log(movement[chosen]);
}
}



// Update
Blinky.prototype.update = function() {
	this.smoothMove();
}

// Stat
Blinky.prototype.stat = function() {
	console.log("x: " + this.x + " | z: " + this.z + "   " + this.direction + "   " + this.frameDirection);
}