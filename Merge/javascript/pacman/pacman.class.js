/****************************************************************************
*	Class for Pacman
*
*	Author: Paden Jones
*	Date: 2/27/2016
*****************************************************************************/

function Pacman(x, z, width, height, depth) {
	this.geometry = new THREE.SphereGeometry(.5, 25, 25);
	this.material = new THREE.MeshLambertMaterial({color: 0xFFFF00});
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
	
	this.direction = 0;
	this.currentDirection = 0;
	this.interrupt = false;
	this.tweenSpeed = .08;

	this.mesh.add(camera);
}

Pacman.prototype.setInternal = function(x, y, z) {
	this.internalX = x;
	this.internalY = y;
	this.internalZ = z;
}

// Returns the mesh for adding to scene
Pacman.prototype.getMesh = function() {
	return this.mesh;
}

// Called by game loop on keyboard input.
Pacman.prototype.setDirection = function(direction) {
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
Pacman.prototype.tweener = function(clear) {
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
Pacman.prototype.interruptTweener = function() {
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
Pacman.prototype.validMove = function(direction) {
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
Pacman.prototype.smoothMove = function() {
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

// Update
Pacman.prototype.update = function() {
	this.smoothMove();
}

// Stat
Pacman.prototype.stat = function() {
	console.log("x: " + this.x + " | z: " + this.z + "   " + this.direction + "   " + this.frameDirection);
}