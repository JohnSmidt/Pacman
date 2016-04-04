var map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1],
	[0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0],
	[1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1,1,1,1,1,1],
	[1,1,0,0,0,0,0,1,2,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,2,1,0,0,0,0,0,1,1],
	[1,1,0,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,1,0,1,0,1,0,1,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,0,1,1],
	[1,1,0,0,0,0,0,1,0,0,0,0,1,0,1,1,1,0,0,0,0,1,0,1,0,0,0,0,1,1,1,0,1,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,1,1,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,1,1,0,1,1],
	[1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1],
	[1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1],
	[0,0,0,0,0,0,0,1,2,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,2,1,0,0,0,0,0,0,0],
	[1,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,1],
	[1,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[0,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,0],
	[1,2,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,2,1],
	[1,1,0,1,0,0,0,0,1,1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,0,0,0,0,1,0,1,1],
	[1,1,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,0,1,0,6,7,4,8,9,0,1,0,0,0,0,0,0,1,0,1,0,0,1,1,0,1,0,1,1],
	[0,0,0,0,0,0,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,0,0,0,0,0,0],
	[1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1],
	[1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1],
	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
	[1,1,1,0,1,1,0,0,1,0,1,0,1,1,1,1,1,0,1,0,0,0,5,0,0,0,1,0,1,1,1,1,1,0,1,0,1,0,0,1,1,0,1,1,1],
	[1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1,1],
	[1,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,1],
	[1,1,1,0,1,0,1,0,0,0,0,0,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,0,0,0,0,0,1,0,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
	[1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1],
	[0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0],
	[1,0,1,1,0,1,0,1,0,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,1,0,1,0,1,0,1,1,0,1],
	[1,0,1,1,2,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,0,1,0,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,2,1,1,0,1],
	[1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1],
	[1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1],
	[0,0,0,0,0,0,1,1,1,1,0,1,0,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,1,1,1,0,0,0,0,0,0],
	[1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1],
	[1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1],
	[0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
	[1,1,0,1,0,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,0,1,0,1,1],
	[0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

	var t1= new Array(); // This is the key for the maze movement array.
    t1[0]= 0;
    t1[1]= 9; // rd (right and down)
    t1[2]=10; // ld
    t1[3]= 5; // ru
    t1[4]= 6; // lu
    t1[5]=13; // rdu
    t1[6]=14; // ldu
    t1[7]=11; // rld
    t1[8]= 7; // rlu
    t1[9]=15; // rlud       1 r   2 l   4 u   8 d     


	var mazeMovement = [  	// This will be for the ghosts
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,7,0,7,0,0,0,0,7,0,7,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,7,0,7,0,0,0,0,7,0,7,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,7,0,7,0,0,2,0,1,0,0,7,0,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,4,0,3,0,0,7,0,4,0,3,0,2,0,0,0,0,0,0,0,0,5,0,6,0,0,0,0,0,0,0,0,1,0,4,0,3,0,7,0,0,4,0,5,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,4,0,3,0,7,4,0,3,7,0,4,0,3,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,9,0,7,0,0,0,8,7,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,7,8,0,0,0,7,0,9,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,5,8,0,0,7,0,0,6,0,0,0,5,0,0,7,0,0,8,6,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,7,0,0,4,0,3,0,0,7,0,6,0,0,0,0,0,0,5,0,7,0,6,0,0,0,0,0,0,5,0,7,0,0,4,0,3,0,0,7,2,0,0],
	[0,0,5,6,0,0,0,0,0,0,0,0,0,5,0,0,0,6,0,0,0,0,0,0,0,0,0,5,0,0,0,6,0,0,0,0,0,0,0,0,0,5,6,0,0],
	[0,0,5,8,0,0,2,0,1,0,0,4,0,0,0,0,0,5,0,0,4,0,0,0,3,0,0,6,0,0,0,0,0,3,0,0,2,0,1,0,0,8,6,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,1,0,8,0,8,0,0,7,0,8,0,0,0,6,0,1,0,0,8,0,0,2,0,5,0,0,0,8,0,7,0,0,8,0,8,0,2,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,7,8,0,8,0,2,0,1,0,0,8,0,2,0,1,0,8,0,8,0,2,0,1,0,8,0,8,0,2,0,1,0,8,0,0,2,0,1,0,8,0,8,7,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,5,0,0,0,7,8,7,8,0,0,0,0,9,0,8,0,7,0,7,0,8,0,8,0,7,0,7,0,8,0,9,0,0,0,0,8,7,8,7,0,0,0,6,0],
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
	[0,3,2,0,1,6,0,5,0,0,7,0,0,6,0,1,0,4,0,3,0,2,0,1,0,4,0,3,0,2,0,5,0,0,7,0,0,6,0,5,2,0,1,4,0],
	[0,0,0,0,5,8,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,8,6,0,0,0,0],
	[0,0,0,0,0,0,0,3,2,0,0,0,1,8,0,8,0,2,0,1,0,8,0,8,0,2,0,1,0,8,0,8,2,0,0,0,1,4,0,0,0,0,0,0,0],
	[0,0,8,0,8,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,8,0,8,0,0],
	[0,0,0,0,0,3,7,0,8,0,9,0,4,0,1,0,0,8,0,6,0,1,9,2,0,5,0,8,0,0,2,0,3,0,9,0,8,0,7,4,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,7,0,0,8,2,0,1,8,7,0,0,8,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0,8,0,0,7,8,2,0,1,8,0,0,7,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,1,0,8,0,4,0,5,0,0,7,0,7,6,0,0,0,0,0,0,0,0,0,5,7,0,7,0,0,6,0,3,0,8,0,2,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,8,0,8,0,2,0,1,0,8,0,8,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,1,0,7,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,7,0,2,0,0,0,0,0,0,0],
	[0,0,0,9,0,8,7,4,0,0,0,5,0,0,4,0,3,0,0,7,0,8,0,8,0,7,0,0,4,0,3,0,0,6,0,0,0,3,7,8,0,9,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,7,0,8,2,0,0,0,1,4,0,3,7,0,0,7,0,0,0,6,0,0,0,0,0,5,0,0,0,7,0,0,7,4,0,3,2,0,0,0,1,8,0,7,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,7,0,7,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,5,0,8,0,8,0,7,0,6,0,0,5,0,2,0,0,0,0,0,0,0,0,0,1,0,6,0,0,5,0,7,0,8,0,8,0,6,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,6,0,5,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,5,0,0,8,0,0,7,0,0,4,0,3,0,0,9,0,7,0,0,0,8,0,8,0,0,0,7,0,9,0,0,4,0,3,0,0,7,0,0,8,0,0,6,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,3,0,0,0,7,0,8,0,0,2,0,1,0,0,6,0,5,0,0,0,2,0,1,0,0,0,6,0,5,0,0,2,0,1,0,0,8,0,7,0,0,0,4,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,7,0,7,6,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,6,0,5,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,5,7,0,7,0,0],
	[0,0,0,0,5,8,0,0,0,0,8,0,9,0,0,9,0,6,0,0,0,5,0,6,0,0,0,5,0,9,0,0,9,0,8,0,0,0,0,8,6,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,6,0,5,0,0,0,0,7,0,0,8,2,0,0,0,3,0,0,7,4,0,3,7,0,0,4,0,0,0,1,8,0,0,7,0,0,0,0,6,0,5,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,4,0,3,0,0,0,0,8,0,0,0,8,0,8,0,0,0,0,8,0,0,0,8,0,0,0,0,8,0,8,0,0,0,8,0,0,0,0,4,0,3,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];


	
function makeTableHTML(myArray) {
	// var color;
	// var result = "<table>";
	
	// for(var i=0; i < myArray.length; i++) {
	// 	result += "<tr>";

	// 	for(var j=0; j < myArray[i].length; j++){
	// 		if (myArray[i][j] == 5) {
	// 			color = " style=\"background-color: yellow\" ";
	// 		} else if (myArray[i][j] == 4) {
	// 			color = " style=\"background-color: purple\" ";
	// 		} else if (myArray[i][j] == 3) {
	// 			color = " style=\"background-color: red\" ";
	// 		} else if (myArray[i][j] == 2) {
	// 			color = " style=\"background-color: green\" ";
	// 		} else if (myArray[i][j] == 1) {
	// 			color = " style=\"background-color: blue\" ";
	// 		} else {
	// 			color = "";
	// 		}
			
	// 		result += "<td" + color + ">&nbsp&nbsp&nbsp&nbsp&nbsp</td>";
	// 	}
	// 	result += "</tr>";
	// }
	// result += "</table>";

	// return result;
}